import React, { useState, useCallback } from "react";
import { Dimensions, View, Image, Text } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { imageUrl } from "../constant";

const PAGE_WIDTH = Dimensions.get("screen").width;
const PAGE_HEIGHT = Dimensions.get("screen").height
const CustomItem = ({index, animationValue, check }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#fff", "transparent", "#fff"]
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1, padding: 5 }} key={index}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      >
        <Image
          source={{
            uri: `${imageUrl}${check?.backdrop_path}`,
          }}
          style={{
            width: PAGE_WIDTH-60,
            resizeMode: 'contain',
            height: 200,
          }}
          alt="title"
        />
      </Animated.View>
      <View className="flex flex-col relative top-[86%] justify-around h-8 rounded-md w-[85%]" 
                style={{
                    backgroundColor: 'rgba(189, 181, 213, 0.5)'
                }}
                >
      {
        check?.original_name && <View className="flex flex-row items-center">
        <Text className="font-normal text-xl text-white">Name: </Text>
        <Text className="text-xl font-medium text-white">{check?.original_name}</Text>
      </View>
      }
      {
        check?.character &&  <View className="flex flex-row items-center">
        <Text className="font-normal text-xl text-white">character: </Text>
        <Text className="text-md text-white">{check?.character}</Text>
        </View>
      }
      </View>
      </View>
  );
};

function HorizontalCarousel({ check, navigate }) {
  const animationStyle = useCallback(
    (value) => {
      "worklet";

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-PAGE_WIDTH, 0, PAGE_WIDTH]
      );

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [PAGE_WIDTH]
  );

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        autoPlay={false}
        style={{ width: PAGE_WIDTH , height: PAGE_HEIGHT-650, marginBottom: 15, padding: 5 }}
        width={PAGE_WIDTH}
        data={check}
        renderItem={({ index, animationValue, item }) => {
          return (
            <CustomItem
              index={index}
              animationValue={animationValue}
              check={item}
            />
          );
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={1500}
      />
    </View>
  );
}

export default HorizontalCarousel;

import React, { useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, useWindowDimensions, View, Text, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, useAnimatedStyle } from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
const PAGE_WIDTH = Dimensions.get("screen").width;
const PAGE_HEIGHT = Dimensions.get("screen").height;
import { imageUrl } from "../constant";
function VerticalCarousel({data}) {
  const scrollOffsetValue = useSharedValue(0);
  const [isVertical, setIsVertical] = useState(true);
  console.log("ONLYYYY DATAAAAAA", data)
  const [isFast, setIsFast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const ref = useRef(null);


  const CustomItem = ({index, animationValue, check }) => {
  console.log("CHECKKKKKK", check)
    return (
      <View style={{ flex: 1, padding: 5 }} key={index}>
        <Animated.View
          pointerEvents="none"
        >
          <Image
            source={{
              uri: `${imageUrl}${check?.file_path}`,
            }}
            style={{
              width: PAGE_WIDTH,
              resizeMode: 'contain',
              height: 600,
            }}
            alt="title"
          />
        </Animated.View>
        </View>
    );
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Carousel
        enabled
        width={PAGE_WIDTH}
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: PAGE_WIDTH , height: PAGE_HEIGHT-300, marginBottom: 15, }}
        data={data}
        onConfigurePanGesture={(g) => g.enabled(false)}
        pagingEnabled={false}
        scrollAnimationDuration={1500}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index, item }) => <View style={{ flex: 1, paddingRight: 20}} key={index}>
        <Animated.View
          pointerEvents="none"
        >
          <Image
            source={{
              uri: `${imageUrl}${item?.file_path}`,
            }}
            style={{
              width: PAGE_WIDTH,
              resizeMode: 'contain',
              height: PAGE_HEIGHT-300,
            }}
            alt="title"
          />
        </Animated.View>
        </View>}
      />
    </SafeAreaView>
  );
}

export default VerticalCarousel;

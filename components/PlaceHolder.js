import React from "react";
import { View, SafeAreaView, Text } from "react-native";

// added dependencies
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const PlaceHolder = () => {
  return (
    <SafeAreaView>
      <ShimmerPlaceholder />
      <ShimmerPlaceholder
        visible={true}
        duration={3000}
        shimmerColors={["#41ee", "#ae1224", "#bece"]}
      >
        <Text>Wow, awesome here.</Text>
      </ShimmerPlaceholder>
    </SafeAreaView>
  );
};

export default PlaceHolder;

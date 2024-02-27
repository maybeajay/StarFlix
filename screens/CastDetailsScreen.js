import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { ScrollView, SafeAreaView, View, Text, Image } from "react-native";

import { imageUrl } from "../constant";
import Animated from "react-native-reanimated";
const apiUrl = process.env.EXPO_PUBLIC_API_URL
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACESS_TOKEN;
const CastDetailsScreen = ({navigation, route}) => {
  const [peopleDetails, setpeopleDetails] = useState([]);
  const {id} = route?.params;

  // get cast details by id

  const getCastDetailsById = async () => {
    try {
      const res = await axios.get(
        apiUrl+`person/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: ACCESS_TOKEN,
          },
        }
      );
      console.log("casttt",res?.data);
      await setpeopleDetails(res?.data)
    } catch (error) {
        console.log(error);
    }
  };

//   call on focus
useFocusEffect(useCallback(()=>{
    getCastDetailsById()
}, [id]))


// text wrap
const Wrapper = ({show, text})=>{
  
}
  return <Animated.ScrollView showsVerticalScrollIndicator={false} sharedTransitionTag="sharedTagsss">
    {/* images and stuff */}
    <View>
        <Image source={{uri: imageUrl+peopleDetails?.profile_path}}
        style={{
            width:"100%",
            resizeMode: 'cover',
            height: 400,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
        }}
        />
        {/* for name and stuff */}
        <SafeAreaView className="">
            <Text className="text-4xl font-bold relative bottom-[60] left-8 text-white ">{peopleDetails?.name}</Text>
            {/* wrap inside hide show */}
            <Text className="mx-5 text-xl">Biography</Text>
            <View className="flex flex-row flex-wrap">
            <Text className="text-md font-semibold text-center  mx-auto mt-5 max-w-[80%]">{peopleDetails?.biography}</Text>
            </View>
        </SafeAreaView>
    </View>
  </Animated.ScrollView>;
};

export default CastDetailsScreen;

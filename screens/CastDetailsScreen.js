import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { ScrollView, SafeAreaView, View, Text, Image } from "react-native";

import { imageUrl } from "../constant";
import Animated from "react-native-reanimated";
import {EXPO_PUBLIC_API_URL, EXPO_TEST_TOKEN } from '@env'
import {  Ionicons } from '@expo/vector-icons';
import { Cake, BarChart } from "lucide-react-native";
import HorizontalMoviesData from "../components/HorizontalMoviesData";
const CastDetailsScreen = ({navigation, route}) => {
  const [peopleDetails, setpeopleDetails] = useState([]);
  const [creditsDetails, setcreditsDetails] = useState([]);
  const {id} = route?.params;

  // get cast details by id
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: EXPO_TEST_TOKEN,
    },
  }
  const getCastDetailsById = async () => {
    try {
      const res = await axios.get(
        EXPO_PUBLIC_API_URL+`person/${id}?language=en-US`,
        Headers
      );
      console.log("RESSSSSSS", res?.data);
      await setpeopleDetails(res?.data)
    } catch (error) {
        console.log(error);
    }
  };

  const getCombinedCredits = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}person/${id}/combined_credits?language=en-US`, Headers);
      setcreditsDetails(res?.data?.cast);
    } catch (error) {
      console.log(error);
    }
  }

//   call on focus
useFocusEffect(useCallback(()=>{
    getCastDetailsById();
    getCombinedCredits();
}, [id]))


// text wrap
const Wrapper = ({show, text})=>{
  
}
  return <Animated.ScrollView showsVerticalScrollIndicator={false} sharedTransitionTag="sharedTagsss">
    {/* images and stuff */}
    <View>
        <Animated.Image source={{uri: imageUrl+peopleDetails?.profile_path}}
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

            {/* for birthday */}
            <View className="flex flex-row items-center gap-1  bottom-5 justify-around">
            <View className="flex flex-row items-center gap-1">
            <Cake size={25} color="#6936f5" />
            <Text className="font-semibold">{peopleDetails?.birthday}</Text>
            </View>
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="location-outline" size={25} color={"#6936f5"} />
              <Text className="font-semibold max-w-[80]">{peopleDetails?.place_of_birth}</Text>
            </View>
            <View className="flex flex-row items-center gap-1">
              <BarChart size={25} color={"#6936f5"} />
              <Text className="font-semibold">{peopleDetails?.popularity}</Text>
            </View>
            </View>
            {/* wrap inside hide show */}
            <Text className="mx-5 text-xl">Biography</Text>
            <View className="flex flex-row flex-wrap">
            <Text className="text-md font-regular p-2 mt-3 mx-2">{peopleDetails?.biography}</Text>
            </View>
            <View className="mx-5">
              <Text className="text-xl font-semibold">FilmoGraphy</Text>
              <View className="mt-5">
              <HorizontalMoviesData data={creditsDetails} navigation={navigation} media={creditsDetails?.media_type}/>
              </View>
            </View>
        </SafeAreaView>
    </View>
  </Animated.ScrollView>;
};

export default CastDetailsScreen;

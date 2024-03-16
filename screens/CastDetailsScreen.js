import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { ScrollView, SafeAreaView, View, Text, Image, Dimensions } from "react-native";

import { imageUrl } from "../constant";
import Animated, {FadeInLeft, FadeOutRight} from "react-native-reanimated";
import {EXPO_PUBLIC_API_URL, EXPO_TEST_TOKEN } from '@env'
import {  Ionicons } from '@expo/vector-icons';
import { Cake, BarChart } from "lucide-react-native";
import HorizontalCarousel from "../components/HorizontalCarousel";
import VerticalCarousel from "../components/VerticalCarousel";
const PAGE_WIDTH = Dimensions.get("screen").width;
const CastDetailsScreen = ({navigation, route}) => {
  const [peopleDetails, setpeopleDetails] = useState([]);
  const [creditsDetails, setcreditsDetails] = useState([]);
  const [images, setimages] = useState([]);
  const {id} = route?.params;
  const navigate = useNavigation();

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
      console.log("RES222222", res);
      let tempData = await res?.data?.cast?.filter((item)=>item?.backdrop_path);
      setcreditsDetails(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  const getPeopleImages = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}person/${id}}/images`, Headers);
      console.log("RESSSSS",res);
      await setimages(res?.data?.profiles);
    } catch (error) {
      console.log(error);
    }
  }

//   call on focus
useFocusEffect(useCallback(()=>{
    getCastDetailsById();
    getCombinedCredits();
    getPeopleImages();
}, [id]))


// text wrap
const Wrapper = ({show, text})=>{
  
}
  return <Animated.ScrollView showsVerticalScrollIndicator={false} sharedTransitionTag="sharedTagsss">
    {/* images and stuff */}
    <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
        {/* Vertical Caraousel */}
        <VerticalCarousel data={images}/>
        {/* for name and stuff */}
        <SafeAreaView className="">
            <Text className="text-3xl font-bold relativ mb-8 text-center mt-5 text-[#6936f5] opacity-[0.8]">{peopleDetails?.name}</Text>

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
              <HorizontalCarousel check={creditsDetails} navigate={navigate}/>
              </View>
            </View>
        </SafeAreaView>
    </Animated.View>
  </Animated.ScrollView>;
};

export default CastDetailsScreen;

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { ScrollView, SafeAreaView, View, Text, Image } from "react-native";

import { imageUrl } from "../constant";

const CastDetailsScreen = ({navigation, route}) => {
  const [peopleDetails, setpeopleDetails] = useState([]);
  const [showFull, setshowFull] = useState(false);
  const {id} = route?.params;

  // get cast details by id

  const getCastDetailsById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}person/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
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
  return <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text className="text-4xl font-bold relative bottom-[80] left-8 text-white max-w-[90]">{peopleDetails?.name}</Text>
            {/* wrap inside hide show */}
            <Text className="mx-5 text-xl">Biography</Text>
            <View className="flex flex-row flex-wrap">
            <Text className="text-md font-semibold text-center  mx-auto mt-5 max-w-[80%]">{peopleDetails?.biography}</Text>
            </View>
        </SafeAreaView>
    </View>
  </ScrollView>;
};

export default CastDetailsScreen;

import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";


// added dependecies
import { imageUrl } from "../constant";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from "expo-blur";

const MovieDetails = ({ route, navigation }) => {
  const { id } = route?.params;

  const [movieDetails, setmovieDetails] = useState([]);

  const getDetailsById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await setmovieDetails(res?.data)
    } catch (error) {
        console.log(error);
    }
  };

  useFocusEffect(useCallback(()=>{
    getDetailsById();
    console.log("MMMMMMMMMMMMm",movieDetails)
  }, [id]))
  return (
    <ScrollView>
        <View>
        <View className="mt-[40px] rounded-lg">
          <BlurView
          intensity={40} tint="light" 
          className="flex items-center" 
          style={{
            backgroundColor: "#6936f5",
          }}
          >
          <Image
            source={{ uri: `${imageUrl}${movieDetails?.poster_path}` }}
            style={{
              width: '70%',
              height: 400,
              resizeMode: "contain",
              padding: 10
            }}
            className="rounded-lg mt-2 mb-3"
          />
          </BlurView>
          {/* voting average and release year */}
          <View className="w-[100px] flex flex-row items-center gap-1 bg-[#222] mx-3 opacity-[0.8] relative bottom-[38px] left-[60px] rounded-sm">
          <Ionicons name="md-star" size={20} color="gold" className="mt-2"/>
          <Text className="text-white">{Math.round(movieDetails?.vote_average*10)/10}</Text>
          <Text className="text-white"> | </Text>
          <Text className="text-white">{movieDetails?.release_date?.slice(0,4)}</Text>
          </View>

          {/* genre */}
          <View className="flex flex-row mx-3">
            {movieDetails && movieDetails?.genres?.map((item)=><View
            >
              <Text className="text-md text-[#28303d]">{item?.name} .</Text>
            </View>)}
            </View>
        </View>
        </View>
    </ScrollView>
  );
};

export default MovieDetails;

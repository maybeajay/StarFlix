import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  Pressable,
} from "react-native";

// added dependecies
import { imageUrl } from "../constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

const MovieDetails = ({ route, navigation }) => {
  const { id } = route?.params;

  const [movieDetails, setmovieDetails] = useState([]);
  const [crew, setCrew] = useState([]);

  // for movie details
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
      await setmovieDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // for cast and crew
  const getCrewDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}movie/${id}/credits?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await setCrew(res?.data?.cast);
      console.log("crew", crew);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDetailsById();
      getCrewDetails();
    }, [id])
  );

  const handleHomePageNavigation = async () => {
    const supported = await Linking.canOpenURL(movieDetails?.homepage);
    console.log();
    if (supported) Linking.openURL(movieDetails?.homepage);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View className="mt-[30px] rounded-lg">
          <BlurView
            intensity={80}
            tint="light"
            className="flex items-center"
            style={{
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Image
              source={{ uri: `${imageUrl}${movieDetails?.poster_path}` }}
              style={{
                resizeMode: "contain",
                width: "80%",
                height: 400,
              }}
              className="rounded-lg mt-2"
            />
          </BlurView>
          {/* voting average and release year */}
          <View className="w-[150px] flex flex-row items-center gap-1 bg-[#222] mx-3 opacity-[0.8] relative bottom-[36px] left-[60px] rounded-sm">
            <Ionicons name="md-star" size={20} color="gold" className="mt-2" />
            <Text className="text-white">
              {Math.round(movieDetails?.vote_average * 10) / 10}
            </Text>
            <Text className="text-white"> | </Text>
            <Text className="text-white">
              {movieDetails?.release_date?.slice(0, 4)}
            </Text>
          </View>

          {/* genre and links */}
          <View className="flex justify-between flex-row items-center">
            <View className="flex flex-row mx-5 justify-between">
              {movieDetails &&
                movieDetails?.genres?.map((item) => (
                  <View>
                    <Text className="text-lg text-[#28303d]">
                      {item?.name} .
                    </Text>
                  </View>
                ))}
            </View>
            <Pressable
              onPress={() => handleHomePageNavigation()}
              className="h-[35px] w-[90px] bg-[#6936f5] flex flex-row items-center mr-3 justify-center"
              style={{
                borderRadius: 20,
              }}
            >
              <Ionicons name="md-play" size={20} color="white" />
              <Text className="text-white ">Watch</Text>
            </Pressable>
          </View>

          {/* Movie title and overview */}
          <View className="mt-3 mx-5">
            <Text
              className="font-bold"
              style={{
                maxWidth: "80%",
                fontSize: 23,
              }}
            >
              {movieDetails?.title}
            </Text>
            <Text
              className="mt-3 font-semibold"
              style={{
                fontSize: 16,
              }}
            >
              {movieDetails?.overview}
            </Text>
          </View>

          {/* for cast & crew */}
          <View>
            <Text className="text-xl font-bold mt-3 mx-5">Cast & Crew</Text>
            <View style={{ flexDirection: "row" }} className="mx-3">
            {console.log('Crew Length:', crew.length)}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {crew.length > 0 && crew.map((item) => (
                    <View
                      key={item.id}
                      style={{ margin: 5, alignItems: "center",  }}
                    className="text-center"
                    >
                      <Image
                        source={{ uri: `${imageUrl}${item?.profile_path}` }}
                        style={{ width: 80, height: 80, borderRadius: 40, resizeMode: "contain" }}
                      />
                      <Text style={{
                        maxWidth: 60,
                        marginTop: 8
                      }}>{item?.original_name}</Text>
                    </View>
                  ))}
                </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

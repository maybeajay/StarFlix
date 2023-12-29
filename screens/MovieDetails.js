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
import HorizontalMoviesData from "../components/HorizontalMoviesData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import "moment-duration-format";

const MovieDetails = ({ route, navigation }) => {
  const { id, media } = route?.params;

  console.log(media);
  const [movieDetails, setmovieDetails] = useState([]);
  const [recomendedShows, setrecomendedShows] = useState([]);
  const [crew, setCrew] = useState([]);

  // for movie details
  const finalUrl =
    media == "movie" ? `movie/${id}?language=en-US` : `tv/${id}?language=en-US`;
  const getDetailsById = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}${finalUrl}`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
        },
      });
      await setmovieDetails(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const recomendedUrl =
    media == "movie"
      ? `movie/${id}/recommendations?language=en-US&page=1`
      : `tv/${id}/recommendations?language=en-US&page=1`;

  const getRecomendedShows = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}${recomendedUrl}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await setrecomendedShows(res?.data?.results);
    } catch (error) {}
  };

  // for cast and crew
  const credsUrl =
    media == "movie"
      ? `movie/${id}/credits?language=en-US`
      : `tv/${id}/credits?language=en-US`;
  console.log(credsUrl);
  const getCrewDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}${credsUrl}`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
        },
      });
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
      getRecomendedShows();
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
              className="rounded-lg mt-1"
            />
          </BlurView>
          {/* voting average and release year */}
          <View className="relative">
            <View className="w-[77%] flex flex-row items-center gap-1  bottom-[10px] left-[50px] rounded-lg absolute inset-0 bg-white opacity-80 filter blur-md justify-around font-semibold">
              <Ionicons
                name="md-star"
                size={20}
                color="gold"
                className="mt-2"
              />
              <Text className="text-black text-lg">
                {Math.round(movieDetails?.vote_average * 10) / 10}
              </Text>
              <Text className="text-black"> | </Text>
              <Text className="text-black text-lg">
                {!movieDetails?.release_date?.slice(0, 4)
                  ? movieDetails?.first_air_date?.slice(0, 4)
                  : movieDetails?.release_date?.slice(0, 4)}
              </Text>
              <Text className="text-black"> | </Text>
              <Text className="text-black text-lg">
                {movieDetails?.origin_country}
              </Text>

              <Text className="text-black text-lg mr-3">
                {movieDetails?.runtime
                  ? moment
                      .duration(Number(movieDetails?.runtime), "minutes")
                      .format("h:mm", { trim: false })
                  : movieDetails?.episode_run_time}
              </Text>
            </View>
          </View>

          {/* genre and links */}
          <View className="flex justify-between flex-row items-center mt-3">
            <View className="flex flex-row mx-5 justify-between flex-wrap">
              {movieDetails &&
                movieDetails?.genres?.map((item) => (
                  <View className="gap-3 max-w-[80px]">
                    <Text className="text-md text-[#28303d]">
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


          <Pressable onPress={()=>navigation.navigate("Video Player", {id: movieDetails?.id, media: media})}>
            <Text>Watch</Text>
          </Pressable>

          {/* Movie title and overview */}
          <View className="mt-3 mx-5">
            <Text
              className="font-bold"
              style={{
                maxWidth: "80%",
                fontSize: 23,
              }}
            >
              {!movieDetails?.name ? movieDetails?.title : movieDetails?.name}
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
          <View className="mx-5 mt-5">
            <Text className="text-xl font-bold mt-3 mb-3">
              Cast & Crew
            </Text>
            <View style={{ flexDirection: "row" }} className="mx-3">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {crew.length > 0 &&
                  crew.map((item) => (
                    <View
                      key={item.id}
                      style={{ margin: 5, alignItems: "center" }}
                      className="text-center"
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("People Details", {
                            id: item?.id,
                          })
                        }
                      >
                        <Image
                          source={{ uri: `${imageUrl}${item?.profile_path}` }}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            resizeMode: "contain",
                          }}
                        />
                        <Text
                          style={{
                            maxWidth: 60,
                            marginTop: 8,
                          }}
                        >
                          {item?.original_name}
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>

          {/* Recomended shows */}
          <View className="mt-5">
            <Text className="mx-5 font-bold text-lg mb-3">
              People also like
            </Text>
            <HorizontalMoviesData
              data={recomendedShows}
              navigation={navigation}
              media={media}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

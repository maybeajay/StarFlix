import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  Pressable,
} from "react-native";
import { Context } from "../screens/Navigator";

// added dependecies
import { imageUrl } from "../constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import HorizontalMoviesData from "../components/HorizontalMoviesData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import "moment-duration-format";
import { Clapperboard, Play } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import UserReviews from '../components/UserReviews'
import { useScrollToTop } from '@react-navigation/native';

const MovieDetails = ({ route, navigation }) => {
  const { id, media } = route?.params;
  const [movieDetails, setmovieDetails] = useState([]);
  const [recomendedShows, setrecomendedShows] = useState([]);
  const [userReviews, setuserReviews] = useState([]);
  const [crew, setCrew] = useState([]);

  const { loading, setLoading } = useContext(Context);

  // headers 
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
    },
  }

  // for movie details
  const finalUrl =
    media == "movie" ? `movie/${id}?language=en-US` : `tv/${id}?language=en-US`;
  const getDetailsById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_BASE_URL}${finalUrl}`, Headers);
      await setmovieDetails(res?.data);
      setLoading(false);
      console.log(res?.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const recomendedUrl =
    media == "movie"
      ? `movie/${id}/recommendations?language=en-US&page=1`
      : `tv/${id}/recommendations?language=en-US&page=1`;

  const getRecomendedShows = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // for revies
  const reviewUrl = media == "movie" ? `movie/${id}/reviews?language=en-US&page=1` : `tv/${id}/reviews?language=en-US&page=1`
  console.log(reviewUrl);
  const getuserReviews = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}${reviewUrl}`, Headers);
      await setuserReviews(res?.data?.results)
      console.log("RRRRR",res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  }

  // for cast and crew
  const credsUrl =
    media == "movie"
      ? `movie/${id}/credits?language=en-US`
      : `tv/${id}/credits?language=en-US`;
  console.log(credsUrl);
  const getCrewDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_BASE_URL}${credsUrl}`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
        },
      });
      await setCrew(res?.data?.cast);
      setLoading(false);
      console.log("crew", crew);
    } catch (error) {
      setLoading(fasle);
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDetailsById();
      getCrewDetails();
      getRecomendedShows();
      getuserReviews();
      console.log("+++++++", userReviews)
    }, [id])
  );

  const handleHomePageNavigation = async () => {
    const supported = await Linking.canOpenURL(movieDetails?.homepage);
    console.log();
    if (supported) Linking.openURL(movieDetails?.homepage);
  };

  const scrollViewRef = useRef(null)

const scrollTop = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true })
  }
}
useEffect(()=>{
  scrollTop()
}, [id])

  return (
    <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}
    sharedTransitionTag="tag">
      <View>
        <Skeleton.Group show={loading} colorMode={"light"}>
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
                  source={{ uri: `${imageUrl}${movieDetails.poster_path}` }}
                  style={{
                    resizeMode: "contain",
                    width: "80%",
                    height: 400,
                  }}
                  className="rounded-lg mt-1"
                  sharedTransitionTag="tag"
                />
          </BlurView>
          {/* voting average and release year */}
          <View className="relative">
            <View className="w-[68%] flex flex-row items-center gap-1  bottom-[10px] left-[50px] rounded- absolute inset-0 bg-white opacity-80 filter blur-md justify-around font-semibold mx-3">
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

          {/* watch trailer */}
          <View className="mt-5 flex items-center w-full flex-row h-[50px] mx-5">
            <View className="w-[45%]">
              <Pressable
                onPress={() =>
                  navigation.navigate("Video Player", {
                    id: movieDetails?.id,
                    media: media,
                  })
                }
                className="flex flex-row items-center bg-[#6936f5] p-3 h-full"
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopLeftRadius: 40,
                }}
              >
                {/* <Clapperboard size={30} color="white" />
                 */}
                 <Ionicons name="logo-youtube" size={28} color={"white"}/> 
                <Text className="text-white font-semibold mx-2 text-lg">
                  Watch Trailer
                </Text>
                
              </Pressable>
            </View>

            <View className="w-[45%]">
              <Pressable
                onPress={() => handleHomePageNavigation()}
                className="h-full bg-white flex flex-row justify-center p-3 items-center"
                style={{
                  borderBottomRightRadius: 40,
                  borderTopRightRadius: 40,
                }}
              >
                <Play size={30} color="#6936f5" className="relative" />
                <Text className="text-[#6936f5] font-semibold mx-2 text-md">
                  Watch{" "}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* genre and links */}
          <View className="flex justify-start flex-row items-center mt-5">
            <View className="flex flex-row mx-5 justify-start flex-wrap space-x-2">
              {movieDetails &&
                movieDetails?.genres?.map((item) => (
                  <View>
                    <Text className="text-md text-[#28303d]">
                      {item?.name} .
                    </Text>
                  </View>
                ))}
            </View>
            {media == "tv" ? (
              <View className="mx-auto">
                <Text>{movieDetails?.seasons?.length} Seasons</Text>
              </View>
            ) : null}
          </View>

          {/* Movie title and overview */}
          <View className="mt-5 mx-5">
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
            <Text className="text-xl font-bold mt-3 mb-3">Cast & Crew</Text>
            <View style={{ flexDirection: "row" }} className="">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {crew.length > 0 &&
                  crew.map((item) => (
                    <View
                      key={item.id}
                      style={{ margin: 5, alignItems: "center" }}
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
                            textAlign: "center",
                            marginLeft: 10,
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

          {/* available on */}
          {media == "tv" ? (
            <View className="mx-5 mt-5">
              <Text className="font-bold text-lg text-[#6936f5]">
                Available on
              </Text>
              <View className="flex flex-row gap-5">
                {movieDetails?.networks?.map((item) => (
                  <View className="flex flex-row mt-2 p-2">
                    <Image
                      source={{ uri: `${imageUrl}${item?.logo_path}` }}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Reviews section */}
          <View className="mt-8">
            <Text className="mx-5 font-bold text-xl">Reviews</Text>
          <UserReviews data={userReviews}/>
          </View>
          {/* Recomended shows */}
          <View className="mt-8">
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
        </Skeleton.Group>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

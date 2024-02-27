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
  StyleSheet,
  Alert
} from "react-native";
import { AuthContext } from "../screens/Navigator";

// added dependecies
import { imageUrl } from "../constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import HorizontalMoviesData from "../components/HorizontalMoviesData";
import moment from "moment";
import "moment-duration-format";
import { Clapperboard, Play } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import UserReviews from '../components/UserReviews'
import Animated, { FadeIn, FadeInLeft, FadeOut, FadeOutRight, LightSpeedInLeft, LightSpeedOutRight } from 'react-native-reanimated';

const apiUrl = process.env.EXPO_PUBLIC_API_URL
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACESS_TOKEN;
const AnimatedText = Animated.createAnimatedComponent(Text);

const MovieDetails = ({ route, navigation }) => {
  const { id, media } = route?.params;
  const [movieDetails, setmovieDetails] = useState([]);
  const [recomendedShows, setrecomendedShows] = useState([]);
  const [userReviews, setuserReviews] = useState([]);
  const [crew, setCrew] = useState([]);

  const { loading, setLoading } = useContext(AuthContext);

  // headers 
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: ACCESS_TOKEN,
    },
  }

  // for movie details
  const finalUrl =
    media == "movie" ? `movie/${id}?language=en-US` : `tv/${id}?language=en-US`;
  const getDetailsById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apiUrl+`${finalUrl}`, Headers);
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
        apiUrl+`${recomendedUrl}`,
        {
          headers: {
            accept: "application/json",
            Authorization: ACCESS_TOKEN,
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
      const res = await axios.get(apiUrl+`${reviewUrl}`, Headers);
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
      const res = await axios.get(apiUrl+`${credsUrl}`, {
        headers: {
          accept: "application/json",
          Authorization: ACCESS_TOKEN,
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
    else Alert.alert("Something went wrong")
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
const [isShown, setShown] = useState(false);

  return (
    <Animated.ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}
    sharedTransitionTag="tag">
      <View >
        <Skeleton.Group show={loading} colorMode={"light"}>
        <Animated.View className="mt-[30px] rounded-lg" 
        entering={LightSpeedInLeft} 
        exiting={LightSpeedOutRight} >
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
          <View className="relative mb-5">
            <View className="w-[100%] flex flex-row items-center gap-1  rounded- absolute inset-0 filter blur-md justify-around font-semibold ">
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
                  <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
                    <Text className="text-md text-[#28303d]">
                      {item?.name} .
                    </Text>
                  </Animated.View>
                ))}
            </View>
            {media == "tv" ? (
              <View className="mx-auto">
                <Text>{movieDetails?.seasons?.length} Seasons</Text>
              </View>
            ) : null}
          </View>

          {/* Movie title and overview */}
          <Animated.View className="mt-5 mx-5" entering={FadeInLeft} exiting={FadeOut}>
            <Animated.Text
              className="font-bold"
              style={{
                maxWidth: "80%",
                fontSize: 23,
              }}
              // className="font-bold"
            >
              {!movieDetails?.name ? movieDetails?.title : movieDetails?.name}
            </Animated.Text>
            <AnimatedText
              className="mt-3 font-normal"
              style={{
                fontSize: 16,
              }}            >
              {movieDetails?.overview}
            </AnimatedText>
          </Animated.View>

          {/* for cast & crew */}
          <Animated.View className="mx-5 mt-5" sharedTransitionTag="sharedTagsss">
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
                      <Pressable
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
                            resizeMode: "cover",
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
                      </Pressable>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </Animated.View>

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
        </Animated.View>
        </Skeleton.Group>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 8,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: 'tomato',
    borderRadius: 20,
  },
});

export default MovieDetails;

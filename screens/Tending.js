// project imports
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity
} from "react-native";
import { useContext } from "react";
// added dependencies
import axios from "axios";
import { AuthContext } from "../components/context/AuthContext";
import HorizontalMoviesData from "../components/HorizontalMoviesData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {EXPO_PUBLIC_API_URL, EXPO_TEST_TOKEN } from '@env'
const Trending = ({navigation}) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingSeries, settrendingSeries] = useState([]);
  const [arrivingSoon, setarrivingSoon]=useState([]);
  const [topRated, settopRated]=useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  // for popular movies
  const getPopularMovies = async () => {
    try {
      const res = await axios.get(EXPO_PUBLIC_API_URL+`trending/movie/day?language=en-US`, {
        headers:{
          accept: "application/json",
          Authorization: EXPO_TEST_TOKEN,
        }
      });
      await setPopularMovies(res?.data?.results);
    } catch (error) {
      console.log(error)
    }
  };

  // for popular series
  const getPopularTvSeries = async () => {
    try {
      const res = await axios.get(
        EXPO_PUBLIC_API_URL+`tv/popular?language=en-US&page=2`,
        {
          headers: {
            accept: "application/json",
            Authorization: EXPO_TEST_TOKEN,
          },
        }
      );
      await settrendingSeries(res?.data?.results);
    } catch (error) {
    }
  };


  const getArivingSoonData = async()=>{
    try {
      const res = await axios.get(EXPO_PUBLIC_API_URL+`tv/on_the_air?language=en-US&page=1`, {
        headers:{
          accept: "application/json",
          Authorization: EXPO_TEST_TOKEN
        }
      })
      await setarrivingSoon(res?.data?.results);
    } catch (error) {
      console.log(error);
    }finally{
    }
  }


  // top rated
  const getTopRated  = async()=>{
    try {
      const res = await axios.get(EXPO_PUBLIC_API_URL+`tv/top_rated?language=en-US&page=1`, {
        headers:{
          accept: "application/json",
          Authorization: EXPO_TEST_TOKEN,
        }
      })
      await settopRated(res?.data?.results);
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPopularMovies();
      getPopularTvSeries();
      getArivingSoonData();
      getTopRated();
    }, [])
  );
  return(
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between w-full mt-5">
        <Text className="color-[#0D111f] text-lg mx-3 mb-2 mt-4">Trending Movies!</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Details View",{media: "movie"})}>
        <Text className="color-[#0D111f] text-lg mx-3 mb-2 mt-4">view More <Ionicons name="chevron-forward-outline" size={20}/> </Text>
        </TouchableOpacity>
        </View>
      <HorizontalMoviesData data={popularMovies} navigation={navigation} media={"movie"}/>
      <Text className="color-[#0D111f] text-lg mx-3 mb-6 mt-2">Popular TV shows!</Text>
      <HorizontalMoviesData data={trendingSeries} navigation={navigation} media={"tv"}/>
      <Text className="color-[#0D111f] text-lg mx-3 mb-6 mt-2">Arriving This Week!</Text>
      <HorizontalMoviesData data={arrivingSoon} navigation={navigation} media={"tv"}/>
      <Text className="color-[#0D111f] text-lg mx-3 mb-6 mt-2">Top Rated Tv Series!</Text>
      <HorizontalMoviesData data={topRated} navigation={navigation} media={"tv"}/>
      </ScrollView>
    </SafeAreaView>
  );

};

export default Trending;
// project imports
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageUrl } from "../constant";
import { useContext } from "react";
// added dependencies
import axios from "axios";
import { Star } from "lucide-react-native";
import { Context } from "../App";

const options = {
  method: "GET",
  url: `${process.env.REACT_BASE_URL}trending/movie/day?language=en-US`,
  headers: {
    accept: "application/json",
    Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
  },
};

console.log("+++++", process.env.REACT_BASE_URL);

const Trending = () => {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [trendingSeries, settrendingSeries] = useState([]);
  const { loading, setLoading } = useContext(Context);
  console.log(loading);

  // for popular movies
  const getPopularMovies = async () => {
    const res = await axios.request(options);
    await settrendingMovies(res?.data?.results);
    console.log(trendingMovies);
  };

  // for popular series
  const getPopularTvSeries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}tv/popular?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await settrendingSeries(res?.data?.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getPopularMovies();
      getPopularTvSeries();
    }, [])
  );
  return loading ? (
    <View>
      <Text>fetching....</Text>
    </View>
  ) : (
    <SafeAreaView className="bg-white flex-1">
      <Text className="color-[#0D111f] text-lg mx-3">Trending Movies!</Text>
      <SafeAreaView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={trendingMovies}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex mx-5">
                <Image
                  source={{ uri: `${imageUrl}${item?.backdrop_path}` }}
                  style={{ width: 170, height: 200, resizeMode: "contain" }}
                  className="rounded-md object-contain"
                />
                <View className="flex flex-row items-center relative bottom-7 backdrop-blur-lg w-1/2">
                  <Text className="text-white mx-3 text-md">{item?.title}</Text>
                  <Text className="bg-transparent text-white text-md">
                    {item?.vote_average}
                  </Text>
                  <Star color="#ffcda5" size={20} />
                </View>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>


      <Text className="color-[#0D111f] text-lg mx-3">Popular TV shows!</Text>
      <SafeAreaView className="mt-7">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={trendingSeries}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex mx-5">
                <Image
                  source={{ uri: `${imageUrl}${item?.backdrop_path}` }}
                  style={{ width: 170, height: 200, resizeMode: "contain" }}
                  className="rounded-md object-contain"
                />
                <View className="flex flex-row items-center relative bottom-7 backdrop-blur-lg w-1/2">
                  <Text className="text-white mx-3 text-md">{item?.title}</Text>
                  <Text className="bg-transparent text-white text-md">
                    {item?.vote_average}
                  </Text>
                  <Star color="#ffcda5" size={20} />
                </View>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Trending;

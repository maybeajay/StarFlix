// project imports
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, FlatList, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageUrl } from "../constant";
import { useContext } from "react";
// added dependencies
import axios from "axios";
import { Star } from 'lucide-react-native';
import {Context} from '../App'

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
  const {loading, setLoading} = useContext(Context);
  console.log(loading);
  const getPopularMovies = async () => {
    const res = await axios.request(options);
    await settrendingMovies(res?.data?.results);
    console.log(trendingMovies);
  };

  useFocusEffect(useCallback(()=>{
    try {
      setLoading(true);
      getPopularMovies() 
    } catch (error) {
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }, []))
  return (
    loading ? (
      <View>
        <Text>fetching....</Text>
      </View>
    ) : (
      <SafeAreaView className="bg-white flex-1">
        <Text className="color-[#0D111f] text-lg mx-3">Whats Trending!</Text>
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
                    style={{ width: 170, height: 200, resizeMode:'contain' }}
                    className="rounded-md object-contain"
                  />
                  <View className="flex flex-row items-center relative bottom-7 backdrop-blur-lg w-1/2">
                    <Text className="text-white mx-3 text-md">{item?.title}</Text>
                    <Text className="bg-transparent text-white text-md">{item?.vote_average}</Text>
                    <Star color="#ffcda5" size={20}/>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    )
  );
  
};

export default Trending;

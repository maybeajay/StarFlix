// project imports
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, FlatList, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageUrl } from "../constant";
// added dependencies
import axios from "axios";
import { Star } from 'lucide-react-native';

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
  const getPopularMovies = async () => {
    const res = await axios.request(options);
    await settrendingMovies(res?.data?.results);
    console.log(trendingMovies);
  };

  useFocusEffect(useCallback(()=>{
    getPopularMovies()
  }, []))
  return (
    <SafeAreaView className="bg-[#171128] flex-1">
      <Text className="text-yellow-400 text-xl mx-3">Whats Trending!</Text>
      <SafeAreaView>
        <FlatList 
        data={trendingMovies}
        renderItem={({ item }) => (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} key={item.id}>
            <View className="flex">
              <Image 
                source={{ uri: `${imageUrl}${item?.backdrop_path}` }}
                style={{ width: 160, height: 160, resizeMode:'contain' }}
                className="rounded-md object-contain"
              />
             <View className="flex flex-row items-center relative bottom-7 backdrop-blur-lg">
             <Text className="text-white mx-3 text-sm">{item?.title}</Text>
              <Text className="bg-transparent text-white text-md">{item?.vote_average}
              </Text>
              <Star color="#ffcda5" size={20}/>
             </View>
            </View>
            </ScrollView>
          )}
         />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Trending;

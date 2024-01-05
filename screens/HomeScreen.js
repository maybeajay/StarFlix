import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
// added imports
import { imageUrl } from "../constant";
import axios from "axios";
import HorizontalMoviesData from '../components/HorizontalMoviesData'

const HomeScreen = ({navigation}) => {
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [arrivingToday, setarrivingToday] = useState([]);
  // get upcoming movies
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
    },
  }
  const getupMoviesDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}movie/upcoming?language=en-US&page=1`,Headers);
      console.log(res?.data?.results);
      await setupcomingMovies(res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  // arriving today
  const arrivingTodaySeries = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}tv/on_the_air?language=en-US&page=1`, Headers);
      await setarrivingToday(res?.data?.results);
      console.log(res?.data?.results);
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getupMoviesDetails();
      arrivingTodaySeries();
    }, [])
  );
  return (
    <ScrollView>
      <View className="mt-10">
        <Text className="mx-5 text-xl mt-3">Movies on the way!</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
          <FlatList
            data={upcomingMovies}
            horizontal
            renderItem={({ item }) => (
              <View className="flex items-center">
              <Image
                source={{ uri: `${imageUrl}${item?.poster_path}` }}
                style={{ width: 80, height: 80 }}
                borderRadius={40}
                resizeMode="cover"
                className="mx-2"
              />
              <Text className="font-semibold max-w-[90px] space-x-2 mt-2">{item?.title}</Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
      <View className="mt-10"> 
          <Text className="mx-5 text-xl font-semibold mb-5">Tv Shows Arriving Today!</Text>
          <HorizontalMoviesData data={arrivingToday} navigation={navigation} media={"Tv"}/>
          </View>
    </ScrollView>
  );
};

export default HomeScreen;

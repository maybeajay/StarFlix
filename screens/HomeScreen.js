import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Context } from "../screens/Navigator";
// added imports
import { imageUrl } from "../constant";
import axios from "axios";
import HorizontalMoviesData from '../components/HorizontalMoviesData'
import { Skeleton } from 'moti/skeleton'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [arrivingToday, setarrivingToday] = useState([]);
  const { loading, setLoading } = useContext(Context);
  // get upcoming movies
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
    },
  }
  const getupMoviesDetails = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}movie/upcoming?language=en-US&page=1`,Headers);
      console.log(res?.data?.results);
      await setupcomingMovies(res?.data?.results);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  // arriving today
  const arrivingTodaySeries = async()=>{
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}tv/on_the_air?language=en-US&page=1`, Headers);
      await setarrivingToday(res?.data?.results);
      console.log(res?.data?.results);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getupMoviesDetails();
      arrivingTodaySeries();
    }, [])
  );
  const LogOut = async ()=>{
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }
  return (
    <ScrollView>
      <View className="mt-10">
        <Text className="mx-5 text-xl mt-3">Movies on the way!</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
          <FlatList
            data={upcomingMovies}
            horizontal
            renderItem={({ item }) => (
              <Skeleton.Group show={loading}>
              <View className="flex items-center">
                <Skeleton width={90} height={80} radius={"round"} colorMode="light">
              <Image
                source={{ uri: `${imageUrl}${item?.poster_path}` }}
                style={{ width: 80, height: 80 }}
                borderRadius={40}
                resizeMode="cover"
                className="mx-2"
              />
              </Skeleton>
              <Skeleton width={10} height={10} colorMode="light">
              <Text className="font-semibold max-w-[90px] space-x-2 mt-2">{item?.title}</Text>
              </Skeleton>
              </View>
              </Skeleton.Group>
            )}
          />
        </ScrollView>
      </View>
      <View className="mt-10"> 
          <Text className="mx-5 text-xl font-semibold mb-5">Tv Shows Arriving Today!</Text>
          <HorizontalMoviesData data={arrivingToday} navigation={navigation} media={"Tv"}/>
          <TouchableOpacity onPress={()=>LogOut()}><Text>Logout</Text></TouchableOpacity>
          </View>
    </ScrollView>
  );
};

export default HomeScreen;

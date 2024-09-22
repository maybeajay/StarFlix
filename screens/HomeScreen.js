import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {AuthContext} from '../components/context/AuthContext'
// added imports
import { imageUrl } from "../constant";
import axios from "axios";
import HorizontalMoviesData from '../components/HorizontalMoviesData'
import { Skeleton } from 'moti/skeleton'
import { useNavigation } from '@react-navigation/native';
import SkeletonLoader from "expo-skeleton-loader";
import CardLoader from "../common/CardLoader";
import Animated, { useSharedValue } from "react-native-reanimated";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {EXPO_PUBLIC_API_URL, EXPO_PUBLIC_ACCESS_TOKEN } from '@env'
const HomeScreen = () => {
  const navigation = useNavigation();
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [arrivingToday, setarrivingToday] = useState([]);
  const [authToken, setAuthToken] = useState();
  const [nowplayingData, setnowplayingData] = useState([]);
  const widht = useSharedValue(300);
  const height = useSharedValue(300);
  const {loading, setLoading} = useContext(AuthContext)
  // get upcoming movies
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: EXPO_PUBLIC_ACCESS_TOKEN,
    },
  }
  console.log("TOKENN", EXPO_PUBLIC_ACCESS_TOKEN);
  const getupMoviesDetails = async () => {
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}movie/upcoming?language=en-US&page=1`, Headers);
      await setupcomingMovies(res?.data?.results);
    } catch (error) {
      console.log(error);
    }finally{
      
    }
  };

  // arriving today
  const arrivingTodaySeries = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}tv/on_the_air?language=en-US&page=1`, Headers);
      await setarrivingToday(res?.data?.results);
    } catch (error) {
      console.log(error)
    }finally{
      
    }
  }

  // now playing in India
  const nowPlaying = async ()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}movie/now_playing?language=en-US&page=1&region=IN`, Headers);
      console.log("RSSSS",res);
      await setnowplayingData(res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getupMoviesDetails();
      arrivingTodaySeries();
      nowPlaying();
    }, [])
  );
  const {Logout} =useContext(AuthContext)
  const AvatarLayout = ({
  }) => (
    <SkeletonLoader>
      <SkeletonLoader.Container
        style={{ flex: 1, flexDirection: "column", alignItems: "flex-start", justifyContent: 'center', marginLeft: 10 }}
      >
        <SkeletonLoader.Item
          style={{
            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        />
        <SkeletonLoader.Container style={{ paddingVertical: 10, display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
          <SkeletonLoader.Item
            style={{ width: 100, height: 10, marginBottom: 5, }}
          />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
    </SkeletonLoader>
  );
  
  // Example usage:
  // <CardLayout />
  
  const avatarData = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        false  ? <SkeletonLoader style={{ marginVertical: 10 }} highlightColor="#2e2e2e" boneColor="#fff" duration={2000}>
         <View style={{display: "flex", flexDirection: 'row'}}>
         {
          avatarData.map((item)=> <AvatarLayout style={{ marginBottom: 10 }} />)
         }
         </View>
        <SkeletonLoader.Item
          style={{ width, height: height / 3.5, marginVertical: 10 }}
        />
        <CardLoader times={avatarData}/>
      </SkeletonLoader> :
      <>
        <Animated.View className="mt-20">
        <Text className="mx-5 text-2xl mt-5 mb-4" style={{fontFamily: "Poppins_500Medium"}}>Movies on the way!</Text>
          <Animated.FlatList
            data={upcomingMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
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
              <Text className="font-bold max-w-[90px] space-x-2 mt-2" style={{fontFamily: 'Sarala_400Regular'}}>{item?.title}</Text>
              </Skeleton>
              </View>
              </Skeleton.Group>
            )}
          />
      </Animated.View>
      <View className="mt-10"> 
          <Text className="mx-5 text-xl font-semibold mb-5" style={{fontFamily: 'Poppins_500Medium'}}>Tv Shows Arriving Today!</Text>
          <HorizontalMoviesData data={arrivingToday} navigation={navigation} media={"tv"}/>
          </View>
          <View className="mt-5"> 
          <Text className="mx-5 text-lg font-semibold mb-5" style={{fontFamily: 'Poppins_500Medium'}}>Popular Movies in your Region!</Text>
          <HorizontalMoviesData data={nowplayingData} navigation={navigation} media={"movie"}/>
          </View>
        </>
      }
    </ScrollView>
  );
};

export default HomeScreen;

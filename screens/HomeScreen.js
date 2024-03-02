import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {AuthContext} from '../components/context/AuthContext'
// added imports
import { imageUrl } from "../constant";
import axios from "axios";
import HorizontalMoviesData from '../components/HorizontalMoviesData'
import { Skeleton } from 'moti/skeleton'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from "expo-skeleton-loader";
import CardLoader from "../common/CardLoader";
import Animated, { useSharedValue } from "react-native-reanimated";
import {EXPO_PUBLIC_API_URL,EXPO_PUBLIC_ACESS_TOKEN } from '@env'
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
      Authorization: EXPO_PUBLIC_ACESS_TOKEN,
    },
  }
  const getupMoviesDetails = async () => {
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}movie/upcoming?language=en-US&page=1`,Headers);
      console.log(res?.data?.results);
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
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}movie/now_playing?language=en-US&page=1&region=US`, Headers);
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
        <Animated.View className="mt-10">
        <Text className="mx-5 text-xl mt-3">Movies on the way!</Text>
        <TouchableOpacity onPress={()=>Logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
              <Text className="font-semibold max-w-[90px] space-x-2 mt-2">{item?.title}</Text>
              </Skeleton>
              </View>
              </Skeleton.Group>
            )}
          />
      </Animated.View>
      <Text>CHECKKKKKKKKK</Text>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <View className="mt-10"> 
          <Text className="mx-5 text-xl font-semibold mb-5">Tv Shows Arriving Today!</Text>
          <HorizontalMoviesData data={arrivingToday} navigation={navigation} media={"tv"}/>
          </View>
          <View className="mt-5"> 
          <Text className="mx-5 text-lg font-normal mb-5">Popular Movies in your Region!</Text>
          <HorizontalMoviesData data={nowplayingData} navigation={navigation} media={"movie"}/>
          </View>
        </>
      }
    </ScrollView>
  );
};

export default HomeScreen;

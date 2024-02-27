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
import {AuthContext} from '../screens/Navigator'
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
const HomeScreen = () => {
  const navigation = useNavigation();
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [arrivingToday, setarrivingToday] = useState([]);
  const { loading, setLoading, isSignedIn, setisSignedIn } = useContext(AuthContext);
  const [authToken, setAuthToken] = useState();
  const [nowplayingData, setnowplayingData] = useState([]);
  const widht = useSharedValue(300);
  const height = useSharedValue(300);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACESS_TOKEN;
  // get upcoming movies
  const Headers = {
    headers: {
      accept: "application/json",
      Authorization: ACCESS_TOKEN,
    },
  }
  const getupMoviesDetails = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        apiUrl+`movie/upcoming?language=en-US&page=1`,Headers);
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
      const res = await axios.get(apiUrl+`tv/on_the_air?language=en-US&page=1`, Headers);
      await setarrivingToday(res?.data?.results);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  // now playing in India
  const nowPlaying = async ()=>{
    try {
      const res = await axios.get(apiUrl+`movie/now_playing?language=en-US&page=1&region=US`, Headers);
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
  const LogOut = async ()=>{
   await setisSignedIn(false);
    await AsyncStorage.clear();
  }
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      setAuthToken(storedToken);
    };
    checkToken();
  }, []);
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
    <Animated.ScrollView>
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
        <TouchableOpacity onPress={()=>LogOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
          <Animated.FlatList
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
      </Animated.View>
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
    </Animated.ScrollView>
  );
};

export default HomeScreen;

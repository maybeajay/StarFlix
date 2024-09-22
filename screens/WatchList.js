import { View, Text, ToastAndroid, Dimensions, Image, Pressable, StyleSheet, Platform } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import axios from 'axios';
import {EXPO_PUBLIC_API_URL, EXPO_PUBLIC_ACCESS_TOKEN } from '@env'
import HorizontalMoviesData from '../components/HorizontalMoviesData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomCarousel from 'carousel-with-pagination-rn';
import Animated from 'react-native-reanimated';
import { imageUrl } from '../constant';

import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height
export default function ProfileScreen({navigation}) {
  const [watchlistMovie , setwatchlistMovie] = useState([]);
  const [isVertical, setIsVertical] = React.useState(false);
  const navigate = useNavigation();
  const Headers = {
    headers: {
      accept: "application/json",
      'content-type': 'application/json',
      Authorization: EXPO_PUBLIC_ACCESS_TOKEN,
    },
  }
  const getWatchListMovie = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}account/null/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`, Headers);
      console.log("RESSSSS",res);
      await setwatchlistMovie(res?.data?.results);
    } catch (error) {
      if(Platform.OS == 'android')
      ToastAndroid.show("Something Went wrong", ToastAndroid.SHORT)
    }
  }
  useFocusEffect(useCallback(()=>{
    getWatchListMovie();
  }, []))

  const addToFavourites = async (mediaId)=>{
    try {
      const res = await axios.post(`${EXPO_PUBLIC_API_URL}account/null/favorite`, {
        media_type: 'movie', media_id: mediaId, favorite: true
      }, Headers)
      if(res?.data?.success){
        ToastAndroid.show("Added to Favourites", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.show("Something Went wrong", ToastAndroid.SHORT)
    }
  }
  
  const {Logout} = useContext(AuthContext)



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-2xl text-center mt-5 font-bold">My Goto Movies</Text>
      <View
      style={styles.container}
    >
        <CustomCarousel
          data={watchlistMovie}
          disablePagination={true}
          renderItem={({item}) =><Animated.View style={styles.content}>
             <Pressable  
                onPress={()=>navigation.navigate("Movie Details", {
                  id: item?.id,
                  media: "movie",
                })}
                >
                <Image
                  source={{ uri: `${imageUrl}${item?.poster_path}` }}
                  style={styles.image}
                />
                </Pressable>
                <Pressable style={styles.btn} onPress={()=>addToFavourites(item?.id)}>
                  <Text style={styles.title}><Ionicons name='heart-outline' size={30} color={'#ED2939'}/> Add  to Favourites</Text>
                </Pressable>
          </Animated.View>}
        />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight-150,
    alignItems: 'center',
    padding: 25
  },
  image: {
    flex: 1,
    width: ScreenWidth-50,
    padding: 15,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  content: {
    flex: 0.2,
    alignItems: 'center',
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: "center",
    bottom: 45,
    color: "#fff"
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  btn: {
    marginBottom: 10, 
    display: 'flex', 
    alignItems: "center", 
    flexDirection: "row",
    color: "#fff",
    justifyContent: 'center'
  },
});
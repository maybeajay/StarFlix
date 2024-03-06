import { View, Text, ToastAndroid } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios';
import {EXPO_PUBLIC_API_URL, EXPO_TEST_TOKEN } from '@env'
import HorizontalMoviesData from '../components/HorizontalMoviesData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
export default function ProfileScreen() {
  const [watchlistMovie , setwatchlistMovie] = useState([]);
  const navigate = useNavigation();
  const Headers = {
    headers: {
      accept: "application/json",
      'content-type': 'application/json',
      Authorization: EXPO_TEST_TOKEN,
    },
  }
  const getWatchListMovie = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}account/null/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`, Headers);
      console.log("RESSSSS",res);
      await setwatchlistMovie(res?.data?.results);
    } catch (error) {
      ToastAndroid.show("Something Went wrong", ToastAndroid.SHORT)
    }
  }
  useFocusEffect(useCallback(()=>{
    getWatchListMovie();
  }, []))
  const {Logout} = useContext(AuthContext)
  return (
    <View>
      <Text>My Goto Movies</Text>
      <HorizontalMoviesData data={watchlistMovie} navigation={navigate} media={'movie'}/>
    </View>
  )
}
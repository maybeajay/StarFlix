import { View, Text, ToastAndroid, Dimensions, Image, Pressable, StyleSheet, Platform } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import axios from 'axios';
import {EXPO_PUBLIC_API_URL, EXPO_TEST_TOKEN } from '@env'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomCarousel from 'carousel-with-pagination-rn';
import Animated from 'react-native-reanimated';
import { imageUrl } from '../constant';
import { ScrollView } from 'react-native-gesture-handler';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height
export default function Favourites({navigation}) {
  const [watchlistMovie , setwatchlistMovie] = useState([]);
  const [isVertical, setIsVertical] = React.useState(false);
  const navigate = useNavigation();
  const Headers = {
    headers: {
      accept: "application/json",
      'content-type': 'application/json',
      Authorization: EXPO_TEST_TOKEN,
    },
  }
  const getFavouritesMovies = async()=>{
    try {
      const res = await axios.get(`${EXPO_PUBLIC_API_URL}account/null/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, Headers);
      console.log("RESSSSS",res);
      await setwatchlistMovie(res?.data?.results);
    } catch (error) {
      if(Platform.OS == 'android')
      ToastAndroid.show("Something Went wrong", ToastAndroid.SHORT)
    }
  }
  useFocusEffect(useCallback(()=>{
    getFavouritesMovies();
  }, []))
  
  const {Logout} = useContext(AuthContext)



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-2xl text-center mt-5 font-bold">My Favourites Movies</Text>
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
                <Text style={styles.title}>{item?.title ? item?.title : item?.name}</Text>
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
    height: ScreenHeight-200,
    alignItems: 'center',
    padding: 15
  },
  image: {
    flex: 1,
    width: ScreenWidth-50,
    padding: 15,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: "center"
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  extraDesc: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
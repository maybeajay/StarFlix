// project imports
import {
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { imageUrl } from "../constant";
const apiUrl = process.env.EXPO_PUBLIC_API_URL
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACESS_TOKEN;


// added imports
import Ionicons from '@expo/vector-icons/Ionicons';


const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState("");
  const [searchMovies, setsearchMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  // get the search movie results;
  const getSearchResult = async () => {
    try {
      const res = await axios.get(
        apiUrl+`search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: ACCESS_TOKEN,
          },
        }
      );
      console.log(res?.data?.results)
      const tempSearch = [...res?.data?.results]?.filter((item)=>item.backdrop_path);
      setsearchMovies(tempSearch);
      // console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get genre id and label
  const getGenre = async () => {
    try {
      const res = await axios.get(apiUrl+`genre/movie/list?language=en`, {
        headers: {
          accept: "application/json",
          Authorization: ACCESS_TOKEN,
        },
      });
      // console.log("rrrrrrrrrrrrr",res);
      await setGenres(res?.data?.genres);
    } catch (error) {}
  };


  // handling navigating to details page
  console.log(searchMovies)

  const handleDetailPageNavigation = (id)=>{
    navigation.navigate("Movie Details", {id: id, media: searchMovies[0]?.media_type});
  }

  // get label from id
  const getGenreLabelFromId = async (idArray)=>{
  const newGenres = genres?.filter((item) => idArray.includes(item?.id));
  console.log("Filtered Genres:", newGenres);
  setGenre(newGenres);
  }

  useFocusEffect(
    useCallback(() => {
      getSearchResult();
    }, [query])
  );


  useEffect(() => {
    if (searchMovies.length > 0 && genres) {
      searchMovies.map((item) => {
        const id = item?.genre_ids// Assuming genre_ids is an array
        getGenreLabelFromId(id);
      });
    }
    getGenre()
  }, [searchMovies]);

  return (
      <SafeAreaView style={{ height: "100%" }}>
        <View classname="flex flex-row items-center">
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "auto",
              width: "80%",
              marginRight: "auto",
              marginTop: 50,
            }}
            className="bg-gray-60 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          >
            <Search
              size={20}
              color="black"
              className="relative inline-block mr-2"
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"#000"}
              value={query}
              onChangeText={(text) => setQuery(text)}
              style={{
                width: "100%",
              }}
            />
          { query.length > 2 ?  <View className="w-6 h-6 bg-[#6936f5] rounded-xl relative right-[50px] items-center">
            <Pressable onPress={()=>setQuery("")}><Ionicons name="close" size={20} color="white" className="mt-2"/></Pressable>
             </View> : ""}
          </View>
        </View>
        <View className="flex flex-col p-5 items-center">
          <FlatList
            scrollEnabled
            showsVerticalScrollIndicator={false}
            data={searchMovies}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={()=>handleDetailPageNavigation(item?.id)}
              >
              <View className="flex flex-row items-center">
                <Image
                  alt="movie-img"
                  source={{ uri: `${imageUrl}${item?.backdrop_path}` }}
                  style={{
                    width: 180,
                    height: 100,
                    shadowColor: "gray",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    resizeMode: "contain",
                    marginBottom: "20px",
                  }}
                  className="rounded-md my-5"
                />
                <Text className="absolute left-[150px] bottom-20  w-[25px] text-center text-white opacity-[0.9] bg-[#28303D]">
                  {Math.round(item?.vote_average * 10) / 10}
                </Text>
                <View className="flex flex-col mx-5 justify-center items-start mt-5 p-1">
                  <Text
                    className="text-md font-bold"
                    style={{
                      fontSize: 13,
                      maxWidth: "70%",
                      minWidth: "30%",
                      fontSize: 18
                    }}
                  >
                    {!item?.title ? item?.name : item?.title}
                  </Text>
                  <Text className="bg-[#6936f5] w-[50px] text-center text-white rounded-xl mt-2 opacity-[0.8]">
                    {item?.release_date?.slice(0, 4)}
                  </Text>
                  <View className="flex flex-row flex-wrap items-center" 
                  style={{
                    padding: 2,
                    columnGap: 8,
                    maxWidth: "70%"
                  }}
                  >
                  {genre.length > 0 && genre.map((genre)=><Text className="mt-2 opacity-[0.7] color-[#171e36] text-md"
                  style={{
                    // maxWidth: '85px',
                    // // minWidth: "50px"
                  }}
                  >{genre.name}</Text>)}
                </View>
                </View>
              </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
  );
};

export default SearchScreen;

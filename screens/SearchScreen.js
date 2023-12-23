import {
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { imageUrl } from "../constant";

// added dependencies
const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [searchMovies, setsearchMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  // get the search movie results;
  const getSearchResult = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
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
      const res = await axios.get(`${process.env.REACT_BASE_URL}genre/movie/list?language=en`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
        },
      });
      // console.log("rrrrrrrrrrrrr",res);
      await setGenres(res?.data?.genres);
    } catch (error) {}
  };

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
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
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
              marginTop: 60,
            }}
            className="bg-gray-60 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          >
            <Search
              size={20}
              color="black"
              className="relative inline-block mr-2"
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"#000"}
              onChangeText={(text) => setQuery(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>
        <View className="flex flex-col p-5">
          <FlatList
            data={searchMovies}
            renderItem={({ item }) => (
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
                <View className="flex flex-col mx-5 justify-center items-start">
                  <Text
                    className="text-md"
                    style={{
                      fontSize: 13,
                      maxWidth: "80%",
                      minWidth: "30%",
                    }}
                  >
                    {item?.title}
                  </Text>
                  {/* {getGenreLabelFromId(item?.genre_ids)} */}
                  <Text className="bg-blue-600 w-[50px] text-center text-white rounded-xl mt-2 opacity-[0.6]">
                    {item?.release_date.slice(0, 4)}
                  </Text>
                  <View className="flex flex-row  items-center">
                  {genre.length > 0 && genre.map((genre)=><Text className="bg-blue-600 rounded-xl mt-2 opacity-[0.6] text-white w-[80px]">{genre.name}</Text>)}
                </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchScreen;

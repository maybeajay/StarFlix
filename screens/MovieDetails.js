import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";


// added dependecies
import { imageUrl } from "../constant";


const MovieDetails = ({ route, navigation }) => {
  const { id } = route?.params;

  const [movieDetails, setmovieDetails] = useState([]);

  const getDetailsById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await setmovieDetails(res?.data)
    } catch (error) {
        console.log(error);
    }
  };

  useFocusEffect(useCallback(()=>{
    getDetailsById();
    console.log("MMMMMMMMMMMMm",movieDetails)
  }, []))
  return (
    <ScrollView>
        <View>
        <View className="mt-9">
          <Image
            source={{ uri: `${imageUrl}${movieDetails?.backdrop_path}` }}
            style={{
              width: '80%',
              height: 200, // Adjust the height to a fixed value
            }}
          />
          <Text>{movieDetails?.title}</Text>
          <Text>Release Date: {movieDetails?.release_date}</Text>
          <Text>Overview: {movieDetails?.overview}</Text>
          {/* Add more Text components for other details you want to display */}
          <Text>Popularity: {movieDetails?.popularity}</Text>
          <Text>Vote Average: {movieDetails?.vote_average}</Text>
        </View>
        </View>
        <Text>hello</Text>
    </ScrollView>
  );
};

export default MovieDetails;

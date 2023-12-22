// project imports
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  SafeAreaView
} from "react-native";
import { useContext } from "react";
// added dependencies
import axios from "axios";
import { Context } from "../App";
import HorizontalMoviesData from "../components/HorizontalMoviesData";

const options = {
  method: "GET",
  url: `${process.env.REACT_BASE_URL}trending/movie/day?language=en-US`,
  headers: {
    accept: "application/json",
    Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
  },
};

console.log("+++++", process.env.REACT_BASE_URL);

const Trending = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingSeries, settrendingSeries] = useState([]);
  const [arrivingSoon, setarrivingSoon]=useState([]);
  const { loading, setLoading } = useContext(Context);
  console.log(loading);

  // for popular movies
  const getPopularMovies = async () => {
    const res = await axios.request(options);
    await setPopularMovies(res?.data?.results);
    console.log(popularMovies);
  };

  // for popular series
  const getPopularTvSeries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_BASE_URL}tv/popular?language=en-US&page=2`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
          },
        }
      );
      await settrendingSeries(res?.data?.results);
      console.log(trendingSeries);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  const getArivingSoonData = async()=>{
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_BASE_URL}tv/on_the_air?language=en-US&page=1`, {
        headers:{
          accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`
        }
      })
      await setarrivingSoon(res?.data?.results);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }


  useFocusEffect(
    useCallback(() => {
      getPopularMovies();
      getPopularTvSeries();
      getArivingSoonData();
    }, [])
  );
  return(
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="color-[#0D111f] text-lg mx-3 mb-2 mt-4">Trending Movies!</Text>
      <HorizontalMoviesData data={popularMovies}/>
      <Text className="color-[#0D111f] text-lg mx-3 mb-6 mt-2">Popular TV shows!</Text>
      <HorizontalMoviesData data={trendingSeries} />
      <Text className="color-[#0D111f] text-lg mx-3 mb-6 mt-2">Arriving This Week!</Text>
      <HorizontalMoviesData data={arrivingSoon} />
      </ScrollView>
    </SafeAreaView>
  );

};

export default Trending;
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, Button, Platform } from "react-native";

// added dependencies

import { WebView } from 'react-native-webview';

const VideoPlayer = ({ route }) => {
  const { id, media } = route?.params;

  const finalUrl =
    media == "movie"
      ? `movie/${id}/videos?language=en-US`
      : `tv/${id}/videos?language=en-US`;

      console.log(media)
  const [videoDetails, setvideoDetails] = useState([]);

  const getMovieTrailer = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_BASE_URL}${finalUrl}`, {
        headers: {
          Accept: "application/json",
          Authorization: `${process.env.REACT_ACCESS_TOKEN}`,
        },
      });

      await console.log(res?.data);
      // getting trailer from the data
      const tempData = await res?.data?.results?.filter(
        (item) => item.type === "Trailer" || item.type === "Teaser"
      );
  
      setvideoDetails(tempData);
  
      console.log("resesee", res?.data?.results);
      console.log("temppppp", tempData);
    } catch (error) {
      console.log(error);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      getMovieTrailer();
    }, [id])
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={"#fc0101"}/>
      <WebView 
      style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{uri: `https://www.youtube.com/watch?v=${!videoDetails[1]?.key ? videoDetails[0]?.key : videoDetails[1]?.key }`}}
      />
    </View>
  );
};

export default VideoPlayer;

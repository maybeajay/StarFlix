import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';


// added dependencies
import YoutubePlayer from "react-native-youtube-iframe";


const VideoPlayer = ({route}) => {

  const {id, media} = route?.params

  const finalUrl =
media == "movie" ? `movie/${id}/videos?language=en-US` : `tv/${id}/videos?language=en-US`;
    const [videoDetails, setvideoDetails] = useState([]);
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

    const getMovieTrailer = async () =>{
        try {
            const res = await axios.get(`${process.env.REACT_BASE_URL}${finalUrl}`, {
              headers:{
                Accept: "application/json",
                Authorization: `${process.env.REACT_ACCESS_TOKEN}`
              }
            });
            console.log("resesee",res?.data?.results);
          // getting trailer from the data
        const tempData = await res?.data?.results?.filter((item)=>item.type=="Trailer")
        await setvideoDetails(tempData);
        } catch (error) {
            console.log(error)
        }

        console.log('temppppp', tempData) 
    }

    useFocusEffect(useCallback(()=>{
        getMovieTrailer();
    }, []))

    return (
        <View>
            <Text>Video player</Text>      
            <YoutubePlayer
        height={300}
        play={playing}
        videoId={!videoDetails[1]?.key ? videoDetails[0]?.key : videoDetails[1]?.key }
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />

        </View>
    );
}


export default VideoPlayer;

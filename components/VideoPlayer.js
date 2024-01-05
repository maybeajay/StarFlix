import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { View, Dimensions, Button } from "react-native";

// added dependencies
import YoutubePlayer from "react-native-youtube-iframe"

const VideoPlayer = ({ route }) => {
  const { id, media } = route?.params;

  const finalUrl =
    media == "movie"
      ? `movie/${id}/videos?language=en-US`
      : `tv/${id}/videos?language=en-US`;

      console.log(media)
  const [videoDetails, setvideoDetails] = useState([]);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


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
    <View>
      <YoutubePlayer
        height={Dimensions.get('window').height}
        width={Dimensions.get('window').width}
        play={playing}
        videoId={
          !videoDetails[1]?.key ? videoDetails[0]?.key : videoDetails[1]?.key
        }
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayer;

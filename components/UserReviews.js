import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {SendHorizontal} from 'lucide-react-native'
import { imageUrl } from "../constant";
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserReviews = ({ data }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [reviewText, setreviewText] = useState('');

  const toggleExpand = (index) => {
    setExpandedIndices((prevExpandedIndices) =>
      prevExpandedIndices.includes(index)
        ? prevExpandedIndices.filter((i) => i !== index)
        : [...prevExpandedIndices, index]
    );
  };

  // for posting a review
  const postReview = async()=>{
    const user = await AsyncStorage.getItem("user");
    if(user) alert("asdsa");
    else alert("no user ")
  }
  return (
    <View className="mt-8">
      {data?.length > 0 &&
        data.map((item, index) => (
          <View className="flex flex-col mx-5 mb-5" key={item.id}>
            <View className="flex flex-row items-center">
              {item?.author_details?.avatar_path ? (
                <Image
                  source={{
                    uri: `${imageUrl}${item?.author_details?.avatar_path}`,
                  }}
                  width={30}
                  height={30}
                  borderRadius={15}
                  className="mr-3"
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  style={{ marginRight: 5 }}
                />
              )}
              <Text style={{fontFamily: "Poppins_500Medium"}}>{item?.author_details?.username}</Text>
            </View>
            <View className="flex flex-row mt-2 items-center">
              <Ionicons
                name="md-star"
                size={20}
                color="gold"
                className="mt-2"
              />
              <Text>{item?.author_details?.rating}/10</Text>
            </View>
            <View classname="flex flex-row">
              {expandedIndices.includes(index) ? (
                <Text classname="mx-5 text-md" style={{fontFamily: "Sarala_400Regular", lineHeight: 18}}>{item?.content}</Text>
              ) : (
                <Text classname="mx-5 text-md" style={{fontFamily: "Sarala_400Regular", lineHeight: 18}}>
                  {item?.content?.slice(0, 250)}.....
                </Text>
              )}
            </View>
            <View className="">
              <TouchableOpacity onPress={() => toggleExpand(index)} className="mx-atuo flex flex-row">
                <Text classname="text-gray-600">
                  Read {expandedIndices.includes(index) ? "Less" : "More"}
                </Text>
                <Ionicons
                  name={expandedIndices.includes(index) ? "arrow-up" : "arrow-forward-outline"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      {/* your review section */}
      <View className="mt-5">
        <Text className="mx-5 font-bold text-xl" style={{fontFamily: "Prompt_600SemiBold"}}>Post your review</Text>
        <TextInput onTextInput={(text) => setreviewText(text)}
          className="w-4/5 rounded-md h-10 mx-auto mt-3 p-2"
          style={{
            borderWidth: 1,
            borderColor: "#6936f5",
          }}
        />
        <View className="flex flex-row">
        <TouchableOpacity className="relative left-[320] bottom-7" onPress={postReview}>
        <SendHorizontal strokeWidth={2} size={20} color={"#6936f5"}/>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default UserReviews;

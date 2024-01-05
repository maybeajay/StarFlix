import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { imageUrl } from "../constant";
const UserReviews = ({ data }) => {
  console.log(data);
  return (
    <View className="mt-8">
      {data?.length > 0 &&
        data.map((item) => (
          <View className="flex flex-col mx-5 mb-5" key={item.id}>
           <View className="flex flex-row items-center">
            {
                item?.author_details?.avatar_path ? <Image source={{uri: `${imageUrl}${item?.author_details?.avatar_path }`}}
                width={30}
                height={30}
                borderRadius={15}
                className="mr-3"
                />
                : <Ionicons name="person-circle-outline" size={30} style={{marginRight: 5}}/>
            }
           <Text>{item?.author_details?.username}</Text>
           </View>
           <View className="flex flex-row mt-2 items-center">
           <Ionicons name="md-star" size={20} color="gold" className="mt-2" />
           <Text>{item?.author_details?.rating}/10</Text>
           </View>
            <Text className="mx-5 text-md">{item?.content}</Text>
          </View>
        ))}

        
    </View>
  );
};
export default UserReviews;

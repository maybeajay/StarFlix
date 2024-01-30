// project imports
import React from 'react';
import {View, ScrollView, SafeAreaView, Image, FlatList, Text, Pressable} from 'react-native';
import { imageUrl } from '../constant';

// added dependencies
import Ionicons from '@expo/vector-icons/Ionicons';


const HorizontalMoviesData = ({data, navigation, media}) => {
    return (
        <SafeAreaView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} overScrollMode='never'>
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex mx-1">
                <Pressable  
                onPress={()=>navigation.navigate("Movie Details", {
                  id: item?.id,
                  media: media,
                })}
                >
                <Image
                  source={{ uri: `${imageUrl}${item?.poster_path}` }}
                  style={{ width: 170, height: 215, resizeMode: "contain"}}
                />
                </Pressable>
                <View style={{
                    width: "95%",
                    display: 'flex',
                }}>
                <View className="flex flex-row relative bottom-7 justify-around h-8 rounded-sm" 
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}
                >
                  <View className="flex flex-row items-star justify-between">
                  <Text className="text-white mx-3 text-md mt-2">{item?.title ? item?.title.slice(0, 7) : item?.name.slice(0, 15)}</Text>
                  <Text className="bg-transparent text-white mt-2 text-md">
                    {Math.round(item?.vote_average*10)/10}
                  </Text>
                  <Ionicons name="md-star" size={17} color="gold" style={{marginTop: 4, marginLeft: 6}}/>
                  </View>
                </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
}


export default HorizontalMoviesData;

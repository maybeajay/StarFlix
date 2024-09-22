// project imports
import React from 'react';
import {View, ScrollView, SafeAreaView, Image, Text, Pressable, FlatList} from 'react-native';
import { imageUrl } from '../constant';

// added dependencies
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const HorizontalMoviesData = ({data, navigation, media}) => {
    return (
        <SafeAreaView>
          <FlatList
            data={data}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Animated.View className="flex mx-1" sharedTransitionStyle={"sharedTag"}>
                <Pressable  
                onPress={()=>navigation.navigate("Movie Details", {
                  id: item?.id,
                  media: media,
                })}
                >
                <Image
                  source={{ uri: `${imageUrl}${item?.poster_path}` }}
                  style={{ width: 200, height: 260, resizeMode: "contain"}}
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
                  <Text className="text-white mx-3 text-md mt-2" style={{fontFamily: "Prompt_600SemiBold"}}>{item?.title ? item?.title : item?.name}</Text>
                  <Text className="bg-transparent text-white mt-2 text-md">
                    {Math.round(item?.vote_average*10)/10}
                  </Text>
                  <EvilIcons name="star" size={17} color="gold" style={{marginVertical: "auto", marginLeft: 6}}/>
                  </View>
                </View>
                </View>
              </Animated.View>
            )}
          />
      </SafeAreaView>
    );
}


export default HorizontalMoviesData;

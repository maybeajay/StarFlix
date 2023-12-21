// project imports
import React from 'react';
import {View, ScrollView, SafeAreaView, Image, FlatList, Text} from 'react-native';
import { imageUrl } from '../constant';
// added dependencies
import { Star } from 'lucide-react-native';

const HorizontalMoviesData = ({data}) => {
    return (
        <SafeAreaView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex mx-5">
                <Image
                  source={{ uri: `${imageUrl}${item?.backdrop_path}` }}
                  style={{ width: 170, height: 200, resizeMode: "contain" }}
                  className="rounded-md object-contain"
                />
                <View style={{
                    width: 170,
                    display: 'flex',
                }}>
                <View className="flex flex-row relative bottom-7 justify-center h-10 rounded-sm" 
                style={{
                    backdropFilter: 'blur(100px)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }}
                >
                  <Text className="text-white mx-3 text-md mt-2">{item?.title ? item?.title.slice(0, 15) : item?.name.slice(0, 15)}</Text>
                  <Text className="bg-transparent text-white mt-2 text-md">
                    {Math.round(item?.vote_average*10)/10}
                  </Text>
                  <Star color="#ffcda5" size={20} className='mt-1 ml-1'/>
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

import React, { useState } from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';

const DetailsViewPage = ({route}) => {
    const [trendingMovies, setTrendingMovies] = useState([])
    
    // getting movies to full page
    return (
        <SafeAreaView>
            <View className="flex flex-1">
                <FlatList 
                
                />
            </View>
        </SafeAreaView>
    );
}


export default DetailsViewPage;

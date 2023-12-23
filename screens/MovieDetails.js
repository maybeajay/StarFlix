import React from 'react';
import {View, StyleSheet} from 'react-native';

const MovieDetails = ({route, navigation}) => {
    console.log(route.params)
    return (
        <View>
            <Text>Details</Text>
        </View>
    );
}


export default MovieDetails;

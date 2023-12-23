import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MovieDetails from "./MovieDetails";
const Stack = createStackNavigator();

const NavigateScreen = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Movie Details" component={MovieDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
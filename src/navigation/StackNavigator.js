import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SearchView from '../components/SearchView';
import BookingScreen from '../screens/BookingScreen/BookingScreen.js';
import DriversScreen from '../screens/DriversScreen/DriversScreen.js';
import HomeScreen from '../screens/Homescreen/HomeScreen.js';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchView} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="Drivers" component={DriversScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
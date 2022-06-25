import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import TabBar from './TabBar.routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>

            <StatusBar backgroundColor='transparent' translucent={true} style='light' />

            <Stack.Navigator 
                initialRouteName='TabBar'
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen name='SplashScreen' component={SplashScreen} />

                <Stack.Screen name='Home' component={Home} />

                <Stack.Screen name='About' component={SplashScreen} />

                <Stack.Screen name='TabBar' component={TabBar} />

            </Stack.Navigator>

        </NavigationContainer>
    );
}
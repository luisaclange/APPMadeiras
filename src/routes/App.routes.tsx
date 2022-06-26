import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import TabBar from './TabBar.routes';
import { ThemeProvider } from 'styled-components';
import globalStyle from '../styles/globalStyle';
import { StatusBar } from 'react-native';
import Historic from '../screens/Historic';
import NewCalc from '../screens/NewCalc';
import Settings from '../screens/Settings';

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <ThemeProvider theme={globalStyle}>

            <NavigationContainer>

                <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />

                <Stack.Navigator
                    initialRouteName='Historic'
                    screenOptions={{
                        headerShown: false,
                        animation: 'none'
                    }}
                >

                    <Stack.Screen name='SplashScreen' component={SplashScreen} />

                    <Stack.Screen name='Home' component={Home} />

                    <Stack.Screen name='About' component={SplashScreen} />

                    <Stack.Screen name='Historic' component={Historic} />

                    <Stack.Screen name='NewCalc' component={NewCalc} />

                    <Stack.Screen name='Settings' component={Settings} />

                </Stack.Navigator>

            </NavigationContainer>

        </ThemeProvider>
    );
}

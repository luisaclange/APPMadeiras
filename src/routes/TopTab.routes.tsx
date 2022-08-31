import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';
import { ThemeProvider } from 'styled-components';
import globalStyle from '../styles/globalStyle';
import { Dimensions, Image, ImageBackground, StatusBar, View } from 'react-native';
import Historic from '../screens/Historic';
import Settings from '../screens/Settings';
import About from '../screens/About';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { DataProvider } from '../context/context';
import { NewCalc } from './NewCalc.routes';
import Icon from 'react-native-vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../components/Global/Header';
import Logo from '../assets/logo.svg'

export default function TopTab() {

    const { Navigator, Screen } = createMaterialTopTabNavigator();

    return (

        <>
            <Image
                source={require('../assets/Background.png')}
                style={{ height: '100%', position: "absolute", bottom: 0 }}
            />

            <Navigator
                initialRouteName='Historic'
                style={{
                    elevation: 0,   // for Android
                    shadowOffset: {
                        width: 0, height: 0 // for iOS
                    },
                    borderBottomWidth: 0, // Just in case.
                }}
                sceneContainerStyle={{
                    backgroundColor: 'transparent'
                }}
                tabBar={({ state, navigation }) => {
                    return (<Header focused={state.index} />)
                }}
            >


                <Screen
                    name='Historic'
                    component={Historic}
                />

                <Screen
                    name='NewCalc'
                    component={NewCalc}
                />

                <Screen
                    name='Settings'
                    component={Settings}
                />


            </Navigator>
        </>
    );
}

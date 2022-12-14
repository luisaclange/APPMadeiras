import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import { ThemeProvider } from 'styled-components';
import globalStyle from '../styles/globalStyle';
import { StatusBar } from 'react-native';
import About from '../screens/About';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_500Medium_Italic } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { DataProvider } from '../context/context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTab from './TopTab.routes';
import Result from '../screens/Result';

export default function App() {

    const { Navigator, Screen } = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_500Medium_Italic
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ThemeProvider theme={globalStyle}>

            <DataProvider>

                <NavigationContainer>

                    <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />

                    <Navigator initialRouteName='Home' screenOptions={{
                        headerShown: false,
                        animation: 'fade_from_bottom'
                    }}
                    >

                        <Screen name='Home' component={Home} />

                        <Screen name='About' component={About} />

                        <Screen name='TabBar' component={TopTab} />

                        <Screen name='Result' component={Result} initialParams={{ id_calc: undefined }} />

                    </Navigator>

                </NavigationContainer>

            </DataProvider>

        </ThemeProvider>
    );
}

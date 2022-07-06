import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { ThemeProvider } from 'styled-components';
import globalStyle from '../styles/globalStyle';
import { StatusBar } from 'react-native';
import Historic from '../screens/Historic';
import Settings from '../screens/Settings';
import About from '../screens/About';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { DataProvider } from '../context/context';
import { NewCalc } from './NewCalc.routes';

export default function App() {

    const { Navigator, Screen } = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ThemeProvider theme={globalStyle}>

            <DataProvider>

                <NavigationContainer>

                    <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />

                    <Navigator
                        initialRouteName='Home'
                        screenOptions={{
                            headerShown: false,
                            animation: 'none'
                        }}
                    >

                        <Screen name='Home' component={Home} />

                        <Screen name='About' component={About} />

                        <Screen name='Historic' component={Historic} />

                        <Screen name='Settings' component={Settings} />

                        <Screen name='NewCalc' component={NewCalc} />

                    </Navigator>

                </NavigationContainer>

            </DataProvider>

        </ThemeProvider>
    );
}

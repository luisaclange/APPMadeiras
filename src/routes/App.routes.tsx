import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import globalStyle from '../styles/globalStyle';
import Historic from '../screens/historic';
import NewCalc1 from '../screens/newCalc/newCalc1';
import NewCalc2 from '../screens/newCalc/newCalc2';
import NewCalc3 from '../screens/newCalc/newCalc3';
import Filter from '../screens/filter';
import Home from '../screens/home';
import { DataProvider } from '../context/context';
import Results from '../screens/results';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'none',
};

export type TRootStackParamList = {
  Results: { id_calc?: string },
  NewCalc1: { id_calc?: string },
  NewCalc2: { id_calc?: string },
  NewCalc3: { id_calc?: string }
}

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <ThemeProvider theme={globalStyle}>
      <DataProvider>
        <NavigationContainer>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="transparent"
          />

          <Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
          >

            <Screen name="Home" component={Home} />

            <Screen name="Historic" component={Historic} />

            <Screen name="Filter" component={Filter} />

            <Screen name="NewCalc1" component={NewCalc1} />

            <Screen name="NewCalc2" component={NewCalc2} />

            <Screen name="NewCalc3" component={NewCalc3} />

            <Screen name="Results" component={Results} />

          </Navigator>
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}

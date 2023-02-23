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
import MoreInfo from '../screens/moreInfo';
import About from '../screens/about';
import NewNail from '../screens/newPin/newNail';
import NewThroughScrew from '../screens/newPin/newThroughScrew';
import NewSuperbScrew from '../screens/newPin/newSuperbScrew';
import HistoricPins from '../screens/historicPins';
import { ICardNail } from '../components/historicPins/cardNail';
import { ICardSuperbScrew } from '../components/historicPins/cardSuperbScrew';
import { ICardThroughScrew } from '../components/historicPins/cardThroughScrew';

const screenOptions: NativeStackNavigationOptions = {
	headerShown: false,
	animation: 'none',
};

export type TRootStackParamList = {
	Results: { id_calc?: string };
	MoreInfo: { id_calc?: string };
	NewCalc1: { id_calc?: string };
	NewCalc2: { id_calc?: string };
	NewCalc3: { id_calc?: string };
	NewNail: { data?: ICardNail };
	NewSuperbScrew: { data?: ICardSuperbScrew };
	NewThroughScrew: { data?: ICardThroughScrew };
};

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

						<Screen name="About" component={About} />

						<Screen name="Historic" component={Historic} />

						<Screen name="HistoricPins" component={HistoricPins} />

						<Screen name="Filter" component={Filter} />

						<Screen name="NewCalc1" component={NewCalc1} />

						<Screen name="NewCalc2" component={NewCalc2} />

						<Screen name="NewCalc3" component={NewCalc3} />

						<Screen name="NewNail" component={NewNail} />

						<Screen name="NewSuperbScrew" component={NewSuperbScrew} />

						<Screen name="NewThroughScrew" component={NewThroughScrew} />

						<Screen name="MoreInfo" component={MoreInfo} />

						<Screen name="Results" component={Results} />
					</Navigator>
				</NavigationContainer>
			</DataProvider>
		</ThemeProvider>
	);
}

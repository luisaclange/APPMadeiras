import React from 'react';
import { View } from 'react-native';
import Header from '../../components/global/header';
import {
	Container,
	ContainerScroll,
} from './styles';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { useNavigation } from '@react-navigation/native';

export default function About() {
	// Navegação
	const navigation = useNavigation();

	return (
		<View style={{ height: '100%' }}>
			<Header title="Sobre" />
			<ContainerScroll contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<>

					</>
				</Container>
			</ContainerScroll>
			<ButtonDark
				text="Voltar"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}

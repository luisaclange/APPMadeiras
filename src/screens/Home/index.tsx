import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/svgs/logo.svg';
import ButtonLight from '../../components/global/buttons/buttonLight';
import {
	Background,
	Container,
	ContainerButtons,
	ContainerText,
	Description,
} from './styles';
import { database } from '../../database';
import { FilterModel } from '../../database/models/filterModel';
import ScreenView from '../../components/global/screenView';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';

const styles = StyleSheet.create({
	buttonLight: {
		width: RFValue(250, 700),
		marginBottom: RFValue(16, 700),
	},
});

export default function Home() {
	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [visible, setVisible] = useState(false);

	// Começar
	async function Begin() {
		const filter = (
			await database.get<FilterModel>('filter').query().fetch()
		)[0];
		if (!filter)
			await database.write(async () => {
				await database.get<FilterModel>('filter').create(item => {
					item.created_at = Number(new Date());
				});
			});
		const dateAtual = new Date();
		if (Number(dateAtual) < Number(new Date('2023-04-30T00:00:00.000Z')))
			navigation.dispatch(CommonActions.navigate('Historic'));
		else setVisible(true);
	}

	return (
		<ScreenView>
			<PopUpOneButton
				actionButton={() => {
					setVisible(false);
				}}
				message='Ops, o período de teste expirou! Infelizmente o aplicativo não está mais disponível para uso'
				setVisible={setVisible}
				textButton='OK'
				visible={visible}
			/>
			<Background
				source={require('../../assets/images/HomeBackground.png')}
				resizeMode='cover'
			>
				<Container>
					<ContainerText>
						<Logo />
						<Description>
							Aplicativo de dimensionamento de ligações em madeira
						</Description>
					</ContainerText>
					<ContainerButtons>
						<ButtonLight
							text="Sobre"
							style={styles.buttonLight}
							onPress={() => {
								navigation.dispatch(CommonActions.navigate('About'));
							}}
						/>
						<ButtonLight
							text="Começar"
							style={{ width: RFValue(250, 700) }}
							onPress={() => {
								Begin();
							}}
						/>
					</ContainerButtons>
				</Container>
			</Background>
		</ScreenView>
	);
}

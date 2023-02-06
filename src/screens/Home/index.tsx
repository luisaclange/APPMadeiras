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
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import { database } from '../../database';
import { FilterModel } from '../../database/models/filterModel';

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
	const [visibleAboutModal, setVisibleAboutModal] = useState(false);

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

		navigation.dispatch(CommonActions.navigate('Historic'));
	}

	return (
		<>
			<PopUpOneButton
				actionButton={() => {
					setVisibleAboutModal(false);
				}}
				message="Sobre o aplicativo"
				setVisible={setVisibleAboutModal}
				textButton="Fechar"
				visible={visibleAboutModal}
			/>
			<Background
				source={require('../../assets/images/HomeBackground.png')}
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
								setVisibleAboutModal(true);
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
		</>
	);
}

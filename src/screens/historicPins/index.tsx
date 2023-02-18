import {
	CommonActions,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { database } from '../../database';
import { ButtonContainer, Container, ContainerItems, Modal, Space } from './styles';
import LoadingPage from '../../components/global/loadingPage';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { NailModel } from '../../database/models/nailModel';
import NailData from '../../archive/PinsDimensions/Nails.json';
import SuperbScrewData from '../../archive/PinsDimensions/SuperbScrews.json';
import ThroughScrewData from '../../archive/PinsDimensions/ThroughScrews.json';
import Header from '../../components/global/header';
import { SuperbScrewModel } from '../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../database/models/throughScrewModel';
import CardNail, { ICardNail } from '../../components/historicPins/cardNail';
import CardSuperbScrew, { ICardSuperbScrew } from '../../components/historicPins/cardSuperbScrew';
import CardThroughScrew, { ICardThroughScrew } from '../../components/historicPins/cardThroughScrew';
import CustomModal from '../../components/global/modal';

export default function HistoricPins() {
	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [dataNails, setDataNails] = useState<ICardNail[]>([]);
	const [dataSuperbScrew, setDataSuperbScrew] = useState<ICardSuperbScrew[]>([]);
	const [dataThroughScrew, setDataThroughScrew] = useState<ICardThroughScrew[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentOpen, setCurrentOpen] = useState('');
	const [visible, setVisible] = useState(false);

	// Buscar dados
	const GetData = useCallback(async () => {
		const auxDataNail = await database.get<NailModel>('nails').query().fetch();
		const auxNail = auxDataNail
			.map(item => {
				return {
					id: item.id,
					name: item.name,
					JP: item.JP,
					LPP: item.LPP,
					isData: true
				};
			})
			.concat(NailData.map(item => {
				return {
					id: item.id,
					name: item.name,
					JP: item.JP,
					LPP: item.LPP,
					isData: false
				};
			}));
		setDataNails(auxNail);

		const auxDataSuperbScrew = await database.get<SuperbScrewModel>('superbScrews').query().fetch();
		const auxSuperbScrew = auxDataSuperbScrew
			.map(item => {
				return {
					id: item.id,
					name: item.name,
					diameter: item.diametro,
					length: item.comprimento,
					isData: true
				};
			})
			.concat(SuperbScrewData.map(item => {
				return {
					id: item.id,
					name: item.name,
					diameter: item.diametro,
					length: item.comprimento,
					isData: false
				};
			}));
		setDataSuperbScrew(auxSuperbScrew);

		const auxDataThroughScrew = await database.get<ThroughScrewModel>('throughScrews').query().fetch();
		const auxThroughScrew = auxDataThroughScrew
			.map(item => {
				return {
					id: item.id,
					name: item.name,
					diameter: item.diametro,
					length: item.comprimento,
					rosLenght: item.roscaComp,
					height: item.altura,
					isData: true
				};
			})
			.concat(ThroughScrewData.map(item => {
				return {
					id: item.id,
					name: item.name,
					diameter: item.diametro,
					length: item.comprimento as number,
					rosLenght: item.roscaComp,
					height: item.altura,
					isData: false
				};
			}));
		setDataThroughScrew(auxThroughScrew);
		setIsLoading(false);
	}, []);

	// Buscar dados quando a tela entra em foco
	useFocusEffect(
		React.useCallback(() => {
			GetData();
		}, [GetData]),
	);

	return (
		<Container>
			<CustomModal
				backdrop
				dismissOnPress
				setVisible={setVisible}
				visible={visible}
			>
				<Modal>
					<ButtonDark
						text="Novo prego"
						style={{ width: '100%' }}
						onPress={() => {
							setVisible(false);
							navigation.dispatch(
								CommonActions.navigate('NewNail')
							);
						}}
					/>
					<Space />
					<ButtonDark
						text="Novo parafuso de rosca soberba"
						style={{ width: '100%' }}
						onPress={() => {
							setVisible(false);
							navigation.dispatch(
								CommonActions.navigate('NewSuperbScrew')
							);
						}}
					/>
					<Space />
					<ButtonDark
						text="Novo parafuso passante"
						style={{ width: '100%' }}
						onPress={() => {
							setVisible(false);
							navigation.dispatch(
								CommonActions.navigate('NewThroughScrew')
							);
						}}
					/>
				</Modal>
			</CustomModal>
			<Header title='Histórico de pinos' />
			<ContainerItems>
				{!isLoading ? (
					<>
						<CardNail dataNails={dataNails} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} getData={GetData} />

						<Space />

						<CardSuperbScrew dataSuperbScrews={dataSuperbScrew} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} getData={GetData} />

						<Space />

						<CardThroughScrew dataThroughScrews={dataThroughScrew} currentOpen={currentOpen} setCurrentOpen={setCurrentOpen} getData={GetData} />
					</>
				) : (
					<LoadingPage />
				)}
			</ContainerItems>
			<ButtonContainer>
				<ButtonDark
					text="Voltar"
					style={{ width: RFValue(150, 700) }}
					onPress={() => {
						navigation.goBack();
					}}
				/>

				<ButtonDark
					text="Novo pino"
					style={{ width: RFValue(150, 700) }}
					onPress={() => {
						setVisible(true);
					}}
				/>
			</ButtonContainer>
		</Container>
	);
}

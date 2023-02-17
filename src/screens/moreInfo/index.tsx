import React, { useCallback, useEffect, useState } from 'react';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../routes/App.routes';
import Header from '../../components/global/header';
import {
	Container,
	ContainerButtons,
	ContainerInfo,
	ContainerScroll,
	ContainerUnity,
	ImageCorte,
	ItemUnity,
	Label,
	Line,
	Subtitle,
	TextUnity,
	TextValueUnity,
	Title,
	ValueInfo,
	ValueUnity,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingPage from '../../components/global/loadingPage';
import { CalcModel } from '../../database/models/calcModel';
import { database } from '../../database';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import { Kmod } from '../../archive/NBRTables/WoodProperties/Kmod';
import { NativeWoods } from '../../archive/NBRTables/NativeWood/NativeWood';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import { WoodTypeData } from '../../datas/WoodType';
import { LigationTypeData } from '../../datas/LigationType';
import { PinTypeData } from '../../datas/PinType';
import { CalcData } from '../../datas/Calc';
import { INail } from '../../interfaces/Nail';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../interfaces/ThroughScrew';
import { NailModel } from '../../database/models/nailModel';
import { SuperbScrewModel } from '../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../database/models/throughScrewModel';

interface IInfo {
	description: string;
	charging: string;
	humidityClass: string;
	woodName: string;
	woodType: string;
	ligationType: string;
	pinSelected: string;
	pinType: string;
	calc: string;
	esp1: number;
	esp2: number;
	lar: number;
	qtde?: number;
	force?: number;
}

export default function MoreInfo({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'MoreInfo'>) {
	// Parâmetros
	const { id_calc } = route.params.params || {};

	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [loading, setLoading] = useState(true);
	const [dataInfo, setDataInfo] = useState<IInfo | Record<string, never>>({});
	const [visibleError, setVisibleError] = useState(false);

	// Buscar dados
	const GetData = useCallback(async () => {
		try {
			const aux = await database.get<CalcModel>('calcs').find(id_calc);

			let pinSelected = '';
			switch (aux.pinType) {
				case 'prego':
					pinSelected = NailsDimensions.find(
						(item: INail) => item.id === aux.pinSelected,
					)?.name;

					if (!pinSelected)
						pinSelected = (await database.get<NailModel>('nails').find(aux.pinSelected))?.name;
					break;
				case 'parafusoSoberba':
					pinSelected = SuperbScrewsDimensions.find(
						(item: ISuperbScrew) => item.id === aux.pinSelected,
					)?.name;

					if (!pinSelected)
						pinSelected = (await database.get<SuperbScrewModel>('superbScrews').find(aux.pinSelected))?.name;
					break;
				case 'parafusoPassante':
					pinSelected = ThroughScrewsDimensions.find(
						(item: IThroughScrew) => item.id === aux.pinSelected,
					)?.name;

					if (!pinSelected)
						pinSelected = (await database.get<ThroughScrewModel>('throughScrews').find(aux.pinSelected))?.name;
					break;
				default:
					pinSelected = '';
					break;
			}

			setDataInfo({
				charging: Kmod.kmod1.find(item => item.id === aux.charging)
					?.name,
				description: aux.description,
				humidityClass: Kmod.kmod2.find(
					item => item.id === aux.humidityClass,
				)?.name,
				woodName: NativeWoods.find(item => item.id === aux.woodName)
					?.name,
				woodType: WoodTypeData.find(item => item.id === aux.woodType)
					?.value,
				ligationType: LigationTypeData.find(
					item => item.id === aux.ligationType,
				)?.value,
				pinSelected,
				pinType: PinTypeData.find(item => item.id === aux.pinType)
					?.value,
				calc: CalcData.find(item => item.id === aux.calc)?.value,
				esp1: aux.espWood_1,
				esp2: aux.espWood_2,
				lar: aux.widthWood,
				qtde: aux.numberPins,
				force: aux.tractiveForce,
			});
			setLoading(false);
		} catch (error) {
			setVisibleError(true);
		}
	}, [id_calc]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	return (
		<Container>
			<PopUpOneButton
				actionButton={() => {
					setVisibleError(false);
					navigation.dispatch(CommonActions.navigate('Historic'));
				}}
				message="Ops, ocorreu um erro"
				setVisible={setVisibleError}
				textButton="Voltar"
				visible={visibleError}
			/>
			<Header title="Mais Informações" />
			<ContainerScroll>
				{!loading ? (
					<ContainerInfo>
						<Title>{dataInfo.description}</Title>

						<Line />

						<Subtitle>Informações</Subtitle>

						<Label>Classe de carregamento</Label>
						<ValueInfo>{dataInfo.charging}</ValueInfo>

						<Label>Classe de umidade</Label>
						<ValueInfo>{dataInfo.humidityClass}</ValueInfo>

						<Label>Espécie de madeira</Label>
						<ValueInfo>{dataInfo.woodName}</ValueInfo>

						<Label>Tipo de madeira</Label>
						<ValueInfo>{dataInfo.woodType}</ValueInfo>

						<Label>Tipo de ligação</Label>
						<ValueInfo>{dataInfo.ligationType}</ValueInfo>

						<Label>Tipo de pino metálico</Label>
						<ValueInfo>{dataInfo.pinType}</ValueInfo>

						<Label>Pino utilizado</Label>
						<ValueInfo>{dataInfo.pinSelected || 'Não encontrado'}</ValueInfo>

						<Label>Cálculo</Label>
						<ValueInfo>{dataInfo.calc}</ValueInfo>

						<ImageCorte
							source={
								dataInfo.ligationType === 'Corte Simples'
									? require('../../assets/images/dimensoes/cortesimples.png')
									: require('../../assets/images/dimensoes/corteduplo.png')
							}
							resizeMode={'center'}
						/>

						<ContainerUnity>
							<ItemUnity>
								<TextUnity style={{ flex: 4 }}>
									Espessura t1
								</TextUnity>
								<ValueUnity>
									<TextValueUnity>
										{dataInfo.esp1}
									</TextValueUnity>
								</ValueUnity>
								<TextUnity
									style={{ flex: 1, textAlign: 'right' }}
								>
									mm
								</TextUnity>
							</ItemUnity>

							<ItemUnity>
								<TextUnity style={{ flex: 4 }}>
									Espessura t2
								</TextUnity>
								<ValueUnity>
									<TextValueUnity>
										{dataInfo.esp2}
									</TextValueUnity>
								</ValueUnity>
								<TextUnity
									style={{ flex: 1, textAlign: 'right' }}
								>
									mm
								</TextUnity>
							</ItemUnity>

							<ItemUnity>
								<TextUnity style={{ flex: 4 }}>
									Largura
								</TextUnity>
								<ValueUnity>
									<TextValueUnity>
										{dataInfo.lar}
									</TextValueUnity>
								</ValueUnity>
								<TextUnity
									style={{ flex: 1, textAlign: 'right' }}
								>
									mm
								</TextUnity>
							</ItemUnity>

							<ItemUnity>
								<TextUnity style={{ flex: 4 }}>
									{dataInfo.calc === 'Número de pinos'
										? 'Força aplicada'
										: 'Quantidade de pinos'}
								</TextUnity>
								<ValueUnity>
									<TextValueUnity>
										{dataInfo.calc === 'Número de pinos'
											? dataInfo.force
											: dataInfo.qtde}
									</TextValueUnity>
								</ValueUnity>
								<TextUnity
									style={{ flex: 1, textAlign: 'right' }}
								>
									{dataInfo.calc === 'Número de pinos' ? 'KN' : 'un'}
								</TextUnity>
							</ItemUnity>
						</ContainerUnity>

						{
							dataInfo.pinSelected ? <ButtonDark
								text="Resultados"
								onPress={() => {
									navigation.dispatch(
										CommonActions.navigate('Results', {
											params: { id_calc },
										}),
									);
								}}
							/>
								: <Label>ATENÇÃO: o pino selecionado não foi encontrado. Isso pode ter ocorrido pela exclusão dele do banco de dados. Edite seu cálculo e selecione um novo pino.</Label>
						}
					</ContainerInfo>
				) : (
					<LoadingPage />
				)}
			</ContainerScroll>
			<ContainerButtons>
				<ButtonDark
					text="Voltar"
					onPress={() => {
						navigation.dispatch(CommonActions.navigate('Historic'));
					}}
					style={{ width: RFValue(150, 700) }}
				/>
				<ButtonDark
					text="Editar"
					onPress={() => {
						navigation.dispatch(
							CommonActions.navigate('NewCalc1', {
								params: { id_calc },
							}),
						);
					}}
					style={{ width: RFValue(150, 700) }}
				/>
			</ContainerButtons>
		</Container>
	);
}

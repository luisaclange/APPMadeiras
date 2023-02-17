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
	Line,
	SmallText,
	Space,
	TextInfoDefault,
	TopContainerInfo,
	TopContainerInfoItem,
	TopContainerInfoItemText,
	TopContainerInfoLabel,
	TopContainerInfoUnity,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingPage from '../../components/global/loadingPage';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import CalcResult, { IResult } from '../../calcs/calcResult';
import { View } from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Draw from '../../calcs/draw/draw';
import { CalcModel } from '../../database/models/calcModel';
import { database } from '../../database';

export default function Results({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'Results'>) {
	// Parâmetros
	const { id_calc } = route.params.params || {};

	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [loading, setLoading] = useState(true);
	const [visibleError, setVisibleError] = useState(false);
	const [data, setData] = useState<CalcModel | Record<string, never>>({});
	const [result, setResult] = useState<IResult | Record<string, never>>({});

	// Buscar dados
	const GetData = useCallback(async () => {
		try {
			const calc = await database.get<CalcModel>('calcs').find(id_calc);
			setData(calc);
			const aux = await CalcResult(id_calc);
			setResult(aux);
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
			<Header title="Resultados" />
			<ContainerScroll>
				{!loading ? (
					<ContainerInfo>
						<TopContainerInfo>
							<TopContainerInfoLabel>Resistência total da ligação</TopContainerInfoLabel>

							<TopContainerInfoItem>
								<TopContainerInfoItemText>{String(result.Rd.toFixed(2)).replace('.', ',')}</TopContainerInfoItemText>
							</TopContainerInfoItem>

							<TopContainerInfoUnity>KN</TopContainerInfoUnity>
						</TopContainerInfo>

						<TopContainerInfo>
							<TopContainerInfoLabel>Quantidade de pinos metálicos</TopContainerInfoLabel>

							<TopContainerInfoItem>
								<TopContainerInfoItemText>{result.nPins}</TopContainerInfoItemText>
							</TopContainerInfoItem>

							<TopContainerInfoUnity>un</TopContainerInfoUnity>
						</TopContainerInfo>

						<Line />

						<TopContainerInfoLabel>Detalhamento da ligação</TopContainerInfoLabel>

						<Space />

						<Draw data={data} pins={result.nPins} />

						<Space />

						<Line />

						<TopContainerInfoLabel>Resistência ao embutimento da madeira</TopContainerInfoLabel>

						<TextInfoDefault>ρ<SmallText>med</SmallText> = {String(result.density.toFixed(2)).replace('.', ',')} kg/m³</TextInfoDefault>
						<TextInfoDefault>ρ<SmallText>k</SmallText> = {String(result.pk.toFixed(2)).replace('.', ',')} kg/m³</TextInfoDefault>
						<TextInfoDefault>f<SmallText>ek</SmallText> = {String(result.fek.toFixed(2)).replace('.', ',')} N/mm²</TextInfoDefault>
						<TextInfoDefault>β = 1,00</TextInfoDefault>

						<Space />

						<TopContainerInfoLabel>Momento resistente do pino</TopContainerInfoLabel>

						<Space />

						<TextInfoDefault>f<SmallText>uk</SmallText> = {String(result.fuk.toFixed(2)).replace('.', ',')} MPa</TextInfoDefault>
						<TextInfoDefault>M<SmallText>yRk</SmallText> = {String(result.MyRk.toFixed(2)).replace('.', ',')} N.mm</TextInfoDefault>

						<Space />

						<TopContainerInfoLabel>Resistência característica do pino metálico</TopContainerInfoLabel>

						<Space />

						<View style={{ backgroundColor: result.FvRk === result.FvRk1 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>F<SmallText>v,Rk1</SmallText> = {String(result.FvRk1.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk2 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>F<SmallText>v,Rk2</SmallText> = {String(result.FvRk2.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk3 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>F<SmallText>v,Rk3</SmallText> = {String(result.FvRk3.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk4 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>F<SmallText>v,Rk4</SmallText> = {String(result.FvRk4.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						{
							!result.FvRk5 ? null : <View style={{ backgroundColor: result.FvRk === result.FvRk5 ? globalStyle.colors.yellow : 'transparent' }}>
								<TextInfoDefault>F<SmallText>v,Rk5</SmallText> = {String(result.FvRk5.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
							</View>
						}
						{
							!result.FvRk6 ? null : <View style={{ backgroundColor: result.FvRk === result.FvRk6 ? globalStyle.colors.yellow : 'transparent' }}>
								<TextInfoDefault>F<SmallText>v,Rk6</SmallText> = {String(result.FvRk6.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
							</View>
						}

						<Space />

						<TopContainerInfoLabel>Coeficiente de modificação</TopContainerInfoLabel>

						<Space />

						<TextInfoDefault>K<SmallText>mod1</SmallText> = {String(result.kmod1.toFixed(2)).replace('.', ',')}</TextInfoDefault>
						<TextInfoDefault>K<SmallText>mod2</SmallText> = {String(result.kmod2.toFixed(2)).replace('.', ',')}</TextInfoDefault>
						<TextInfoDefault>K<SmallText>mod</SmallText> = {String(result.kmod.toFixed(2)).replace('.', ',')}</TextInfoDefault>
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

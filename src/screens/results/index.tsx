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
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingPage from '../../components/global/loadingPage';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import CalcResult, { IResult } from '../../calcs/calcResult';
import { Text } from 'react-native';

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
	const [result, setResult] = useState<IResult | Record<string, never>>({});

	// Buscar dados
	const GetData = useCallback(async () => {
		try {
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
						<Text>Kmod = {result.kmod}</Text>
						<Text>MyRk = {result.MyRk}</Text>
						<Text>Fek = {result.fek}</Text>
						<Text>Rk = {result.FvRk}</Text>

						<Text>Rk1 = {result.FvRk1}</Text>
						<Text>Rk2 = {result.FvRk2}</Text>
						<Text>Rk3 = {result.FvRk3}</Text>
						<Text>Rk4 = {result.FvRk4}</Text>
						<Text>Rk5 = {result.FvRk5}</Text>
						<Text>Rk6 = {result.FvRk6}</Text>
						<Text>Rd = {result.Rd}</Text>
						<Text>nNails = {result.nNails}</Text>
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

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
								<TopContainerInfoItemText>{result.nNails}</TopContainerInfoItemText>
							</TopContainerInfoItem>

							<TopContainerInfoUnity>un</TopContainerInfoUnity>
						</TopContainerInfo>

						<Line />

						<TopContainerInfoLabel>Detalhamento da ligação</TopContainerInfoLabel>

						<Space />

						<Line />

						<TopContainerInfoLabel>Resistência ao embutimento da madeira</TopContainerInfoLabel>

						<TextInfoDefault>ρ med = {String(result.density.toFixed(2)).replace('.', ',')} kg/m³</TextInfoDefault>
						<TextInfoDefault>ρ k = {String(result.pk.toFixed(2)).replace('.', ',')} kg/m³</TextInfoDefault>
						<TextInfoDefault>fe k = {String(result.fek.toFixed(2)).replace('.', ',')} N/mm²</TextInfoDefault>
						<TextInfoDefault>β = 1,00</TextInfoDefault>

						<Space />

						<TopContainerInfoLabel>Momento resistente do pino</TopContainerInfoLabel>

						<Space />

						<TextInfoDefault>f uk = {String(result.fuk.toFixed(2)).replace('.', ',')} MPa</TextInfoDefault>
						<TextInfoDefault>MyRk = {String(result.MyRk.toFixed(2)).replace('.', ',')} N.mm</TextInfoDefault>

						<Space />

						<TopContainerInfoLabel>Resistência característica do pino metálico</TopContainerInfoLabel>

						<Space />

						<View style={{ backgroundColor: result.FvRk === result.FvRk1 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>Fv,Rk1 = {String(result.FvRk1.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk2 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>Fv,Rk2 = {String(result.FvRk2.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk3 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>Fv,Rk3 = {String(result.FvRk3.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						<View style={{ backgroundColor: result.FvRk === result.FvRk4 ? globalStyle.colors.yellow : 'transparent' }}>
							<TextInfoDefault>Fv,Rk4 = {String(result.FvRk4.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
						</View>
						{
							result.FvRk5 === 0 ? null : <View style={{ backgroundColor: result.FvRk === result.FvRk5 ? globalStyle.colors.yellow : 'transparent' }}>
								<TextInfoDefault>Fv,Rk5 = {String(result.FvRk5.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
							</View>
						}
						{
							result.FvRk6 === 0 ? null : <View style={{ backgroundColor: result.FvRk === result.FvRk6 ? globalStyle.colors.yellow : 'transparent' }}>
								<TextInfoDefault>Fv,Rk6 = {String(result.FvRk6.toFixed(2)).replace('.', ',')} KN</TextInfoDefault>
							</View>
						}

						<Space />

						<TopContainerInfoLabel>Coeficiente de modificação</TopContainerInfoLabel>

						<Space />

						<TopContainerInfo>
							<TopContainerInfoLabel>Kmod1</TopContainerInfoLabel>

							<TopContainerInfoItem>
								<TopContainerInfoItemText>{String(result.kmod1.toFixed(2)).replace('.', ',')}</TopContainerInfoItemText>
							</TopContainerInfoItem>
						</TopContainerInfo>

						<TopContainerInfo>
							<TopContainerInfoLabel>Kmod2</TopContainerInfoLabel>

							<TopContainerInfoItem>
								<TopContainerInfoItemText>{String(result.kmod2.toFixed(2)).replace('.', ',')}</TopContainerInfoItemText>
							</TopContainerInfoItem>
						</TopContainerInfo>

						<TopContainerInfo>
							<TopContainerInfoLabel>Kmod</TopContainerInfoLabel>

							<TopContainerInfoItem>
								<TopContainerInfoItemText>{String(result.kmod.toFixed(2)).replace('.', ',')}</TopContainerInfoItemText>
							</TopContainerInfoItem>
						</TopContainerInfo>
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

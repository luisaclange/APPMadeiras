import {
	CommonActions,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { database } from '../../database';
import { CalcModel } from '../../database/models/calcModel';
import { BoxAlert, Container, FloatingButton, TextAlert } from './styles';
import CardCalc from '../../components/historic/cardCalc';
import Header from '../../components/historic/header';
import Background from '../../components/historic/background/index';
import LoadingPage from '../../components/global/loadingPage';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { FilterModel } from '../../database/models/filterModel';
import NotFoundIcon from '../../assets/svgs/notFound.svg';
import ScreenView from '../../components/global/screenView';

export default function Historic() {
	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [data, setData] = useState<CalcModel[]>([]);
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Buscar dados
	const GetData = useCallback(async () => {
		let aux = await database.get<CalcModel>('calcs').query().fetch();
		const filter = (
			await database.get<FilterModel>('filter').query().fetch()
		)[0];

		if (filter?.calc) aux = aux.filter(item => item.calc === filter?.calc);
		if (filter?.charging)
			aux = aux.filter(item => item.charging === filter?.charging);
		if (filter?.description)
			aux = aux.filter(item =>
				item.description
					.toLowerCase()
					.includes(filter?.description.toLowerCase()),
			);
		if (filter?.pinType)
			aux = aux.filter(item => item.pinType === filter?.pinType);
		if (filter?.woodName)
			aux = aux.filter(item => item.woodName === filter?.woodName);

		setData(aux.sort((a, b) => b.created_at - a.created_at));
		setRefresh(false);
		setIsLoading(false);
	}, []);

	// Buscar dados quando atualizar
	useEffect(() => {
		GetData();
	}, [GetData, refresh]);

	// Buscar dados quando a tela entra em foco
	useFocusEffect(
		React.useCallback(() => {
			GetData();
		}, [GetData]),
	);

	return (
		<ScreenView>
			<Container>
				<Header />
				<Background>
					{!isLoading ? (
						<FlatList
							refreshing={refresh}
							onRefresh={() => {
								GetData();
							}}
							ListEmptyComponent={() => {
								return (
									<BoxAlert>
										<NotFoundIcon />
										<TextAlert>Não foram encontrados resultados...</TextAlert>
									</BoxAlert>
								);
							}}
							contentContainerStyle={{
								flexGrow: 1,
								padding: RFValue(16, 700),
								paddingBottom: 200,
							}}
							data={data}
							renderItem={item => {
								return (
									<CardCalc
										item={item.item}
										setRefresh={setRefresh}
									/>
								);
							}}
							style={{ paddingBottom: 200 }}
						/>
					) : (
						<LoadingPage />
					)}
				</Background>

				<FloatingButton>
					<ButtonDark
						text="Novo cálculo"
						style={{ width: RFValue(230, 700) }}
						onPress={() => {
							navigation.dispatch(CommonActions.navigate('NewCalc1'));
						}}
					/>
				</FloatingButton>
			</Container>
		</ScreenView>
	);
}

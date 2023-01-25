import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import Header from '../../components/global/header';
import {
	ButtonCleanFilter,
	ButtonCleanText,
	ButtonsContainer,
	Container,
	ContainerScroll,
} from './styles';
import FieldInput from '../../components/global/fields/fieldInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFilter, schemaFilter } from '../../validations/filter';
import { Kmod } from '../../archive/NBRTables/WoodProperties/Kmod';
import FieldSelect from '../../components/global/fields/fieldSelect';
import FieldSelectWoods from '../../components/newCalc/fieldSelectWoods';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';
import { database } from '../../database';
import { FilterModel } from '../../database/models/filterModel';
import { useNavigation } from '@react-navigation/native';
import LoadingPage from '../../components/global/loadingPage';
import { CalcData } from '../../datas/Calc';
import { PinTypeData } from '../../datas/PinType';

export default function Filter() {
	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [dataFilter, setDataFilter] = useState<
		FilterModel | Record<string, never>
	>({});
	const [loadingPage, setLoadingPage] = useState(true);

	// Controle de formulário
	const { control, handleSubmit, setValue } = useForm<IFilter>({
		resolver: yupResolver(schemaFilter),
	});

	// Dados para o select
	const dataCharging = Kmod.kmod1.map(item => {
		return {
			value: item.name,
			id: item.id,
		};
	});

	// Limpar filtro
	function CleanFilter() {
		setValue('description', '');
		setValue('charging', '');
		setValue('woodName', 0);
		setValue('pinType', '');
		setValue('calc', '');
	}

	// Pegar dados
	const GetData = useCallback(async () => {
		try {
			const aux = await database
				.get<FilterModel>('filter')
				.query()
				.fetch();
			setDataFilter(aux[0]);
		} catch (error) {
			Alert.alert('Ops, ocorreu um erro!', error.message);
		} finally {
			setLoadingPage(false);
		}
	}, []);

	useEffect(() => {
		GetData();
	}, [GetData]);

	// Salvar filtro
	async function HandleSaveFilter(data: IFilter) {
		try {
			await database.write(async () => {
				await dataFilter.update(item => {
					item.charging = data.charging;
					item.description = data.description;
					item.pinType = data.pinType;
					item.woodName = data.woodName;
					item.calc = data.calc;
					item.updated_at = Number(new Date());
				});
			});

			navigation.goBack();
		} catch (error) {
			Alert.alert('Ops, ocorreu um erro!', error.message);
		}
	}

	return (
		<View>
			<Header title="Filtro" />
			<ContainerScroll>
				<Container>
					<ButtonCleanFilter onPress={CleanFilter}>
						<ButtonCleanText>Limpar filtro</ButtonCleanText>
					</ButtonCleanFilter>

					{!loadingPage ? (
						<>
							<FieldInput
								control={control}
								name="description"
								title="Identificação"
								defaultValue={dataFilter?.description}
							/>
							<FieldSelect
								data={dataCharging}
								name="charging"
								control={control}
								title="Carregamento"
								defaultValue={dataFilter?.charging}
							/>
							<FieldSelectWoods
								control={control}
								name="woodName"
								title="Madeira utilizada"
								defaultValue={dataFilter?.woodName}
							/>
							<FieldSelect
								control={control}
								data={PinTypeData}
								name="pinType"
								title="Tipo de pino metálico"
								defaultValue={dataFilter?.pinType}
							/>
							<FieldSelect
								control={control}
								data={CalcData}
								name="calc"
								title="Cálculo"
								defaultValue={dataFilter?.calc}
							/>
						</>
					) : (
						<LoadingPage />
					)}
				</Container>
			</ContainerScroll>
			<ButtonsContainer>
				<ButtonDark
					text="Cancelar"
					onPress={() => {
						navigation.goBack();
					}}
					style={{ width: RFValue(150, 700) }}
				/>
				<ButtonDark
					text="Aplicar"
					onPress={handleSubmit(HandleSaveFilter)}
					style={{ width: RFValue(150, 700) }}
				/>
			</ButtonsContainer>
		</View>
	);
}

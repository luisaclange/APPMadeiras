import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';
import DataContext, { Data } from '../../../context/context';
import FieldSelect from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { Container, ContainerFields, ImageCorte } from './styles';
import { schemaNewCalc2 } from '../../../validations/newCalc2';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import { CalcModel } from '../../../database/models/calcModel';
import { database } from '../../../database';
import LoadingPage from '../../../components/global/loadingPage';
import { LigationTypeData } from '../../../datas/LigationType';
import { PinTypeData } from '../../../datas/PinType';
import { CalcData } from '../../../datas/Calc';

export default function NewCalc2({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'NewCalc2'>) {
	//Navegação e parametros
	const navigation = useNavigation();
	const { id_calc } = route?.params?.params || {};

	// Contexto
	const { setStage2 } = useContext(DataContext);

	// Variáveis
	const [dataStage, setDataStage] = useState<
		CalcModel | Record<string, never>
	>({});
	const [loadingPage, setLoadingPage] = useState(true);

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Data['stage2']>({ resolver: yupResolver(schemaNewCalc2) });

	// Buscar dados
	const GetData = useCallback(async () => {
		try {
			if (id_calc) {
				const calc = await database
					.get<CalcModel>('calcs')
					.find(id_calc);
				setDataStage(calc);
			}
		} catch (error) {
			Alert.alert('Ops, ocorreu um erro!', error.message);
		} finally {
			setLoadingPage(false);
		}
	}, [id_calc]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	// Guardar as informações
	async function handleDataRegister(data: Data['stage2']) {
		try {
			setStage2(data);
			navigation.dispatch(
				CommonActions.navigate('NewCalc3', { params: { id_calc } }),
			);
		} catch (error) {
			Alert.alert('Ops, ocorreu um erro!', error.message);
		}
	}

	return (
		<Container>
			<Header title="Novo cálculo" progress={ProgressNewCalc.newCalc2} />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
				<ContainerFields>
					<TitleSection title="Etapa 2" subtitle="Tipo de ligação" />
					{!loadingPage ? (
						<>
							<FieldSelect
								control={control}
								data={LigationTypeData}
								name="ligationType"
								title="Tipo de ligação"
								error={errors.ligationType}
								defaultValue={dataStage.ligationType}
							/>
							<FieldSelect
								control={control}
								data={PinTypeData}
								name="pinType"
								title="Tipo de pino metálico"
								error={errors.pinType}
								defaultValue={dataStage.pinType}
							/>
							<FieldSelect
								control={control}
								data={CalcData}
								name="calc"
								title="Cálculo"
								error={errors.calc}
								defaultValue={dataStage.calc}
							/>
							{watch('ligationType') || dataStage.ligationType ? (
								<ImageCorte
									source={
										(watch('ligationType') && watch('ligationType') === 'corteSimples') || (!watch('ligationType') && dataStage.ligationType === 'corteSimples')
											? require('../../../assets/images/cortes/cortesimples.png')
											: require('../../../assets/images/cortes/corteduplo.png')
									}
									resizeMode={'center'}
								/>
							) : null}
						</>
					) : (
						<LoadingPage />
					)}
				</ContainerFields>
			</ScrollView>
			<ButtonsPrevNext
				prevAction={() => navigation.goBack()}
				nextAction={handleSubmit(handleDataRegister)}
			/>
		</Container>
	);
}

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';
import DataContext, { Data } from '../../../context/context';
import FieldSelect, {
	ISelect,
} from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { ContainerFields, ImageCorte, SmallText, Title } from './styles';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { schemaNewCalc3 } from '../../../validations/newCalc3';
import FieldInput from '../../../components/global/fields/fieldInput';
import { database } from '../../../database';
import { CalcModel } from '../../../database/models/calcModel';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import LoadingPage from '../../../components/global/loadingPage';
import { SelectionNail } from '../../../calcs/selectionNails/selectionNail';
import { SelectionThroughScrew } from '../../../calcs/selectionNails/selectionThroughScrew';
import { SelectionSuperbScrew } from '../../../calcs/selectionNails/selectionSuperbScrew';
import ScreenView from '../../../components/global/screenView';
import ModalLoading from '../../../components/global/modalLoading';

export default function NewCalc3({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'NewCalc3'>) {
	//Navegação e parametros
	const { id_calc } = route?.params?.params || {};
	const navigation = useNavigation();

	// Contexto
	const { stage1, stage2 } = useContext(DataContext);

	// Variáveis
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const [visibleError, setVisibleError] = useState(false);
	const [id, setId] = useState<string>();
	const [dataStage, setDataStage] = useState<
		CalcModel | Record<string, never>
	>({});
	const [loadingPage, setLoadingPage] = useState(true);
	const [dataNails, setDataNails] = useState<ISelect[]>([]);
	const [loadingSave, setLoadingSave] = useState(false);
	const [textError, setTextError] = useState('');

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		setValue
	} = useForm<Data['stage3']>({ resolver: yupResolver(schemaNewCalc3) });

	// Buscar dimensões de pinos
	const GetNails = useCallback(async () => {
		switch (stage2.pinType) {
			case 'prego':
				await SelectionNail({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: stage2.ligationType,
				});
				break;
			case 'parafusoPassante':
				await SelectionThroughScrew({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: stage2.ligationType,
				});
				break;
			case 'parafusoSoberba':
				await SelectionSuperbScrew({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: stage2.ligationType,
				});
				break;
			default:
				setDataNails([]);
				break;
		}
	}, [stage2.ligationType, stage2.pinType, watch]);

	// Buscar dados
	const GetData = useCallback(async () => {
		try {
			if (id_calc) {
				const calc = await database
					.get<CalcModel>('calcs')
					.find(id_calc);
				setDataStage(calc);
				setValue('espWood_1', String(calc.espWood_1).replace('.', ','));
				setValue('espWood_2', String(calc.espWood_2).replace('.', ','));
				GetNails();
			}
		} catch (error) {
			Alert.alert('Ops, ocorreu um erro!', error.message);
		} finally {
			setLoadingPage(false);
		}
	}, [GetNails, id_calc, setValue]);

	useEffect(() => {
		GetData();
	}, [GetData]);

	// Guardar as informações
	async function handleDataRegister(data: Data['stage3']) {
		if (data?.tractiveForce || data?.numberPins)
			try {
				setLoadingSave(true);
				const calcs = database.get<CalcModel>('calcs');
				const date = Number(new Date()) - 10800000;
				await database.write(async () => {
					if (id_calc) {
						await dataStage.update(item => {
							// Parte 1
							item.charging = stage1.charging;
							item.description = stage1.description;
							item.humidityClass = stage1.humidityClass;
							item.woodType = stage1.woodType;
							item.woodName = Number(stage1.woodName);

							// Parte 2
							item.calc = stage2.calc;
							item.ligationType = stage2.ligationType;
							item.pinType = stage2.pinType;

							// Parte 3
							item.espWood_1 = Number(data.espWood_1);
							item.espWood_2 = Number(data.espWood_2);
							item.pinSelected = data.pinSelected;
							item.numberPins = Number(data.numberPins) || 0;
							item.tractiveForce = Number(data.tractiveForce) || 0;
							item.widthWood = Number(data.widthWood);

							// Outros
							item.updated_at = date;
						});
						setId(id_calc);
					} else {
						const calc = await calcs.create(newCalc => {
							// Parte 1
							newCalc.charging = stage1.charging;
							newCalc.description = stage1.description;
							newCalc.humidityClass = stage1.humidityClass;
							newCalc.woodType = stage1.woodType;
							newCalc.woodName = Number(stage1.woodName);

							// Parte 2
							newCalc.calc = stage2.calc;
							newCalc.ligationType = stage2.ligationType;
							newCalc.pinType = stage2.pinType;

							// Parte 3
							newCalc.espWood_1 = Number(data.espWood_1);
							newCalc.espWood_2 = Number(data.espWood_2);
							newCalc.pinSelected = data.pinSelected;
							newCalc.numberPins = Number(data.numberPins) || 0;
							newCalc.tractiveForce = Number(data.tractiveForce) || 0;
							newCalc.widthWood = Number(data.widthWood);

							// Outros
							newCalc.created_at = date;
							newCalc.updated_at = date;
							newCalc.visualized_at = 0;
						});

						setId(calc?.id);
					}
				});

				setVisibleSuccess(true);
			} catch (error) {
				setTextError('Ops! Ocorreu um erro. Tente novamente mais tarde');
				setVisibleError(true);
			} finally {
				setLoadingSave(false);
			}
		else {
			setTextError('Você precisa informar um valor no último campo!');
			setVisibleError(true);
		}
	}

	return (
		<ScreenView>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
					navigation.dispatch(
						CommonActions.navigate('Results', {
							params: { id_calc: id },
						}),
					);
				}}
				message={`Cálculo ${id_calc ? 'editado' : 'cadastrado'
					} com sucesso!`}
				setVisible={setVisibleSuccess}
				textButton="Resultados"
				visible={visibleSuccess}
			/>
			<PopUpOneButton
				actionButton={() => {
					setVisibleError(false);
				}}
				message={textError}
				setVisible={setVisibleError}
				textButton="OK"
				visible={visibleError}
			/>
			<Header title="Novo cálculo" progress={ProgressNewCalc.newCalc3} />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
				<ContainerFields>
					<TitleSection
						title="Etapa 3"
						subtitle="Dimensões da ligação"
					/>
					{!loadingPage ? (
						<>
							<ImageCorte
								source={
									stage2.ligationType === 'corteSimples'
										? require('../../../assets/images/dimensoes/cortesimples.png')
										: require('../../../assets/images/dimensoes/corteduplo.png')
								}
								resizeMode={'center'}
							/>
							<FieldInput
								control={control}
								name="espWood_1"
								titleElement={<Title error={!!errors.espWood_1}>Espessura - peça 1 (t<SmallText>1</SmallText>)</Title>}
								error={errors.espWood_1}
								dimension="mm"
								defaultValue={
									dataStage?.espWood_1
									&& String(dataStage.espWood_1)
								}
								keyboardType='numeric'
							/>
							<FieldInput
								control={control}
								name="espWood_2"
								titleElement={<Title error={!!errors.espWood_1}>Espessura - peça 2 (t<SmallText>2</SmallText>)</Title>}
								error={errors.espWood_2}
								dimension="mm"
								defaultValue={
									dataStage?.espWood_2
										? String(dataStage.espWood_2)
										: null
								}
								keyboardType='numeric'
							/>
							<FieldInput
								control={control}
								name="widthWood"
								title="Largura das peças (L)"
								error={errors.widthWood}
								dimension="mm"
								defaultValue={
									dataStage?.widthWood
										? String(dataStage.widthWood)
										: null
								}
								keyboardType='numeric'
							/>
							<FieldSelect
								data={dataNails}
								control={control}
								name="pinSelected"
								title="Pino utilizado"
								defaultValue={dataStage.pinSelected}
								onPress={() => {
									if (watch('espWood_1') && watch('espWood_2')) GetNails();
									else setDataNails([]);
								}}
								error={errors.pinSelected}
								tableName={stage2.pinType === 'prego' ? 'nails' : stage2.pinType === 'parafusoSoberba' ? 'superbScrews' : 'throughScrews'}
								refresh={() => {
									GetNails();
								}}
								navigationScreen={stage2.pinType === 'prego' ? 'NewNail' : stage2.pinType === 'parafusoSoberba' ? 'NewSuperbScrew' : 'NewThroughScrew'}
							/>
							{stage2.calc === 'pinQtde' &&
								(dataStage.calc ? dataStage.calc === 'pinQtde' : true) ? (
								<FieldInput
									control={control}
									name="tractiveForce"
									titleElement={<Title error={!!errors.espWood_1}>Força solicitante - S<SmallText>d</SmallText></Title>}
									error={errors.tractiveForce}
									dimension="KN"
									defaultValue={
										dataStage?.tractiveForce
											? String(dataStage.tractiveForce)
											: null
									}
									keyboardType='numeric'
								/>
							) : (
								<FieldInput
									control={control}
									name="numberPins"
									title="Quantidade de pinos"
									error={errors.numberPins}
									dimension="un"
									defaultValue={
										dataStage?.numberPins
											? String(dataStage.numberPins)
											: null
									}
									keyboardType='numeric'
								/>
							)}
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
			<ModalLoading visible={loadingSave} setVisible={setLoadingSave} />
		</ScreenView>
	);
}

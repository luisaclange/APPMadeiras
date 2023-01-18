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
import { Container, ContainerFields, ImageCorte } from './styles';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { schemaNewCalc3 } from '../../../validations/newCalc3';
import FieldInput from '../../../components/global/fields/fieldInput';
import { database } from '../../../database';
import { CalcModel } from '../../../database/models/calcModel';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import LoadingPage from '../../../components/global/loadingPage';
import { SelectionPrego } from '../../../calcs/selectionNails/selectionPrego';
import { SelectionParPassante } from '../../../calcs/selectionNails/selectionParPassante';
import { SelectionParSoberba } from '../../../calcs/selectionNails/selectionParSoberba';

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

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<Data['stage3']>({ resolver: yupResolver(schemaNewCalc3) });

	// Buscar dimensões de pinos
	function GetNails() {
		switch (dataStage.nailType) {
			case 'prego':
				SelectionPrego({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: dataStage.ligationType,
				});
				break;
			case 'parafusoPassante':
				SelectionParPassante({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: dataStage.ligationType,
				});
				break;
			case 'parafusoSoberba':
				SelectionParSoberba({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
				});
				break;
			default:
				setDataNails([]);
				break;
		}
	}

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
	async function handleDataRegister(data: Data['stage3']) {
		try {
			const calcs = database.get<CalcModel>('calcs');
			const date = Number(new Date()) - 3600000;
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
						item.nailType = stage2.nailType;

						// Parte 3
						item.espWood_1 = Number(data.espWood_1);
						item.espWood_2 = Number(data.espWood_2);
						item.nailDimension = data.nailDimension;
						item.numberNails = Number(data.numberNails) || 0;
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
						newCalc.nailType = stage2.nailType;

						// Parte 3
						newCalc.espWood_1 = Number(data.espWood_1);
						newCalc.espWood_2 = Number(data.espWood_2);
						newCalc.nailDimension = data.nailDimension;
						newCalc.numberNails = Number(data.numberNails) || 0;
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
			console.error(error);
			setVisibleError(true);
		}
	}

	return (
		<Container>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
					navigation.dispatch(
						CommonActions.navigate('Results', {
							params: { id },
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
				message="Ops! Ocorreu um erro. Tente novamente mais tarde"
				setVisible={setVisibleError}
				textButton="OK"
				visible={visibleError}
			/>
			<Header title="Novo cálculo" progress={ProgressNewCalc.newCalc3} />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
								title="Espessura - peça 1 (t1)"
								error={errors.espWood_1}
								dimension="mm"
								defaultValue={
									dataStage?.espWood_1
										? String(dataStage.espWood_1)
										: null
								}
							/>
							<FieldInput
								control={control}
								name="espWood_2"
								title="Espessura - peça 2 (t2)"
								error={errors.espWood_2}
								dimension="mm"
								defaultValue={
									dataStage?.espWood_2
										? String(dataStage.espWood_2)
										: null
								}
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
							/>
							<FieldSelect
								data={dataNails}
								control={control}
								name="nailDimension"
								title="Pino utilizado"
								defaultValue={dataStage.nailDimension}
								onPressAction={() => {
									if (
										(watch('espWood_1'), watch('espWood_2'))
									)
										GetNails();
									else setDataNails([]);
								}}
							/>
							{stage2.calc === 'nailQtde' ||
								dataStage.calc == 'nailQtde' ? (
								<FieldInput
									control={control}
									name="tractiveForce"
									title="Força solicitante (Sd)"
									error={errors.tractiveForce}
									dimension="KN"
									defaultValue={
										dataStage?.tractiveForce
											? String(dataStage.tractiveForce)
											: null
									}
								/>
							) : (
								<FieldInput
									control={control}
									name="numberNails"
									title="Quantidade de pinos"
									error={errors.numberNails}
									dimension="un"
									defaultValue={
										dataStage?.numberNails
											? String(dataStage.numberNails)
											: null
									}
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
		</Container>
	);
}

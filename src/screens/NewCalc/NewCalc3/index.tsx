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
import { ContainerFields, ContainerModal, ImageCorte, SelectText, SmallText, TextInfo, Title } from './styles';
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
import DimensionsRange from '../../../interfaces/DimensionsRange';
import CustomModal from '../../../components/global/modal';
import ButtonDark from '../../../components/global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';

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
	const [range, setRange] = useState<DimensionsRange | Record<string, never>>({});
	const [visibleInfoRange, setVisibleInfoRange] = useState(false);

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors, dirtyFields },
		watch,
		setValue,
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
					setRange,
				});
				break;
			case 'parafusoPassante':
				await SelectionThroughScrew({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: stage2.ligationType,
					setRange,
				});
				break;
			case 'parafusoSoberba':
				await SelectionSuperbScrew({
					setData: setDataNails,
					esp1: Number(watch('espWood_1')?.replace(',', '.')),
					esp2: Number(watch('espWood_2')?.replace(',', '.')),
					ligationType: stage2.ligationType,
					setRange,
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
				await GetNails();
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

	//Resetar texto quando mudam as dimensões
	useEffect(() => {
		if (dirtyFields.espWood_1 || dirtyFields.espWood_2 || dirtyFields.widthWood) setValue('pinSelected', '');
	}, [dirtyFields.espWood_1, dirtyFields.espWood_2, dirtyFields.widthWood, setValue, watch('espWood_1'), watch('espWood_2'), watch('widthWood')]);

	function Message() {
		switch (stage2.pinType) {
			case 'prego':
				return (
					<ContainerModal>
						<ScrollView style={{ flexGrow: 1 }}>
							<TextInfo>O prego escolhido deve respeitar as dimensões mínimas e máximas, as quais são determinadas por meio dos valores informados para as peças de madeira.</TextInfo>
							<TextInfo>Então, o prego deve atender:</TextInfo>
							<TextInfo>   d<SmallText>min</SmallText>: {String(range?.dMin?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo style={range?.dMax < range?.dMin ? { color: 'red' } : undefined}>   d<SmallText style={range?.dMax < range?.dMin ? { color: 'red' } : undefined}>max</SmallText>: {String(range?.dMax?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo>   comp<SmallText>min</SmallText>: {String(range?.compMin?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo>   comp<SmallText>max</SmallText>: {String(range?.compMax?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							{
								range?.dMax < range?.dMin && <TextInfo>Como o diâmetro máximo é menor do que o diâmetro mínimo, e esse valor depende de t<SmallText>1</SmallText>, aumente o valor deste último</TextInfo>
							}
							<TextInfo>Lembrando que a penetração mínima do pino na última peça deve ser superior a 12d.</TextInfo>
						</ScrollView>
						<ButtonDark onPress={() => {
							setVisibleInfoRange(false);
						}} text="Fechar" style={{ marginTop: RFValue(16, 700) }} />
					</ContainerModal>
				);
			case 'parafusoSoberba':
				return (
					<ContainerModal>
						<ScrollView style={{ flexGrow: 1 }}>
							<TextInfo>O parafuso escolhido deve respeitar as dimensões mínimas e máximas, as quais são determinadas por meio dos valores informados para as peças de madeira.</TextInfo>
							<TextInfo>Então, o parafuso deve atender:</TextInfo>
							<TextInfo>   d<SmallText>min</SmallText>: {String(range?.dMin?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo style={range?.dMax < range?.dMin ? { color: 'red' } : undefined}>   d<SmallText style={range?.dMax < range?.dMin ? { color: 'red' } : undefined}>max</SmallText>: {String(range?.dMax?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo>   comp<SmallText>min</SmallText>: {String(range?.compMin?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo>   comp<SmallText>max</SmallText>: {String(range?.compMax?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							{
								range?.dMax < range?.dMin && <TextInfo>Como o diâmetro máximo é menor do que o diâmetro mínimo, e esse valor depende de t<SmallText>1</SmallText>, aumente o valor deste último</TextInfo>
							}
							<TextInfo>Lembrando que a penetração mínima do pino na última peça deve ser superior a 6d.</TextInfo>
						</ScrollView>
						<ButtonDark onPress={() => {
							setVisibleInfoRange(false);
						}} text="Fechar" style={{ marginTop: RFValue(16, 700) }} />
					</ContainerModal >
				);
			default:
				return (
					<ContainerModal>
						<ScrollView style={{ flexGrow: 1 }}>
							<TextInfo>O parafuso escolhido deve respeitar as dimensões mínimas e máximas, as quais são determinadas por meio dos valores informados para as peças de madeira.</TextInfo>
							<TextInfo>Então, o parafuso deve atender:</TextInfo>
							<TextInfo>   d<SmallText>min</SmallText>: {String(range?.dMin?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo>   d<SmallText>max</SmallText>: {String(range?.dMax?.toFixed(2)).replace('.', ',')}mm</TextInfo>
							<TextInfo style={{ textAlign: 'left' }}>   comp<SmallText>min</SmallText>: {String(range?.compMin?.toFixed(2)).replace('.', ',')}mm + altura da porca</TextInfo>
							<TextInfo style={{ textAlign: 'left' }}>   comp<SmallText>max</SmallText>: comprimento não rosqueável do parafuso</TextInfo>
						</ScrollView>
						<ButtonDark onPress={() => {
							setVisibleInfoRange(false);
						}} text="Fechar" style={{ marginTop: RFValue(16, 700) }} />
					</ContainerModal>
				);
		}
	}

	return (
		<ScreenView>
			<CustomModal backdrop dismissOnPress setVisible={setVisibleInfoRange} visible={visibleInfoRange}>
				<Message />
			</CustomModal>
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
										: undefined
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
										: undefined
								}
								keyboardType='numeric'
							/>
							<FieldSelect
								data={dataNails}
								control={control}
								name="pinSelected"
								title="Pino utilizado"
								defaultValue={dataNails.find(item => item.id === dataStage.pinSelected)?.id}
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
								ListEmptyComponent="Infelizmente não foram encontrados pinos com dimensões compatíveis com os valores das peças de madeira informados"
								setInfo={setVisibleInfoRange}
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
											: undefined
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
											: undefined
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

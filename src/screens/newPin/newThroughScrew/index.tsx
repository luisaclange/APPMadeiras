import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import {
	Container,
	ContainerButton,
	ImagePin,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/global/header';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldInput from '../../../components/global/fields/fieldInput';
import { database } from '../../../database';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { INewThroughScrew, schemaNewThroughScrew } from '../../../validations/newThroughScrew';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import ButtonDark from '../../../components/global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';
import ScreenView from '../../../components/global/screenView';

export default function NewThroughScrew({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'NewThroughScrew'>) {
	// Navegação
	const navigation = useNavigation();
	const { data } = route?.params?.params || {};

	// Variáveis
	const [visibleError, setVisibleError] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const edit = useMemo(() => {
		if (data) return false;
		else return true;
	}, [data]);

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<INewThroughScrew>({ resolver: yupResolver(schemaNewThroughScrew) });

	// Cadastro de pino
	const handleDataRegister = useCallback(async (data: INewThroughScrew) => {
		try {
			await database.write(async () => {
				const dataNail = database.get<ThroughScrewModel>('throughScrews');
				await dataNail.create(item => {
					item.diametro = Number(data.diametro.replace(',', '.'));
					item.comprimento = Number(data.comprimento.replace(',', '.'));
					item.roscaComp = Number(data.roscaComp.replace(',', '.'));
					item.altura = Number(data.altura.replace(',', '.'));
					item.name = data.name;
				});
			});
			setVisibleSuccess(true);
		} catch (error) {
			setVisibleError(true);
		}
	}, []);

	return (
		<ScreenView hasFieldsInputs>
			<PopUpOneButton
				actionButton={() => {
					setVisibleError(false);
				}}
				message='Ops, ocorreu um erro e não foi possível fazer o cadastro!'
				setVisible={setVisibleError}
				textButton='OK'
				visible={visibleError}
			/>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
					navigation.goBack();
				}}
				message='Parafuso passante cadastrado com sucesso!'
				setVisible={setVisibleSuccess}
				textButton='Voltar'
				visible={visibleSuccess}
			/>
			<Header title="Novo pino" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
				<Container>
					<TitleSection
						title="Cadastro de parafuso passante"
					/>
					<ImagePin
						source={require('../../../assets/images/dimensoes/parafusoPassante.png')}
						resizeMode='contain'
					/>

					<FieldInput
						control={control}
						name='name'
						title='Nome'
						error={errors.name}
						defaultValue={data?.name}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='diametro'
						title='Diâmetro (d)'
						error={errors.diametro}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.diameter).replace('.', ',') : null}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='comprimento'
						title='Comprimento (L)'
						error={errors.comprimento}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.length).replace('.', ',') : null}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='roscaComp'
						title='Comprimento da rosca (Lr)'
						error={errors.roscaComp}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.rosLenght).replace('.', ',') : null}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='altura'
						title='Espessura da cabeça do pino (e)'
						error={errors.altura}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.height).replace('.', ',') : null}
						editable={edit}
					/>
				</Container>
			</ScrollView>
			<ContainerButton>
				<ButtonDark
					text="Voltar"
					onPress={() => {
						navigation.goBack();
					}}
					style={{ width: RFValue(150, 700) }}
				/>
				{
					!data &&
					<ButtonDark
						text="Cadastrar"
						onPress={handleSubmit(handleDataRegister)}
						style={{ width: RFValue(150, 700) }}
					/>
				}
			</ContainerButton>
		</ScreenView>
	);
}

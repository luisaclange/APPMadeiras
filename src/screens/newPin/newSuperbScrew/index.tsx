import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
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
import { INewSuperbScrew, schemaNewSuperbScrew } from '../../../validations/newSuperbScrew';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import ButtonDark from '../../../components/global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';
import ScreenView from '../../../components/global/screenView';

export default function NewSuperbScrew({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'NewSuperbScrew'>) {
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
	} = useForm<INewSuperbScrew>({ resolver: yupResolver(schemaNewSuperbScrew) });

	// Cadastro de pino
	const handleDataRegister = useCallback(async (data: INewSuperbScrew) => {
		try {
			await database.write(async () => {
				const dataNail = database.get<SuperbScrewModel>('superbScrews');
				await dataNail.create(item => {
					item.diametro = Number(data.diametro.replace(',', '.'));
					item.comprimento = Number(data.comprimento.replace(',', '.'));
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
				message='Parafuso de rosca soberba cadastrado com sucesso!'
				setVisible={setVisibleSuccess}
				textButton='Voltar'
				visible={visibleSuccess}
			/>
			<Header title="Novo pino" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
				<Container>
					<TitleSection
						title="Cadastro de parafuso de rosca soberba"
					/>
					<ImagePin
						source={require('../../../assets/images/dimensoes/parafusoSoberba.png')}
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
						defaultValue={data ? String(data?.diameter).replace('.', ',') : undefined}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='comprimento'
						title='Comprimento (L)'
						error={errors.comprimento}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.length).replace('.', ',') : undefined}
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

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
import { INewNail, schemaNewNail } from '../../../validations/newNail';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldInput from '../../../components/global/fields/fieldInput';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import ButtonDark from '../../../components/global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';
import ScreenView from '../../../components/global/screenView';

export default function NewNail({
	route,
}: NativeStackScreenProps<TRootStackParamList, 'NewNail'>) {
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
	} = useForm<INewNail>({ resolver: yupResolver(schemaNewNail) });

	// Cadastro de pino
	const handleDataRegister = useCallback(async (dataPin: INewNail) => {
		try {
			await database.write(async () => {
				const dataNail = database.get<NailModel>('nails');
				await dataNail.create(item => {
					item.JP = Number(dataPin.JP.replace(',', '.'));
					item.LPP = Number(dataPin.LPP.replace(',', '.'));
					item.name = dataPin.name;
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
				message={'Ops, ocorreu um erro e não foi possível fazer o cadastro!'}
				setVisible={setVisibleError}
				textButton='OK'
				visible={visibleError}
			/>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
					navigation.goBack();
				}}
				message={'Prego cadastrado com sucesso!'}
				setVisible={setVisibleSuccess}
				textButton='Voltar'
				visible={visibleSuccess}
			/>
			<Header title={data ? 'Mais informações' : 'Novo pino'} />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
				<Container>
					<TitleSection
						title={data ? 'Sobre o prego' : 'Cadastro de prego'}
					/>
					<ImagePin
						source={require('../../../assets/images/dimensoes/prego.png')}
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
						name='JP'
						title='Diâmetro (JP)'
						error={errors.JP}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.JP).replace('.', ',') : undefined}
						editable={edit}
					/>

					<FieldInput
						control={control}
						name='LPP'
						title='Comprimento (LPP)'
						error={errors.LPP}
						dimension='mm'
						keyboardType='numeric'
						defaultValue={data ? String(data?.LPP).replace('.', ',') : undefined}
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

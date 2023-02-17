import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import {
	Container,
	ContainerScroll,
	ImagePin,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/global/header';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { useForm } from 'react-hook-form';
import { INewNail, schemaNewNail } from '../../../validations/newNail';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldInput from '../../../components/global/fields/fieldInput';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';

export default function NewNail() {
	// Navegação
	const navigation = useNavigation();

	// Variáveis
	const [visibleError, setVisibleError] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);

	// Controle de formulário
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<INewNail>({ resolver: yupResolver(schemaNewNail) });

	// Cadastro de pino
	const handleDataRegister = useCallback(async (data: INewNail) => {
		try {
			await database.write(async () => {
				const dataNail = database.get<NailModel>('nails');
				await dataNail.create(item => {
					item.JP = Number(data.JP.replace(',', '.'));
					item.LPP = Number(data.LPP.replace(',', '.'));
					item.name = data.name;
				});
			});
			setVisibleSuccess(true);
		} catch (error) {
			setVisibleError(true);
		}
	}, []);

	return (
		<View style={{ height: '100%' }}>
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
				message='Prego cadastrado com sucesso!'
				setVisible={setVisibleSuccess}
				textButton='Voltar'
				visible={visibleSuccess}
			/>
			<Header title="Novo pino" />
			<ContainerScroll contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<TitleSection
						title="Cadastro de prego"
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
					/>

					<FieldInput
						control={control}
						name='JP'
						title='Diâmetro (JP)'
						error={errors.JP}
						dimension='mm'
						keyboardType='numeric'
					/>

					<FieldInput
						control={control}
						name='LPP'
						title='Comprimento (LPP)'
						error={errors.LPP}
						dimension='mm'
						keyboardType='numeric'
					/>
				</Container>
			</ContainerScroll>
			<ButtonsPrevNext
				prevAction={() => navigation.goBack()}
				nextAction={handleSubmit(handleDataRegister)}
			/>
		</View>
	);
}

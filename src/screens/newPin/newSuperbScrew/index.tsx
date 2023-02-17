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
import { yupResolver } from '@hookform/resolvers/yup';
import FieldInput from '../../../components/global/fields/fieldInput';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { database } from '../../../database';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { INewSuperbScrew, schemaNewSuperbScrew } from '../../../validations/newSuperbScrew';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';

export default function NewSuperbScrew() {
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
				message='Parafuso de rosca soberba cadastrado com sucesso!'
				setVisible={setVisibleSuccess}
				textButton='Voltar'
				visible={visibleSuccess}
			/>
			<Header title="Novo pino" />
			<ContainerScroll contentContainerStyle={{ flexGrow: 1 }}>
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
					/>

					<FieldInput
						control={control}
						name='diametro'
						title='Diâmetro (d)'
						error={errors.diametro}
						dimension='mm'
						keyboardType='numeric'
					/>

					<FieldInput
						control={control}
						name='comprimento'
						title='Comprimento (L)'
						error={errors.comprimento}
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

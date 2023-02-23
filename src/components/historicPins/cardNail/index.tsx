import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText } from './styles';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DoubleArrow from '../../../assets/svgs/doubleArrow.svg';
import Delete from '../../../assets/svgs/delete.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ButtonLight from '../../global/buttons/buttonLight';

export interface ICardNail {
	id: string;
	name: string;
	JP: number;
	LPP: number;
	isData: boolean;
}

interface IProps {
	dataNails: ICardNail[];
	currentOpen: string;
	setCurrentOpen: Dispatch<SetStateAction<string>>;
	getData: () => Promise<void>;
}

export default function CardNail({ dataNails, currentOpen, setCurrentOpen, getData }: IProps) {
	// Variáveis
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const [visibleError, setVisibleError] = useState(false);
	const [item, setItem] = useState<ICardNail | Record<string, never>>({});

	// Navegação
	const navigation = useNavigation();

	// Deletar pino
	async function deleteAction() {
		try {
			setVisibleDelete(false);
			const aux = await database.get<NailModel>('nails').find(item.id);
			await database.write(async () => {
				await aux.destroyPermanently();
			});
			setVisibleSuccess(true);
			getData();
		} catch (error) {
			setVisibleError(true);
		}
	}

	return (
		<>
			<PopUpTwoButtons
				visible={visibleDelete}
				setVisible={setVisibleDelete}
				lActionButton={() => {
					setVisibleDelete(false);
					deleteAction();
				}}
				lTextButton='Sim'
				message="Tem certeza de que deseja excluir esse item?"
				rActionButton={() => {
					setVisibleDelete(false);
				}}
				rTextButton='Não'
			/>
			<PopUpOneButton
				actionButton={() => {
					setVisibleSuccess(false);
				}}
				message="Prego deletado com sucesso!"
				setVisible={setVisibleSuccess}
				textButton='OK'
				visible={visibleSuccess}
			/>
			<PopUpOneButton
				actionButton={() => {
					setVisibleError(false);
				}}
				message="Ops, ocorreu um erro! Tente novamente mais tarde"
				setVisible={setVisibleError}
				textButton='OK'
				visible={visibleError}
			/>
			<ButtonLight
				onPress={() => {
					setCurrentOpen(currentOpen === 'nail' ? '' : 'nail');
				}}
				text='Pregos'
				style={{ width: '100%' }}
				blackBorder
			/>
			{
				currentOpen === 'nail' &&
				<ScrollView contentContainerStyle={{
					flexGrow: 1
				}}>
					{
						dataNails.map(it => {
							return (
								<ItemContainer key={`Nail${it.id}`}
									onPress={() => {
										navigation.dispatch(CommonActions.navigate('NewNail', {
											params: {
												data: it,
											}
										}));
									}}>
									<View style={{ flexDirection: 'row', flex: 4 }}>
										<DoubleArrow />
										<ItemText>{it.name}{it.isData && '**'}</ItemText>
									</View>
									<TouchableOpacity onPress={it.isData ? () => {
										setItem(it);
										setVisibleDelete(true);
									} : undefined}
										style={{ flex: 1, alignItems: 'flex-end' }}
									>
										{
											it.isData && <Delete />
										}
									</TouchableOpacity>
								</ItemContainer>
							);
						})
					}
				</ScrollView>
			}
		</>
	);
}
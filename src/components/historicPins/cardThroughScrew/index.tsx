import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText } from './styles';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';
import { database } from '../../../database';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import DoubleArrow from '../../../assets/svgs/doubleArrow.svg';
import Delete from '../../../assets/svgs/delete.svg';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ButtonLight from '../../global/buttons/buttonLight';

export interface ICardThroughScrew {
	id: string;
	name: string;
	diameter: number;
	length: number;
	rosLenght: number;
	height: number;
	isData: boolean;
}

interface IProps {
	dataThroughScrews: ICardThroughScrew[];
	currentOpen: string;
	setCurrentOpen: Dispatch<SetStateAction<string>>;
	getData: () => Promise<void>;
}

export default function CardThroughScrew({ dataThroughScrews, currentOpen, setCurrentOpen, getData }: IProps) {
	// Variáveis
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const [visibleError, setVisibleError] = useState(false);
	const [item, setItem] = useState<ICardThroughScrew | Record<string, never>>({});

	// Navegação
	const navigation = useNavigation();

	// Deletar pino
	async function deleteAction() {
		try {
			setVisibleDelete(false);
			const aux = await database.get<ThroughScrewModel>('throughScrews').find(item.id);
			await database.write(async () => {
				await aux.destroyPermanently();
			});
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
				message="Parafuso deletado com sucesso!"
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
					setCurrentOpen(currentOpen === 'throughScrew' ? '' : 'throughScrew');
				}}
				text='Parafusos passantes'
				style={{ width: '100%' }}
				blackBorder
			/>
			{
				currentOpen === 'throughScrew' ?
					<ScrollView contentContainerStyle={{
						flexGrow: 1
					}}>
						{
							dataThroughScrews.map(it => {
								return (
									<ItemContainer key={`throughScrew${it.id}`} onPress={() => {
										navigation.dispatch(CommonActions.navigate('NewThroughScrew', {
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
					: null
			}
		</>
	);
}
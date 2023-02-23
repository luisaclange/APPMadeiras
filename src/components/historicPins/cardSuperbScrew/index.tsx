import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText } from './styles';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { database } from '../../../database';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import DoubleArrow from '../../../assets/svgs/doubleArrow.svg';
import Delete from '../../../assets/svgs/delete.svg';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ButtonLight from '../../global/buttons/buttonLight';
import { CommonActions, useNavigation } from '@react-navigation/native';

export interface ICardSuperbScrew {
	id: string;
	name: string;
	diameter: number;
	length: number;
	isData: boolean;
}

interface IProps {
	dataSuperbScrews: ICardSuperbScrew[];
	currentOpen: string;
	setCurrentOpen: Dispatch<SetStateAction<string>>;
	getData: () => Promise<void>;
}

export default function CardSuperbScrew({ dataSuperbScrews, currentOpen, setCurrentOpen, getData }: IProps) {
	// Variáveis
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [visibleSuccess, setVisibleSuccess] = useState(false);
	const [visibleError, setVisibleError] = useState(false);
	const [item, setItem] = useState<ICardSuperbScrew | Record<string, never>>({});

	// Navegação
	const navigation = useNavigation();

	// Deletar pino
	async function deleteAction() {
		try {
			setVisibleDelete(false);
			const aux = await database.get<SuperbScrewModel>('superbScrews').find(item.id);
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
					setCurrentOpen(currentOpen === 'superbScrew' ? '' : 'superbScrew');
				}}
				text='Parafusos de rosca soberba'
				style={{ width: '100%' }}
				blackBorder
			/>
			{
				currentOpen === 'superbScrew' ?
					<ScrollView contentContainerStyle={{
						flexGrow: 1
					}}>
						{
							dataSuperbScrews.map(it => {
								return (
									<ItemContainer key={`superbScrew${it.id}`} onPress={() => {
										navigation.dispatch(CommonActions.navigate('NewSuperbScrew', {
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
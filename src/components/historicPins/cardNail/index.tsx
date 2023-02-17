import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText, ScrollItems, TitleButtonContainer, TitleButtonText } from './styles';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';

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
	const [visibleNail, setVisibleNail] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [item, setItem] = useState<ICardNail | Record<string, never>>({});

	async function deleteAction() {
		setVisibleDelete(false);
		const aux = await database.get<NailModel>('nails').find(item.id);
		await database.write(async () => {
			await aux.destroyPermanently();
		});
		getData();
	}
	return (
		<>
			{
				item.isData ?
					<PopUpTwoButtons
						visible={visibleNail}
						setVisible={setVisibleNail}
						lActionButton={() => {
							setVisibleNail(false);
							setVisibleDelete(true);
						}}
						lTextButton='Excluir'
						message={`Mais informações:\n\n${item.name}\n\nJP: ${String(item.JP).replace('.', ',')} mm\nLPP: ${String(item.LPP).replace('.', ',')} mm\n`}
						rActionButton={() => {
							setVisibleNail(false);
						}}
						rTextButton='OK'
					/>
					:
					<PopUpOneButton
						visible={visibleNail}
						actionButton={() => {
							setVisibleNail(false);
						}}
						message={`Mais informações:\n\n${item.name}\n\nJP: ${String(item.JP).replace('.', ',')} mm\nLPP: ${String(item.LPP).replace('.', ',')} mm\n`}
						setVisible={setVisibleNail}
						textButton='OK'
					/>
			}
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
			<TitleButtonContainer onPress={() => {
				setCurrentOpen(currentOpen === 'nail' ? '' : 'nail');
			}}>
				<TitleButtonText>Pregos</TitleButtonText>
			</TitleButtonContainer>
			{
				currentOpen === 'nail' ?
					<ScrollItems contentContainerStyle={{
						flexGrow: 1
					}}>
						{
							dataNails.map(it => {
								return (
									<>
										<ItemContainer key={it.id} onPress={() => {
											setItem(it);
											setVisibleNail(true);
										}}>
											<ItemText>{it.name}{it.isData && '**'}</ItemText>
										</ItemContainer>
									</>
								);
							})
						}
					</ScrollItems>
					: null
			}
		</>
	);
}
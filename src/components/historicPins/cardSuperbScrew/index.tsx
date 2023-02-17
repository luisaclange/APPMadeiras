import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText, ScrollItems, TitleButtonContainer, TitleButtonText } from './styles';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { database } from '../../../database';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';

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
	const [visibleSuperbScrew, setVisibleSuperbScrew] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [item, setItem] = useState<ICardSuperbScrew | Record<string, never>>({});

	async function deleteAction() {
		setVisibleDelete(false);
		const aux = await database.get<SuperbScrewModel>('superbScrews').find(item.id);
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
						visible={visibleSuperbScrew}
						setVisible={setVisibleSuperbScrew}
						lActionButton={() => {
							setVisibleSuperbScrew(false);
							setVisibleDelete(true);
						}}
						lTextButton='Excluir'
						message={`Mais informações:\n\n${item.name}\n\nDiâmetro: ${String(item.diameter).replace('.', ',')} mm\nComprimento: ${String(item.length).replace('.', ',')} mm\n`}
						rActionButton={() => {
							setVisibleSuperbScrew(false);
						}}
						rTextButton='OK'
					/>
					:
					<PopUpOneButton
						visible={visibleSuperbScrew}
						actionButton={() => {
							setVisibleSuperbScrew(false);
						}}
						message={`Mais informações:\n\n${item.name}\n\nDiâmetro: ${String(item.diameter).replace('.', ',')} mm\nComprimento: ${String(item.length).replace('.', ',')} mm\n`}
						setVisible={setVisibleSuperbScrew}
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
				setCurrentOpen(currentOpen === 'superbScrew' ? '' : 'superbScrew');
			}}>
				<TitleButtonText>Parafusos de rosca soberba</TitleButtonText>
			</TitleButtonContainer>
			{
				currentOpen === 'superbScrew' ?
					<ScrollItems contentContainerStyle={{
						flexGrow: 1
					}}>
						{
							dataSuperbScrews.map(it => {
								return (
									<ItemContainer key={it.id} onPress={() => {
										setItem(it);
										setVisibleSuperbScrew(true);
									}}>
										<ItemText>{it.name}{it.isData && '**'}</ItemText>
									</ItemContainer>
								);
							})
						}
					</ScrollItems>
					: null
			}
		</>
	);
}
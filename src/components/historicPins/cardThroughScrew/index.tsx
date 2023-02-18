import React, { Dispatch, SetStateAction, useState } from 'react';
import { ItemContainer, ItemText, ScrollItems, TitleButtonContainer, TitleButtonText } from './styles';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';
import { database } from '../../../database';
import PopUpTwoButtons from '../../global/popUps/popUpTwoButtons';
import PopUpOneButton from '../../global/popUps/popUpOneButton';

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
	const [visibleThroughScrew, setVisibleThroughScrew] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [item, setItem] = useState<ICardThroughScrew | Record<string, never>>({});

	async function deleteAction() {
		setVisibleDelete(false);
		const aux = await database.get<ThroughScrewModel>('throughScrews').find(item.id);
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
						visible={visibleThroughScrew}
						setVisible={setVisibleThroughScrew}
						lActionButton={() => {
							setVisibleThroughScrew(false);
							setVisibleDelete(true);
						}}
						lTextButton='Excluir'
						message={`Mais informações:\n\n${item.name}\n\nDiâmetro: ${String(item.diameter).replace('.', ',')} mm\nComprimento: ${String(item.length).replace('.', ',')} mm\n`}
						rActionButton={() => {
							setVisibleThroughScrew(false);
						}}
						rTextButton='OK'
					/>
					:
					<PopUpOneButton
						visible={visibleThroughScrew}
						actionButton={() => {
							setVisibleThroughScrew(false);
						}}
						message={`Mais informações:\n\n${item.name}\n\nDiâmetro: ${String(item.diameter).replace('.', ',')} mm\nComprimento: ${String(item.length).replace('.', ',')} mm\nComprimento de rosca: ${String(item.rosLenght).replace('.', ',')} mm\nCabeça do pino: ${String(item.height).replace('.', ',')} mm\n`}
						setVisible={setVisibleThroughScrew}
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
				setCurrentOpen(currentOpen === 'throughScrew' ? '' : 'throughScrew');
			}}>
				<TitleButtonText>Parafusos passantes</TitleButtonText>
			</TitleButtonContainer>
			{
				currentOpen === 'throughScrew' ?
					<ScrollItems contentContainerStyle={{
						flexGrow: 1
					}}>
						{
							dataThroughScrews.map(it => {
								return (
									<ItemContainer key={it.id} onPress={() => {
										setItem(it);
										setVisibleThroughScrew(true);
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
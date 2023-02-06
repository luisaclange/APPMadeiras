import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import { CalcModel } from '../../database/models/calcModel';
import { INail } from '../../interfaces/Nail';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../interfaces/ThroughScrew';

interface IProps {
	data: CalcModel | Record<string, never>;
	pins: number;
}

export default async function calcDraw({ pins, data }: IProps) {
	// Diâmetro do pino
	let d: number;
	switch (data.pinType) {
		case 'prego':
			d = NailsDimensions.find((item: INail) => item.id === data.pinSelected).JP;

			break;
		case 'parafusoSoberba':
			d = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === data.pinSelected,
			).diametro;

			break;
		case 'parafusoPassante':
			d = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === data.pinSelected,
			).diametro;

			break;
	}

	//Borda livre horizontal
	let bfHorizontal: number;
	if (data.pinType === 'prego') {
		bfHorizontal = Math.ceil((d * 12) / 5) * 5;
	} else {
		bfHorizontal = Math.ceil((Math.max(d * 7, 80 - d / 2)) / 5) * 5;
	}

	//Borda livre vertical
	const bfVertical = Math.ceil((d * 3) / 5) * 5;

	//Número de pregos por coluna
	let nPinsColumn: number;
	if (data.pinType === 'prego') {
		nPinsColumn = Math.ceil(
			(data.widthWood - bfVertical * 2) / (3 * d),
		);
	} else {
		nPinsColumn = Math.ceil(
			(data.widthWood - bfVertical * 2) / (4 * d),
		);
	}

	//Espaçamento vertical entre pregos - coluna normal
	let spaceNormalColumnPins: number;
	if (pins >= nPinsColumn) {
		spaceNormalColumnPins = (data.widthWood - bfVertical * 2) / (nPinsColumn - 1);
	} else {
		spaceNormalColumnPins = (data.widthWood - bfVertical * 2) / (pins - 1);
	}

	//Número de colunas
	const nColumns = Math.ceil(pins / nPinsColumn);

	//Número de pregos na última coluna
	const nPinsSpecialColumn = pins - (nColumns - 1) * nPinsColumn;

	//Borda livre horizontal - última coluna
	const bfVerticalSpecial =
		nPinsSpecialColumn === 1 ? (data.widthWood) / 2 : bfVertical;

	//Espaçamento entre pregos - última coluna
	const spaceSpecialColumnPins =
		nPinsSpecialColumn === 1 ? 0 : (data.widthWood - 2 * bfVerticalSpecial) / (nPinsSpecialColumn - 1);

	//Espaço entre colunas
	const spaceColumns = Math.ceil((6 * d) / 5) * 5;

	console.log({
		bfHorizontal,
		bfVertical,
		nPinsColumn,
		spaceNormalColumnPins,
		nColumns,
		nPinsSpecialColumn,
		bfVerticalSpecial,
		spaceSpecialColumnPins,
		spaceColumns,
		d
	});

	return {
		bfHorizontal,
		bfVertical,
		nPinsColumn,
		spaceNormalColumnPins,
		nColumns,
		nPinsSpecialColumn,
		bfVerticalSpecial,
		spaceSpecialColumnPins,
		spaceColumns,
		d
	};
}

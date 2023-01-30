import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import { CalcModel } from '../../database/models/calcModel';
import { INail } from '../../interfaces/Nail';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../interfaces/ThroughScrew';

interface IProps {
	data: CalcModel | Record<string, never>;
	nails: number;
}

export default async function calcDraw({ nails, data }: IProps) {

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
		bfHorizontal = Math.ceil((d * 11.5) / 5) * 5;
	} else {
		bfHorizontal = Math.ceil((Math.max(d * 6.5, 80 - d / 2)) / 5) * 5;
	}

	//Borda livre vertical
	const bfVertical = Math.ceil((d * 2.5) / 5) * 5;

	//Numero de pregos por coluna
	let nNailsColumn: number;
	if (data.pinType === 'prego') {
		nNailsColumn = Math.ceil(
			(data.widthWood - bfVertical * 2) / (3 * d),
		);
	} else {
		nNailsColumn = Math.ceil(
			(data.widthWood - bfVertical * 2) / (4 * d),
		);
	}

	console.log(nails);
	//Espaçamento entre pregos - coluna normal
	let spaceNormalColumnNails: number;
	if (nails >= nNailsColumn) {
		spaceNormalColumnNails = (data.widthWood - bfVertical * 2) / (nNailsColumn - 1);
	} else {
		spaceNormalColumnNails = (data.widthWood - bfVertical * 2) / (nails - 1);
	}

	//Numero de colunas
	const nColumns = Math.ceil(nails / nNailsColumn);

	//Numero de pregos na ultima coluna
	const nNailsSpecialColumn = nails - (nColumns - 1) * nNailsColumn;

	//Borda livre horizontal - ultima coluna
	const bfVerticalSpecial =
		Math.floor(
			(Number(data.widthWood) - (nNailsSpecialColumn - 1) * 3 * d) /
			2 /
			5,
		) * 5;

	//Espacamento entre pregos ultima coluna
	const spaceSpecialColumnNails =
		(Number(data.widthWood) - bfVerticalSpecial * 2) / (nNailsSpecialColumn - 1);

	//Espaço entre colunas
	const spaceColumns = Math.ceil((6 * d) / 5) * 5;

	console.log({
		bfHorizontal,
		bfVertical,
		nNailsColumn,
		spaceNormalColumnNails,
		nColumns,
		nNailsSpecialColumn,
		bfVerticalSpecial,
		spaceSpecialColumnNails,
		spaceColumns,
	});

	return {
		bfHorizontal,
		bfVertical,
		nNailsColumn,
		spaceNormalColumnNails,
		nColumns,
		nNailsSpecialColumn,
		bfVerticalSpecial,
		spaceSpecialColumnNails,
		spaceColumns,
	};
}

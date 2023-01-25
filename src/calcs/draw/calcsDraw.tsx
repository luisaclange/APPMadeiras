import { ParafusoPassanteDimensions } from '../../archive/PinsDimensions/ThroughScrews';
import { ParafusoSoberbaDimensions } from '../../archive/PinsDimensions/SuperbScrews';
import { PregoDimensions } from '../../archive/PinsDimensions/Nails';
import { CalcModel } from '../../database/models/calcModel';

interface IProps {
	data: CalcModel | Record<string, never>;
	nails: number;
}

export default async function calcDraw({ nails, data }: IProps) {

	let d: number;
	switch (data.nailType) {
		case 'prego':
			d = PregoDimensions.find(item => item.id === data.nailDimension).JP;

			break;
		case 'parafusoSoberba':
			d = ParafusoSoberbaDimensions.find(
				item => item.id === data.nailDimension,
			).diametro;

			break;
		case 'parafusoPassante':
			d = ParafusoPassanteDimensions.find(
				item => item.id === data.nailDimension,
			).diametro;

			break;
	}

	//Borda livre horizontal
	let bfHorizontal: number;
	if (data.nailType === 'prego') {
		bfHorizontal = Math.ceil((d * 11.5) / 5) * 5;
	} else {
		bfHorizontal = Math.ceil((Math.max(d * 6.5, 80 - d / 2)) / 5) * 5;
	}

	//Borda livre vertical
	const bfVertical = Math.ceil((d * 2.5) / 5) * 5;

	//Numero de pregos por coluna
	let nNailsColumn: number;
	if (data.nailType === 'prego') {
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

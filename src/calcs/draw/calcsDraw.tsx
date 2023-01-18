import { NailDimensions } from '../../archive/2_Dimensions/Pregos';
import { database } from '../../database';
import { CalcModel } from '../../database/models/calcModel';

export default async function calcDraw(nails: number, id_calc: string) {
	const { nailDimension, widthWood } = await database
		.get<CalcModel>('calcs')
		.find(id_calc);

	const nail = NailDimensions.find(item => {
		return nailDimension === item.id;
	});

	//Borda livre horizontal
	const bfHorizontal = Math.ceil((nail.JP * 7) / 5) * 5;

	//Borda livre vertical
	const bfVertical = Math.ceil((nail.JP * 1.5) / 5) * 5;

	//Numero de pregos por coluna
	const nNailsColumn = Math.ceil(
		(Number(widthWood) - bfVertical * 2) / (3 * nail.JP),
	);

	//Espaçamento entre pregos - coluna normal
	const spaceNormalColumnNails =
		(Number(widthWood) - bfVertical * 2) / (nNailsColumn - 1);

	//Numero de colunas
	const nColumns = Math.ceil(nails / nNailsColumn);

	//Numero de pregos na ultima coluna
	const nNailsSpecialColumn = nails - (nColumns - 1) * nNailsColumn;

	//Borda livre horizontal - ultima coluna
	const bfVerticalSpecial =
		Math.floor(
			(Number(widthWood) - (nNailsSpecialColumn - 1) * 3 * nail.JP) /
				2 /
				5,
		) * 5;

	//Espacamento entre pregos ultima coluna
	const spaceSpecialColumnNails =
		(Number(widthWood) - bfVerticalSpecial * 2) / (nNailsSpecialColumn - 1);

	//Espaço entre colunas
	const spaceColumns = Math.ceil((6 * nail.JP) / 5) * 5;

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

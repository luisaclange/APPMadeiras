import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import { CalcModel } from '../../database/models/calcModel';
import { INail } from '../../interfaces/Nail';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../interfaces/ThroughScrew';
import { database } from '../../database';
import { NailModel } from '../../database/models/nailModel';
import { SuperbScrewModel } from '../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../database/models/throughScrewModel';

interface IProps {
	data: CalcModel | Record<string, never>;
	pins: number;
}

export default async function calcDraw({ pins, data }: IProps) {
	// Diâmetro do pino
	let d: number;
	switch (data.pinType) {
		case 'prego':
			d = NailsDimensions.find((item: INail) => item.id === data.pinSelected)?.JP;

			if (!d)
				d = (await database.get<NailModel>('nails').find(data.pinSelected))?.JP;

			break;
		case 'parafusoSoberba':
			d = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === data.pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<SuperbScrewModel>('superbScrews').find(data.pinSelected))?.diametro;

			break;
		case 'parafusoPassante':
			d = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === data.pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<ThroughScrewModel>('throughScrews').find(data.pinSelected))?.diametro;

			break;
	}

	//Borda livre horizontal
	let bfHorizontal: number;
	if (data.pinType === 'prego') {
		if (data.tractiveForce && data.tractiveForce < 0)
			bfHorizontal = Math.ceil((d * 7) / 5) * 5;
		else bfHorizontal = Math.ceil((d * 12) / 5) * 5;
	} else {
		if (data.tractiveForce && data.tractiveForce < 0)
			bfHorizontal = Math.ceil((d * 4) / 5) * 5;
		else bfHorizontal = Math.ceil((Math.max(d * 7, 80 - d / 2)) / 5) * 5;
	}

	//Borda livre vertical
	const bfVertical = Math.ceil((d * 3) / 5) * 5;

	//Número de pinos por coluna
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

	//Espaçamento vertical entre pinos - coluna normal
	let spaceNormalColumnPins: number;
	if (pins >= nPinsColumn) {
		spaceNormalColumnPins = (data.widthWood - bfVertical * 2) / (nPinsColumn - 1);
	} else {
		spaceNormalColumnPins = (data.widthWood - bfVertical * 2) / (pins - 1);
	}

	//Número de colunas
	const nColumns = Math.ceil(pins / nPinsColumn) <= 1 && pins > 2 ? 2 : Math.ceil(pins / nPinsColumn);

	// Recalculando o número de pinos por coluna
	nPinsColumn = Math.ceil(pins / nColumns);

	// Recalculando o espaçamento entre pinos - normal
	spaceNormalColumnPins = (data.widthWood - bfVertical * 2) / (nPinsColumn - 1);

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

	// Transpasse
	const passThrough = 2 * bfHorizontal + (nColumns - 1) * spaceColumns;

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
		d,
		passThrough
	};
}

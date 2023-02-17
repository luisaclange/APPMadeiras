import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';
import CalcMaxForce from './maxForce';
import CalcPinQtde from './pinQtde';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';

interface IProps {
	FvRk: number;
	tractiveForce?: number;
	numberPins?: number;
	ligationType: string;
	calc: string;
	kmod: number;
	widthWood: number;
	pinType: string;
	pinSelected: string;
}

export default async function CalcFinal({
	FvRk,
	ligationType,
	numberPins,
	tractiveForce,
	calc,
	kmod,
	widthWood,
	pinType,
	pinSelected
}: IProps) {
	// Cálculo do diametro do pino metalico
	let d: number;

	switch (pinType) {
		case 'prego':
			d = NailsDimensions.find((item: INail) => item.id === pinSelected)?.JP;

			if (!d)
				d = (await database.get<NailModel>('nails').find(pinSelected))?.JP;

			break;
		case 'parafusoSoberba':
			d = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<SuperbScrewModel>('superbScrews').find(pinSelected))?.diametro;

			break;
		case 'parafusoPassante':
			d = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<ThroughScrewModel>('throughScrews').find(pinSelected))?.diametro;

			break;
	}

	let Rd: number;
	let nPins: number;

	if (calc === 'pinQtde') {
		// Cálculo da quantidade de pinos necessários
		const result = CalcPinQtde({
			d,
			FvRk,
			kmod,
			ligationType,
			tractiveForce,
			pinType,
			widthWood
		});
		Rd = result.Rd;
		nPins = result.nPins;
	} else {
		// Cálculo da força máxima a ser aplicada
		const result = CalcMaxForce({
			d,
			FvRk,
			kmod,
			ligationType,
			numberPins,
			pinType,
			widthWood
		});
		Rd = result.Rd;
		nPins = numberPins;
	}

	return { Rd, nPins };
}

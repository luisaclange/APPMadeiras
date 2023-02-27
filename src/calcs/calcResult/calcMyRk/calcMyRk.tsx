import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';

export async function CalcMyRk(pinType: string, pinSelected: string) {
	let diameter: number;
	let fuk: number;
	let name: string;

	// Calculando cada força ultima resistente conforme o tipo e diametro do pino
	switch (pinType) {
		case 'prego':
			diameter = NailsDimensions.find((item: INail) => item.id === pinSelected)?.JP;

			if (!diameter)
				diameter = (await database.get<NailModel>('nails').find(pinSelected))?.JP;

			if (diameter >= 3 && diameter < 3.55) {
				fuk = 635;
			} else if (diameter >= 3.55 && diameter < 5) {
				fuk = 600;
			} else {
				fuk = 490;
			}

			break;
		case 'parafusoSoberba':
			diameter = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === pinSelected,
			)?.diametro;

			if (!diameter)
				diameter = (await database.get<SuperbScrewModel>('superbScrews').find(pinSelected))?.diametro;

			fuk = 415;

			break;
		case 'parafusoPassante':
			diameter = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			)?.diametro;
			name = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			)?.name;

			if (!diameter)
				diameter = (await database.get<ThroughScrewModel>('throughScrews').find(pinSelected))?.diametro;

			if (!name)
				name = (await database.get<ThroughScrewModel>('throughScrews').find(pinSelected))?.name;

			if (name.includes('A307')) {
				fuk = 415;
			} else if (name.includes('A325')) {
				fuk = 825;
			} else if (name.includes('A490')) {
				fuk = 1035;
			} else {
				const pin = await database.get<ThroughScrewModel>('throughScrews').find(pinSelected);
				switch (pin.steelType) {
					case 'ASTM A307':
						fuk = 415;
						break;
					case 'ASTM A325':
						fuk = 825;
						break;
					case 'ASTM A490':
						fuk = 1035;
						break;
					case 'ISO 898-1 Classe 4.6':
						fuk = 400;
						break;
					case 'ISO 898-1 Classe 8.8':
						fuk = 800;
						break;
					case 'ISO 898-1 Classe 10.9':
						fuk = 1000;
						break;
					default:
						fuk = 0;
						break;
				}
			}

			break;
	}

	// Cálculo do MyRk
	const MyRk = 0.3 * fuk * Math.pow(diameter, 2.6);

	return { MyRk, fuk };
}

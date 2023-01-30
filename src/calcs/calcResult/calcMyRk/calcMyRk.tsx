import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';

export function CalcMyRk(nailType: string, id_nail: string) {
	let diameter: number;
	let fuk: number;
	let name: string;

	// Calculando cada força ultima resistente conforme o tipo e diametro do pino
	switch (nailType) {
		case 'prego':
			diameter = NailsDimensions.find((item: INail) => item.id === id_nail).JP;

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
				(item: ISuperbScrew) => item.id === id_nail,
			).diametro;

			fuk = 415;

			break;
		case 'parafusoPassante':
			diameter = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === id_nail,
			).diametro;
			name = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === id_nail,
			).name;

			if (name.includes('A307')) {
				fuk = 415;
			} else if (name.includes('A325')) {
				fuk = 825;
			} else if (name.includes('A490')) {
				fuk = 1035;
			} else {
				fuk = 0;
			}

			break;
	}

	// Cálculo do MyRk
	const MyRk = 0.3 * fuk * Math.pow(diameter, 2.6);

	return { MyRk, fuk };
}

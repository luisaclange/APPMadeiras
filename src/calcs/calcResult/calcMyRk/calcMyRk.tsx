import { ParafusoPassanteDimensions } from '../../../archive/2_Dimensions/ParafusoPassante';
import { ParafusoSoberbaDimensions } from '../../../archive/2_Dimensions/ParafusoSoberba';
import { PregoDimensions } from '../../../archive/2_Dimensions/Pregos';

export function CalcMyRk(nailType: string, id_nail: string) {
	let diameter: number;
	let fuk: number;

	switch (nailType) {
		case 'prego':
			diameter = PregoDimensions.find(item => item.id === id_nail).JP;

			if (diameter >= 3 && diameter < 3.55) {
				fuk = 635;
			} else if (diameter >= 3.55 && diameter < 5) {
				fuk = 600;
			} else {
				fuk = 490;
			}

			break;
		case 'parafusoSoberba':
			diameter = ParafusoSoberbaDimensions.find(
				item => item.id === id_nail,
			).diametro;

			fuk = 415;

			break;
		case 'parafusoPassante':
			diameter = ParafusoPassanteDimensions.find(
				item => item.id === id_nail,
			).diametro;
			const name = ParafusoPassanteDimensions.find(
				item => item.id === id_nail,
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

	const MyRk = 0.3 * fuk * Math.pow(diameter, 2.6);

	return MyRk;
}

import { WoodResistanceClasses } from '../../../archive/1_ClassesResistencia/ClassesResistencia';
import { ParafusoPassanteDimensions } from '../../../archive/2_Dimensions/ParafusoPassante';
import { ParafusoSoberbaDimensions } from '../../../archive/2_Dimensions/ParafusoSoberba';
import { PregoDimensions } from '../../../archive/2_Dimensions/Pregos';
import { NativeWoods } from '../../../archive/3_NativeWood/NativeWood';

export default function CalcFek(
	nailType: string,
	woodName: number,
	nailDimension: string,
) {
	let diameter: number;

	switch (nailType) {
		case 'prego':
			diameter = PregoDimensions.find(
				item => item.id === nailDimension,
			).JP;

			break;
		case 'parafusoSoberba':
			diameter = ParafusoSoberbaDimensions.find(
				item => item.id === nailDimension,
			).diametro;

			break;
		case 'parafusoPassante':
			diameter = ParafusoPassanteDimensions.find(
				item => item.id === nailDimension,
			).diametro;

			break;
	}

	const classResistence = NativeWoods.find(
		item => item.id === woodName,
	).class;

	const density = WoodResistanceClasses.find(
		item => item.class === classResistence,
	).density;

	const pk = density / 1.2;

	let fek: number;

	if (diameter < 8 && nailType === 'prego')
		fek = 0.082 * (1 - 0.01 * diameter) * pk;
	else fek = (0.082 * (1 - 0.01 * diameter) * pk) / (0.9 + 0.015 * diameter);

	return fek;
}

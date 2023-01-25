import { WoodResistanceClasses } from '../../../archive/NBRTables/ResistenceClasses/ClassesResistencia';
import { ParafusoPassanteDimensions } from '../../../archive/PinsDimensions/ThroughScrews';
import { ParafusoSoberbaDimensions } from '../../../archive/PinsDimensions/SuperbScrews';
import { PregoDimensions } from '../../../archive/PinsDimensions/Nails';
import { NativeWoods } from '../../../archive/NBRTables/NativeWood/NativeWood';

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

	return { fek, density, pk };
}

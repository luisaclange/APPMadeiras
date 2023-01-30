import { WoodResistanceClasses } from '../../../archive/NBRTables/ResistenceClasses/ClassesResistencia';
import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { NativeWoods } from '../../../archive/NBRTables/NativeWood/NativeWood';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';

export default function CalcFek(
	nailType: string,
	woodName: number,
	nailDimension: string,
) {
	let diameter: number;

	// Determinação do diametro do pino utilizado
	switch (nailType) {
		case 'prego':
			diameter = NailsDimensions.find(
				(item: INail) => item.id === nailDimension,
			).JP;

			break;
		case 'parafusoSoberba':
			diameter = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === nailDimension,
			).diametro;

			break;
		case 'parafusoPassante':
			diameter = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === nailDimension,
			).diametro;

			break;
	}

	// Busca pela madeira e sua respectiva classe de resistencia
	const classResistence = NativeWoods.find(
		item => item.id === woodName,
	).class;

	// Determinação da densidade conforme a classe de resistencia
	const density = WoodResistanceClasses.find(
		item => item.class === classResistence,
	).density;

	// Cálculo da densidade característica
	const pk = density / 1.2;

	// Determinação da resistencia ao embutimento da madeira
	let fek: number;
	if (diameter < 8 && nailType === 'prego')
		fek = 0.082 * (1 - 0.01 * diameter) * pk;
	else fek = (0.082 * (1 - 0.01 * diameter) * pk) / (0.9 + 0.015 * diameter);

	return { fek, density, pk };
}

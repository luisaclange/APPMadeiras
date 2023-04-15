import { WoodResistanceClasses } from '../../../archive/NBRTables/ResistenceClasses/ClassesResistencia';
import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { NativeWoods } from '../../../archive/NBRTables/NativeWood/NativeWood';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';

export default async function CalcFek(
	nailType: string,
	woodName: number,
	pinSelected: string,
) {
	let diameter: number;

	// Determinação do diametro do pino utilizado
	switch (nailType) {
		case 'prego':
			diameter = NailsDimensions.find(
				(item: INail) => item.id === pinSelected,
			)?.JP;

			if (!diameter)
				diameter = (await database.get<NailModel>('nails').find(pinSelected))?.JP;

			break;
		case 'parafusoSoberba':
			diameter = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === pinSelected,
			)?.diametro;

			if (!diameter)
				diameter = (await database.get<SuperbScrewModel>('superbScrews').find(pinSelected))?.diametro;

			break;
		case 'parafusoPassante':
			diameter = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			)?.diametro;

			if (!diameter)
				diameter = (await database.get<ThroughScrewModel>('throughScrews').find(pinSelected))?.diametro;

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
	const fek = 0.082 * (1 - 0.01 * diameter) * pk;

	return { fek, density, pk };
}

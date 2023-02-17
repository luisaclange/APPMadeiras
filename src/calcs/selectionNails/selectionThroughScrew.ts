import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import { IThroughScrew } from '../../interfaces/ThroughScrew';
import { database } from '../../database';
import { ThroughScrewModel } from '../../database/models/throughScrewModel';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
}

export async function SelectionThroughScrew({
	setData,
	esp1,
	esp2,
	ligationType,
}: IProps) {
	const dataPins = await database.get<ThroughScrewModel>('throughScrews').query().fetch();
	const aux1 = dataPins.filter((screw: IThroughScrew) => {
		let verification = true;

		if (screw.diametro > Math.min(esp1, esp2) * 0.5) verification = false;
		if (ligationType === 'corteSimples') {
			if (screw.comprimento < esp1 + esp2 + screw.altura) verification = false;
			if (screw.comprimento > esp1 + esp2 + screw.altura - screw.roscaComp) verification = false;
		} else {
			if (screw.comprimento < esp1 * 2 + esp2 + screw.altura) verification = false;
			if (screw.comprimento > esp1 * 2 + esp2 + screw.altura - screw.roscaComp)
				verification = false;
		}

		return verification;
	}).map(screw => {
		return {
			id: screw?.id,
			value: screw?.name,
			isDataFile: true,
		};
	});
	const aux2 = ThroughScrewsDimensions.filter((screw: IThroughScrew) => {
		let verification = true;

		if (screw.diametro > Math.min(esp1, esp2) * 0.5) {
			verification = false;
		}
		if (ligationType === 'corteSimples') {
			if (screw.comprimento < esp1 + esp2 + screw.altura) {
				verification = false;
			}
			if (screw.comprimento > esp1 + esp2 + screw.altura - screw.roscaComp) {
				verification = false;
			}
		} else {
			if (screw.comprimento < esp1 * 2 + esp2 + screw.altura) verification = false;
			if (screw.comprimento > esp1 * 2 + esp2 + screw.altura - screw.roscaComp)
				verification = false;
		}

		return verification;
	}).map(screw => {
		return {
			id: screw?.id,
			value: screw?.name,
			isDataFile: false,
		};
	});

	const aux3 = aux1.concat(aux2);

	setData(aux3);
}

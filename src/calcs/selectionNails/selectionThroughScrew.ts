import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import { IThroughScrew } from '../../interfaces/ThroughScrew';
import { database } from '../../database';
import { ThroughScrewModel } from '../../database/models/throughScrewModel';
import DimensionsRange from '../../interfaces/DimensionsRange';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
	setRange: Dispatch<SetStateAction<DimensionsRange>>;
}

export async function SelectionThroughScrew({
	setData,
	esp1,
	esp2,
	ligationType,
	setRange,
}: IProps) {
	const dataPins = await database.get<ThroughScrewModel>('throughScrews').query().fetch();
	const dMin = 9.5;
	const dMax = 0.5 * Math.min(esp1, esp2);
	let compMin: number;
	if (ligationType === 'corteSimples') compMin = esp1 + esp2;
	else compMin = esp1 * 2 + esp2;
	const compMax = undefined;
	const aux1 = dataPins.filter((screw: IThroughScrew) => {
		let verification = true;

		if (screw.diametro > Math.min(esp1, esp2) * 0.5) verification = false;
		if (ligationType === 'corteSimples') {
			if (screw.comprimento < esp1 + esp2 + screw.altura) verification = false;
			if (screw.comprimento > esp1 + esp2 + screw.altura + screw.roscaComp) verification = false;
		} else {
			if (screw.comprimento < esp1 * 2 + esp2 + screw.altura) verification = false;
			if (screw.comprimento > esp1 * 2 + esp2 + screw.altura + screw.roscaComp)
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
	setRange({
		dMin,
		dMax,
		compMin,
		compMax,
	});
}

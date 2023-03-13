import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';
import { database } from '../../database';
import { SuperbScrewModel } from '../../database/models/superbScrewModel';
import DimensionsRange from '../../interfaces/DimensionsRange';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
	setRange: Dispatch<SetStateAction<DimensionsRange>>;
}

export async function SelectionSuperbScrew({ setData, esp1, esp2, ligationType, setRange }: IProps) {
	const dataPins = await database.get<SuperbScrewModel>('superbScrews').query().fetch();
	const tm = Math.min(esp1, esp2);
	const dMin = 9.5;
	const dMax = 0.2 * tm;
	const compMin = tm * 2;
	let compMax: number;
	if (ligationType === 'corteSimples') compMax = esp1 + esp2;
	else compMax = esp1 * 2 + esp2;
	const aux1 = dataPins.filter(screw => {
		const tp = Math.max(6 * screw.diametro, tm);
		let verification = true;

		if (screw.diametro > tm * 0.2) verification = false;
		if (screw.comprimento < esp1 + tp) verification = false;
		if (ligationType === 'corteSimples') {
			if (screw.comprimento > esp1 + esp2) verification = false;
		} else {
			if (screw.comprimento > esp1 * 2 + esp2) verification = false;
		}
		return verification;
	}).map(screw => {
		return {
			id: screw?.id,
			value: screw?.name,
			isDataFile: true,
		};
	});
	const aux2 = SuperbScrewsDimensions.filter((screw: ISuperbScrew) => {
		const tp = Math.max(6 * screw.diametro, tm);
		let verification = true;

		if (screw.diametro > tm * 0.2) verification = false;
		if (screw.comprimento < esp1 + tp) verification = false;
		if (ligationType === 'corteSimples') {
			if (screw.comprimento > esp1 + esp2) verification = false;
		} else {
			if (screw.comprimento > esp1 * 2 + esp2) verification = false;
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

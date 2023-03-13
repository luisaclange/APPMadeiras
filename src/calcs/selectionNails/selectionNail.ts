import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import { INail } from '../../interfaces/Nail';
import { database } from '../../database';
import { NailModel } from '../../database/models/nailModel';
import DimensionsRange from '../../interfaces/DimensionsRange';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
	setRange: Dispatch<SetStateAction<DimensionsRange>>;
}

export async function SelectionNail({ setData, esp1, esp2, ligationType, setRange }: IProps) {
	const dataPins = await database.get<NailModel>('nails').query().fetch();
	const tm = Math.min(esp1, esp2);
	const dMin = 3;
	const dMax = 0.2 * tm;
	let compMin: number;
	if (ligationType === 'corteSimples') compMin = tm * 2;
	else compMin = esp1 + esp2 + tm;
	let compMax: number;
	if (ligationType === 'corteSimples') compMax = esp1 + esp2;
	else compMax = esp1 * 2 + esp2;
	const aux1 = dataPins.filter(nail => {
		const tp = Math.max(12 * nail.JP, tm);
		let verification = true;

		if (nail.JP > tm * 0.2) verification = false;
		if (ligationType === 'corteSimples') {
			if (nail.LPP < esp1 + tp) verification = false;
			else if (nail.LPP > esp1 + esp2) verification = false;
		} else {
			if (nail.LPP < esp1 + esp2 + tp) verification = false;
			else if (nail.LPP > esp1 * 2 + esp2) verification = false;
		}

		return verification;
	}).map(nail => {
		return {
			id: nail?.id,
			value: nail?.name,
			isDataFile: true,
		};
	});
	const aux2 = NailsDimensions.filter((nail: INail) => {
		const tp = Math.max(12 * nail.JP, tm);
		let verification = true;

		if (nail.JP > tm * 0.2) verification = false;
		if (ligationType === 'corteSimples') {
			if (nail.LPP < esp1 + tp) verification = false;
			else if (nail.LPP > esp1 + esp2) verification = false;
		} else {
			if (nail.LPP < esp1 + esp2 + tp) verification = false;
			else if (nail.LPP > esp1 * 2 + esp2) verification = false;
		}

		return verification;
	}).map(nail => {
		return {
			id: nail?.id,
			value: nail?.name,
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

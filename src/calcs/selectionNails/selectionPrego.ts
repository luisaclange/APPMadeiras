import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import NailsDimensions from '../../archive/PinsDimensions/Nails.json';
import { INail } from '../../interfaces/Nail';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
}

export function SelectionPrego({ setData, esp1, esp2, ligationType }: IProps) {
	const aux = NailsDimensions.filter((nail: INail) => {
		const tm = Math.min(esp1, esp2);
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
	});

	setData(
		aux.map(item => {
			return {
				id: item?.id,
				value: item?.name,
			};
		}),
	);
}

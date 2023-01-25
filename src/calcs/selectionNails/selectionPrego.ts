import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import { PregoDimensions } from '../../archive/PinsDimensions/Nails';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
}

export function SelectionPrego({ setData, esp1, esp2, ligationType }: IProps) {
	const aux = PregoDimensions.filter(nail => {
		const tm = Math.min(esp1, esp2);
		const tp = Math.max(12 * nail.JP, tm);
		let verification = true;

		if (nail.JP > tm * 0.2) {
			console.log(`caso 1 - ${nail.name} - ${nail.JP} > ${tm * 0.2}`);
			verification = false;
		}
		if (ligationType === 'corteSimples') {
			if (nail.LPP < esp1 + tp) {
				console.log(`caso 2 - ${nail.name} - ${nail.LPP} < ${esp1 + tp}`);
				verification = false;
			} else if (nail.LPP > esp1 + esp2) {
				console.log(`caso 3 - ${nail.name} - ${nail.LPP} > ${esp1 + esp2}`);
				verification = false;
			}
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

import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import ThroughScrewsDimensions from '../../archive/PinsDimensions/ThroughScrews.json';
import { IThroughScrew } from '../../interfaces/ThroughScrew';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
	ligationType: string;
}

export function SelectionParPassante({
	setData,
	esp1,
	esp2,
	ligationType,
}: IProps) {
	const aux = ThroughScrewsDimensions.filter((screw: IThroughScrew) => {
		let verification = true;

		if (screw.diametro > Math.min(esp1, esp2) * 0.5) {
			verification = false;
		}
		if (ligationType === 'corteSimples') {
			if (screw.comp < esp1 + esp2 + screw.altura) {
				verification = false;
			}
			if (screw.comp > esp1 + esp2 + screw.altura - screw.roscaComp) {
				verification = false;
			}
		} else {
			if (screw.comp < esp1 * 2 + esp2 + screw.altura) verification = false;
			if (screw.comp > esp1 * 2 + esp2 + screw.altura - screw.roscaComp)
				verification = false;
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

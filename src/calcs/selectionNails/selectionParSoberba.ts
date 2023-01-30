import { Dispatch, SetStateAction } from 'react';
import { ISelect } from '../../components/global/fields/fieldSelect';
import SuperbScrewsDimensions from '../../archive/PinsDimensions/SuperbScrews.json';
import { ISuperbScrew } from '../../interfaces/SuperbScrew';

interface IProps {
	setData: Dispatch<SetStateAction<ISelect[]>>;
	esp1: number;
	esp2: number;
}

export function SelectionParSoberba({ setData, esp1, esp2 }: IProps) {
	const aux = SuperbScrewsDimensions.filter((screw: ISuperbScrew) => {
		const tp = Math.max(6 * screw.diametro, Math.min(esp1, esp2));

		if (screw.diametro > Math.min(esp1, esp2) * 0.2) {
			console.log(
				`Falha 1: ${screw.id} => ${screw.diametro} > ${Math.min(esp1, esp2) * 0.2
				}`,
			);
			return false;
		}
		if (screw.comprimento < esp1 + tp) {
			console.log(
				`Falha 2: ${screw.id} => ${screw.comprimento} < ${esp1 + tp}`,
			);
			return false;
		}
		if (screw.comprimento > esp1 * 2 + esp2) {
			console.log(
				`Falha 3: ${screw.id} => ${screw.comprimento} > ${esp1 * 2 + esp2
				}`,
			);
			return false;
		}

		return true;
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

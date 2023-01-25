import { useContext } from 'react';
import DataContext from '../../../context/context';
import { NailDimensions } from '../../../archive/PinsDimensions/Nails';

export default function calcRvd1(
	B: number,
	Blim: number,
	fc0d: number,
	heightWood_1: string,
	nailDimension: string,
	fyk_nail: string,
) {
	let Rvd1: number = 0;

	if (B <= Blim) {
		Rvd1 = (0.4 * (Math.pow(Number(heightWood_1), 2) / B) * fc0d) / 1000;
	} else {
		const nail = NailDimensions.find(item => item.id === nailDimension);

		Rvd1 =
			(0.625 * (Math.pow(nail.JP, 2) / Blim) * (Number(fyk_nail) / 1.1)) /
			1000;
	}

	return Rvd1;
}

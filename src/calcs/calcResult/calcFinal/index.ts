import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';
import CalcMaxForce from './maxForce';
import CalcPinQtde from './pinQtde';

interface IProps {
	FvRk: number;
	tractiveForce?: number;
	numberPins?: number;
	ligationType: string;
	calc: string;
	kmod: number;
	widthWood: number;
	pinType: string;
	pinSelected: string;
}

export default function CalcFinal({
	FvRk,
	ligationType,
	numberPins,
	tractiveForce,
	calc,
	kmod,
	widthWood,
	pinType,
	pinSelected
}: IProps) {
	// Cálculo do diametro do pino metalico
	let d: number;

	switch (pinType) {
		case 'prego':
			d = NailsDimensions.find((item: INail) => item.id === pinSelected).JP;

			break;
		case 'parafusoSoberba':
			d = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === pinSelected,
			).diametro;

			break;
		case 'parafusoPassante':
			d = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			).diametro;

			break;
	}

	let Rd: number;
	let nPins: number;

	if (calc === 'nailQtde') {
		// Cálculo da quantidade de pinos necessários
		const result = CalcPinQtde({
			d,
			FvRk,
			kmod,
			ligationType,
			tractiveForce,
			pinType,
			widthWood
		});
		Rd = result.Rd;
		nPins = result.nPins;
	} else {
		// Cálculo da força máxima a ser aplicada
		const result = CalcMaxForce({
			d,
			FvRk,
			kmod,
			ligationType,
			numberPins,
			pinType,
			widthWood
		});
		Rd = result.Rd;
		nPins = numberPins;
	}

	return { Rd, nPins };
}

import ThroughScrewsDimensions from '../../../archive/PinsDimensions/ThroughScrews.json';
import SuperbScrewsDimensions from '../../../archive/PinsDimensions/SuperbScrews.json';
import NailsDimensions from '../../../archive/PinsDimensions/Nails.json';
import CalcFk1_Double from './double/calcFk1';
import CalcFk2_Double from './double/calcFk2';
import CalcFk3_Double from './double/calcFk3';
import CalcFk4_Double from './double/calcFk4';
import CalcFk1_Simple from './simple/calcFk1';
import CalcFk2_Simple from './simple/calcFk2';
import CalcFk3_Simple from './simple/calcFk3';
import CalcFk4_Simple from './simple/calcFk4';
import CalcFk5_Simple from './simple/calcFk5';
import CalcFk6_Simple from './simple/calcFk6';
import { INail } from '../../../interfaces/Nail';
import { ISuperbScrew } from '../../../interfaces/SuperbScrew';
import { IThroughScrew } from '../../../interfaces/ThroughScrew';
import { database } from '../../../database';
import { NailModel } from '../../../database/models/nailModel';
import { SuperbScrewModel } from '../../../database/models/superbScrewModel';
import { ThroughScrewModel } from '../../../database/models/throughScrewModel';

interface IProps {
	pinType: string;
	pinSelected: string;
	fek: number;
	B: number;
	t1: number;
	t2: number;
	MyRk: number;
	ligationType: string;
}

export default async function CalcResistence({
	B,
	MyRk,
	pinType,
	pinSelected,
	fek,
	t1,
	t2,
	ligationType,
}: IProps) {
	let d: number;

	// Determinação do diametro do pino metálico
	switch (pinType) {
		case 'prego':
			d = NailsDimensions.find((item: INail) => item.id === pinSelected)?.JP;

			if (!d)
				d = (await database.get<NailModel>('nails').find(pinSelected))?.JP;

			break;
		case 'parafusoSoberba':
			d = SuperbScrewsDimensions.find(
				(item: ISuperbScrew) => item.id === pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<SuperbScrewModel>('superbScrews').find(pinSelected))?.diametro;

			break;
		case 'parafusoPassante':
			d = ThroughScrewsDimensions.find(
				(item: IThroughScrew) => item.id === pinSelected,
			)?.diametro;

			if (!d)
				d = (await database.get<ThroughScrewModel>('throughScrews').find(pinSelected))?.diametro;

			break;
	}

	let FvRk1: number;
	let FvRk2: number;
	let FvRk3: number;
	let FvRk4: number;
	let FvRk5: number;
	let FvRk6: number;
	let FvRk: number;

	// Cálculo para caso de corte simples
	if (ligationType === 'corteSimples') {
		FvRk1 = CalcFk1_Simple(fek, t1, d);
		FvRk2 = CalcFk2_Simple(fek, t2, d, B);
		FvRk3 = CalcFk3_Simple(fek, t1, t2, d, B);
		FvRk4 = CalcFk4_Simple(fek, t1, d, B, MyRk);
		FvRk5 = CalcFk5_Simple(fek, t2, d, B, MyRk);
		FvRk6 = CalcFk6_Simple(fek, d, B, MyRk);
		FvRk = Math.min(FvRk1, FvRk2, FvRk3, FvRk4, FvRk5, FvRk6);
	} else {
		// Cálculo para caso de corte duplo
		FvRk1 = CalcFk1_Double(fek, t1, d);
		FvRk2 = CalcFk2_Double(fek, t2, d, B);
		FvRk3 = CalcFk3_Double(fek, t1, d, B, MyRk);
		FvRk4 = CalcFk4_Double(fek, d, B, MyRk);
		FvRk = Math.min(FvRk1, FvRk2, FvRk3, FvRk4);
	}

	return {
		FvRk1,
		FvRk2,
		FvRk3,
		FvRk4,
		FvRk5,
		FvRk6,
		FvRk,
	};
}

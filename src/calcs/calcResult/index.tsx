import { database } from '../../database';
import CalcKmod from './calcKmod/Kmod';
import { CalcModel } from '../../database/models/calcModel';
import { CalcMyRk } from './calcMyRk/calcMyRk';
import CalcFek from './calcFek/calcFek';
import CalcResistence from './calcResistence';
import CalcFinal from './calcFinal';

export interface IResult {
	kmod: number;
	MyRk: number;
	fek: number;
	FvRk: number;
	FvRk1: number;
	FvRk2: number;
	FvRk3: number;
	FvRk4: number;
	FvRk5: number;
	FvRk6: number;
	Rd: number;
	nNails: number;
	// fc0d: number,
	// ft0d: number,
	// B: number,
	// Blim: number,
	// Rvd1: number,
	// nNails: number
}

export default async function CalcResult(id: string): Promise<IResult> {
	const dados = await database.get<CalcModel>('calcs').find(id);
	const {
		charging,
		humidityClass,
		nailDimension,
		tractiveForce,
		woodType,
		woodName,
		espWood_1,
		espWood_2,
		ligationType,
		nailType,
		widthWood,
		numberNails,
		calc,
	} = dados;

	//Calculo do Kmod
	const kmod = CalcKmod(charging, humidityClass, woodType);

	//Calculo do momento resistente do pino metálico
	const MyRk = CalcMyRk(nailType, nailDimension);

	//Calculo da resistencia ao embutimento da madeira
	const fek = CalcFek(nailType, woodName, nailDimension);

	//Calculo B
	const B = 1;

	//Calculo resistencia caracteristica do pino
	const { FvRk, FvRk1, FvRk2, FvRk3, FvRk4, FvRk5, FvRk6 } = CalcResistence({
		ligationType,
		nailType,
		nailDimension,
		B,
		fek,
		MyRk,
		t1: espWood_1,
		t2: espWood_2,
	});

	// Calculo da resistência da ligação e número de pinos
	const { Rd, nNails } = CalcFinal({
		FvRk,
		ligationType,
		numberNails,
		tractiveForce,
		calc,
		kmod,
	});

	return {
		kmod,
		MyRk,
		fek,
		FvRk,
		FvRk1,
		FvRk2,
		FvRk3,
		FvRk4,
		FvRk5,
		FvRk6,
		Rd,
		nNails,
	};
}

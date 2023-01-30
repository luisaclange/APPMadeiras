import { database } from '../../database';
import CalcKmod from './calcKmod/Kmod';
import { CalcModel } from '../../database/models/calcModel';
import { CalcMyRk } from './calcMyRk/calcMyRk';
import CalcFek from './calcFek/calcFek';
import CalcResistence from './calcResistence';
import CalcFinal from './calcFinal';

export interface IResult {
	kmod: number;
	kmod1: number;
	kmod2: number;
	MyRk: number;
	fuk: number;
	fek: number;
	density: number;
	pk: number;
	FvRk: number;
	FvRk1: number;
	FvRk2: number;
	FvRk3: number;
	FvRk4: number;
	FvRk5: number;
	FvRk6: number;
	Rd: number;
	nPins: number;
}

export default async function CalcResult(id: string): Promise<IResult> {
	const dados = await database.get<CalcModel>('calcs').find(id);
	const {
		charging,
		humidityClass,
		pinSelected,
		tractiveForce,
		woodType,
		woodName,
		espWood_1,
		espWood_2,
		ligationType,
		pinType,
		numberPins,
		calc,
		widthWood
	} = dados;

	//Calculo do Kmod
	const { kmod, kmod1, kmod2 } = CalcKmod(charging, humidityClass, woodType);

	//Calculo do momento resistente do pino metálico
	const { MyRk, fuk } = CalcMyRk(pinType, pinSelected);

	//Calculo da resistencia ao embutimento da madeira
	const { density, fek, pk } = CalcFek(pinType, woodName, pinSelected);

	//Calculo B
	const B = 1;

	//Calculo resistencia caracteristica do pino
	const { FvRk, FvRk1, FvRk2, FvRk3, FvRk4, FvRk5, FvRk6 } = CalcResistence({
		ligationType,
		pinType,
		pinSelected,
		B,
		fek,
		MyRk,
		t1: espWood_1,
		t2: espWood_2,
	});

	// Calculo da resistência da ligação e número de pinos
	const { Rd, nPins } = CalcFinal({
		FvRk,
		ligationType,
		numberPins,
		tractiveForce,
		calc,
		kmod,
		widthWood,
		pinType,
		pinSelected
	});

	return {
		kmod,
		kmod1,
		kmod2,
		MyRk,
		fuk,
		fek,
		density,
		pk,
		FvRk,
		FvRk1,
		FvRk2,
		FvRk3,
		FvRk4,
		FvRk5,
		FvRk6,
		Rd,
		nPins,
	};
}

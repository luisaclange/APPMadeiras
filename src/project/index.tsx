import { database } from "../database";
import calcB from "./calcB/calcB";
import calcRvd1 from "./calcRvd1/calcRvd1";
import calc_nNails from "./nNails/nNails";
import CalcKmod from "./woodProperties/Kmod/Kmod";
import CalcFc0d from "./woodProperties/Resistencias/fc0d";
import CalcFt0d from "./woodProperties/Resistencias/ft0d";
import { CalcModel } from "../database/models/calcModel";
import { CalcMyRk } from "./calcMyRk/calcMyRk";
import CalcFek from "./calcFek/calcFek";
import CalcResistence from "./calcResistence";
import { NailDimensions } from "../archive/2_Dimensions/Pregos";

export default async function CalcWoodDimension(id: string): Promise<{
    kmod: number,
    MyRk: number,
    fek: number,
    Rk: number,
    // fc0d: number,
    // ft0d: number,
    // B: number,
    // Blim: number,
    // Rvd1: number,
    // nNails: number
}> {

    const dados = await database.get<CalcModel>('calcs').find(id);
    const {
        charging,
        heightWood_1,
        heightWood_2,
        humidityClass,
        nailDimension,
        tractiveForce,
        woodType,
        woodName,
    } = dados;

    const d = NailDimensions.find(item => item.id === nailDimension).JP;

    //Calculo do Kmod
    const kmod = CalcKmod(charging, humidityClass, woodType);
    console.log('Passo 1: OK');

    //Calculo do momento resistente do pino metálico
    const MyRk = CalcMyRk(nailDimension);

    //Calculo da resistencia ao embutimento da madeira
    const fek = CalcFek(woodName, nailDimension);

    //Calculo B
    const B = 1;

    //Calculo resistencia caracteristica
    const Rk = CalcResistence({
        B,
        d,
        fe1k: fek,
        fe2k: fek,
        MyRk,
        t1: Number(heightWood_1),
        t2: Number(heightWood_2),
    })

    // //Calculo das resistencias
    // const fc0d = CalcFc0d(kmod, woodClass, woodResistanceClass);
    // console.log('Passo 2: OK');
    // const ft0d = CalcFt0d(kmod, woodClass, woodResistanceClass);
    // console.log('Passo 3: OK');

    // //Calculo do B e Blim
    // const B = calcB(nailDimension, heightWood_1);
    // console.log('Passo 4: OK');
    // const Blim = calcBlim(fc0d, fyk_nail);
    // console.log('Passo 5: OK');

    // //Calculo do Rvd1
    // const Rvd1 = calcRvd1(B, Blim, fc0d, heightWood_1, nailDimension, fyk_nail);
    // console.log('Passo 6: OK');

    // //Calculo nº de pregos
    // const nNails = calc_nNails(Rvd1, tractiveForce);
    // console.log('Passo 7: OK');

    return {
        kmod,
        MyRk,
        fek,
        Rk,
        // fc0d: fc0d,
        // ft0d: ft0d,
        // B: B,
        // Blim: Blim,
        // Rvd1: Rvd1,
        // nNails: nNails
    };
}

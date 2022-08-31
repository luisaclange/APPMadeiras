import { database } from "../database";
import calcB from "./calcB/calcB";
import calcBlim from "./calcB/calcBlim";
import calcRvd1 from "./calcRvd1/calcRvd1";
import calc_nNails from "./nNails/nNails";
import CalcKmod from "./woodProperties/Kmod/Kmod";
import CalcFc0d from "./woodProperties/Resistencias/fc0d";
import CalcFt0d from "./woodProperties/Resistencias/ft0d";
import { CalcModel } from "../database/models/calcModel";

export default async function CalcWoodDimension(id: string): Promise<{
    kmod: number,
    fc0d: number,
    ft0d: number,
    B: number,
    Blim: number,
    Rvd1: number,
    nNails: number
}> {

    const dados = await database.get<CalcModel>('calcs').find(id);
    const {
        charging,
        fyk_nail,
        heightWood_1,
        humidityClass,
        nailDimension,
        tractiveForce,
        woodClass,
        woodResistanceClass,
        woodType,
        dicotyledonClass
    } = dados;

    //Calculo do Kmod
    const kmod = CalcKmod(charging, humidityClass, woodClass, woodType, dicotyledonClass);
    console.log('Passo 1: OK');

    //Calculo das resistencias
    const fc0d = CalcFc0d(kmod, woodClass, woodResistanceClass);
    console.log('Passo 2: OK');
    const ft0d = CalcFt0d(kmod, woodClass, woodResistanceClass);
    console.log('Passo 3: OK');

    //Calculo do B e Blim
    const B = calcB(nailDimension, heightWood_1);
    console.log('Passo 4: OK');
    const Blim = calcBlim(fc0d, fyk_nail);
    console.log('Passo 5: OK');

    //Calculo do Rvd1
    const Rvd1 = calcRvd1(B, Blim, fc0d, heightWood_1, nailDimension, fyk_nail);
    console.log('Passo 6: OK');

    //Calculo nº de pregos
    const nNails = calc_nNails(Rvd1, tractiveForce);
    console.log('Passo 7: OK');

    return {
        kmod: kmod,
        fc0d: fc0d,
        ft0d: ft0d,
        B: B,
        Blim: Blim,
        Rvd1: Rvd1,
        nNails: nNails
    };
}

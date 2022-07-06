import calcB from "./calcB/calcB";
import calcBlim from "./calcB/calcBlim";
import calcRvd1 from "./calcRvd1/calcRvd1";
import calc_nNails from "./nNails/nNails";
import CalcKmod from "./woodProperties/Kmod/Kmod";
import CalcFc0d from "./woodProperties/Resistencias/fc0d";
import CalcFt0d from "./woodProperties/Resistencias/ft0d";

export default function CalcWoodDimension() {

    //const dados = useContext(DadosContext)

    //Calculo do Kmod
    const kmod = CalcKmod();

    //Calculo das resistencias
    const fc0d = CalcFc0d(kmod);
    const ft0d = CalcFt0d(kmod);

    //Calculo do B e Blim
    const B = calcB();
    const Blim = calcBlim(fc0d);

    //Calculo do Rvd1
    const Rvd1 = calcRvd1(B, Blim, fc0d);

    //Calculo nº de pregos
    const nNails = calc_nNails(Rvd1);

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

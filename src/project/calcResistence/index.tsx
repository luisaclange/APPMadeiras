import CalcFk1 from "./calc1";
import CalcFk2 from "./calc2";

interface props {
    fe1k: number;
    fe2k: number;
    d: number;
    B: number;
    t1: number;
    t2: number;
    MyRk: number;
}

export default function CalcResistence({ B, MyRk, d, fe1k, fe2k, t1, t2 }: props) {

    const Rk1 = CalcFk1(fe1k, t1, d);

    const Rk2 = CalcFk2(fe1k, t2, d, B);

    const Rk = Math.min(Rk1, Rk2);

    return (Rk);
}

import CalcKmod1 from "./Kmod1";
import CalcKmod2 from "./Kmod2";
import CalcKmod3 from "./Kmod3";

export default function CalcKmod() {

    const kmod1 = CalcKmod1();

    const kmod2 = CalcKmod2();

    const kmod3 = CalcKmod3();

    const kmod = kmod1 * kmod2 * (kmod3 === null ? 1 : kmod3);

    return kmod;
}

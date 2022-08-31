import CalcKmod1 from "./Kmod1";
import CalcKmod2 from "./Kmod2";
import CalcKmod3 from "./Kmod3";

export default function CalcKmod(charging: string, humidityClass: string, woodClass: string, woodType: string, dicotyledonClass: string) {

    const kmod1 = CalcKmod1(charging, woodType);

    const kmod2 = CalcKmod2(humidityClass, woodType);

    const kmod3 = CalcKmod3(woodClass, dicotyledonClass, woodType);

    const kmod = kmod1 * kmod2 * (kmod3 === null ? 1 : kmod3);

    return kmod;
}

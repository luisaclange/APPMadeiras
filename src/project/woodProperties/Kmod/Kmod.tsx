import CalcKmod1 from "./Kmod1";
import CalcKmod2 from "./Kmod2";
import CalcKmod3 from "./Kmod3";

export default function CalcKmod(charging: string, humidityClass: string, woodType: string) {

    const kmod1 = CalcKmod1(charging, woodType === "Madeira Recomposta" ? "madeiraRecomposta" : "madeiraSerrada");

    const kmod2 = CalcKmod2(humidityClass, woodType === "Madeira Recomposta" ? "madeiraRecomposta" : "madeiraSerrada");

    const kmod = kmod1 * kmod2;

    return kmod;
}

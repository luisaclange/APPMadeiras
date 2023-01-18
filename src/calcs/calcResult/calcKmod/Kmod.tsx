import CalcKmod1 from "./Kmod1";
import CalcKmod2 from "./Kmod2";

export default function CalcKmod(charging: string, humidityClass: string, woodType: string) {

  const kmod1 = CalcKmod1(charging, woodType === "madeiraSerrada" ? "madeiraSerrada" : "madeiraRecomposta");

  const kmod2 = CalcKmod2(humidityClass, woodType === "madeiraSerrada" ? "madeiraSerrada" : "madeiraRecomposta");

  const kmod = kmod1 * kmod2;

  return kmod;
}

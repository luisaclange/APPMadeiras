import { WoodResistanceClasses } from "../../../archive/1_ClassesResistencia/ClassesResistencia";

export default function CalcFc0d(kmod: number, woodClass: string, woodResistanceClass: string) {

    const fc0k = WoodResistanceClasses.find((item) => {
        return (
            item.name === woodClass
        )
    }).object.find((item) => {
        return (
            item.id === woodResistanceClass
        )
    }).fc0k

    const fc0d = (kmod * fc0k) / 1.4;

    return fc0d;

}

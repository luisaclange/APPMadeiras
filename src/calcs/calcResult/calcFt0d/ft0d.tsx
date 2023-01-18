import { WoodResistanceClasses } from "../../../archive/1_ClassesResistencia/ClassesResistencia";

export default function CalcFt0d(kmod: number, woodClass: string, woodResistanceClass: string) {

    const fc0k = WoodResistanceClasses.find((item) => {
        return (
            item.name === woodClass
        )
    }).object.find((item) => {
        return (
            item.id === woodResistanceClass
        )
    }).fc0k

    const ft0d = (kmod * (fc0k / 0.77)) / 1.8;

    return ft0d;

}

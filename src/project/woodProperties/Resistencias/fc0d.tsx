import { useContext } from "react";
import DataContext from "../../../context/context";
import { WoodResistanceClasses } from "../../../Data/1_ClassesResistencia/ClassesResistencia";

export default function CalcFc0d(kmod: number) {

    const { stage3, stage2 } = useContext(DataContext);

    const fc0k = WoodResistanceClasses.find((item) => {
        return (
            item.name === stage2.woodClass
        )
    }).object.find((item) => {
        return (
            item.id === stage3.woodResistanceClass
        )
    }).fc0k

    const fc0d = (kmod * fc0k) / 1.4;

    return fc0d;

}

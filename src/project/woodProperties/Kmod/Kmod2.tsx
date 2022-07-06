import { useContext } from "react";
import DataContext from "../../../context/context";
import { Kmod } from "../../../Data/WoodProperties/Kmod";

export default function CalcKmod2() {

    const { stage1, stage2 } = useContext(DataContext);

    return (
        Kmod.kmod2
            .find((item) => {
                return (
                    stage1.humidityClass === item.id
                )
            })
            .type.find((item) => {
                return (
                    stage2.woodType === item.name
                )
            }).value)
}

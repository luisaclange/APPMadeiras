import { useContext } from "react";
import DataContext from "../../../context/context";
import { Kmod } from "../../../Data/WoodProperties/Kmod";

export default function CalcKmod1() {

    const { stage1, stage2 } = useContext(DataContext);

    return (
        Kmod.kmod1
            .find((item) => {
                return (
                    stage1.charging === item.id
                )
            })
            .type.find((item) => {
                return (
                    stage2.woodType === item.name
                )
            }).value)
}

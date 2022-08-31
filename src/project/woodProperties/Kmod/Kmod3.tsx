import { useContext } from "react";
import DataContext from "../../../context/context";
import { Kmod } from "../../../archive/WoodProperties/Kmod";

export default function CalcKmod3(woodClass: string, dicotyledonClass: string, woodType: string) {

    if (woodClass === 'Kmod3_Dicotiledonia' && woodType === 'madeiraSerrada') {
        return (Kmod.kmod3[1].type[0].value.find((item) => {
            return (
                dicotyledonClass === item.id
            )
        }).value)
    } else {

        return (Kmod.kmod3
            .find((item) => {
                return (
                    woodClass === item.id
                )
            })
            //@ts-ignore
            .type.find((item) => {
                return (
                    woodType === item.name
                )
            }).value)
    }
}

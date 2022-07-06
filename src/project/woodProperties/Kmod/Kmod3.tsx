import { useContext } from "react";
import DataContext from "../../../context/context";
import { Kmod } from "../../../Data/WoodProperties/Kmod";

export default function CalcKmod3() {

    const { stage2 } = useContext(DataContext);

    if (stage2.woodClass === 'Kmod3_Dicotiledonia' && stage2.woodType === 'madeiraSerrada') {
        console.log('ENTROU')
        return (Kmod.kmod3[1].type[0].value.find((item) => {
            return (
                stage2.dicotyledonClass === item.id
            )
        }).value)
    } else {

        return (Kmod.kmod3
            .find((item) => {
                return (
                    stage2.woodClass === item.id
                )
            })
            //@ts-ignore
            .type.find((item) => {
                return (
                    stage2.woodType === item.name
                )
            }).value)
    }
}

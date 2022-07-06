import { useContext } from "react";
import DataContext from "../../context/context";
import { NailDimensions } from "../../Data/2_Dimensions/Pregos";

export default function calcRvd1(B: number, Blim: number, fc0d: number) {

    const { stage4, stage3 } = useContext(DataContext);

    let Rvd1: number = 0;

    if (B <= Blim) {

        Rvd1 = (0.4 * (Math.pow(Number(stage4.heightWood_1), 2) / B) * fc0d) / 1000;

    } else {

        const nail = NailDimensions.find((item: any) => {
            return (
                item.id === stage4.nailDimension
            )
        })

        Rvd1 = (0.625 * (Math.pow(nail.JP, 2) / Blim) * (Number(stage3.fyk_nail) / 1.1)) / 1000;
    }

    return Rvd1;

}

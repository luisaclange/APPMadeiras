import { useContext } from "react";
import DataContext from "../../context/context";
import { NailDimensions } from "../../Data/2_Dimensions/Pregos";

export default function calcB() {

    const { stage4 } = useContext(DataContext);

    const nail = NailDimensions.find((item) => {
        return (
            item.id === stage4.nailDimension
        )
    })

    const B = Number(stage4.heightWood_1) / nail.JP;

    return B;

}


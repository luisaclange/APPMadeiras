import { NailDimensions } from "../../archive/2_Dimensions/Pregos";

export default function calcB(nailDimension: string, heightWood_1: string) {

    const nail = NailDimensions.find(item => item.id === nailDimension)

    const B = Number(heightWood_1) / nail.JP;

    return B;

}


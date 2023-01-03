import { WoodResistanceClasses } from "../../archive/1_ClassesResistencia/ClassesResistencia";
import { NailDimensions } from "../../archive/2_Dimensions/Pregos";
import { NativeWoods } from "../../archive/3_NativeWood/NativeWood";

export default function CalcFek(woodName: number, nailDimension: string) {
    const nail = NailDimensions.find(item => item.id === nailDimension).JP;

    const classResistence = NativeWoods.find(item => item.id === woodName).class;

    const density = WoodResistanceClasses.find(item => item.class === classResistence).density;

    const pk = density / 1.2;

    let fek: number;

    if (nail < 8) {

        const k90 = 0.9 + 0.015 * nail;

        const fe0k = 0.082 * (1 - 0.01 * nail) * pk;

        fek = fe0k / (k90 * 0 + 1);
    } else {
        fek = 0.082 * (1 - 0.01 * nail) * pk;
    }

    return fek;
}

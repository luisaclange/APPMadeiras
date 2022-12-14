import { NailDimensions } from "../../archive/2_Dimensions/Pregos";

export function CalcMyRk(id_nail: string) {
    const nail = NailDimensions.find(item => item.id === id_nail);

    let fuk: number;
    if (nail.JP >= 3 && nail.JP < 3.55) {
        fuk = 635;
    } else if (nail.JP >= 3.55 && nail.JP < 5) {
        fuk = 600;
    } else {
        fuk = 490;
    }

    const MyRk = 0.3 * fuk * Math.pow(nail.JP, 2.6);

    return MyRk;
}

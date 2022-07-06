import { useContext } from "react";
import DataContext from "../../context/context";

export default function calc_nNails(Rvd1: number) {

    const { stage3 } = useContext(DataContext);

    const nPregos = Math.ceil(Number(stage3.tractiveForce) / Rvd1);

    return nPregos;

}

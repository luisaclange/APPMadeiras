import { useContext } from "react";
import DataContext from "../../context/context";

export default function calcBlim(fc0d: number) {

    const { stage3 } = useContext(DataContext);

    const Blim = 1.25 * Math.sqrt((Number(stage3.fyk_nail) / 1.1) / fc0d);

    return Blim;

}


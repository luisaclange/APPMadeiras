import { Dispatch, SetStateAction } from "react";
import { ISelect } from "../../components/global/fields/fieldSelect";
import { ParafusoPassanteDimensions } from "../../archive/2_Dimensions/ParafusoPassante";

interface IProps {
  setData: Dispatch<SetStateAction<ISelect[]>>;
  esp1: number;
  esp2: number;
  ligationType: string;
}

export function SelectionParPassante({ setData, esp1, esp2, ligationType }: IProps) {
  const aux = ParafusoPassanteDimensions.filter(nail => {
    let verification = true;

    if (nail.diametro > Math.min(esp1, esp2) * 0.5) {
      console.log(`Falha 1: ${nail.id} => ${nail.diametro} > ${Math.min(esp1, esp2) * 0.5}`)
      verification = false
    }
    if (ligationType === "corteSimples") {
      if (nail.comp < esp1 + esp2 + nail.altura) {
        console.log(`Falha 2: ${nail.id} => ${nail.comp} < ${esp1 + esp2 + nail.altura}`)
        verification = false
      }
      if (nail.comp > (esp1 + esp2 + nail.altura) - nail.roscaComp) {
        console.log(`Falha 3: ${nail.id} => ${nail.comp} > ${(esp1 + esp2 + nail.altura) - nail.roscaComp}`)
        verification = false
      }
    } else {
      if (nail.comp < esp1 * 2 + esp2 + nail.altura) verification = false
      if (nail.comp > (esp1 * 2 + esp2 + nail.altura) - nail.roscaComp) verification = false
    }

    return verification;
  });

  setData(aux.map(item => {
    return {
      id: item?.id,
      value: item?.name,
    }
  }))
}
import { Dispatch, SetStateAction } from "react";
import { ISelect } from "../../components/global/fields/fieldSelect";
import { ParafusoSoberbaDimensions } from "../../archive/2_Dimensions/ParafusoSoberba";

interface IProps {
  setData: Dispatch<SetStateAction<ISelect[]>>;
  esp1: number;
  esp2: number;
}

export function SelectionParSoberba({ setData, esp1, esp2 }: IProps) {
  const aux = ParafusoSoberbaDimensions.filter(nail => {
    const tp = Math.max(6 * nail.diametro, Math.min(esp1, esp2));

    if (nail.diametro > Math.min(esp1, esp2) * 0.2) {
      console.log(`Falha 1: ${nail.id} => ${nail.diametro} > ${Math.min(esp1, esp2) * 0.2}`)
      return false
    }
    if (nail.comprimento < esp1 + tp) {
      console.log(`Falha 2: ${nail.id} => ${nail.comprimento} < ${esp1 + tp}`)
      return false
    }
    if (nail.comprimento > esp1 * 2 + esp2) {
      console.log(`Falha 3: ${nail.id} => ${nail.comprimento} > ${esp1 * 2 + esp2}`)
      return false
    }

    return true;
  });

  setData(aux.map(item => {
    return {
      id: item?.id,
      value: item?.name,
    }
  }))
}
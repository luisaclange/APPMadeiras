import { Dispatch, SetStateAction } from "react";
import { ISelect } from "../../components/global/fields/fieldSelect";
import { PregoDimensions } from "../../archive/2_Dimensions/Pregos";

interface IProps {
  setData: Dispatch<SetStateAction<ISelect[]>>;
  esp1: number;
  esp2: number;
  ligationType: string;
}

export function SelectionPrego({ setData, esp1, esp2, ligationType }: IProps) {
  const aux = PregoDimensions.filter(nail => {
    const tp = Math.max(12 * nail.JP, Math.min(esp1, esp2));

    if (nail.JP > Math.min(esp1, esp2) * 0.2) {
      console.error(`Erro 1 ${nail.name}: `, nail.JP, '>', Math.min(esp1, esp2) * 0.2)
      return false
    }
    if (ligationType === "corteSimples") {
      if (nail.LPP < esp1 + tp) {
        console.error(`Erro 2 ${nail.name}: `, nail.LPP, '<', esp1 + tp)
        return false
      }
      if (nail.LPP > esp1 + esp2) {
        console.error(`Erro 3 ${nail.name}: `, nail.LPP, '>', esp1 + esp2)
        return false
      }
    } else {
      if (nail.LPP < esp1 + esp2 + tp) return false
      if (nail.LPP > esp1 * 2 + esp2) return false
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
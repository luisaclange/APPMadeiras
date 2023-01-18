import { ParafusoPassanteDimensions } from "../../../archive/2_Dimensions/ParafusoPassante";
import { ParafusoSoberbaDimensions } from "../../../archive/2_Dimensions/ParafusoSoberba";
import { PregoDimensions } from "../../../archive/2_Dimensions/Pregos";
import CalcFk1_Double from "./double/calcFk1";
import CalcFk2_Double from "./double/calcFk2";
import CalcFk3_Double from "./double/calcFk3";
import CalcFk4_Double from "./double/calcFk4";
import CalcFk1_Simple from "./simple/calcFk1";
import CalcFk2_Simple from "./simple/calcFk2";
import CalcFk3_Simple from "./simple/calcFk3";
import CalcFk4_Simple from "./simple/calcFk4";
import CalcFk5_Simple from "./simple/calcFk5";
import CalcFk6_Simple from "./simple/calcFk6";

interface IProps {
  nailType: string;
  nailDimension: string;
  fek: number;
  B: number;
  t1: number;
  t2: number;
  MyRk: number;
  ligationType: string;
}

export default function CalcResistence({ B, MyRk, nailType, nailDimension, fek, t1, t2, ligationType }: IProps) {
  let d: number;

  switch (nailType) {
    case 'prego':
      d = PregoDimensions.find(item => item.id === nailDimension).JP;

      break;
    case 'parafusoSoberba':
      d = ParafusoSoberbaDimensions.find(item => item.id === nailDimension).diametro;

      break;
    case 'parafusoPassante':
      d = ParafusoPassanteDimensions.find(item => item.id === nailDimension).diametro;

      break;
  }

  let FvRk1 = 0;
  let FvRk2 = 0;
  let FvRk3 = 0;
  let FvRk4 = 0;
  let FvRk5 = 0;
  let FvRk6 = 0;
  let FvRk = 0;

  if (ligationType === 'corteSimples') {
    FvRk1 = CalcFk1_Simple(fek, t1, d);
    FvRk2 = CalcFk2_Simple(fek, t2, d, B);
    FvRk3 = CalcFk3_Simple(fek, t1, t2, d, B);
    FvRk4 = CalcFk4_Simple(fek, t1, d, B, MyRk);
    FvRk5 = CalcFk5_Simple(fek, t2, d, B, MyRk);
    FvRk6 = CalcFk6_Simple(fek, d, B, MyRk);
    FvRk = Math.min(FvRk1, FvRk2, FvRk3, FvRk4, FvRk5, FvRk6);
  } else {
    FvRk1 = CalcFk1_Double(fek, t1, d);
    FvRk2 = CalcFk2_Double(fek, t2, d, B);
    FvRk3 = CalcFk3_Double(fek, t1, d, B, MyRk);
    FvRk3 = CalcFk4_Double(fek, d, B, MyRk);
    FvRk = Math.min(FvRk1, FvRk2, FvRk3, FvRk4);
  }

  return ({
    FvRk1,
    FvRk2,
    FvRk3,
    FvRk4,
    FvRk5,
    FvRk6,
    FvRk
  });
}

interface IProps {
  FvRk: number;
  tractiveForce?: number;
  numberNails?: number;
  ligationType: string;
  calc: string;
  kmod: number;
}

export default function CalcFinal({ FvRk, ligationType, numberNails, tractiveForce, calc, kmod }: IProps) {
  let Rd: number;
  let nNails: number;

  console.log({ FvRk, ligationType, numberNails, tractiveForce, calc, kmod })

  if (calc === "nailQtde") {
    let Rk = 1.4 * tractiveForce / kmod;
    nNails = Math.ceil(Rk / (FvRk * (ligationType === 'corteSimples' ? 1 : 2)))
    Rd = FvRk * (ligationType === 'corteSimples' ? 1 : 2) * nNails * kmod / 1.4;
  } else {
    nNails = numberNails
    let Rk = FvRk * nNails * (ligationType === 'corteSimples' ? 1 : 2);
    Rd = Rk * kmod / 1.4
  }

  return { Rd, nNails }
}

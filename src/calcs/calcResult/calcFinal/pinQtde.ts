interface IProps {
	tractiveForce: number;
	ligationType: string;
	kmod: number;
	pinType: string;
	d: number;
	FvRk: number;
	widthWood: number;
}

export default function CalcPinQtde({ tractiveForce, ligationType, d, kmod, pinType, FvRk, widthWood }: IProps) {
	// Cálculo do número de cortes
	let nCuts: number;
	if (ligationType === 'corteSimples') nCuts = 1;
	else {
		if (pinType === 'parafusoSoberba') nCuts = 1;
		else nCuts = 2;
	}

	// Cálculo da resistência característica
	const Rk = (1.4 * tractiveForce) / kmod;

	// Cálculo do número de pinos
	let nPins = Math.ceil(
		Rk / (FvRk * nCuts),
	);
	if (nPins <= 1) nPins = 2;

	// Verificação do número de colunas
	let pinsPerColumn: number; // Pinos por coluna
	if (pinType === 'prego')
		pinsPerColumn = Math.floor((widthWood - 6 * d) / (3 * d)) + 1;
	else
		pinsPerColumn = Math.floor((widthWood - 6 * d) / (4 * d)) + 1;
	const numberColumns = Math.ceil(nPins / pinsPerColumn); // Número de colunas
	if (numberColumns > 8) {
		const nPinsNormal = 8 * pinsPerColumn;
		const nPinsReduce = Math.ceil(
			(Rk / (FvRk * nCuts) - nPinsNormal) * (3 / 2),
		);
		nPins = nPinsNormal + nPinsReduce;
	}

	// Cálculo da força total resistida
	const Rd = (FvRk * nCuts * nPins * kmod) / 1.4;

	return { nPins, Rd };
}
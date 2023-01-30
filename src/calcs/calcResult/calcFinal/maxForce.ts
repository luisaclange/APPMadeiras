interface IProps {
	numberPins: number;
	ligationType: string;
	kmod: number;
	pinType: string;
	d: number;
	FvRk: number;
	widthWood: number;
}

export default function CalcMaxForce({ numberPins, ligationType, d, kmod, pinType, FvRk, widthWood }: IProps) {
	// Cálculo do número de cortes
	let nCuts: number;
	if (ligationType === 'corteSimples') nCuts = 1;
	else {
		if (pinType === 'parafusoSoberba') nCuts = 1;
		else nCuts = 2;
	}

	// Verificação do número de colunas
	let pinsPerColumn: number; // Pinos por coluna]
	let nPins = numberPins;
	if (pinType === 'prego')
		pinsPerColumn = Math.floor((widthWood - 6 * d) / (3 * d)) + 1;
	else
		pinsPerColumn = Math.floor((widthWood - 6 * d) / (4 * d)) + 1;
	const numberColumns = Math.ceil(numberPins / pinsPerColumn); // Número de colunas
	if (numberColumns > 8) {
		const nPinsNormal = 8 * pinsPerColumn;
		const nPinsReduce = numberPins - nPinsNormal;
		nPins = nPinsNormal + nPinsReduce * (2 / 3);
	}

	// Cálculo da resistencia característica
	const Rk = FvRk * nPins * nCuts;

	// Cálculo da força total resistida
	const Rd = (Rk * kmod) / 1.4;

	return { Rd };
}
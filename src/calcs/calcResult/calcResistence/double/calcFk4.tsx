export default function CalcFk4_Double(
	fek: number,
	d: number,
	B: number,
	MyRk: number,
) {
	const aux1 = 1.15 * Math.sqrt((2 * B) / (1 + B));
	const aux2 = 2 * MyRk * fek * d;
	const Fk4 = aux1 * Math.sqrt(aux2);
	return Fk4 / 1000;
}

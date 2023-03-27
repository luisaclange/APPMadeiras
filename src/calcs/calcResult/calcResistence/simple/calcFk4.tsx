export default function CalcFk4_Simple(
	fek: number,
	t1: number,
	d: number,
	B: number,
	MyRk: number,
) {
	const aux1 = (1.05 * (fek * t1 * d)) / (2 + B);
	const aux2 =
		2 * B * (1 + B) +
		(4 * B * (2 + B) * MyRk) / (fek * d * Math.pow(t1, 2));
	const Fk4 = aux1 * (Math.sqrt(aux2) - B);
	return Fk4 / 1000;
}

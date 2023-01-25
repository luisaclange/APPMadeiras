export default function CalcFk3_Simple(
	fek: number,
	t1: number,
	t2: number,
	d: number,
	B: number,
) {
	const aux1 = (fek * t1 * d) / (1 + B);
	const aux2 =
		B +
		2 * Math.pow(B, 2) * (1 + t2 / t1 + Math.pow(t2 / t1, 2)) +
		Math.pow(B, 3) * Math.pow(t2 / t1, 2);
	const aux3 = B * (1 + t2 / t1);
	const Fk3 = aux1 * (Math.sqrt(aux2) - aux3);
	return Fk3 / 100;
}

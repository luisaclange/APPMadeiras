export default function CalcFk2_Double(
	fe1k: number,
	t2: number,
	d: number,
	B: number,
) {
	const Fk2 = 0.5 * fe1k * t2 * d * B;
	return Fk2;
}

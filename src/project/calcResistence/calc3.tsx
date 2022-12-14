export default function CalcFk3(fe1k: number, t1: number, t2: number, d: number, B: number) {
    const aux1 = (fe1k * t1 * d) / (1 + B);
    const Fk3 = fe1k * t2 * d * B;
    return (Fk3)
}

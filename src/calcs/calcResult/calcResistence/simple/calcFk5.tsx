export default function CalcFk5_Simple(fek: number, t2: number, d: number, B: number, MyRk: number) {
  const aux1 = 1.05 * (fek * t2 * d) / (1 + 2 * B);
  const aux2 = 2 * Math.pow(B, 2) * (1 + B) + (4 * B * (1 + 2 * B) * MyRk) / (fek * d * Math.pow(t2, 2));
  const Fk5 = aux1 * (Math.sqrt(aux2) - B);
  return (Fk5)
}

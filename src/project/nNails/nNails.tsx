export default function calc_nNails(Rvd1: number, tractiveForce: string) {

    const nPregos = Math.ceil(Number(tractiveForce) / Rvd1);

    return nPregos;

}

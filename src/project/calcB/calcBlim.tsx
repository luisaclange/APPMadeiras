export default function calcBlim(fc0d: number, fyk_nail: string) {

    const Blim = 1.25 * Math.sqrt((Number(fyk_nail) / 1.1) / fc0d);

    return Blim;

}


import CalcKmod1 from './Kmod1';
import CalcKmod2 from './Kmod2';

export default function CalcKmod(
	charging: string,
	humidityClass: string,
	woodType: string,
) {
	// Cálculo do Kmod1
	const kmod1 = CalcKmod1(
		charging,
		woodType === 'madeiraSerrada' ? 'madeiraSerrada' : 'madeiraRecomposta',
	);

	// Cálculo do Kmod2
	const kmod2 = CalcKmod2(
		humidityClass,
		woodType === 'madeiraSerrada' ? 'madeiraSerrada' : 'madeiraRecomposta',
	);

	// Obtenção do kmod
	const kmod = kmod1 * kmod2;

	return { kmod, kmod1, kmod2 };
}

import { ParafusoPassanteDimensions } from '../../../archive/2_Dimensions/ParafusoPassante';
import { ParafusoSoberbaDimensions } from '../../../archive/2_Dimensions/ParafusoSoberba';
import { PregoDimensions } from '../../../archive/2_Dimensions/Pregos';

interface IProps {
	FvRk: number;
	tractiveForce?: number;
	numberNails?: number;
	ligationType: string;
	calc: string;
	kmod: number;
	widthWood: number;
	nailType: string;
	nailDimension: string;
}

export default function CalcFinal({
	FvRk,
	ligationType,
	numberNails,
	tractiveForce,
	calc,
	kmod,
	widthWood,
	nailType,
	nailDimension
}: IProps) {
	let Rd: number;
	let nNails: number;

	let d: number;

	switch (nailType) {
		case 'prego':
			d = PregoDimensions.find(item => item.id === nailDimension).JP;

			break;
		case 'parafusoSoberba':
			d = ParafusoSoberbaDimensions.find(
				item => item.id === nailDimension,
			).diametro;

			break;
		case 'parafusoPassante':
			d = ParafusoPassanteDimensions.find(
				item => item.id === nailDimension,
			).diametro;

			break;
	}

	if (calc === 'nailQtde') {
		const Rk = (1.4 * tractiveForce) / kmod;
		nNails = Math.ceil(
			Rk / (FvRk * (ligationType === 'corteSimples' ? 1 : 2)),
		);
		Rd = (FvRk * (ligationType === 'corteSimples' ? 1 : 2) * nNails * kmod) / 1.4;

		if (nailType === 'prego') {
			const nailPerColumn = Math.floor((widthWood - 6 * d) / (3 * d)) + 1;
			const numberColumns = Math.ceil(nNails / nailPerColumn);
			if (numberColumns > 8) {
				const nNailsNormal = 8 * nailPerColumn;
				const nNailsReduzido = Math.ceil(
					(Rk / (FvRk * (ligationType === 'corteSimples' ? 1 : 2)) - nNailsNormal) * (3 / 2),
				);
				nNails = nNailsNormal + nNailsReduzido;
				Rd = (FvRk * (ligationType === 'corteSimples' ? 1 : 2) * nNails * kmod) / 1.4;
			}
		} else {
			const nailPerColumn = Math.floor((widthWood - 6 * d) / (4 * d)) + 1;
			const numberColumns = Math.ceil(nNails / nailPerColumn);
			if (numberColumns > 8) {
				const nNailsNormal = 8 * nailPerColumn;
				const nNailsReduzido = Math.ceil(
					(Rk / (FvRk * (ligationType === 'corteSimples' ? 1 : 2)) - nNailsNormal) * (3 / 2),
				);
				nNails = nNailsNormal + nNailsReduzido;
				Rd = (FvRk * (ligationType === 'corteSimples' ? 1 : 2) * nNails * kmod) / 1.4;
			}
		}
	} else {
		nNails = numberNails;
		const Rk = FvRk * nNails * (ligationType === 'corteSimples' ? 1 : 2);
		Rd = (Rk * kmod) / 1.4;
		if (nailType === 'prego') {
			const nailPerColumn = Math.floor((widthWood - 6 * d) / (3 * d)) + 1;
			const numberColumns = Math.ceil(nNails / nailPerColumn);
			if (numberColumns > 8) {
				const nNailsNormal = 8 * nailPerColumn;
				const nNailsReduzido = nNails - nNailsNormal;
				const Rk = FvRk * (nNailsNormal + (2 / 3) * nNailsReduzido) * (ligationType === 'corteSimples' ? 1 : 2);
				Rd = (Rk * kmod) / 1.4;
			}
		} else {
			const nailPerColumn = Math.floor((widthWood - 6 * d) / (4 * d)) + 1;
			const numberColumns = Math.ceil(nNails / nailPerColumn);
			if (numberColumns > 8) {
				const nNailsNormal = 8 * nailPerColumn;
				const nNailsReduzido = nNails - nNailsNormal;
				const Rk = FvRk * (nNailsNormal + (2 / 3) * nNailsReduzido) * (ligationType === 'corteSimples' ? 1 : 2);
				Rd = (Rk * kmod) / 1.4;
			}
		}
	}

	return { Rd, nNails };
}

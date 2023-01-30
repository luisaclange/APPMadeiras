import { Kmod } from '../../../archive/NBRTables/WoodProperties/Kmod';

export default function CalcKmod2(humidityClass: string, woodType: string) {
	return Kmod.kmod2
		// Buscando a classe de umidade
		.find(item => {
			return humidityClass === item.id;
		})
		// Buscando o tipo de madeira
		.type.find(item => {
			return woodType === item.name;
		}).value;
}

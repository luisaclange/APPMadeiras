import { Kmod } from '../../../archive/NBRTables/WoodProperties/Kmod';

export default function CalcKmod1(charging: string, woodType: string) {
	return Kmod.kmod1
		// Buscando a classe de carregamento
		.find(item => {
			return charging === item.id;
		})
		// Buscando o tipo de madeira
		.type.find(item => {
			return woodType === item.name;
		}).value;
}

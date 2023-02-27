import * as yup from 'yup';

export interface INewSuperbScrew {
	name: string;
	diametro: string;
	comprimento: string;
}

export const schemaNewSuperbScrew = yup.object({
	name: yup.string().required('Campo obrigatório'),
	diametro: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 9.5', 'Tem que ser maior que 9,5 mm', item => Number(item?.replace(',', '.')) > 9.5)
		.required('Campo obrigatório'),
	comprimento: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 0', 'Tem que ser maior que 0', item => Number(item?.replace(',', '.')) > 0)
		.required('Campo obrigatório'),
});

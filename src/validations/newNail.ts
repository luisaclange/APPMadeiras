import * as yup from 'yup';

export interface INewNail {
	name: string;
	JP: string;
	LPP: string;
}

export const schemaNewNail = yup.object({
	name: yup.string().required('Campo obrigatório'),
	JP: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 3', 'Tem que ser maior que 3 mm', item => Number(item?.replace(',', '.')) >= 3)
		.required('Campo obrigatório'),
	LPP: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 0', 'Tem que ser maior que 0', item => Number(item?.replace(',', '.')) > 0)
		.required('Campo obrigatório'),
});

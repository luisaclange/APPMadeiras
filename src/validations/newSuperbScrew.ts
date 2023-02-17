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
		.required('Campo obrigatório'),
	comprimento: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
});

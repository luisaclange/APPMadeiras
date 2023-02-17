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
		.required('Campo obrigatório'),
	LPP: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
});

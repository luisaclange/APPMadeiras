import * as yup from 'yup';

export interface INewThroughScrew {
	name: string;
	diametro: string;
	comprimento: string;
	roscaComp: string;
	altura: string;
}

export const schemaNewThroughScrew = yup.object({
	name: yup.string().required('Campo obrigatório'),
	diametro: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
	comprimento: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
	roscaComp: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
	altura: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.required('Campo obrigatório'),
});

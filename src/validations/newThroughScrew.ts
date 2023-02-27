import * as yup from 'yup';

export interface INewThroughScrew {
	name: string;
	diametro: string;
	comprimento: string;
	roscaComp: string;
	altura: string;
	steelType: string;
}

export const schemaNewThroughScrew = yup.object({
	name: yup.string().required('Campo obrigatório'),
	diametro: yup.string()
		.required('Campo obrigatório')
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 10', 'Tem que ser maior que 10 mm', item => Number(item?.replace(',', '.')) >= 10),
	comprimento: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 0', 'Tem que ser maior que 0', item => Number(item?.replace(',', '.')) > 0)
		.required('Campo obrigatório'),
	roscaComp: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 0', 'Tem que ser maior que 0', item => Number(item?.replace(',', '.')) > 0)
		.when('comprimento', (comprimento: string, schema: any) => {
			return schema.test({
				test: (roscaComp: string) => !!comprimento && Number(comprimento?.replace(',', '.')) >= Number(roscaComp?.replace(',', '.')),
				message: 'Esse campo deve ser menor ou igual ao comprimento do pino'
			});
		})
		.required('Campo obrigatório'),
	altura: yup.string()
		.matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
		.test('bigger than 0', 'Tem que ser maior que 0', item => Number(item?.replace(',', '.')) > 0)
		.required('Campo obrigatório'),
	steelType: yup.string().required('Campo obrigatório'),
});

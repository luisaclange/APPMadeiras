import * as yup from 'yup';

export const schemaNewCalc2 = yup.object({
	ligationType: yup.string().required('Campo obrigatório'),
	nailType: yup.string().required('Campo obrigatório'),
	calc: yup.string().required('Campo obrigatório'),
});

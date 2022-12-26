import * as yup from 'yup';

export const schemaNewCalc3 = yup.object().shape({
  widthWood: yup
    .string()
    .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
    .required('Campo obrigatório'),
  heightWood_1: yup
    .string()
    .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
    .required('Campo obrigatório'),
  heightWood_2: yup
    .string()
    .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
    .required('Campo obrigatório'),
  nailDimension: yup.string().required('Campo obrigatório'),
  tractiveForce: yup
    .string()
    .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
    .required('Campo obrigatório'),
});
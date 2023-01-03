import * as yup from 'yup';

export interface IFilter {
  description: string;
  charging: string;
  woodName: number;
  nailType: string;
  calc: string;
}

export const schemaFilter = yup.object({
  description: yup.string(),
  charging: yup.string(),
  woodName: yup.string(),
  nailType: yup.string(),
  calc: yup.string(),
});
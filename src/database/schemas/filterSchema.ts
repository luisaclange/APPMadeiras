import { tableSchema } from '@nozbe/watermelondb';

export const filterSchema = tableSchema({
  name: 'filter',
  columns: [
    {
      name: 'description',
      type: 'string'
    },
    {
      name: 'charging',
      type: 'string'
    },
    {
      name: 'humidityClass',
      type: 'string'
    },
    {
      name: 'woodName',
      type: 'number'
    },
    {
      name: 'woodType',
      type: 'string'
    },
    {
      name: 'tractiveForce',
      type: 'string'
    },
    {
      name: 'widthWood',
      type: 'string'
    },
    {
      name: 'heightWood_1',
      type: 'string'
    },
    {
      name: 'heightWood_2',
      type: 'string'
    },
    {
      name: 'nailDimension',
      type: 'string'
    },
    {
      name: 'created_at',
      type: 'number'
    },
    {
      name: 'visualized_at',
      type: 'number'
    },
    {
      name: 'updated_at',
      type: 'number'
    }
  ]
});

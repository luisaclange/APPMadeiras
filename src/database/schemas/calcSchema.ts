import { tableSchema } from '@nozbe/watermelondb';

export const calcSchema = tableSchema({
    name: 'calcs',
    columns: [
        {
            name: 'charging',
            type: 'string'
        },
        {
            name: 'humidityClass',
            type: 'string'
        },
        {
            name: 'woodType',
            type: 'string'
        },
        {
            name: 'woodClass',
            type: 'string'
        },
        {
            name: 'dicotyledonClass',
            type: 'string'
        },
        {
            name: 'tractiveForce',
            type: 'string'
        },
        {
            name: 'fyk_nail',
            type: 'string'
        },
        {
            name: 'woodResistanceClass',
            type: 'string'
        }
        ,
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

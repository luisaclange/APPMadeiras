import { tableSchema } from '@nozbe/watermelondb';

export const throughScrewsSchema = tableSchema({
	name: 'throughScrews',
	columns: [
		{
			name: 'name',
			type: 'string',
		},
		{
			name: 'diametro',
			type: 'number',
		},
		{
			name: 'comprimento',
			type: 'number',
		},
		{
			name: 'roscaComp',
			type: 'number',
		},
		{
			name: 'altura',
			type: 'number',
		},
		{
			name: 'steelType',
			type: 'string',
		},
	],
});

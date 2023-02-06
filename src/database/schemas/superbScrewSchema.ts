import { tableSchema } from '@nozbe/watermelondb';

export const superbScrewsSchema = tableSchema({
	name: 'superbScrews',
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
	],
});

import { tableSchema } from '@nozbe/watermelondb';

export const nailsSchema = tableSchema({
	name: 'nails',
	columns: [
		{
			name: 'name',
			type: 'string',
		},
		{
			name: 'JP',
			type: 'number',
		},
		{
			name: 'LPP',
			type: 'number',
		},
	],
});

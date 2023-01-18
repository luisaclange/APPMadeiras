import { tableSchema } from '@nozbe/watermelondb';

export const filterSchema = tableSchema({
	name: 'filter',
	columns: [
		{
			name: 'description',
			type: 'string',
		},
		{
			name: 'charging',
			type: 'string',
		},
		{
			name: 'woodName',
			type: 'number',
		},
		{
			name: 'nailType',
			type: 'string',
		},
		{
			name: 'calc',
			type: 'string',
		},
		{
			name: 'created_at',
			type: 'number',
		},
		{
			name: 'visualized_at',
			type: 'number',
		},
		{
			name: 'updated_at',
			type: 'number',
		},
	],
});

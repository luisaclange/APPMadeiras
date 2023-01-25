import { tableSchema } from '@nozbe/watermelondb';

export const calcSchema = tableSchema({
	name: 'calcs',
	columns: [
		{ name: 'description', type: 'string' },
		{ name: 'charging', type: 'string' },
		{ name: 'humidityClass', type: 'string' },
		{ name: 'woodName', type: 'number' },
		{ name: 'woodType', type: 'string' },
		{ name: 'ligationType', type: 'string' },
		{ name: 'pinType', type: 'string' },
		{ name: 'calc', type: 'string' },
		{ name: 'espWood_1', type: 'number' },
		{ name: 'espWood_2', type: 'number' },
		{ name: 'pinSelected', type: 'string' },
		{ name: 'widthWood', type: 'number' },
		{ name: 'tractiveForce', type: 'number' },
		{ name: 'numberPins', type: 'number' },
		{ name: 'created_at', type: 'number' },
		{ name: 'visualized_at', type: 'number' },
		{ name: 'updated_at', type: 'number' },
	],
});

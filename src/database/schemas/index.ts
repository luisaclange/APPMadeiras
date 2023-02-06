import { appSchema } from '@nozbe/watermelondb';
import { calcSchema } from './calcSchema';
import { filterSchema } from './filterSchema';

export const schemas = appSchema({
	version: 13,
	tables: [calcSchema, filterSchema],
});

import { appSchema } from '@nozbe/watermelondb';
import { calcSchema } from './calcSchema';
import { filterSchema } from './filterSchema';

export const schemas = appSchema({
	version: 12,
	tables: [calcSchema, filterSchema],
});

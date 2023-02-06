import { appSchema } from '@nozbe/watermelondb';
import { calcSchema } from './calcSchema';
import { filterSchema } from './filterSchema';
import { nailsSchema } from './nailSchema';
import { superbScrewsSchema } from './superbScrewSchema';
import { throughScrewsSchema } from './throughScrewSchema';

export const schemas = appSchema({
	version: 14,
	tables: [calcSchema, filterSchema, nailsSchema, superbScrewsSchema, throughScrewsSchema],
});

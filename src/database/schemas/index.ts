import { appSchema } from '@nozbe/watermelondb';
import { calcSchema } from './calcSchema';

export const schemas = appSchema({
    version: 2,
    tables: [calcSchema]
})

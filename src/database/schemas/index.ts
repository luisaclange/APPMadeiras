import { appSchema } from '@nozbe/watermelondb';
import { calcSchema } from './calcSchema';

export const schemas = appSchema({
  version: 4,
  tables: [calcSchema]
})

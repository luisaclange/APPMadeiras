import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schemas } from './schemas';
import { CalcModel } from './models/calcModel';
import { FilterModel } from './models/filterModel';

const adapter = new SQLiteAdapter({
	schema: schemas,
});

export const database = new Database({
	adapter,
	modelClasses: [CalcModel, FilterModel],
});

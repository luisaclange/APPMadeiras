import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schemas } from './schemas';
import { CalcModel } from './models/calcModel';
import { FilterModel } from './models/filterModel';
import { NailModel } from './models/nailModel';
import { SuperbScrewModel } from './models/superbScrewModel';
import { ThroughScrewModel } from './models/throughScrewModel';

const adapter = new SQLiteAdapter({
	schema: schemas,
});

export const database = new Database({
	adapter,
	modelClasses: [CalcModel, FilterModel, NailModel, SuperbScrewModel, ThroughScrewModel],
});

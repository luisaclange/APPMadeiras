import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class NailModel extends Model {
	static table = 'nails';

	@field('name')
	name!: string;

	@field('JP')
	JP!: number;

	@field('LPP')
	LPP!: number;
}

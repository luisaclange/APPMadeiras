import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class FilterModel extends Model {
	static table = 'filter';

	@field('description')
	description?: string;

	@field('charging')
	charging?: string;

	@field('woodName')
	woodName?: number;

	@field('nailType')
	nailType?: string;

	@field('calc')
	calc?: string;

	@field('created_at')
	created_at!: number;

	@field('visualized_at')
	visualized_at?: number;

	@field('updated_at')
	updated_at?: number;
}

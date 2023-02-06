import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class SuperbScrewModel extends Model {
	static table = 'superbScrews';

	@field('name')
	name!: string;

	@field('diametro')
	diametro!: number;

	@field('comprimento')
	comprimento!: number;
}

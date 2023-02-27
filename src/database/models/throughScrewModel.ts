import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class ThroughScrewModel extends Model {
	static table = 'throughScrews';

	@field('name')
	name!: string;

	@field('diametro')
	diametro!: number;

	@field('comprimento')
	comprimento!: number;

	@field('roscaComp')
	roscaComp!: number;

	@field('altura')
	altura!: number;

	@field('steelType')
	steelType!: string;
}

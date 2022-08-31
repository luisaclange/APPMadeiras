import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class CalcModel extends Model {
    static table = 'calcs'

    @field('charging')
    charging!: string;

    @field('humidityClass')
    humidityClass!: string;

    @field('woodType')
    woodType!: string;

    @field('woodClass')
    woodClass!: string;

    @field('dicotyledonClass')
    dicotyledonClass?: string;

    @field('tractiveForce')
    tractiveForce!: string;

    @field('fyk_nail')
    fyk_nail!: string;

    @field('woodResistanceClass')
    woodResistanceClass!: string;

    @field('widthWood')
    widthWood!: string;

    @field('heightWood_1')
    heightWood_1!: string;

    @field('heightWood_2')
    heightWood_2!: string;

    @field('nailDimension')
    nailDimension!: string;

    @field('created_at')
    created_at!: number;

    @field('visualized_at')
    visualized_at?: number;

    @field('updated_at')
    updated_at?: number;
}

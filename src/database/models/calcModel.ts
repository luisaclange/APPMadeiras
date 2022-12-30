import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class CalcModel extends Model {
  static table = 'calcs'

  @field('description')
  description!: string;

  @field('charging')
  charging!: string;

  @field('humidityClass')
  humidityClass!: string;

  @field('woodName')
  woodName!: number;

  @field('woodType')
  woodType!: string;

  @field('ligationType')
  ligationType!: string;

  @field('nailType')
  nailType!: string;

  @field('calc')
  calc!: string;

  @field('espWood_1')
  espWood_1!: number;

  @field('espWood_2')
  espWood_2!: number;

  @field('nailDimension')
  nailDimension!: string;

  @field('widthWood')
  widthWood!: number;

  @field('tractiveForce')
  tractiveForce?: number;

  @field('numberNails')
  numberNails?: number;

  @field('created_at')
  created_at!: number;

  @field('visualized_at')
  visualized_at?: number;

  @field('updated_at')
  updated_at?: number;
}

import { Attribute } from './attribute';

export interface Entity {
  name: string | null;
  description: string | null;
  templateUri: string | null;
  attributes: Attribute[];
}

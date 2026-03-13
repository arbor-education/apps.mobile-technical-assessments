import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export class Pokemon extends Model {
  static table = "pokemon";

  @field("name") name!: string;
  @field("type1") type1!: string;
  @field("type2") type2!: string | null;
  @field("sprite_url") spriteUrl!: string;
  @field("shiny_sprite_url") shinySpriteUrl!: string;
}

import { Effect } from "./Effect";
import { SecondaryEffect } from "./SecondaryEffect";
import { Ingredients } from "./Ingredients";
import { Crafting } from "./Crafting";
import { Usage } from "./Usage";
import { Meta } from "./Meta";

export interface Potion {
  id: string;
  name: string;
  type: string;
  rarity: string;
  effects: {
    primary: Effect,
    secondary: SecondaryEffect[]
  };
  ingredients: Ingredients[];
  crafting: Crafting;
  usage: Usage;
  meta: Meta;
  image: string;
}
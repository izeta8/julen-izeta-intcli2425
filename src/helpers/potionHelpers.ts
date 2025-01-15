import { Potion } from "../types/Potion";
import { parseTime } from "./utils";

export const filterByLevelRequirement = (potions: Potion[], level: number): Potion[] => {
  return potions.filter(potion => potion.usage.restrictions.levelRequirement <= level);
}

export const getPotionsByRarity = (potions: Potion[], rarity: string): Potion[] => {  
  return potions.filter(potion => potion.rarity === rarity);
}

export const listIngredients = (potion: Potion): string[] => {
  return potion.ingredients.map(ingredient => ingredient.name);
} 

export const findPotionByEffect = (potions: Potion[], effect: string): Potion[] => {
  return potions.filter(potion => potion.effects.secondary.some(secondaryEffect => secondaryEffect.attribute === effect));
}

export const calculateCraftingTime = (potions: Potion[]): number => {
  let time = 0;
  for (const potion of potions) {
    const potionTime = parseTime(potion.crafting.time);
    time += potionTime;
  }
  return time;
}
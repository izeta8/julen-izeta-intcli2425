import { potions } from "../data/data";
import { levelFilterExpectedMock, rarityExpectedMock, listIngredientsMock, potionByEffectMock, potionsDurationMock } from "../helpers/potionMocks";
import { filterByLevelRequirement, getPotionsByRarity, listIngredients, findPotionByEffect, calculateCraftingTime } from "../helpers/potionHelpers";

describe('Filter potions by level', () => {
	it('should return potions below or equal level 15.', () => {
		const filteredPotions = filterByLevelRequirement(potions, 15);
		expect(filteredPotions).toEqual(levelFilterExpectedMock);
	})
})

describe('Filter potions by rarity', () => {
	it('should return legendary potions only.', () => {
		const filteredPotions = getPotionsByRarity(potions, "legendary");
		expect(filteredPotions).toEqual(rarityExpectedMock);
	})
})

describe("Return potion's ingredients list", () => {
	it('should return an array of ingredient names.', () => {
		const ingredientsList = listIngredients(listIngredientsMock);
		const expectedArray = ["Nightshade Petals", "Ethereal Dust", "Void Essence"];
		expect(ingredientsList).toEqual(expectedArray);
	})
})

describe("Return potion's that have certain secondary effects", () => {
	it("should return potions that one of its secondary effects is 'manaRegeneration'", () => {
		const filteredPotions = findPotionByEffect(potions, "manaRegeneration");
		expect(filteredPotions).toEqual(potionByEffectMock);
	})
})


describe("Return potions duration time to craft", () => {
	it("should return 120 minutes", () => {
		const potionDuration = calculateCraftingTime(potionsDurationMock);
		expect(potionDuration).toBe(120);
	})
})



import {filterByLevelRequirement} from "../helpers/potionHelpers"


// Arrange
// Act
// Assert

describe('', () => {
	it('should return potions below level 20.', () => {
		// console.log(potions.length);
		const filteredPotions = filterByLevelRequirement();
		expect(filteredPotions).toBe(1);
	})

})
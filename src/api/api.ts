import { Potion } from "../types/Potion";


export const getPotions = async (): Promise<Potion[]> => {

  const response = await fetch("http://localhost:3000/api/potions");

  if (!response.ok) {
    throw new Error("Response to get potions failed.")
  }

  const responseData = await response.json();

  if (!responseData.data) {
    throw new Error("There was an error getting the list of potions");
  }

  return responseData.data;
}


import { Potion } from "../types/Potion";
import axiosInstance from "../helpers/axiosInstance";
import axios from "axios";

export const getPotions = async (): Promise<Potion[]|undefined> => {

  try {
 
    const response = await axiosInstance.get("/potions");

    if (response.data.status !== "OK") {
      throw new Error("There was an error getting the list of potions: Response to get potions failed.")
    }

    const responseData = response.data;

    if (!responseData.data) {
      throw new Error("There was an error getting the list of potions");
    }

    return responseData.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error);
      }
    } else {
      throw new Error("There was an error getting the list of potions");
    }
  }

}


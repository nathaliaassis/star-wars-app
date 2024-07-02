import { api } from "../../config/api";
import { IPeople } from "../../interfaces/IPeople";

export const getPeople = async (): Promise<IPeople[]> => {
  const response = await api.get("/people");
  return response.data.results;
};

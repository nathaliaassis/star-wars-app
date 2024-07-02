import { api } from "../../config/api";
import { IPeople } from "../../interfaces/IPeople";

export const getPeople = async (): Promise<IPeople[]> => {
  const response = await api.get("/people");
  return response.data.results;
};

export const getPeopleById = async (id: string): Promise<IPeople> => {
  const response = await api.get(`/people/${id}`);

  return response.data;
};

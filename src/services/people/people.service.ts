import { api } from "../../config/api";
import { IPeople } from "../../interfaces/IPeople";

interface IGetPeopleResponse {
  results: IPeople[];
  count: number;
  next: string;
}
export const getPeople = async (): Promise<IGetPeopleResponse> => {
  const response = await api.get("/people");

  return response.data;
};

export const getPeopleById = async (id: string): Promise<IPeople> => {
  const response = await api.get(`/people/${id}`);

  return response.data;
};

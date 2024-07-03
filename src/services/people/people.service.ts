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

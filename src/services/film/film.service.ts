import { api } from "../../config/api";
import { IFilm } from "../../interfaces/IFilm";

export const getFilmById = async (id: string): Promise<IFilm> => {
  const response = await api.get(`/films/${id}`);

  return response.data;
};

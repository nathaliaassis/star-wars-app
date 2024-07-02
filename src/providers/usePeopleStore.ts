import { create } from "zustand";
import { IPeople } from "../interfaces/IPeople";
import { IFilm } from "../interfaces/IFilm";

interface IPerson extends IPeople {
  isStarred?: boolean;
}

interface IUsePeopleStore {
  peopleList: IPerson[];
  selectedPerson: IPerson | null;
  selectedPersonFilms: IFilm[];

  setPeopleList: (people: IPerson[]) => void;
  setSelectedPerson: (person: IPerson | null) => void;
  setSelectedPersonFilms: (films: IFilm[]) => void;
}

const usePeopleStore = create<IUsePeopleStore>((set, get) => ({
  peopleList: [],
  selectedPerson: null,
  selectedPersonFilms: [],

  setPeopleList: (people) => {
    const { peopleList: prevList } = get();

    const list = [...prevList, ...people];

    const newPeopleList = list.map((person) => {
      if (!person.isStarred) {
        return {
          ...person,
          isStarred: false,
        };
      }
      return {
        ...person,
      };
    });

    set({ peopleList: newPeopleList });
  },
  setSelectedPerson: (person) => set({ selectedPerson: person }),
  setSelectedPersonFilms: (films) => set({ selectedPersonFilms: films }),
}));

export { usePeopleStore };

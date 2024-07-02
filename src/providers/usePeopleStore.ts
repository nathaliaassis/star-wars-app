import { create } from "zustand";
import { IPeople } from "../interfaces/IPeople";
import { IFilm } from "../interfaces/IFilm";

interface IUsePeopleStore {
  peopleList: IPeople[];
  starredList: IPeople[];
  selectedPerson: IPeople | null;
  selectedPersonFilms: IFilm[];

  setPeopleList: (people: IPeople[]) => void;
  setStarredList: (people: IPeople[]) => void;
  setSelectedPerson: (person: IPeople | null) => void;
  setSelectedPersonFilms: (films: IFilm[]) => void;
  handleStarAPerson: (personURL: string, isStarred: boolean) => void;
}

const usePeopleStore = create<IUsePeopleStore>((set, get) => ({
  peopleList: [],
  starredList: [],
  selectedPerson: null,
  selectedPersonFilms: [],

  setPeopleList: (people) => {
    const { peopleList: prevList } = get();

    const combinedList = [...prevList, ...people];
    const peopleMap = new Map();

    combinedList.forEach((person) => {
      if (!peopleMap.has(person.url)) {
        peopleMap.set(person.url, {
          ...person,
          isStarred: person.isStarred ?? false,
        });
      }
    });

    const newPeopleList = Array.from(peopleMap.values());

    set({ peopleList: newPeopleList });
  },
  setStarredList: () => {
    const { peopleList } = get();
    const filterdByStarred = peopleList.filter((person) => person.isStarred);

    set({ starredList: filterdByStarred });
  },
  setSelectedPerson: (person) => set({ selectedPerson: person }),
  setSelectedPersonFilms: (films) => set({ selectedPersonFilms: films }),
  handleStarAPerson: (personURL, isStarred) => {
    const { peopleList, selectedPerson } = get();

    if (!selectedPerson) return;

    const listWithUpdatedPerson = peopleList.map((person) => {
      if (person.url === personURL) {
        return {
          ...person,
          isStarred,
        };
      }

      return person;
    });

    set({
      peopleList: listWithUpdatedPerson,
      selectedPerson: { ...selectedPerson, isStarred },
    });
  },
}));

export { usePeopleStore };

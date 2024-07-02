import React, { useCallback, useEffect, useState } from "react";
import { Container, Title, SubTitle } from "./details.styles";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../types";
import { IPeople } from "../../interfaces/IPeople";
import { getPeopleById } from "../../services/people/people.service";
import { FlatList, Text, View } from "react-native";
import { IFilm } from "../../interfaces/IFilm";
import { getFilmById } from "../../services/film/film.service";
import Tabs from "./tabs/tabs.component";

type Props = BottomTabScreenProps<RootTabParamList, "Details">;

const Details: React.FC<Props> = ({ route }) => {
  const { url } = route.params;

  const [character, setCharacter] = useState<IPeople>();
  const [films, setFilms] = useState<IFilm[]>([]);

  const fetchPerson = useCallback(async () => {
    const id = url.split("/people/")[1];

    const response = await getPeopleById(id);

    setCharacter(response);

    const filmsURLs = response.films as string[];

    const filmsList = filmsURLs.map(async (url: string) => {
      const id = url.split("/films/")[1];

      const filmData = await getFilmById(id);

      return filmData;
    });

    const filmsData = await Promise.all(filmsList);

    setFilms(filmsData);
  }, [url]);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);

  return (
    <Container>
      <View>
        <Title>{character?.name}</Title>
      </View>
      <Tabs films={films} character={character as IPeople} />
    </Container>
  );
};

export default Details;

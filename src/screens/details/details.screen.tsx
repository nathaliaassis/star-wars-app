import React, { useCallback, useEffect, useState } from "react";
import { Container, Header, Title } from "./details.styles";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../types";
import { IPeople } from "../../interfaces/IPeople";
import { getPeopleById } from "../../services/people/people.service";
import { IFilm } from "../../interfaces/IFilm";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { getFilmById } from "../../services/film/film.service";
import Tabs from "./tabs/tabs.component";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = BottomTabScreenProps<RootTabParamList, "Details">;

const Details: React.FC<Props> = ({ route }) => {
  const { url } = route.params;
  const { goBack } = useNavigation();
  const [character, setCharacter] = useState<IPeople>();
  const [films, setFilms] = useState<IFilm[]>([]);
  const [isStarred, setIsStarred] = useState<boolean>(false);

  const handleOnPressStar = () => setIsStarred(!isStarred);

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
      <Header>
        <TouchableOpacity data-testid="teste" onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>

        <Title>{character?.name}</Title>

        <TouchableOpacity onPress={handleOnPressStar}>
          <Icon name="star" size={24} color="#000000" solid={isStarred} />
        </TouchableOpacity>
      </Header>
      <Tabs films={films} character={character as IPeople} />
    </Container>
  );
};

export default Details;

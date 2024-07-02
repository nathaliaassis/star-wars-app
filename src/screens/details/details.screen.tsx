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
import { usePeopleStore } from "../../providers/usePeopleStore";
import Loading from "../../components/loading/loading.component";

type Props = BottomTabScreenProps<RootTabParamList, "Details">;

const Details: React.FC<Props> = ({ route }) => {
  const { url } = route.params;
  const { goBack } = useNavigation();
  const {
    setSelectedPerson,
    selectedPerson,
    setSelectedPersonFilms,
    selectedPersonFilms,
    handleStarAPerson,
  } = usePeopleStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPerson = useCallback(async () => {
    const id = url.split("/people/")[1];

    const response = await getPeopleById(id);

    setSelectedPerson(response);

    const filmsURLs = response.films as string[];

    const filmsPromises = filmsURLs.map(async (url: string) => {
      const id = url.split("/films/")[1];

      const filmData = await getFilmById(id);

      return filmData;
    });

    const filmList = await Promise.all(filmsPromises);

    setSelectedPersonFilms(filmList);
  }, [url]);

  useEffect(() => {
    if (selectedPerson && selectedPersonFilms.length) {
      setIsLoading(false);
    }
  }, [selectedPerson, selectedPersonFilms]);

  useEffect(() => {
    setIsLoading(true);
    fetchPerson();
  }, [fetchPerson]);

  const handleOnPressStar = useCallback(() => {
    if (selectedPerson) {
      const { url, isStarred } = selectedPerson;

      handleStarAPerson(url, !isStarred);
    }
  }, [selectedPerson]);

  if (!selectedPerson || isLoading) return <Loading />;

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>

        <Title>{selectedPerson?.name}</Title>

        <TouchableOpacity onPress={handleOnPressStar}>
          <Icon
            name="star"
            size={24}
            color="#000000"
            solid={selectedPerson.isStarred}
          />
        </TouchableOpacity>
      </Header>
      <Tabs />
    </Container>
  );
};

export default Details;

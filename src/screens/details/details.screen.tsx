import React, { useCallback, useEffect, useState } from "react";
import { Container, Header, Title } from "./details.styles";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DetailsScreenProps, RootTabParamList } from "../../types";
import { getPeopleById } from "../../services/people/people.service";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { getFilmById } from "../../services/film/film.service";
import Tabs from "./tabs/tabs.component";
import { TouchableOpacity } from "react-native";
import { usePeopleStore } from "../../providers/usePeopleStore";
import Loading from "../../components/loading/loading.component";

const Details: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { url } = route.params;

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

  const handleOnPressStar = useCallback(() => {
    if (selectedPerson) {
      const { url, isStarred } = selectedPerson;

      handleStarAPerson(url, !isStarred);
    }
  }, [selectedPerson]);

  useEffect(() => {
    if (selectedPerson && selectedPersonFilms.length) {
      setIsLoading(false);
    }
  }, [selectedPerson, selectedPersonFilms]);

  useEffect(() => {
    setIsLoading(true);
    fetchPerson();
  }, [fetchPerson]);

  if (!selectedPerson || isLoading) return <Loading />;

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

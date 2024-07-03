import React, { useCallback, useEffect, useState } from "react";
import { Container, Header, Title } from "./details.styles";
import { DetailsScreenProps } from "../../types";
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
    peopleList,
    setSelectedPersonFilms,
    selectedPersonFilms,
    handleStarAPerson,
  } = usePeopleStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPerson = useCallback(async () => {
    setIsLoading(true);
    const person = peopleList.find((people) => people.url === url);

    if (!person) return;
    setSelectedPerson(person);

    const filmsURLs = person?.films as string[];
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
    fetchPerson();
  }, [fetchPerson]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
      setSelectedPerson(null);
      setSelectedPersonFilms([]);
    };
  }, []);

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

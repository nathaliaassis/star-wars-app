import { Container, LoadingContainer, Logo } from "./characters.styles";
import { useCallback, useEffect, useState } from "react";
import { getPeople } from "../../services/people/people.service";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { IPeople } from "../../interfaces/IPeople";
import CharacterCard from "../../components/characterCard/characterCard.component";
import { RootTabParamList } from "../../types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

import logoImg from "../../assets/logo_black.png";
import { api } from "../../config/api";

interface ICharacters {
  navigation: NativeStackNavigationProp<RootTabParamList>;
}

const Characters: React.FC<ICharacters> = ({ navigation }) => {
  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [nextPageURL, setNextPageURL] = useState<string>("");
  const [lastPageCalled, setLastPageCalled] = useState<string>("");
  const [maxPeople, setMaxPeople] = useState<number>(0);

  const renderLoading = () => {
    if (!isLoading) return;
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#000000" />
      </LoadingContainer>
    );
  };

  const getPeopleList = useCallback(async () => {
    setIsLoading(true);

    const data = await getPeople();

    if (data) {
      setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      setNextPageURL(data.next);
      setMaxPeople(data.count);
    }

    setIsLoading(false);
  }, [getPeople]);

  const handleRefresh = useCallback(async () => {
    if (
      nextPageURL &&
      lastPageCalled !== nextPageURL &&
      characters.length < maxPeople
    ) {
      setIsRefreshing(true);
      setLastPageCalled(nextPageURL);

      const response = await api.get(nextPageURL);
      const { data } = response;

      if (data) {
        if (data.results) {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...data.results,
          ]);
        }
        if (data.next) setNextPageURL(data.next);

        setIsRefreshing(false);
      }
    }
  }, [nextPageURL, lastPageCalled, maxPeople]);

  useEffect(() => {
    getPeopleList();
  }, [getPeopleList]);

  return (
    <Container>
      <Logo source={logoImg} />
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate("Details", { url: item.url })}
          />
        )}
        keyExtractor={(item, idx) => item.name + idx + 1}
        onEndReached={handleRefresh}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoading}
        refreshing={isRefreshing}
        onRefresh={getPeopleList}
      />
    </Container>
  );
};

export default Characters;

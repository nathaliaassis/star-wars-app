import { Container, Logo } from "./people.styles";
import { useCallback, useEffect, useState } from "react";
import { getPeople } from "../../services/people/people.service";
import { FlatList } from "react-native";
import { PeopleScreenProps, RootTabParamList } from "../../types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import logoImg from "../../assets/logo_black.png";
import { api } from "../../config/api";
import { usePeopleStore } from "../../providers/usePeopleStore";
import PersonCard from "../../components/personCard/personCard.component";
import Loading from "../../components/loading/loading.component";

const People: React.FC<PeopleScreenProps> = ({ navigation }) => {
  const { setPeopleList, peopleList } = usePeopleStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [nextPageURL, setNextPageURL] = useState<string>("");
  const [lastPageCalled, setLastPageCalled] = useState<string>("");
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [listIsFullyLoaded, setListIsFullyLoaded] = useState<boolean>(false);

  const renderLoading = () => {
    if (!isLoading) return;
    return <Loading />;
  };

  const getPeopleList = useCallback(async () => {
    setIsLoading(true);

    const data = await getPeople();

    if (data) {
      setPeopleList(data.results);
      setNextPageURL(data.next);
      setMaxPeople(data.count);
    }

    setIsLoading(false);
  }, [getPeople]);

  const handleRefresh = useCallback(async () => {
    if (nextPageURL && lastPageCalled !== nextPageURL && !listIsFullyLoaded) {
      setIsRefreshing(true);
      setLastPageCalled(nextPageURL);

      const response = await api.get(nextPageURL);
      const { data } = response;

      if (data) {
        setPeopleList(data.results);
        setNextPageURL(data.next);
        setIsRefreshing(false);
      }
    }
  }, [nextPageURL, lastPageCalled, maxPeople, listIsFullyLoaded]);

  useEffect(() => {
    if (!listIsFullyLoaded) getPeopleList();
  }, [getPeopleList, listIsFullyLoaded]);

  useEffect(() => {
    if (peopleList.length === maxPeople) {
      setListIsFullyLoaded(true);
    } else {
      setListIsFullyLoaded(false);
    }
  }, [peopleList, maxPeople]);

  return (
    <Container>
      <Logo source={logoImg} />
      <FlatList
        data={peopleList}
        renderItem={({ item }) => (
          <PersonCard
            person={item}
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

export default People;

import { Container } from "./characters.styles";
import { useCallback, useEffect, useState } from "react";
import { getPeople } from "../../services/people/people.service";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { IPeople } from "../../interfaces/IPeople";
import CharacterCard from "../../components/characterCard/characterCard.component";
import { RootTabParamList } from "../../types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface ICharacters {
  navigation: NativeStackNavigationProp<RootTabParamList>;
}

const Characters: React.FC<ICharacters> = ({ navigation }) => {
  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);

    const data = await getPeople();

    if (data) setCharacters((prevCharacters) => [...prevCharacters, ...data]);

    setIsLoading(false);
  }, []);

  const renderLoading = () => {
    if (!isLoading) return;
    return (
      <View style={{ alignItems: "center", margin: 8 }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  };

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <Container>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate("Details", { url: item.url })}
          />
        )}
        keyExtractor={(item, idx) => item.name + idx + 1}
        onEndReached={fetchCharacters}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoading}
      />
    </Container>
  );
};

export default Characters;

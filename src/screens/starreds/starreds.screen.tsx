import { FlatList } from "react-native";
import React from "react";
import { Container, Header } from "./starreds.styles";
import { usePeopleStore } from "../../providers/usePeopleStore";
import PersonCard from "../../components/personCard/personCard.component";

const Starreds = ({ navigation }) => {
  const { starredList } = usePeopleStore();

  return (
    <Container>
      <Header>My Favorites</Header>
      <FlatList
        data={starredList}
        renderItem={({ item }) => (
          <PersonCard
            person={item}
            onPress={() => navigation.navigate("Details", { url: item.url })}
          />
        )}
        keyExtractor={(item) => item.url}
      />
    </Container>
  );
};

export default Starreds;

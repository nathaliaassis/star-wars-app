import { FlatList, View } from "react-native";
import { FilmItem } from "./filmsTab.styles";
import { usePeopleStore } from "../../../../providers/usePeopleStore";
import Loading from "../../../../components/loading/loading.component";

const FilmsTab = () => {
  const { selectedPersonFilms } = usePeopleStore();

  if (!selectedPersonFilms) return <Loading />;

  return (
    <View>
      <FlatList
        data={selectedPersonFilms}
        renderItem={({ item }) => <FilmItem>{item.title}</FilmItem>}
        keyExtractor={(item) => item.episode_id + item.release_date}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default FilmsTab;

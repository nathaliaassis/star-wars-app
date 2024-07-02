import * as React from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { IFilm } from "../../../interfaces/IFilm";
import InfoItem from "../../../components/infoItem/infoItem.component";
import { IPeople } from "../../../interfaces/IPeople";

interface ITabs {
  films: IFilm[];
  character: IPeople;
}

const Tabs = ({ films, character }: ITabs) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "films", title: "Films" },
    { key: "info", title: "Info" },
  ]);

  const InfoRoute = () => (
    <View>
      <InfoItem label={"Birth Year:"} value={character?.birth_year} />
      <InfoItem label={"Gender:"} value={character?.gender} />
      <InfoItem label={"Height:"} value={character?.height} />
      <InfoItem label={"Mass:"} value={character?.mass} />
      <InfoItem label={"Eye Color:"} value={character?.eye_color} />
      <InfoItem label={"Skin Color"} value={character?.skin_color} />
    </View>
  );

  const FilmsRoute = () => (
    <View>
      <FlatList
        data={films}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.episode_id + item.release_date}
        onEndReachedThreshold={0.5}
      />
    </View>
  );

  const renderScene = SceneMap({
    films: FilmsRoute,
    info: InfoRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      pagerStyle={{ marginTop: 16 }}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{
            height: 4,
          }}
          style={{ backgroundColor: "#000000", borderRadius: 8 }}
        />
      )}
    />
  );
};

export default Tabs;

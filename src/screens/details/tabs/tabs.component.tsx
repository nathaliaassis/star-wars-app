import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { StyledTabBar } from "./tabs.styles";
import { useState } from "react";
import InfoTab from "./infoTab/infoTab.component";
import FilmsTab from "./filmsTab/filmsTab.component";
import { usePeopleStore } from "../../../providers/usePeopleStore";

const Tabs = () => {
  const { setSelectedPerson, setSelectedPersonFilms } = usePeopleStore();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "info", title: "Info" },
    { key: "films", title: "Films" },
  ]);

  const renderScene = SceneMap({
    info: InfoTab,
    films: FilmsTab,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      pagerStyle={{ marginTop: 16 }}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <StyledTabBar {...props} indicatorStyle={{ height: 4 }} />
      )}
    />
  );
};

export default Tabs;

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import Starreds from "./src/screens/starreds/starreds.screen";
import Details from "./src/screens/details/details.screen";
import People from "./src/screens/people/people.screen";
import { RootTabParamList } from "./src/types";

const Tab = createBottomTabNavigator<RootTabParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fbff00",
          tabBarStyle: {
            height: 60,
            backgroundColor: "#0c0c0c",
          },
        }}
        initialRouteName="People"
      >
        <Tab.Screen
          name="People"
          component={People}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="jedi" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Starreds"
          component={Starreds}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="star" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={Details}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

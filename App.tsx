import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import Starreds from "./src/screens/starreds/starreds.screen";
import Details from "./src/screens/details/details.screen";
import Characters from "./src/screens/characters/characters.screen";

const Tab = createBottomTabNavigator();

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
        initialRouteName="Characters"
      >
        <Tab.Screen
          name="Characters"
          component={Characters}
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

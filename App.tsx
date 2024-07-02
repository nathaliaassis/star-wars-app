import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/home/home.screen";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

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
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Characters"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="jedi" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Starreds"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="star" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// types.ts
import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootTabParamList = {
  Characters: undefined;
  Details: { url: string };
  Starreds: undefined;
};

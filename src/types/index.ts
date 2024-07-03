import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "react-native-screens/lib/typescript/native-stack/types";

export type RootTabParamList = {
  People: undefined;
  Details: { url: string };
  Starreds: undefined;
};

export type PeopleScreenProps = {
  navigation: NativeStackNavigationProp<RootTabParamList>;
};

export type DetailsScreenProps = NativeStackScreenProps<
  RootTabParamList,
  "Details"
>;

export type StarredsScreenProps = {
  navigation: NativeStackNavigationProp<RootTabParamList>;
};

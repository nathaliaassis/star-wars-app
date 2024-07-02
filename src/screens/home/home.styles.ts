import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled(SafeAreaView)`
  margin-top: ${StatusBar.currentHeight ? StatusBar.currentHeight + "px" : 0};
  padding: 24px;
`;

export { Container };

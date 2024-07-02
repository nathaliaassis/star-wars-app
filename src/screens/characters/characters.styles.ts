import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  margin-top: ${StatusBar.currentHeight ? StatusBar.currentHeight + "px" : 0};
  padding: 8px 24px 24px;
`;

export { Container };

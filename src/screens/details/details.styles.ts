import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  margin-top: ${StatusBar.currentHeight ? StatusBar.currentHeight + "px" : 0};
  padding: 8px 24px 24px;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  align-self: center;
`;

export { Container, Title };

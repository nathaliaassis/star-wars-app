import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  margin-top: ${StatusBar.currentHeight
    ? StatusBar.currentHeight + 16 + "px"
    : 0};
  padding: 8px 24px 24px;
  height: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  align-self: center;
`;

export { Container, Title };

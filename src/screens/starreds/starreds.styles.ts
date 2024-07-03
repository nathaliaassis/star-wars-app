import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  margin-top: ${StatusBar.currentHeight && StatusBar.currentHeight + 16 + "px"};
  padding: 0px 24px 70px;
`;

const Header = styled.Text`
  font-size: 32px;
  font-weight: 600;
  align-self: center;
  margin-bottom: 16px;
`;

export { Container, Header };

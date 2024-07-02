import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  margin-top: ${StatusBar.currentHeight ? StatusBar.currentHeight + "px" : 0};
  padding: 8px 24px 24px;
`;

const Logo = styled.Image`
  background-size: contain;
  background-repeat: no-repeat;
  align-self: "center";
  height: 60px;
  width: 135px;
  margin: 16px auto;
`;

export { Container, Logo };

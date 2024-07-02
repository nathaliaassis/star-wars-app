import { TextProps, TouchableHighlight } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #f9f9f9;
  background-color: #ffffff;
  margin-bottom: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000000;
`;

export const Info = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: #9b9b9b;
`;

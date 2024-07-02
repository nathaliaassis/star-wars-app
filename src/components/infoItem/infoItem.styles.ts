import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-bottom: 4px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #727272;
  font-weight: 400;
`;

const Value = styled.Text`
  font-size: 18px;
  color: #212121;
  font-weight: 600;
`;

export { Container, Label, Value };

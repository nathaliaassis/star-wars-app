import { Container, Label, Value } from "./infoItem.styles";

interface IInfoItem {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: IInfoItem) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  );
};

export default InfoItem;

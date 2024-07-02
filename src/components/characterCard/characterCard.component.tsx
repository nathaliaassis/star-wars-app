import { IPeople } from "../../interfaces/IPeople";
import { Container, Row, Info, Title } from "./characterCard.styles";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

const CharacterCard = ({ character }: { character: IPeople }) => (
  <Container onPress={() => {}}>
    <>
      <Row>
        <Title>{character.name}</Title>

        {/* // TODO: Show only when it be a starred character
        <Icon name={"star"} size={20} color="#0c0c0c" /> */}
      </Row>
      <Info>Specie: {character.gender}</Info>
      <Row>
        <Info>Height: {character.height}</Info>
        <Info>Mass: {character.mass}</Info>
      </Row>
    </>
  </Container>
);

export default CharacterCard;

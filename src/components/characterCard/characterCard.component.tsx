import { GestureResponderEvent, View } from "react-native";
import { IPeople } from "../../interfaces/IPeople";
import { Container, Row, Info, Title } from "./characterCard.styles";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ICharacterCard {
  character: IPeople;
  onPress: (event: GestureResponderEvent) => void;
}

const CharacterCard = ({ character, onPress }: ICharacterCard) => {
  return (
    <Container onPress={onPress}>
      <View>
        <Row>
          <Title>{character.name}</Title>
          <Icon name={"star"} size={20} color="#000000" />
        </Row>
        <Info>Specie: {character.gender}</Info>
        <Row>
          <Info>Height: {character.height}</Info>
          <Info>Mass: {character.mass}</Info>
        </Row>
      </View>
    </Container>
  );
};

export default CharacterCard;

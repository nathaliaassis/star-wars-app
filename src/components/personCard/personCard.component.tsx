import { GestureResponderEvent, View } from "react-native";
import { IPeople } from "../../interfaces/IPeople";
import { Container, Row, Info, Title } from "./personCard.styles";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface IPersonCard {
  person: IPeople;
  onPress: (event: GestureResponderEvent) => void;
}

const PersonCard = ({ person, onPress }: IPersonCard) => {
  return (
    <Container onPress={onPress}>
      <View>
        <Row>
          <Title>{person.name}</Title>
          <Icon name={"star"} size={20} color="#000000" />
        </Row>
        <Info>Specie: {person.gender}</Info>
        <Row>
          <Info>Height: {person.height}</Info>
          <Info>Mass: {person.mass}</Info>
        </Row>
      </View>
    </Container>
  );
};

export default PersonCard;

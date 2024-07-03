import { GestureResponderEvent, View } from "react-native";
import { IPeople } from "../../interfaces/IPeople";
import { Container, Row, Info, Title } from "./personCard.styles";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

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
          {person.isStarred && (
            <Icon
              name={"star"}
              size={20}
              color="#000000"
              solid
              data-testid="star-icon"
            />
          )}
        </Row>
        <Info>Gender: {person.gender}</Info>
        <Row>
          <Info>Height: {person.height}</Info>
          <Info>Mass: {person.mass}</Info>
        </Row>
      </View>
    </Container>
  );
};

export default PersonCard;

import { fireEvent, render } from "@testing-library/react-native";
import PersonCard from "./personCard.component";
import { Text, View } from "react-native";

const mockedPerson = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19 BBY",
  gender: "male",
  homeworld: "Tatooine",
  films: ["https://swapi.dev/api/films/1/"],
  url: "https://swapi.dev/api/people/1/",
  species: ["https://swapi.dev/api/species/1/"],
  vehicles: ["https://swapi.dev/api/vehicles/1/"],
  starships: ["https://swapi.dev/api/starships/1/"],
  created: new Date("2014-12-09T16:20:43.312000Z"),
  edited: new Date("2014-12-09T16:20:43.312000Z"),
};
const mockedOnPress = jest.fn();

jest.mock("@expo/vector-icons", () => ({
  FontAwesomeIcon: "",
}));

describe("@Component: PersonCard", () => {
  it("should be able to render the component", () => {
    const { getByText } = render(
      <PersonCard person={mockedPerson} onPress={mockedOnPress} />
    );

    expect(getByText(mockedPerson.name)).toBeTruthy();
    expect(getByText(`Gender: ${mockedPerson.gender}`)).toBeTruthy();
    expect(getByText(`Mass: ${mockedPerson.mass}`)).toBeTruthy();
  });

  it("should be able to call onPress funtion on user press", () => {
    const { getByText } = render(
      <PersonCard person={mockedPerson} onPress={mockedOnPress} />
    );

    fireEvent.press(getByText(mockedPerson.name));

    expect(mockedOnPress).toHaveBeenCalled();
  });
});

import { render } from "@testing-library/react-native";
import InfoItem from "./infoItem.component";

describe("@Component: InfoItem", () => {
  it("should be able to render the component", () => {
    const { getByText } = render(<InfoItem label="label" value="text-value" />);

    expect(getByText("label")).toBeTruthy();
    expect(getByText("text-value")).toBeTruthy();
  });
});

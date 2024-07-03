import { render } from "@testing-library/react-native";
import Loading from "./loading.component";

describe("@Component: Loading", () => {
  it("should be able to render the component", () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId("loading-component")).toBeTruthy();
  });
});

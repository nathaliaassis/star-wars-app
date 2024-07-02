import { ActivityIndicator } from "react-native";
import { LoadingContainer } from "./loading.styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#000000" />
    </LoadingContainer>
  );
};

export default Loading;

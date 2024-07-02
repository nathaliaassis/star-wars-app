import { View } from "react-native";
import InfoItem from "../../../../components/infoItem/infoItem.component";
import { usePeopleStore } from "../../../../providers/usePeopleStore";

const InfoTab = () => {
  const { selectedPerson } = usePeopleStore();

  if (!selectedPerson) return;

  return (
    <View>
      <InfoItem label={"Birth Year:"} value={selectedPerson.birth_year} />
      <InfoItem label={"Gender:"} value={selectedPerson.gender} />
      <InfoItem label={"Height:"} value={selectedPerson.height} />
      <InfoItem label={"Mass:"} value={selectedPerson.mass} />
      <InfoItem label={"Eye Color:"} value={selectedPerson.eye_color} />
      <InfoItem label={"Skin Color"} value={selectedPerson.skin_color} />
    </View>
  );
};

export default InfoTab;

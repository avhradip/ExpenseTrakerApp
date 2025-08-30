import { colors, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

const FloatingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Icons.Plus size={verticalScale(24)} color={colors.white} weight="bold" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "relative",
    bottom: verticalScale(30),
    right: spacingX._20,
    backgroundColor: colors.primary, // change to your theme color
    width: verticalScale(55),
    height: verticalScale(55),
    borderRadius: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Android shadow
  },
});

export default FloatingButton;

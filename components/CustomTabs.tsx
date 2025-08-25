import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icon from "phosphor-react-native";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // ✅ Icons
          let TabIcon: React.ElementType = Icon.XCircle;
          if (route.name === "index") TabIcon = Icon.House;
          if (route.name === "profile") TabIcon = Icon.User;
          if (route.name === "statistics") TabIcon = Icon.ChartBar;
          if (route.name === "wallet") TabIcon = Icon.Wallet;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}
            >
              <TabIcon
                size={isFocused ? verticalScale(32) : verticalScale(26)}
                color={isFocused ? colors.primary : colors.text}
                weight={isFocused ? "fill" : "regular"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: verticalScale(12),
    left: 20,
    right: 20,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(70) : verticalScale(65),
    backgroundColor: "#2B2A33",
    borderRadius: 40,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  activeTabButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});

import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

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

        // Icon mapping
        let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";
        if (route.name === "index") iconName = "home-outline";
        if (route.name === "profile") iconName = "person-outline";
        if (route.name === "statistics") iconName = "stats-chart-outline";
        if (route.name === "wallet") iconName = "wallet-outline";

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? colors.primary : colors.text}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? colors.primary : colors.text },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(65) : verticalScale(60),
    backgroundColor: "#000", // Black tab bar
    borderTopColor: "#0f0", // Green border
    borderTopWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

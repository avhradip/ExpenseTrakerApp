import { expenseCategories } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { TransactionItemProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Typo from "./Typo";

const TransactionItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {
  const category = expenseCategories["dining"];
  const IconComponent = category.icon;

  return (
    <Animated.View entering={FadeInDown.delay(index*70).springify().damping(14)}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleClick?.(item)}
        activeOpacity={0.7}
      >
        {/* Left: category icon + title/date */}
        <View style={styles.left}>
          <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
            {IconComponent && (
              <IconComponent
                size={verticalScale(22)}
                weight="fill"
                color={colors.white}
              />
            )}
          </View>
          <View style={{ marginLeft: spacingX._10 }}>
            <Typo size={17}>{category.label}</Typo>
            <Typo
              size={12}
              color={colors.neutral400}
              textProps={{ numberOfLines: 1 }}
            >
              {item.description ?? "paid"}
            </Typo>
          </View>
        </View>

        {/* Right: amount */}
        <View>
          <Typo
            fontWeight="500"
            color={item.type === "income" ? colors.primary : colors.rose}
          >
            {item.type === "income" ? "+" : "-"}₹{item.amount ?? 23}
          </Typo>
          <Typo size={13} color={colors.neutral400}>
            {item.date ?? "12 jan"}
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.neutral800,
    marginBottom: spacingY._10,
    padding: spacingY._10,
    borderRadius: radius._17,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: spacingX._7,
    borderRadius: radius._12,
    justifyContent: "center",
    alignItems: "center",
  },
});

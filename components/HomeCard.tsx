import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Typo from "./Typo";

import * as Icons from "phosphor-react-native";

const HomeCard = () => {
  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgStyle}
    >
      <View style={styles.container}>
        <View>
          {/* Total balance */}
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
              Total Balance
            </Typo>

            <Icons.DotsThreeOutline
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo color={colors.black} size={30} fontWeight={"bold"}>
            $234
          </Typo>
        </View>

        {/* Total expence */}
        <View style={styles.stats}>
          {/* income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowDown
                  size={verticalScale(15)}
                  weight="bold"
                  color={colors.black}
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Income
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.green} fontWeight={"600"}>
                234567
              </Typo>
            </View>
          </View>
          {/* expense */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowUp
                  size={verticalScale(15)}
                  weight="bold"
                  color={colors.black}
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Expense
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.rose} fontWeight={"600"}>
                234567
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  bgStyle: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "88%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingX._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._7,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
    statsIcon: {
        backgroundColor: colors.neutral300,
        padding: spacingX._3,
        borderRadius:50
  },
});

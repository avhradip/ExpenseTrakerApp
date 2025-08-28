import Typo from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import { WalletPropsType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const WalletItem: React.FC<WalletPropsType> = ({ wallet, index }) => {
  const router = useRouter();

  const openWallet = () => {
    router.push({
      pathname: "/(modals)/walletModal",
      params: {
        id: wallet?.id,
        name: wallet?.name,
      },
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 150)
        .springify()
        .duration(400)}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={openWallet}
        activeOpacity={0.7}
      >
        <View>
          <Typo fontWeight="600">{wallet.name}</Typo>
          <Typo color={colors.neutral400}>Rs: {wallet.amount ?? 0}</Typo>
        </View>
        <Icons.CaretRight
          size={verticalScale(20)}
          weight="bold"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacingY._15,
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    marginBottom: spacingY._10,
  },
});

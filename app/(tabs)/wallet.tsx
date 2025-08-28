import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import WalletItem from "@/components/WealetItems"; // ✅ assume you created it
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const Wallet = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    data: wallets,
    error,
    loading,
  } = useFetchData<WalletType>(
    "wallets",
    user?.uid ? [where("uid", "==", user.uid), orderBy("created", "desc")] : [] // ✅ don’t query until uid is ready
  );

  const getTotalBalance = () => wallets.reduce((sum, w) => sum + (w.amount ?? 0), 0);
  

  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* Balance View */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icons.CurrencyInr
                size={verticalScale(40)}
                color={colors.white}
                weight="bold"
                style={{ marginRight: 0 }} // 👈 instead of gap
              />
              <Typo size={45} fontWeight="500">
                {getTotalBalance().toFixed(2)}
              </Typo>
            </View>

            <Typo size={14} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        {/* Wallets List */}
        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo>My Wallets</Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/walletModal")}
            >
              <Icons.PlusCircle
                weight="fill"
                color={colors.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>

          {loading && <Loading />}
          {error && <Typo color="red">{error}</Typo>}

          <FlatList
            data={wallets}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            // contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <WalletItem
                wallet={item}
                index={index}
              />
            )}
            ListEmptyComponent={!loading ? <Typo>No wallets found</Typo> : null}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  // list: {
  //   backgroundColor: colors.green,
  // },
});

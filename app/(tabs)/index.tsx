import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { signOut } from "firebase/auth";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import HomeCard from "@/components/HomeCard";
import TransactionList from "@/components/TransactionList";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleOnpress = () => {
    router.push("/(modals)/transactionModal")
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typo size={16} color={colors.neutral400}>
              Hello,
            </Typo>
            <Typo size={16} fontWeight={"600"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        {/* Scroll Content */}
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <HomeCard />

          <TransactionList
            data={[]}
            loading={false}
            emptyListMessage={"No Transaction added yet!"}
            title="Transactions"
          />
        </ScrollView>

        {/* Floating Button */}
        <Button style={styles.floatingButton} onPress={handleOnpress}>
          <Icons.Plus size={20} weight="bold" color={colors.black} />
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  scrollViewStyle: {
    paddingBottom: verticalScale(100), // extra space so FAB doesn’t overlap last item
    // marginTop: spacingY._10,
    // gap: verticalScale(30),
  },
  floatingButton: {
    height: verticalScale(55),
    width: verticalScale(55),
    borderRadius: 100,
    backgroundColor: colors.primary, // add a background color if needed
    position: "absolute",
    bottom: verticalScale(100),
    right: verticalScale(30),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});

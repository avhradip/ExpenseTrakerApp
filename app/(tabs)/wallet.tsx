import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import React from "react";
import { StyleSheet, View } from "react-native";

const Wallet = () => {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Typo>Wallet</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({});

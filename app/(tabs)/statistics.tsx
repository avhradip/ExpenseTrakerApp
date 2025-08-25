import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import React from "react";
import { StyleSheet, View } from "react-native";

const Statistics = () => {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Typo>Statistics</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Statistics;

const styles = StyleSheet.create({});

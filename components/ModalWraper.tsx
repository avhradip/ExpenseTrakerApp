import { colors } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ModalWraper = ({
  style,
  children,
  bg = colors.neutral800,
}: ModalWrapperProps) => {
  return (
    <View>
      <Text>ModalWraper</Text>
    </View>
  );
};

export default ModalWraper;

const styles = StyleSheet.create({});

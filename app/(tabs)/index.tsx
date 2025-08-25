import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, View } from "react-native";

const Home = () => {

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper>
      <View>
        <Typo>Home</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});

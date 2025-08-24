import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text>Home</Text>
        <Button onPress={handleLogout}>
          <Typo>Logout</Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});

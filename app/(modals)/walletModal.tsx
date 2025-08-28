import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWraper from "@/components/ModalWraper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

import { useOldWalletParams } from "@/hooks/useOldWalletParams";

import * as Icons from "phosphor-react-native";

const walletModal = () => {
  const { user, updateUserData } = useAuth();
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const oldWallet = useOldWalletParams();

  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({
        name: oldWallet?.name,
      });
    }
  }, []);

  const onSubmit = async () => {
    let { name } = wallet;

    if (!name.trim()) {
      Alert.alert("Wallet", "Plese fill all the fields");
      return;
    }

    const data: WalletType = {
      name,
      uid: user?.uid,
    };

    if (oldWallet?.id) data.id = oldWallet?.id;

    setLoading(true);
    const res = await createOrUpdateWallet(data);
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  const onDelete = async () => {
    if (!oldWallet?.id) return
    setLoading(true)
    const res = await deleteWallet(oldWallet?.id)
    if (res.success) {
      router.back()
    } else {
      Alert.alert("Wallet",res.msg)
    }
  }

  const showDeleteAlert = () => {
    Alert.alert(
      "Confirm",
      "Are you sure ou want to do this? \nThis action will remove all the transactions related to this wallet",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel delete"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(),
          style: "destructive",
        }
      ]
    );}
  return (
    <ModalWraper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>

        { oldWallet?.id && !loading && <Button style={styles.deleteButton} onPress={()=>showDeleteAlert()}>
          <Icons.Trash
            weight="bold"
            color={colors.white}
            size={verticalScale(24)}
          />
        </Button>}

        <Button onPress={onSubmit} style={{ flex: 1 }} loading={loading}>
          <Typo color={colors.black} fontWeight={"600"}>
            {oldWallet?.id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWraper>
  );
};

export default walletModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
    // paddingVertical:spacingY._20
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow: "hidden",
    // position:"relative"
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    marginBottom: spacingY._20,
    gap: spacingY._7,
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    padding: spacingY._10,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  deleteButton: {
    backgroundColor: colors.rose,
    paddingHorizontal:spacingX._15
  },
});

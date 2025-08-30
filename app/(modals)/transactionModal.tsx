import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalWraper from "@/components/ModalWraper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { TransactionType, WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

import { useOldWalletParams } from "@/hooks/useOldWalletParams";

import { expenseCategories, transactionTypes } from "@/constants/data";
import useFetchData from "@/hooks/useFetchData";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";

const TransactionModal = () => {
  const { user } = useAuth();
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    transactionId: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const oldWalletTransaction = useOldWalletParams();

  const {
    data: wallets,
    error: walletsError,
    loading: walletLoading,
  } = useFetchData<WalletType>(
    "wallets",
    user?.uid ? [where("uid", "==", user.uid), orderBy("created", "desc")] : [] // ✅ don’t query until uid is ready
  );

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate || transaction?.date;
    setTransaction({ ...transaction, date: currentDate });
    setShowDatePicker(false)
  };

  //   useEffect(() => {
  //     if (oldWalletTransaction?.id) {
  //       setTransaction({
  //         name: oldWalletTransaction?.name,
  //       });
  //     }
  //   }, []);

  const onSubmit = async () => {
    //     let { name } = transaction;
    //     if (!name.trim()) {
    //       Alert.alert("Wallet", "Plese fill all the fields");
    //       return;
    //     }
    //     const data: WalletType = {
    //       name,
    //       uid: user?.uid,
    //     };
    //     if (oldWalletTransaction?.id) data.id = oldWalletTransaction?.id;
    //     setLoading(true);
    //     const res = await createOrUpdateWallet(data);
    //     setLoading(false);
    //     if (res.success) {
    //       router.back();
    //     } else {
    //       Alert.alert("User", res.msg);
    //     }
    //   };
    //   const onDelete = async () => {
    //     if (!oldWalletTransaction?.id) return;
    //     setLoading(true);
    //     const res = await deleteWallet(oldWalletTransaction?.id);
    //     if (res.success) {
    //       router.back();
    //     } else {
    //       Alert.alert("Wallet", res.msg);
    //     }
  };

  const showDeleteAlert = () => {
    // Alert.alert(
    //   "Confirm",
    //   "Are you sure ou want to do this? \nThis action will remove all the transactions related to this transaction",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("cancel delete"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "Delete",
    //       onPress: () => onDelete(),
    //       style: "destructive",
    //     },
    //   ]
    // );
  };
  return (
    <ModalWraper>
      <View style={styles.container}>
        <Header
          title={
            oldWalletTransaction?.id ? "Update Transaction" : "New Transaction"
          }
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          {/* transaction type */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Type</Typo>
            {/* dropdowne hear */}
            <Dropdown
              style={styles.dropdown}
              activeColor={colors.neutral700}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Type"}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainer}
              containerStyle={styles.listContainer}
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* wallets */}

          {/* wallets */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet</Typo>
            <Dropdown
              style={styles.dropdown}
              activeColor={colors.neutral700}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={wallets.map((wallet) => ({
                label: `${wallet?.name} (₹${wallet.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Wallet"
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainer}
              containerStyle={styles.listContainer}
              value={transaction.walletId}
              onChange={(item) => {
                setTransaction({ ...transaction, walletId: item.value || "" }); // ✅ fixed
              }}
            />
          </View>

          {/* expense categories */}

          {transaction.type === "expense" && (
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Expense Categories</Typo>
              {/* dropdowne hear */}
              <Dropdown
                style={styles.dropdown}
                activeColor={colors.neutral700}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Expense Categories"}
                itemTextStyle={styles.itemTextStyle}
                itemContainerStyle={styles.itemContainer}
                containerStyle={styles.listContainer}
                value={transaction.category}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    category: item.value || "",
                  });
                }}
              />
            </View>
          )}

          {/* date picker */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Date</Typo>

            {/* {!showDatePicker && ( */}
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Typo size={14}>
                {(transaction.date as Date).toLocaleDateString()}
              </Typo>
            </Pressable>
            {/* )} */}

            {showDatePicker && (
              <View>
                <DateTimePicker
                  themeVariant="dark"
                  value={transaction.date as Date}
                  textColor={colors.white}
                  mode="date"
                  display="calendar"
                  onChange={onDateChange}
                />
              </View>
            )}

            {/* iOS Done button */}

            {Platform.OS === "ios" && (
              <TouchableOpacity style={styles.doneBtn} onPress={() => setShowDatePicker(false)}>
                <Typo size={15} fontWeight={"500"} >
                  Done
                </Typo>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {oldWalletTransaction?.id && !loading && (
          <Button style={styles.deleteButton} onPress={() => showDeleteAlert()}>
            <Icons.Trash
              weight="bold"
              color={colors.white}
              size={verticalScale(24)}
            />
          </Button>
        )}

        <Button onPress={onSubmit} style={{ flex: 1 }} loading={loading}>
          <Typo color={colors.black} fontWeight={"600"}>
            {oldWalletTransaction?.id
              ? "Update Transaction"
              : "Add Transaction"}
          </Typo>
        </Button>
      </View>
    </ModalWraper>
  );
};

export default TransactionModal;

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
    // marginBottom: spacingY._20,
    gap: spacingY._7,
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    // padding: spacingY._10,
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
    paddingHorizontal: spacingX._15,
  },
  dropdown: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  placeholderStyle: {
    color: colors.white,
  },
  selectedTextStyle: {
    fontSize: verticalScale(14),
    color: colors.white,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 8,
  },
  iconStyle: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
  itemTextStyle: {
    color: colors.white,
  },
  itemContainer: {
    backgroundColor: colors.neutral900,
  },
  listContainer: {
    backgroundColor: colors.neutral900,
    borderColor: colors.neutral500,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    shadowColor: colors.neutral500,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dateStyle: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
  },
  dateButton: {
    height: verticalScale(54),
    borderRadius: radius._15,
    backgroundColor: colors.neutral800,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.neutral300,
  },
  doneBtn: {
    alignSelf: "flex-end",
    marginTop: 8,
    padding: 8,
    backgroundColor: colors.neutral700,
    borderRadius: 8,
  },
});

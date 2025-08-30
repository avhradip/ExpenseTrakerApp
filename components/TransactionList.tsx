import { colors, spacingY } from "@/constants/theme";
import { TransactionListType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import Loading from "./Loading";
import TransactionItem from "./TransactionItems";
import Typo from "./Typo";

const TransactionList = ({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) => {
  const handleClick = () => {
    //todo
  };

  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"}>
          TransactionList
        </Typo>
      )}
      <View>
        <FlashList
          data={[1,2,3,4,5,6,7,8,9,10]}
          renderItem={({ item, index }) => (
            <TransactionItem
              item={item}
              index={index}
              handleClick={handleClick}
            />
          )}
          estimatedItemSize={70} // required for FlashList performance
          contentContainerStyle={styles.listContent}
        />

        {!loading && data.length === 0 && (
          <Typo
            size={15}
            color={colors.neutral400}
            style={{ textAlign: "center", marginTop: spacingY._15 }}
          >
            {emptyListMessage}
          </Typo>
        )}

        {loading && (
          <View style={{ top: verticalScale(100) }}>
            <Loading />
          </View>
        )}
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
  listContent: {
    paddingBottom: spacingY._20,
    paddingTop: spacingY._10,
  },
});

import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ModalWraper from "@/components/ModalWraper";
import Typo from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const privacyPolicyModal = () => {
  return (
    <ModalWraper>
      <View style={styles.container}>
        <Header
          title="Privacy Policy"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Typo color={colors.neutral200} style={styles.paragraph}>
            We value your privacy. This application does not share your personal
            information with third parties without your consent. Data collected
            is only used to improve your experience and provide app
            functionality.
          </Typo>

          <Typo color={colors.neutral200} style={styles.paragraph}>
            By using this app, you agree to the collection and use of
            information in accordance with this policy.
          </Typo>

          <Typo color={colors.neutral200} style={styles.paragraph}>
            You may request data deletion or account removal by contacting
            support.
          </Typo>
        </ScrollView>
      </View>
    </ModalWraper>
  );
};

export default privacyPolicyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  content: {
    paddingTop: spacingY._40,
    paddingBottom: spacingY._10,
    gap: verticalScale(15),
  },
  paragraph: {
    lineHeight: verticalScale(20),
    fontSize: verticalScale(10),
  },
});

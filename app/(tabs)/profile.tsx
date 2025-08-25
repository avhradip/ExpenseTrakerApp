import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/imageServices";
import { accountOptionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";


const Profile = () => {

  const router = useRouter()
  const { user } = useAuth();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/(modals)/profileModal",
    },
    {
      title: "Setings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      bgColor: "#059669",
      // routeName: "/(modals)/profileModal",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      bgColor: colors.neutral600,
      // routeName: "/(modals)/profileModal",
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11b48",
      //  routeName: "/(modals)/profileModal",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  const showLogoutAlert = () => {
    Alert.alert("Comform", "Are you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Logout"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const handlePress = (item: accountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    }

    if (item.routeName) {
      router.push(item.routeName)
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" />
        <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            {/* user Image */}
            <Image
              source={getProfileImage(user?.image)}
              style={styles?.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          {/* name */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} fontWeight={"600"} color={colors.neutral100}>
              {user?.email}
            </Typo>
          </View>
        </View>
        {/* acount options */}
        <View style={styles.acountOptions}>
          {accountOptions.map((item, index) => {
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 50)
                  .springify()
                  .damping(14)}
                style={styles.listItems}
                key={index.toString()}
              >
                <TouchableOpacity
                  style={styles?.flexRow}
                  onPress={() => handlePress(item)}
                >
                  <View
                    style={[
                      styles.listIcons,
                      {
                        backgroundColor: item?.bgColor,
                      },
                    ]}
                  >
                    {item.icon && item.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                    {item?.title}
                  </Typo>
                  <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
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
  acountOptions: {
    marginTop: spacingY._35,
  },
  listItems: {
    marginBottom: verticalScale(17),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
  listIcons: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
});

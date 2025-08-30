import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import "../global.css";

const StackLayout = () => {
  // const pathName = usePathname();

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log("Current Route:", pathName);
  //   console.log('====================================');
  // }, [pathName]);

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen
        name="(modals)/profileModal"
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(modals)/walletModal"
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(modals)/transactionModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

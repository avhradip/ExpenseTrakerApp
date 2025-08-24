import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import "../global.css";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout/>
    </AuthProvider>
  )
}

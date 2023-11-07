import { StyleSheet } from "react-native";
import { BaseNavigator } from "./src/navigations/baseNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/designSystem/theme";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <BaseNavigator />
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

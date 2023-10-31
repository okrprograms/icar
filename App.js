import { StyleSheet} from "react-native";
import { BaseNavigator } from "./src/navigations/baseNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/designSystem/theme";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <BaseNavigator />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
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

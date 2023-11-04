import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const RNLSpinner = ({ isLoading = false }) => {
  return (
    <Spinner
      visible={isLoading}
      textContent={"Loading..."}
      animation = {"fade"}
      overlayColor="rgba(255, 0, 0, 0.2)"
      textStyle={styles.spinnerTextStyle}
    />
  );
};

export default RNLSpinner;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

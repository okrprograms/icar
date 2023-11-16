import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Register from "../screens/register";
import Login from "../screens/login";
import Profile from "../screens/profile";

//to hide and show header then set false/true to headerShown in screenOptions &&& you can also set headerShown in BaseStack.Screen Options

const BaseStack = createNativeStackNavigator();
function BaseNavigator() {
  return (
    <NavigationContainer>
      <BaseStack.Navigator
      //   screenOptions={{ headerShown: false }}
      >
        <BaseStack.Screen name={"Login"} component={Login} />
        <BaseStack.Screen name={"Register"} component={Register} />
        <BaseStack.Screen name={"Home"} component={Home} />
        <BaseStack.Screen name={"Profile"} component={Profile} />
        {/* <BaseStack.Screen name={"SkeletonLoader"} component={SkeletonLoader} /> */}
      </BaseStack.Navigator>
    </NavigationContainer>
  );
}

export { BaseNavigator };

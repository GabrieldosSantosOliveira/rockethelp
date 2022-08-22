import { NavigationContainer } from "@react-navigation/native";

import { SingIn } from "../screens/SingIn";
import { AppRoutes } from "./app.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};
export { Routes };

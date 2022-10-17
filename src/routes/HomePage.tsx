import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/SignUp';
import { SingIn } from '../screens/SingIn';

const { Navigator, Screen } = createNativeStackNavigator();
const HomePage = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SingIn" component={SingIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};
export { HomePage };

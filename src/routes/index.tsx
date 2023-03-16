import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';
import { HomePage } from './HomePage';

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });
    return subscriber;
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <HomePage />}
    </NavigationContainer>
  );
};
export { Routes };

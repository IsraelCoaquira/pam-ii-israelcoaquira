import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Listas from './screens/ListaDeServicos';

export default function App() {

  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, }}>
        <Stack.Screen name='lista' component={Listas}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
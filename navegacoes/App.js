import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Principal from './paginas'; "./paginas/index";

export default function App() {
  return (
    <Principal />
  );
  function pagina2() {
    <View style = {styles.container}>

    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

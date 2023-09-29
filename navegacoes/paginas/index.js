import {View, Text, Pressable, StyleSheet} from "react-native";
import React from "react";
import { Link } from 'expo-router';

export default function Principal() {
  return (
    <View style = {styles.container}>
      <Link href="/sobre">Sobre</Link>

      <Link href="/fandangos/pagininha">pagina secreta</Link>


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
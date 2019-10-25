import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

console.tron.log('dasda');

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react native</Text>
      <Text style={styles.welcome}>Abadixo</Text>
    </View>
  );
};

export default App;

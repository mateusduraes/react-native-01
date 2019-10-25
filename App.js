import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to react native</Text>
      <Text style={styles.welcome}>Abaixdadadao</Text>
    </View>
  );
};

export default App;

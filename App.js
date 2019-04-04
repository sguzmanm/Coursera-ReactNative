import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    return (
      <Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import{ConfigureStore} from './redux/configureStore';

const store=ConfigureStore();


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Main/>
      </Provider>
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

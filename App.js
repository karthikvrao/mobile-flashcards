import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Root from './components/Root';
import reducer from './reducers';
import { setLocalNotifications } from './utils/helpers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default class App extends Component {
  componentDidMount() {
    setLocalNotifications();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="black"
            barStyle="light-content"
          />
          <Root />
        </View>
      </Provider>
    );
  }
}
console.disableYellowBox = true;

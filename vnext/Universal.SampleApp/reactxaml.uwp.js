/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {TextBlock, Grid, StackPanel} from 'react-native-windows';

export default class Bootstrap extends Component {
  render() {
    return (
      <StackPanel>
        <TextBlock Text="Hello World Reactive XAML!" />
        <TextBlock Text="TextBlock #2" />
      </StackPanel>
    );
  }
}

AppRegistry.registerComponent('Bootstrap', () => Bootstrap);

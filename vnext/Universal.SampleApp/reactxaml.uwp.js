/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {TextBlock, Grid, StackPanel, Rectangle} from 'react-native-windows';

export default class Bootstrap extends Component {
  render() {
    return (
      <Grid BorderBrush="Black" BorderThickness="3" CornerRadius="10">
        <StackPanel
          Orientation="Horizontal"
          Background="Red"
          BorderThickness="0"
          BorderBrush="Green">
          <TextBlock Text="Hello World Reactive XAML!" />
          <TextBlock Text="TextBlock #2" VerticalAlignment="Center" />
          <Rectangle
            Fill="Green"
            Width="50"
            Height="50"
            RadiusX="10"
            RadiusY="10"
          />
        </StackPanel>
      </Grid>
    );
  }
}

AppRegistry.registerComponent('Bootstrap', () => Bootstrap);

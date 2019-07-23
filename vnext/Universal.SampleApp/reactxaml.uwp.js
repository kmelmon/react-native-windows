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
  constructor() {
    super();
    this.state = {
      pointerEntered: false,
      pointerPressed: false,
    };
  }

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
            Fill={this.state.pointerEntered ? 'Green' : 'Yellow'}
            Width="50"
            Height="50"
            RadiusX="10"
            RadiusY="10"
            PointerEntered={this.onPointerEnter}
            PointerExited={this.onPointerExit}
          />
          <Rectangle
            Fill={this.state.pointerPressed ? 'Green' : 'Yellow'}
            Width="50"
            Height="50"
            RadiusX="10"
            RadiusY="10"
            PointerPressed={this.onPointerPressed}
            PointerReleased={this.onPointerReleased}
          />
        </StackPanel>
      </Grid>
    );
  }

  onPointerEnter = () => {
    this.setState({pointerEntered: true});
  };
  onPointerExit = () => {
    this.setState({pointerEntered: false});
  };
  onPointerPressed = () => {
    this.setState({pointerPressed: true});
  };
  onPointerReleased = () => {
    this.setState({pointerPressed: false});
  };
}

AppRegistry.registerComponent('Bootstrap', () => Bootstrap);

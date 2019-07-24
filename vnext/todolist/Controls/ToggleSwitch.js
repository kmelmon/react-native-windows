/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Grid, Rectangle} from 'react-native-windows';

export default class ToggleSwitch extends Component {
  constructor() {
    super();
    this.state = {
      on: false,
      pointerDown: false,
    };
  }

  render() {
    return (
      <Grid
        Width="50"
        Height="20"
        Background={this.state.on ? 'Blue' : 'Transparent'}
        BorderBrush={this.state.on ? 'Blue' : 'Black'}
        BorderThickness="2"
        CornerRadius="10"
        PointerPressed={this.onPointerPressed}
        PointerReleased={this.onPointerReleased}>
        <Rectangle
          HorizontalAlignment="Left"
          Translation={this.state.on ? '33,0,0' : '3,0,0'}
          Fill={this.state.on ? 'White' : 'Black'}
          Width="10"
          Height="10"
          RadiusX="5"
          RadiusY="5"
        />
      </Grid>
    );
  }

  onPointerPressed = () => {
    this.setState({pointerDown: true});
  };

  onPointerReleased = () => {
    if (this.state.pointerDown) {
      this.updateToggleState(!this.state.on);
    }
    this.setState({pointerDown: false});
  };

  updateToggleState(toggleState) {
    this.setState({on: toggleState});
    this.props.onToggleSwitchChanged(toggleState);
  }
}

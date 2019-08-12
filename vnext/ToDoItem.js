/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StackPanel, TextBlock} from 'react-native-windows';
import ToggleSwitch from './Controls/ToggleSwitch';

export default class ToDoItem extends Component {
  state = {
    name: this.props.task.name,
  };
  /*
  onSetCompleted(value) {
    this.props.item.isCompleted = value;
    this.props.updatePerson();
  }
  */

  render() {
    return (
      <StackPanel
        Orientation="Horizontal"
        Background={this.state.showHover ? 'AliceBlue' : 'Transparent'}
        BorderBrush={this.state.showHover ? 'Blue' : 'Transparent'}
        BorderThickness="1"
        PointerEntered={this.onPointerEntered}
        PointerExited={this.onPointerExited}>
        <ToggleSwitch onToggleSwitchChanged={this.onToggleSwitchChanged} />
        <TextBlock Text={this.state.name} />
      </StackPanel>
    );
  }

  onToggleSwitchChanged = value => {
    this.props.task.isCompleted = value;
    this.props.updateTaskList();
  };

  onPointerEntered = () => {
    this.setState({showHover: true});
  };
  onPointerExited = () => {
    this.setState({showHover: false});
  };
}

/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {StackPanel} from 'react-native-windows';
import ToDoList from './ToDoList';
import SampleData from './data/SampleData';

const initialState = {
  tasks: SampleData.getTasks(),
};

export default class ToDoListApp extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return (
      <StackPanel>
        <ToDoList tasks={this.state.tasks} />
      </StackPanel>
    );
  }

  toggleSwitchChanged(toggleState) {
    this.setState({dude: toggleState});
  }
}

AppRegistry.registerComponent('ToDoListApp', () => ToDoListApp);

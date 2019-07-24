/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StackPanel} from 'react-native-windows';
import ToDoItemList from './ToDoItemList';

export default class ToDoList extends Component {
  state = {
    tasks: this.props.tasks,
  };

  render() {
    return (
      <StackPanel Orientation="Vertical">{this.renderToDoList()}</StackPanel>
    );
  }

  renderToDoList() {
    const items = [];
    var tasks = this.state.tasks;
    for (var i = 0; i < tasks.length; i++) {
      items.push(<ToDoItemList key={i} taskList={tasks[i]} />);
    }
    return items;
  }
}

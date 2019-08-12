/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StackPanel, Grid, TextBlock} from 'react-native-windows';
import ToDoItem from './ToDoItem';
import TaskList from './data/TaskList';

export default class ToDoItemList extends Component {
  state = {
    name: this.props.taskList.name,
    completionRate: this.props.taskList.completionRate,
    pointerPressed: false,
    expanded: true,
  };

  toPercentage(value) {
    return (100 * value).toFixed(0).toString() + '%';
  }

  updateTaskList = () => {
    this.setState({
      completionRate: this.props.taskList.completionRate,
    });
  };

  onPointerPressed = () => {
    this.setState({
      pointerPressed: true,
    });
  };

  onPointerReleased = () => {
    if (this.state.pointerPressed) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  };

  render() {
    return (
      <StackPanel Orientation="Vertical">
        <Grid
          Orientation="Horizontal"
          Background={
            this.state.completionRate === 0
              ? 'Red'
              : this.state.completionRate < 1.0
                ? 'Yellow'
                : 'Green'
          }
          PointerPressed={this.onPointerPressed}
          PointerReleased={this.onPointerReleased}>
          <TextBlock
            FontSize="24"
            Text={this.state.name}
            HorizontalAlignment="Left"
          />
          <TextBlock
            FontSize="24"
            Text={this.toPercentage(this.state.completionRate)}
            HorizontalAlignment="Right"
          />
        </Grid>
        {this.state.expanded && this.renderItems()}
      </StackPanel>
    );
  }

  renderItems() {
    const items = [];
    var tasks = this.props.taskList.tasks;
    for (var i = 0; i < tasks.length; i++) {
      items.push(
        <ToDoItem
          key={i}
          task={tasks[i]}
          updateTaskList={this.updateTaskList}
        />,
      );
    }
    return items;
  }
}

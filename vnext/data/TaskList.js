// © Microsoft Corporation. All rights reserved.

import Task from './Task';

export default class TaskList {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  get completionRate() {
    if (this.tasks.length == 0) {
      return 1.0;
    }

    return this.tasks.filter((t) => t.isCompleted).length / this.tasks.length;
  }

  addTask(name) {
    let task = new Task(name);

    this.tasks.push(task);
  }
}

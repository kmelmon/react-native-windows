// © Microsoft Corporation. All rights reserved.

export default class Task {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}

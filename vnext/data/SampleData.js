// © Microsoft Corporation. All rights reserved.

import TaskList from './TaskList';

const tolkien = new TaskList('J.R.R. Tolkien');
tolkien.addTask('Finish work on Recipes of Middle Earth');
tolkien.addTask('Continue Orc experiments');
tolkien.addTask('Replenish pipe tabacco supplies');

const columbus = new TaskList('Christopher Columbus');
columbus.addTask('Investor meeting to secure funding');
columbus.addTask('Practice sea navigation techniques');
columbus.addTask('Test whether dining table is round or flat');
columbus.addTask('Attend geography class');

const caesar = new TaskList('Julius Caesar');
caesar.addTask('Work on Senate speech (due Mar 15)');
caesar.addTask('Experiment with various salad dressings');
caesar.addTask('Pose for sculpture');
caesar.addTask('Coffee with Brutus');

const vader = new TaskList('Darth Vader');
vader.addTask('Meet with color consultant for Death Star decor');
vader.addTask('Attend anger management class');
vader.addTask('Lead troops in deep breathing exercises');

const tasks = [
  tolkien,
  columbus,
  caesar,
  vader,
];

module.exports = {
  getTasks: () => tasks.concat(),
};

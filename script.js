"use strict";

let taskCount = 0;

// Add Task button
let addTaskButton = document.querySelector("#add-task-button");

// Setting Function for Adding Tasks
addTaskButton.addEventListener("click", () => {
  // Getting Task Details
  const taskDetails = fetchingTaskDetails();

  //   Cheking for valid Task
  const isTaskValid = checkForValidTask(taskDetails);

  //adding task to dom if task is valid
  isTaskValid && addTaskIntoDom(taskDetails);

  //   Updating Task Count in Html Page
  displayTaskCount();

  //   Resetting Task inputs
  resettingInputs();
});

/* Functions for Indivisual Tasks */

// Function for Fetching Task Data
function fetchingTaskDetails() {
  let taskName = document.querySelector("#task-input-box").value;
  let taskCategory = document.querySelector("#task-category").value;

  return { taskName, taskCategory };
}

// Function for validating task
function checkForValidTask({ taskName }) {
  taskName = taskName.trim();

  if (!Boolean(taskName)) alert("Please Enter Task Name");
  return Boolean(Boolean(taskName));
}

function addTaskIntoDom(taskDetails) {
  // Creating indivisual task
  let task = createTask(taskDetails);

  //adding task to dom
  document.querySelector("#task-list-container").appendChild(task);

  //Updating Task Counter
  taskCount++;
}


// function for creating indivisual task
function createTask({ taskName, taskCategory }) {
  //creating task details container
  let taskContainer = document.createElement("div");

  //setting styles for task-container
  taskContainer.classList.add("indivisual-task", "not-completed");

  //creating task inside elements
  let completeButton = document.createElement("button");
  let taskNameContainer = document.createElement("p");
  let categoryTag = document.createElement("span");
  let deleteButton = document.createElement("button");

  // setting task details
  taskNameContainer.textContent = taskName;
  categoryTag.textContent = taskCategory;

  // Adding Functions to for complete and delete task
  completeButton.addEventListener("click", (event) => {
    completeTask(event.target.parentNode);
  });

  deleteButton.addEventListener("click", (event) => {
    deleteTask(event.target.parentNode);
  });

  //setting default values and styling for task elements
  completeButton.classList.add("complete-task-button");
  taskNameContainer.classList.add("task-name");
  categoryTag.classList.add("category-display", taskCategory.toLowerCase());
  deleteButton.classList.add("delete-task");

  //adding task elements to task container
  taskContainer.append(
    completeButton,
    taskNameContainer,
    categoryTag,
    deleteButton
  );
  return taskContainer;
}

//displaying task count
function displayTaskCount() {
  document.querySelector("#counter").textContent = taskCount;
}

//Resetting textbox for dropdown button
function resettingInputs() {
  // Resetting Input box
  document.querySelector("#task-input-box").value = "";
  // Resetting Category
  document.querySelector("#task-category").value = "None";
}

// Function For Complete a task
function completeTask(indivisualTask) {
  let isNotCompletedTask = indivisualTask.classList.contains("not-completed");
  console.log(isNotCompletedTask);

  if (isNotCompletedTask) {
    indivisualTask.classList.remove("not-completed");
    indivisualTask.classList.add("completed");
  } else {
    indivisualTask.classList.remove("completed");
    indivisualTask.classList.add("not-completed");
  }
}

// Function For Delete a task
function deleteTask(indivisualTask) {
  let confirmDelete = confirm("are you sure you want to delete this task");
  if (confirmDelete) {
    indivisualTask.remove();
    taskCount--;
    displayTaskCount();
  }
  return;
}

/* ----------------------- Sorting Functions - STARTED ---------------*/

// All sorting Option Logic
let allSortingOption = document.querySelector("#showAllTaskButton");
allSortingOption.addEventListener("click", () => {
  //removing styling from previous sorting option
  removePreviousSorting();

  // adding styling for selected sorting option
  allSortingOption.classList.add("selected-sorting-option");

  // Removing Display none styling for All Tasks
  let taskList = getAllTask();
  taskList.forEach((indivisualTask) => {
    indivisualTask.classList.remove("hidden");
  });
});

// Pending Task -- sorting Option Logic
let pendingSortingOption = document.querySelector("#showPendingTaskButton");
pendingSortingOption.addEventListener("click", () => {
  //removing styling from previous sorting option
  removePreviousSorting();

  // adding styling for selected sorting option
  pendingSortingOption.classList.add("selected-sorting-option");

  let taskList = getAllTask();

//   hiding the completed task and making visible the pending tasks
  taskList.forEach((indivisualTask) => {
    if (indivisualTask.classList.contains("completed")) {
      indivisualTask.classList.add("hidden");
    } else {
      indivisualTask.classList.remove("hidden");
    }
  });
});

// Completed Task -- sorting Option Logic
let completedSortingOption = document.querySelector("#showCompletedTaskButton");
completedSortingOption.addEventListener("click", () => {
  //removing styling from previous sorting option
  removePreviousSorting();

  // adding styling for selected sorting option
  completedSortingOption.classList.add("selected-sorting-option");

  let taskList = getAllTask();
  taskList.forEach((indivisualTask) => {
    if (indivisualTask.classList.contains("not-completed")) {
      indivisualTask.classList.add("hidden");
    } else {
      indivisualTask.classList.remove("hidden");
    }
  });
});

/* -----------------------Additional Features Functions - STARTED ---------------*/
// Function for Completing All Tasks
let completeAllButton = document.querySelector("#CompleteAllButton");
completeAllButton.addEventListener("click", () => {
  // getting all tasks
  let taskList = getAllTask();
  taskList.forEach((indivisualTask) => {
    if (indivisualTask.classList.contains("not-completed")) {
      completeTask(indivisualTask);
    }
  });
});

// Function for deleting Completed Tasks
let clearCompletedButton = document.querySelector("#ClearCompletedButton");
clearCompletedButton.addEventListener("click", () => {
  // getting all tasks
  let taskList = getAllTask();
  taskList.forEach((indivisualTask) => {
    if (indivisualTask.classList.contains("completed")) {
      indivisualTask.remove();
      taskCount--;
    }
  });
  displayTaskCount();
});
/* -----------------------Additional Features Functions - ENDED ---------------*/

// Function for Fetching All tasks from the Dom
function getAllTask() {
  return document.querySelectorAll(".indivisual-task");
}

// Function to remove styling from previous sorting option
function removePreviousSorting() {
    document
      .querySelector(".selected-sorting-option")
      .classList.remove("selected-sorting-option");
}

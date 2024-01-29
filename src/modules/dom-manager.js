"use strict";

import { projects as projectsAndTodosManager } from "./projects-and-todos-manager.js";
import { format } from "date-fns";

// Export the updated data index of last project clicked
// This data index will be used to add todos to a specific project
export let dataIndexOfLastProjectClicked = null;

// FUNCTIONS RESPONSIBLE FOR MANAGING PROJECTS
// Shows or hides both the form to input Project Name and the "Add Project" button
const toggleHideOrShowInputForProjectName = () => {
    const addProjectButton = document.getElementById("add-project-button");
    const inputFormForProjectName = document.getElementById("project-name-input-form");

    if (inputFormForProjectName.style.display === "flex" && addProjectButton.style.display === "none") {
        inputFormForProjectName.style.display = "none";
        addProjectButton.style.display = "flex";
        return;
    }

    inputFormForProjectName.style.display = "flex";
    addProjectButton.style.display = "none";
};

const toggleHideOrShowInputForToDoInfo = () => {
    const toDoInformationForm = document.querySelector(".todo-input-information-container");

    if (toDoInformationForm.style.display === "none") {
        toDoInformationForm.style.display = "block";
        return;
    }

    toDoInformationForm.style.display = "none";
};

const toggleHideOrShowInputToEditToDoInfo = () => {
    const toDoInformationForm = document.querySelector(".todo-edit-information-container");

    if (toDoInformationForm.style.display === "none") {
        toDoInformationForm.style.display = "block";
        return;
    }

    toDoInformationForm.style.display = "none";
};

// Display the "add task" button on the page
const toggleAddTaskButton = (show) => {
    const addTaskButton = document.querySelector(".add-task-button");
    addTaskButton.style.display = show ? "block" : "none";
};

// Define a function to handle project name clicks
const projectNameClickEventHandler = () => {
    // Update the tasks header with the project name
    const updateProjectsHeaderOnPage = (index) => {
        const projectsArray = projectsAndTodosManager.getProjects();
        const tasksHeader = document.querySelector(".tasks-container .tasks-header");
        tasksHeader.textContent = projectsArray[index].projectName;
    };

    // Handle a project name click event
    const projectNameClicked = (event) => {
        dataIndexOfLastProjectClicked = event.target.dataset.index;
        updateProjectsHeaderOnPage(dataIndexOfLastProjectClicked);
        displayTodosOfAProject(dataIndexOfLastProjectClicked);
        toggleAddTaskButton(true);
    };

    return {
        projectNameClicked,
    };
};

// Depending on the boolean passed as an argument, this function will add or
// remove the css class "disabled" from each project name and the Add Project btn,
// preventing changing and adding projects when editing a specific todo
const preventAddOrChangeProject = (status) => {
    const projects = document.querySelectorAll(".projects li");
    const addProjectBtn = document.getElementById("add-project-button");

    projects.forEach((project) => {
        status ? project.classList.add("disabled") : project.classList.remove("disabled");
    });

    status ? addProjectBtn.classList.add("disabled") : addProjectBtn.classList.remove("disabled");
};

const removeProjectFromDOM = (project) => {
    // Removes a project from the DOM
    project.parentElement.remove();

    // Updates the data-index attribute of all remaining projects in the DOM
    // to reflect their new position in the projectsManager.projects array
    let allProjects = document.querySelectorAll(".project");
    for (let i = 0; i < allProjects.length; i++) {
        allProjects[i].setAttribute("data-index", i);
    }
};

// Function to handle delete project button click
const handleClickOnDeleteProjectButton = (e) => {
    // Remove the project from the DOM
    removeProjectFromDOM(e.target);
    // And remove the project from the projects array
    projectsAndTodosManager.removeProject(e.target.parentElement.dataset.index);

    // Project deleted, so taskCount = 0
    updateProjectTaskCount(0);

    // Clear all todos displayed in the page after deleting the project
    clearTaskList();

    // Returns to initial page displaying all tasks
    displayAllTodos();

    // Hides add task button to prevent adding todos to inexistent project
    toggleAddTaskButton();
};

// Delete project on each project name on the DOM
const createDeleteProjectButton = () => {
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    return deleteBtn;
};

// Create a new list item that hold the name of the project
// The data-index attribute set here on each project in the DOM
// corresponds exactly to the index of the array that holds the Projects
const createListItemWithProjectName = (projectName, index) => {
    let li = document.createElement("li");
    li.textContent = projectName;
    li.setAttribute("data-index", index);
    li.classList.add("project");

    return li;
};

// Function do add an event listener to each list item (project name)
const addEventListenerToProjectNameListItem = (li) => {
    li.addEventListener("click", (e) => {
        // Check if the clicked element is the delete button
        if (e.target.className === "delete-btn") {
            handleClickOnDeleteProjectButton(e);
            return;
        } else {
            const projectsEventHandler = projectNameClickEventHandler();
            projectsEventHandler.projectNameClicked(e);
        }
    });
};

// Function to append a new project name to the DOM
const appendProjectNameToDOM = (projectName, index) => {
    // Select the projects unordered list from the DOM
    const ul = document.querySelector(".projects");

    // Create a new list item with project name and data-index
    const li = createListItemWithProjectName(projectName, index);

    // Add an event listener to each project (list item)
    addEventListenerToProjectNameListItem(li);

    // Create a delete button for the project
    const deleteBtn = createDeleteProjectButton();

    li.appendChild(deleteBtn);
    ul.append(li);

    // Toggle the visibility of the input for the project name
    toggleHideOrShowInputForProjectName();
};

// This function will keep track of the number of todos inside a project
const updateProjectTaskCount = (numOfToDosInsideAProject) => {
    const taskCountSpan = document.getElementById("task-count");
    taskCountSpan.textContent = numOfToDosInsideAProject;
};

// FUNCTIONS RESPONSIBLE FOR MANAGING TO DOS

// This function changes the todo status as completed or not
const onTodoCheckboxChange = (e) => {
    const isCompleted = e.target.checked;
    const projectIndex = e.target.closest(".todo").dataset.projectIndex;
    const todoIndex = e.target.closest(".todo").dataset.todoIndex;

    projectsAndTodosManager.toggleTodoCompletion(projectIndex, todoIndex, isCompleted);
};

const clearTaskList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    return taskList;
};

// This function, when called, creates elements to display all the todos inside a specific project
const displayTodosOfAProject = (dataIndex) => {
    const projectsAndTodosArray = projectsAndTodosManager.getProjects();

    const taskList = clearTaskList();

    const ul = document.createElement("ul");

    for (let i = 0; i < projectsAndTodosArray[dataIndex].todos.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-project-index", dataIndex);
        li.setAttribute("data-todo-index", i);
        li.className = "todo";

        // Todo left side
        const todoLeftSide = document.createElement("div");
        todoLeftSide.className = "todo-left-side";

        // Create a div that will contain the todo checkbox
        const checkboxDiv = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", `project[${dataIndex}]-todo[${i}]`);
        checkbox.setAttribute("name", `todo-checkbox`);

        // Each todo checkbox will have its own event listener
        // This allows to toggle each todo as completed or not
        checkbox.addEventListener("change", onTodoCheckboxChange);

        const todoIsChecked = projectsAndTodosArray[dataIndex].todos[i].isCompleted;
        if (todoIsChecked) {
            checkbox.checked = true;
        }

        checkboxDiv.append(checkbox);

        // Create a div that will contain the todo title and description
        const todoTitleAndDescriptionDiv = document.createElement("div");
        todoTitleAndDescriptionDiv.classList = "todo-title-and-description-div";

        const todoTitleLabel = document.createElement("label");
        todoTitleLabel.setAttribute("for", `project[${dataIndex}]-todo[${i}]`);
        todoTitleLabel.textContent = projectsAndTodosArray[dataIndex].todos[i].title;

        const todoDescriptionPara = document.createElement("p");
        todoDescriptionPara.className = "todo-description";
        todoDescriptionPara.textContent = projectsAndTodosArray[dataIndex].todos[i].description;
        // Append title and description to the todoTitleAndDescriptionDiv
        todoTitleAndDescriptionDiv.append(todoTitleLabel, todoDescriptionPara);
        // Append the checkbox div, and the title and description div
        todoLeftSide.append(checkboxDiv, todoTitleAndDescriptionDiv);

        // Todo right side
        const todoRightSide = document.createElement("div");
        todoRightSide.className = "todo-right-side";

        const dateString = projectsAndTodosArray[dataIndex].todos[i].dueDate;
        const date = new Date(dateString.replace(/-/g, "/"));

        const dueDate = document.createElement("p");
        dueDate.textContent = format(date, "dd-MM-yyyy");

        const editTodoBtn = document.createElement("button");
        editTodoBtn.className = "edit-to-do";
        editTodoBtn.textContent = "Edit";

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.className = "delete-to-do";
        deleteTodoBtn.textContent = "Delete";

        todoRightSide.append(dueDate, editTodoBtn, deleteTodoBtn);

        li.append(todoLeftSide, todoRightSide);

        ul.append(li);
    }

    taskList.append(ul);

    const numOfTodosInsideProject = projectsAndTodosArray[dataIndex].todos.length;
    updateProjectTaskCount(numOfTodosInsideProject);
};

const displayAllTodos = () => {
    const projectsAndTodosArray = projectsAndTodosManager.getProjects();

    const tasksHeader = document.querySelector(".tasks-container .tasks-header");
    tasksHeader.textContent = "All Tasks";

    const taskList = clearTaskList();

    const ul = document.createElement("ul");

    let tasksCount = 0;

    for (let i = 0; i < projectsAndTodosArray.length; i++) {
        for (let j = 0; j < projectsAndTodosArray[i].todos.length; j++) {
            const li = document.createElement("li");
            li.setAttribute("data-project-index", i);
            li.setAttribute("data-todo-index", j);
            li.className = "todo";

            // Todo left side
            const todoLeftSide = document.createElement("div");
            todoLeftSide.className = "todo-left-side";

            // Create a div that will contain the todo checkbox
            const checkboxDiv = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", `project[${i}]-todo[${j}]`);
            checkbox.setAttribute("name", `todo-checkbox`);

            // Each todo checkbox will have its own event listener
            // This allows to toggle each todo as completed or not
            checkbox.addEventListener("change", onTodoCheckboxChange);

            const todoIsChecked = projectsAndTodosArray[i].todos[j].isCompleted;
            if (todoIsChecked) {
                checkbox.checked = true;
            }

            checkboxDiv.append(checkbox);

            // Create a div that will contain the todo title and description
            const todoTitleAndDescriptionDiv = document.createElement("div");
            todoTitleAndDescriptionDiv.classList = "todo-title-and-description-div";

            const todoTitleLabel = document.createElement("label");
            todoTitleLabel.setAttribute("for", `project[${i}]-todo[${j}]`);
            todoTitleLabel.textContent = projectsAndTodosArray[i].todos[j].title;

            const todoDescriptionPara = document.createElement("p");
            todoDescriptionPara.className = "todo-description";
            todoDescriptionPara.textContent = projectsAndTodosArray[i].todos[j].description;
            // Append title and description to the todoTitleAndDescriptionDiv
            todoTitleAndDescriptionDiv.append(todoTitleLabel, todoDescriptionPara);
            // Append the checkbox div, and the title and description div
            todoLeftSide.append(checkboxDiv, todoTitleAndDescriptionDiv);

            // Todo right side
            const todoRightSide = document.createElement("div");
            todoRightSide.className = "todo-right-side";

            const dateString = projectsAndTodosArray[i].todos[j].dueDate;
            const date = new Date(dateString.replace(/-/g, "/"));

            const dueDate = document.createElement("p");
            dueDate.textContent = format(date, "dd-MM-yyyy");

            const editTodoBtn = document.createElement("button");
            editTodoBtn.className = "edit-to-do";
            editTodoBtn.textContent = "Edit";

            const deleteTodoBtn = document.createElement("button");
            deleteTodoBtn.className = "delete-to-do";
            deleteTodoBtn.textContent = "Delete";

            todoRightSide.append(dueDate, editTodoBtn, deleteTodoBtn);

            li.append(todoLeftSide, todoRightSide);

            ul.append(li);

            tasksCount++;
        }
    }

    taskList.append(ul);

    updateProjectTaskCount(tasksCount);
};

export {
    toggleHideOrShowInputForProjectName,
    appendProjectNameToDOM,
    toggleHideOrShowInputForToDoInfo,
    toggleHideOrShowInputToEditToDoInfo,
    displayTodosOfAProject,
    toggleAddTaskButton,
    preventAddOrChangeProject,
    displayAllTodos,
};

"use strict";

import { projects as projectsAndToDosManager } from "./modules/project-manager.js";
import {
    dataIndexOfLastProjectClicked,
    toggleHideOrShowInputForProjectName,
    toggleHideOrShowInputForToDoInfo,
    toggleHideOrShowInputToEditToDoInfo,
    toggleAddTaskButton,
    preventAddOrChangeProject,
    displayTodos,
    toggleStarColor,
} from "./modules/dom-manager.js";
import { handleMenuButtonsClick } from "./modules/home-menu-handlers.js";

const homeMenuButtons = document.querySelectorAll("ul.home-menu > li");
let todoDataIndex;
let projectDataIndex;

// Handle click on the "Add Project" button in the Projects Menu
const handleClickOnAddProjectNameBtn = (e) => {
    e.preventDefault();

    const projectNameInput = document.getElementById("project-name-input");

    projectsAndToDosManager.addNewProject(projectNameInput.value);

    projectNameInput.value = "";
};

// Get new todo info or updated todo info from forms
const getToDoInfoFromForm = (e, formID) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById(formID));
    let title, description, dueDate, isCompleted, isImportant;

    switch (formID) {
        case "todo-input-form":
            title = formData.get("title");
            description = formData.get("description");
            dueDate = document.getElementById("due-date").value;
            isCompleted = false;
            isImportant = false;
            break;
        case "edit-todo-form":
            const projects = projectsAndToDosManager.getProjects();

            title = formData.get("edit-title");
            description = formData.get("edit-description");
            dueDate = document.getElementById("edit-due-date").value;

            // isCompleted and isImportant here will get if the todo status is checked/important
            // (or not) and keep it when submitting the updated todo info
            isCompleted = projects[projectDataIndex].todos[todoDataIndex].isCompleted;
            isImportant = projects[projectDataIndex].todos[todoDataIndex].isImportant;

            break;
        default:
            alert("Error getting info from form!");
    }

    return { title, description, dueDate, isCompleted, isImportant };
};

const clearToDoInfoInputs = () => {
    // Clear all to do info inputs after adding or canceling a to do
    const inputs = document.querySelectorAll("#title, #description, #due-date");
    inputs.forEach((input) => {
        input.value = "";
    });
};

function fillFormFieldsWithTodoInfo(todo) {
    document.getElementById("edit-title").value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-due-date").value = todo.dueDate;
}

// Handles a click on the edit todo button, allowing the
// user to change the information of each individual todo
const handleEditTodoClick = (todoDataIndex, projectDataIndex) => {
    toggleHideOrShowInputToEditToDoInfo();
    toggleAddTaskButton(false);
    preventAddOrChangeProject(true);

    const projectsArray = projectsAndToDosManager.getProjects();

    const infoOfTodoToEdit = projectsArray[projectDataIndex].todos[todoDataIndex];

    fillFormFieldsWithTodoInfo(infoOfTodoToEdit);
};

const handleDeleteTodoClick = (todoDataIndex, projectDataIndex) => {
    projectsAndToDosManager.deleteTodo(projectDataIndex, todoDataIndex);
};

const switchTodoImportance = (todoIndex, projectIndex, event) => {
    const projects = projectsAndToDosManager.getProjects();
    const targetTodo = projects[projectIndex].todos[todoIndex];

    // Toggle the isImportant property
    const isImportant = !targetTodo.isImportant;

    // Toggle the todo importance using the project manager
    projectsAndToDosManager.toggleTodoImportance(projectIndex, todoIndex, isImportant);

    // Toggle todo star color based on isImportant variable
    toggleStarColor(event, isImportant);
};

// Button to create a new project ("Add Project" button)
document.getElementById("add-project-button").addEventListener("click", toggleHideOrShowInputForProjectName);

// Form to type project name... it opens when the user clicks on the "Add Project" button
document.getElementById("project-name-input-form").addEventListener("submit", handleClickOnAddProjectNameBtn);

// Handle click on cancel project name button
document.querySelector("#btn-cancel-project").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputForProjectName();
});

// If user clicks on "Add Task" button, it will open a form to insert todo info
document.querySelector(".tasks-container .add-task-button").addEventListener("click", toggleHideOrShowInputForToDoInfo);

document.querySelector("#todo-input-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formID = "todo-input-form";
    const todoInfo = getToDoInfoFromForm(e, formID);
    // Add new to do to the last project clicked (dataIndexOfLastProjectClicked)
    projectsAndToDosManager.addNewTodoToAProject(todoInfo, dataIndexOfLastProjectClicked);

    toggleHideOrShowInputForToDoInfo();
    clearToDoInfoInputs();
});

// If user clicks on "Edit" button, it will open a form to update todo info
document.querySelector("#edit-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formID = "edit-todo-form";
    const updatedTodoInfo = getToDoInfoFromForm(e, formID);

    projectsAndToDosManager.updateTodoInfo(updatedTodoInfo, projectDataIndex, todoDataIndex);

    toggleHideOrShowInputToEditToDoInfo();
    preventAddOrChangeProject(false);
    clearToDoInfoInputs();

    if (dataIndexOfLastProjectClicked === null) {
        // Keeps "Add Task" button hidden if last click was in a home menu button
        toggleAddTaskButton(false);
    } else {
        // Shows "Add Task" button if last click was in a project
        toggleAddTaskButton(true);
    }
});

// Edit, delete or star button in each todo
document.querySelector("body").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-to-do")) {
        // Get targeted html todo data-index and project data-index
        todoDataIndex = e.target.closest(".todo").dataset.todoIndex;
        projectDataIndex = e.target.closest(".todo").dataset.projectIndex;
        handleEditTodoClick(todoDataIndex, projectDataIndex);

        return;
    }

    if (e.target.classList.contains("delete-to-do")) {
        // Get targeted html todo data-index and project data-index
        todoDataIndex = e.target.closest(".todo").dataset.todoIndex;
        projectDataIndex = e.target.closest(".todo").dataset.projectIndex;
        handleDeleteTodoClick(todoDataIndex, projectDataIndex);
        return;
    }

    if (e.target.classList.contains("star-btn") || e.target.classList.contains("important")) {
        todoDataIndex = e.target.closest(".todo").dataset.todoIndex;
        projectDataIndex = e.target.closest(".todo").dataset.projectIndex;
        switchTodoImportance(todoDataIndex, projectDataIndex, e);
    }
});

document.querySelector("#btn-cancel-todo").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputForToDoInfo();
    clearToDoInfoInputs();
});

document.querySelector("#btn-cancel-todo-update").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputToEditToDoInfo();
    preventAddOrChangeProject(false);

    if (dataIndexOfLastProjectClicked === null) {
        // Keeps "Add Task" button hidden if last click was in a home menu button
        toggleAddTaskButton(false);
    } else {
        // Shows "Add Task" button if last click was in a project
        toggleAddTaskButton(true);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Display "Add Project" button and hide input form in the initial page load
    document.getElementById("add-project-button").style.display = "flex";
    document.getElementById("project-name-input-form").style.display = "none";

    // Initial page load - Display all projects todos
    displayTodos("allProjectsTodos");
});

// Menu buttons
homeMenuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // If the last click was in some home menu button, dataIndexOfLastProjectClicked = null
        // This is for validation in updateTodoInfo and deleteTodo function in the project-manager
        dataIndexOfLastProjectClicked = null;

        handleMenuButtonsClick(e);
    });
});

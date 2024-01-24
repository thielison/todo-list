"use strict";

import { projects as projectsAndTodosManager } from "./projects-and-todos-manager";

// This function populates the local storage whenever there is a change in the projects and todos array
export const populateStorage = (projectsAndTodosArray) => {
    localStorage.setItem("projectsAndTodos", JSON.stringify(projectsAndTodosArray));
};

// This function retrieves the projects and todos from local storage
const getProjectsAndTodosFromStorage = () => {
    let projectsAndTodos = null;

    try {
        projectsAndTodos = JSON.parse(localStorage.getItem("projectsAndTodos"));
    } catch (error) {
        console.error("Error parsing projects and todos from local storage", error);
    }

    return projectsAndTodos;
};

// This function renders the projects and todos from local storage
const renderProjectsAndTodosFromStorage = (projectsAndTodos) => {
    // If there are no projects and todos in local storage, log a message and return
    if (!projectsAndTodos) {
        console.log("Nothing in storage yet!");
        return;
    }

    // For each project in the projects and todos array
    projectsAndTodos.forEach((project) => {
        // Add a new project in the page
        projectsAndTodosManager.addNewProject(project.projectName);

        // For each todo in the project
        project.todos.forEach((todo) => {
            // Add a new todo to the project in the page
            projectsAndTodosManager.addNewTodoToAProject(todo, project.id);
        });
    });
};

// When the document content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the projects and todos from local storage
    const projectsAndTodos = getProjectsAndTodosFromStorage();
    // Render the retrieved projects and todos in the page
    renderProjectsAndTodosFromStorage(projectsAndTodos);
});

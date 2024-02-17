"use strict";

import { appendProjectNameToDOM, dataIndexOfLastProjectClicked, displayTodos } from "./dom-manager";
import { populateStorage } from "./local-storage";
import { keepLastClickedMenuTab } from "./home-menu-handlers";

const manageUserLocation = (projectIndex) => {
    // If no project was clicked (dataIndexOfLastProjectClicked === null),
    // keep the last clicked menu tab when updating or deleting a todo.
    // If a project was clicked (dataIndexOfLastProjectClicked !== null),
    // the user will remain in that project.
    if (dataIndexOfLastProjectClicked === null) {
        keepLastClickedMenuTab();
    } else {
        displayTodos("singleProjectTodos", projectIndex);
    }
};

// This function manages an array of projects (an array of to-do items)
// Each element in the array is an object with an id, projectName, and todos
const projectsAndToDosManager = () => {
    const projects = [];

    const getProjects = () => {
        return projects;
    };

    const addNewProject = (projectName) => {
        if (projectName === "") {
            return;
        }

        let id = projects.length;
        let todos = [];

        projects.push({ id, projectName, todos });

        appendProjectNameToDOM(projectName, id);
        populateStorage(projects);
    };

    const removeProject = (index) => {
        if (index > -1) {
            projects.splice(index, 1);
        }

        // Updates the id of all remaining projects in the array to reflect
        // their new position in the projectsManager.projects array
        for (let i = 0; i < projects.length; i++) {
            projects[i].id = i;
        }

        populateStorage(projects);
    };

    const addNewTodoToAProject = (toDoInfo, projectDataIndex) => {
        if (projectDataIndex < 0 || projectDataIndex >= projects.length) {
            alert("Invalid project index");
            return;
        }

        projects[projectDataIndex].todos.push(toDoInfo);

        displayTodos("singleProjectTodos", projectDataIndex);
        populateStorage(projects);
    };

    const updateTodoInfo = (updatedTodoInfo, projectDataIndex, dataIndexOfTodoToUpdate) => {
        if (
            projectDataIndex < 0 ||
            projectDataIndex >= projects.length ||
            dataIndexOfTodoToUpdate < 0 ||
            dataIndexOfTodoToUpdate > projects[projectDataIndex].todos.length
        ) {
            console.log("Invalid project index");
            return;
        }

        projects[projectDataIndex].todos.splice(dataIndexOfTodoToUpdate, 1, updatedTodoInfo);

        manageUserLocation(projectDataIndex);
        populateStorage(projects);
    };

    const deleteTodo = (projectDataIndex, todoDataIndex) => {
        if (projectDataIndex > -1 || todoDataIndex > -1) {
            projects[projectDataIndex].todos.splice(todoDataIndex, 1);
        }

        manageUserLocation(projectDataIndex);
        populateStorage(projects);
    };

    const toggleTodoCompletion = (projectIndex, todoIndex, todoIsCompleted) => {
        projects[projectIndex].todos[todoIndex].isCompleted = todoIsCompleted;

        populateStorage(projects);
        manageUserLocation(projectIndex);
    };

    const toggleTodoImportance = (projectIndex, todoIndex, todoIsImportant) => {
        projects[projectIndex].todos[todoIndex].isImportant = todoIsImportant;

        populateStorage(projects);
        manageUserLocation(projectIndex);
    };

    return {
        addNewProject,
        removeProject,
        getProjects,
        addNewTodoToAProject,
        updateTodoInfo,
        deleteTodo,
        toggleTodoCompletion,
        toggleTodoImportance,
    };
};

export const projects = projectsAndToDosManager();

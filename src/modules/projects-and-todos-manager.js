"use strict";

import { appendProjectNameToDOM, displayTodosOfAProject } from "./dom-manager";
import { populateStorage } from "./storage";

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

    const addNewTodoToAProject = (toDoInfo, dataIndexOfTheProject) => {
        if (dataIndexOfTheProject < 0 || dataIndexOfTheProject >= projects.length) {
            alert("Invalid project index");
            return;
        }

        projects[dataIndexOfTheProject].todos.push(toDoInfo);

        displayTodosOfAProject(dataIndexOfTheProject);
        populateStorage(projects);
    };

    const updateTodoInfo = (updatedTodoInfo, dataIndexOfLastProjectClicked, dataIndexOfTodoToUpdate) => {
        if (
            dataIndexOfLastProjectClicked < 0 ||
            dataIndexOfLastProjectClicked >= projects.length ||
            dataIndexOfTodoToUpdate < 0 ||
            dataIndexOfTodoToUpdate > projects[dataIndexOfLastProjectClicked].todos.length
        ) {
            alert("Invalid project index");
            return;
        }

        projects[dataIndexOfLastProjectClicked].todos.splice(dataIndexOfTodoToUpdate, 1, updatedTodoInfo);

        displayTodosOfAProject(dataIndexOfLastProjectClicked);
        populateStorage(projects);
    };

    const deleteTodo = (projectIndex, todoIndex) => {
        if (projectIndex > -1 || todoIndex > -1) {
            projects[projectIndex].todos.splice(todoIndex, 1);
        }

        displayTodosOfAProject(projectIndex);
        populateStorage(projects);
    };

    const toggleTodoCompletion = (projectIndex, todoIndex, todoIsCompleted) => {
        projects[projectIndex].todos[todoIndex].isCompleted = todoIsCompleted;
        populateStorage(projects);
    };

    return {
        addNewProject,
        removeProject,
        getProjects,
        addNewTodoToAProject,
        updateTodoInfo,
        deleteTodo,
        toggleTodoCompletion,
    };
};

export const projects = projectsAndToDosManager();

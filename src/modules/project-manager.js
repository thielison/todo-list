"use strict";

import { appendProjectNameToDOM, dataIndexOfLastProjectClicked, displayTodos } from "./dom-manager";
import { populateStorage } from "./local-storage";
import { keepLastClickedMenuTab } from "./home-menu-handlers";

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

        // If in "All Tasks" tab, keeps user there... If inside a project, keeps user there
        dataIndexOfLastProjectClicked === null
            ? keepLastClickedMenuTab()
            : displayTodos("singleProjectTodos", projectDataIndex);

        populateStorage(projects);
    };

    const deleteTodo = (projectDataIndex, todoDataIndex) => {
        if (projectDataIndex > -1 || todoDataIndex > -1) {
            projects[projectDataIndex].todos.splice(todoDataIndex, 1);
        }

        // If in "All Tasks" tab, keeps user there... If inside a project, keeps user there
        dataIndexOfLastProjectClicked === null
            ? keepLastClickedMenuTab()
            : displayTodos("singleProjectTodos", projectDataIndex);

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

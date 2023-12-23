import { appendProjectNameToDOM, displayTodosOfAProject } from "./dom-manager";

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
    };

    const addNewTodoToAProject = (toDoInfo, dataIndexOfTheProject) => {
        if (dataIndexOfTheProject < 0 || dataIndexOfTheProject >= projects.length) {
            alert("Invalid project index");
            return;
        }

        projects[dataIndexOfTheProject].todos.push(toDoInfo);

        displayTodosOfAProject(dataIndexOfTheProject);

        console.log(projects);
    };

    return { addNewProject, removeProject, getProjects, addNewTodoToAProject };
};

export const projects = projectsAndToDosManager();

import { appendProjectNameToDOM } from "./dom-manager";

// This function manages an array of projects (an array of to-do items)
// Each element in the array is an object with an id, projectName, and todos
const projectsManager = () => {
    const projects = [];

    const getProjects = () => {
        return projects;
    };

    const addNewProject = () => {
        const projectNameInput = document.getElementById("project-name-input");

        let id = projects.length;
        let todos = [];
        let projectName = projectNameInput.value;

        if (projectName === "") {
            return;
        }

        projects.push({ id, projectName, todos });
        appendProjectNameToDOM(projectName, id);

        projectNameInput.value = "";

        console.log(projects);
    };

    const removeProject = (index) => {
        if (index > -1) {
            projects.splice(index, 1);
        }

        // Updates the id of all the remaining projects in the array
        // to reflect their new position in the projectsManager.projects array
        for (let i = 0; i < projects.length; i++) {
            projects[i].id = i;
        }

        console.log(projects);
    };

    return { addNewProject, removeProject, getProjects };
};

export const projects = projectsManager();

import { appendProjectNameToDOM } from "./dom-manager";

// This function manages an array of projects (an array of to-do items)
// Each element in the array is an object with an id, projectName, and todos
const projectsManager = () => {
    const projects = [];

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

        console.log(projects);
    };

    return { addNewProject, removeProject };
};

export const projects = projectsManager();

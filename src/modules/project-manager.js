import { appendProjectNameToDOM } from "./dom-manager";

const projectsManager = () => {
    const projects = [];

    const addNewProject = () => {
        const projectNameInput = document.getElementById("project-name-input");

        let id = projects.length + 1;
        let todos = [];
        let projectName = projectNameInput.value;

        projects.push({ id, projectName, todos });
        appendProjectNameToDOM(projectName, id);

        projectNameInput.value = "";
    };

    return { addNewProject };
};

export const projects = projectsManager();

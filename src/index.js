import { toggleFormForProjectNameInput } from "./dom.js";
import { appendProjectNameToDOM } from "./dom.js";

let projects = [];

const createProjectAndAppendToDOM = (projectName) => {
    let id = projects.length + 1;
    let todos = [];
    projects.push({ id, projectName, todos });

    appendProjectNameToDOM(projectName, id); // id here is the data-index in the DOM corresponding to an array position

    console.log(projects);
};

const handleClickOnAddAndCancelBtns = (submitBtn) => {
    submitBtn.preventDefault();

    const projectNameInput = document.getElementById("project-name-input");

    if (submitBtn.target.textContent === "Add") {
        createProjectAndAppendToDOM(projectNameInput.value);
    } else if (submitBtn.target.textContent === "Cancel") {
        toggleFormForProjectNameInput();
    }

    projectNameInput.value = "";
};

const eventHandlers = () => {
    // Button to create a new project
    const addProjectButton = document.getElementById("add-project-button");

    // Form to type project name... it opens when the user clicks on the "Add Project" button
    const projectNameInputForm = document.getElementById("project-name-input-form");

    addProjectButton.addEventListener("click", () => toggleFormForProjectNameInput());

    projectNameInputForm.addEventListener("click", handleClickOnAddAndCancelBtns);
};

eventHandlers();

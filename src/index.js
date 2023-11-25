import { projects } from "./modules/project-manager.js";
import { toggleHideOrShowInputForProjectName } from "./modules/dom-manager.js";

// Handle click on the "Add Project Button" in the Projects Menu
const handleClickOnAddAndCancelProjectNameBtns = (submitBtn) => {
    submitBtn.preventDefault();

    if (submitBtn.target.textContent === "Add") {
        projects.addNewProject();
    } else if (submitBtn.target.textContent === "Cancel") {
        toggleHideOrShowInputForProjectName();
    }
};

// Button to create a new project ("Add Project" button)
document.getElementById("add-project-button").addEventListener("click", () => toggleHideOrShowInputForProjectName());

// Form to type project name... it opens when the user clicks on the "Add Project" button
document.getElementById("project-name-input-form").addEventListener("click", handleClickOnAddAndCancelProjectNameBtns);

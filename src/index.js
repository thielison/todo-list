import { projects as projectsAndToDosManager } from "./modules/project-manager.js";
import {
    toggleHideOrShowInputForProjectName,
    toggleHideOrShowInputForToDoInfo,
    handleClickOnAddTaskButton,
    dataIndexOfLastProjectClicked,
} from "./modules/dom-manager.js";

// Handle click on the "Add Project Button" in the Projects Menu
const handleClickOnAddAndCancelProjectNameBtns = (submitProjectBtn) => {
    submitProjectBtn.preventDefault();

    if (submitProjectBtn.target.textContent === "Add") {
        projectsAndToDosManager.addNewProject();
    } else if (submitProjectBtn.target.textContent === "Cancel") {
        toggleHideOrShowInputForProjectName();
    }
};

const getToDoInfoFromForm = (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("todo-input-form"));
    const title = formData.get("title");
    const description = formData.get("description");
    let dueDate = document.getElementById("due-date").value;

    return { title, description, dueDate };
};

// Button to create a new project ("Add Project" button)
document.getElementById("add-project-button").addEventListener("click", toggleHideOrShowInputForProjectName);

// Form to type project name... it opens when the user clicks on the "Add Project" button
document.getElementById("project-name-input-form").addEventListener("click", handleClickOnAddAndCancelProjectNameBtns);

// If user clicks on "Add Task" button, it will open a form to insert todo info
document.querySelector(".tasks-container .add-task-button").addEventListener("click", handleClickOnAddTaskButton);

document.querySelector("body").addEventListener("click", (e) => {
    if (e.target.id === "btn-add-todo") {
        const newTodo = getToDoInfoFromForm(e);

        projectsAndToDosManager.addNewTodoToAProject(newTodo, dataIndexOfLastProjectClicked);
    } else if (e.target.id === "btn-cancel-todo") {
        toggleHideOrShowInputForToDoInfo();
    }
});

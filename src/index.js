import { projects as projectsAndToDosManager } from "./modules/projects-and-todos-manager.js";
import {
    dataIndexOfLastProjectClicked,
    toggleHideOrShowInputForProjectName,
    toggleHideOrShowInputForToDoInfo,
    toggleHideOrShowInputToEditToDoInfo,
    toggleAddTaskButton,
    preventProjectChange,
} from "./modules/dom-manager.js";

// let dataIndexOfLastProjectClicked;
let dataIndexOfTodo;

// Handle click on the "Add Project" button in the Projects Menu
const handleClickOnAddProjectNameBtn = (e) => {
    e.preventDefault();

    const projectNameInput = document.getElementById("project-name-input");

    projectsAndToDosManager.addNewProject(projectNameInput.value);

    projectNameInput.value = "";
};

// Get new todo info or updated todo info from forms
const getToDoInfoFromForm = (e, formID) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById(formID));
    let title, description, dueDate;

    switch (formID) {
        case "todo-input-form":
            title = formData.get("title");
            description = formData.get("description");
            dueDate = document.getElementById("due-date").value;
            break;
        case "edit-todo-form":
            title = formData.get("edit-title");
            description = formData.get("edit-description");
            dueDate = document.getElementById("edit-due-date").value;
            break;
        default:
            alert("Error getting info from form!");
    }

    return { title, description, dueDate };
};

const clearToDoInfoInputs = () => {
    // Clear all to do info inputs after adding or canceling a to do
    const inputs = document.querySelectorAll("#title, #description, #due-date");
    inputs.forEach((input) => {
        input.value = "";
    });
};

function fillFormFieldsWithTodoInfo(todo) {
    document.getElementById("edit-title").value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-due-date").value = todo.dueDate;
}

// Button to create a new project ("Add Project" button)
document.getElementById("add-project-button").addEventListener("click", toggleHideOrShowInputForProjectName);

// Form to type project name... it opens when the user clicks on the "Add Project" button
document.getElementById("project-name-input-form").addEventListener("submit", handleClickOnAddProjectNameBtn);

// Handle click on cancel project name button
document.querySelector("#btn-cancel-project").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputForProjectName();
});

// If user clicks on "Add Task" button, it will open a form to insert todo info
document.querySelector(".tasks-container .add-task-button").addEventListener("click", toggleHideOrShowInputForToDoInfo);

document.querySelector("#todo-input-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formID = "todo-input-form";
    const todoInfo = getToDoInfoFromForm(e, formID);
    // Add new to do to the last project clicked (dataIndexOfLastProjectClicked)
    projectsAndToDosManager.addNewTodoToAProject(todoInfo, dataIndexOfLastProjectClicked);

    toggleHideOrShowInputForToDoInfo();
    clearToDoInfoInputs();
});

// If user clicks on "Edit" button, it will open a form to update todo info
document.querySelector("#edit-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formID = "edit-todo-form";
    const updatedTodoInfo = getToDoInfoFromForm(e, formID);

    projectsAndToDosManager.updateTodoInfo(updatedTodoInfo, dataIndexOfLastProjectClicked, dataIndexOfTodo);

    toggleHideOrShowInputToEditToDoInfo();
    toggleAddTaskButton(true);
    preventProjectChange(false);
    clearToDoInfoInputs();
});

document.querySelector("body").addEventListener("click", (e) => {
    if (e.target.className === "edit-to-do") {
        toggleHideOrShowInputToEditToDoInfo();
        toggleAddTaskButton(false);
        preventProjectChange(true);

        const projectsArray = projectsAndToDosManager.getProjects();

        dataIndexOfTodo = e.target.closest(".todo").dataset.index;
        const infoOfTodoToEdit = projectsArray[dataIndexOfLastProjectClicked].todos[dataIndexOfTodo];

        fillFormFieldsWithTodoInfo(infoOfTodoToEdit);
    }
});

// Handle click on cancel todo button
document.querySelector("#btn-cancel-todo").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputForToDoInfo();
    clearToDoInfoInputs();
});

document.querySelector("#btn-cancel-todo-update").addEventListener("click", (e) => {
    e.preventDefault();
    toggleHideOrShowInputToEditToDoInfo();
    toggleAddTaskButton(true);
    preventProjectChange(false);
});

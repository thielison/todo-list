import { projects } from "./modules/project-manager.js";
import { toggleHideOrShowInputForProjectName, toggleHideOrShowInputForToDoInfo } from "./modules/dom-manager.js";

const toDoInformationForm = document.querySelector(".todo-input-information-container");

// Handle click on the "Add Project Button" in the Projects Menu
const handleClickOnAddAndCancelProjectNameBtns = (submitProjectBtn) => {
    submitProjectBtn.preventDefault();

    if (submitProjectBtn.target.textContent === "Add") {
        projects.addNewProject();
    } else if (submitProjectBtn.target.textContent === "Cancel") {
        toggleHideOrShowInputForProjectName();
    }
};

const handleClickOnAddTaskButton = () => {
    toDoInformationForm.style.display = "block";

    document.querySelector("#todo-input-form").addEventListener("click", handleClickOnAddAndCancelToDoBtns);
};

const handleClickOnAddAndCancelToDoBtns = (e) => {
    e.preventDefault();

    if (e.target.textContent === "Add") {
        const toDo = getTodoDataFromForm();
        console.log(toDo);
        // projects.addNewProject();
    } else if (e.target.textContent === "Cancel") {
        toggleHideOrShowInputForToDoInfo();
    }
};

const getTodoDataFromForm = () => {
    const formData = new FormData(document.getElementById("todo-input-form"));
    const title = formData.get("title");
    const description = formData.get("description");

    let dueDate = document.getElementById("due-date");
    dueDate.addEventListener("change", function () {
        dueDate = this.value;
    });

    const toDo = createNewToDo(title, description, dueDate.value);

    return toDo;
};

const createNewToDo = (title, description, dueDate) => {
    return { title, description, dueDate };
};

// Button to create a new project ("Add Project" button)
document.getElementById("add-project-button").addEventListener("click", () => toggleHideOrShowInputForProjectName());

// Form to type project name... it opens when the user clicks on the "Add Project" button
document.getElementById("project-name-input-form").addEventListener("click", handleClickOnAddAndCancelProjectNameBtns);

// If user clicks on "Add Task" button, it will open a form to insert todo info
document.querySelector(".tasks-container .add-task-button").addEventListener("click", handleClickOnAddTaskButton);

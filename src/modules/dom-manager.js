import { projects as projectsAndTodosManager } from "./project-manager.js";

// Export the updated data index of last project clicked
// This data index will be used to add todos to a specific project
export let dataIndexOfLastProjectClicked = null;

// FUNCTIONS RESPONSIBLE FOR MANAGING PROJECTS
// Shows or hides both the form to input Project Name and the "Add Project" button
const toggleHideOrShowInputForProjectName = () => {
    const addProjectButton = document.getElementById("add-project-button");
    const inputFormForProjectName = document.getElementById("project-name-input-form");

    if (inputFormForProjectName.style.display === "flex" && addProjectButton.style.display === "none") {
        inputFormForProjectName.style.display = "none";
        addProjectButton.style.display = "flex";
        return;
    }

    inputFormForProjectName.style.display = "flex";
    addProjectButton.style.display = "none";
};

const toggleHideOrShowInputForToDoInfo = () => {
    const toDoInformationForm = document.querySelector(".todo-input-information-container");

    if (toDoInformationForm.style.display === "none") {
        toDoInformationForm.style.display = "flex";
        return;
    }

    toDoInformationForm.style.display = "none";
};

const handleClickOnAddTaskButton = () => {
    document.querySelector(".todo-input-information-container").style.display = "block";
};

// Define a function to handle project name clicks
const projectNameClickEventHandler = () => {
    // Update the tasks header with the project name
    const updateProjectsHeaderOnPage = (index) => {
        const projectsArray = projectsAndTodosManager.getProjects();
        const tasksHeader = document.querySelector(".tasks-container .tasks-header");
        tasksHeader.textContent = projectsArray[index].projectName;
    };

    // Display the "add task" button on the page
    const showAddTaskButton = () => {
        const addTaskButton = document.querySelector(".add-task-button");
        addTaskButton.style.display = "block";
    };

    // Handle a project name click event
    const projectNameClicked = (event) => {
        dataIndexOfLastProjectClicked = event.target.dataset.index;
        updateProjectsHeaderOnPage(dataIndexOfLastProjectClicked);
        displayAllTodosOfAProject(dataIndexOfLastProjectClicked);
        showAddTaskButton();
    };

    return {
        projectNameClicked,
    };
};

const removeProjectFromDOM = (project) => {
    // Removes a project from the DOM
    project.parentElement.remove();

    // Updates the data-index attribute of all remaining projects in the DOM
    // to reflect their new position in the projectsManager.projects array
    let allProjects = document.querySelectorAll(".project");
    for (let i = 0; i < allProjects.length; i++) {
        allProjects[i].setAttribute("data-index", i);
    }
};

// Function to handle delete project button click
const handleClickOnDeleteProjectButton = (e) => {
    // Remove the project from the DOM
    removeProjectFromDOM(e.target);
    // And remove the project from the projects array
    projectsAndTodosManager.removeProject(e.target.parentElement.dataset.index);
};

// Delete project on each project name on the DOM
const createDeleteProjectButton = () => {
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    return deleteBtn;
};

// Create a new list item that hold the name of the project
// The data-index attribute set here on each project in the DOM
// corresponds exactly to the index of the array that holds the Projects
const createListItemWithProjectName = (projectName, index) => {
    let li = document.createElement("li");
    li.textContent = projectName;
    li.setAttribute("data-index", index);
    li.classList.add("project");

    return li;
};

// Function do add an event listener to each list item (project name)
const addEventListenerToProjectNameListItem = (li) => {
    li.addEventListener("click", (e) => {
        // Check if the clicked element is the delete button
        if (e.target.className === "delete-btn") {
            handleClickOnDeleteProjectButton(e);
            return;
        } else {
            const projectsEventHandler = projectNameClickEventHandler();
            projectsEventHandler.projectNameClicked(e);
        }
    });
};

// Function to append a new project name to the DOM
const appendProjectNameToDOM = (projectName, index) => {
    // Select the projects unordered list from the DOM
    const ul = document.querySelector(".projects");

    // Create a new list item with project name and data-index
    const li = createListItemWithProjectName(projectName, index);

    // Add an event listener to each project (list item)
    addEventListenerToProjectNameListItem(li);

    // Create a delete button for the project
    const deleteBtn = createDeleteProjectButton();

    li.appendChild(deleteBtn);
    ul.append(li);

    // Toggle the visibility of the input for the project name
    toggleHideOrShowInputForProjectName();
};

// FUNCTIONS RESPONSIBLE FOR MANAGING TO DOS
// This function, when called, creates elements to display all the todos inside a specific project
const displayAllTodosOfAProject = (dataIndex) => {
    const projectsAndTodosArray = projectsAndTodosManager.getProjects();

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    const ul = document.createElement("ul");

    for (let i = 0; i < projectsAndTodosArray[dataIndex].todos.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-index", i);

        const div = document.createElement("div");
        div.className = "to-do";

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `todo${i}`);
        input.setAttribute("name", `todo${i}`);

        const label = document.createElement("label");
        label.setAttribute("for", `todo${i}`);
        label.textContent = projectsAndTodosArray[dataIndex].todos[i].title;

        const dueDateP = document.createElement("p");
        dueDateP.textContent = "some due date";

        const editTodoBtn = document.createElement("button");
        editTodoBtn.className = "edit-to-do";
        editTodoBtn.textContent = "Edit todo btn";

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.className = "delete-to-do";
        deleteTodoBtn.textContent = "Delete todo btn";

        div.append(input, label, dueDateP, editTodoBtn, deleteTodoBtn);

        li.append(div);

        ul.append(li);
    }

    taskList.append(ul);
};

export {
    toggleHideOrShowInputForProjectName,
    appendProjectNameToDOM,
    toggleHideOrShowInputForToDoInfo,
    handleClickOnAddTaskButton,
    displayAllTodosOfAProject,
};

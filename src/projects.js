const addProjectButton = document.getElementById("add-project-button");
const inputFormForProjectName = document.getElementById("project-name-input-form");
const projectNameInput = document.getElementById("project-name-input");

const createDeleteProjectButton = () => {
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    return deleteBtn;
};

const createListItem = (text) => {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", (e) => {
        if (e.target.className === "delete-btn") {
            deleteProjectFromDOM(e.target);
        }
    });

    return li;
};

const deleteProjectFromDOM = (project) => {
    project.parentElement.remove();
};

const appendProjectNameToDOM = () => {
    if (projectNameInput.value === "") {
        return;
    }

    const ul = document.querySelector(".projects");

    const li = createListItem(projectNameInput.value);
    const deleteBtn = createDeleteProjectButton();

    li.appendChild(deleteBtn);
    ul.append(li);

    toggleFormForProjectNameInput();
};

const handleClickOnAddAndCancelBtns = (submitBtn) => {
    submitBtn.preventDefault();
    if (submitBtn.target.className === "add-project") {
        appendProjectNameToDOM();
    } else if (submitBtn.target.className === "cancel-project") {
        toggleFormForProjectNameInput();
    }
};

const toggleFormForProjectNameInput = () => {
    projectNameInput.value = "";

    if (inputFormForProjectName.style.display === "flex" && addProjectButton.style.display === "none") {
        inputFormForProjectName.style.display = "none";
        addProjectButton.style.display = "flex";
        return;
    }

    inputFormForProjectName.style.display = "flex";
    addProjectButton.style.display = "none";
};

export const createNewProjectManager = () => {
    addProjectButton.addEventListener("click", toggleFormForProjectNameInput);

    inputFormForProjectName.addEventListener("click", handleClickOnAddAndCancelBtns);
};

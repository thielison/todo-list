const addProjectButton = document.getElementById("add-project-button");
const inputFormForProjectName = document.getElementById("project-name-input-form");

// DOM related functions to create or delete projects
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

const appendProjectNameToDOM = (projectName, index) => {
    if (projectName === "") {
        return;
    }

    const ul = document.querySelector(".projects");

    const li = createListItem(projectName);
    li.setAttribute("data-index", index);

    const deleteBtn = createDeleteProjectButton();

    li.appendChild(deleteBtn);
    ul.append(li);

    toggleFormForProjectNameInput();
};

const toggleFormForProjectNameInput = () => {
    if (inputFormForProjectName.style.display === "flex" && addProjectButton.style.display === "none") {
        inputFormForProjectName.style.display = "none";
        addProjectButton.style.display = "flex";
        return;
    }

    inputFormForProjectName.style.display = "flex";
    addProjectButton.style.display = "none";
};

export { toggleFormForProjectNameInput, appendProjectNameToDOM };

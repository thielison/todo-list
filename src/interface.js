const createNewProjectManager = () => {
    const addProjectButton = document.getElementById("add-project-button");
    const inputFormForProjectName = document.getElementById("project-name-input-form");
    const projectNameInput = document.getElementById("project-name-input");

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

    const addNewProjectNameToDOM = () => {
        if (projectNameInput.value === "") {
            return;
        }

        const ul = document.querySelector(".projects");
        const li = document.createElement("li");
        li.textContent = projectNameInput.value;

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-btn";

        li.addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                deleteProjectFromDOM(e.target);
            }
        });

        li.appendChild(deleteBtn);
        ul.append(li);

        toggleFormForProjectNameInput();
    };

    const deleteProjectFromDOM = (project) => {
        project.parentElement.remove();
    };

    addProjectButton.addEventListener("click", toggleFormForProjectNameInput);

    inputFormForProjectName.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.className === "add-project") {
            addNewProjectNameToDOM();
        } else if (e.target.className === "cancel-project") {
            toggleFormForProjectNameInput();
        }
    });

    return { toggleFormForProjectNameInput };
};

export const projectManager = createNewProjectManager();

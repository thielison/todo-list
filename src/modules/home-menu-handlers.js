import { dataIndexOfLastProjectClicked, toggleAddTaskButton, displayTodos } from "./dom-manager";
import { projects as projectsAndTodosManager } from "./project-manager";
import { isEqual, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const allTasks = () => {
    // For validation in updateTodoInfo and deleteTodo functions in the project-manager module
    // If the last click was in "All Tasks", deleting or updating todo info will keep user on All Tasks page
    dataIndexOfLastProjectClicked = null;

    displayTodos("allProjectsTodos");
};

const today = () => {
    const projects = projectsAndTodosManager.getProjects();

    let today = new Date();

    // padStart ensure that days and months always have two digits
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    let yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    // For each todo inside a project, if this todo due date is equal to today's date, displays it on page
    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            const dueDateIsEqualToTodayDate = isEqual(todo.dueDate, today);

            if (dueDateIsEqualToTodayDate) {
                let projectId = project.id;
                let todoIndex = projects[projectId].todos.indexOf(todo);

                displayTodos("todosDueToday", projectId, todoIndex);
            }
        });
    });
};

const thisWeek = () => {
    const projects = projectsAndTodosManager.getProjects();

    let today = new Date();

    const weekStart = startOfWeek(today, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 });

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            const isTodoDueThisWeek = isWithinInterval(todo.dueDate, {
                start: weekStart,
                end: weekEnd,
            });

            if (isTodoDueThisWeek) {
                let projectId = project.id;
                let todoIndex = projects[projectId].todos.indexOf(todo);

                displayTodos("todosDueThisWeek", projectId, todoIndex);
            }
        });
    });
};

const important = () => {
    console.log("Important");
};

const completed = () => {
    console.log("Completed");
};

const handleMenuButtonsClick = (e) => {
    // Hide add task button when clicking on menu buttons
    toggleAddTaskButton(false);

    let buttonId = e.target.id;

    switch (buttonId) {
        case "all-tasks":
            allTasks();
            break;
        case "today":
            today();
            break;
        case "this-week":
            thisWeek();
            break;
        case "important":
            important();
            break;
        case "completed":
            completed();
            break;
        default:
            console.log("Invalid button ID");
    }
};

export { handleMenuButtonsClick };

import {
    dataIndexOfLastProjectClicked,
    toggleAddTaskButton,
    displayTodos,
    updateTaskCount,
    updateTasksHeader,
} from "./dom-manager";
import { projects as projectsAndTodosManager } from "./project-manager";
import { isEqual, startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns";

const allTasks = () => {
    // For validation in updateTodoInfo and deleteTodo functions in the project-manager module
    // If the last click was in "All Tasks", deleting or updating todo info will keep user on All Tasks page
    dataIndexOfLastProjectClicked = null;

    displayTodos("allProjectsTodos");
};

const today = () => {
    const projects = projectsAndTodosManager.getProjects();

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    let today = format(new Date(), "yyyy-MM-dd");

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

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    let today = new Date();

    // Get the start and end of week based on today's date
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

    // Format start and end of week dates to correspond todo dueDate
    const formattedWeekStart = format(weekStart, "yyyy-MM-dd");
    const formattedWeekEnd = format(weekEnd, "yyyy-MM-dd");

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            const isTodoDueThisWeek = isWithinInterval(todo.dueDate, {
                start: formattedWeekStart,
                end: formattedWeekEnd,
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
    const projects = projectsAndTodosManager.getProjects();

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            if (todo.isCompleted) {
                let projectId = project.id;
                let todoIndex = projects[projectId].todos.indexOf(todo);

                displayTodos("todosCompleted", projectId, todoIndex);
            }
        });
    });
};

const handleMenuButtonsClick = (e) => {
    // Hide add task button when clicking on menu buttons
    toggleAddTaskButton(false);

    // Each menu button clicked will reset task count
    // This prevents showing task count > 0 if there isn't tasks in this tab
    updateTaskCount(0);

    let buttonId = e.target.id;
    switch (buttonId) {
        case "all-tasks":
            updateTasksHeader("All Tasks");
            allTasks();
            break;
        case "today":
            updateTasksHeader("Due Today");
            today();
            break;
        case "this-week":
            updateTasksHeader("This Week");
            thisWeek();
            break;
        case "important":
            updateTasksHeader("Important Todos");
            important();
            break;
        case "completed":
            updateTasksHeader("Completed Todos");
            completed();
            break;
        default:
            console.log("Invalid button ID");
    }
};

export { handleMenuButtonsClick };

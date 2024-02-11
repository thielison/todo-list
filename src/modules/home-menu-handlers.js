import { toggleAddTaskButton, displayTodos, updateTaskCount, updateTasksHeader } from "./dom-manager";
import { projects as projectsAndTodosManager } from "./project-manager";
import { isEqual, startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns";

let lastMenuItemClicked = "allProjectsTodos";

const allTasks = () => {
    displayTodos(lastMenuItemClicked);
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
    const projects = projectsAndTodosManager.getProjects();

    const taskList = document.querySelector(".task-list");
    taskList.textContent = "";

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            if (todo.isImportant) {
                let projectId = project.id;
                let todoIndex = projects[projectId].todos.indexOf(todo);

                displayTodos("importantTodos", projectId, todoIndex);
            }
        });
    });
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

                displayTodos("completedTodos", projectId, todoIndex);
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
            lastMenuItemClicked = "allProjectsTodos";
            updateTasksHeader("All Tasks");
            allTasks();
            break;
        case "today":
            lastMenuItemClicked = "todosDueToday";
            updateTasksHeader("Due Today");
            today();
            break;
        case "this-week":
            lastMenuItemClicked = "todosDueThisWeek";
            updateTasksHeader("This Week");
            thisWeek();
            break;
        case "important":
            lastMenuItemClicked = "importantTodos";
            updateTasksHeader("Important Todos");
            important();
            break;
        case "completed":
            lastMenuItemClicked = "todosCompleted";
            updateTasksHeader("Completed Todos");
            completed();
            break;
        default:
            console.log("Invalid button ID");
    }
};

const keepLastClickedMenuTab = () => {
    let header;
    switch (lastMenuItemClicked) {
        case "allProjectsTodos":
            header = "All Tasks";
            allTasks();
            break;
        case "todosDueToday":
            header = "Due Today";
            today();
            break;
        case "todosDueThisWeek":
            header = "This Week";
            thisWeek();
            break;
        case "importantTodos":
            header = "Important Todos";
            important();
            break;
        case "todosCompleted":
            header = "Completed Todos";
            completed();
            break;
        default:
            console.log("Invalid button ID");
            return;
    }

    updateTasksHeader(header);
};

export { handleMenuButtonsClick, keepLastClickedMenuTab };

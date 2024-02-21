"use strict";

import { toggleAddTaskButton, displayTodos, updateTasksHeader } from "./dom-manager";

let lastMenuItemClicked = "allProjectsTodos";

const handleMenuButtonsClick = (e) => {
    // Hide add task button when clicking on menu buttons
    toggleAddTaskButton(false);

    let header;

    let buttonId = e.target.id;
    switch (buttonId) {
        case "all-tasks":
            header = "All Tasks";
            lastMenuItemClicked = "allProjectsTodos";
            displayTodos("allProjectsTodos");
            break;
        case "today":
            header = "Due Today";
            lastMenuItemClicked = "todosDueToday";
            displayTodos("todosDueToday");
            break;
        case "this-week":
            header = "This Week";
            lastMenuItemClicked = "todosDueThisWeek";
            displayTodos("todosDueThisWeek");
            break;
        case "important":
            header = "Important Todos";
            lastMenuItemClicked = "importantTodos";
            displayTodos("importantTodos");
            break;
        case "completed":
            header = "Completed Todos";
            lastMenuItemClicked = "todosCompleted";
            displayTodos("completedTodos");
            break;
        default:
            console.log("Invalid button ID");
    }

    updateTasksHeader(header);
};

const keepLastClickedMenuTab = () => {
    let header;
    switch (lastMenuItemClicked) {
        case "allProjectsTodos":
            header = "All Tasks";
            displayTodos("allProjectsTodos");
            break;
        case "todosDueToday":
            header = "Due Today";
            displayTodos("todosDueToday");
            break;
        case "todosDueThisWeek":
            header = "This Week";
            displayTodos("todosDueThisWeek");
            break;
        case "importantTodos":
            header = "Important Todos";
            displayTodos("importantTodos");
            break;
        case "todosCompleted":
            header = "Completed Todos";
            displayTodos("completedTodos");
            break;
        default:
            console.log("Invalid button ID");
            return;
    }

    updateTasksHeader(header);
};

export { handleMenuButtonsClick, keepLastClickedMenuTab };

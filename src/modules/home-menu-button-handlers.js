import { dataIndexOfLastProjectClicked, toggleAddTaskButton, displayAllTodos } from "./dom-manager";

const allTasks = () => {
    // For validation in updateTodoInfo and deleteTodo functions in the projects-and-todos-manager module
    // If the last click was in "All Tasks", deleting and updating todo info will keep user on All Tasks page
    dataIndexOfLastProjectClicked = null;

    toggleAddTaskButton(false);
    displayAllTodos();
};

const today = () => {
    console.log("Today");
};

const thisWeek = () => {
    console.log("This week");
};

const important = () => {
    console.log("Important");
};

const completed = () => {
    console.log("Completed");
};

const handleMenuButtonsClick = (e) => {
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

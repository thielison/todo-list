// Um novo ou vários todos serão vinculados A UM ÚNICO ID de projeto

const addTodo = () => {
    let id = project.todos.length + 1;
    let todo = { id: id, task: task, completed: false };
    project.todos.push(todo);
};

const deleteTodo = () => {};

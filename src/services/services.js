export default {
  todoList: null,

  getTodoList() {
    if (this.todoList === null) {
      this.todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    }

    return this.todoList;
  },

  addTodo(todoItem) {
    this.todoList.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  },

  deleteTodo(todoItem) {
    let index = this.todoList.findIndex((todo) => todo.id === todoItem.id);

    if (index >= 0) {
      this.todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
  },

  toggleDone(todoItem) {
    let todo = this.todoList.find((task) => task.id === todoItem.id);
    if (todo != null) {
      todo.isDone = !todo.isDone;
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
  },

  generateNewId() {
    let max = 0;
    if (this.todoList !== null && this.todoList.length > 0) {
      max = Math.max(...this.todoList.map((item) => item.id));
    }
    //returned Infinity
    return max + 1;
  },

  updateItem(todoItem) {
    const originalTodoItem = this.todoList.find(item => item.id === todoItem.id);

    originalTodoItem.id = todoItem.id;
    originalTodoItem.task = todoItem.task;
    originalTodoItem.deadline = todoItem.deadline;
    originalTodoItem.startTime = todoItem.startTime;
    originalTodoItem.endTime = todoItem.endTime;
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  },

};

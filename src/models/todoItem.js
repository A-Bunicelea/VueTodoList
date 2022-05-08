export default class TodoItem {
  constructor(id="", task = "", deadline = "", startTime = "", endTime = "", isDone = false) {
    this.task = task;
    this.deadline = deadline;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isDone = isDone;
    this.id = id;
  }
}

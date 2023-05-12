document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector(".task-input");
    const addTaskButton = document.querySelector(".add-task-button");
    const taskList = document.querySelector(".task-list");

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");

        const taskLabel = document.createElement("label");
        taskLabel.classList.add("task-label");
        taskLabel.textContent = taskText;

        const taskRemove = document.createElement("button");
        taskRemove.classList.add("task-remove");
        taskRemove.textContent = "Remove";
        taskRemove.addEventListener("click", () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskRemove);

        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
});
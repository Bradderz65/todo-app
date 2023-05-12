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

    // Load existing tasks from localStorage
    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const taskId = Date.now(); // Generate a unique task ID based on the current timestamp
        
        const taskItem = createTaskItem(taskId, taskText);
        taskList.appendChild(taskItem);
        taskInput.value = "";

        // Save the new task to localStorage
        saveTask(taskId, taskText);
    }

    function createTaskItem(taskId, taskText) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.dataset.taskId = taskId;

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
            // Remove the task from localStorage
            removeTask(taskId);
        });

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskRemove);

        return taskItem;
    }

    function saveTask(taskId, taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        tasks[taskId] = taskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        delete tasks[taskId];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        for (const taskId in tasks) {
            const taskText = tasks[taskId];
            const taskItem = createTaskItem(taskId, taskText);
            taskList.appendChild(taskItem);
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromLocalStorage();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a valid task.');
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    appendTaskToList(task, taskList);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

function appendTaskToList(task, taskList) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <div>
            <button onclick="toggleTaskCompletion(this)">Complete</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleTaskCompletion(button) {
    const li = button.parentNode.parentNode;
    const span = li.querySelector('span');
    span.classList.toggle('completed');

    updateTaskInLocalStorage(li);
}

function editTask(button) {
    const li = button.parentNode.parentNode;
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.innerText);

    if (newText !== null) {
        span.innerText = newText;
        updateTaskInLocalStorage(li);
    }
}

function deleteTask(button) {
    const li = button.parentNode.parentNode;
    li.remove();
    removeTaskFromLocalStorage(li);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        appendTaskToList(task, taskList);
    });
}

function updateTaskInLocalStorage(li) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = Array.from(li.parentNode.children).indexOf(li);
    tasks[index].completed = li.querySelector('span').classList.contains('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(li) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = Array.from(li.parentNode.children).indexOf(li);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

let tasks = [
    { id: 1, description: "Compras en supermercado", completed: false },
    { id: 2, description: "Pasear a firulais", completed: false },
    { id: 3, description: "Realizar trabajo semanal", completed: false }
];
let totalTasks = tasks.length;
let completedTasks = tasks.filter(task => task.completed).length;

window.onload = function() {
    tasks.forEach(renderTask);
    updateSummary();
};

function agregartarea() {
    let input = document.getElementById("taskInput").value.trim();
    if (input === "") {
        alert("Debes ingresar una tarea.");
        return;
    }
    let task = {
        id: tasks.length + 1,
        description: input,
        completed: false
    };
    tasks.push(task);
    renderTask(task);
    totalTasks++;
    updateSummary();
    document.getElementById("taskInput").value = "";
}

function renderTask(task) {
    let ul = document.getElementById("taskList");
    let li = document.createElement("li");
    li.id = "task-" + task.id.toString().padStart(3, '0');
    let idSpan = document.createElement("span");
    idSpan.textContent = "ID: " + task.id.toString().padStart(3, '0');
    li.appendChild(idSpan);
    let descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = task.description;
    if (task.completed) {
        descriptionSpan.classList.add("completed");
    }
    li.appendChild(descriptionSpan);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function() {
        toggleTask(task.id);
    });
    li.appendChild(checkbox);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function() {
        deleteTask(task.id);
    });
    li.appendChild(deleteButton);
    
    ul.appendChild(li);
}


function toggleTask(taskId) {
    let task = tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    document.getElementById("taskList").innerHTML = '';
    tasks.forEach(renderTask);
    completedTasks = tasks.filter(task => task.completed).length;
    updateSummary();
}

function deleteTask(taskId) {
    let taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    if (tasks[taskIndex].completed) {
        completedTasks--;
    }
    tasks.splice(taskIndex, 1);
    document.getElementById("taskList").innerHTML = '';
    tasks.forEach(renderTask);
    totalTasks--;
    updateSummary();
}

function updateSummary() {
    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;
}


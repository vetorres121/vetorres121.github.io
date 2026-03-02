document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch("get_tasks.php")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <span>${task.task_name}</span>
                    <div class="actions">
                        <button onclick="editTask(${task.id}, '${task.task_name}')">
                            Edit
                        </button>
                        <button onclick="deleteTask(${task.id})">
                            Delete
                        </button>
                    </div>
                `;

                list.appendChild(li);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Task cannot be empty!");
        return;
    }

    fetch("add_task.php", {
        method: "POST",
        body: JSON.stringify({ task_name: task })
    }).then(() => {
        input.value = "";
        loadTasks();
    });
}

function editTask(id, oldName) {
    const newName = prompt("Edit task:", oldName);
    if (!newName) return;

    fetch("update_task.php", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            task_name: newName,
            status: ""
        })
    }).then(() => loadTasks());
}

function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    fetch("delete_task.php", {
        method: "POST",
        body: JSON.stringify({ id: id })
    }).then(() => loadTasks());
}
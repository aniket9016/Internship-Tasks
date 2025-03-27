let editMode = false;
let editTaskElement = null;

function addOrUpdateTask() {

    let taskText = document.getElementById("todotext").value.trim();
    let addButton = document.getElementById("addbtn");

    if (taskText === "") {
        alert("Enter a task!");
        return;
    }

    if (editMode) {
        editTaskElement.querySelector("span").textContent = taskText;
        editMode = false;
        editTaskElement = null;
        addButton.textContent = "Add";
    } else {
        document.getElementById("mainbox").style.display = "block";
        let li = document.createElement("li");
        li.className = "list-group-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.onclick = function () {
            moveTask(li, checkbox.checked);
        };

        let span = document.createElement("span");
        span.textContent = taskText;

        let btnContainer = document.createElement("div");

        let editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm me-2";
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            document.getElementById("todotext").value = span.textContent;
            editMode = true;
            editTaskElement = li;
            addButton.textContent = "Update";
        };

        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            li.remove();
            if (editTaskElement === li) {
                editMode = false;
                editTaskElement = null;
                addButton.textContent = "Add";
            }
        };

        btnContainer.appendChild(editButton);
        btnContainer.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnContainer);

        document.getElementById("pendingList").appendChild(li);
    }

    document.getElementById("todotext").value = "";
}

function moveTask(taskItem, isChecked) {
    if (isChecked) {
        document.getElementById("completedList").appendChild(taskItem);
        taskItem.classList.add("completed");
    } else {
        document.getElementById("pendingList").appendChild(taskItem);
        taskItem.classList.remove("completed");
    }
}
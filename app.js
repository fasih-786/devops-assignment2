// Fetch and display all to-do items on page load
window.onload = function() {
    getItems();
};

// Add a new to-do item
function addItem() {
    const item = document.getElementById("todo-input").value;
    if (!item) return alert("Please enter a task.");

    fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("todo-input").value = ""; // Clear input field
        displayItems(data.todos);
    });
}

// Retrieve and display to-do items
function getItems() {
    fetch("/todos")
    .then(response => response.json())
    .then(data => displayItems(data.todos));
}

// Delete a to-do item
function deleteItem(item) {
    fetch("/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item })
    })
    .then(response => response.json())
    .then(data => displayItems(data.todos));
}

// Display items in the HTML list
function displayItems(todos) {
    const list = document.getElementById("todo-list");
    list.innerHTML = ""; // Clear the list
    todos.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() { deleteItem(item); };
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

const formTodos = document.querySelector(".form-todos");
const inputTodo = document.querySelector(".input-todo");
const listTodos = document.querySelector(".list-todos");

let todos = [];

function addTodo(item) {
	if (item !== "") {
		const todo = {
			id: Date.now(),
			name: item,
			completed: false,
		};

		todos.push(todo);
		addToLocalStorage(todos);

		inputTodo.value = "";
	} else {
		throw new Error(alert("It is not possible to add a blank to-do."));
	}
}

formTodos.addEventListener("submit", function (event) {
	event.preventDefault();
	addTodo(inputTodo.value);
});

function renderTodos(renderedTodo) {
	listTodos.innerHTML = "";

	renderedTodo.forEach(function (item) {
		const completedTodo = item.completed ? "checked" : null;

		const li = document.createElement("li");
		li.setAttribute("class", "item");
		li.setAttribute("data-key", item.id);

		if (item.completed === true) {
			li.classList.add("checked");
		}

		li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completedTodo}>
      ${item.name}
      <button class="delete-button fas fa-trash"></button>
    `;
		listTodos.append(li);
	});
}

function addToLocalStorage(localTodo) {
	localStorage.setItem("todos", JSON.stringify(localTodo));
	renderTodos(localTodo);
}

function getFromLocalStorage() {
	const reference = localStorage.getItem("todos");
	if (reference) {
		todos = JSON.parse(reference);
		renderTodos(todos);
	}
}

function toggleStatus(id) {
	todos.forEach(function (item) {
		if (item.id == id) {
			item.completed = !item.completed;
		}
	});

	addToLocalStorage(todos);
}

function deleteTodo(id) {
	if (confirm("Do you really want to delete the to-do?")) {
		todos = todos.filter(function (item) {
			return item.id != id;
		});
		addToLocalStorage(todos);
	}
}

getFromLocalStorage();

listTodos.addEventListener("click", function (event) {
	if (event.target.type === "checkbox") {
		toggleStatus(event.target.parentElement.getAttribute("data-key"));
	}

	if (event.target.classList.contains("delete-button")) {
		deleteTodo(event.target.parentElement.getAttribute("data-key"));
	}
});

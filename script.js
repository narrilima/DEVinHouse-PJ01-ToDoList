const formularioTarefas = document.querySelector(".formulario-tarefas");
const inputTarefa = document.querySelector(".input-tarefa");
const listaTarefas = document.querySelector(".lista-tarefas");

let tarefas = [];

function adicionaTarefa(item) {
	if (item !== "") {
		const tarefa = {
			id: Date.now(),
			name: item,
			completed: false,
		};

		tarefas.push(tarefa);
		addToLocalStorage(tarefas);

		inputTarefa.value = "";
	} else {
		throw new Error(alert("Não é possível adicionar tarefas vazias."));
	}
}

formularioTarefas.addEventListener("submit", function (event) {
	event.preventDefault();
	adicionaTarefa(inputTarefa.value);
});

function renderizarTarefas(tarefaRenderizada) {
	listaTarefas.innerHTML = "";

	tarefaRenderizada.forEach(function (item) {
		const tarefaCompleta = item.completed ? "checked" : null;

		const li = document.createElement("li");
		li.setAttribute("class", "item");
		li.setAttribute("data-key", item.id);

		if (item.completed === true) {
			li.classList.add("checked");
		}

		li.innerHTML = `
      <input type="checkbox" class="checkbox" ${tarefaCompleta}>
      ${item.name}
      <button class="delete-button fas fa-trash"></button>
    `;
		listaTarefas.append(li);
	});
}

function addToLocalStorage(tarefaLocal) {
	localStorage.setItem("tarefas", JSON.stringify(tarefaLocal));
	renderizarTarefas(tarefaLocal);
}

function getFromLocalStorage() {
	const referencia = localStorage.getItem("tarefas");
	if (referencia) {
		tarefas = JSON.parse(referencia);
		renderizarTarefas(tarefas);
	}
}

function alternarStatus(id) {
	tarefas.forEach(function (item) {
		if (item.id == id) {
			item.completed = !item.completed;
		}
	});

	addToLocalStorage(tarefas);
}

function deletaTarefa(id) {
	if (confirm("Você deseja realmente excluir a tarefa?")) {
		tarefas = tarefas.filter(function (item) {
			return item.id != id;
		});
		addToLocalStorage(tarefas);
	}
}

getFromLocalStorage();

listaTarefas.addEventListener("click", function (event) {
	if (event.target.type === "checkbox") {
		alternarStatus(event.target.parentElement.getAttribute("data-key"));
	}

	if (event.target.classList.contains("delete-button")) {
		deletaTarefa(event.target.parentElement.getAttribute("data-key"));
	}
});

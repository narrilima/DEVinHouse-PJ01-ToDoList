const formularioTarefas = document.querySelector('.formulario-tarefas');
const inputTarefa = document.querySelector('.input-tarefa');
const listaTarefas = document.querySelector('.lista-tarefas');

let tarefas = [];

formularioTarefas.addEventListener('submit', function(event) {
  event.preventDefault();
  adicionaTarefa(inputTarefa.value);
});

function adicionaTarefa(item) {
  if (item !== '') {
    const tarefa = {
      id: Date.now(),
      name: item,
      completed: false
    };

    tarefas.push(tarefa);
    addToLocalStorage(tarefas);

    inputTarefa.value = '';
  }
}

function deletarTarefas(tarefaDeletada) {
  listaTarefas.innerHTML = '';

  tarefaDeletada.forEach(function(item) {
    const tarefaCompleta = item.completed ? 'checked': null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);

    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${tarefaCompleta}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    listaTarefas.append(li);
  });

}

function addToLocalStorage(tarefaLocal) {
  localStorage.setItem('tarefas', JSON.stringify(tarefaLocal));
  deletarTarefas(tarefaLocal);
}

function getFromLocalStorage() {
  const referencia = localStorage.getItem('tarefas');
  if (referencia) {
    tarefas = JSON.parse(referencia);
    deletarTarefas(tarefas);
  }
}

function alternarStatus(id) {
  tarefas.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(tarefas);
}

function deletaTarefa(id) {
  tarefas = tarefas.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(tarefas);
}

getFromLocalStorage();

listaTarefas.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    alternarStatus(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deletaTarefa(event.target.parentElement.getAttribute('data-key'));
  }
});
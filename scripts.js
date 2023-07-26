const botao = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const lista = document.querySelector('.list-tasks')

let listaDeTarefas = []

function adicionarTarefa() {
  listaDeTarefas.push({
    tarefa: input.value,
    concluida: false
  })

  input.value = ''

  mostrarTarefas()
}

function mostrarTarefas() {
  let novoItem = ''

  listaDeTarefas.forEach((tarefa, posicao) => {

    novoItem = novoItem + `
      <li class="task ${tarefa.concluida && "done"}">
        <img src="./img/check.png" onclick="concluirTarefa(${posicao})">
        <p>${tarefa.tarefa}</p>
        <img src="./img/trash.png" onclick="deletarTarefa(${posicao})">
      </li>
    `
  })
  
  lista.innerHTML = novoItem

  localStorage.setItem('itens', JSON.stringify(listaDeTarefas))

}

function concluirTarefa(posicao) {
  listaDeTarefas[posicao].concluida = !listaDeTarefas[posicao].concluida

  mostrarTarefas()
}

function deletarTarefa(posicao) {

  listaDeTarefas.splice(posicao, 1)

  mostrarTarefas()
}

function recarregarTarefas() {
  const itensLocalStorage = localStorage.getItem('itens')

  if (itensLocalStorage) {
  listaDeTarefas = JSON.parse(itensLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
botao.addEventListener('click', adicionarTarefa)
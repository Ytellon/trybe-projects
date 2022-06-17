const tarefaBotao = document.querySelector("#criar-tarefa");
const entradaTarefa = document.querySelector("#texto-tarefa");
const tarefaList = document.querySelector("#lista-tarefas");

tarefaBotao.addEventListener("click", addTask)

function addTask() {
  let lista = document.createElement("li") // crio um novo elemento de lista
  lista.innerHTML = entradaTarefa.value   // atribuo na lista o valor da entrada tarefa
  tarefaList.appendChild(lista)           // coloco essa lista como filho de tarefalist
  entradaTarefa.value = ""                // zera o valor de entradaTarefa
  let task = tarefaList.lastChild
  addClick(task)
  addDblclick(task)
}

function addClick(element) {
  element.addEventListener("click",function(){
      addColor(element)
    })
}

function addColor(element) {
  let taskItens = document.querySelectorAll("ol li") // pega os li da ol , me retornando um array
  for (let a of taskItens){       //  pega cada elemento do array
    a.style.background = "white"  // com esse elemento do array atribui a cor white
  }
  element.style.background = "grey" // quando a funcao addClick for chamada add a cor grey
}

function addDblclick (element) {
  element.addEventListener("dblclick",function(){
      drawLine(element)
    })
  }

function drawLine(element) {    
  let style = window.getComputedStyle(element)
  console.log(style);
  if (element.className == "completed" || style == "line-through"){
    element.className = ""
  }
  else {element.className = "completed"
  }
}
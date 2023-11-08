var draggableElements = document.querySelectorAll('.block-box');
var sequence = document.getElementById('sequence-box');
var draggingElement = null;
var contador = 0
var buttonConfirm = document.getElementById('title-confirm')
var footer = document.getElementById('blocks-box')
var listaSequencia = []
const { ipcRenderer } = require('electron')

draggableElements.forEach(function(element) {
    element.addEventListener('dragstart', function(e) {
        draggingElement = e.target.cloneNode(true);
        draggingElement.classList.add('dragging');
        draggingElement.id = `contador ${element.id} ${contador}`
        e.dataTransfer.setData('text/plain', draggingElement.id);
        document.body.appendChild(draggingElement);
        contador++
    });
});

sequence.addEventListener('dragover', function(e) {
    e.preventDefault();
});

sequence.addEventListener('drop', function(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData('text/plain');
    var droppedElement = document.getElementById(data);
    var endereco = droppedElement.id
    var palavras = endereco.split(" ")
    listaSequencia.push(palavras[1])
    console.log(listaSequencia)
    sequence.appendChild(droppedElement);
});

buttonConfirm.addEventListener('click', function(e) {
    ipcRenderer.on('resposta-do-processo-renderizador', (event, mensagem) => {
        console.log(mensagem);
      });
      
    var arquivoManda = `programa "tarefa1":
inicio
    _variavel1 = ler(${listaSequencia})
fim`

      ipcRenderer.send('mensagem-para-processo-renderizador', arquivoManda);
      
})


  
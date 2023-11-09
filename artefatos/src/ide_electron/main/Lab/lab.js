var draggableElements = document.querySelectorAll('.block-box');
var sequence = document.getElementById('sequence-box');
var draggingElement = null;
var contador = 0
var buttonConfirm = document.getElementById('title-confirm')
var footer = document.getElementById('blocks-box')
var listaSequencia = []
const { ipcRenderer, dialog } = require('electron')

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
    var inicio_de_programa = 'programa "tarefa1":\n\tinicio'

    var meio_de_programa = ""

    for (var i = 0; i < listaSequencia.length; i++){
        meio_de_programa += `
            quadranteEsperado = ${listaSequencia[i]}
            quadrantePressionado = ler()
            enquanto quadrantePressionado <> quadranteEsperado faca
            inicio
                mostrar(0)
                quadrantePressionado = ler()
            fim
            mostrar(1)\n`
    }

    var fim_de_programa = 'fim.'

    var programa = inicio_de_programa + meio_de_programa + fim_de_programa

    ipcRenderer.send('mensagem-para-processo-renderizador', programa);

      
})


  
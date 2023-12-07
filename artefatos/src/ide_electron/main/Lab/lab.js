// Importe o módulo ipcRenderer do Electron para comunicação entre processos
const { ipcRenderer } = require('electron');

// Selecione todos os elementos com a classe 'block-box'
var draggableElements = document.querySelectorAll('.block-box');

// Obtenha uma referência ao elemento com o id 'sequence-box'
var sequence = document.getElementById('sequence-box');

// Variável para armazenar o elemento atualmente arrastado
var draggingElement = null;

// Variável de controle temporário
var temp = 0;

// Obtenha uma referência ao botão com o id 'title-confirm'
var buttonConfirm = document.getElementById('title-confirm');

// Lista para armazenar os IDs dos blocos adicionados à sequência
var sequenceBlocksListAdded = [];

// Itere sobre todos os elementos com a classe 'block-box'
draggableElements.forEach(function(element) {
    // Adicione um ouvinte de eventos para o evento de arrastar (dragstart)
    element.addEventListener('dragstart', function(e) {
        // Clone o elemento arrastado e adicione a classe 'dragging'
        draggingElement = e.target.cloneNode(true);
        draggingElement.classList.add('dragging');
        // Lógica para adicionar a borda branca se o bloco for preto
        if (element.id == '15') {
            draggingElement.classList.add('block-style-black-box');
        } else {
            draggingElement.classList.add('block-style');
        }
        draggingElement.id = `temp ${element.id} ${temp}`;
        // Defina os dados de transferência para o ID do elemento clonado
        e.dataTransfer.setData('text/plain', draggingElement.id);
        // Anexe o elemento clonado ao corpo do documento
        document.body.appendChild(draggingElement);
        temp++;
    });
});

// Adicione um ouvinte de eventos para o evento de arrastar sobre a sequência
sequence.addEventListener('dragover', function(e) {
    // Evite o comportamento padrão do evento
    e.preventDefault();
});

// Adicione um ouvinte de eventos para o evento de soltar na sequência
sequence.addEventListener('drop', function(e) {
    // Evite o comportamento padrão do evento
    e.preventDefault();
    // Obtenha o ID do elemento arrastado
    var data = e.dataTransfer.getData('text/plain');
    // Obtenha a referência ao elemento clonado
    var droppedElement = document.getElementById(data);
    // Extraia informações do ID do elemento clonado
    var address = droppedElement.id;
    var temp_words = address.split(" ");
    // Adicione o ID do bloco à lista de blocos na sequência
    sequenceBlocksListAdded.push(temp_words[1]);
    // Registre a lista de blocos na sequência no console
    console.log(sequenceBlocksListAdded);
    // Anexe o elemento clonado à sequência
    sequence.appendChild(droppedElement);
});

// Adicione um ouvinte de eventos para o evento de clique no botão de confirmação
buttonConfirm.addEventListener('click', function(e) {
    // Crie a parte inicial do programa
    var start_of_program = 'programa "tarefa1":\n\tinicio';

    // Seção do programa a ser preenchida com base nos blocos adicionados à sequência
    var middle_of_program = "";

    // Itere sobre a lista de blocos na sequência para construir a parte intermediária do programa
    for (var i = 0; i < sequenceBlocksListAdded.length; i++) {
        middle_of_program += `
            quadranteEsperado = ${sequenceBlocksListAdded[i]}
            quadrantePressionado = ler()
            enquanto quadrantePressionado <> quadranteEsperado faca
            inicio
                mostrar(0)
                quadrantePressionado = ler()
            fim
            mostrar(1)\n`;
    }

    // Parte final do programa
    var end_of_program = 'fim.';

    // Concatene as partes do programa para formar o programa completo
    var program = start_of_program + middle_of_program + end_of_program;

    // Envie o código do programa aos analisadores via ipcRenderer
    ipcRenderer.send('code-for-analysers', program);

    // Envie o código do programa para execução via ipcRenderer
    ipcRenderer.send('call-python-code', program);

});

var openModalButton = document.getElementById('showModal');
openModalButton.addEventListener('click', function(e) {
    modal = document.querySelector('.modal');
    modal.style.display = 'block';
});



var closeModalButton = document.querySelector('.close');

closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});


var openSheepModalButton = document.getElementById('showSheepModal');
openSheepModalButton.addEventListener('click', function(e) {
modal = document.querySelector('.sheep-modal');
modal.style.display = 'block';
});

document.addEventListener("DOMContentLoaded", function() {
    var sheepModalCloseBtn = document.getElementById('sheepModalCloseBtn');
    sheepModalCloseBtn.addEventListener('click', function() {
        var sheepModal = document.querySelector('.sheep-modal');
        sheepModal.style.display = 'none';
    });
});

var openNumberModalButton = document.getElementById('showNumberModal');
openNumberModalButton.addEventListener('click', function(e) {
modal = document.querySelector('.number-modal');
modal.style.display = 'block';
});

document.addEventListener("DOMContentLoaded", function() {
    var numberModalCloseBtn = document.getElementById('numberModalCloseBtn');
    numberModalCloseBtn.addEventListener('click', function() {
        var numberModal = document.querySelector('.number-modal');
        numberModal.style.display = 'none';
    });
});

var openAlphabetModalButton = document.getElementById('showAlphabetModal');
openAlphabetModalButton.addEventListener('click', function(e) {
modal = document.querySelector('.alphabet-modal');
modal.style.display = 'block';
});

document.addEventListener("DOMContentLoaded", function() {
    var alphabetModalCloseBtn = document.getElementById('alphabetModalCloseBtn');
    alphabetModalCloseBtn.addEventListener('click', function() {
        var alphabetModal = document.querySelector('.alphabet-modal');
        alphabetModal.style.display = 'none';
    });
});

var openColorModalButton = document.getElementById('showColorModal');
openColorModalButton.addEventListener('click', function(e) {
modal = document.querySelector('.color-modal');
modal.style.display = 'block';
});

document.addEventListener("DOMContentLoaded", function() {
    var colorModalCloseBtn = document.getElementById('colorModalCloseBtn');
    colorModalCloseBtn.addEventListener('click', function() {
        var colorModal = document.querySelector('.color-modal');
        colorModal.style.display = 'none';
    });
});


var importButton = document.getElementById('importRecording');
var fileNameDisplay = document.getElementById('fileNameDisplay'); // Adicione um elemento para exibir o nome do arquivo

importButton.addEventListener('click', function(e) {
    // Crie um input do tipo "file"
    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Adicione o input ao corpo do documento
    document.body.appendChild(fileInput);

    // Oculte o input
    fileInput.style.display = 'none';

    // Adicione um ouvinte de eventos para o evento de alteração no input de arquivo
    fileInput.addEventListener('change', function(event) {
        // Obtenha o arquivo selecionado
        var selectedFile = event.target.files[0];

        // Exiba o nome do arquivo no elemento designado
        fileNameDisplay.textContent = selectedFile.name;

        // Remova o input de arquivo do corpo do documento
        document.body.removeChild(fileInput);
    });

    // Dispare um clique no input de arquivo
    fileInput.click();
});

var tasks_button = document.getElementById('backtoprofile');
var errorFeedbackButton = document.getElementById('title-feedback-wrong');
var sucessFeedbackButton = document.getElementById('title-feedback-correct');

tasks_button.addEventListener('click', function(e) {
    window.location.href = "../Child_Information/tarefas.html";
    });
errorFeedbackButton.addEventListener('click', function(e) {
    window.location.href = "../Feedback/errorFeedback.html";
    });
sucessFeedbackButton.addEventListener('click', function(e) {
    window.location.href = "../Feedback/successFeedback.html";
    });    






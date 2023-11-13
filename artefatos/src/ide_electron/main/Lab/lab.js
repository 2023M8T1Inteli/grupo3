// Import the ipcRenderer module from Electron for inter-process communication
const { ipcRenderer } = require('electron');

// Select all elements with the class 'block-box'
var draggableElements = document.querySelectorAll('.block-box');

// Get a reference to the element with the id 'sequence-box'
var sequence = document.getElementById('sequence-box');

// Variable to store the currently dragged element
var draggingElement = null;

// Temporary control variable
var temp = 0;

// Get a reference to the button with the id 'title-confirm'
var buttonConfirm = document.getElementById('title-confirm');

// List to store the IDs of blocks added to the sequence
var sequenceBlocksListAdded = [];

// Iterate over all elements with the class 'block-box'
draggableElements.forEach(function(element) {
    // Add an event listener for the dragstart event
    element.addEventListener('dragstart', function(e) {
        // Clone the dragged element and add the 'dragging' class
        draggingElement = e.target.cloneNode(true);
        draggingElement.classList.add('dragging');
        draggingElement.id = `temp ${element.id} ${temp}`;
        // Set the transfer data to the ID of the cloned element
        e.dataTransfer.setData('text/plain', draggingElement.id);
        // Append the cloned element to the document body
        document.body.appendChild(draggingElement);
        temp++;
    });
});

// Add an event listener for the dragover event on the sequence
sequence.addEventListener('dragover', function(e) {
    // Prevent the default event behavior
    e.preventDefault();
});

// Add an event listener for the drop event on the sequence
sequence.addEventListener('drop', function(e) {
    // Prevent the default event behavior
    e.preventDefault();
    // Get the ID of the dragged element
    var data = e.dataTransfer.getData('text/plain');
    // Get the reference to the cloned element
    var droppedElement = document.getElementById(data);
    // Extract information from the ID of the cloned element
    var address = droppedElement.id;
    var temp_words = address.split(" ");
    // Add the block's ID to the list of blocks in the sequence
    sequenceBlocksListAdded.push(temp_words[1]);
    // Log the list of blocks in the sequence to the console
    console.log(sequenceBlocksListAdded);
    // Append the cloned element to the sequence
    sequence.appendChild(droppedElement);
});

// Add an event listener for the click event on the confirmation button
buttonConfirm.addEventListener('click', function(e) {
    // Create the initial part of the program
    var start_of_program = 'programa "tarefa1":\n\tinicio';

    // Section of the program to be filled based on the blocks added to the sequence
    var middle_of_program = "";

    // Loop through the list of blocks in the sequence to build the middle part of the program
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

    // Final part of the program
    var end_of_program = 'fim.';

    // Concatenate the program parts to form the complete program
    var program = start_of_program + middle_of_program + end_of_program;

    // Send the program code to analyzers via ipcRenderer
    ipcRenderer.send('code-for-analysers', program);

    // Send the program code for execution via ipcRenderer
    ipcRenderer.send('call-python-code', program);
});

  
// Import the ipcRenderer module from Electron for inter-process communication
const { ipcRenderer } = require('electron');
const sequelize = require('../../config/database.js');

const fs = require('fs');
const path = require('path');

var draggableElements = document.querySelectorAll('.block-box');

var sequence = document.getElementById('sequence-box');

// Variable to store the currently dragged element
var draggingElement = null;

var temp = 0;

var buttonConfirm = document.getElementById('title-confirm');

// List to store the IDs of blocks added to the sequence
var sequenceBlocksListAdded = [];

// Iterate over all elements with the class 'block-box'
draggableElements.forEach(function(element) {
    element.addEventListener('dragstart', function(e) {
        // Clone the dragged element and add the 'dragging' class
        draggingElement = e.target.cloneNode(true);
        draggingElement.classList.add('dragging');
        // Logic to add a white border if the block is black
        if (element.id == '15') {
            draggingElement.classList.add('block-style-black-box');
        } else {
            draggingElement.classList.add('block-style');
        }
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
    e.preventDefault();
});


// Add an event listener for the drop event on the sequence
sequence.addEventListener('drop', function(e) {
    e.preventDefault();
    // Get the ID of the dragged element
    var data = e.dataTransfer.getData('text/plain');
    // Get the reference to the cloned element
    var droppedElement = document.getElementById(data.split(" ")[1]);
    droppedElement = droppedElement.cloneNode(true);
    // Extract information from the ID of the cloned element
    var address = droppedElement.id;
    // Add the block ID to the list of blocks in the sequence
    sequenceBlocksListAdded.push(address);
    // Log the list of blocks in the sequence to the console
    localStorage.setItem('sequenceBlocksListAdded', sequenceBlocksListAdded);
    // Append the cloned element to the sequence
    sequence.appendChild(droppedElement);
});

// Function to create the QAL code according to the blocks added to the sequence
function sendCode() {
    // Create the initial part of the program
    var start_of_program = 'programa "tarefa1":\n\tinicio';

    // Section of the program to be filled based on the blocks added to the sequence
    var middle_of_program = "";

    // Iterate over the list of blocks in the sequence to build the middle part of the program
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

    // Concatenate the parts of the program to form the complete program
    var program = start_of_program + middle_of_program + end_of_program;

    // Send the program code to the analyzers via ipcRenderer
    ipcRenderer.send('code-for-analysers', program);

    // Send the program code for execution via ipcRenderer
    ipcRenderer.send('call-python-code', program);

    setTimeout(() => {
        window.location.href = "../Child_Information/tarefas.html";
    }, 3000)
}

// Function to erase all blocks from the sequence
function eraseBlocks() {
    const boxes = sequence.querySelectorAll('.block-box');
    boxes.forEach(box => {
        box.remove();
    });

    sequenceBlocksListAdded = [];

    localStorage.setItem('sequenceBlocksListAdded', '')
} 

// Function to add each block of the sequence to the database
async function addBlock() {
    if (localStorage.getItem('sequenceBlocksListAdded') == "" || localStorage.getItem('sequenceBlocksListAdded') == null) {
        alert("Nenhum bloco foi adicionado à sequência!")
        return false
    } else {
        let blocks = localStorage.getItem('sequenceBlocksListAdded').split(',')
        if (localStorage.getItem('sequenceBlocksListAddedIds') != null) {
            let ids = localStorage.getItem('sequenceBlocksListAddedIds').split(',')

            ids.forEach(function(element) {
                ipcRenderer.send('delete-blocks-task', element)
            })
            await sequelize.sequelize.query("UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'BlocksTasks'")
        }
        blocks.forEach(function(element) {
            ipcRenderer.send('register-blocks-task', {
                block: element,
                timing: 100,
                TaskId: parseInt(localStorage.getItem('taskId'))
            })

            ipcRenderer.on('response-register-blocks-task', (event, arg) => {
                if (arg.message == "Falha ao criar sequência de blocos") {
                    alert("Não foi possível salvar a tarefa")
                    return false
                }
            })
        });
        return true
    }
}

// Add an event listener for the click event on the confirmation button
// If everything is ok, send the code to the analyzers and for execution and create the feedbacks on the database
buttonConfirm.addEventListener('click', async function(e) {
    let block = await addBlock()
    if (!block) {
        return
    }
    if (localStorage.getItem('hasFeedback') == "true") {
        let feedback = JSON.parse(localStorage.getItem('successFeedback'));
        if (feedback.sound == undefined) {
            ipcRenderer.send('update-feedback', {
                id: parseInt(localStorage.getItem('successFeedbackId')),
                body: {
                    message: feedback.message,
                    color: feedback.color,
                    image: feedback.image,
                    type_feedback: feedback.type_feedback,
                }
            });
        } else {
            ipcRenderer.send('update-feedback', {
                id: parseInt(localStorage.getItem('successFeedbackId')),
                body: {
                    message: feedback.message,
                    color: feedback.color,
                    image: feedback.image,
                    type_feedback: feedback.type_feedback,
                }
            });
        }

        ipcRenderer.on('response-update-feedback', (event, arg) => {
            localStorage.setItem('feedbackMessage', arg.message)
        })

        if (localStorage.getItem('feedbackMessage') == "Houve falhas para atualizar o feedback") {
            alert("Não foi possível salvar a tarefa")
        } else {
            feedback = JSON.parse(localStorage.getItem('errorFeedback'));
            if (feedback.sound == undefined) {
                ipcRenderer.send('update-feedback', {
                    id: parseInt(localStorage.getItem('errorFeedbackId')),
                    body: {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        type_feedback: feedback.type_feedback,
                    }
                });
            } else {
                ipcRenderer.send('update-feedback', {
                    id: parseInt(localStorage.getItem('errorFeedbackId')),
                    body: {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        type_feedback: feedback.type_feedback,
                    }
                });
            }

            ipcRenderer.on('response-update-feedback', (event, arg) => {
                localStorage.setItem('feedbackMessage', arg.message)
            })

            if (localStorage.getItem('feedbackMessage') == "Houve falhas para atualizar o feedback") {
                alert("Não foi possível salvar a tarefa")
            } else {
                sendCode();
            }
        }
    } else {
        if (localStorage.getItem('successFeedback') == null || localStorage.getItem('errorFeedback') == null) {
            alert("Feedbacks não foram escolhidos!")
            return
        } else {

            if (localStorage.getItem('taskTitle') == undefined) {
                alert("Título da tarefa não foi definido!")
                return
            } else {
                let feedback = JSON.parse(localStorage.getItem('successFeedback'));
                if (feedback.sound == undefined) {
                    ipcRenderer.send('register-feedback', {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        type_feedback: feedback.type_feedback,
                        TaskId: parseInt(localStorage.getItem('taskId'))
                    })
                } else {
                    ipcRenderer.send('register-feedback', {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        sound: feedback.sound,
                        type_feedback: feedback.type_feedback,
                        TaskId: localStorage.getItem('taskId')
                    })
                }

                ipcRenderer.on('response-register-feedback', (event, arg) => {
                    localStorage.setItem('feedbackMessage', arg.message)
                })

                if (localStorage.getItem('feedbackMessage') == "Não foi possível criar o feedback") {
                    alert("Não foi possível salvar a tarefa")
                } else {
                    let feedback = JSON.parse(localStorage.getItem('errorFeedback'));
                    if (feedback.sound == undefined) {
                        ipcRenderer.send('register-feedback', {
                            message: feedback.message,
                            color: feedback.color,
                            image: feedback.image,
                            type_feedback: feedback.type_feedback,
                            TaskId: parseInt(localStorage.getItem('taskId'))
                        })
                    } else {
                        ipcRenderer.send('register-feedback', {
                            message: feedback.message,
                            color: feedback.color,
                            image: feedback.image,
                            sound: feedback.sound,
                            type_feedback: feedback.type_feedback,
                            TaskId: localStorage.getItem('taskId')
                        })
                    }

                    ipcRenderer.on('response-register-feedback', (event, arg) => {
                        localStorage.setItem('feedbackMessage', arg.message)
                    })
                    if (localStorage.getItem('feedbackMessage') == "Não foi possível criar o feedback") {
                        alert("Não foi possível salvar a tarefa")
                    } else {
                        sendCode();
                    }
                }
            }
        }
    }
});

var openModalButton = document.getElementById('showModal');
openModalButton.addEventListener('click', function(e) {
    modal = document.querySelector('.modal');
    modal.style.display = 'block';
});

var modal = document.querySelector('.sheep-modal-body');

modal.addEventListener('click', function(e) {
    if (e.target.tagName === 'DIV') {
        // Get the src attribute of the clicked image
        let option = e.target.querySelector('p')
        let feedback = document.getElementById('feedbackModal');
        feedback.style.display = 'flex';
        localStorage.setItem('feedback', option.textContent.toLowerCase());
    }
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
var fileNameDisplay = document.getElementById('fileNameDisplay');

importButton.addEventListener('click', function(e) {
    // Create an input of type "file"
    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Add the input to the document body
    document.body.appendChild(fileInput);

    // Hide the input
    fileInput.style.display = 'none';

    // Add an event listener for the change event on the file input
    fileInput.addEventListener('change', function(event) {
        // Get the selected file
        var selectedFile = event.target.files[0];

        // Show the file name in the designated element
        fileNameDisplay.textContent = selectedFile.name;

        // Remove the file input from the document body
        document.body.removeChild(fileInput);
    });

    // Trigger a click on the file input
    fileInput.click();
});

var tasks_button = document.getElementById('back');
var errorFeedbackButton = document.getElementById('title-feedback-wrong');
var successFeedbackButton = document.getElementById('title-feedback-correct');

// Function to redirect to the tasks page without saving the changes
tasks_button.addEventListener('click', function(e) {
    if(confirm("Tem certeza que deseja voltar? Todas as alterações serão perdidas.")) {
        localStorage.removeItem('taskTitle');
        localStorage.removeItem('feedbackMessage');
        localStorage.removeItem('taskId');
        localStorage.removeItem('hasFeedback');
        localStorage.setItem('sequenceBlocksListAdded', '');
        window.location.href = "../Child_Information/tarefas.html";
    }
});

errorFeedbackButton.addEventListener('click', function(e) {
    window.location.href = "../Feedback/errorFeedback.html";
    });

successFeedbackButton.addEventListener('click', function(e) {
    window.location.href = "../Feedback/successFeedback.html";
    });   

// Function to debounce another function
function debounce(func, delay) {
    let timeoutId;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// Your input element
var taskTitle = document.getElementById('title-content');

// Function to be called when typing stops
function handleTypingStopped() {
    var title = taskTitle.value;
    localStorage.setItem('taskTitle', title);
}

// Add a debounced event listener to the input
taskTitle.addEventListener('input', debounce(handleTypingStopped, 1000)); // Adjust the delay as needed (e.g., 500 milliseconds)

if (localStorage.getItem('taskTitle') != null) {
    taskTitle.value = localStorage.getItem('taskTitle').replace(/['"]+/g, '');
}

// Function to add a notification badge to the success feedback button
function setSuccessNotification() {
    let successDiv = document.getElementById('success-text-box');

    if (localStorage.getItem('successNotification') == "0" && document.querySelector('#success-badge') != null) {
        let span = document.querySelector('#success-badge');
        successDiv.removeChild(span)
    } else {
        let span = document.createElement('span');
        span.className = 'badge';
        span.id = 'success-badge';
        span.textContent = localStorage.getItem('successNotification');
        successDiv.prepend(span)
    }
}

// Function to add a notification badge to the error feedback button
function setErrorNotification() {
    let errorDiv = document.getElementById('error-text-box');

    if (localStorage.getItem('errorNotification') == "0" && document.querySelector('#error-badge') != null) {
        let span = document.querySelector('#error-badge');
        errorDiv.removeChild(span)
    } else {
        let span = document.createElement('span');
        span.className = 'badge';
        span.id = 'error-badge';
        span.textContent = localStorage.getItem('errorNotification');
        errorDiv.prepend(span)
    }
}

setErrorNotification();
setSuccessNotification();

/** Function to copy a sound to the success or error feedback folder
 * @param {number} id - 0 for success feedback, 1 for error feedback, 2 for both
*/ 
function feedback(id) {
    if (localStorage.getItem('feedback') == "pássaro") {
        localStorage.setItem('feedback', "passaro")
    }
    if (id == 0) {
        const sourcePath = path.join(__dirname, '..', 'Feedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);
        const destinationPath = path.join(__dirname, '..', 'Feedback', 'SuccessFeedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);

        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
                localStorage.setItem('successNotification', parseInt(localStorage.getItem('successNotification')) + 1);
                window.location.reload();
            }
        });
    }
    else if (id == 1) {
        const sourcePath = path.join(__dirname, '..', 'Feedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);
        const destinationPath = path.join(__dirname, '..', 'Feedback', 'ErrorFeedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);

        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
                localStorage.setItem('errorNotification', parseInt(localStorage.getItem('errorNotification')) + 1);
                window.location.reload();
            }
        });
    }
    else {
        let sourcePath = path.join(__dirname, '..', 'Feedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);
        let destinationPath = path.join(__dirname, '..', 'Feedback', 'ErrorFeedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);

        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
                localStorage.setItem('errorNotification', parseInt(localStorage.getItem('errorNotification')) + 1);
            }
        });

        sourcePath = path.join(__dirname, '..', 'Feedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);
        destinationPath = path.join(__dirname, '..', 'Feedback', 'SuccessFeedback', 'sounds', `${localStorage.getItem('feedback')}.mp3`);

        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
                localStorage.setItem('successNotification', parseInt(localStorage.getItem('successNotification')) + 1);
                window.location.reload();
            }
        });
    }
}

// Function to get the feedbacks and blocks of the selected task from the database
document.addEventListener('DOMContentLoaded', function(e) {
    ipcRenderer.send('read-task-feedback', localStorage.getItem('taskId'));

    ipcRenderer.on('response-read-task-feedback', (event, arg) => {
        if (arg.response.length > 0) {
            localStorage.setItem('successFeedback', JSON.stringify(arg.response[0].dataValues))
            localStorage.setItem('errorFeedback', JSON.stringify(arg.response[1].dataValues))
            localStorage.setItem('hasFeedback', true)
            localStorage.setItem('successFeedbackId', arg.response[0].dataValues.id)
            localStorage.setItem('errorFeedbackId', arg.response[1].dataValues.id)
        } else {
            localStorage.setItem('hasFeedback', false)
        }
    })

    ipcRenderer.send('read-task-blocks-task', localStorage.getItem('taskId'));

    ipcRenderer.on('response-read-task-blocks-task', (event, arg) => {
        console.log(arg.response)
        if (arg.response.length > 0) {
            let blocks = []
            let ids = []
            arg.response.forEach(element => {
                blocks.push(element.dataValues.block)
                ids.push(element.dataValues.id)
            });
            console.log(blocks)
            localStorage.setItem('sequenceBlocksListAdded', blocks)
            localStorage.setItem('sequenceBlocksListAddedIds', ids)

            if (localStorage.getItem('sequenceBlocksListAdded') != null && localStorage.getItem('sequenceBlocksListAdded') != '') {
                if (localStorage.getItem('sequenceBlocksListAdded').split(',').length > 0) {
                    sequenceBlocksListAdded = localStorage.getItem('sequenceBlocksListAdded').split(',');
                    sequenceBlocksListAdded.forEach(function(element) {
                        console.log(localStorage)
                        let block = document.getElementById(element);
                        sequence.appendChild(block.cloneNode(true));
                     });
                }
            }
        }
    })
})
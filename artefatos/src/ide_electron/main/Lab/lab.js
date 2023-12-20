// Importe o módulo ipcRenderer do Electron para comunicação entre processos
const { ipcRenderer } = require('electron');
const sequelize = require('../../config/database.js');

const fs = require('fs');
const path = require('path');

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

let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let audioContext

if (localStorage.getItem('sequenceBlocksListAdded') != null && localStorage.getItem('sequenceBlocksListAdded') != '') {
    if (localStorage.getItem('sequenceBlocksListAdded').split(',').length > 0) {
        sequenceBlocksListAdded = localStorage.getItem('sequenceBlocksListAdded').split(',');
        sequenceBlocksListAdded.forEach(function(element) {
            let block = document.getElementById(element);
            sequence.appendChild(block.cloneNode(true));
         });
    }
}

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

var currentBlock = 0

// Adicione um ouvinte de eventos para o evento de soltar na sequência
sequence.addEventListener('drop', function(e) {
    // Evite o comportamento padrão do evento
    e.preventDefault();
    // Obtenha o ID do elemento arrastado
    var data = e.dataTransfer.getData('text/plain');
    // Obtenha a referência ao elemento clonado
    var droppedElement = document.getElementById(data.split(" ")[1]);
    droppedElement = droppedElement.cloneNode(true);
    // Extraia informações do ID do elemento clonado
    var address = droppedElement.id;
    // Adicione o ID do bloco à lista de blocos na sequência
    sequenceBlocksListAdded.push(address);
    // Registre a lista de blocos na sequência no console
    localStorage.setItem('sequenceBlocksListAdded', sequenceBlocksListAdded);
    // Anexe o elemento clonado à sequência

    droppedElement.id = droppedElement.id + String(currentBlock);
    currentBlock += 1;
    sequence.appendChild(droppedElement);
});

var chooseBlockLetter = document.querySelector('#letter');
var chooseBlockNumber = document.querySelector('#number')
var x = 0
var y = 0
var currentX = 0
var currentY = 0

function chooseLetter(letter) { 
    console.log('chooseLetter called with letter:', letter);
    chooseBlockLetter.style.display = 'flex';

    function createEventHandler(currentLetter) {
        return function handleInput(e) {
            if (x == 0) {
                currentX += 1
                x = currentX
                console.log('handleInput called with letter:', currentLetter);

                if (e.target.value === "") {
                    return;
                }

                if (e.target.value - 1 >= sequenceBlocksListAdded.length) {
                    alert("O número deve ser menor ou igual ao número de blocos na sequência!");
                    e.target.value = "";
                    e.target.focus();
                } else {
                    let droppedElement = sequence.querySelector('[id="' + (sequenceBlocksListAdded[e.target.value - 1]) + String(e.target.value - 1) + '"]');
                    console.log(droppedElement);
                    if (droppedElement.querySelector('span') != null) {
                        droppedElement.removeChild(droppedElement.querySelector('span'));
                    }

                    span = document.createElement('span');
                    span.innerText = currentLetter;
                    droppedElement.prepend(span);
                    chooseBlockLetter.style.display = 'none';
                    document.getElementById('letter-block-content').value = "";
                }
            }
            else {
                x --
            }
        };
    }

    const inputElement = document.getElementById('letter-block-content');
    console.log(inputElement)
    // Remove the existing event listener before adding a new one
    inputElement.removeEventListener('input', createEventHandler(letter));

    // Add the new event listener
    inputElement.addEventListener('input', createEventHandler(letter));
}

function chooseNumber(letter) { 
    console.log('chooseLetter called with letter:', letter);
    chooseBlockNumber.style.display = 'flex';

    function createEventNumberHandler(currentLetter) {
        return function handleNumberInput(e) {
            if (y == 0) {
                currentY += 1
                y = currentY
                console.log('handleInput called with letter:', currentLetter);

                if (e.target.value === "") {
                    return;
                }

                if (e.target.value - 1 >= sequenceBlocksListAdded.length) {
                    alert("O número deve ser menor ou igual ao número de blocos na sequência!");
                    e.target.value = "";
                    e.target.focus();
                } else {
                    let droppedElement = sequence.querySelector('[id="' + (sequenceBlocksListAdded[e.target.value - 1]) + String(e.target.value - 1) + '"]');
                    console.log(droppedElement);

                    if (droppedElement.querySelector('span') != null) {
                        droppedElement.removeChild(droppedElement.querySelector('span'));
                    }

                    span = document.createElement('span');
                    span.innerText = currentLetter;
                    droppedElement.prepend(span);
                    chooseBlockNumber.style.display = 'none';
                    document.getElementById('number-block-content').value = "";
                }
            }
            else {
                y --
            }
        };
    }

    const inputElement = document.getElementById('number-block-content');

    // Remove the existing event listener before adding a new one
    inputElement.removeEventListener('input', createEventNumberHandler(letter));

    // Add the new event listener
    inputElement.addEventListener('input', createEventNumberHandler(letter));
}


function sendCode() {
    // Crie a parte inicial do programa
    var start_of_program = 'programa "tarefa1":\n\tinicio\n\terros = 0\n\tacertos=0';

    // Seção do programa a ser preenchida com base nos blocos adicionados à sequência
    var middle_of_program = "";

    let success_image_id = JSON.parse(localStorage.getItem('successFeedback')).image_id
    let success_sound_id = JSON.parse(localStorage.getItem('successFeedback')).sound_id
    let error_image_id = JSON.parse(localStorage.getItem('errorFeedback')).image_id
    let error_sound_id = JSON.parse(localStorage.getItem('errorFeedback')).sound_id

    // Itere sobre a lista de blocos na sequência para construir a parte intermediária do programa
    for (var i = 0; i < sequenceBlocksListAdded.length; i++) {
        middle_of_program += `
            quadranteEsperado = ${sequenceBlocksListAdded[i]}
            quadrantePressionado = ler()
            enquanto quadrantePressionado <> quadranteEsperado faca
            inicio
                mostrar_tocar_feedback(${error_sound_id}, ${error_image_id}, 0)
                erros = erros + 1
                quadrantePressionado = ler()
            fim
            acertos = acertos + 1
            mostrar_tocar_feedback(${success_sound_id}, ${success_image_id}, 1)\n`;
    }

    // Parte final do programa
    var end_of_program = 'fim.';

    // Concatene as partes do programa para formar o programa completo
    var program = start_of_program + middle_of_program + end_of_program;

    // Envie o código do programa aos analisadores via ipcRenderer
    ipcRenderer.send('code-for-analysers', program);

    ipcRenderer.on('response-code-for-analysers', (event, arg) => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
            
        ipcRenderer.send('register-performance', {
            hits: arg.success,
            mistakes: arg.errors,
            consultation_data: currentDate,
            MyTasksId: localStorage.getItem('taskId')
        })
    })


    // Envie o código do programa para execução via ipcRenderer
    ipcRenderer.send('call-python-code', program);

    setTimeout(() => {
        localStorage.removeItem("changedFeedback")
        sequenceBlocksListAdded = [];

        localStorage.setItem('sequenceBlocksListAdded', '')
        localStorage.removeItem("changedBlocks")
        window.location.href = "../Child_Information/tarefas.html";
    }, 3000)
}

function eraseBlocks() {
    const boxes = sequence.querySelectorAll('.block-box');
    boxes.forEach(box => {
        box.remove();
    });

    sequenceBlocksListAdded = [];

    localStorage.setItem('sequenceBlocksListAdded', '')

    localStorage.setItem('changedBlocks', 'true')
} 

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

// Adicione um ouvinte de eventos para o evento de clique no botão de confirmação
buttonConfirm.addEventListener('click', async function(e) {
    let block = await addBlock()
    if (!block) {
        return
    }
    if (localStorage.getItem('hasFeedback') == "true") {
        let feedback = JSON.parse(localStorage.getItem('successFeedback'));
        fs.writeFile(path.join(__dirname, "..", "Feedback", "SuccessFeedback", "message.txt"), feedback.message + "\n" + feedback.color, function(err) {
            if(err) {
                return console.log(err);
            }
        });
        if (feedback.sound == undefined) {
            ipcRenderer.send('update-feedback', {
                id: parseInt(localStorage.getItem('successFeedbackId')),
                body: {
                    message: feedback.message,
                    color: feedback.color,
                    image: feedback.image,
                    type_feedback: feedback.type_feedback,
                    sound_id: feedback.sound_id,
                    image_id: feedback.image_id,
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
                    sound_id: feedback.sound_id,
                    image_id: feedback.image_id,
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
            fs.writeFile(path.join(__dirname, "..", "Feedback", "ErrorFeedback", "message.txt"), feedback.message + "\n" + feedback.color, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            if (feedback.sound == undefined) {
                ipcRenderer.send('update-feedback', {
                    id: parseInt(localStorage.getItem('errorFeedbackId')),
                    body: {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        type_feedback: feedback.type_feedback,
                        sound_id: feedback.sound_id,
                        image_id: feedback.image_id,
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
                        sound_id: feedback.sound_id,
                        image_id: feedback.image_id,
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
                fs.writeFile(path.join(__dirname, "..", "Feedback", "SuccessFeedback", "message.txt"), feedback.message + "\n" + feedback.color, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                });
                if (feedback.sound == undefined) {
                    ipcRenderer.send('register-feedback', {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        type_feedback: feedback.type_feedback,
                        sound_id: feedback.sound_id,
                        image_id: feedback.image_id,
                        TaskId: parseInt(localStorage.getItem('taskId'))
                    })
                } else {
                    ipcRenderer.send('register-feedback', {
                        message: feedback.message,
                        color: feedback.color,
                        image: feedback.image,
                        sound: feedback.sound,
                        type_feedback: feedback.type_feedback,
                        sound_id: feedback.sound_id,
                        image_id: feedback.image_id,
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
                    fs.writeFile(path.join(__dirname, "..", "Feedback", "ErrorFeedback", "message.txt"), feedback.message + "\n" + feedback.color, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });
                    if (feedback.sound == undefined) {
                        ipcRenderer.send('register-feedback', {
                            message: feedback.message,
                            color: feedback.color,
                            image: feedback.image,
                            type_feedback: feedback.type_feedback,
                            sound_id: feedback.sound_id,
                            image_id: feedback.image_id,
                            TaskId: parseInt(localStorage.getItem('taskId'))
                        })
                    } else {
                        ipcRenderer.send('register-feedback', {
                            message: feedback.message,
                            color: feedback.color,
                            image: feedback.image,
                            sound: feedback.sound,
                            type_feedback: feedback.type_feedback,
                            sound_id: feedback.sound_id,
                            image_id: feedback.image_id,
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
    console.log("open number modal")
    modal = document.querySelector('.number-modal');
    console.log(modal);
    console.log(modal.style.display);
    modal.style.display = 'block';
    console.log(modal.style.display);
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

var file = document.getElementById("importRecording");
var audioFile;

file.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        audioFile = file;
    }

    let destinationPath = path.join(__dirname, 'records', audioFile.name);

    fs.copyFile(audioFile.path, destinationPath, (err) => {
        if (err) throw err;
        console.log('Arquivo copiado com sucesso!');
    });

    initialRecordScreen = document.getElementById("initial-record");
    recordList = document.getElementById("records-list");
    recordModalTitle = document.getElementById("record-modal-title");
    
    setTimeout(() => {
        initialRecordScreen.style.display = "none";
        recordList.style.display = "flex";
        recordModalTitle.innerHTML = "Iniciar uma nova gravação"
        readSounds();
    }, 500);
})

var tasks_button = document.getElementById('back');
var errorFeedbackButton = document.getElementById('title-feedback-wrong');
var successFeedbackButton = document.getElementById('title-feedback-correct');

tasks_button.addEventListener('click', function(e) {
    if(confirm("Tem certeza que deseja voltar? Todas as alterações serão perdidas.")) {
        localStorage.removeItem('taskTitle');
        localStorage.removeItem('feedbackMessage');
        localStorage.removeItem('taskId');
        localStorage.removeItem('hasFeedback');
        localStorage.setItem('sequenceBlocksListAdded', '');
        localStorage.removeItem("changedFeedback")
        localStorage.removeItem("changedBlocks")
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

//Function to set the success notification badge
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

//Function to set the error notification badge
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

/**
 * Function to save a sound file in the success or error feedback folder
 * @param {number} id: 0 for success feedback, 1 for error feedback, 2 for both 
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

// Function to get the blocks and feedbacks from the database if it exists
document.addEventListener('DOMContentLoaded', function(e) {
    if (localStorage.getItem('changedFeedback') != 'true') {
        ipcRenderer.send('read-task-feedback', localStorage.getItem('taskId'));

        ipcRenderer.on('response-read-task-feedback', (event, arg) => {
            if (arg.response.length > 0) {
                localStorage.setItem('successFeedback', JSON.stringify(arg.response[0].dataValues))
                localStorage.setItem('errorFeedback', JSON.stringify(arg.response[1].dataValues))
                localStorage.setItem('hasFeedback', true)
                localStorage.setItem('successFeedbackId', arg.response[0].dataValues.id)
                localStorage.setItem('errorFeedbackId', arg.response[1].dataValues.id)
                localStorage.setItem('changedFeedback', 'false')
            } else {
                localStorage.setItem('hasFeedback', false)
            }
        })
    }

    if (localStorage.getItem('changedBlocks') != 'true') {
        ipcRenderer.send('read-task-blocks-task', localStorage.getItem('taskId'));

        ipcRenderer.on('response-read-task-blocks-task', (event, arg) => {
            if (arg.response.length > 0) {
                let blocks = []
                let ids = []
                arg.response.forEach(element => {
                    blocks.push(element.dataValues.block)
                    ids.push(element.dataValues.id)
                });
                localStorage.setItem('sequenceBlocksListAdded', blocks)
                localStorage.setItem('sequenceBlocksListAddedIds', ids)

                if (localStorage.getItem('sequenceBlocksListAdded') != null && localStorage.getItem('sequenceBlocksListAdded') != '') {
                    if (localStorage.getItem('sequenceBlocksListAdded').split(',').length > 0) {
                        sequenceBlocksListAdded = localStorage.getItem('sequenceBlocksListAdded').split(',');
                        sequenceBlocksListAdded.forEach(function(element) {
                            let block = document.getElementById(element);
                            sequence.appendChild(block.cloneNode(true));
                        });
                    }
                }
            }
        })
    }
})

function startRecording() {
    initialRecordScreen = document.getElementById("initial-record");
    recordScreen = document.getElementById("record-screen");
    recordingScreen = document.getElementById("recording-screen");
    recordModalTitle = document.getElementById("record-modal-title");
    
    if (initialRecordScreen.style.display != "none") {
        initialRecordScreen.style.display = "none";
        recordScreen.style.display = "flex";
        recordModalTitle.innerHTML = "Iniciar uma nova gravação";
    }
    else if (recordScreen.style.display != "none") {
        recordScreen.style.display = "none";
        recordingScreen.style.display = "flex";
        recordModalTitle.innerHTML = "Gravando";
        toggleRecording();
        setTimeout(() => {
            recordingTime(0, 0, 0);
        }, 1000)
    }
}

function recordingTime(actualSeconds, actualMinutes, actualHours) {
    recordingScreen = document.getElementById("recording-screen");
    
    seconds = actualSeconds + 1;
    minutes = actualMinutes;
    hours = actualHours;

    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }

    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }

    secondsString = seconds < 10 ? "0" + String(seconds) : String(seconds)
    minutesString = minutes < 10 ? "0" + String(minutes) : String(minutes)
    hoursString = hours < 10 ? "0" + String(hours) : String(hours)

    recordTime = document.getElementById("record-time");

    if (isRecording) {
        recordTime.innerHTML = hoursString + ":" + minutesString + ":" + secondsString;
    }

    if (recordingScreen.style.display == "flex") {
        setTimeout(() => {
            recordingTime(seconds, minutes, hours);
        }, 1000)
    }

}

function closeRecordModal() {
    initialRecordScreen = document.getElementById("initial-record");
    recordScreen = document.getElementById("record-screen");
    recordingScreen = document.getElementById("recording-screen");
    recordTime = document.getElementById("record-time");
    recordModalTitle = document.getElementById("record-modal-title");
    recordList = document.getElementById("records-list");

    
    initialRecordScreen.style.display = "flex";
    recordScreen.style.display = "none";
    recordingScreen.style.display = "none";
    recordTime.innerHTML = "00:00:00"
    recordList.style.display = "none";
    recordModalTitle.innerHTML = "Gravação de voz";
}

function recordsList() {
    initialRecordScreen = document.getElementById("initial-record");
    recordList = document.getElementById("records-list");
    recordModalTitle = document.getElementById("record-modal-title");
    
    initialRecordScreen.style.display = "none";
    recordList.style.display = "flex";
    recordModalTitle.innerHTML = "Iniciar uma nova gravação"
    readSounds();
}

function expandRecordItem(recordClass) {
    recordItem = document.querySelector("." + recordClass);
    recordItemButton = document.querySelector("." + recordClass + "-buttons");

    if (recordItem.style.height == "66.6px") {
        recordItem.style.height = "100px";
        recordItemButton.style.display = "flex";
    }
    else {
        recordItem.style.height = "66.6px";
        recordItemButton.style.display = "none";
    }
}

// Function to display all the sounds in the sounds folder
function readSounds() {
    const fullPath = path.join(__dirname, 'records')

    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
        recordList.innerHTML = "";

        files.forEach((file, index) => {
            let recordList = document.getElementById('records-list');
            recordList.innerHTML += `<div id="record-item" class="record-item-${index}">
                                        <div id="record-item-title" onclick="expandRecordItem('record-item-${index}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" class="bi bi-file-earmark-music" viewBox="0 0 16 16">
                                                <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z"/>
                                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                            </svg>
                                            <h3>${file.split('.')[0]}</h3>
                                        </div>
                                        <div>10 de set de 2022 - 20:30 h</div>
                                        <div id="record-item-butons" class="record-item-${index}-buttons">
                                            <button id="record-item-button" class="record-item-${index}-button" onclick="recordFeedback(0, '${file.split('.')[0]}')">Feedback Acerto</button>
                                            <button id="record-item-button" class="record-item-${index}-button" onclick="recordFeedback(1, '${file.split('.')[0]}')">Feedback Erro</button>
                                            <button id="record-item-button" class="record-item-${index}-button" onclick="recordFeedback(2, '${file.split('.')[0]}')">Ambos</button>
                                        </div>
                                    </div>`
        })
    })
}

function recordFeedback(id, fileName) {
    if (id == 0) {
        const sourcePath = path.join(__dirname, 'records', `${fileName}.mp3`);
        const destinationPath = path.join(__dirname, '..', 'Feedback', 'SuccessFeedback', 'sounds', `${fileName}.mp3`);
        

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
        const sourcePath = path.join(__dirname, 'records', `${fileName}.mp3`);
        const destinationPath = path.join(__dirname, '..', 'Feedback', 'ErrorFeedback', 'sounds', `${fileName}.mp3`);

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
        const sourcePath = path.join(__dirname, 'records', `${fileName}.mp3`);
        let destinationPath = path.join(__dirname, '..', 'Feedback', 'ErrorFeedback', 'sounds', `${fileName}.mp3`);

        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
                localStorage.setItem('errorNotification', parseInt(localStorage.getItem('errorNotification')) + 1);
            }
        });

        destinationPath = path.join(__dirname, '..', 'Feedback', 'SuccessFeedback', 'sounds', `${fileName}.mp3`);

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

async function toggleRecording() {
    if (isRecording) {
        stopRecording();
        isRecording = false;
    } else {
        startRec();
        isRecording = true;
    }
}
    
async function startRec() {
    console.log("Starting recording");

    audioContext = new AudioContext({ sampleRate: 16000 });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream); // Remove mimeType option

    mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
    mediaRecorder.onstop = () => saveAudio();
    mediaRecorder.start();
}

function stopRecording() {
    console.log("Stopping recording")

    audioContext.close();
    mediaRecorder.stop();
}

function saveAudio() {
    if (audioChunks.length) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        
        var audioBlobUrl = URL.createObjectURL(audioBlob);
        var downloadLink = document.createElement('a');

        downloadLink.href = audioBlobUrl;
        downloadLink.download = 'gravação.mp3'; 
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(audioBlobUrl);

        isRecording = false;
        audioChunks = [];

        initialRecordScreen = document.getElementById("initial-record");
        recordModalTitle = document.getElementById("record-modal-title");

        initialRecordScreen.style.display = "flex";
        recordingScreen.style.display = "none";
        recordModalTitle.innerHTML = "Gravação de voz";
    }
}
const { ipcRenderer } = require("electron");
const path = require('path')
const fs = require('fs')

const cardsContainer = document.querySelector('#cards');
const btnAdicionar = document.querySelector("#btn-adicionar-tarefa");
let btnsExcluir = document.querySelectorAll('.excluir');

// function to get all tasks from the database
async function getTasks() {
    ipcRenderer.send('read-patient-myTask', localStorage.getItem("childId"))
}

// function to get the response from the above request
async function getResponse(){
    const promise = new Promise((resolve) => {
        ipcRenderer.once('response-read-patient-myTask', (event, arg) => {
            resolve(arg);
        });
    });

    const response = await promise

    if (response.message == 'Tarefas do paciente retornadas com sucesso!') {
        return response.response
    }
    return null
}

var file = document.getElementById("file")
var image = document.getElementById("image-profile")
var placeholder = document.getElementById("placeholder-img") 
var trash = document.getElementById("trash")
var imageFile
/**
 * Fica de olho se a pessoa inputa uma imagem, caso ela inpute, coloca a imagem inserida como background da div
 * faz com que o input nao seja visivel e acrescenta uma lixeira para a remoção da imagem
 */
file.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        imageFile = file
        imageUrl = URL.createObjectURL(file)
        placeholder.style.display = "none"
        image.style.cssText = ` display: flex; 
                                border: 5px solid white; 
                                width: 90px; 
                                height: 90px; 
                                border-radius: 50%; 
                                background-image: url(${imageUrl}); 
                                background-size: cover;
                                justify-content: center;
                                align-items: center;
                                margin-top: -20px;`
        trash.style.display = "block"
    }

    console.log(imageFile.name)
    ipcRenderer.send('update-patient', {
        id: localStorage.getItem("childId"),
        body: {
            file_name_image: imageFile.name
        } 
    })

    let destinationPath = path.join(__dirname, '..', 'Pacient_images', imageFile.name)
        fs.copyFile(imageFile.path, destinationPath, (err) => {
            if (err) throw err;
            console.log('Arquivo copiado com sucesso!');
        });
})

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('read-patient', localStorage.getItem("childId"))

    ipcRenderer.on('response-read-patient', (event,arg) => {
        if (arg.response.dataValues.file_name_image != null) {
            let dirPath = path.join(__dirname, '..', 'Pacient_images', arg.response.dataValues.file_name_image)
            newImage = document.createElement('img')
            newImage.src = dirPath
            document.querySelector('#image-profile').innerHTML = ""
            document.querySelector('#image-profile').appendChild(newImage)
        }
    })
})

/**
 * Caso a lixeira seja clicada, apaga a imagem, retorna o input e a lixeira some
 */
function deleteImg(){
    image.style.cssText =     ` display: flex; 
                                border: 5px solid white; 
                                width: 90px; 
                                height: 90px; 
                                border-radius: 50%; 
                                background-color: #174040; 
                                background-size: cover;
                                justify-content: center;
                                align-items: center;
                                margin-top: -20px;`
    placeholder.style.display = "block"
    trash.style.display = "none"
    file.value = "";
}

// function to create a card for each task
function createTaskCard(task) {
    let newTask = document.createElement('div');
    newTask.classList.add('card');
    newTask.innerHTML = `
    <div>
        <div class="topo" onclick="goToLab('${task.name}', ${task.id})"></div>
        <p class="titulo" onclick="goToLab('${task.name}', ${task.id})">${task.name}</p>
        <button class="btn-card desempenho" onclick="redirectToGraphic(${task.id})">Desempenho</button>
        <button class="btn-card excluir excluir-novo" onclick="removeTask(${task.id})">Excluir</button>
    </div>
    `;
    cardsContainer.prepend(newTask);
}

function getName(){
    let name = document.getElementById("name")

    childId = localStorage.getItem("childId")
    ipcRenderer.send('read-patient', childId)

    ipcRenderer.on('response-read-patient', (event,arg) => {
        name.innerHTML = arg.response.dataValues.name
    })
}

getName()

function getName(){
    let name = document.getElementById("name")

    childId = localStorage.getItem("childId")
    ipcRenderer.send('read-patient', childId)

    ipcRenderer.on('response-read-patient', (event,arg) => {
        name.innerHTML = arg.response.dataValues.name
    })
}

getName()

// function to show all tasks and create a card for each one
async function showTasks() {
    await getTasks()
    let patientTasks = await getResponse()
    if (patientTasks != null) {
        patientTasks.forEach(patientTask => {
            let taskId = patientTask.dataValues.TaskId
            ipcRenderer.send("read-task", taskId)
        });

        ipcRenderer.on("response-read-task", (event, arg) => {
            createTaskCard(arg.response.dataValues)
        })
    }
}

showTasks()

// function to delete a task from the database
async function removeSuccessful() {
    const promise = new Promise((resolve) => {
        ipcRenderer.once('response-delete-task', (event, arg) => {
            resolve(arg);
        });
    });

    const response = await promise
    if (response.message == 'Tarefa deletada com sucesso!') {
        return true
    }
    return false
}

/**
 * Function to delete a task
 * @param id: id of the task to be deleted
 */
async function removeTask(id) {
    if (confirm('Tem certeza que deseja excluir a tarefa?')) {
        ipcRenderer.send('delete-task', id)
        let success = await removeSuccessful()
        if (success) {
            window.location.reload()
        } else {
            negativeFeedback(feedback, "Erro ao deletar a tarefa")
            setTimeout(() => {
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
                feedback.style.display = "none"
            }, 3000)
        }
    }
};

/**
 * Function to show a negative feedback message
 * @param div: div where the message will be shown
 * @param text: the message to be shown
 */
function negativeFeedback(div, text){
    let message = "<p>" + text + "</p>"
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'

    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 0.622)"
    div.style.border = "1px solid white"
    div.style.display = "flex"
}

/**
 * Function to show a positive feedback message
 * @param div: div where the message will be shown
 * @param text: the message to be shown
 */
function positiveFeedback(div, text){
    let message = "<p>" + text + "</p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
    div.style.display = "flex"
}

// Remove the 'active' class from all buttons
document.querySelectorAll('.btn-menu').forEach(btn => btn.classList.remove('active'));
// Add the 'active' class to the btn-tarefas button
document.getElementById('btn-tarefas').classList.add('active');

// Function to add 'active' class to the current page's menu button
function setActiveButton(buttonId) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.btn-menu').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add 'active' class to the current page's menu button
    const currentButton = document.querySelector(buttonId);
    if (currentButton) {
      currentButton.classList.add('active');
    }
  }
  
// Call the function with the appropriate button ID for each page
// The following ID will need to be adjusted according to the button that corresponds to the current HTML page
document.addEventListener('DOMContentLoaded', () => setActiveButton('#btn-tarefas'));

var closeModalButton = document.querySelector('.close');

// Close modal when the close button is clicked
closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Function to display the modal for creating a new task
function createTask() {
    modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

// Function to create a new task in the database
function sendTask() {
    
    let taskName = document.querySelector('#task-name').value;

    if (taskName == "") {
        alert("Digite um nome para a tarefa!")
    }
    else {
        localStorage.setItem('taskTitle', JSON.stringify(taskName));
        ipcRenderer.send('register-task', {
            name: taskName,
        })

        let taskResponse
        ipcRenderer.on('response-register-task', (event, arg) => {
            taskResponse  = arg
            if (taskResponse.message == "Erro ao cadastrar uma nova tarefa") {
                alert("Não foi possível criar a tarefa")
            }
            else {
                ipcRenderer.send("register-myTask", {
                    PatientId: localStorage.getItem("childId"),
                    TaskId: taskResponse.response.dataValues.id
                })
                
                ipcRenderer.on('response-register-myTask', (event, arg) => {
                    if (arg.message == "Erro ao cadastrar uma nova tarefa ao paciente") {
                        alert("Erro ao cadastrar uma nova tarefa ao paciente")
                    } else {
                        let feedback = document.querySelector('#feedback')
                        let modal = document.querySelector('.modal');
                        modal.style.display = 'none';
                        positiveFeedback(feedback, "Tarefa criada com sucesso!")
                        setTimeout(() => {
                            feedback.innerHTML = ""
                            feedback.style.backgroundColor = ""
                            feedback.style.border = ""
                            feedback.style.display = "none"
                            window.location.reload()
                        }, 3000)
                    }
                })
            }
        })
    }
}

// Function to go to the lab page
function goToLab(taskName, taskId) {
    localStorage.setItem('taskTitle', JSON.stringify(taskName));
    localStorage.setItem('taskId', JSON.stringify(taskId));
    localStorage.setItem('successNotification', 0);
    localStorage.setItem('errorNotification', 0);
    localStorage.removeItem('successFeedback')
    localStorage.removeItem('errorFeedback')
    window.location.href = '../Lab/lab.html';
}

// Function to go to the performance page
function redirectToGraphic(id) {
    localStorage.setItem('taskId', JSON.stringify(id));
    window.location.href = '../Performance/performance.html';
}
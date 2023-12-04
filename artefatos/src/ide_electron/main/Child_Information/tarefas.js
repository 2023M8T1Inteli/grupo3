const { ipcRenderer } = require("electron");

const cardsContainer = document.querySelector('#cards');
const btnAdicionar = document.querySelector("#btn-adicionar-tarefa");
let btnsExcluir = document.querySelectorAll('.excluir');

async function getTasks() {
    ipcRenderer.send('read-all-task')
}

async function getTasks(){
    ipcRenderer.send('read-all-task')
}

async function getResponse(){
    const promise = new Promise((resolve) => {
        ipcRenderer.once('response-readAll-task', (event, arg) => {
            resolve(arg);
        });
    });

    const response = await promise

    if (response.message == 'Todas as tarefas criadas') {
        return response.response
    }
    return null
}


function createTask(task) {
    let newTask = document.createElement('div');
    newTask.classList.add('card');
    newTask.innerHTML = `
    <div class="topo"></div>
    <p class="titulo">${task.name}</p>
    <button class="btn-card desempenho" onclick="redirectToGraphic(${task.id})">Desempenho</button>
    <button class="btn-card excluir excluir-novo" onclick="removeTask(${task.id})">Excluir</button>
    `;
    cardsContainer.append(newTask);
}

async function showTasks() {
    await getTasks()
    let tasks = await getResponse()
    if (tasks != null) {
        tasks.forEach(task => {
            createTask(task.dataValues)
        });
    }
}

showTasks()

async function removeSuccess() {
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

async function removeTask(id) {
    if (confirm('Tem certeza que deseja excluir a tarefa?')) {
        ipcRenderer.send('delete-task', id)
        let success = await removeSuccess()
        if (success) {
            window.location.reload()
        } else {
            negativeFeedback(feedback, "Erro ao deletar a tarefa")
            setTimeout(() => {
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
            }, 3000)
        }
    }
};

function negativeFeedback(div, text){
    let message = "<p>" + text + "</p>"
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'

    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 0.622)"
    div.style.border = "1px solid white"
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

function redirectToLab() {
    localStorage.removeItem('taskTitle')
    window.location.href = '../Lab/lab.html';
}

function redirectToGraphic(id) {
    localStorage.setItem('taskId', JSON.stringify(id));
    window.location.href = '../Performance/performance.html';
}
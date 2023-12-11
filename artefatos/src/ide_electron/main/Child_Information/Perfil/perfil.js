const { ipcRenderer } = require("electron");
const { application } = require("express");

function negativeFeedback(div, text){
  let message = "<p>" + text + "</p>"
  let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'

  div.innerHTML = message + negativeSvg
  div.style.backgroundColor = "rgba(255, 0, 0, 0.622)"
  div.style.border = "1px solid white"
  div.style.display = "flex"
}

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
document.getElementById('btn-perfil').classList.add('active');
  
// Call the function with the appropriate button ID for each page
// The following ID will need to be adjusted according to the button that corresponds to the current HTML page
// document.addEventListener('DOMContentLoaded', () => setActiveButton('#btn-tarefas'));

function getInfo(){
  let top_name = document.getElementById("top-name")
  let name = document.getElementById("name")
  let age = document.getElementById("age")
  let degree = document.getElementById("degree")
  let deficiency = document.getElementById("deficiency-type")
  let first_appointment = document.getElementById("first-appointment")
  let last_appointment = document.getElementById("last-appointment")
  let hobbies = document.getElementById("hobbies")
  let background = document.getElementById("background")


  childId = localStorage.getItem("childId")
  ipcRenderer.send('read-patient', childId)

  ipcRenderer.on('response-read-patient', (event,arg) => {
    console.log(arg)

    top_name.innerHTML = arg.response.dataValues.name
    name.innerHTML = arg.response.dataValues.name
    age.innerHTML = arg.response.dataValues.age
    degree.innerHTML = arg.response.dataValues.degree
    // deficiency.innerHTML = arg.response.dataValues.deficiency
    first_appointment.innerHTML = arg.response.dataValues.first_consultation
    last_appointment.innerHTML = arg.response.dataValues.last_consultation
    hobbies.innerHTML = arg.response.dataValues.interests
    background.innerHTML = arg.response.dataValues.background
  })
}

function deletePatient(){
  childId = localStorage.getItem("childId")
  ipcRenderer.send('read-patient', childId)

  ipcRenderer.send('delete-patient', childId)
  window.location.href = "../../Home/home.html"
}

getInfo()
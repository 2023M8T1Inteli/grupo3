const { ipcRenderer } = require("electron");
const path = require('path')
const fs = require('fs')

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

  let type_disability_value
  let hobbies_value


  childId = localStorage.getItem("childId")
  ipcRenderer.send('read-patient', childId)

  ipcRenderer.on('response-read-patient', (event,arg) => {
    console.log(arg)

    if(arg.response.dataValues.type_of_disability == null){
      deficiency.classList.add("any-information")
      type_disability_value = "Não há informações a respeito disso"
    } else {
      type_disability_value = arg.response.dataValues.type_of_disability
    }
    
    if(arg.response.dataValues.interests == null){
      hobbies.classList.add("any-information")
      hobbies_value = "Não há informações a respeito disso"
    } else {
      hobbies_value = arg.response.dataValues.interests
    }

    top_name.innerHTML = arg.response.dataValues.name
    name.innerHTML = arg.response.dataValues.name
    age.innerHTML = arg.response.dataValues.age
    degree.innerHTML = arg.response.dataValues.degree
    deficiency.innerHTML = type_disability_value
    first_appointment.innerHTML = arg.response.dataValues.first_consultation
    last_appointment.innerHTML = arg.response.dataValues.last_consultation
    hobbies.innerHTML = hobbies_value
    background.innerHTML = arg.response.dataValues.background
  })
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

  let destinationPath = path.join(__dirname, '..',  '..', 'Pacient_images', imageFile.name)
      fs.copyFile(imageFile.path, destinationPath, (err) => {
          if (err) throw err;
          console.log('Arquivo copiado com sucesso!');
      });
})

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('read-patient', localStorage.getItem("childId"))

  ipcRenderer.on('response-read-patient', (event,arg) => {
      if (arg.response.dataValues.file_name_image != null) {
          let dirPath = path.join(__dirname, '..', '..', 'Pacient_images', arg.response.dataValues.file_name_image)
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

function deletePatient(){
  childId = localStorage.getItem("childId")
  ipcRenderer.send('read-patient', childId)

  ipcRenderer.send('delete-patient', childId)
  window.location.href = "../../Home/home.html"
}

getInfo()
// const { ipcRenderer } = require("electron")

var name_bool = false
var age_bool = false
var degree_bool = false
var first_appointment_bool = false
var last_appointment_bool = false
var background_bool = false

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
      
      if(arg.response.dataValues.hobbies == null){
        hobbies.classList.add("any-information")
        hobbies_value = "Não há informações a respeito disso"
      } else {
        hobbies_value = arg.response.dataValues.hobbies
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

function openModal() {
    document.getElementById('modal-overlay').style.display = 'flex';
    getTexts()
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function regexDate(date){
  let regex = /\d{2}\/\d{2}\/\d{4}/g
  return regex.test(date)
}

function getTexts(){
    let name_inputs = document.getElementById("name-inputs")
    let age_inputs = document.getElementById("age-inputs")
    let degree_inputs = document.getElementById("degree-inputs")
    let deficiency_inputs = document.getElementById("deficiency-inputs")
    let first_appointment_inputs = document.getElementById("first-appointment-inputs")
    let last_appointment_inputs = document.getElementById("last-appointment-inputs")
    let hobbies_inputs = document.getElementById("hobbies-inputs")
    let background_inputs = document.getElementById("background-inputs")

    let name = document.getElementById("name")
    let age = document.getElementById("age")
    let degree = document.getElementById("degree")
    let deficiency = document.getElementById("deficiency-type")
    let first_appointment = document.getElementById("first-appointment")
    let last_appointment = document.getElementById("last-appointment")
    let hobbies = document.getElementById("hobbies")
    let background = document.getElementById("background")

    if(deficiency.textContent == "Não há informações a respeito disso"){
        deficiency_inputs.placeholder = "Não há informações a respeito disso"
    } else {
        deficiency_inputs.value = deficiency.textContent
    }
    
    if(hobbies.textContent = "Não há informações a respeito disso"){
        hobbies_inputs.placeholder = "Não há informações a respeito disso"
    } else {
        hobbies_inputs.value = hobbies.textContent
    }

    name_inputs.value = name.textContent
    age_inputs.value = age.textContent
    degree_inputs.value = degree.textContent
    first_appointment_inputs.value = first_appointment.textContent
    last_appointment_inputs.value = last_appointment.textContent
    background_inputs.value = background.textContent
}

/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
function checkInfo(){
    
    var inputs = document.getElementById("data")

    var name = document.getElementById("name-inputs")
    var alert_name = document.getElementById("alert-name-error")
    var name_error = document.getElementById("name-error")

    var age = document.getElementById("age-inputs")
    var alert_age = document.getElementById("alert-age-error")
    var age_error = document.getElementById("age-error")

    var degree = document.getElementById("degree-inputs")
    var alert_degree = document.getElementById("alert-degree-error")
    var degree_error = document.getElementById("degree-error")

    var first_appointment = document.getElementById("first-appointment-inputs")
    var alert_first_appointment = document.getElementById("alert-first-appointment-error")
    var first_appointment_error = document.getElementById("first-appointment-error")
    
    var last_appointment = document.getElementById("last-appointment-inputs")
    var alert_last_appointment = document.getElementById("alert-last-appointment-error")
    var last_appointment_error = document.getElementById("last-appointment-error")
    
    var background = document.getElementById("background-inputs")
    var alert_background = document.getElementById("alert-background-error")
    var background_error = document.getElementById("background-error")

    if(name.value == "" && name_error.style.display == "") {
        alert_name.style.display = "block"
        name_error.style.display = "block"
        name.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (name.value != "") {
        alert_name.style.display = ""
        name_error.style.display = ""
        name.style.border = ""
        inputs.style.gap = "15px"
        name_bool = true
    }

    if(age.value == "" && age_error.style.display == "") {
        alert_age.style.display = "block"
        age_error.style.display = "block"
        age.style.border = "2px solid red"
        inputs.style.gap = "0px"
        age_bool = false
    } else if (age.value != "") {
        alert_age.style.display = ""
        age_error.style.display = ""
        age.style.border = ""
        inputs.style.gap = "15px"
        age_bool = true
    }

    if(degree.value == "" && degree_error.style.display == "") {
        alert_degree.style.display = "block"
        degree_error.style.display = "block"
        degree.style.border = "2px solid red"
        inputs.style.gap = "0px"
        degree_bool = false
    } else if (degree.value != "") {
        alert_degree.style.display = ""
        degree_error.style.display = ""
        degree.style.border = ""
        inputs.style.gap = "15px"
        degree_bool = true
    }

    if(first_appointment.value == "") {
        alert_first_appointment.style.display = "block"
        first_appointment_error.innerText = "Preencha o campo acima"
        first_appointment_error.style.display = "block"
        first_appointment.style.border = "2px solid red"
        inputs.style.gap = "0px"
        first_appointment_bool = false
    } else if (first_appointment.value != "") {
        if(regexDate(first_appointment.value)){
            alert_first_appointment.style.display = ""
            first_appointment_error.style.display = ""
            first_appointment.style.border = ""
            inputs.style.gap = "15px"
            first_appointment_bool = true
        } else {
            console.log("tudo errado")
            alert_first_appointment.style.display = "block"
            first_appointment_error.innerText = "Formato inválido"
            first_appointment_error.style.display = "block"
            first_appointment.style.border = "2px solid red"
            inputs.style.gap = "0px"
            first_appointment_bool = false
        }
    }

    if(last_appointment.value == "") {
        alert_last_appointment.style.display = "block"
        last_appointment_error.innerText = "Preencha o campo acima"
        last_appointment_error.style.display = "block"
        last_appointment.style.border = "2px solid red"
        inputs.style.gap = "0px"
        last_appointment_bool = false
    } else if (last_appointment.value != "") {
        if(regexDate(last_appointment.value)){
            alert_last_appointment.style.display = ""
            last_appointment_error.style.display = ""
            last_appointment.style.border = ""
            inputs.style.gap = "15px"
            last_appointment_bool = true
        } else {
            console.log("tudo errado")
            alert_last_appointment.style.display = "block"
            last_appointment_error.innerText = "Formato inválido"
            last_appointment_error.style.display = "block"
            last_appointment.style.border = "2px solid red"
            inputs.style.gap = "0px"
            last_appointment_bool = false
        }
    }

    if(background.value == "" && background_error.style.display == "") {
        alert_background.style.display = "block"
        background_error.style.display = "block"
        background.style.border = "2px solid red"
        inputs.style.gap = "0px"
        background_bool = false
    } else if (background.value != "") {
        alert_background.style.display = ""
        background_error.style.display = ""
        background.style.border = ""
        inputs.style.gap = "15px"
        background_bool = true
    }
}

function positiveFeedback(div){
    let message = "<p> Dados do paciente atualizado com sucesso </p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
}

function negativeFeedback(div){
    let message = '<p> Erro ao atualizar os dados do paciente </p>'
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
    
    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 1)"
    div.style.border = "1px solid white"
}

function clearFeedback(div){
    div.innerHTML = ""
    div.style.backgroundColor = ""
    div.style.border = ""
}

function updatePatient(){
    checkInfo()

    let name = document.getElementById("name-inputs")
    let age = document.getElementById("age-inputs")
    let degree = document.getElementById("degree-inputs")
    let deficiency = document.getElementById("deficiency-inputs")
    let first_appointment = document.getElementById("first-appointment-inputs")
    let last_appointment = document.getElementById("last-appointment-inputs")
    let hobbies = document.getElementById("hobbies-inputs")
    let background = document.getElementById("background-inputs")

    let deficiency_value = null
    let hobbies_value = null

    console.log(background_bool)
    if(name_bool && age_bool && degree_bool && first_appointment_bool && last_appointment_bool && background_bool){
        if(deficiency.value != ""){
            deficiency_value = deficiency.value
        }
        
        if(hobbies.value != ""){
            hobbies_value = hobbies.value
        }

        childId = localStorage.getItem("childId")
        ipcRenderer.send('read-patient', childId)

        ipcRenderer.send('update-patient', {
            id: childId,
            body: {
                name: name.value,
                age: age.value,
                degree: degree.value,
                first_consultation: first_appointment.value,
                last_consultation: last_appointment.value,
                type_of_disability: deficiency_value,
                interests: hobbies_value,
                background: background.value,
            }
        })

        let feedback = document.getElementById("feedback")
        ipcRenderer.on('response-update-patient', (event, arg) => {
            if(arg.message == "Perfil do paciente atualizado com sucesso !"){
                positiveFeedback(feedback)
                setTimeout(() => {
                    getInfo()
                    clearFeedback(feedback)
                    closeModal()
                }, 3000)
            } else {
                negativeFeedback(feedback)
                setTimeout(() => {
                    clearFeedback(feedback)
                }, 3000)
            }
        })
    }
}
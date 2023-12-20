var name_bool = false
var age_bool = false
var degree_bool = false
var first_appointment_bool = false
var background_bool = false

function openModal() {
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function getPacients(){
    ipcRenderer.send('read-all-patient')

    ipcRenderer.on('response-readAll-patient', (event,arg) => {
        console.log(arg)

        div = document.getElementById('child-list')
        if (arg.response.length == 0) {
            div.innerHTML = "<p id='placeholder'>Nenhum Paciente encontrado...<p>"
        } else {
            div.innerHTML = ""
            arg.response.forEach((element) => {
                let name = element.dataValues.name.charAt(0).toUpperCase() + element.dataValues.name.slice(1)
                div.innerHTML += `<a href="javascript:void(0);" class="child"  onclick="redirectToProfile(${element.dataValues.id})"><strong style="color: black;">${name}</strong></a>`
            })
        }
    })
}

function regexDate(date){
    let regex = /\d{2}\/\d{2}\/\d{4}/g
    return regex.test(date)
}
/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
function checkInfo(){
    
    var inputs = document.getElementById("inputs")

    var name = document.getElementById("name")
    var alert_name = document.getElementById("alert-name-error")
    var name_error = document.getElementById("name-error")

    var age = document.getElementById("age")
    var alert_age = document.getElementById("alert-age-error")
    var age_error = document.getElementById("age-error")

    var degree = document.getElementById("degree")
    var alert_degree = document.getElementById("alert-degree-error")
    var degree_error = document.getElementById("degree-error")

    var first_appointment = document.getElementById("first-appointment")
    var alert_first_appointment = document.getElementById("alert-first-appointment-error")
    var first_appointment_error = document.getElementById("first-appointment-error")
    
    var background = document.getElementById("background")
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
    } else if (first_appointment.value != "") {
        if(regexDate(first_appointment.value)){
            alert_first_appointment.style.display = ""
            first_appointment_error.style.display = ""
            first_appointment.style.border = ""
            inputs.style.gap = "15px"
            first_appointment_bool = true
        } else {
            alert_first_appointment.style.display = "block"
            first_appointment_error.innerText = "Formato inválido"
            first_appointment_error.style.display = "block"
            first_appointment.style.border = "2px solid red"
            inputs.style.gap = "0px"
        }
    }
    
    if(background.value == "") {
        alert_background.style.display = "block"
        background_error.innerText = "Preencha o campo acima"
        background_error.style.display = "block"
        background.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (background.value != "") {
        alert_background.style.display = ""
        background_error.style.display = ""
        background.style.border = ""
        inputs.style.gap = "15px"
        background_bool = true
    }
}

async function sendPatientRegister(name, age, deficiency, degree, first, hobbies, background){
    let deficiency_value = null
    let hobbies_value = null

    if(deficiency.value != ""){
        deficiency_value = deficiency.value
    }

    if(hobbies.value != ""){
        hobbies_value = hobbies.value
    }

    console.log(localStorage)
    TherapistId = localStorage.getItem("id")

    ipcRenderer.send('register-patient', {
        name: name.value,
        age: age.value,
        degree: degree.value,
        first_consultation: first.value,
        last_consultation: first.value,
        type_of_disability: deficiency_value,
        interests: hobbies_value,
        background: background.value,
        TherapistId: TherapistId,
    });
}

async function getPatientResponse(){
    localStorage.clear()
    const respostaPromise = new Promise((resolve) => {
        ipcRenderer.once('response-register-patient', (event, arg) => {
            resolve(arg);
        });
    });

    const resposta = await respostaPromise;
    console.log(resposta);

    let feedback = document.getElementById("feedback")
    console.log(resposta.message)
    if (resposta.message != "Erro de mensagem!") {
        localStorage.setItem('id', JSON.stringify(resposta.response.dataValues.id));
    } else {
        negativeFeedback(feedback, resposta.message)
    }
    return resposta
}

function positiveFeedback(div){
    let message = "<p> Paciente cadastrado com sucesso </p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
}

function negativeFeedback(div){
    let message = '<p> Erro ao cadastrar o paciente </p>'
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
    
    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 1)"
    div.style.border = "1px solid white"
}

async function registerPatient(){
    checkInfo()

    var name = document.getElementById("name")
    var age = document.getElementById("age")
    var deficiency = document.getElementById("deficiency")
    var degree = document.getElementById("degree")
    var first_appointment = document.getElementById("first-appointment")
    var hobbies = document.getElementById("hobbies")
    var background = document.getElementById("background")
    var feedback = document.getElementById("feedback")

    if(name_bool && age_bool && degree_bool && first_appointment_bool && background_bool){
        await sendPatientRegister(name, age, deficiency, degree, first_appointment, hobbies, background)
        let resposta = await getPatientResponse()
        console.log(resposta.message)

        if(resposta.message == "Cadastro do paciente com sucesso !"){
            positiveFeedback(feedback)
            setTimeout(() => {
                localStorage.clear()
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
                name.value = ""
                age.value = ""
                deficiency.value = ""
                degree.value = ""
                first_appointment.value = ""
                hobbies.value = ""
                background.value = ""
                closeModal()
                getPacients()
            }, 3000)
        } else {
            negativeFeedback(feedback)
            setTimeout(() => {
                localStorage.clear()
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
                name.value = ""
                age.value = ""
                deficiency.value = ""
                degree.value = ""
                first_appointment.value = ""
                hobbies.value = ""
                background.value = ""
            }, 3000)
        }
    }
}
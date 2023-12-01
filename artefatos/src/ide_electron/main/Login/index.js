const { ipcRenderer } = require("electron")
var email_bool = false
var pass_bool = false

/**
 * Alera o tipo ds caixas de input "nova senha" e "confirmar senha" entre text e password, além de alterar o svg do olho entre aberto e fechado
 */
function changeType(){
    eye = document.getElementById("eye")
    eye_slashed = document.getElementById("eye-slashed")
    password = document.getElementById("password_field")

    if (eye.style.display != "none") {
        eye.style.display = "none"
        eye_slashed.style.display = "block"
        password.type = "text"
    } else {
        eye_slashed.style.display = "none"
        eye.style.display = "block"
        password.type = "password"
    }
}

/**
 * Verifica se o email inputado se encontra dentro do RegEx
 * @param email: recebe o email inserido pelo usuário
 * @returns: retorna true ou false dependendo se o email se encontra dentros do RegEx
 */
function validateEmail(email) {
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

/**
 * Altera a estilização da caixa de email se o formato for inválido, colocando uma borda vermelha e tornando visivel o erro
 */
function checkEmail(){
    var email = document.getElementById("e-mail_field")
    var alert_email = document.getElementById("alert-email-format-error")
    var email_format_error = document.getElementById("wrong-format")

    if(!validateEmail(email.value) && email.value != ""){
        alert_email.style.display = "block"
        email_format_error.style.display = "block"
        email.style.border = "2px solid red"
    } else if(validateEmail(email.value) || email.value == "") {
        alert_email.style.display = ""
        email_format_error.style.display = ""
        if(validateEmail(email.value)){
            email.style.border = ""
            email_bool = true
        }
    }
}

function checkInfo(){
    var email = document.getElementById("e-mail_field")
    var alert_email = document.getElementById("alert-email-error")
    var email_error = document.getElementById("email-error")

    var password = document.getElementById("password_field")
    var alert_pass= document.getElementById("alert-pass-error")
    var pass_error = document.getElementById("pass-error")
    var pass_div = document.getElementById("password-div")

    if(email.value == "" && email_error.style.display == "") {
        alert_email.style.display = "block"
        email_error.style.display = "block"
        email.style.border = "2px solid red"
    } else if (email.value != "") {
        alert_email.style.display = ""
        email_error.style.display = ""
        if(validateEmail(email.value)){
            email.style.border = ""
            email_bool = true
        }
    }

    if(password.value == "" && pass_error.style.display == "") {
        alert_pass.style.display = "block"
        pass_error.style.display = "block"
        pass_div.style.border = "2px solid red"
    } else if (password.value != "") {
        alert_pass.style.display = ""
        pass_error.style.display = ""
        pass_div.style.border = ""
        pass_bool = true
    }
}

async function checkDB(){
    email = document.getElementById("e-mail_field")
    pass = document.getElementById("password_field")

    ipcRenderer.send('login', {
        email: email.value,
        password: pass.value
    })
}

async function getResponse(){
    const respostaPromise = new Promise((resolve) => {
        ipcRenderer.once('resposta-login', (event, arg) => {
            resolve(arg);
        });
    });

    const resposta = await respostaPromise
    console.log(resposta)
    if (resposta.isUser){
        localStorage.setItem('id', JSON.stringify(resposta.user.dataValues.id));
    }

    return resposta.isUser
}


function positiveFeedback(div){
    let message = "<p> Usuário autenticado </p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
}

function negativeFeedback(div){
    let message = '<p> Email e/ou senha incorretos </p>'
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
    
    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 1)"
    div.style.border = "1px solid white"
}

async function redirectToHome(){
    checkEmail()
    checkInfo()

    let feedback = document.getElementById("feedback")

    console.log(email_bool)
    console.log(pass_bool)
    if(email_bool && pass_bool){
        await checkDB()
        let response = await getResponse()
        
        if(response){
            positiveFeedback(feedback)

            setTimeout(() => {
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
                window.location.href = "../Home/home.html"
            }, 3000)
        } else {
            negativeFeedback(feedback)

            setTimeout(() => {
                feedback.innerHTML = ""
                feedback.style.backgroundColor = ""
                feedback.style.border = ""
            }, 3000)
        }
    }
}
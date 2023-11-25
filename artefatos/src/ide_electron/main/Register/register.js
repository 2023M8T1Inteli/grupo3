const{ ipcRenderer } = require("electron")

var name_bool = false
var last_name_bool = false
var email_bool = false
var pass_bool = false

/**
 * Alera o tipo ds caixas de input "nova senha" e "confirmar senha" entre text e password, além de alterar o svg do olho entre aberto e fechado
 */
function changeType(){
    eye = document.getElementById("eye")
    eye_slashed = document.getElementById("eye-slashed")
    password = document.getElementById("password")

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
    var inputs = document.getElementById("inputs")
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

/**
 * Altera a estilização da caixa de email se o formato for inválido, colocando uma borda vermelha e tornando visivel o erro
 */
function checkEmail(){
    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-format-error")
    var email_format_error = document.getElementById("wrong-format")

    if(!validateEmail(email.value) && email.value != ""){
        alert_email.style.display = "block"
        email_format_error.style.display = "block"
        email.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if(validateEmail(email.value) || email.value == "") {
        alert_email.style.display = ""
        email_format_error.style.display = ""
        if(validateEmail(email.value)){
            inputs.style.gap = "15px"
            email.style.border = ""
            email_bool = true
        }
    }
}

/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
function checkInfo(){
    var inputs = document.getElementById("inputs")

    var name = document.getElementById("first-name")
    var alert_name = document.getElementById("alert-name-error")
    var name_error = document.getElementById("name-error")

    var last_name = document.getElementById("last-name")
    var alert_last_name = document.getElementById("alert-last-name-error")
    var last_name_error = document.getElementById("last-name-error")

    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-error")
    var email_error = document.getElementById("email-error")

    var password = document.getElementById("password")
    var alert_pass= document.getElementById("alert-pass-error")
    var pass_error = document.getElementById("pass-error")
    var pass_div = document.getElementById("password-div")

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
    if(last_name.value == "" && last_name_error.style.display == "") {
        alert_last_name.style.display = "block"
        last_name_error.style.display = "block"
        last_name.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (last_name.value != "") {
        alert_last_name.style.display = ""
        last_name_error.style.display = ""
        last_name.style.border = ""
        inputs.style.gap = "15px"
        last_name_bool = true
    }
    if(email.value == "" && email_error.style.display == "") {
        alert_email.style.display = "block"
        email_error.style.display = "block"
        email.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (email.value != "") {
        alert_email.style.display = ""
        email_error.style.display = ""
        inputs.style.gap = "15px"
        if(validateEmail(email.value)){
            email.style.border = ""
            email_bool = true
        }
    }
    if(password.value == "" && pass_error.style.display == "") {
        alert_pass.style.display = "block"
        pass_error.style.display = "block"
        pass_div.style.border = "2px solid red"
        inputs.style.gap = "0px"
    } else if (password.value != "") {
        alert_pass.style.display = ""
        pass_error.style.display = ""
        pass_div.style.border = ""
        inputs.style.gap = "15px"
        pass_bool = true
    }
}

var file = document.getElementById("file")
var image = document.getElementById("image-profile")
var placeholder = document.getElementById("placeholder-img") 
var trash = document.getElementById("trash")

/**
 * Fica de olho se a pessoa inputa uma imagem, caso ela inpute, coloca a imagem inserida como background da div
 * faz com que o input nao seja visivel e acrescenta uma lixeira para a remoção da imagem
 */
file.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
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

async function sendRegister(name, last_name, email){
    ipcRenderer.send('register-therapist', {
        first_name: name.value,
        last_name: last_name.value,
        email: email.value
    });
}

async function getResponse(){
    localStorage.clear()
    const respostaPromise = new Promise((resolve) => {
        ipcRenderer.once('resposta-register-therapist', (event, arg) => {
            resolve(arg);
        });
    });

    const resposta = await respostaPromise;
    localStorage.setItem('id', JSON.stringify(resposta.response.dataValues.id));
    
    console.log(resposta);
}

/**
 * 
 * @param password 
 */
async function sendPassword(password){
    console.log(localStorage)
    ipcRenderer.send('register-password', {
        password: password.value,
        TherapistId: parseInt(localStorage.getItem("id"))
    });

    ipcRenderer.on('resposta-read-password', (event, arg) => {
        resposta = arg;
        console.log(resposta);
    });
}

/**
 * Se tudo estiver dentro das condições ideais, volta para a tela de login
 */
async function createAccount(){
    checkEmail()
    checkInfo()

    var name = document.getElementById("first-name")
    var last_name = document.getElementById("last-name")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    if(name_bool && last_name_bool && email_bool && pass_bool){
        // window.location.href = "../Login/index.html"
        await sendRegister(name, last_name, email)
        await getResponse()
        await sendPassword(password)
    }
}
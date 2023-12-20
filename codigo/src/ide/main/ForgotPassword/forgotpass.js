const nodemailer  = require("nodemailer")
const { ipcRenderer } = require("electron")

var email_bool = false

/**
 * Verifica se o email inputado se encontra dentro do RegEx
 * @param email: recebe o email inserido pelo usuário
 * @returns: retorna true ou false dependendo se o email se encontra dentros do RegEx
 */
const validateEmail = (email) => {
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

/**
 * Altera a estilização da caixa de email se o formato for inválido, colocando uma borda vermelha e tornando visivel o erro
 */
const checkEmail = () => {
    var email = document.getElementById("email")
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

/**
 * Altera a estilização das caixas onde nada foi escrito, colocando uma borda vermelha e tornando visivel o erro
 */
const checkInfo = () => {
    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-error")
    var email_error = document.getElementById("email-error")

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
}

/**
 * Gera um código aleatório de 6 dígitos
 */
const createCode = () => {
    let randNum = 0;
    let newCode = "";
    for(let i = 0; i < 6; i++){
      randNum = Math.floor(Math.random() * 10);
      newCode += randNum;
    }
    
    newCode = parseInt(newCode);
    return newCode;
}

/**
 * 
 * @param user: JSON contendo as informações email e mensagem (código)
 * Função que envia uma mensagem de email para o email inserido na caixa de texto
 */
const sendCodeToEmail = async (user) => {
    const mailOptions = {
      from: 'dolphin.aacd@gmail.com',
      to: user.email,
      subject: 'Código de Verificação',
      text: user.message,
    };

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'dolphin.aacd@gmail.com',
          pass: 'xmnb dnci ipah djxa',
        },
    });    
  
    const promise = new Promise((resolve) => {transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error('Error sending email:', error);
            resolve(false);
            } else {
            console.log('Email sent:', info.response);
            resolve(true);
            }
        });
    });

    let email_response = await promise

    email_bool = email_response
};

function sendCodeToDatabase(){
    
}

function positiveFeedback(div){
    let message = "<p>Email enviado com sucesso</p>"
    let positiveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>'

    div.innerHTML = message + positiveSvg
    div.style.backgroundColor = "rgba(52, 170, 52, 0.695)"
    div.style.border = "1px solid white"
}

function negativeFeedback(div){
    let message = '<p> Não foi possível enviar o email </p>'
    let negativeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'
    
    div.innerHTML = message + negativeSvg
    div.style.backgroundColor = "rgba(255, 0, 0, 0.622)"
    div.style.border = "1px solid white"
}

/**
 * Função que coleta as informações do usuário e chama a função que envia propriamente o email
 */
const sendEmail = async () => {
    checkEmail()
    checkInfo()

    var email = document.getElementById("email")
    var code = createCode()

    const user = {
        email: `${email.value}`,
        message: "Seu código é: " + code
    };
    
    await sendCodeToEmail(user)

    let feedback = document.getElementById("feedback")

    if(email_bool){
        positiveFeedback(feedback)
        setTimeout(() => {
            feedback.innerHTML = ""
            feedback.style.backgroundColor = ""
            feedback.style.border = ""
            window.location.href = '../Confirm Code/confirmcode.html'
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
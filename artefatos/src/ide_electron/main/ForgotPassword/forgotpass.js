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
 * Se o email estiver nas medidas corretas, altera a página
 */
function sendEmail(){
    if(email_bool){
        window.location.href = '../Confirm Code/confirmcode.html'
    }
}

// const createCode = () => {
//     let randNum = 0;
//     let newCode = "";
//     for(let i = 0; i < 6; i++){
//       randNum = Math.floor(Math.random() * 10);
//       newCode += randNum;
//     }
    
//     newCode = parseInt(newCode);
//     return newCode;
// }

// const sendCode = (user) => {
//     const mailOptions = {
//       from: 'nimbbbus@gmail.com',
//       to: user.email,
//       subject: 'Código de Verificação',
//       text: user.message,
//     };

//     const transporter = createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//           user: 'nimbbbus@gmail.com',
//           pass: 'ctov euiy fxjh raat',
//         },
//     });    
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
// };

// const sendEmail = () => {
//     var email = document.getElementById("email")
//     var code = createCode()

//     const user = {
//         email: `${email.value}`,
//         message: "Seu código é: " + code
//     };
    
//     sendCode(user);
// }
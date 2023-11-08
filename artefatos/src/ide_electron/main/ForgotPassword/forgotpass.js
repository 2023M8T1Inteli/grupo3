

function validateEmail(email) {
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

function checkEmail(){
    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-format-error")
    var email_format_error = document.getElementById("wrong-format")

    if(!validateEmail(email.value) && email_format_error.style.display == "" && email.value != ""){
        alert_email.style.display = "block"
        email_format_error.style.display = "block"
    } else if(validateEmail(email.value)) {
        alert_email.style.display = ""
        email_format_error.style.display = ""
    }
}

function checkInfo(){
    var email = document.getElementById("email")
    var alert_email = document.getElementById("alert-email-error")
    var email_error = document.getElementById("email-error")

    if(email.value == "" && email_error.style.display == "") {
        alert_email.style.display = "block"
        email_error.style.display = "block"
    } else if (email.value != "") {
        alert_email.style.display = ""
        email_error.style.display = ""
    }
}

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

const sendCode = (user) => {
    const mailOptions = {
      from: 'nimbbbus@gmail.com',
      to: user.email,
      subject: 'Código de Verificação',
      text: user.message,
    };

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'nimbbbus@gmail.com',
          pass: 'ctov euiy fxjh raat',
        },
    });    
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
};

function sendEmail(){
    var email = document.getElementById("email")
    var code = createCode()

    const user = {
        email: `${email.value}`,
        message: "Seu código é: " + code
    };
    
    sendCode(user);
}
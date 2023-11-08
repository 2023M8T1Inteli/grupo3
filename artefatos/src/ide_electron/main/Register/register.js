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

    if(name.value == "" && name_error.style.display == "") {
        alert_name.style.display = "block"
        name_error.style.display = "block"
    } else if (name.value != "") {
        alert_name.style.display = ""
        name_error.style.display = ""
    }
    if(last_name.value == "" && last_name_error.style.display == "") {
        alert_last_name.style.display = "block"
        last_name_error.style.display = "block"
    } else if (last_name.value != "") {
        alert_last_name.style.display = ""
        last_name_error.style.display = ""
    }
    if(email.value == "" && email_error.style.display == "") {
        alert_email.style.display = "block"
        email_error.style.display = "block"
    } else if (email.value != "") {
        alert_email.style.display = ""
        email_error.style.display = ""
    }
    if(password.value == "" && pass_error.style.display == "") {
        alert_pass.style.display = "block"
        pass_error.style.display = "block"
    } else if (password.value != "") {
        alert_pass.style.display = ""
        pass_error.style.display = ""
    }
}
var file = document.getElementById("file")
var image = document.getElementById("image-profile")
var placeholder = document.getElementById("placeholder-img") 
var trash = document.getElementById("trash")

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

function deleteImg(){
    image.style.cssText = ` display: flex; 
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
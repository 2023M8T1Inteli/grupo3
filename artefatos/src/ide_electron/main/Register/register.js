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
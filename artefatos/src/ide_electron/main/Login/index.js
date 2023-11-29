const { ipcRenderer } = require("electron")

function checkInfo(){
    console.log("entrei aqui")
    email = document.getElementById("e-mail_field")
    pass = document.getElementById("password_field")

    console.log("vou mandar uns bglh aqui")
    ipcRenderer.send('login', {
        email: email.value,
        password: pass.value
    })

    console.log("ja mandei")
    let resposta
    ipcRenderer.on('resposta-login', (event, arg) => {
        resposta = arg
        console.log(resposta)
    })
}

function redirectToHome(){
    checkInfo()
    console.log("trocaria de pagina")
}
const { ipcRenderer } = require("electron")
const path = require('path')

function redirectToProfile(child_id) {
    localStorage.setItem("childId", child_id)
    window.location.href = '../Child_Information/tarefas.html';
}

function goToLogin() {
    if(confirm("Deseja realmente sair?")) {
        window.location.href = '../Login/index.html';
    }
}

function getProfileImage() {
    var profileImg = document.getElementById('profile-img')
    ipcRenderer.send('read-therapist', localStorage.getItem('id'))

    ipcRenderer.on('resposta-read-therapist', (event, arg) => {
        console.log(arg)
        
        if (arg.response.dataValues.file_name_image == null) {
            profileImg.src = '../../assets/user.png'
        }
        else {
            dirPath = path.join(__dirname, '..', 'Profile_images', arg.response.dataValues.file_name_image)
            profileImg.src = dirPath
            console.log(dirPath)
        }
    })
}

function getPacients(){
    ipcRenderer.send('read-all-patient')

    ipcRenderer.on('response-readAll-patient', (event,arg) => {
        console.log(arg)

        div = document.getElementById('child-list')
        if (arg.response.length == 0) {
            div.innerHTML = "<p id='placeholder'>Nenhum paciente encontrado...<p>"
        } else {
            div.innerHTML = ""
            arg.response.forEach((element) => {
                let name = element.dataValues.name.charAt(0).toUpperCase() + element.dataValues.name.slice(1)
                div.innerHTML += `<a href="javascript:void(0);" class="child"  onclick="redirectToProfile(${element.dataValues.id})"><strong style="color: black;">${name}</strong></a>`
            })
        }
    })
}

getPacients()
getProfileImage()
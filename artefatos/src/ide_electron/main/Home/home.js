const { ipcRenderer } = require("electron")

function redirectToProfile(child_id) {
    localStorage.setItem("childId", child_id)
    window.location.href = '../Child_Information/tarefas.html';
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
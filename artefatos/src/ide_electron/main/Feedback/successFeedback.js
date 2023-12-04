const fs = require('fs')
const path = require('path')
const { ipcRenderer } = require('electron')

function readImages() {
    const fullPath = path.join(__dirname, 'SuccessFeedback/images')

    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
        files.forEach( file => { 
            let images = document.getElementById('images');
            images.innerHTML += `<img class="feedback-images" src="${fullPath}/${file}" alt="${file}">`
        })
    })
}

function readSounds() {
    const fullPath = path.join(__dirname, 'SuccessFeedback/sounds')

    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
        files.forEach( file => { 
            let sounds = document.getElementById('sounds');
            sounds.innerHTML += `<div class="feedback-sounds" >Som de ${file.split('.')[0]} <audio src="${fullPath}/${file}"></div>`
        })
    })
}

function saveFeedback() {
    let text = document.getElementById('text-input')
    let imageContainer = document.getElementById('feedback-img')

    if (text == undefined || imageContainer == undefined) {
        alert('Digite uma mensagem e adicione uma imagem')
        return
    }

    let message = text.value
    let color = text.style.color
    if (message == '' || imageContainer == undefined) {
        alert('Digite uma mensagem e adicione uma imagem')
        return
    }
    let image = imageContainer.getAttribute('src').replace(/\\/g, '/').split('/')
    image = image[image.length - 1]
    let soundContainer = document.getElementById('feedback-sound')
    if (soundContainer != undefined) {

        let sound = soundContainer.querySelector('audio').getAttribute('src').replace(/\\/g, '/').split('/')
        sound = sound[sound.length - 1]

        localStorage.setItem('feedback', JSON.stringify({
            message: message,
            color: color,
            image: image,
            sound: sound,
            type_feedback: true
        }))
    } else {
        localStorage.setItem('feedback', JSON.stringify({
            message: message,
            color: color,
            image: image,
            type_feedback: true
        }))
    }

    if (localStorage.getItem('feedback') != undefined) {
        if(confirm('Feedback salvo com sucesso! Deseja retornar?')) {
            window.location.href = '../Lab/lab.html'
        } else {
            localStorage.removeItem('feedback')
        }
    }
}

readImages()
readSounds()

const fs = require('fs')
const path = require('path')

localStorage.setItem('errorNotification', 0);

function readImages() {
    const fullPath = path.join(__dirname, 'ErrorFeedback/images')

    fs.readdir(fullPath, (error, files) => {
        if (error) console.log(error)
        files.forEach( file => { 
            let images = document.getElementById('images');
            images.innerHTML += `<img class="feedback-images" src="${fullPath}/${file}" alt="${file}">`
        })
    })
}

function readSounds() {
    const fullPath = path.join(__dirname, 'ErrorFeedback/sounds')

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

        localStorage.setItem('errorFeedback', JSON.stringify({
            message: message,
            color: color,
            image: image,
            sound: sound,
            type_feedback: false
        }))
    } else {
        localStorage.setItem('errorFeedback', JSON.stringify({
            message: message,
            color: color,
            image: image,
            type_feedback: false
        }))
    }

    if (localStorage.getItem('errorFeedback') != undefined) {
        if(confirm('Feedback salvo com sucesso! Deseja retornar?')) {
            window.location.href = '../Lab/lab.html'
        } else {
            localStorage.removeItem('errorFeedback')
        }
    }
}
function valueToHex(c) {
    var hex = c.toString(16);
    return hex
  
  }

function rgbToHex(r, g, b) {
    return("#" + valueToHex(r) + valueToHex(g) + valueToHex(b));
}

document.addEventListener('DOMContentLoaded', function(e) {
    if (localStorage.getItem('errorFeedback') != undefined) {
        let feedback = JSON.parse(localStorage.getItem('errorFeedback'));
        main.innerHTML += '<input type="text" id="text-input" placeholder="Escreva a mensagem aqui">'
        textInput = document.getElementById('text-input');
        colorInput = document.getElementById('color-input');
        const [r, g, b] = feedback.color.match(/\d+/g);
        color = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
        colorInput.value = color;
        textInput.value = feedback.message;
        textInput.style.color = feedback.color;

        let feedbackImg = document.createElement('img');
        feedbackImg.id = 'feedback-img';
        
        let fullPath = path.join(__dirname, 'ErrorFeedback/images/')
        feedbackImg.src = fullPath + feedback.image;
       
        feedbackImg.alt = 'Imagem de feedback';

        // Append the new img element to the main container
        main.appendChild(feedbackImg);

        if (feedback.sound != undefined) {
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></svg>'
            // Create a new sound element
            let feedbackSound = document.createElement('div');
            feedbackSound.id = 'feedback-sound';
            feedbackSound.innerHTML += svg;

            let audio = document.createElement('audio');
            
            fullPath = path.join(__dirname, 'ErrorFeedback/sounds/')
            audio.src = fullPath + feedback.sound

            feedbackSound.appendChild(audio);

            // Append the new sound element to the main container
            main.appendChild(feedbackSound);
        }
    }
})

readImages()
readSounds()
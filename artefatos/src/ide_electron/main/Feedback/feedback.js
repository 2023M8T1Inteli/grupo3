var colorInput = document.getElementById('color-input');
var textInput = document.getElementById('text-input');
var backButton = document.getElementById('title-back');
var clearButton = document.getElementById('title-clear');
var main = document.getElementById('main');

backButton.addEventListener('click', function () {
    if (confirm('Tem certeza que deseja voltar? As alterações não salvas serão perdidas!')) {
        window.location.href = '../Lab/lab.html';
    }
});

clearButton.addEventListener('click', function () {
    if (confirm('Tem certeza que deseja limpar o feedback?')) {
        main.innerHTML = '';
    }
})

colorInput.addEventListener('change', function () {

    if (textInput == undefined) {
        main.innerHTML += '<input type="text" id="text-input" placeholder="Escreva a mensagem aqui">'
    }

    textInput = document.getElementById('text-input');

    textInput.style.color = colorInput.value;
});

var imageContainer = document.getElementById('images');

// Add a click event listener to the container
imageContainer.addEventListener('click', function (event) {
    // Check if the clicked element is an img tag
    if (event.target.tagName === 'IMG') {
        // Get the src attribute of the clicked image
        var src = event.target.src;
        
        if (document.getElementById('feedback-img') == undefined) {
            // Create a new img element
            let feedbackImg = document.createElement('img');
            feedbackImg.id = 'feedback-img';
            feedbackImg.src = src;
            feedbackImg.alt = 'Imagem de feedback';

            // Append the new img element to the main container
            main.appendChild(feedbackImg);
        }

        textInput.style.color = colorInput.value;
        let feedbackImg = document.getElementById('feedback-img');
        feedbackImg.src = src;
    }});

var soundContainer = document.getElementById('sounds');

soundContainer.addEventListener('click', function (event) {
    // Check if the clicked element is an img tag
    if (event.target.tagName === 'DIV') {
        // Get the src attribute of the clicked sound
        var audioElement = event.target.querySelector('audio');
        var src = audioElement.src;
        
        let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></svg>'
        if (document.getElementById('feedback-sound') == undefined) {
            // Create a new sound element
            let feedbackSound = document.createElement('div');
            feedbackSound.id = 'feedback-sound';
            feedbackSound.innerHTML += svg;

            let audio = document.createElement('audio');
            audio.src = src;

            feedbackSound.appendChild(audio);

            // Append the new sound element to the main container
            main.appendChild(feedbackSound);
        }

        let feedbackSound = document.getElementById('feedback-sound');
        feedbackSound.src = src;
    }});
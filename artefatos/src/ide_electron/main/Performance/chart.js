const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", function() {
    
    id_my_task = localStorage.getItem("taskId")
    
    ipcRenderer.send('read-my-task-performance', id_my_task)
    ipcRenderer.on("response-read-my-task-performance", (event, arg) => {
        console.log(arg)
    })

    // Dados do gráfico
    var dados = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8"],
        datasets: [{
            label: 'Acertos',
            borderColor: '#008000',
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            data: [1, 2, 3, 4, 5, 3, 5, 7],
        }]
    };

    // Opções do gráfico
    var opcoes = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8"],
            },
            y: {
                type: 'linear',
                position: 'left'
            }
        }
    };

    // Configuração do gráfico
    var config = {
        type: 'line',
        data: dados,
        options: opcoes
    };

    // Criação do gráfico
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, config);
});

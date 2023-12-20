const { ipcRenderer } = require("electron");

async function getData() {
    let dates = []
    let gradesJson = {}
    let sumCorrects = 0
    let sumMistakes = 0

    return new Promise((resolve) => {
        id_my_task = localStorage.getItem("taskId");

        ipcRenderer.send('read-my-task-performance', 1);

        ipcRenderer.on("response-read-my-task-performance", async (event, arg) => {
            console.log(arg);

            await arg.response.forEach((element) => {
                const currentDate = element.dataValues.consultation_data;
                const currentGrade = element.dataValues.hits - element.dataValues.mistakes;

                if (!dates.includes(currentDate)) {
                    dates.push(currentDate);
                }

                if (!gradesJson[currentDate]) {
                    gradesJson[currentDate] = currentGrade;
                } else {
                    gradesJson[currentDate] += currentGrade;
                }
                
                sumCorrects += element.dataValues.hits - element.dataValues.mistakes
                sumMistakes += element.dataValues.mistakes
            });

            const grades = Object.values(gradesJson);
            const tasks = arg.response.length
            resolve({ dates, grades, sumCorrects, sumMistakes, tasks });
        });
    });
}

document.addEventListener("DOMContentLoaded", async function() {

    const { dates, grades, sumCorrects, sumMistakes, tasks } = await getData()

    showSummary(dates.length, tasks, sumCorrects, sumMistakes)

    // Dados do gráfico
    var dados = {
        labels: dates,
        datasets: [{
            label: 'Acertos por tentativa',
            borderColor: '#008000',
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            data: grades,
        }]
    };

    // Opções do gráfico
    var opcoes = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                labels: dates,
            },
            y: {
                type: 'linear',
                position: 'left',
                min: 0,
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

function showSummary(num_days, num_tasks, num_corrects, num_mistakes){
    console.log("sadasd")
    let percentage = document.getElementsByClassName("percentagem-inside")
    let days = document.getElementsByClassName("semana")
    let tasks = document.getElementsByClassName("atividades")
    let corrects = document.getElementsByClassName("acertos")
    let mistakes = document.getElementsByClassName("erros")

    console.log(days)
    
    percentage.textContent = `${Math.ceil(num_corrects * 100/(num_corrects + num_mistakes))}%`
    days.textContent = `${num_days} dias`
    tasks.textContent = `${num_tasks} atividades`
    corrects.textContent = `${num_corrects} acertos`
    mistakes.textContent = `${num_mistakes} erros`
}
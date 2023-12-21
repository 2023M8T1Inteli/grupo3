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
                
                sumCorrects += element.dataValues.hits
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
    showNames()

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

    const maxValue = Math.max(...grades)

    // Opções do gráfico
    if (maxValue > 10){
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
    } else {
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
                    max: 10
                }
            }
        };

    }

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

// function getChildName(childId) {
//     return new Promise((resolve) => {
//         ipcRenderer.send('read-patient', childId);
//         ipcRenderer.once('response-read-patient', (event, arg) => {
//             const data = {
//                 childName: arg.response.dataValues.name,
//                 therapistId: arg.response.dataValues.TherapistId
//             };
//             resolve(data);
//         });
//     });
// }

// function getTherapistName(therapistId) {
//     return new Promise((resolve) => {
//         ipcRenderer.send('read-therapist', therapistId);
//         ipcRenderer.once('response-read-therapist', (event, arg) => {
//             console.log(arg)

//             resolve(arg.response.dataValues.name);
//         });
//     });
// }


async function showNames() {
    console.log(localStorage);
    const taskName = localStorage.getItem('taskTitle');
    const childId = localStorage.getItem('childId');
    const therapistId = localStorage.getItem('id')

    let childName
    let therapistName

    console.log(childId);

    ipcRenderer.send('read-patient', childId);
    ipcRenderer.on('response-read-patient', (event, arg) => {
        console.log(arg)

        childName = arg.response.dataValues.name
        
        ipcRenderer.send('read-therapist', therapistId)
        ipcRenderer.on('resposta-read-therapist', (event, arg) => {
            console.log(arg)

            therapistName = arg.response.dataValues.first_name
            
            let task_name_p = document.querySelector(".nova-frase");
            let welcome = document.querySelector("#boas-vindas");
        
            task_name_p.innerText = `Desempenho da última semana - ${taskName.slice(1, taskName.length - 1)}`;
            welcome.innerText = `Olá, ${therapistName}! Você pode acompanhar o desenvolvimento do ${childName} aqui!`;
        })
        
    })
    
    

}

function showSummary(num_days, num_tasks, num_corrects, num_mistakes){
    let percentage = document.querySelector(".percentagem-inside")
    let days = document.querySelector(".semana")
    let tasks = document.querySelector(".atividades")
    let corrects = document.querySelector(".acertos")
    let mistakes = document.querySelector(".erros")

    console.log(days)
    
    percentage.textContent = `${Math.ceil(num_corrects * 100/(num_corrects + num_mistakes))}%`
    days.textContent = `${num_days} dias`
    tasks.textContent = `${num_tasks} atividades`
    corrects.textContent = `${num_corrects} acertos`
    mistakes.textContent = `${num_mistakes} erros`
}
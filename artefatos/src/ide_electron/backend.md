# Documentação das Rotas

## Considerações Iniciais:

- Precisa instalar o SQLite;
- Abra o arquivo **banco** dentro da pasta **\ide_electron** no SQLite (recomendo a instalação do DBeaver);

Va até a pasta **\ide_electron** e de:

```bash
npm i
```

E depois nesta mesma pasta:

```bash
npm run dev
```

Após isso, tudo estará carregado, porém não esqueça que as requisições ipcRenderer só funcionam em páginas que estão no ambiente do electron.

Em todas os arquivos js de páginas html para fazer a requisição ao back precisa fazer um require da dependencia electron:

```bash
const { ipcRenderer } = require('electron');
```

Todas as requisições abaixo são uma demonstração com os corpos de transição

O fluxo da requisição é o seguinte:

- Primeiro faça uma requisição para operação;
- Depois faça uma requisição para resposta;

Exemplo de requisição de resposta para usar como base, ou seja adapte-a de acordo com o contexto:

```bash
// Define uma variável para armazenar a resposta
let resposta;

// Configura o listener para o evento 'resposta-register-therapist'
ipcRenderer.on('resposta-register-therapist', (event, arg) => {
    // Armazena a resposta na variável
    resposta = arg;

    // Exemplo: Exibe a resposta no console
    console.log(resposta);

    // Armazena a resposta no localStorage 
    localStorage.setItem('resposta', JSON.stringify(arg));
});
```

Como visualizar os dados na variável:

```bash
resposta.response.dataValues
```

Como visualizar a mensagem de sucesso ou erro:

```bash
resposta.message
```

## Therapist (Rotas da terapeuta)

### Create

Envia os dados de uma terapeuta para o banco:

```bash
ipcRenderer.send('register-therapist', {
    first_name: first_name, #tipo string
    last_name: last_name, #tipo string
    email: email #tipo string
});
```

Recebe os dados cadastrados no banco:

```bash
resposta-register-therapist
```

### Read

Requisita os dados pelo banco a partir do Id da terapeuta:

```bash
ipcRenderer.send('read-therapist', id_terapeuta) # id_terapeuta tipo inteiro;
```

A resposta da requisição:

```bash
resposta-read-therapist
```

### Update

Atualiza alguma coluna da tabela Therapist:

```bash
ipcRenderer.send('update-therapist', {
    id: id_therapist,
    body: {
      coluna_escolhida: dado_que_ira_por   # Não esqueça de se atentar com o tipo
    }
});
```
Receba os dados atualizados como resposta:

```bash
resposta-update-therapist
```

## Patient (Rotas da tabela paciente)

A Tabela paciente tem uma coluna chamada TherapistId que é uma FK (chave estrangeira) que aponta para o PK(chave primária) da tabela Therapist:

### Create 

Cadastro do Paciente pelo terapeuta:

```bash
ipcRenderer.send('register-patient', {
    name: name, #tipo string
    age: age, #tipo inteiro
    degree: degree, #tipo inteiro (o grau da deficiência)
    first_consultation: first_consultation, # é uma data no formato (DD/MM/AAAA) do tipo string
    last_consultation: last_consultation,
    # é uma data no formato (DD/MM/AAAA) do tipo string
    interests: interests, # tipo string, são os interesses da criança
    background: background, # tipo string, é a história da criança. Obs: o valor é opcional
    TherapistId: id, # tipo inteiro, é o id da terapeuta que o cadastrou 
});
```

### Read 

Retorno dos dados do Paciente a partir do Id deste:

```bash
ipcRenderer.send('read-patient',id_patient)
```

Rota de resposta da requisição acima:

```bash
resposta-read-patient
```

### Read All Patients

Retorno dos dados de todos os pacientes:

```bash
ipcRenderer.send('read-all-patient')
```

Como obter a resposta da operação de cima:

```bash
resposta-readAll-patient
```

### Read specific patients with specific characteres

Le todos os pacientes que fazem parte da cadeia de caracteres inserida como argumento:

```bash
ipcRenderer.send('read-all-patient-chain', cadeia_caracteres) # tipo string
```

Rota de resposta da requisição acima:

```bash
resposta-readAll-patient-chain
```

### Read patients belong to a specific TherapistId

Leia todos os pacientes da terapeuta que o cadastrou

```bash
ipcRenderer.send('read-all-therapist-patient', id_terapeuta); # ira requisitar todos os pacientes daquela terapeuta
```

A rota de resposta:

```bash
resposta-readAll-therapist-patient
```

### Update patient

Atualiza as informações do Paciente

```bash
ipcRenderer.send('update-patient', {
    id: id_patient,
    body: {
        coluna_escolhida: dado_que_ira_por # Não esqueça de se atentar com o tipo, e pode por mais de uma coluna
    } 
});
```

Rota com a resposta da requisição acima:

```bash
resposta-update-patient
```

## Password (Rotas da tabela Password)

### Create

Cria uma senha para uma terapeuta:

```bash
ipcRenderer.send('register-password', {
    password: password, # tipo string 
    TherapistId: id # tipo inteiro
});
```
Rota da resposta dessa requisição:

```bash
resposta-register-password
```

### Read

Leia uma senha especifica:

```bash
ipcRenderer.send('read-password', 4);
```

Rota da resposta da requisição acima:

```bash
resposta-read-password
```

### Read a password belogs to a Therapist

Leia uma senha pertecente ao Terapeuta:

```bash
ipcRenderer.send('read-therapist-password', id_terapeuta); # id do tipo inteiro, ira requisitar a senha da terapeuta
```

Rota de resposta da requisição acima:

```bash
reposta-therapist-password
```

### Delete password of a therapist

Delete uma senha da terapeuta:

```bash
ipcRenderer.send('delete-password', id_password) # id do tipo inteiro
```

Rota para a resposta da requisição acima:

```bash
resposta-delete-password
```

### Update password

Atualiza a senha:

```bash
ipcRenderer.send('update-password', {
    id: id_password,
    body: {
         coluna_escolhida: dado_que_ira_por # se atentar ao tipo de dado que irá por    
    }
});
```

Rota para resposta da requisição acima:

```bash
resposta-update-password
```

## Task (Rotas para Tarefa)

### Create

Cria uma tarefa:

```bash
ipcRenderer.send('register-password', {
    name: name # tipo string, nome da tarefa 
});
```

Rota de resposta para a requisição acima:

```bash
resposta-register-task
```

### Read 

Le somente uma tareka a partir de seu id:

```bash
ipcRenderer.send('read-task', id_task) # tipo inteiro
```

Rota para a resposta da requisição acima:

```bash
resposta-read-task
```

### Read all task

Le todas as tarefas armazenadas no banco:

```bash
ipcRenderer.send('read-all-task') # não precisa mandar nenhum corpo de requisição
```

Rota para a resposta da requisição acima:

```bash
resposta-readAll-task
```

### Delete

Deleta uma tarefa pelo id:

```bash
ipcRenderer.send('delete-task', id_task) # Deleta uma task a partir do id 
```

Rota para a resposta da requisição acima:

```bash
resposta-delete-task
```

### Update

Atualiza uma tarefa a partir do id desta:

```bash
ipcRenderer.send('update-task', {
    id: id_task,
    body: {
        coluna_escolhida: dado_que_ira_por # se atentar ao tipo de dado que ira por  
    }
});
```

Rota para a resposta da requisição acima:

```bash
resposta-update-task
```

## Feedback (rotas para a tabela Feedback)

### Create

Cria um feedback para uma tarefa específica:

```bash
    ipcRenderer.send('register-feedback', {
    message: message, # tipo text 
    color: color, # tipo texte, formato hexadecimal
    image: image, # tipo string, tipo do arquivo
    sound: sound, # tipo string, tipo do arquivo, é opcional usar esta coluna
    type_feedback: type_feedback, # tipo booleano, se for "TRUE" então é um feedback de acerto e se for "FALSE" é um feedback de erro
    TaskId: id_task # tipo inteiro, a tarefa pelo qual o feedback está associado, só existem dois feedbacks por tarefa  
});
```

Rota de resposta da requisição acima:

```bash
resposta-register-feedback
```

### Read

Le um feedback específico de uma tarefa:

```bash
ipcRenderer.send('read-feedback', id_feedback) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-read-feedback
```

### Read feedbacks of specific Task

Le todos os feedbacks de uma tarefa específica:

```bash
ipcRenderer.send('read-task-feedback', id_task) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-read-task-feedback
```

### Delete

Deleta um feedback específico:

```bash
ipcRenderer.send('delete-feedback', id_feedback) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-delete-feedback
```

### Update

Atualiza uma tarefa específica:

```bash
ipcRenderer.send('update-feedback', {
    id: id_feedback, # tipo inteiro
    body: {
        coluna_escolhida: dado_que_ira_por # se atentar ao tipo de dado que ira por  
    }
});
```

Rota de resposta da requisição:

```bash
resposta-update-feedback
```

## Blocks (Rotas para a tabela BlocksTask)

Blocos que fazem parte de uma tarefa específica:

### Create

Adiciona um bloco novo a uma tarefa específica

```bash
ipcRenderer.send('register-blocks-task', {
    block: block, #tipo inteiro, seria a posição do bloco no tapete, seria linha e coluna
    timing: timing, #tipo inteiro, quantidade de segundos para pressão sob um bloco
    TaskId: id_task #tipo inteiro
});
```

Rota de resposta para a requisição acima:

```bash
resposta-register-blocksTask
```

### Read

Le um bloco específico:

```bash
ipcRenderer.send('read-blocksTask', id_block) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-read-blocksTask
```

### Read blocks in a specific task

Le os blocos de uma tarefa especifica:

```bash
ipcRenderer.send('read-task-blocksTask', id_task) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-read-task-blocksTask
```

### Delete

Deleta um bloco de uma tarefa especifica:

```bash
ipcRenderer.send('delete-blocksTask', id_block) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-delete-blocksTask
```

### Update

Atualiza um bloco específico:

```bash
ipcRenderer.send('update-blocksTask', {
    id: id_block, # tipo inteiro
    body: {
        coluna_escolhida: dado_que_ira_por # se atentar ao tipo de dado que ira por  
    }
});
```

Rota de resposta da requisição:

```bash
resposta-update-blocksTask
```

## MyTasks (rotas para a tabela MyTasks)

Tabela associativa que engloba a tabela Paciente e a tabela Task

### Create

Associa uma tarefa a um paciente específico:

```bash
ipcRenderer.send('register-myTask', {
    PatientId: id_patient, # tipo string 
    TaskId: id_task # tipo inteiro
});
```

Rota de resposta da requisição acima:

```bash
resposta-register-myTask
```

### Read

Le uma tarefa específica:

```bash
ipcRenderer.send('read-myTask', id_my_task) # tipo inteiro
```

Rota de resposta da requisição acima:

```bash
resposta-read-myTask
```

### Read all tasks of a specific Patient

Le todas as tarefas de um paciente específico:

```bash
ipcRenderer.send('read-patient-myTask', id_patient) # tipo inteiro
```
Rota de resposta da requisição acima:

```bash
resposta-read-patient-myTask
```

### Delete

Deleta uma tarefa de um paciente:

```bash
ipcRenderer.send('read-patient-myTask', delete-myTask) # tipo inteiro
```
Rota de resposta da requisição acima:

```bash
resposta-delete-myTask
```

## Performance (Rotas da tabela Perfomance)

Tabela vinculada a MyTasks, cada item de performance específica o desempenho de uma tarefa

### Create

Cria uma performance associada a tal tarefa de tal paciente

```bash
ipcRenderer.send('register-performance', {
    hits: hits, # tipo inteiro
    mistakes: id_task, # tipo inteiro,
    consultation_data: data, # tipo string, data da consulta formato (DD/MM/AAAA)
    MyTaskId: id_my_task # tipo inteiro
});
```

Rota de resposta da requisição acima:

```bash
resposta-register-performance
```

### Read 

Le um desempenho:

```bash
ipcRenderer.send('read-performance', id_performance) # tipo inteiro
```
Rota de resposta da requisição acima:

```bash
resposta-read-performance
```

### Read a specific performance of a MyTask

Le uma perfomance de uma tarefa específica de um tal paciente

```bash
ipcRenderer.send('read-my-task-performance', id_my_task) # tipo inteiro
```
Rota de resposta da requisição acima:

```bash
resposta-read-my-task-performance
```

### Delete

Deleta uma perfomance:

```bash
ipcRenderer.send('delete-performance', id_performance) # tipo inteiro
```
Rota de resposta da requisição acima:

```bash
resposta-delete-performance
```

### Update

Atualiza uma perfomance:

```bash
ipcRenderer.send('update-performance', {
    id: id_performance, # tipo inteiro
    body: {
        coluna_escolhida: dado_que_ira_por # se atentar ao tipo de dado que ira por  
    }
});
```

Rota da resposta da requisição acima:

```bash
resposta-update-performance
```


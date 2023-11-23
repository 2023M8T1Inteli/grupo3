# Documentação das Rotas

## Considerações Iniciais:

Todas as requisições abaixo são um exemplo

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
respostaDoRegistro.response.dataValues
```

Como visualizar a mensagem de sucesso ou erro:

```bash
respostaDoRegistro.message
```

### Read

Requisita os dados pelo banco a partir do Id da terapeuta:

```bash
ipcRenderer.send('read-therapist', id_terapeuta) # id_terapeuta tipo inteiro;
```

A resposta da requisição:

```bash
// Define uma variável para armazenar a resposta
let resposta;

// Configura o listener para o evento 'resposta-register-therapist'
ipcRenderer.on('resposta-read-therapist', (event, arg) => {
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
respostaDoRegistro.response.dataValues
```

Como visualizar a mensagem de sucesso ou erro:

```bash
respostaDoRegistro.message
```

### Update

Atualiza alguma coluna da tabela Therapist:

```bash
ipcRenderer.send('update-therapist', {
    coluna_escolhida: dado_que_ira_por # Não esqueça de se atentar com o tipo
});
```
Receba os dados atualizados como resposta:

```bash
    // Define uma variável para armazenar a resposta
let resposta;

// Configura o listener para o evento 'resposta-register-therapist'
ipcRenderer.on('resposta-update-therapist', (event, arg) => {
    // Armazena a resposta na variável
    resposta = arg;

    // Exemplo: Exibe a resposta no console
    console.log(resposta);

    // Armazena a resposta no localStorage 
    localStorage.setItem('resposta', JSON.stringify(arg));
});
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

### Read All Patients

Retorno dos dados de todos os pacientes:

```bash
ipcRenderer.send('read-all-patient')
```

Como obter a resposta da operação de cima:

```bash
ipcRenderer.on('resposta-readAll-patient', (event, arg) => {
    let valor = arg; # Informações de todos os pacientes

})
```

### Read patients belong to a specific TherapistId

Leia todos os pacientes da terapeuta que o cadastrou

```bash

```
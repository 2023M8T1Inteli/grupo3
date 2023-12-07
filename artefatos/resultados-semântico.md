# Resultados: Semântico
O analisador semântico verifica os erros semânticos no código, que dizem respeito ao escopo dos nomes, correspondência entre declarações e uso dos nomes e compatibilidade dos tipos, em expressões e comandos. Abaixo estão alguns exemplos de entrada e os erros semânticos correspondentes produzidos pelo analisador:

## Sprint 3 - Exemplo 1:
```
programa "teste semântico 1":
inicio
    x = y
fim.
```
### Erro gerado:
```
ClassesAuxiliares.SemanticException: O identificador y na linha 3 não foi declarado
```

## Exemplo 2:
```
programa "teste semântico 2":
inicio
    x = 1
    y = 2
    mostrar(z)
    z = y
fim.
```
### Erro gerado:
```
ClassesAuxiliares.SemanticException: O identificador z na linha 5 não foi declarado
```
## Sprint 4 - Exemplo 1:
```
programa "exemplo_semantico1":
    inicio
    valor = ler()
    se valor >= 10 entao
    inicio
        x = x + 1
        mostrar(x)
    fim
fim.
```
### Erro gerado:
```
ClassesAuxiliares.SemanticException: O identificador x na linha 6 não foi declarado
```

## Exemplo 2:
```
programa "exemplo_semantico2":
inicio
    x = 1
    y = x * 2 + (z / 5)
    z = 2
fim.
```
### Erro gerado:
```
ClassesAuxiliares.SemanticException: O identificador z na linha 4 não foi declarado
```

## Exemplo 3:
```
programa "exemplo_semantico3":
inicio
    i = 0
    enquanto i <= 10 faca
    inicio

    fim
fim.
```
### Erro gerado:
```
ClassesAuxiliares.SemanticException: A expressão enquanto não pode ser vazia
```
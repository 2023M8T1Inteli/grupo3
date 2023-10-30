# Resultados: Léxico
O analisador léxico é responsável por quebrar o código-fonte em partes menores, chamadas de tokens. Abaixo estão alguns exemplos de entrada e os tokens correspondentes produzidos pelo analisador léxico:

## Exemplo 1:
```
a = 1
b = 12
c = (12+3)
```
### Tokens gerados:
```
(ID a 1)
(ASSIGN = 1)
(INTEGER 1 1)
(ID b 2)
(ASSIGN = 2)
(INTEGER 12 2)
(ID c 3)
(ASSIGN = 3)
(LPAR ( 3)
(INTEGER 12 3)
(OPSUM + 3)
(INTEGER 3 3)
(RPAR ) 3)
(EOF EOF 3)
```

## Exemplo 2:
```
inicio
    z = -1234
fim
```
### Tokens gerados:
```
(LBLOCK inicio 1)
(ID z 2)
(ASSIGN = 2)
(OPSUM - 2)
(INTEGER 1234 2)
(RBLOCK fim 3)
(EOF EOF 3)
```

## Exemplo 3:
```
teste = 1+2 -3 *
40/5 ^ 6 %

987
```
### Tokens gerados:
```
(ID teste 1)
(ASSIGN = 1)
(INTEGER 1 1)
(OPSUM + 1)
(INTEGER 2 1)
(OPSUM - 1)
(INTEGER 3 1)
(OPMUL * 1)
(INTEGER 40 3)
(OPMUL / 3)
(INTEGER 5 3)
(OPPOW ^ 3)
(INTEGER 6 3)
(OPMUL % 3)
(INTEGER 987 6)
(EOF EOF 6)
```

## Exemplo 4:
```
se abc <> xyz entao
inicio
    x=(verdade)
    y= ler ( )
fim
```
### Tokens gerados:
```
(SE se 1)
(ID abc 1)
(OPREL <> 1)
(ID xyz 1)
(ENTAO entao 1)
(LBLOCK inicio 2)
(ID x 3)
(ASSIGN = 3)
(LPAR ( 3)
(BOOLEAN verdade 3)
(RPAR ) 3)
(ID y 4)
(ASSIGN = 4)
(COMANDO ler 4)
(LPAR ( 4)
(RPAR ) 4)
(RBLOCK fim 5)
(EOF EOF 5)
```

## Exemplo 5:
```
programa :
inicio
    programas = verdade
    verdades = 0
    se entao inicio
        ses = verdades
        programas = ler()
        x = ler_varios(11, 4, 1)
    fim
fim.
```
### Tokens gerados:
```
(PROGRAMA programa 1) 
(COLON : 1)
(LBLOCK inicio 2)
(ID programas 3)
(ASSIGN = 3)
(BOOLEAN verdade 3)
(ID verdades 4)
(ASSIGN = 4)
(INTEGER 0 4)
(SE se 5)
(ENTAO entao 5)
(LBLOCK inicio 5)
(ID ses 6)
(ASSIGN = 6)
(ID verdades 6)
(ID programas 7)
(ASSIGN = 7)
(COMANDO ler 7)
(LPAR ( 7)
(RPAR ) 7)
(ID x 8)
(ASSIGN = 8)
(COMANDO ler_varios 8)
(LPAR ( 8)
(INTEGER 11 8)
(COMMA , 8)
(INTEGER 4 8)
(COMMA , 8)
(INTEGER 1 8)
(RPAR ) 8)
(RBLOCK fim 9)
(RBLOCK fim 10)
(DOT . 10)
(EOF EOF 10)
```
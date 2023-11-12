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

## Exemplo 1 - Sprint 2
```
programa "cores":
inicio
    x = ler_varios(5, 3, 1)
    y = ler()
    z = ler()
    se ((y == 11) e (z > 12)) ou x entao
    inicio
        mostrar(3)
    fim
    y = ler()
    esperar(1*1000)
    mostrar_tocar(y%10, (y+1) % 10)
fim.
```
### Tokens gerados:
```
(PROGRAMA programa 1)
(DQUOTE " 1)
(STRING cores 1)
(DQUOTE " 1)
(COLON : 1)
(LBLOCK inicio 2)
(ID x 3)
(ASSIGN = 3)
(COMANDO ler_varios 3)
(LPAR ( 3)
(INTEGER 5 3)
(COMMA , 3)
(INTEGER 3 3)
(COMMA , 3)
(INTEGER 1 3)
(RPAR ) 3)
(ID y 4)
(ASSIGN = 4)
(COMANDO ler 4)
(LPAR ( 4)
(RPAR ) 4)
(ID z 5)
(ASSIGN = 5)
(COMANDO ler 5)
(LPAR ( 5)
(RPAR ) 5)
(SE se 6)
(LPAR ( 6)
(LPAR ( 6)
(ID y 6)
(OPREL == 6)
(INTEGER 11 6)
(RPAR ) 6)
(OPMUL e 6)
(LPAR ( 6)
(ID z 6)
(OPREL > 6)
(INTEGER 12 6)
(RPAR ) 6)
(RPAR ) 6)
(OPSUM ou 6)
(ID x 6)
(ENTAO entao 6)
(LBLOCK inicio 7)
(COMANDO mostrar 8)
(LPAR ( 8)
(INTEGER 3 8)
(RPAR ) 8)
(RBLOCK fim 9)
(ID y 10)
(ASSIGN = 10)
(COMANDO ler 10)
(LPAR ( 10)
(RPAR ) 10)
(COMANDO esperar 11)
(LPAR ( 11)
(INTEGER 1 11)
(OPMUL * 11)
(INTEGER 1000 11)
(RPAR ) 11)
(COMANDO mostrar_tocar 12)
(LPAR ( 12)
(ID y 12)
(OPMUL % 12)
(INTEGER 10 12)
(COMMA , 12)
(LPAR ( 12)
(ID y 12)
(OPSUM + 12)
(INTEGER 1 12)
(RPAR ) 12)
(OPMUL % 12)
(INTEGER 10 12)
(RPAR ) 12)
(RBLOCK fim 13)
(DOT . 13)
(EOF EOF 13)
```

## Exemplo 2 - Sprint 2 
```
// Comentários são ignorados, mas quebras de linha não são
programa "peixes do mar": // os tokens devem ser classificados na linha 2
inicio
    x = ler_varios(5, 3, 1)
    y = ler()
    z = ler()/*
    se ((y == 11) e (z == 12)) ou x entao
    inicio
        mostrar(3)
    fim*/
    Enquanto = ler() // Enquanto é ID, e os tokens classificados na linha 11
    enquanto (Enquanto <> 54) e (Enquanto >= 23) faca
    inicio
        tocar(Enquanto % 10)
        Enquanto = ler()
    fim
    mostrar_tocar(0, 8)
fim.
```

### Tokens gerados
```
(PROGRAMA programa 2)
(DQUOTE " 2)
(STRING peixes do mar 2)
(DQUOTE " 2)
(COLON : 2)
(LBLOCK inicio 3)
(ID x 4)
(ASSIGN = 4)
(COMANDO ler_varios 4)
(LPAR ( 4)
(INTEGER 5 4)
(COMMA , 4)
(INTEGER 3 4)
(COMMA , 4)
(INTEGER 1 4)
(RPAR ) 4)
(ID y 5)
(ASSIGN = 5)
(COMANDO ler 5)
(LPAR ( 5)
(RPAR ) 5)
(ID z 6)
(ASSIGN = 6)
(COMANDO ler 6)
(LPAR ( 6)
(RPAR ) 6)
(ID Enquanto 11)
(ASSIGN = 11)
(COMANDO ler 11)
(LPAR ( 11)
(RPAR ) 11)
(ENQUANTO enquanto 12)
(LPAR ( 12)
(ID Enquanto 12)
(OPREL <> 12)
(INTEGER 54 12)
(RPAR ) 12)
(OPMUL e 12)
(LPAR ( 12)
(ID Enquanto 12)
(OPREL >= 12)
(INTEGER 23 12)
(RPAR ) 12)
(FACA faca 12)
(LBLOCK inicio 13)
(COMANDO tocar 14)
(LPAR ( 14)
(ID Enquanto 14)
(OPMUL % 14)
(INTEGER 10 14)
(RPAR ) 14)
(ID Enquanto 15)
(ASSIGN = 15)
(COMANDO ler 15)
(LPAR ( 15)
(RPAR ) 15)
(RBLOCK fim 16)
(COMANDO mostrar_tocar 17)
(LPAR ( 17)
(INTEGER 0 17)
(COMMA , 17)
(INTEGER 8 17)
(RPAR ) 17)
(RBLOCK fim 18)
(DOT . 18)
(EOF EOF 18)
```
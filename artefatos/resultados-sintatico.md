# Resultados: Sintático
O analisador sintático é responsável por garantir que o código-fonte faz sentido, ou seja, garante que esteja de acordo com as regras gramaticais da linguagem.  Abaixo estão alguns exemplos de entrada e a árvore sintática produzidos pelo analisador:

## Exemplo 1:
```
programa "teste simples":
inicio

fim.
```

### Árvore gerada:
```
InternNode(op="program", block=InternNode(op="block", statementList=None), string=LeafNode(op="string", value="teste simples", line=1))

- O código-fonte está de acordo com a gramática, pois não gerou um erro sintático.
```

## Exemplo 2:
```
programa "teste2":
inicio
    _variavel1 = ler()
    /* Nesta primeira versão recomendamos que vocês
    não tratem as regras <expression> nem <sum_expression>.
    Para os comandos abaixo, ao invés de "casar" com um
    <sum_expression>, case os valores com tokens INTEGER */
    xyz = ler_varios(1, 2, 3)
    mostrar(4)
fim.
```
### Árvore gerada:
```
InternNode(op="program", block=InternNode(op="block", statementList=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=None, statement=InternNode(op="commandStatement", command=LeafNode(op="command", value="mostrar", line=9), sumExpression=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="4", line=9), sinal="+"))), statement=InternNode(op="assignStatement", id=LeafNode(op="id", value="xyz", line=8), inputStatement=InternNode(op="inputStatement", command=LeafNode(op="command", value="ler_varios", line=8), dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="3", line=8), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=8), sinal="+"), mid=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=8), sinal="+")))), statement=InternNode(op="assignStatement", id=LeafNode(op="id", value="_variavel1", line=3), inputStatement=InternNode(op="inputStatement", command=LeafNode(op="command", value="ler", line=3))))), string=LeafNode(op="string", value="teste2", line=1))

- O código-fonte está de acordo com a gramática, pois não gerou um erro sintático.
```

## Exemplo 1 - Sprint 3:
```
programa "exemplo1":
inicio
    qtd = 1
    resp = ler_varios(10, qtd, 1)
    i = 30
    x = 1
    enquanto (i >= 1) ou (resp) faca inicio
        se x > 20 entao inicio
            x = 1
        fim senao inicio
            x = x + 1
        fim
        mostrar(x)
        qtd = qtd + 1
        resp = ler_varios(10, qtd, 1)
        i = i - 1
    fim
fim.
```
### Árvore gerada:
```
InternNode(op="program", block=InternNode(op="block", statementList=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=None, statement=InternNode(op="whileStatement", block=InternNode(op="block", statementList=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=None, statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=16), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="i", line=16), sinal="+"), oper="-"), oper=None), id=LeafNode(op="id", value="i", line=16))), statement=InternNode(op="assignStatement", id=LeafNode(op="id", value="resp", line=15), inputStatement=InternNode(op="inputStatement", command=LeafNode(op="command", value="ler_varios", line=15), dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=15), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="10", line=15), sinal="+"), mid=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="qtd", line=15), sinal="+")))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=14), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="qtd", line=14), sinal="+"), oper="+"), oper=None), id=LeafNode(op="id", value="qtd", line=14))), statement=InternNode(op="commandStatement", command=LeafNode(op="command", value="mostrar", line=13), sumExpression=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="x", line=13), sinal="+"))), statement=InternNode(op="ifStatement", elseBlock=InternNode(op="block", statementList=InternNode(op="statementList", prox=None, statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=11), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="x", line=11), sinal="+"), oper="+"), oper=None), id=LeafNode(op="id", value="x", line=11)))), expression=InternNode(op="expression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="20", line=8), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="x", line=8), sinal="+"), oper="entao"), ifBlock=InternNode(op="block", statementList=InternNode(op="statementList", prox=None, statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=9), sinal="+"), oper=None), id=LeafNode(op="id", value="x", line=9))))))), expression=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=InternNode(op="expression", dir=None, esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="resp", line=7), sinal="+"), oper=None), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=InternNode(op="expression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=7), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="i", line=7), sinal="+"), oper=")"), sinal="+"), oper="ou"), oper=None))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=6), sinal="+"), oper=None), id=LeafNode(op="id", value="x", line=6))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="30", line=5), sinal="+"), oper=None), id=LeafNode(op="id", value="i", line=5))), statement=InternNode(op="assignStatement", id=LeafNode(op="id", value="resp", line=4), inputStatement=InternNode(op="inputStatement", command=LeafNode(op="command", value="ler_varios", line=4), dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=4), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="10", line=4), sinal="+"), mid=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="qtd", line=4), sinal="+")))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=3), sinal="+"), oper=None), id=LeafNode(op="id", value="qtd", line=3)))), string=LeafNode(op="string", value="exemplo1", line=1))
```

## Exemplo 2:
```
programa "exemplo2":
inicio
    x = (3 ^ 5) ^ 2
    y = 3 ^ 5 ^ 2
    z = (10 + 2 * 50 / 5 - 1) % 2
    se (3 + 4 - 5) % 2 == 0 entao inicio
        mostrar(10 / 2)
    fim
fim.
```
### Árvore gerada:
```
InternNode(op="program", block=InternNode(op="block", statementList=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=InternNode(op="statementList", prox=None, statement=InternNode(op="ifStatement", elseBlock=None, expression=InternNode(op="expression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="0", line=6), sinal="+"), esq=InternNode(op="multTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=6), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="5", line=6), sinal="+"), esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="4", line=6), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="3", line=6), sinal="+"), oper="+"), oper="-"), oper=None), sinal="+"), oper="%"), oper="entao"), ifBlock=InternNode(op="block", statementList=InternNode(op="statementList", prox=None, statement=InternNode(op="commandStatement", command=LeafNode(op="command", value="mostrar", line=7), sumExpression=InternNode(op="multTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=7), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="10", line=7), sinal="+"), oper="/")))))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="multTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=5), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=InternNode(op="expression", dir=None, esq=InternNode(op="sumExpression", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="1", line=5), sinal="+"), esq=InternNode(op="sumExpression", dir=InternNode(op="multTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="5", line=5), sinal="+"), esq=InternNode(op="multTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="50", line=5), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=5), sinal="+"), oper="*"), oper="/"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="10", line=5), sinal="+"), oper="+"), oper="-"), oper=None), sinal="+"), oper="%"), oper=None), id=LeafNode(op="id", value="z", line=5))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="powerTerm", dir=InternNode(op="powerTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=4), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="5", line=4), sinal="+"), oper="^"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="3", line=4), sinal="+"), oper="^"), oper=None), id=LeafNode(op="id", value="y", line=4))), statement=InternNode(op="assignStatement", expression=InternNode(op="expression", dir=None, esq=InternNode(op="powerTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="2", line=3), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=InternNode(op="expression", dir=None, esq=InternNode(op="powerTerm", dir=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="5", line=3), sinal="+"), esq=InternNode(op="factor", dir=None, esq=None, factor=LeafNode(op="id", value="3", line=3), sinal="+"), oper="^"), oper=None), sinal="+"), oper="^"), oper=None), id=LeafNode(op="id", value="x", line=3)))), string=LeafNode(op="string", value="exemplo2", line=1))
```

## Exemplo 3 (com erro na linha 6):
```
programa "exemplo3":
inicio
    x = (3 ^ 5) ^ 2
    y = 3 ^ 5 ^ 2
    z = (10 + 2 * 50 / 5 - 1) % 2
    se (3 + 4 - 5) % 2 = 0 entao inicio
        mostrar(10 / 2)
    fim
fim.
```
### Erro:
```
ClassesAuxiliares.SyntaticException: Era esperado 'ENTAO', mas foi encontrado '=' - linha 6
```

## Exemplo 4 (com erro na linha 7):
```
programa "exemplo4":
    inicio
    x = (3 ^ 5) ^ 2
    y = 3 ^ 5 ^ 2
    z = (10 + 2 * 50 / 5 - 1) % 2
    se (3 + 4 -5) % 2 == 0 entao inicio
        mostrar(10 / 2, 2 * 1)
    fim
fim.
```
### Erro:
```
ClassesAuxiliares.SyntaticException: Era esperado 'RPAR', mas foi encontrado ',' - linha 7
```
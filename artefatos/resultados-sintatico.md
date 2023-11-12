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

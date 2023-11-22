# Classe Token para representar os tokens encontrados no código.
class Token:
    def __init__(self, tipo, valor, linha):
        self.tipo = tipo
        self.valor = valor
        self.linha = linha

    def __repr__(self):
        return f"({self.tipo} {self.valor} {self.linha})"
    
class LexicalException(Exception):
    pass

class SyntaticException(Exception):
    pass

class SemanticException(Exception):
    pass

# Classe para representar os nós de variáveis nas regras gramaticais
class InternNode:
    def __init__(self, op, **kwargs):
        self.op = op
        self.d = {}
        for key, value in kwargs.items():
            self.d[key] = value

    def getNode(self, k):
        return self.d.get(k)
    
    def __repr__(self):
        params = []
        for k in sorted(self.d.keys()):
            value = self.d[k]
            if type(value) == str:
                value = f'"{value}"'
            params.append(f"{k}={value}")
        paramsStr = ", ".join(params)
        if len(paramsStr) > 0:
            paramsStr = ", " + paramsStr
        return f'InternNode(op="{self.op}"{paramsStr})'

# Classe para representar os nós de terminais nas regras gramaticais
class LeafNode:
    def __init__(self, op, value, line):
        self.op = op
        self.value = value
        self.line = line

    def __repr__(self):
        return f'LeafNode(op="{self.op}", value="{self.value}", line={self.line})'
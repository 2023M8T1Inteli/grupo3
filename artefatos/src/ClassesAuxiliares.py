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
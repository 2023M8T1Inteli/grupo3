from ClassesAuxiliares import SyntaticException

class AnalisadorSintatico:
    def __init__(self, tokens):
        self.tokens = tokens

    def matchToken(self, type):
        print(self.tokens[0])
        if self.tokens[0].tipo == type:
            self.tokens.pop(0)
        else:
            raise SyntaticException(f"Token {type} not found")
        
    def program(self):
        self.matchToken("PROGRAMA")
        self.matchToken("DQUOTE")
        self.matchToken("STRING")
        self.matchToken("DQUOTE")
        self.matchToken("COLON")
        self.block()
        self.matchToken("DOT")
        return True

    def block(self):
        pass

        
from ClassesAuxiliares import SyntaticException

class AnalisadorSintatico:
    def __init__(self, tokens):
        self.tokens = tokens

    def matchToken(self, type):
        if self.tokens[0].tipo == type:
            self.tokens.pop(0)
        else:
            raise SyntaticException(f"Era esperado '{type}', mas foi encontrado '{self.tokens[0].valor}' - linha {self.tokens[0].linha}")
        
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
        self.matchToken("LBLOCK")
        self.statement_list()
        self.matchToken("RBLOCK")

    def statement_list(self):
        if self.tokens[0].tipo == "RBLOCK":
            pass
        else:
            self.statement()
            self.statement_list()

    def statement(self):
        if self.tokens[0].tipo == "ID":
            self.assign_statement()
        elif self.tokens[0].tipo == "SE":
            self.if_statement()
        elif self.tokens[0].tipo == "ENQUANTO":
            self.while_statement()
        elif self.tokens[0].tipo == "COMANDO":
            self.command_statement()

    def assign_statement(self):
        self.matchToken("ID")
        self.matchToken("ASSIGN")
        if self.tokens[0].tipo == "COMANDO" and (self.tokens[0].valor == "ler" or self.tokens[0].valor == "ler_varios"):
            self.input_statement()
        elif self.tokens[0].tipo == "ID" or self.tokens[0].tipo == "INTEGER" or (self.tokens[0].tipo == "verdade" or self.tokens[0].tipo == "falso") or self.tokens[0].tipo == "OPSUM" or self.tokens[0].tipo == "NAO" or self.tokens[0].tipo == "LPAR":
            self.expression()

    def input_statement(self):
        if self.tokens[0].valor == "ler":
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            self.matchToken("RPAR")
        elif self.tokens[0].valor == "ler_varios":
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            self.sum_expression()
            self.matchToken("COMMA")
            self.sum_expression()
            self.matchToken("COMMA")
            self.sum_expression()
            self.matchToken("RPAR")

    def if_statement(self):
        self.matchToken("SE")
        self.expression()
        self.matchToken("ENTAO")
        self.block()
        if self.tokens[0].tipo == "SENAO":
            self.matchToken("SENAO")
            self.block()

    def while_statement(self):
        self.matchToken("ENQUANTO")
        self.expression()
        self.matchToken("FACA")
        self.block()

    def command_statement(self):
        if self.tokens[0].valor == "mostrar" or self.tokens[0].valor == "tocar" or self.tokens[0].valor == "esperar":   
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            self.sum_expression()
            self.matchToken("RPAR")
        elif self.tokens[0].valor == "mostrar_tocar":
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            self.sum_expression()
            self.matchToken("COMMA")
            self.sum_expression()
            self.matchToken("RPAR")
        
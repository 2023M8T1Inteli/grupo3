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
        if self.tokens[0].tipo == "COMANDO" and self.tokens[0].valor in ["ler", "ler_varios"]:
            self.input_statement()
        elif self.tokens[0].tipo in ["ID", "INTEGER", "verdade", "falso", "OPSUM", "NAO", "LPAR"]:
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
        if self.tokens[0].valor in ["mostrar", "tocar", "esperar"]:  
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

    def expression(self):
        self.sum_expression()
        if self.tokens[0].tipo == "OPREL":
            self.sum_expression()
            self.relop()

    def relop(self):
        self.matchToken("OPREL")
    
    def sum_expression(self):
        self.mult_term()

    def sum_expression2(self):
        if self.tokens[0].valor in ["+", "-", "ou"]:
            self.matchToken(self.tokens[0].tipo)
            self.mult_term()
            self.sum_expression2()
    
    def mult_term(self):
        self.power_term()
        self.mult_term2()
    
    def mult_term2(self):
        if self.tokens[0].valor in ["*", "/", "%", "e"]:
            self.matchToken(self.tokens[0].tipo)
            self.power_term()
            self.mult_term()

    def power_term(self):
        self.factor()
        if self.tokens[0].tipo == "OPPOW":
            self.matchToken(self.tokens[0].tipo)
            self.power_term()

    def factor(self):
        if self.tokens[0].tipo == "ID":
            self.matchToken("ID")
        elif self.tokens[0].tipo == "INTEGER":
            self.matchToken("INTEGER")
        elif self.tokens[0].tipo == "BOOLEAN":
            self.boolean()
        elif self.tokens[0].tipo == "OPSUM":
            self.matchToken("OPSUM")
            self.factor()
        elif self.tokens[0].tipo == "NAO":
            self.boolean()
        elif self.tokens[0].tipo == "LPAR":
            self.matchToken("LPAR")
            self.expression()
            self.matchToken("RPAR")

    def boolean(self):
        self.matchToken("BOOLEAN")
    

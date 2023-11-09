from ClassesAuxiliares import SyntaticException, InternNode, LeafNode

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
        stringValue = self.tokens[0].valor
        stringLine = self.tokens[0].linha
        self.matchToken("STRING")
        self.matchToken("DQUOTE")
        self.matchToken("COLON")
        block = self.block()
        self.matchToken("DOT")
        return InternNode("program", string=LeafNode("string", stringValue, stringLine), block=block)

    def block(self):
        self.matchToken("LBLOCK")
        statementList = self.statement_list()
        self.matchToken("RBLOCK")
        return InternNode("block", statementList=statementList)

    def statement_list(self):
        if self.tokens[0].tipo == "RBLOCK":
            pass
        else:
            statement = self.statement()
            statementList = self.statement_list()
            return InternNode("statementList", statement=statement, statementList=statementList)

    def statement(self):
        if self.tokens[0].tipo == "ID":
            return self.assign_statement()
        elif self.tokens[0].tipo == "SE":
            return self.if_statement()
        elif self.tokens[0].tipo == "ENQUANTO":
            return self.while_statement()
        elif self.tokens[0].tipo == "COMANDO":
            return self.command_statement()

    def assign_statement(self):
        node = None
        idValue = self.tokens[0].valor
        idLine = self.tokens[0].linha
        self.matchToken("ID")
        self.matchToken("ASSIGN")
        if self.tokens[0].tipo == "COMANDO" and self.tokens[0].valor in ["ler", "ler_varios"]:
            inputStatement = self.input_statement()
            node = InternNode("assignStatement", id=LeafNode("id", idValue, idLine), inputStatement=inputStatement)
        elif self.tokens[0].tipo in ["ID", "INTEGER", "verdade", "falso", "OPSUM", "NAO", "LPAR"]:
            expression = self.expression()
            node = InternNode("assignStatement", id=LeafNode("id", idValue, idLine), expression=expression)
        return node

    def input_statement(self):
        if self.tokens[0].valor == "ler":
            commandLine = self.tokens[0].linha
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            self.matchToken("RPAR")
            return InternNode("inputStatement", command = LeafNode("command", value="ler", line=commandLine))
        elif self.tokens[0].valor == "ler_varios":
            commandLine = self.tokens[0].linha
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            esq = self.sum_expression()
            self.matchToken("COMMA")
            mid = self.sum_expression()
            self.matchToken("COMMA")
            dir = self.sum_expression()
            self.matchToken("RPAR")
            return InternNode("inputStatement", command = LeafNode("command", value="ler_varios", line=commandLine), esq=esq, mid=mid, dir=dir)

    def if_statement(self):
        self.matchToken("SE")
        expression = self.expression()
        self.matchToken("ENTAO")
        ifBlock = self.block()
        if self.tokens[0].tipo == "SENAO":
            self.matchToken("SENAO")
            elseBlock = self.block()
        return InternNode("ifStatement", expression=expression, ifBlock=ifBlock, elseBlock=elseBlock)

    def while_statement(self):
        self.matchToken("ENQUANTO")
        expression = self.expression()
        self.matchToken("FACA")
        block = self.block()
        return InternNode("whileStatement", expression=expression, block=block)

    def command_statement(self):
        if self.tokens[0].valor in ["mostrar", "tocar", "esperar"]:
            commandValue = self.tokens[0].valor
            commandLine = self.tokens[0].linha 
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            sumExpression = self.sum_expression()
            self.matchToken("RPAR")
            return InternNode("commandStatement", command=LeafNode("command", value=commandValue, line=commandLine), sumExpression=sumExpression)
        elif self.tokens[0].valor == "mostrar_tocar":
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            esq = self.sum_expression()
            self.matchToken("COMMA")
            dir = self.sum_expression()
            self.matchToken("RPAR")
            return InternNode("commandStatement", command=LeafNode("command", value="mostrar_tocar", line=commandLine), esq=esq, dir=dir)

    def expression(self):
        oper = None
        esq = ""
        dir = None
        esq = self.sum_expression()
        if self.tokens[0].tipo == "OPREL":
            dir = self.sum_expression()
            oper = self.tokens[0].valor
            self.relop()
        return InternNode("expression", oper=oper, esq=esq, dir=dir)

    def relop(self):
        self.matchToken("OPREL")
    
    def sum_expression(self):
        multTerm = self.mult_term()
        return self.sum_expression2(multTerm)

    def sum_expression2(self, esq=None):
        if self.tokens[0].valor in ["+", "-", "ou"]:
            oper = self.tokens[0].valor
            self.matchToken(self.tokens[0].tipo)
            multTerm = self.mult_term()
            node = InternNode("sumExpression", oper=oper, esq=esq, dir=multTerm)
            return self.sum_expression2(node)
        return esq
    
    def mult_term(self):
        powerTerm = self.power_term()
        return self.mult_term2(powerTerm)
    
    def mult_term2(self, esq=None):
        if self.tokens[0].valor in ["*", "/", "%", "e"]:
            oper = self.tokens[0].valor
            self.matchToken(self.tokens[0].tipo)
            powerTerm = self.power_term()
            node = InternNode("multTerm", oper=oper, esq=esq, dir=powerTerm)
            return self.mult_term2(node)
        return esq

    def power_term(self):
        factor = self.factor()
        if self.tokens[0].tipo == "OPPOW":
            self.matchToken(self.tokens[0].tipo)
            powerTerm = self.power_term()
            return InternNode("powerTerm", oper="^", esq=factor, dir=powerTerm)
        return factor

    def factor(self):
        sinal = "+"
        if self.tokens[0].tipo == "OPSUM":
            sinal = self.tokens[0].valor
            self.matchToken("OPSUM")
        elif self.tokens[0].tipo == "ID":
            idValue = self.tokens[0].valor
            idLine = self.tokens[0].linha
            self.matchToken("ID")
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=LeafNode("id", idValue, idLine))
        elif self.tokens[0].tipo == "INTEGER":
            intValue = self.tokens[0].valor
            intLine = self.tokens[0].linha
            self.matchToken("INTEGER")
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=LeafNode("id", intValue, intLine))
        elif self.tokens[0].tipo == "BOOLEAN":
            bool = self.boolean()
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=bool)
        elif self.tokens[0].tipo == "NAO":
            bool = self.boolean()
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=bool)
        elif self.tokens[0].tipo == "LPAR":
            self.matchToken("LPAR")
            expression = self.expression()
            self.matchToken("RPAR")
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=expression)

    def boolean(self):
        boolValue = self.tokens[0].valor
        boolLine = self.tokens[0].linha
        self.matchToken("BOOLEAN")
        return LeafNode("log", value=boolValue, line=boolLine)
    

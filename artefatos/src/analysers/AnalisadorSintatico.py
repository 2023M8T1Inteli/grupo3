from ClassesAuxiliares import SyntaticException, InternNode, LeafNode

class AnalisadorSintatico:
    def __init__(self, tokens):
        self.tokens = tokens

    #Função que verifica se o token atual é o token esperado. Caso não seja, retorna um erro sintático.
    def matchToken(self, type):
        if self.tokens[0].tipo == type:
            self.tokens.pop(0)
        else:
            raise SyntaticException(f"Era esperado '{type}', mas foi encontrado '{self.tokens[0].valor}' - linha {self.tokens[0].linha}")
    
    #Regra: <program> ::= PROGRAMA DQUOTE STRING DQUOTE COLON <block> DOT
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

    #Regra: <block> ::= LBLOCK <statement_list> RBLOCK
    def block(self):
        self.matchToken("LBLOCK")
        statementList = self.statement_list()
        self.matchToken("RBLOCK")
        return InternNode("block", statementList=statementList)

    #Regra: <statement_list> ::= <statement> <statement_list> | ε
    def statement_list(self):
        if self.tokens[0].tipo == "RBLOCK":
            return None
        else:
            statement = self.statement()
            statementList = self.statement_list()
            return InternNode("statementList", statement=statement, prox=statementList)
    
    #Regra: <statement> ::= <assign_statement> | <if_statement> | <while_statement> | <command_statement>
    def statement(self):
        if self.tokens[0].tipo == "ID":
            return self.assign_statement()
        elif self.tokens[0].tipo == "SE":
            return self.if_statement()
        elif self.tokens[0].tipo == "ENQUANTO":
            return self.while_statement()
        elif self.tokens[0].tipo == "COMANDO":
            return self.command_statement()

    #Regra: <assign_statement> ::= ID ASSIGN ( <input_statement> | <expression> )
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

    #Regra: <input_statement> ::= 'ler' LPAR RPAR | 'ler_varios' LPAR <sum_expression> COMMA <sum_expression> COMMA <sum_expression> RPAR
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

    #Regra: <if_statement> ::= SE <expression> ENTAO <block> [SENAO <block>]
    def if_statement(self):
        self.matchToken("SE")
        expression = self.expression()
        self.matchToken("ENTAO")
        ifBlock = self.block()
        elseBlock = None
        if self.tokens[0].tipo == "SENAO":
            self.matchToken("SENAO")
            elseBlock = self.block()
        return InternNode("ifStatement", expression=expression, ifBlock=ifBlock, elseBlock=elseBlock)

    #Regra: <while_statement> ::= ENQUANTO <expression> FACA <block>
    def while_statement(self):
        self.matchToken("ENQUANTO")
        expression = self.expression()
        self.matchToken("FACA")
        block = self.block()
        return InternNode("whileStatement", expression=expression, block=block)

    #Regra: <command_statement> ::= 'mostrar' LPAR <sum_expression> RPAR | 'tocar' LPAR <sum_expression> RPAR | 'esperar' LPAR <sum_expression> RPAR | 'mostrar_tocar' LPAR <sum_expression> COMMA <sum_expression> RPAR
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
            commandValue = self.tokens[0].valor
            commandLine = self.tokens[0].linha 
            self.matchToken("COMANDO")
            self.matchToken("LPAR")
            esq = self.sum_expression()
            self.matchToken("COMMA")
            dir = self.sum_expression()
            self.matchToken("RPAR")
            return InternNode("commandStatement", command=LeafNode("command", value="mostrar_tocar", line=commandLine), esq=esq, dir=dir)

    #Regra: <expression> ::= <sum_expression> [<relop> <sum_expression>]
    def expression(self):
        oper = None
        esq = ""
        dir = None
        esq = self.sum_expression()
        if self.tokens[0].tipo == "OPREL":
            self.relop()
            dir = self.sum_expression()
            oper = self.tokens[0].valor
        return InternNode("expression", oper=oper, esq=esq, dir=dir)

    #Regra: <relop> ::= '==' | '<>' | '>' | '<' | '>=' | '<='
    def relop(self):
        self.matchToken("OPREL")

    #Regra: <sum_expression> ::= <mult_term> <sum_expression2>
    def sum_expression(self):
        multTerm = self.mult_term()
        return self.sum_expression2(multTerm)

    #Regra: <sum_expression2> ::= ('+' | '-' | 'ou') <mult_term> <sum_expression2>
    def sum_expression2(self, esq=None):
        if self.tokens[0].valor in ["+", "-", "ou"]:
            oper = self.tokens[0].valor
            self.matchToken(self.tokens[0].tipo)
            multTerm = self.mult_term()
            node = InternNode("sumExpression", oper=oper, esq=esq, dir=multTerm)
            return self.sum_expression2(node)
        return esq
    
    #Regra: <mult_term> ::= <power_term> <mult_term2>
    def mult_term(self):
        powerTerm = self.power_term()
        return self.mult_term2(powerTerm)
    
    #Regra: <mult_term2> ::= ('*' | '/' | '%' | 'e') <power_term> <mult_term2>
    def mult_term2(self, esq=None):
        if self.tokens[0].valor in ["*", "/", "%", "e"]:
            oper = self.tokens[0].valor
            self.matchToken(self.tokens[0].tipo)
            powerTerm = self.power_term()
            node = InternNode("multTerm", oper=oper, esq=esq, dir=powerTerm)
            return self.mult_term2(node)
        return esq

    #Regra: <power_term> ::= <factor> ['^' <power_term>]
    def power_term(self):
        factor = self.factor()
        if self.tokens[0].tipo == "OPPOW":
            self.matchToken(self.tokens[0].tipo)
            powerTerm = self.power_term()
            return InternNode("powerTerm", oper="^", esq=factor, dir=powerTerm)
        return factor

    #Regra: <fator> ::= ID | INTEGER | <boolean> | '+' <factor> | '-' <factor> | NAO <boolean> | LPAR <expression> RPAR
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
            return InternNode("factor", sinal=sinal, esq=None, dir=None, factor=LeafNode("int", intValue, intLine))
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

    #Regra: <boolean> ::= 'verdade' | 'falso'
    def boolean(self):
        boolValue = self.tokens[0].valor
        boolLine = self.tokens[0].linha
        self.matchToken("BOOLEAN")
        return LeafNode("log", value=boolValue, line=boolLine)
    

from ClassesAuxiliares import SemanticException, Table

class AnalisadorSemantico:
    def __init__(self, tree):
        self.tree = tree
        self.table = {}

    def program(self):
        self.table[self.tree.get("string").value] = Table(None, "program")
        self.block(self.tree.get("block"))

    def block(self, block):
        statementList = block.get("statementList")
        
        while statementList != None:
            statement = statementList.get("statement")

            if statement.op == "assignStatement":
                id = statement.get("id")

                if id.value not in self.table:
                    raise SemanticException(f"O identificador {id.value} na linha {id.line} não foi declarado")
                
                if statement.get("inputStatement"):
                    inputStatement = self.inputStatement(statement.get("inputStatement"))
                elif statement.get("expression"):
                    expression = self.expression(statement.get("expression"))

                    if expression.type != self.table[id.value].type:
                        raise SemanticException(f"O identificador {id.value} na linha {id.line} não pode receber uma expressão do tipo {expression.type}")
                
                    self.table[id.value].value = expression.value
            if statement.op == "ifStatement":
                self.block(statement.get("ifBlock"))
                
                if statement.get("elseBlock"):
                    self.block(statement.get("elseBlock"))
            if statement.op == "whileStatement":
                expression = self.expression(statement.get("expression"))
                self.block(statement.get("block"))
            if statement.op == "commandStatement":
                if statement.get("sumExpression"):
                    self.sum_expression(statement.get("sumExpression"))
                else:
                    self.sum_expression(statement.get("esq"))
                    pass
                
    
    def expression():
        pass

    
    def atribution(self):
        self.tree
        
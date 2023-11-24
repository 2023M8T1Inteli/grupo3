from ClassesAuxiliares import SemanticException, Table

class AnalisadorSemantico:
    def __init__(self, tree):
        self.tree = tree
        self.table = {}

    def program(self):
        self.table[self.tree.getNode("string").value] = Table(None, "program")
        self.block(self.tree.getNode("block"))

    def block(self, block):
        statementList = block.getNode("statementList")
        
        while statementList != None:
            statement = statementList.getNode("statement")

            if statement.op == "assignStatement":
                id = statement.getNode("id")
                self.expression(id, statement.getNode("expression"))
            
            statementList = statementList.getNode("prox")
                
    def expression(self, id, expression):
        if id.value not in self.table:
            self.table[id.value] = Table(None, "integer")

            esq = expression.getNode("esq")
            idValue = esq.getNode("factor")

            if idValue.op == "id":
                if idValue.value not in self.table:
                    raise SemanticException(f"O identificador {idValue.value} na linha {idValue.line} não foi declarado")
                else:
                    self.table[id.value].value = self.table[idValue.value].value
            elif idValue.op == "int":
                self.table[id.value].value = idValue.value
        pass

    def atribution(self):
        self.tree
        
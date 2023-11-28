from ClassesAuxiliares import SemanticException, Table

class AnalisadorSemantico:
    def __init__(self, tree):
        self.tree = tree
        self.table = {}

    def program(self):
        self.table[self.tree.getNode("string").value] = Table(None, "program")
        self.block(self.tree.getNode("block"))
        # print(self.table)

    def block(self, block):
        statementList = block.getNode("statementList")
        
        while statementList != None:
            statement = statementList.getNode("statement")

            if statement.op == "assignStatement":
                if statement.getNode("inputStatement") != None:
                    id = statement.getNode("id")
                    self.inputStatement(id, statement.getNode("inputStatement"))
                elif statement.getNode("expression") != None:
                    id = statement.getNode("id")
                    self.expression(id, statement.getNode("expression"))
            if statement.op == "commandStatement":
                self.sumExpression(statement.getNode("command").value, statement.getNode("sumExpression"))
            
            statementList = statementList.getNode("prox")
    
    def inputStatement(self, id, inputStatement):
        command = inputStatement.getNode("command").value

        if id.value not in self.table:
            self.table[id.value] = Table(None, "")
        
        if command == "ler":
            self.table[id.value].type = "int"
        elif command == "ler_varios":
            esq = inputStatement.getNode("esq").getNode("factor")
            mid = inputStatement.getNode("mid").getNode("factor")
            dir = inputStatement.getNode("dir").getNode("factor")

            line = dir.line

            if esq.op == "id":
                if esq.value not in self.table:
                    raise SemanticException(f"O identificador {esq.value} na linha {line} não foi declarado")
                elif self.table[esq.value].type != "int":
                    raise SemanticException(f"A função {command} na linha {line} só pode receber inteiro")
            elif esq.op != "int":
                raise SemanticException(f"A função {command} na linha {line} só pode receber inteiro")

            if dir.op == "id":
                if dir.value not in self.table:
                    raise SemanticException(f"O identificador {dir.value} na linha {line} não foi declarado")
                elif self.table[dir.value].type != "int":
                    raise SemanticException(f"A função {command} na linha {line} só pode receber inteiro")
            elif dir.op != "int":
                raise SemanticException(f"A função {command} na linha {line} só pode receber inteiro")
            

            if mid.op == "id":
                if mid.value not in self.table:
                    raise SemanticException(f"O identificador {mid.value} na linha {line} não foi declarado")
                elif self.table[mid.value].type != "int":
                    raise SemanticException(f"A função {command.value} na linha {line} só pode receber inteiro")
            elif mid.op != "int":
                raise SemanticException(f"A função {command.value} na linha {line} só pode receber inteiro")

            self.table[id.value].type = "log"
                
    def expression(self, id, expression):
        esq = expression.getNode("esq")
        idValue = esq.getNode("factor")

        if id.value not in self.table:
            self.table[id.value] = Table(None, "")

            if idValue.op == "id":
                if idValue.value not in self.table:
                    raise SemanticException(f"O identificador {idValue.value} na linha {idValue.line} não foi declarado")
                else:
                    self.table[id.value].value = self.table[idValue.value].value
                    self.table[id.value].type = self.table[idValue.value].type
            elif idValue.op == "int":
                self.table[id.value].type = "int"
                self.table[id.value].value = idValue.value

            pass
        else:
            if idValue.op == "id":
                if idValue.value not in self.table:
                    raise SemanticException(f"O identificador {idValue.value} na linha {idValue.line} não foi declarado")
                else:
                    self.table[id.value].value = self.table[idValue.value].value
            elif idValue.op == "int":
                self.table[id.value].type = "int"
                self.table[id.value].value = idValue.value

    def sumExpression(self, command, node):
        if command == "mostrar":
            if node.getNode("factor").op == "id":
                if node.getNode("factor").value not in self.table:
                    raise SemanticException(f"O identificador {node.getNode('factor').value} na linha {node.getNode('factor').line} não foi declarado")
                elif self.table[node.getNode("factor").value].type != "int":
                    raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            elif node.getNode("factor").op != "int":
                raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")  

    def atribution(self):
        self.tree
        
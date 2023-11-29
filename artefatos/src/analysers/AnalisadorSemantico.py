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
                self.sumExpression(statement.getNode("command").value, statement)
            
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
        
        if esq.op == "powerTerm":
            factor = esq.getNode("esq").getNode("factor")
            dir = esq.getNode("dir").getNode("factor")

            if factor.op == "id":
                if factor.value not in self.table:
                    raise SemanticException(f"O identificador {factor.value} na linha {factor.line} não foi declarado")
                elif self.table[factor.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif factor.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            
            if dir.op == "id":
                if dir.value not in self.table:
                    raise SemanticException(f"O identificador {dir.value} na linha {dir.line} não foi declarado")
                elif self.table[dir.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif dir.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
        elif esq.op == "multTerm":
            factor = esq.getNode("esq").getNode("factor")
            dir = esq.getNode("dir").getNode("factor")

            if esq.getNode("oper") == "/" or esq.getNode("oper") == "%":
                print(dir.value)
                if dir.value == 0:
                    raise SemanticException(f"Erro na linha {dir.line}, não é possível realizar divisão por zero")

            if factor.op == "id":
                if factor.value not in self.table:
                    raise SemanticException(f"O identificador {factor.value} na linha {factor.line} não foi declarado")
                elif self.table[factor.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif factor.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            
            if dir.op == "id":
                if dir.value not in self.table:
                    raise SemanticException(f"O identificador {dir.value} na linha {dir.line} não foi declarado")
                elif self.table[dir.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif dir.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
        elif esq.op == "sumExpression":
            factor = esq.getNode("esq").getNode("factor")
            dir = esq.getNode("dir").getNode("factor")

            if factor.op == "id":
                if factor.value not in self.table:
                    raise SemanticException(f"O identificador {factor.value} na linha {factor.line} não foi declarado")
                elif self.table[factor.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif factor.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            
            if dir.op == "id":
                if dir.value not in self.table:
                    raise SemanticException(f"O identificador {dir.value} na linha {dir.line} não foi declarado")
                elif self.table[dir.value].type != "int":
                    raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
            elif dir.op != "int":
                raise SemanticException(f"Erro na linha {factor.line}, só é possível efetuar essa operação com inteiros")
        elif esq.op == "factor":
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

    def sumExpression(self, command, statement):
        if command in ["mostrar", "tocar", "esperar"]:
            node = statement.getNode("sumExpression")
            factor = node.getNode("factor")
            if factor.op == "id":
                if factor.value not in self.table:
                    raise SemanticException(f"O identificador {node.getNode('factor').value} na linha {node.getNode('factor').line} não foi declarado")
                elif self.table[factor.value].type != "int":
                    raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            elif factor.op != "int":
                raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            
        if command == "mostrar_tocar":
            esq = statement.getNode("esq").getNode("factor")
            if esq.op == "id":
                if esq.value not in self.table:
                    raise SemanticException(f"O identificador {esq.value} na linha {esq.line} não foi declarado")
                elif self.table[esq.value].type != "int":
                    raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            elif esq.op != "int":
                print(esq.op)
                raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            
            dir = statement.getNode("dir").getNode("factor")
            if dir.op == "id":
                if dir.value not in self.table:
                    raise SemanticException(f"O identificador {dir.value} na linha {dir.line} não foi declarado")
                elif self.table[dir.value].type != "int":
                    raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")
            elif dir.op != "int":
                raise SemanticException(f"A função {command} na linha {node.line} só pode receber inteiro")

    def atribution(self):
        self.tree
        
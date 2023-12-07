from ClassesAuxiliares import InternNode , LeafNode 

class GeradorDeCodigo:

    def __init__(self, tree):
        self.tree = tree
        self.pythonString = ""
        self.currentT = ""

    def generateCode(self):
        self.pythonString += "def " + self.tree.getNode("string").value + ":\n"
        self.currentT += "\t"
        self.block(self.tree.getNode("block"))
        return self.pythonString
    
    def block(self, block):
        statementList = block.getNode("statementList")
        
        while statementList:
            statement = statementList.getNode("statement")
            if statement.op == "whileStatement":
                self.pythonString += self.currentT
                self.pythonString += "while "
                self.expression(statement.getNode("expression"))
                self.pythonString += ":\n"
                self.currentT += "\t"
                self.pythonString += self.currentT
                self.block(statement.getNode("block"))
                self.currentT = self.currentT[:-1]
            if statement.op == "ifStatement":
                self.pythonString += self.currentT
                self.pythonString += "if "
                self.expression(statement.getNode("expression"))
                self.pythonString += ":\n"
                self.currentT += "\t"
                self.block(statement.getNode("ifBlock"))
                self.currentT = self.currentT[:-1]
                if statement.getNode("elseBlock"):
                    self.pythonString += self.currentT
                    self.pythonString += "else:\n"
                    self.currentT += "\t"
                    self.block(statement.getNode("elseBlock"))
                    self.currentT = self.currentT[:-1]
            if statement.op == "assignStatement":
                    self.assignStatement(statement)
            if statement.op == "commandStatement":
                self.commandStatement(statement)

            statementList = statementList.getNode("prox")

    def expression(self, expression):
        if expression:
            if expression.op == "factor":
                if expression.getNode("factor").op in ["int", "id"]:
                    self.pythonString += str(expression.getNode("factor").value)
                elif expression.getNode("esq"):
                    esq = expression.getNode("esq")
                    self.expression(esq.getNode("factor"))
            elif expression.op == "expression":
                esq = expression.getNode("esq")
                dir = expression.getNode("dir")
                if dir:
                    self.expression(esq)
                    self.pythonString += " " + expression.getNode("oper") + " "
                    self.expression(dir)
                else:
                    self.expression(esq.getNode("factor"))

    def assignStatement(self, statement):
        esq = statement.getNode("esq")
        dir = statement.getNode("dir")
        if statement.getNode("inputStatement"):
            self.pythonString += self.currentT
            self.pythonString += statement.getNode("id").value + " = "
            self.inputStatement(statement.getNode("inputStatement"))
        elif statement.getNode("expression"):
            esq = statement.getNode("expression").getNode("esq")
            dir = statement.getNode("expression").getNode("dir")
            self.pythonString += self.currentT
            self.pythonString += statement.getNode("id").value + " = "
            if esq.op == "factor":
                self.pythonString += str(esq.getNode("factor").value)
            elif esq.op == "sumExpression":
                self.assignStatement(esq)
                if dir:
                    self.assignStatement(dir)
            self.pythonString += "\n"
        elif statement.op == "sumExpression":
            if esq.op == "factor":
                self.pythonString += str(esq.getNode("factor").value) + " "
                self.pythonString += str(statement.getNode("oper")) + " "
            if dir.op == "factor":
                self.pythonString += str(dir.getNode("factor").value)
            if dir:
                self.assignStatement(dir)

    def inputStatement(self, inputStatement):
        command = inputStatement.getNode("command")
        if command.value in ["ler"]:
            self.pythonString += command.value + "()\n"
        elif command.value in ["ler_varios"]:
            esq = inputStatement.getNode("esq").getNode("factor").value
            mid = inputStatement.getNode("mid").getNode("factor").value
            dir = inputStatement.getNode("dir").getNode("factor").value
            self.pythonString += command.value + "(" + str(esq) + ", " + str(mid) + ", " + str(dir) +")\n"

    def commandStatement(self, commandStatement):
        command = commandStatement.getNode("command")
        if command.value in ["mostrar", "tocar", "esperar"]:
            self.pythonString += self.currentT
            self.pythonString += commandStatement.getNode("command").value + "("
            self.expression(commandStatement.getNode("sumExpression"))
            self.pythonString += ")\n"
        elif command.value in ["mostrar_tocar"]:
            self.pythonString += self.currentT
            if commandStatement.getNode("esq").getNode("factor"):
                esq = commandStatement.getNode("esq").getNode("factor").value
                dir = commandStatement.getNode("dir").getNode("factor").value
                self.pythonString += command.value + "(" + str(esq) + ", " + str(dir) +")\n"
            elif commandStatement.getNode("esq").op == "sumExpression":
                pass
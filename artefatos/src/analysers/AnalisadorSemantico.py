from ClassesAuxiliares import SemanticException

class AnalisadorSemantico:
    def __init__(self, tree):
        self.tree = tree
        self.currentNode = tree
        self.variables = {}

    def verifyVariables(self, x, y):
        if x != y:
            raise SemanticException("Símbolo inválido: " + self.code[i] + " na linha " + str(actualLine) + ".")
        
    def program(self):
        self.currentNode = self.currentNode.getNode("block").getNode("statementList")
        self.statement()

    def statement(self):
        if self.currentNode.getNode("statement"):
            self.currentNode = self.currentNode.getNode("statement")
        if self.currentNode.getNode("if_statement"):
            self.currentNode = self.currentNode.getNode("if_statement")
        if self.currentNode.getNode("while_statement"):
            self.currentNode = self.currentNode.getNode("while_statement")
        if self.currentNode.getNode("command_statement"):
            self.currentNode = self.currentNode.getNode("command_statement")
            
        if self.currentNode.value
        if self.currentNode.getNode("prox") != None:
            self.statementList()

    def expression(self):
        self.currentNode = self.currentNode.getNode("statementList")
        if self.currentNode.getNode("prox") != None:
            self.statementList()
    
    def atribution(self):
        self.tree
        
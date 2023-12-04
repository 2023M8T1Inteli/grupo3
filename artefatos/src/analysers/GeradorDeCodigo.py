from ClassesAuxiliares import InternNode , LeafNode 

class GeradorDeCodigo:

    def __init__(self, tree):
        self.tree = tree
        self.pythonString = ""

    def generateCode(self):
        self.pythonString += "def " + self.tree.getNode("string") +":\n"
        self.block(self.tree.get("block"))
        
        return self.generateCode(self.tree)
    
    def block(self, block):
        self.statmentList(block.getNode("statmentList"))


    def statmentList(self, statmentList):
        self.statment(statmentList.getNode("statment"))
        if statmentList.getNode("prox"):
            self.statment(statmentList.getNode("prox"))

    def statement(self, statement):
        if statement.op == "assignStatement":
            if statement.getNode("inputStatement"):
                pass
            elif statement.getNode("expression"):
                pass
        elif statement.op == "commandStatement":
                pass
        
    def inputStatement(self, id , inputStatement):
        dir = inputStatement.getNode("dir")
        dirString =""
        dirString += dir.value
        while inputStatement.getNode("prox"):
            dir = dir.getNode("prox")
            dirString += dir.oper + " " + dir.value

        self.pythonString += inputStatement.getNode("esq").value + " " + inputStatement.getNode("oper") + " " + dirString + "\n"

    def expression(self, expression):
        pass

    def commandStatement(self, commandStatement):
        pass










            
        

    






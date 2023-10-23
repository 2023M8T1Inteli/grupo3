import re

class Token:
    def __init__(self, tipo, valor, linha):
        self.tipo = tipo
        self.valor = valor
        self.linha = linha
    def __repr__(self):
        return f"({self.tipo} {self.valor} {self.linha})"

test = "a = 1\nb = 12\nc = (12+3)"

def equal_token(token, tokenName, line):
    return Token(token, tokenName, line)   

def variable_token(variableName, line):
    return Token("ID", variableName, line)

def analisador_lexico(codigo):
    actualLine = 1;
    token = []
    actualWord = "";
    possibilities = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao", "inicio", "fim", "verdade", "falso", "ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar", "ou", "e"]

    for i in range(0, len(codigo)):
        if codigo[i] != "\n" and codigo[i] != "\t":
            if codigo[i] == " ":
                if len(actualWord) > 0:
                    if actualWord in possibilities:
                        print()
                    else:
                        token.append(variable_token(actualWord, actualLine))
                        actualWord = "";

            if re.search("[_a-zA-Z][_a-zA-Z0-9]*", codigo[i]) != None:
                actualWord += codigo[i]
            elif codigo[i] == "=" and codigo[i - 1] != "=":
                if codigo[i+1] == "=":
                    token.append(equal_token("OPREL", "==", actualLine))
                else:
                    token.append(equal_token("ASSIGN", "=", actualLine))

        elif codigo[i] == "\n":
            actualLine += 1
    
    print(token)
            
                
        
analisador_lexico(test);
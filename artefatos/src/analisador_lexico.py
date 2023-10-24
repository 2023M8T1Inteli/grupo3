import re

class Token:
    def __init__(self, tipo, valor, linha):
        self.tipo = tipo
        self.valor = valor
        self.linha = linha
    def __repr__(self):
        return f"({self.tipo} {self.valor} {self.linha})"

# test = "a = 1\nb = 12\nc = (12+3)"
test = "programa :\ninicio\nprogramas = verdade\nverdades = 0\nse entao inicio\nses = verdades\nprogramas = ler()\nx = ler_varios(11, 4, 1)\nfim\n\nfim."

def variable_token(variableName, line):
    return Token("ID", variableName, line)

def reserved_words_token(word, line):
    comandoWords = ["ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar"]
    booleanWords = ["verdade", "falso"]
    sameWords = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao"]

    if word in comandoWords:
        return Token("COMANDO", word, line)
    elif word in booleanWords:
        return Token("BOOLEAN", word, line)
    elif word in sameWords:
        return Token(word.upper(), word, line)
    elif word == "inicio":
        return Token("LBLOCK", word, line)
    elif word == "fim":
        return Token("RBLOCK", word, line)
    elif word == "e":
        return Token("OPMUL", word, line)
    elif word == "ou":
        return Token("OPSUM", word, line)

def analisador_lexico(codigo):
    actualLine = 1
    token = []
    actualWord = ""
    possibilities = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao", "inicio", "fim", "verdade", "falso", "ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar", "ou", "e"]

    for i in range(0, len(codigo)):
        if codigo[i] != "\t":
            if codigo[i] == " " or codigo[i] == "\n" or i == len(codigo) - 1:
                if len(actualWord) > 0:
                    if actualWord in possibilities:
                        token.append(reserved_words_token(actualWord, actualLine))

                        actualWord = ""
                    else:
                        token.append(variable_token(actualWord, actualLine))
                        actualWord = ""

            if re.search("[_a-zA-Z][_a-zA-Z0-9]*", codigo[i]) != None:
                actualWord += codigo[i]
            elif codigo[i] == "=" and codigo[i - 1] != "=":
                if codigo[i+1] == "=":
                    token.append(Token("OPREL", "==", actualLine))
                else:
                    token.append(Token("ASSIGN", "=", actualLine))
        if codigo[i] == "\n":
                actualLine += 1

    token.append(Token("EOF", "EOF", actualLine))
    print(token)
            
                
        
analisador_lexico(test);
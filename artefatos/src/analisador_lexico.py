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

def reserved_symbols(symbol, line):
    type_symbols = {
        ":": "COLON",
        ",": "COMMA",
        ".": "DOT",
        "\"": "DQUOTE",
        "=": "ASSIGN",
        "(": "LPAR",
        ")": "RPAR",
        "==": "OPREL",
        "<>": "OPREL",
        "<": "OPREL",
        "<=": "OPREL",
        ">": "OPREL",
        ">=": "OPREL",
        "+": "OPSUM",
        "-": "OPSUM",
        "*": "OPMUL",
        "/": "OPMUL",
        "%": "OPMUL",
        "^": "OPPOW"        
    }
    return Token(type_symbols[symbol], symbol, line)

def analisador_lexico(code):
    actualLine = 1
    token = []
    isString = -1 
    actualWord = ""
    actualNumber = ""
    possibilities_reserved = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao", "inicio", "fim", "verdade", "falso", "ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar", "ou", "e"]

    for i in range(0, len(code)):
        if re.search("[\w\s\n\t=<>+\-*/%^:,\"().]+", code[i]) != None:
            if isString == -1:
                if code[i] == " " or code[i] == "\n" or i == len(code) - 1 or code[i] == "(" or code[i] == "," or code[i] == ")":
                    if len(actualWord) > 0:
                        if actualWord in possibilities_reserved:
                            token.append(reserved_words_token(actualWord, actualLine))

                            actualWord = ""
                        else:
                            token.append(variable_token(actualWord, actualLine))
                            actualWord = ""
                    
                    if len(actualNumber) > 0:
                        token.append(Token("INTEGER", int(actualNumber), actualLine))

                        actualNumber = ""

            if isString == 1:
                if (code[i] == "\""):
                    token.append(Token("STRING", actualWord, actualLine))
                    actualWord = ""
                    isString = -1
                    token.append(reserved_symbols(code[i], actualLine))
                else:
                    actualWord += code[i]
            elif re.search("[_a-zA-Z][_a-zA-Z0-9]*", code[i]) != None:
                actualWord += code[i]
            elif code[i] == "=" and code[i-1] != "=" and code[i-1] != "<" and code[i-1] != ">":
                if code[i+1] == "=":
                    token.append(reserved_symbols("==", actualLine))
                else:
                    token.append(reserved_symbols("=", actualLine))
            elif code[i] == "<":
                if code[i+1] == ">":
                    token.append(reserved_symbols("<>", actualLine))
                elif code[i+1] == "=":
                    token.append(reserved_symbols("<=", actualLine))
                else:
                    token.append(reserved_symbols("<", actualLine))
            elif code[i] == ">" and code[i-1] != "<":
                if code[i+1] == "=":
                    token.append(reserved_symbols(">=", actualLine))
                else:
                    token.append(reserved_symbols(">"))
            elif re.search("[0-9]+", code[i]) != None:
                actualNumber += code[i]
            elif code[i] not in " \n\t\r":
                if (code[i] == "\""):
                    isString = 1
                token.append(reserved_symbols(code[i], actualLine))
        else:
            print("Caracter invalido")
    
        if code[i] == "\n":
                actualLine += 1

    token.append(Token("EOF", "EOF", actualLine))
    print(token)
            
                
        
analisador_lexico(test)
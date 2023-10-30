import os
import re

# Classe Token para representar os tokens encontrados no código.
class Token:
    def __init__(self, tipo, valor, linha):
        self.tipo = tipo
        self.valor = valor
        self.linha = linha

    def __repr__(self):
        return f"({self.tipo} {self.valor} {self.linha})"

# Classe de exceção personalizada para erros léxicos.
class LexicalException(Exception):
    pass

# Função para ler um arquivo a partir de um nome de arquivo.
def read_file(file_name):
    path = f"./artefatos/src/test_file/{file_name}"
    if os.path.exists(path):
        content = ""
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        return content
    else:
        raise Exception(f"File {path} not found")

# Função para criar um token de variável.
def variable_token(variableName, line):
    return Token("ID", variableName, line)

# Função para criar tokens de palavras reservadas.
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

# Função para criar tokens de símbolos reservados.
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

# Função principal do analisador léxico.
def analisador_lexico(code):
    i = 0
    actualLine = 1
    token = []
    isString = False
    actualWord = ""
    actualNumber = ""
    possibilities_reserved = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao", "inicio", "fim", "verdade", "falso", "ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar", "ou", "e"]

    # Percorre o código caractere por caractere.
    while i < len(code):
        # Verifica se o caractere atual é um caractere válido.
        if re.search("[\w\s\n\t=<>+\-*/%^:,\"().]+", code[i]) != None:
            if isString:
                if (code[i] == "\""):
                    token.append(Token("STRING", actualWord, actualLine))
                    actualWord = ""
                    isString = False
                    token.append(reserved_symbols(code[i], actualLine))
                else:
                    actualWord += code[i]
            else:
                if re.search("[_a-zA-Z][_a-zA-Z0-9]*", code[i]) != None:
                    pos = i
                    while re.search("[_a-zA-Z][_a-zA-Z0-9]*", code[pos]) != None:
                        actualWord += code[pos]
                        pos += 1
                        if pos == len(code):
                            break
                    if len(actualWord) > 0:
                        if actualWord in possibilities_reserved:
                            token.append(reserved_words_token(actualWord, actualLine))
                        else:
                            token.append(variable_token(actualWord, actualLine))
                        actualWord = ""
                        i  = pos -1
                elif code[i] == "=":
                    if code[i+1] == "=":
                        token.append(reserved_symbols("==", actualLine))
                        i += 1
                    else:
                        token.append(reserved_symbols("=", actualLine))
                elif code[i] == "<":
                    if code[i+1] == ">":
                        token.append(reserved_symbols("<>", actualLine))
                        i += 1
                    elif code[i+1] == "=":
                        token.append(reserved_symbols("<=", actualLine))
                        i += 1
                    else:
                        token.append(reserved_symbols("<", actualLine))
                elif code[i] == ">":
                    if code[i+1] == "=":
                        token.append(reserved_symbols(">=", actualLine))
                        i += 1
                    else:
                        token.append(reserved_symbols(">", actualLine))
                elif re.search("[0-9]+", code[i]) != None:
                    pos = i
                    while re.search("[0-9]+", code[pos]) != None:
                        actualNumber += code[pos]
                        pos += 1
                        if pos == len(code):
                            break
                    if len(actualNumber) > 0:
                        token.append(Token("INTEGER", int(actualNumber), actualLine))
                        actualNumber = ""
                        i = pos-1
                elif code[i] not in " \n\t\r":
                    if (code[i] == "\""):
                        isString = True
                    token.append(reserved_symbols(code[i], actualLine))
        else:
            raise LexicalException("Símbolo inválido: " + code[i] + " na linha " + str(actualLine) + ".")

        if code[i] == "\n":
            actualLine += 1
        i += 1
    token.append(Token("EOF", "EOF", actualLine))
    print(token)

# Exemplo de uso do analisador léxico.
analisador_lexico(read_file("exemplo5.txt"))

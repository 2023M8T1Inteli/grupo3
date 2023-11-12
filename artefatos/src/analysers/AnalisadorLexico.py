import re
from ClassesAuxiliares import Token, LexicalException
    
class AnalisadorLexico:
    code = ""

    def __init__(self, code):
        self.code = code

    # Função para criar um token de variável.
    def variable_token(self, variableName, line):
        return Token("ID", variableName, line)

    # Função para criar tokens de palavras reservadas.
    def reserved_words_token(self, word, line):
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
    def reserved_symbols(self, symbol, line):
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
    def getTokens(self):
        i = 0
        actualLine = 1
        tokens = []
        isString = False
        actualWord = ""
        actualNumber = ""
        possibilities_reserved = ["programa", "se", "entao", "senao", "enquanto", "faca", "nao", "inicio", "fim", "verdade", "falso", "ler", "ler_varios", "mostrar", "tocar", "mostrar_tocar", "esperar", "ou", "e"]
        isShortComment = False
        isLongerComment = False

        # Percorre o código caractere por caractere.
        while i < len(self.code):
            # Verifica se o caractere atual é um caractere válido.
            if re.search("[\w\s\n\t=<>+\-*/%^:,\"().]+", self.code[i]) != None:
                if isString:
                    if (self.code[i] == "\""):
                        tokens.append(Token("STRING", actualWord, actualLine))
                        actualWord = ""
                        isString = False
                        tokens.append(self.reserved_symbols(self.code[i], actualLine))
                    else:
                        actualWord += self.code[i]
                else:
                    if isShortComment:
                        if self.code[i] == "\n":
                            isShortComment = False
                            continue
                    elif isLongerComment:
                        if self.code[i] == "*" and self.code[i + 1] == "/":
                            isLongerComment = False
                            i += 2
                            continue
                    else:
                        if self.code[i] == "/" and self.code[i + 1] == "/":
                            isShortComment = True;
                            i += 2
                            continue

                        elif self.code[i] == "/" and self.code[i + 1] == "*":
                            isLongerComment = True;
                            i += 2
                            continue

                        if re.search("[_a-zA-Z][_a-zA-Z0-9]*", self.code[i]) != None:
                            pos = i
                            while re.search("[_a-zA-Z][_a-zA-Z0-9]*", self.code[pos]) != None or self.code[pos].isnumeric():
                                actualWord += self.code[pos]
                                pos += 1
                                if pos == len(self.code):
                                    break
                            if len(actualWord) > 0:
                                if actualWord in possibilities_reserved:
                                    tokens.append(self.reserved_words_token(actualWord, actualLine))
                                else:
                                    tokens.append(self.variable_token(actualWord, actualLine))
                                actualWord = ""
                                i  = pos -1
                        elif self.code[i] == "=":
                            if self.code[i+1] == "=":
                                tokens.append(self.reserved_symbols("==", actualLine))
                                i += 1
                            else:
                                tokens.append(self.reserved_symbols("=", actualLine))
                        elif self.code[i] == "<":
                            if self.code[i+1] == ">":
                                tokens.append(self.reserved_symbols("<>", actualLine))
                                i += 1
                            elif self.code[i+1] == "=":
                                tokens.append(self.reserved_symbols("<=", actualLine))
                                i += 1
                            else:
                                tokens.append(self.reserved_symbols("<", actualLine))
                        elif self.code[i] == ">":
                            if self.code[i+1] == "=":
                                tokens.append(self.reserved_symbols(">=", actualLine))
                                i += 1
                            else:
                                tokens.append(self.reserved_symbols(">", actualLine))
                        elif re.search("[0-9]+", self.code[i]) != None:
                            pos = i
                            while re.search("[0-9]+", self.code[pos]) != None:
                                actualNumber += self.code[pos]
                                pos += 1
                                if pos == len(self.code):
                                    break
                            if len(actualNumber) > 0:
                                tokens.append(Token("INTEGER", int(actualNumber), actualLine))
                                actualNumber = ""
                                i = pos-1
                        elif self.code[i] not in " \n\t\r":
                            if (self.code[i] == "\""):
                                isString = True
                            tokens.append(self.reserved_symbols(self.code[i], actualLine))
            else:
                raise LexicalException("Símbolo inválido: " + self.code[i] + " na linha " + str(actualLine) + ".")

            if self.code[i] == "\n":
                actualLine += 1
            i += 1
        tokens.append(Token("EOF", "EOF", actualLine))
        return tokens
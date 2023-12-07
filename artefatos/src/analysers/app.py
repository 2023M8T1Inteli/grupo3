from AnalisadorLexico import AnalisadorLexico
from AnalisadorSintatico import AnalisadorSintatico
from AnalisadorSemantico import AnalisadorSemantico
from GeradorDeCodigo import GeradorDeCodigo
import os

# Função para ler um arquivo a partir de um nome de arquivo.
def read_file(file_name):
    path = f"./{file_name}"
    if os.path.exists(path):
        content = ""
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        return content
    else:
        raise Exception(f"File {path} not found")
    
if __name__ == "__main__":
    # code = read_file("programa.txt")
    code = read_file("test_file/exemploGerador1.txt")
    tokens = AnalisadorLexico(code).getTokens()
    tree = AnalisadorSintatico(tokens).program()
    AnalisadorSemantico(tree).program()
    print(tree)
    print("\n\n\n")
    print(GeradorDeCodigo(tree).generateCode())
    string = GeradorDeCodigo(tree).generateCode()
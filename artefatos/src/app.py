from AnalisadorLexico import AnalisadorLexico
from AnalisadorSintatico import AnalisadorSintatico
import os

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
    
if __name__ == "__main__":
    code = read_file("exemplo1.txt")
    tokens = AnalisadorLexico(code).getTokens()
    print(AnalisadorSintatico(tokens).program())

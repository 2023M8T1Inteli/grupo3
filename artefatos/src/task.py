import pygame
from funcoesAuxiliares import ler, mostrar_tocar_feedback

def tarefa1():
	erros = 0
	acertos = 0
	quadranteEsperado = 13
	quadrantePressionado = ler()
	while (quadrantePressionado != quadranteEsperado):
		mostrar_tocar_feedback(0, 1, 0)
		erros = erros + 1 
		quadrantePressionado = ler()
	acertos = acertos + 1 
	mostrar_tocar_feedback(0, 0, 1)
	quadranteEsperado = 24
	quadrantePressionado = ler()
	while (quadrantePressionado != quadranteEsperado):
		mostrar_tocar_feedback(0, 1, 0)
		erros = erros + 1 
		quadrantePressionado = ler()
	acertos = acertos + 1 
	mostrar_tocar_feedback(0, 0, 1)
	run = True
	while run:
		display.fill((255, 255, 255))
		txtsurf = pygame.font.SysFont("Arial", 70).render('PARABENS! VOCE FINALIZOU A TAREFA.', True, (0, 0, 0))
		display.blit(txtsurf, (640 - (txtsurf.get_size()[0] / 2), 360 - (txtsurf.get_size()[1] / 2)))
		pygame.display.update()
		pygame.time.wait(3000)
		run = False

	print("Errors: " + str(erros) + ", Success: " + str(acertos))
pygame.init()
pygame.display.set_caption('Image') 
display = pygame.display.set_mode((1280, 720))
display.fill((255, 255, 255))

tarefa1()
pygame.quit()


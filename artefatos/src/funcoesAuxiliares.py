import pygame
import os

def ler():
	input = False
	while not input:
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				pygame.quit()
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_UP:
					return 13
				if event.key == pygame.K_DOWN:
					return 24
				if event.key == pygame.K_LEFT:
					return 21
				if event.key == pygame.K_RIGHT:
					return 25
				if event.key == pygame.K_SPACE:
					return 16
				
def mostrar_tocar_feedback(tocar, mostrar, feedback):
	display = pygame.display.set_mode((1280, 720))
	display.fill((255, 255, 255))
	font = pygame.font.SysFont("Arial", 70)
	absolute_path = os.path.dirname(__file__)
	sounds = []
	images = []
	txtsurf = font.render("", True, (255, 255, 255))
	if feedback == 1:
		if tocar != -1:
			sounds = os.listdir(absolute_path + "/ide_electron/main/Feedback/SuccessFeedback/sounds")
			pygame.mixer.music.load(absolute_path + "/ide_electron/main/Feedback/SuccessFeedback/sounds/" + sounds[tocar])
		images = os.listdir(absolute_path + "/ide_electron/main/Feedback/SuccessFeedback/images")
		image = pygame.image.load(absolute_path + "/ide_electron/main/Feedback/SuccessFeedback/images/" + images[mostrar])
		with open(absolute_path + "/ide_electron/main/Feedback/SuccessFeedback/message.txt") as f:
			lines = f.readlines()
		rgb_values_str = lines[1].replace("rgb", "").replace("(", "").replace(")", "")
		rgb_values = tuple(map(int, rgb_values_str.split(',')))
		txtsurf = font.render(lines[0].replace("\n", ""), True, rgb_values)
	else:
		if tocar != -1:
			sounds = os.listdir(absolute_path + "/ide_electron/main/Feedback/ErrorFeedback/sounds")
			pygame.mixer.music.load(absolute_path + "/ide_electron/main/Feedback/ErrorFeedback/sounds/" + sounds[tocar])
		images = os.listdir(absolute_path + "/ide_electron/main/Feedback/ErrorFeedback/images")
		image = pygame.image.load(absolute_path + "/ide_electron/main/Feedback/ErrorFeedback/images/" + images[mostrar])
		with open(absolute_path + "/ide_electron/main/Feedback/ErrorFeedback/message.txt") as f:
			lines = f.readlines()
		rgb_values_str = lines[1].replace("rgb", "").replace("(", "").replace(")", "")
		rgb_values = tuple(map(int, rgb_values_str.split(',')))
		txtsurf = font.render(lines[0].replace("\n", ""), True, rgb_values)
	if len(sounds) > 0:
		pygame.mixer.music.play()
	display.blit(txtsurf, (640 - (txtsurf.get_size()[0] / 2), 90 - (txtsurf.get_size()[1] / 2)))
	display.blit(image, (640 - (image.get_size()[0] / 2), 360 - (image.get_size()[1] / 2)))
	pygame.display.update()
	pygame.time.wait(3000)
	display.fill((255, 255, 255))
	if feedback == 1:
		txtsurf = font.render('Vamos para o proximo quadrante!', True, (0, 0, 0))
	else:
		txtsurf = font.render('Tente novamente!', True, (0, 0, 0))
	display.blit(txtsurf, (640 - (txtsurf.get_size()[0] / 2), 360 - (txtsurf.get_size()[1] / 2)))
	pygame.display.update()
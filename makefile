PAR := $(MAKE) -j 128
DOCKER_NAME := recipes
DOCKER_TAG := recipes

watch:
	${PAR} deno-w sass-w

deno-w:
	deno run -A --watch server.ts

sass-w:
	sass -w styles/main.scss public/styles/main.css

docker-restart: docker-stop docker-run

docker-stop:
	docker rm ${DOCKER_NAME} --force

docker-run:
	docker run -d --restart always -p 30000:30000 --name ${DOCKER_NAME} ${DOCKER_TAG}

docker-build:
	docker build -t ${DOCKER_TAG} .

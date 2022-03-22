PAR := $(MAKE) -j 128
DOCKER_NAME := pleshevski
DOCKER_TAG := pleshevski


watch:
	$(PAR) hr ts-w

docker-restart: docker-stop docker-run

docker-stop:
	docker rm ${DOCKER_NAME} --force

docker-run:
	docker run -d --restart always -p 30000:30000 --name ${DOCKER_NAME} ${DOCKER_TAG}

docker-build:
	docker build -t ${DOCKER_TAG} .

build: ts

start:
	npm run start

hr:
	deno run -A ~/sandbox/hr/server.ts target static

ts:
	npm run build

ts-w:
	NODE_ENV=develop npx tsc-watch --onSuccess "make start"

clean:
	rm -rf target

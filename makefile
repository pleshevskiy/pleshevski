PAR := $(MAKE) -j 128


watch:
	$(PAR) hr ts-w

docker-run:
	docker run -d --restart always -p 30000:30000 pleshevski

docker-build:
	docker build -t pleshevski .

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

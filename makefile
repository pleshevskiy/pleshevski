PAR := $(MAKE) -j 128


watch:
	$(PAR) hr ts-w

build: ts

start:
	node target/scripts/main.mjs

hr:
	deno run -A ~/sandbox/hr/server.ts target static

ts:
	npx tsc

ts-w:
	NODE_ENV=develop npx tsc-watch --onSuccess "make start"

clean:
	rm -rf target

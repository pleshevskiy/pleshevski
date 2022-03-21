PAR := $(MAKE) -j 128


watch:
	$(PAR) hr ts-w

hr:
	deno run -A ~/sandbox/hr/server.ts target static

ts-w:
	NODE_ENV=develop npx tsc-watch --onSuccess "node target/scripts/main.mjs"

clean:
	rm -rf target

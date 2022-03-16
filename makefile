
ts-w:
	npx tsc-watch --onSuccess "node target/scripts/main.mjs"

clean:
	rm -rf target

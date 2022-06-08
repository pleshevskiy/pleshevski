FROM denoland/deno:alpine-1.22.1

EXPOSE 33334

WORKDIR /app

USER deno

ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

CMD ["run", "-A", "server.ts"]

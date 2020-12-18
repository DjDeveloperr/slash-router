import { serve, serveTLS } from "https://deno.land/std@0.80.0/http/server.ts";

const server = serveTLS({ hostname: "0.0.0.0", port: 8081, certFile: "./fullchain.pem", keyFile: "./privkey.pem", });
console.log(`HTTP webserver running. Access it at:  http://localhost:8081/`);

for await (const request of server) {
  let bodyContent = "Hello, Slash!";
  request.respond({ status: 200, body: bodyContent });
}

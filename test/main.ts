import { SlashRouter } from "../mod.ts";
import { opine } from "../deps.ts";
import { PUB_KEY } from "./config.ts";

const app = opine();

const router = SlashRouter.init({
    app,
    key: PUB_KEY,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

console.log("Starting server...");

const port = 8081;
let data: number | any = port;

try {
    if (
        Deno.readTextFileSync("fullchain.pem") &&
        Deno.readTextFileSync("privkey.pem")
    ) {
        data = {
            port,
            certFile: "./fullchain.pem",
            keyFile: "./privkey.pem",
        };
    }
} catch (e) {}

app.listen(data, () => console.log("Listening on port: " + port));

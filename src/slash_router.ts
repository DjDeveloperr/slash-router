import {
    Request,
    Response,
    Opine,
    InteractionPayload,
    InteractionType,
    InteractionResponseType,
} from "../deps.ts";
import { verify as verifyKey } from "./verify.ts";

export interface SlashRouterOptions {
    app: Opine;
    key: string;
    endpoint?: string;
}

export class SlashRouter {
    app: Opine;
    key: string;
    apiEndpoint: string;

    constructor(options: SlashRouterOptions) {
        this.app = options.app;
        this.apiEndpoint = options.endpoint ?? "/api/interactions";
        this.key = options.key;

        this._setup();
    }

    private _setup() {
        this.app.post(this.apiEndpoint, (req, res) =>
            this._handleSlash(req, res)
        );
    }

    async verifyKey(req: Request): Promise<boolean> {
        const signature = req.headers.get("x-signature-ed25519") ?? "";
        const timestamp = req.headers.get("x-signature-timestamp") ?? "";

        try {
            const isVerified = await verifyKey(
                (req as any).__parsed,
                signature,
                timestamp,
                this.key
            );
            return isVerified;
        } catch (e) {
            return false;
        }
    }

    private async _handleSlash(req: Request, res: Response) {
        let raw = new Uint8Array(
            parseInt(req.headers.get("content-length") ?? "NUL") ?? undefined
        );
        req.parsedBody = await req.body
            .read(raw)
            .then(() => new TextDecoder("utf-8").decode(raw))
            .then((d: any) => {
                try {
                    req._parsedBody = true;
                    (req as any).__parsed = d;
                    return JSON.parse(d);
                } catch (e) {
                    return {};
                }
            });

        const verify = await this.verifyKey(req);
        if (!verify)
            return res
                .setStatus(401)
                .json({ code: 0, message: "Not Authorized" });

        const data = req.parsedBody as InteractionPayload;
        if (typeof data !== "object")
            return res
                .setStatus(403)
                .json({ code: 0, message: "Invalid Request" });

        if (data.type === InteractionType.PING) {
            return res.json({
                type: InteractionResponseType.PONG,
            });
        }
    }
}

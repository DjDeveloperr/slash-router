import { Buffer, verify as edverify } from "../deps.ts";

/**
 * Utility function to verify request
 * @param rawBody Raw payload sent by Discord in Request
 * @param signature Signature present in headers of Request (X-Signature-Ed25519)
 * @param timestamp Timestamp present in headers of Request (X-Signature-Timestamp)
 * @param clientPublicKey Your Client's Public Key (present on Dev Portal)
 */
export async function verify(
    rawBody: string | Uint8Array | Buffer,
    signature: string,
    timestamp: string,
    clientPublicKey: string
): Promise<boolean> {
    return await edverify(
        signature,
        Buffer.concat([
            Buffer.from(timestamp, "utf-8"),
            Buffer.from(
                rawBody instanceof Uint8Array
                    ? new TextDecoder().decode(rawBody)
                    : rawBody
            ),
        ]),
        clientPublicKey
    ).catch(() => false);
}

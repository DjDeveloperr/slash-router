import { Buffer, verify as edverify } from "../deps.ts";

/**
 * Utility function to verify request
 * @param rawBody Raw payload sent by Discord in Request
 * @param signature Signature present in headers of Request (X-Signature-Ed25519)
 * @param timestamp Timestamp present in headers of Request (X-Signature-Timestamp)
 * @param clientPublicKey Your Client's Public Key (present on Dev Portal)
 */
export async function verify(
    rawBody: Buffer | Uint8Array | string,
    signature: string,
    timestamp: string,
    clientPublicKey: string
): Promise<boolean> {
    const raw =
        rawBody instanceof Buffer
            ? rawBody
            : rawBody instanceof Uint8Array
            ? Buffer.from(rawBody)
            : Buffer.from(rawBody, "utf-8");
    return await edverify(
        signature,
        Buffer.concat([Buffer.from(timestamp, "utf-8"), raw]),
        clientPublicKey
    );
}

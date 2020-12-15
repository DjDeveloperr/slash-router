# Slash-Router

Slash Router is a lightweight framework for handling Discord Interactions over HTTP POSTs, providing with a easy to use Router that can be plug into [Opine](https://deno.land/x/opine).

-   Easily pluggable to Opine App
-   Utility function to verify Interaction
-   Types for Interactions/Slash Commands API

## Getting started

### Verification

Request Verification is handled by the Router automatically, but if you're making a custom implementation using some other framework, try out `verify` method exported from `mod.ts`!

-   `async verify(rawBody: Buffer | Uint8Array | string, signature: string, timestamp: string, clientPublicKey: string`
    -   rawBody: Raw payload sent by Discord in Request
    -   signature: Signature present in headers of Request (`X-Signature-Ed25519`)
    -   timestamp: Timestamp present in headers of Request (`X-Signature-Timestamp`)
    -   clientPublicKey: Your Client's Public Key (present on Dev Portal)

### Examples

Check examples in [this directory](./test).

## Contributing

You're always welcome to contribute! Please don't forget to check [Contributing guide!](CONTRIBUTING.md)

## License

Read more at [LICENSE](LICENSE).

Copyright 2020 @ DjDeveloperr

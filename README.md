# WYPF Coding Exercise

## About my implementation

I opted to utilize Next.js for this project due to several key factors, particularly the fact that, as previously mentioned, Next.js is slated for use in the designated role.

Additionally, I aimed to leverage Next.js' route handlers (formerly known as API routes) to emulate a more realistic scenario in which an external API is not accessed directly but rather processed on the backend. This enables data validation, modification, or reduction before it is returned and utilized by the application. This approach also facilitates a separation of concerns, especially when handling sensitive information like API keys (which are not used in this case).

However, I am open to the possibility of rewriting or making any necessary adjustments to the program if required.

# Try it

[Live hosted version can be found here: coding-exercise-152.vercel.app](https://coding-exercise-152.vercel.app)

# Try it locally

## Prerequisites

- [pnpm](https://pnpm.io/) (optional / you can use npm or yarn instead)

## Build

```bash
pnpm install
pnpm run build
```

## While developing

```bash
pnpm run dev
```

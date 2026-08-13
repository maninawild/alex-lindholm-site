# Private content management

The `/private/*` area is unlisted, server-rendered only after authentication, excluded from public navigation and the sitemap, and marked `noindex, nofollow`. Access codes are stored only as PBKDF2 hashes in Vercel's sensitive environment variables. Successful authentication creates a signed, seven-day, HttpOnly cookie scoped to `/private`.

## Create another access code

1. Pull the current development variables and keep the private variables in your ignored local `.env.local` file.
2. Run `npm run private:access -- create potential-partner-02 jewish`.
3. Copy the generated `PRIVATE_ACCESS_CODES` JSON into the sensitive Vercel variable for Production and Preview. Use the ignored local `.env.local` file for development.
4. Redeploy. Share the plaintext access code once through a separate private channel. It cannot be recovered later.

`pages` is an array of allowed private page ids. Use multiple ids for a multi-page code or `"*"` only for a deliberately universal code.

## Revoke a code

1. Pull the current variables.
2. Run `npm run private:access -- revoke potential-partner-02`.
3. Replace `PRIVATE_ACCESS_CODES` in Vercel with the output and redeploy.

Revocation also invalidates existing sessions at their next request because every session is checked against the active code list.

## Check whether a code was used

Pull the current variables, then run:

`npm run private:access -- usage potential-partner-02 jewish`

The record contains the internal code id/label, private page id, first successful access, latest successful access and successful authentication count. Plaintext codes and IP addresses are never stored in access records.

## Add another private page

1. Add its id, slug, title and subtitle to `lib/private-access/config.ts`.
2. Create `app/private/<slug>/page.tsx` using `getPrivateSession`, `PrivateAccessGate` and `PrivatePageShell`.
3. Add the new page id to the relevant code records and redeploy.
4. Do not add the route to public navigation, search indexes or `app/sitemap.ts`.

## Security notes

Redis enforces eight attempts per temporary, HMAC-pseudonymised network key in 15 minutes. Protected responses are private/no-store and carry crawler, framing, referrer and permissions headers. Copy deterrence is intentionally limited: once content is legitimately displayed in a browser, screenshots and determined extraction cannot be prevented.

# Ranova portfolio template

The website and existing media are hosted at https://portfolio-d83ff.web.app. The Vercel address proxies Firebase Hosting. GitHub contains the application template and deployment configuration. Portfolio collections live in Cloud Firestore at `sites/ranova/content/published`.

## Admin

Open `/admin.html` and sign in with the configured Firebase Google or email/password account. Administrator access comes from `sites/{siteId}/admins/{uid}` with `enabled: true`, managed using trusted project credentials. Browser flags and passwords embedded in HTML do not grant access. Editors choose **Publish to Firebase** explicitly; a revision check prevents overwriting another editor's published changes.

The initial administrator is `r.abdullah.artist@gmail.com`. Google sign-in is enabled. Email/password sign-in requires that user's Firebase password to have been set. Never place service-account keys, passwords or GitHub tokens in this repository.

## Media and billing

Existing media is on Firebase Hosting and remains in the local media folders, which are excluded from Git. Direct CMS photo uploads are deliberately disabled because the project currently uses Spark and has no Storage bucket. Enable Blaze and create the default bucket in the Firebase console, deploy `storage.rules`, then set `uploadsEnabled: true` in `site-config.js`. Existing image URLs and YouTube embeds can be edited without Storage.

## Build and deploy from the existing local workspace

```
python scripts/build.py
npx firebase-tools deploy --only hosting,firestore:rules --project portfolio-d83ff
```

The build copies only web files and local media into `dist`; it excludes backup JSON, source helpers and credentials. A fresh clone does not contain the media library: recover it from your separate local backup before deploying Hosting. **Never deploy a fresh clone over an existing Hosting site without restoring its media.** Vercel serves the existing Firebase deployment using `vercel.json`.

## Reuse for another client

1. Create a separate Firebase project (recommended for ownership and billing isolation), enable Firestore, Google/email sign-in and Hosting.
2. Edit the Firebase values and `siteId` in `site-config.js`, the project in `.firebaserc`, and the Hosting origin in `vercel.json`.
3. Use the Site profile panel for identity, biography, contact links and hero images. Replace logo files in local media; optional layout copy remains in the HTML template. Content collections and the profile are independent of the template.
4. Import the client's seven collections (`novels`, `tech`, `gallery`, `software`, `experience`, `clients`, `articles`) into `sites/{siteId}/content/published`, including integer `revision` and string `updatedAt`. Empty collections are valid.
5. Create the client's administrator membership and deploy the supplied rules. Add both Hosting and custom domains to Firebase Auth's authorized domains.

The maintenance helper `scripts/firebase-admin.py` is scoped to the original Ranova project and uses the local Firebase CLI session. It is not a browser/backend endpoint. Do not use it unchanged for a client project.

## Outstanding security action

The previous admin page included a GitHub access token and hardcoded passwords. They were removed from the current code, but historical commits and older deployments may retain them. Revoke the exposed GitHub token and replace any reused password. History has not been rewritten.

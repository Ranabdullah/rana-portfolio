# Migration verification — 25 September 2026

## Completed

- Firebase Hosting serves the site and 429.5 MB of local media/content. The existing Vercel URL forwards requests to that deployment.
- Firestore contains 15 books, 14 technical projects, 22 gallery groups, 8 software items, 7 experience records, 31 clients, 5 articles and the site profile.
- Google and email/password providers are enabled. The administrator membership is assigned to the existing Firebase user for r.abdullah.artist@gmail.com.
- The Ledger project uses https://ranova3d.itch.io/ledger-personal-command-deck.
- The 5-second intro was reduced from 12,977,024 to 657,990 bytes; it has a skip button, a 6.5-second escape timeout and reduced-motion/data-saver handling.
- The black wordmark is used in navigation; the white logo animates during background loading. Dark themes invert the navigation wordmark.
- Removed embedded GitHub token/password logic, browser-flag authentication, GitHub content publishing and duplicate inline loaders.
- Personal collections and media are no longer tracked in the latest Git tree. Local files remain intact; historical Git commits are unchanged.
- Profile editing covers identity, biography, social/contact links and hero images. The placeholder contact email is hidden until a real public email is entered.

## Checks performed

- All inline JavaScript in both pages parsed successfully.
- All seven public sections rendered at desktop and 390-pixel mobile widths without horizontal overflow.
- All 271 media paths referenced by the content export existed locally. The displayed gallery had no broken images.
- Live Hosting and Vercel checks returned 200 with correct content types for homepage, admin, video, wordmark, configuration and article pages.
- Live Vercel browser loaded 14 projects and the correct Ledger link from Firestore, with no reported runtime errors.
- Intro video/skip controls appeared, then the overlay was removed. Reduced-motion mode mounted no intro video.
- Firestore denied unauthenticated writes and administrator enumeration. A temporary verification user could not publish without membership, could publish with enabled membership, and was denied again after revocation. Temporary test account and records were removed.
- A forged old localStorage authentication flag did not unlock the admin. Unauthenticated SDK publishing was denied.

## Remaining limits

- Direct CMS photo uploads are disabled because the project is on Spark with no Storage bucket. Enable Blaze, create Storage, deploy the supplied Storage rules, and enable uploads in site-config.js to use this feature. Existing media, external image URLs and YouTube embeds remain usable.
- The owner's interactive Google/password sign-in and publish flow needs an owner session; provider configuration and server authorization were verified independently.
- The old exposed GitHub token must be revoked; any reused old password should be changed. Neither repository history nor old deployments were erased.
- This is a focused migration and functional audit, not a claim that every possible legacy rendering, accessibility or content issue has been eliminated.

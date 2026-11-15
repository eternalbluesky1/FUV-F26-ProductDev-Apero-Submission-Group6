# Asset sources

Brand logos used by `components/brand-mark.tsx` and the offer detail page, resolved through
`lib/brand-assets.ts` by `brand_slug`. All files are stored locally under `public/brand/logos/`
and served from the app; no logo is hotlinked at runtime.

Retrieval date for every file below: **2026-11-14**. The machine-readable record of the same
downloads, including the exact source URL of each file, is `public/brand/logos/manifest.json`.

## Ownership and affiliation

These marks are the property of their respective owners. StuDeal is not affiliated with,
endorsed by, sponsored by, or partnered with any of these brands. The logos are used only to
identify the subject of a catalogued offer. Do not reuse them outside that identification
purpose. See the visible relationship label on each offer and the product README for the
project's no-partnership claim.

This is a deliberate product-owner override of the earlier instruction in `guide.md` and
`assets/DESIGN-SYSTEM.md` to use plain text for third-party brands until logo assets are
approved. The product owner requested real brand marks on 14 November 2026. The override is
limited to identification only and does not imply any commercial relationship.

## Files

| Brand | Local file | Source | Credit / license |
|---|---|---|---|
| Galaxy Cinema | `galaxy.png` | https://www.galaxycine.vn/android-chrome-512x512.png (official site) | Trademark of Galaxy Cinema. Retrieved from the official site. |
| CGV Cinemas | `cgv.svg` | https://commons.wikimedia.org/wiki/File:CGV_Cinemas.svg | Wikimedia Commons, public domain (`PD-textlogo`); original uploader credits CJ Group. Trademark of CJ CGV. |
| BHD Star Cineplex | `bhdstar.png` | Wikimedia Commons | Trademark of BHD Star. Retrieved from Wikimedia Commons because the official site logo was not retrievable as a clean file. |
| Beta Cinemas | `beta-cinemas.png` | https://www.betacinemas.vn (official site) | Trademark of Beta Cinemas. Retrieved from the official site. |
| Highlands Coffee | `highlands.svg` | https://commons.wikimedia.org/wiki/File:Highlands_Coffee_5G.svg | CC BY-SA 4.0, author HarrisonAP. Attribution required; logo trademark of Highlands Coffee. File used unmodified. |
| Apple | `apple.svg` | https://cdn.simpleicons.org/apple/101828 | Simple Icons icon set (CC0 1.0). Apple mark is a trademark of Apple Inc. |
| GitHub | `github.svg` | https://cdn.simpleicons.org/github/101828 | Simple Icons icon set (CC0 1.0). GitHub mark is a trademark of GitHub, Inc. |
| Microsoft Azure | `microsoft-azure.svg` | https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg | Simple Icons icon set (CC0 1.0). Azure mark is a trademark of Microsoft Corporation. |
| DataCamp | `datacamp.svg` | https://cdn.simpleicons.org/datacamp/101828 | Simple Icons icon set (CC0 1.0). DataCamp mark is a trademark of DataCamp, Inc. |
| JetBrains | `jetbrains.svg` | https://cdn.simpleicons.org/jetbrains/101828 | Simple Icons icon set (CC0 1.0). JetBrains mark is a trademark of JetBrains s.r.o. |
| 1Password | `1password.svg` | https://cdn.simpleicons.org/1password/101828 | Simple Icons icon set (CC0 1.0). 1Password mark is a trademark of AgileBits Inc. |
| Autodesk | `autodesk.svg` | https://cdn.simpleicons.org/autodesk/101828 | Simple Icons icon set (CC0 1.0). Autodesk mark is a trademark of Autodesk, Inc. |
| Termius | `termius.svg` | https://cdn.simpleicons.org/termius/101828 | Simple Icons icon set (CC0 1.0). Termius mark is a trademark of Termius Corporation. |
| Figma | `figma.svg` | https://cdn.simpleicons.org/figma/101828 | Simple Icons icon set (CC0 1.0). Figma mark is a trademark of Figma, Inc. |
| Notion | `notion.svg` | https://cdn.simpleicons.org/notion/101828 | Simple Icons icon set (CC0 1.0). Notion mark is a trademark of Notion Labs, Inc. |
| Canva | `canva.png` | https://www.canva.com (official site) | Trademark of Canva Pty Ltd. Retrieved from the official site. |
| Adobe | `adobe.svg` | Wikimedia Commons | Trademark of Adobe Inc. Retrieved from Wikimedia Commons. |
| MongoDB | `mongodb.svg` | https://cdn.simpleicons.org/mongodb/101828 | Simple Icons icon set (CC0 1.0). MongoDB mark is a trademark of MongoDB, Inc. |
| Heroku | `heroku.svg` | Wikimedia Commons | Trademark of Salesforce, Inc. Retrieved from Wikimedia Commons. |
| Google | `google.svg` | https://cdn.simpleicons.org/google/101828 | Simple Icons icon set (CC0 1.0). Google mark is a trademark of Google LLC. |
| Pluralsight | `pluralsight.svg` | https://cdn.simpleicons.org/pluralsight/101828 | Simple Icons icon set (CC0 1.0). Pluralsight mark is a trademark of Pluralsight, Inc. |
| Udemy | `udemy.svg` | https://cdn.simpleicons.org/udemy/101828 | Simple Icons icon set (CC0 1.0). Udemy mark is a trademark of Udemy, Inc. |
| Shopee | `shopee.svg` | https://cdn.simpleicons.org/shopee/101828 | Simple Icons icon set (CC0 1.0). Shopee mark is a trademark of Sea Ltd. |
| MoMo | `momo.png` | Wikimedia Commons | Trademark of MoMo. Retrieved from Wikimedia Commons. |
| CellphoneS | `cellphones.png` | https://cellphones.com.vn (official site) | Trademark of CellphoneS. Retrieved from the official site. |

Additional icon-set files were also retrieved and validated but are not currently used by a
published offer: `googlecloud.svg`, `amazonwebservices.png`, `spotify.svg`, `netflix.svg`,
`grammarly.svg`, `digitalocean.svg`, `replit.svg`, `namecheap.svg`, `cloudflare.svg`,
`netlify.svg`, `vercel.svg`, `supabase.svg`, `edx.svg`, `udacity.svg`, `skillshare.svg`,
`leetcode.svg`, `youtube.svg`, `postman.svg`, `docker.svg`, `linux.svg`, `katinat.png`,
`vinaphone.svg`, `vietinbank.png`. They are kept so a future reviewed offer can use them without
another retrieval round.

## Brands without a logo file

`DCINE` and `Xe buýt TP. Hồ Chí Minh` have no retrievable mark. Both use the monogram tile in
`BrandMark`, which renders the brand initials over the brand accent colour. No mark was drawn,
approximated, or generated for them.

## Retrieval notes

- `cdn.simpleicons.org` returned HTTP 404 for the `canva`, `adobe`, `heroku`, `amazon`,
  `amazonwebservices` and `aws` slugs on the retrieval date. Those brands were sourced from
  their own sites or from Wikimedia Commons instead.
- Clearbit Logo API was unreachable from the build network at retrieval time, so it was not used.
- CGV and Highlands official sites were unreachable from the build network (TLS/DNS), so their
  marks come from Wikimedia Commons instead of the brands' own asset servers.
- Every file was verified after download: non-zero size, and either a PNG signature
  (`89 50 4E 47`) or a valid `<svg>` root with at least one `<path>` and no external `href`.
- No logo was drawn, approximated, or generated. Missing or failed assets fall back to the
  monogram tile in `BrandMark`, which uses the brand initials and accent color.

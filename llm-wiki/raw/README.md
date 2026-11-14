# Raw Sources

Original project sources stay where they are. This folder records their locations and the immutability rule. Do not edit, rename, or delete the originals.

## Inventory

| Source | Path | Pages or size | Notes |
|---|---|---|---|
| Project guidance | `../StuDeal Project/guide.md` | 657 lines | Current implementation guide, revision 14 Nov 2026. |
| PRD | `../StuDeal Project/StuDeal-Product-Requirements-Document.pdf` | 43 pages | Read pages 1-42. Page 43 contains a private key and is excluded. |
| Course brief | `../Original Docs/Product Dev Meeting Notes.pdf` | 16 pages | Assignment, assessment, and team notes. |
| Product notes | `../Original Docs/Product Dev Meeting Notes (1).pdf` | 9 pages | Original UniMon concept. |
| UX and tech notes | `../Original Docs/Product Dev Meeting Notes (2).pdf` | 11 pages | Original UI and technical spec. |
| Design system | `../StuDeal Project/assets/DESIGN-SYSTEM.md` | 11 KB | Version 1.0, 13 Nov 2026. |
| Asset guide | `../StuDeal Project/assets/ASSET-GUIDE.md` | 2.8 KB | Screen and mascot inventory. |
| Design tokens | `../StuDeal Project/assets/design-tokens.json` | 3 KB | Canonical color, type, spacing, radius, shadow, and control values. |
| Offer snapshot | `../StuDeal Project/assets/verified-offer-snapshot.csv` | 12 rows | Checked 13 Nov 2026. Historical until rechecked. |
| Asset archive | `../StuDeal Project/StuDeal-UI-and-Mascot-Assets.zip` | 26 files | Extracted to `../StuDeal Project/assets/`. |

## Immutability rule

Files in this raw layer are read once and never edited. If a source changes, add a new dated copy and cite it. If a source is wrong, record the correction in the wiki instead of rewriting the original.

## Extraction notes

- `assets/studeal-theme.css` and `assets/SEED-IMPORT.md` are named in the guide but are absent from the archive. The implementation uses `design-tokens.json` and `verified-offer-snapshot.csv` instead.
- Screen PNGs are visual references. They are not production screenshots and must not be used as page backgrounds.
- The PRD's final page is private. Do not copy it into the repository, wiki, screenshots, or chat.

## Do not

- Do not put secrets, API keys, or personal data here.
- Do not use this folder as scratch space.
- Do not copy large binaries into the wiki when a relative link is enough.

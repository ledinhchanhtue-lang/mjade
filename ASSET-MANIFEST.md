# Asset Manifest — MJADE Homepage

Homepage imagery now uses **licensed stock photos from Pexels** (free for
commercial use, no attribution required — see pexels.com/license). They are
tone-matched placeholders: real MJADE product photography should still replace
them before launch, because several show emerald/green-gemstone jewelry rather
than certified Myanmar jadeite, and product photos must show the actual items
sold. Every image is wired through `next/image` with honest Vietnamese `alt`
text, so swapping a file is a drop-in replacement.

## Reference mockup

| File | Status |
| --- | --- |
| `public/reference/mjade-homepage-reference.png` | **Missing** — could not be written from chat (see `public/reference/README.md`). Save the original reference screenshot there manually. Not used in production code. |

## Homepage imagery

| File | Used in | Source (Pexels ID) | Replace with |
| --- | --- | --- | --- |
| `public/images/home/hero-jade-woman.jpg` | [Hero.tsx](components/home/Hero.tsx) | [17129493](https://www.pexels.com/photo/17129493/) — woman with green gemstone jewelry set, warm beige backdrop | Editorial portrait of a Vietnamese/SEA woman in her 30s–40s, ivory silk, real MJADE jadeite pendant/ring/earrings, window light, model right, negative space left. |
| `public/images/home/featured-pendant.jpg` | [FeaturedCollection.tsx](components/home/FeaturedCollection.tsx) via `data/products.ts` | [21235148](https://www.pexels.com/photo/21235148/) — green stone pendant necklace | Real MJADE jadeite pendant, ivory/beige studio shot, 4:5. |
| `public/images/home/featured-ring.jpg` | same | [7347433](https://www.pexels.com/photo/7347433/) — jadeite rings on white plush | Real MJADE jadeite ring, 4:5. |
| `public/images/home/featured-earrings.jpg` | same | [13595669](https://www.pexels.com/photo/13595669/) — green stone earrings on ivory pedestal | Real MJADE jadeite earrings, 4:5. |
| `public/images/home/featured-bracelet.jpg` | same | [34372579](https://www.pexels.com/photo/34372579/) — green bead bracelet on white stone | Real MJADE jadeite bracelet, 4:5. |
| `public/images/home/jade-inspection.jpg` | [StoryCertification.tsx](components/home/StoryCertification.tsx) | [13613422](https://www.pexels.com/photo/13613422/) — gemologist sorting green stones with tweezers | Macro of MJADE jadeite cabochon under tweezers/loupe on raw stone, warm ivory light. |
| `public/images/home/certificate.svg` | same | Hand-drawn neutral placeholder (unchanged) | **Real MJADE certificate only.** No fabricated lab name or number — keep this placeholder until a real, unedited certificate photo (personal info redacted if needed) is supplied. |
| `public/images/home/limited-pendant.jpg` | [LimitedCollection.tsx](components/home/LimitedCollection.tsx) via `data/products.ts` | [10561322](https://www.pexels.com/photo/10561322/) — green pendant on cream agate plate | MJADE limited pendant on champagne silk, 1:1. |
| `public/images/home/limited-ring.jpg` | same | [16242337](https://www.pexels.com/photo/16242337/) — macro green gemstone ring, ivory/gold tones | MJADE limited ring on ivory linen, 1:1. |
| `public/images/home/limited-earrings.jpg` | same | [13780712](https://www.pexels.com/photo/13780712/) — hand with jadeite ring on embroidered silk | MJADE limited earrings, 1:1. |
| `public/images/home/limited-bangle.jpg` | same | [37924957](https://www.pexels.com/photo/37924957/) — polished green jade stones on white | MJADE solid jadeite bangle, 1:1. |

## Licensing notes

- All `.jpg` files above were downloaded from Pexels on 2026-07-04 under the
  Pexels license: free to use commercially, modification allowed, no
  attribution required. Do **not** redistribute them as standalone stock.
- Pinterest or other scraped imagery was deliberately **not** used — images
  there are third-party copyrighted work without a usable license.
- No fabricated lab name, certificate number, or gemological report appears
  anywhere in the codebase.

## Replacement steps

1. Produce the real asset per art direction above (full AI prompts are in the
   original design brief if needed).
2. Export as `.webp` or `.jpg` (installing `sharp` is recommended for
   production image optimization).
3. Save under the same file name (extension may change) and update the single
   `src` string in `data/products.ts` or the relevant component.
4. Update the `imageAlt` text to describe the real product.

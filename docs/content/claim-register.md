# Public Claim Register

This file is the source of truth for claims published on the site. Do not publish a strong claim unless it is marked `verified` and the evidence owner is known.

| Claim | Current location | Status | Evidence / owner | Allowed public wording |
|---|---|---|---|---|
| 20+ years in RF manufacturing | Removed from public pages | remove | Unknown — owner proof required before reconsideration | Do not republish the number until verified |
| 50+ countries served | Removed from public pages | remove | Unknown — owner proof required before reconsideration | Do not republish the number until verified |
| 7-day pilot sample target | Removed from public pages | remove | Unknown — owner proof required before reconsideration | Do not republish the timeline until verified |
| ISO9001 manufacturer | Removed from public metadata | remove | Certificate copy and validity — owner to provide | Do not republish until verified |
| Italy gate distributor case | Removed from public pages | remove | Case evidence and publication permission — owner to provide | Do not republish until verified |
| United States access OEM case | Removed from public pages | remove | Case evidence and publication permission — owner to provide | Do not republish until verified |
| Anonymous partner quotes | Removed from public pages | remove | Written permission and attribution — owner to provide | Do not republish until verified |
| RF remote, receiver, retrofit, and smart access product families | `src/App.jsx` product data | verified | Current product taxonomy in repository — owner should confirm | May describe the product scope; do not imply every protocol or certification is supported |
| Contact address, phone, WhatsApp, email | `src/App.jsx` `CONTACT_INFO` | needs-owner-proof | Owner to confirm current sales details | Use only after contact details are confirmed |
| Product catalog PDF | Local ignored archive: `docs/media-source/catalog-invalid-onedrive.bin` | remove | Previous public asset starts with `%ONEDLP_HEADER%` and is not a readable PDF | Do not link or commit until owner supplies a valid, reviewed PDF |
| Factory floor video | Local ignored archive under `docs/media-source/` | remove | Source carries an Alibaba.com watermark and has been moved out of the public site and public repository | Replace only with approved, self-owned footage whose location and publication rights are confirmed |
| Receiver-sensitivity explainer | `src/App.jsx` published blog list | limited | Rewritten to distinguish dBm from dB, show comparable-test conditions, and avoid distance guarantees | Keep the conditional wording and test-context checklist; add engineering review and sources before expanding claims |
| Other blog technical and commercial drafts | `src/App.jsx` `BLOG_POSTS` | needs-owner-proof | Engineering/compliance review required; drafts are excluded from the rendered list | Publish only after factual review, test conditions, and current source links are added |

Open owner inputs:

- Certificate scans and validity dates.
- Verified years, served markets, sample lead time, MOQ, and production lead time.
- Product models, public specifications, and approved images.
- Case study evidence and permission to publish customer/location details.
- Confirmation that the listed contact details are current.

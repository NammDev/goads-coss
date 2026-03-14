# Product Catalog Data — Ready for DB Import

> Review & edit. After approval, will be seeded into `product` table.
> Fields match schema: `id` (auto-generated), `name`, `slug`, `type`, `price` (USD), `currency`, `description`, `inventoryCount`, `isActive`
> Products with `price: contact` → set price=0, admin handles pricing per deal.

---

## type: `bm` — Business Manager


| name                                   | slug                    | price   | description                                                                 |
| -------------------------------------- | ----------------------- | ------- | --------------------------------------------------------------------------- |
| BM1 Verified                           | bm1-verified            | 80.00   | Verified Business Manager with 1 ad account slot                            |
| BM3 Verified                           | bm3-verified            | 180.00  | Verified Business Manager with 3 ad account slots                           |
| BM5 Verified ($250 DSL)                | bm5-verified-250dsl     | 320.00  | Verified BM with 5 ad accounts — $250 daily spend limit                     |
| BM5 Verified (Unlimited DSL)           | bm5-verified-unlimited  | 390.00  | Verified BM with 5 ad accounts — unlimited daily spend limit                |
| BM10 Verified ($250 DSL)               | bm10-verified-250dsl    | 0.00    | Verified BM with 10 ad accounts — $250 DSL. Contact for pricing             |
| BM10 Verified (Unlimited DSL)          | bm10-verified-unlimited | 0.00    | Verified BM with 10 ad accounts — unlimited DSL. Contact for pricing        |
| BM50                                   | bm50                    | 0.00    | BM with 50 ad account slots — large-scale operations. Contact for pricing   |
| BM100                                  | bm100                   | 0.00    | BM with 100 ad account slots — max enterprise capacity. Contact for pricing |
| BM2500                                 | bm2500                  | 0.00    | BM with 2500 ad account slots — ultimate agency scale. Contact for pricing  |
| BM Verified + WhatsApp API (2K limit)  | bm-whatsapp-2k          | 280.00  | Verified BM with WhatsApp Business API — 2,000 message limit                |
| BM Verified + WhatsApp API (10K limit) | bm-whatsapp-10k         | 1400.00 | Verified BM with WhatsApp Business API — 10,000 message limit               |


## type: `profile` — Facebook Profile


| name                                                 | slug                    | price  | description                                                         |
| ---------------------------------------------------- | ----------------------- | ------ | ------------------------------------------------------------------- |
| Asia Reinstated Aged Facebook Profile                | profile-asia-reinstated | 30.00  | Reinstated aged profile from Asia region                            |
| USA Reinstated Aged Facebook Profile                 | profile-usa-reinstated  | 40.00  | Reinstated aged profile from USA region                             |
| Premium Asia Reinstated Facebook Profile             | profile-asia-premium    | 40.00  | Premium reinstated profile from Asia with higher trust score        |
| Premium USA Reinstated Facebook Profile              | profile-usa-premium     | 50.00  | Premium reinstated profile from USA with higher trust score         |
| Asia Super Aged (7+ Years) Double Reinstated Profile | profile-asia-super-aged | 95.00  | Super aged 7+ year profile, double reinstated for max stability     |
| USA Super Aged (7+ Years) Double Reinstated Profile  | profile-usa-super-aged  | 110.00 | Super aged 7+ year USA profile, double reinstated for max stability |


## type: `page` — Facebook Page


| name                                       | slug                  | price  | description                                      |
| ------------------------------------------ | --------------------- | ------ | ------------------------------------------------ |
| Aged Reinstated Facebook Page              | page-aged-reinstated  | 35.00  | Reinstated aged Facebook Page ready for ads      |
| 1,000–3,000 Follower Facebook Page         | page-1k-3k-followers  | 45.00  | Facebook Page with 1K-3K real followers          |
| 5,000 Follower Facebook Page               | page-5k-followers     | 65.00  | Facebook Page with 5K real followers             |
| 10,000 Follower Facebook Page              | page-10k-followers    | 110.00 | Facebook Page with 10K real followers            |
| Livestream Ads Ready Facebook Page         | page-livestream-ready | 200.00 | Facebook Page enabled for livestream advertising |
| Monetized Facebook Page (10,000 Followers) | page-monetized-10k    | 300.00 | Monetized Facebook Page with 10K followers       |
| Verified Facebook Page (Blue Badge)        | page-verified-blue    | 600.00 | Blue badge verified Facebook Page                |


## type: `tiktok_account` — TikTok Account


| name                                        | slug                  | price  | description                                             |
| ------------------------------------------- | --------------------- | ------ | ------------------------------------------------------- |
| Fresh TikTok Channel Account (0 Followers)  | tiktok-fresh-channel  | 60.00  | Fresh TikTok channel account ready for content creation |
| TikTok Shop Info USA                        | tiktok-shop-usa       | 80.00  | TikTok Shop account with USA business info              |
| TikTok Ads Business Account (Verified)      | tiktok-ads-verified   | 120.00 | Verified TikTok business account ready for ad campaigns |
| TikTok Affiliate Account (1,000+ Followers) | tiktok-affiliate-1k   | 180.00 | TikTok affiliate account with 1,000+ real followers     |
| TikTok Shop Info USA (Jumio Verified)       | tiktok-shop-usa-jumio | 400.00 | TikTok Shop account with Jumio identity verification    |


## type: `blue_verification` — Verification Services


| name                                      | slug                     | price  | description                                                        |
| ----------------------------------------- | ------------------------ | ------ | ------------------------------------------------------------------ |
| Business Manager Verification Service     | verify-bm                | 100.00 | Official Meta Business Manager verification service                |
| Facebook Profile Blue Badge Verification  | verify-facebook-profile  | 600.00 | Official Facebook profile blue badge verification                  |
| Instagram Profile Blue Badge Verification | verify-instagram-profile | 600.00 | Official Instagram profile blue badge verification                 |
| Facebook Page Blue Badge Verification     | verify-facebook-page     | 600.00 | Official Facebook Page blue badge verification                     |
| Social Media Engagement Boost             | verify-engagement-boost  | 0.00   | Likes, followers, comments, and reviews boost. Contact for pricing |


## type: `unban` — Unban Services


| name                            | slug                   | price | description                                                            |
| ------------------------------- | ---------------------- | ----- | ---------------------------------------------------------------------- |
| Unban Facebook Profile Service  | unban-facebook-profile | 0.00  | Professional Facebook profile unban and recovery. Contact for pricing  |
| Unban Facebook Page Service     | unban-facebook-page    | 0.00  | Professional Facebook Page unban and recovery. Contact for pricing     |
| Unban Instagram Profile Service | unban-instagram        | 0.00  | Professional Instagram profile unban and recovery. Contact for pricing |


## type: `agency_account` — Agency Ad Accounts (Coming Soon)


| name                       | slug            | price | description                                                                    |
| -------------------------- | --------------- | ----- | ------------------------------------------------------------------------------ |
| Facebook Agency Ad Account | agency-facebook | 0.00  | Verified Meta agency ad account — unlimited spend, 7-day warranty. Coming soon |


## type: `google_agency` — Google Agency (Coming Soon)


| name                          | slug          | price | description                                                                     |
| ----------------------------- | ------------- | ----- | ------------------------------------------------------------------------------- |
| Google Whitelisted Ad Account | agency-google | 0.00  | Whitelisted Google Ads account — threshold billing, agency support. Coming soon |


## type: `tiktok_agency` — TikTok Agency (Coming Soon)


| name                     | slug          | price | description                                                                            |
| ------------------------ | ------------- | ----- | -------------------------------------------------------------------------------------- |
| TikTok Agency Ad Account | agency-tiktok | 0.00  | Verified TikTok agency ad account — higher spend limits, premium features. Coming soon |


---

## Summary


| Type              | Count  | Price Range  |
| ----------------- | ------ | ------------ |
| bm                | 11     | $80 – $1,400 |
| profile           | 6      | $30 – $110   |
| page              | 7      | $35 – $600   |
| tiktok_account    | 5      | $60 – $400   |
| blue_verification | 5      | $100 – $600  |
| unban             | 3      | Contact      |
| agency_account    | 1      | Coming soon  |
| google_agency     | 1      | Coming soon  |
| tiktok_agency     | 1      | Coming soon  |
| **Total**         | **40** |              |


---

## Notes

- `inventoryCount` = 0 for all (admin manages stock manually)
- `isActive` = true for all except "Coming Soon" types (set false)
- `currency` = "USD" for all
- `price = 0.00` means "Contact for pricing" — UI should show "Contact" instead of $0
- Old seed had 9 generic products — this replaces them with real variants


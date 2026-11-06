# 09 — Content to leads, and lead follow-up (16/10/2026)

**Method note:** there is no `/content-to-leads` or `/lead-follow-up` skill on this machine (searched `~/.claude`). I did both by hand from the code and the live site. Nothing was sent, submitted or changed: I did not submit the contact form.

## What happens today when someone enquires
1. Visitor fills name, email, message on /contact/ (or clicks WhatsApp / `tel:`).
2. `public/contact.php` sends one plain-text email to deon@db23.co.za through the server's SMTP account, with Reply-To set to the visitor.
3. The visitor sees "Thanks, your message has been sent." Nothing else happens.
The site promises a reply "within the hour, business hours" in five places (footer, /contact/ ×4, /about/). The five-minute goal in your global brief is not what the site promises, and nothing in the system measures either.

## Part A — Content to leads

| Finding | Evidence |
|---|---|
| Every post ends in one button to a service page; no WhatsApp, form or call option in the post | 18 identical end-of-post CTAs in `BlogPostPage.jsx` |
| No lead magnet, newsletter or checklist download anywhere | none found on the 16 pages measured |
| Service hubs link to blog posts 0–1 times, and posts reach hubs only via that one button | report 04 |
| The WhatsApp link opens with generic text ("Hi DB23, I would like to talk about ") | `wa.me` link, same on every page |
| No source tracking: the form does not record which page or post the lead came from | `contact.php` body has no page/referrer field |
| No conversion events: Google Analytics is installed (G-63K3NNB0X0) but no code sends a form-submit, WhatsApp-click or call-click event | grep of `src/` found no `gtag(` calls |
| No privacy policy page and no POPIA notice on the form that collects names and emails | /privacy/ and /privacy-policy/ both returned 404; no wording on the form |

The last row matters most for a site that sells POPIA-aware AI work.

### Recommended changes, smallest first
1. **Privacy notice.** Add a one-paragraph privacy policy page (what is collected, why, who sees it, how to ask for deletion, information officer contact) and a one-line notice with a link under the form. **Needs your input: you or an attorney should approve the wording.**
2. **Tracking.** Fire GA4 events `generate_lead` (form success), `whatsapp_click`, `phone_click`, each with the page path. Without this you cannot tell which post earns an enquiry, and the cluster work in reports 01–02 cannot be judged.
3. **Source on every lead.** Add a hidden field with the page URL and put it in the email body, so you can see "came from /blog/ai-receptionist-medical-practice-south-africa/".
4. **Context-aware WhatsApp.** On posts, a WhatsApp CTA whose pre-filled message includes the post title, e.g. "Hi DB23, I read your guide on AI receptionists for medical practices and would like to talk about it."
5. **Mid-post CTA** after the answer box on the highest-intent posts (cost, medical, outsourced vs in-house): "Get a quote in the hour".
6. **Lead magnet.** The POPIA checklist (brief 2 in report 02) is the natural one: publish it openly, offer a printable version for an email address. Optional.
7. **Booking.** "Discovery Call" already exists as a form option; a booking link would shorten the path. This means an external scheduling service, so I will not add one without your approval.

## Part B — Lead follow-up

### Gaps between the promise and the system
| Gap | Detail |
|---|---|
| No notification beyond email | A lead sits in deon@db23.co.za until someone looks. Nothing pushes it to your phone |
| No auto-reply to the visitor | They get on-screen thanks only; no email confirming receipt or the response window |
| Failed sends are lost | If SMTP fails or the password variable is missing, `contact.php` returns an error and keeps no copy, so the enquiry is gone. The visitor is told "could not be sent right now" with no WhatsApp or email fallback in that message |
| No spam protection | No honeypot, rate limit or CAPTCHA, so bot posts reach your inbox and can bury real leads |
| No phone number field | The message is the only contact route besides email |
| No response tracking | Nothing records when a lead arrived or when it was answered |

### Security finding in `public/contact.php` (pre-existing, not merge-blocking for this work)
`clean_text()` (line 30) removes `\r` and null bytes but not `\n`. The name is placed straight into the `Reply-To:` header (about line 124 of the raw-email build). A name containing a newline followed by header text can inject extra headers or body lines into your own copy of the email. Delivery is controlled by the SMTP envelope, so it cannot be used to mail third parties through your server, but it can spoof Reply-To or insert content. Repro: submit `name = "x\nReply-To: someone@else.com"` and read the received email's headers. I did not run this against the live site.
Fix (one line): also strip `"\n"` from single-line fields (name, email, subject).

### Making five minutes real
Pick the lightest option that reaches your phone instantly:
1. **Push alert from `contact.php`** to a Telegram bot, Pushover or ntfy topic, sent at the same moment as the email (a single curl call, no new library; token stored as an environment variable, never in the file). *Recommended.*
2. **Phone rule on the inbox**: a mail-app rule that notifies loudly for "DB23 Website Enquiry". No code, but only works while your phone is on and the mail app is syncing.
3. **WhatsApp Business API alert**: highest reach, but adds a paid service and set-up. Not recommended yet.
Then add an **auto-reply** to the visitor: "Thanks [name], we have your message about [topic]. We reply within the hour, 08:00–17:00 Monday to Friday, or WhatsApp +27 83 602 5227 for the fastest answer." That also sets the correct expectation outside business hours, which the site currently does not state in text (hours exist only in schema).
Decide which promise is true: "within the hour" (current copy) or "within five minutes". Only promise what the alert makes achievable, and state business hours next to it.

### Suggested order (each is small)
1. Add `\n` stripping (security, one line).
2. Add push alert + failure fallback (show WhatsApp link on error; email yourself a failure notice).
3. Add auto-reply with business hours.
4. Add hidden page-source field and GA4 events.
5. Add honeypot field (simple, no dependency). A Cloudflare Turnstile widget is the stronger option and is free; it adds an external script, so it needs your yes.
6. Privacy page and form notice (needs wording from you).

I have not made any of these changes. Say "go" and I will do 1–5 together, test the form locally against a stub (never against live SMTP), and rebuild the zip.

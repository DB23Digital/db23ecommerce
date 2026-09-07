# Server-side files that are not part of the SPA build

The client microsites in `public_html/` are static HTML folders that live only on
the server — they are not in this repo, so `build.zip` never touches them. Any
`.htaccess` we have to fix inside one of them is kept here so the fix is not lost
on the next deploy.

## safik-wanza.htaccess

Deploy to: `public_html/safik-wanza/.htaccess`

Safi Kwanza shipped with an `.htaccess` written for a standalone domain root
(`RewriteBase /`, redirect targets like `/$1`). In a subdirectory those targets
resolve at the domain root, so `/safik-wanza/index.html` redirected to `/index`
and returned 404 — every `.html` link in the microsite was broken.

The fix sets `RewriteBase /safik-wanza/`, points both `.html`-stripping rules and
`ErrorDocument` at the subdirectory, and adds the 301 collapsing the old
`index1.html` entry point to the directory root.

That 301 cannot live in the site's root `.htaccess`: Apache does not inherit
parent `mod_rewrite` rules into a child directory's `.htaccess` — the child's
rules replace the parent's outright. A rule written at root for a path inside a
microsite that carries its own `.htaccess` never runs.

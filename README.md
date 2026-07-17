# Imran Khan — Portfolio Website

A static, single-page portfolio site. No build step, no framework — pure HTML/CSS/JS, so it deploys to GitHub Pages for free in a few minutes.

## What's in this build

- **Design:** light theme, purple/violet accent (#7C3AED), no dark mode toggle.
- **Headline:** "GenAI Developer & AI Solution Engineer," with a small "Problem-First Engineer" badge above it.
- **Hero:** no photo — an animated orbit graphic with 6 real logos (Python, Flask, JavaScript, React, Flutter, Git) spins around a center "IK" badge instead.
- **Skills:** shown as icon tiles across 9 categories (Languages, Backend Frameworks, AI/LLM Stack, Frontend, Database, Voice/Media, Document/PDF, Payments & Auth, Deployment & Tools). Real logos where a public one exists (Python, JS, Dart, HTML, CSS, Flask, FastAPI, React, Flutter, SQLite, Git, GitHub, Supabase, Gmail); clean monogram badges for AI-specific tools that don't have one (Gemini, Groq, LangChain, ChromaDB, RAG, LLM-as-a-Judge, Razorpay, gTTS, ReportLab, Web Speech API).
- **Projects:** Multi-Tab RAG Suite, Ek Sawal 4 Experts, NYAY AI, Hallucination Catcher, Kisan Daily Briefing Agent, KisanBazaar. Every card has both a "Code" and "Live Demo" button.
- **Social links:** GitHub only (`https://github.com/Rev-ImranKhan`), wired into the nav, footer, contact section, and the "View All 40+ on GitHub" button. No LinkedIn, by request.
- **Achievements:** Tech Vistara Hackathon.
- **Certifications:** College Certificate, Power BI Certificate, Wipro Certificate — each with an image slot that only appears once you add the matching file (see below); until then, the card just shows clean text.
- **GitHub Activity:** live stats + top-languages cards, pulled from your GitHub username (already set to `Rev-ImranKhan`). If a card ever fails to load, only that card hides — the section itself always stays visible, and there's no "add your username" text anywhere on the live page.

## Files
- `index.html` — all page content
- `style.css` — design tokens, layout, animations
- `script.js` — mobile nav, scroll reveal, active nav highlighting, GitHub stats widget

## Still to do (nothing else — this is the full list)

1. **Project links** — each project card has a "Code" and "Live Demo" button, both currently `href="#"`. Search `href="#"` inside the Projects section in `index.html` and swap in each project's real GitHub repo link and deployed URL as you push/deploy them.
2. **Resume file** — the Hero section links to `resume.pdf`. Drop your actual resume PDF into this same folder, named exactly `resume.pdf` (or update the `href` in `index.html` to match your filename).
3. **Certificate photos** — create a folder named `certificates` next to `index.html`, and add three image files with these exact names:
   - `certificates/college-certificate.jpg`
   - `certificates/powerbi-certificate.jpg`
   - `certificates/wipro-certificate.jpg`
   
   As soon as a file with the matching name exists, that card automatically shows the photo — no code changes needed. If a file is missing, that card simply stays text-only (no broken image icon).
4. **Certificate exact wording** — the three cert cards currently show what you told me (college name, "Power BI Certificate," "Wipro"). If you want the precise official title/issuing platform/year added, edit the `<h3 class="cert-title">` and `<p class="cert-issuer">` lines in the Certifications section of `index.html`.
5. **Achievement detail** — the Tech Vistara Hackathon card has one generic sentence. Search "Tech Vistara" in `index.html` if you want to add your team name, the problem you tackled, or the result.

## Deploy to GitHub Pages (free)

1. Create a new GitHub repository (e.g. `portfolio`).
2. Upload `index.html`, `style.css`, `script.js`, your `resume.pdf`, and (optionally) a `certificates/` folder to the repo root.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source: Deploy from a branch**, branch: **main**, folder: **/ (root)**. Save.
5. Wait 1–2 minutes, then your site is live at:
   `https://Rev-ImranKhan.github.io/<repo-name>/`

If you want it at `https://Rev-ImranKhan.github.io/` directly (no repo name in the URL), name the repository exactly `Rev-ImranKhan.github.io`.

## Customizing
- Colors, spacing, and radius are all CSS variables at the top of `style.css` under `:root` — change once, updates everywhere.
- Add/remove project cards by duplicating a `.project-card` block in the Projects section of `index.html`.

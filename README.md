# Rida Najjari · Salesforce Portfolio

> Personal portfolio of **Rida Najjari**, 4x certified **Salesforce Consultant**, **Apex / LWC Developer** and **Salesforce Administrator** based in Paris.
> A fast, bilingual (🇬🇧 English / 🇫🇷 French), mobile-first single-page site that presents my experience, certifications, skills and the Salesforce projects I build and publish on GitHub.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)
![Salesforce](https://img.shields.io/badge/Salesforce-4x_Certified-00A1E0?logo=salesforce&logoColor=white)

![Portfolio hero section](docs/screenshot-hero.png)

---

## About this portfolio

This site is my online CV. Recruiters and tech leads can see in under a minute who I am, which Salesforce certifications I hold, where I have worked, and open the source code of my Salesforce projects.

**Certifications:** Platform Administrator · Platform App Builder · Platform Developer I · Salesforce Associate

### Sections
| Section | Content |
|---|---|
| **Hero** | Name, title, short profile, location, availability, **Download CV** and **Get in Touch** buttons |
| **Certifications** | My 4 Salesforce certifications |
| **Experience & Education** | Timeline: Vulcain Engineering Group, Dell Technologies, Sofrecom · Institut F2i, EMSI, BTS |
| **Salesforce Projects** | 5 project cards with technical summary, test coverage, tech badges and a **View on GitHub** button |
| **Skills** | Grouped by Salesforce Development, Administration, Clouds, Data & DevOps, Methods, Other Tech, Languages |
| **Contact** | Email, LinkedIn and GitHub links + a contact form that opens the visitor's email app |

![Salesforce projects section](docs/screenshot-projects.png)

### Featured Salesforce projects
| Project | What it shows | Repo |
|---|---|---|
| SLA Case Escalation (Service Cloud) | Batch Apex, Schedulable, Database.Stateful, Chatter & email alerts, 7 tests (bulk 200) | [case-escalation-automation](https://github.com/ridanajjari/case-escalation-automation) |
| Lead Auto-Assignment Engine (Sales Cloud) | Apex Trigger Handler pattern, Custom Metadata rules editable without deployment, 8 tests (bulk 200) | [lead-auto-assignment](https://github.com/ridanajjari/lead-auto-assignment) |
| LWC KPI Dashboard | Lightning Web Component, `@AuraEnabled` Apex `with sharing`, SOQL aggregates in one server call | [lwc-kpi-dashboard](https://github.com/ridanajjari/lwc-kpi-dashboard) |
| External REST API Integration | Apex HTTP callout, Named Credentials, JSON parsing, typed exceptions, HttpCalloutMock | [salesforce-api-integration](https://github.com/ridanajjari/salesforce-api-integration) |
| Admin Flow Toolkit | 5 deployable Flows: record-triggered, scheduled, before-save, wait elements | [admin-flow-toolkit](https://github.com/ridanajjari/admin-flow-toolkit) |

---

## Features
- 🌍 **English / French switch.** Remembers the visitor's choice and defaults to the browser language.
- 📱 **Mobile-first, responsive.** Tested at 375 px (phone) and 1280 px (desktop), with no horizontal scrolling.
- ✨ **Polished dark UI.** Glowing project cards, hover transitions and fade-in on scroll (turned off for users who prefer reduced motion).
- 🧭 **Sticky navigation.** Smooth scrolling, the current section is highlighted, hamburger menu on mobile.
- ♿ **Accessible.** Semantic HTML, keyboard focus rings, ARIA labels on icon links, `<html lang>` follows the selected language.
- 📨 **No backend needed.** The contact form validates input and opens the visitor's email app with the message ready to send.
- 📄 **One-click CV download** from `public/`.

<img src="docs/screenshot-mobile-fr.png" alt="Mobile view in French" width="300" />

---

## Tech stack
| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react (GitHub / LinkedIn logos as inline SVG) |
| Hosting | Netlify (config in `netlify.toml`) |

## Project structure
```
portfolio-salesforce/
├── public/
│   └── Rida_Najjari_CV_Salesforce.pdf   # "Download CV" file
├── src/
│   ├── App.jsx      # whole site: content constants + sections
│   ├── main.jsx
│   └── index.css    # Tailwind + smooth scroll
├── docs/            # README screenshots
├── netlify.toml
└── tailwind.config.js
```

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit content
All text lives at the top of `src/App.jsx` in the `PROFILE`, `UI`, `EXPERIENCE`, `EDUCATION`, `PROJECTS` and `SKILLS` constants, with `{ en, fr }` values for both languages. You can update content without touching the layout. To update the CV, replace the PDF in `public/`.

## Deploy to Netlify
`netlify.toml` is already configured (`npm run build` → `dist`).
1. On [app.netlify.com](https://app.netlify.com): **Add new site → Import an existing project → GitHub** → choose this repo → **Deploy**.
2. Optional: **Site settings → Change site name** (e.g. `rida-najjari.netlify.app`).

Every push to `main` redeploys the site automatically.

---

## Contact
- 📧 [najjaririda6@gmail.com](mailto:najjaririda6@gmail.com)
- 💼 [linkedin.com/in/rida-najjari](https://www.linkedin.com/in/rida-najjari)
- 🐙 [github.com/ridanajjari](https://github.com/ridanajjari)

© 2026 Rida Najjari

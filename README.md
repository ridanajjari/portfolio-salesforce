# portfolio-salesforce

Hi, I'm Rida Najjari. I'm a Salesforce consultant in Paris, currently working on Sales Cloud and Service Cloud at Vulcain Engineering Group. I do both development (Apex, LWC, Flow, integrations) and administration, and I hold 4 Salesforce certifications: Platform Administrator, Platform App Builder, Platform Developer I and Associate.

This repo is the code of my personal website. I wanted one place where a recruiter or a tech lead can quickly see my background and open the code of the Salesforce projects I've built, instead of only reading a PDF.

**You can visit it here: [rida-najjari.netlify.app](https://rida-najjari.netlify.app/)**

![Home page](docs/screenshot-hero.png)

## What's on the site

- A short intro, my certifications and a button to download my CV
- My experience (Vulcain Engineering Group, Dell Technologies, Sofrecom) and education (Institut F2i, EMSI)
- My Salesforce projects, each with a link to its GitHub repo
- My skills, grouped by area
- A contact section with my email, LinkedIn and a small form

The whole site works in English and French. I'm looking for a job in France, but I also wanted it readable for international teams, so there's an EN / FR switch in the menu.

![Projects section](docs/screenshot-projects.png)

## My Salesforce projects

These are the projects shown on the site. Each one has its own repo with the code, tests and a README explaining the business need.

| Project                                                                                 | Description                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [case-escalation-automation](https://github.com/ridanajjari/case-escalation-automation) | Hourly Batch Apex that raises the priority of open Cases breaching their SLA. Thresholds are in Custom Metadata and age is measured from the last escalation, so a Case is not escalated twice in a row. Chatter post and owner email only for updates that succeeded. 15 Apex test methods. |
| [lead-auto-assignment](https://github.com/ridanajjari/lead-auto-assignment)             | Before-save Lead trigger that assigns owners from Custom Metadata rules (industry and country, most specific first) to a user or a Lead queue, resolved in bulk. Missing or inactive assignees are skipped instead of throwing. 15 Apex test methods, including a 200-lead bulk test.        |
| [lwc-kpi-dashboard](https://github.com/ridanajjari/lwc-kpi-dashboard)                   | Lightning Web Component showing five sales and service KPIs, loaded with `@wire` and refreshed with `refreshApex`. Apex controller uses `WITH USER_MODE`. 5 Jest tests and 7 Apex test methods.                                                                                              |
| [salesforce-api-integration](https://github.com/ridanajjari/salesforce-api-integration) | Apex callout to OpenWeatherMap through a Named Credential and an External Credential (the API key is entered in Setup, not stored in the repo), typed JSON parsing, and a Queueable plus a Flow-invocable action for bulk updates. 16 Apex test methods with `HttpCalloutMock`.              |
| [admin-flow-toolkit](https://github.com/ridanajjari/admin-flow-toolkit)                 | Five Flows, shipped as Draft with fault paths: welcome email, 48h approval reminder, duplicate-email check, Case auto-close via a scheduled path, and Lead inactivity alerts. The committed XML was deployed to and retrieved from an org at API 68.0.                                       |

Test counts are the test methods in each repo. Each repo's README has a Testing section saying what has been run so far.

## How I built it

I kept it simple: React 18 with Vite, Tailwind CSS for styling and lucide-react for icons. There's no backend. The contact form just opens the visitor's email app with the message already filled in.

The content lives in plain data files: the texts in both languages in `src/i18n/`, and experience, projects and skills in `src/data/`. The sections themselves are in `src/components/`, so when something changes in my career I only edit the data files. `npm run lint` runs ESLint and `npm run format` runs Prettier. The CV you download from the site is `public/Rida_Najjari_CV_Salesforce.pdf`.

I checked the layout on phone and desktop sizes. On mobile it looks like this:

<img src="docs/screenshot-mobile-fr.png" alt="Mobile version in French" width="280" />

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` creates the production version in `dist/`.

I host the site on Netlify at [rida-najjari.netlify.app](https://rida-najjari.netlify.app/). The build settings are in `netlify.toml`, and every time I push to `main` the site updates on its own.

## Contact

If you're hiring for a Salesforce consultant, developer or admin role, I'd be happy to talk.

- Website: [rida-najjari.netlify.app](https://rida-najjari.netlify.app/)
- Email: najjaririda6@gmail.com
- LinkedIn: [linkedin.com/in/rida-najjari](https://www.linkedin.com/in/rida-najjari)

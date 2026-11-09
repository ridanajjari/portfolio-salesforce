import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Plug,
  Send,
  Settings,
  Terminal,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

// Site content (EN / FR)

const PROFILE = {
  name: "Rida Najjari",
  email: "najjaririda6@gmail.com",
  linkedin: "https://www.linkedin.com/in/rida-najjari",
  github: "https://github.com/ridanajjari",
  cv: "/Rida_Najjari_CV_Salesforce.pdf",
};

const UI = {
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    hero: {
      badge: "4x Salesforce Certified",
      title: "Salesforce Consultant · Apex / LWC Developer · Administrator",
      pitch:
        "Engineer with nearly 4 years in IT and a dual developer + admin profile: Apex, Lightning Web Components, SOQL, Flow and REST integrations across Sales, Service and Experience Cloud.",
      location: "Paris, France · Open to France & Morocco",
      available: "Open to a permanent role (CDI)",
      download: "Download CV",
      contact: "Get in Touch",
    },
    certs: { title: "Salesforce Certifications" },
    exp: { kicker: "Career", title: "Experience & Education", work: "Experience", edu: "Education", present: "Present" },
    projects: {
      kicker: "Portfolio",
      title: "Salesforce Projects",
      subtitle: "Public code solving real business problems: tested, bulk-safe and deployable.",
      github: "View on GitHub",
      all: "See all repositories on GitHub",
    },
    skills: { kicker: "Toolbox", title: "Skills" },
    contact: {
      kicker: "Contact",
      title: "Let's work together",
      text: "Looking for a Salesforce Consultant, Developer or Administrator? Send me a message and I'll get back to you quickly.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      note: "This opens your email app with the message ready to send.",
      success: "Your email app should now be open. Just hit send!",
      errName: "Please enter your name.",
      errEmail: "Please enter a valid email.",
      errMessage: "Please write at least 10 characters.",
      subject: "Portfolio: message from",
    },
    footer: { built: "Built with React & Tailwind CSS", top: "Back to top" },
  },
  fr: {
    nav: { home: "Accueil", experience: "Parcours", projects: "Projets", skills: "Compétences", contact: "Contact" },
    hero: {
      badge: "4x certifié Salesforce",
      title: "Consultant Salesforce · Développeur Apex / LWC · Administrateur",
      pitch:
        "Ingénieur avec près de 4 ans d'expérience IT et un double profil développeur + administrateur : Apex, Lightning Web Components, SOQL, Flow et intégrations REST sur Sales, Service et Experience Cloud.",
      location: "Paris, France · Mobilité France et Maroc",
      available: "À la recherche d'un CDI",
      download: "Télécharger le CV",
      contact: "Me contacter",
    },
    certs: { title: "Certifications Salesforce" },
    exp: { kicker: "Parcours", title: "Expérience & Formation", work: "Expérience", edu: "Formation", present: "Présent" },
    projects: {
      kicker: "Portfolio",
      title: "Projets Salesforce",
      subtitle: "Du code public qui répond à de vrais besoins métier : testé, bulkifié et déployable.",
      github: "Voir sur GitHub",
      all: "Voir tous les dépôts sur GitHub",
    },
    skills: { kicker: "Boîte à outils", title: "Compétences" },
    contact: {
      kicker: "Contact",
      title: "Travaillons ensemble",
      text: "Vous recherchez un Consultant, Développeur ou Administrateur Salesforce ? Envoyez-moi un message, je vous réponds rapidement.",
      name: "Nom",
      email: "E-mail",
      message: "Message",
      send: "Envoyer",
      note: "Ouvre votre messagerie avec le message prêt à être envoyé.",
      success: "Votre messagerie devrait être ouverte. Il ne reste qu'à envoyer !",
      errName: "Merci d'indiquer votre nom.",
      errEmail: "Merci d'indiquer un e-mail valide.",
      errMessage: "Merci d'écrire au moins 10 caractères.",
      subject: "Portfolio : message de",
    },
    footer: { built: "Réalisé avec React & Tailwind CSS", top: "Haut de page" },
  },
};

const CERTIFICATIONS = [
  { en: "Platform Administrator", fr: "Platform Administrator" },
  { en: "Platform App Builder", fr: "Platform App Builder" },
  { en: "Platform Developer I", fr: "Platform Developer I" },
  { en: "Salesforce Associate", fr: "Salesforce Associate" },
];

const EXPERIENCE = [
  {
    role: { en: "Salesforce Consultant (work-study)", fr: "Consultant Salesforce (alternance)" },
    company: "Vulcain Engineering Group",
    place: "Neuilly-sur-Seine, France",
    period: { en: "Jan 2026", fr: "Janv. 2026" },
    current: true,
    points: {
      en: [
        "Built Lightning Web Components, Apex triggers and classes, Batch jobs and Flow automations on Sales Cloud and Service Cloud.",
        "Administered users, profiles, roles, permission sets and validation rules; ran Change Set deployments across Dev, UAT and Production on my own.",
        "Migrated data with Data Loader and Workbench (insert, update, upsert, delete) with checks before and after each load.",
        "Gathered requirements, wrote technical specs, functional docs and release notes; handled L1–L3 incidents under SLA for multiple clients.",
      ],
      fr: [
        "Développement de Lightning Web Components, triggers et classes Apex, traitements Batch et automatisations Flow sur Sales Cloud et Service Cloud.",
        "Administration des utilisateurs, profils, rôles, permission sets et règles de validation ; déploiements par Change Sets entre Dev, Recette et Production en autonomie.",
        "Migration de données avec Data Loader et Workbench (Insert, Update, Upsert, Delete) avec contrôles avant et après migration.",
        "Recueil des besoins, spécifications techniques, documentation fonctionnelle et notes de version ; traitement des incidents L1–L3 sous SLA en multi-clients.",
      ],
    },
  },
  {
    role: { en: "Technical Support Engineer", fr: "Ingénieur Support Technique" },
    company: "Dell Technologies",
    place: { en: "Hybrid", fr: "Hybride" },
    period: { en: "Sep 2023 – Dec 2025", fr: "Sept. 2023 – Déc. 2025" },
    points: {
      en: [
        "High-volume L1 / L2 support under SLA: diagnosed and resolved system, network, storage and application incidents.",
        "Improved ITSM processes: ticket categorization, escalation routing and resolution times.",
      ],
      fr: [
        "Support L1 / L2 à fort volume sous SLA : diagnostic et résolution d'incidents systèmes, réseau, stockage et applications.",
        "Amélioration des processus ITSM : catégorisation des tickets, routage des escalades, délais de résolution.",
      ],
    },
  },
  {
    role: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
    company: "Sofrecom",
    place: { en: "Rabat, Morocco · Hybrid", fr: "Rabat, Maroc · Hybride" },
    period: { en: "Oct 2022 – Apr 2023", fr: "Oct. 2022 – Avr. 2023" },
    points: {
      en: ["Customer loyalty app for web and mobile (React, React Native): REST APIs, Redux Toolkit, Jest tests."],
      fr: ["Application de fidélisation clients web et mobile (React, React Native) : API REST, Redux Toolkit, tests Jest."],
    },
  },
];

const EDUCATION = [
  {
    degree: { en: "Data Engineer (Master's level, work-study)", fr: "Data Engineer (Bac+5, alternance)" },
    school: "Institut F2i, Paris",
    period: { en: "2025 – 2026 · in progress", fr: "2025 – 2026 · en cours" },
  },
  {
    degree: { en: "Engineering Degree, Computer Science & Networks", fr: "Diplôme d'Ingénieur Informatique et Réseaux (Bac+5)" },
    school: "EMSI, Casablanca",
    period: { en: "2019 – 2022", fr: "2019 – 2022" },
  },
  {
    degree: { en: "BTS, Software Systems Development", fr: "BTS Développement de Systèmes Informatiques" },
    school: "Settat, Morocco",
    period: { en: "2017 – 2019", fr: "2017 – 2019" },
  },
];

const PROJECTS = [
  {
    icon: Zap,
    cloud: "Service Cloud",
    title: { en: "SLA Case Escalation", fr: "Escalade des Cases selon SLA" },
    desc: {
      en: "Scheduled Batch Apex (Schedulable, Database.Stateful) that raises the priority of Cases breaching their SLA: Medium → High after 48h, High → Critical after 24h. Partial-success DML with an error log, plus Chatter and email alerts to owners.",
      fr: "Batch Apex planifié (Schedulable, Database.Stateful) qui escalade la priorité des Cases hors SLA : Medium → High après 48h, High → Critical après 24h. Mise à jour en succès partiel avec journal d'erreurs, alertes Chatter et e-mail.",
    },
    metric: { en: "7 unit tests · bulk 200", fr: "7 tests unitaires · bulk 200" },
    tags: ["Batch Apex", "Schedulable", "Database.Stateful", "Chatter", "Email"],
    repo: "https://github.com/ridanajjari/case-escalation-automation",
  },
  {
    icon: Users,
    cloud: "Sales Cloud",
    title: { en: "Lead Auto-Assignment Engine", fr: "Attribution automatique des Leads" },
    desc: {
      en: "Apex trigger (before insert / before update) built on the Trigger Handler pattern. Routing rules by industry and country live in a Custom Metadata Type, so admins change them without a deployment. Owner is set in the before context: no extra DML.",
      fr: "Trigger Apex (before insert / before update) selon le pattern Trigger Handler. Les règles par secteur et pays sont stockées dans un Custom Metadata Type, modifiables par un administrateur sans déploiement. Propriétaire défini en before : aucun DML supplémentaire.",
    },
    metric: { en: "8 unit tests · bulk 200", fr: "8 tests unitaires · bulk 200" },
    tags: ["Apex Trigger", "Trigger Handler", "Custom Metadata", "SOQL"],
    repo: "https://github.com/ridanajjari/lead-auto-assignment",
  },
  {
    icon: LayoutDashboard,
    cloud: "Lightning Web Components",
    title: { en: "LWC KPI Dashboard", fr: "Tableau de bord KPI en LWC" },
    desc: {
      en: "Lightning Web Component for Home, App and Record pages, backed by an @AuraEnabled Apex controller \"with sharing\". SOQL aggregates (pipeline, lead conversion rate, open cases) load in a single server call, with loading and error states.",
      fr: "Composant LWC (Home, App et Record Page) avec contrôleur Apex @AuraEnabled « with sharing » : agrégats SOQL (pipeline, taux de conversion des leads, cases ouverts) en un seul appel serveur, avec gestion des états de chargement et d'erreur.",
    },
    metric: { en: "5 KPIs · 1 server call", fr: "5 KPI · 1 appel serveur" },
    tags: ["LWC", "Apex", "@AuraEnabled", "SOQL Aggregates"],
    repo: "https://github.com/ridanajjari/lwc-kpi-dashboard",
  },
  {
    icon: Plug,
    cloud: "Integration",
    title: { en: "External REST API Integration", fr: "Intégration REST API externe" },
    desc: {
      en: "Apex HTTP callout through a Named Credential (no hardcoded secrets), JSON parsing, HTTP status handling and typed exceptions, writing the results back to Account records.",
      fr: "Callout HTTP Apex via Named Credential (aucun secret en dur), parsing JSON, gestion des codes HTTP et exceptions typées, mise à jour des Accounts.",
    },
    metric: { en: "Mocks: 200 · 404 · 401 · end-to-end", fr: "Mocks : 200 · 404 · 401 · bout en bout" },
    tags: ["Apex Callout", "Named Credentials", "REST", "JSON", "HttpCalloutMock"],
    repo: "https://github.com/ridanajjari/salesforce-api-integration",
  },
  {
    icon: Workflow,
    cloud: "Flow · Admin",
    title: { en: "Admin Flow Toolkit", fr: "Boîte à outils Flow Admin" },
    desc: {
      en: "Five deployable Flows for common admin needs: welcome email on Account creation, approval reminders, duplicate-email block before save, Case auto-close 72h after resolution and Lead inactivity alerts.",
      fr: "Cinq Flows déployables pour les besoins admin courants : e-mail de bienvenue à la création d'un Account, relances d'approbation, blocage des doublons d'e-mail avant enregistrement, clôture auto des Cases 72h après résolution et alertes d'inactivité des Leads.",
    },
    metric: { en: "5 Flows · zero code", fr: "5 Flows · zéro code" },
    tags: ["Record-Triggered Flow", "Scheduled Flow", "Before Save", "Wait Element"],
    repo: "https://github.com/ridanajjari/admin-flow-toolkit",
  },
];

const SKILLS = [
  {
    icon: Code2,
    title: { en: "Salesforce Development", fr: "Développement Salesforce" },
    items: ["Apex", "Triggers", "Batch Apex", "Schedulable", "Test Classes", "SOQL", "LWC", "Aura", "Visualforce", "Flow", "REST API", "HTTP Callouts", "Named Credentials", "Custom Metadata", "Bulkification", "Governor Limits"],
  },
  {
    icon: Settings,
    title: { en: "Salesforce Administration", fr: "Administration Salesforce" },
    items: {
      en: ["Users & Profiles", "Roles", "Permission Sets", "Sharing Model", "Validation Rules", "Custom Objects & Fields", "Record Types", "Page Layouts", "Lightning App Builder", "Reports & Dashboards", "Sandboxes"],
      fr: ["Utilisateurs & profils", "Rôles", "Permission Sets", "Modèle de partage", "Règles de validation", "Objets & champs personnalisés", "Record Types", "Page Layouts", "Lightning App Builder", "Rapports & tableaux de bord", "Sandbox"],
    },
  },
  {
    icon: Cloud,
    title: { en: "Clouds", fr: "Clouds" },
    items: ["Sales Cloud", "Service Cloud", "Experience Cloud"],
  },
  {
    icon: Database,
    title: { en: "Data & DevOps", fr: "Données & DevOps" },
    items: ["Data Loader", "Workbench", "Salesforce Inspector", "Salesforce CLI (SFDX)", "Change Sets", "Git", "GitHub", "GitLab CI/CD", "Jenkins"],
  },
  {
    icon: Workflow,
    title: { en: "Methods", fr: "Méthodes" },
    items: {
      en: ["Agile Scrum", "Kanban", "Requirements Gathering", "Functional & Technical Specs", "UAT", "ITSM", "SLA"],
      fr: ["Agile Scrum", "Kanban", "Recueil des besoins", "Spécifications fonctionnelles & techniques", "Recette / UAT", "ITSM", "SLA"],
    },
  },
  {
    icon: Terminal,
    title: { en: "Other Tech", fr: "Autres technologies" },
    items: ["JavaScript", "Java", "Spring Boot", "Python", "SQL", "React"],
  },
  {
    icon: Languages,
    title: { en: "Languages", fr: "Langues" },
    items: {
      en: ["French (fluent)", "English (fluent)", "Arabic (native)"],
      fr: ["Français (courant)", "Anglais (courant)", "Arabe (langue maternelle)"],
    },
  },
];

const SECTIONS = ["home", "experience", "projects", "skills", "contact"];

// Helpers

// returns the text in the current language
const pick = (value, lang) => (value && typeof value === "object" && !Array.isArray(value) && "en" in value ? value[lang] : value);

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

// GitHub and LinkedIn logos (not in lucide-react)
function GithubIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

// fade-in on scroll
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-6 motion-safe:opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
      {children}
    </span>
  );
}

// Sections

function Navbar({ t, lang, setLang, active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = () => (
    <div className="flex rounded-full border border-slate-700 p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {["en", "fr"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            lang === l ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-bold text-white" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 text-sm text-white shadow-lg shadow-sky-500/30">
            RN
          </span>
          <span className="hidden sm:inline">{PROFILE.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === id ? "text-sky-400" : "text-slate-400 hover:text-white"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
          <div className="ml-3">
            <LangSwitch />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-800 px-4 pb-4 md:hidden">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 font-medium ${
                active === id ? "bg-slate-800 text-sky-400" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero({ t, lang }) {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      {/* background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-60 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-300">
            <BadgeCheck className="h-4 w-4" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {PROFILE.name.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {PROFILE.name.split(" ")[1]}
            </span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-slate-200 sm:text-xl">{t.hero.title}</p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">{t.hero.pitch}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-sky-400" />
              {t.hero.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {t.hero.available}
            </span>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Download className="h-5 w-5" />
              {t.hero.download}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-sky-500/60 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Mail className="h-5 w-5" />
              {t.hero.contact}
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {[
              { href: PROFILE.github, label: "GitHub", Icon: GithubIcon },
              { href: PROFILE.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-sky-500/50 hover:text-sky-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.certs.title}</p>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.en}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left transition-colors hover:border-sky-500/40"
              >
                <BadgeCheck className="h-6 w-6 shrink-0 text-sky-400" />
                <span className="text-sm font-medium text-slate-200">{pick(c, lang)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience({ t, lang }) {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.exp.kicker} title={t.exp.title} />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Work */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="h-5 w-5 text-sky-400" />
              {t.exp.work}
            </h3>
            <ol className="relative space-y-8 border-l border-slate-800 pl-6 sm:pl-8">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="relative">
                  <span
                    className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 sm:-left-[39px] ${
                      job.current ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" : "bg-slate-600"
                    }`}
                  />
                  <Reveal>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-white">{pick(job.role, lang)}</h4>
                          <p className="text-sm text-sky-300">
                            {job.company} · <span className="text-slate-400">{pick(job.place, lang)}</span>
                          </p>
                        </div>
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                            job.current ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {pick(job.period, lang)}
                          {job.current && ` – ${t.exp.present}`}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {pick(job.points, lang).map((p) => (
                          <li key={p} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500/70" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <GraduationCap className="h-5 w-5 text-sky-400" />
              {t.exp.edu}
            </h3>
            <ol className="relative space-y-6 border-l border-slate-800 pl-6 sm:pl-8">
              {EDUCATION.map((e) => (
                <li key={e.school} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-slate-600 sm:-left-[39px]" />
                  <Reveal>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700">
                      <span className="text-xs font-medium text-slate-500">{pick(e.period, lang)}</span>
                      <h4 className="mt-1 font-semibold text-white">{pick(e.degree, lang)}</h4>
                      <p className="text-sm text-sky-300">{e.school}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ t, lang }) {
  return (
    <section id="projects" className="scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.repo} className="h-full">
                <article className="group relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-[0_0_40px_-8px_rgba(14,165,233,0.45)]">
                                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20 transition-colors group-hover:bg-sky-500/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{p.cloud}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">{pick(p.title, lang)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{pick(p.desc, lang)}</p>

                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {pick(p.metric, lang)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-sky-400 hover:text-white hover:shadow-lg hover:shadow-sky-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <GithubIcon className="h-4 w-4" />
                    {t.projects.github}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            {t.projects.all}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills({ t, lang }) {
  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.skills.kicker} title={t.skills.title} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            const wide = i === 0 ? "lg:col-span-2" : "";
            return (
              <Reveal key={s.title.en} className={wide}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-sky-500/40">
                  <h3 className="flex items-center gap-3 font-semibold text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-500/10 text-sky-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    {pick(s.title, lang)}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {pick(s.items, lang).map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-sky-500/50 hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
    setSent(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.errEmail;
    if (form.message.trim().length < 10) next.message = t.contact.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `${t.contact.subject} ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30";

  const links = [
    { href: `mailto:${PROFILE.email}`, label: "Email", value: PROFILE.email, Icon: Mail },
    { href: PROFILE.linkedin, label: "LinkedIn", value: "linkedin.com/in/rida-najjari", Icon: LinkedinIcon },
    { href: PROFILE.github, label: "GitHub", value: "github.com/ridanajjari", Icon: GithubIcon },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-slate-900/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker={t.contact.kicker} title={t.contact.title} subtitle={t.contact.text} />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-4">
              {links.map(({ href, label, value, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-[0_0_30px_-10px_rgba(14,165,233,0.5)]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-400 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-slate-500">{label}</span>
                    <span className="block truncate font-medium text-white">{value}</span>
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-600 group-hover:text-sky-400" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">
                  {t.contact.name}
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={`${field} ${errors.name ? "border-rose-500" : "border-slate-700"}`}
                  />
                  {errors.name && <span className="mt-1 block text-xs text-rose-400">{errors.name}</span>}
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  {t.contact.email}
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={`${field} ${errors.email ? "border-rose-500" : "border-slate-700"}`}
                  />
                  {errors.email && <span className="mt-1 block text-xs text-rose-400">{errors.email}</span>}
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-slate-300">
                {t.contact.message}
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  className={`${field} resize-y ${errors.message ? "border-rose-500" : "border-slate-700"}`}
                />
                {errors.message && <span className="mt-1 block text-xs text-rose-400">{errors.message}</span>}
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 hover:shadow-sky-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {t.contact.send}
              </button>

              <p className="mt-3 text-xs text-slate-500" aria-live="polite">
                {sent ? <span className="text-emerald-300">{t.contact.success}</span> : t.contact.note}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-slate-800 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · {t.footer.built}
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 hover:text-sky-400">
          {t.footer.top}
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}

// App

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [active, setActive] = useState("home");
  const t = UI[lang];

  // save language choice
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      
    }
  }, [lang]);

  // highlight active section in the navbar
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-300 selection:bg-sky-500/30 selection:text-white">
      <Navbar t={t} lang={lang} setLang={setLang} active={active} />
      <main>
        <Hero t={t} lang={lang} />
        <Experience t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

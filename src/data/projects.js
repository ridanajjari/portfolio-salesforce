import { LayoutDashboard, Plug, Users, Workflow, Zap } from "lucide-react";

export const PROJECTS = [
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
      en: 'Lightning Web Component for Home, App and Record pages, backed by an @AuraEnabled Apex controller "with sharing". SOQL aggregates (pipeline, lead conversion rate, open cases) load in a single server call, with loading and error states.',
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

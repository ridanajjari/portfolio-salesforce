import { LayoutDashboard, Plug, Users, Workflow, Zap } from "lucide-react";

export const PROJECTS = [
  {
    icon: Zap,
    cloud: "Service Cloud",
    title: { en: "SLA Case Escalation", fr: "Escalade des Cases selon SLA" },
    desc: {
      en: "Hourly Batch Apex (Schedulable, Database.Stateful) that raises the priority of open Cases breaching their SLA. Thresholds live in Custom Metadata (Medium → High after 48h, High → Critical after 24h) and age is measured from the last escalation, so a Case is never escalated twice in a row. Chatter post and owner email only for updates that succeeded.",
      fr: "Batch Apex horaire (Schedulable, Database.Stateful) qui escalade la priorité des Cases ouverts hors SLA. Seuils dans un Custom Metadata Type (Medium → High après 48h, High → Critical après 24h), âge mesuré depuis la dernière escalade pour éviter la double escalade. Post Chatter et e-mail au propriétaire uniquement pour les mises à jour réussies.",
    },
    metric: {
      en: "15/15 Apex tests passing · 88% / 100% coverage",
      fr: "15/15 tests Apex réussis · couverture 88 % / 100 %",
    },
    tags: ["Batch Apex", "Schedulable", "Custom Metadata", "Partial-success DML", "Chatter", "Email"],
    repo: "https://github.com/ridanajjari/case-escalation-automation",
  },
  {
    icon: Users,
    cloud: "Sales Cloud",
    title: { en: "Lead Auto-Assignment Engine", fr: "Attribution automatique des Leads" },
    desc: {
      en: "Before-save Lead trigger built on the Trigger Handler pattern. Routing rules by industry and country live in Custom Metadata and are matched most specific first, assigning to a user (by username) or a Lead queue. Assignees are resolved in bulk with cached queries; inactive or unknown assignees are skipped instead of throwing.",
      fr: "Trigger Lead en before-save selon le pattern Trigger Handler. Règles par secteur et pays dans un Custom Metadata Type, appliquées de la plus spécifique à la plus générale, vers un utilisateur (par username) ou une file d'attente Lead. Résolution des propriétaires en bulk avec requêtes mises en cache ; les propriétaires inactifs ou inconnus sont ignorés sans erreur.",
    },
    metric: {
      en: "15/15 Apex tests passing · 93% / 100% coverage · bulk 200",
      fr: "15/15 tests Apex réussis · couverture 93 % / 100 % · bulk 200",
    },
    tags: ["Apex Trigger", "Trigger Handler", "Custom Metadata", "SOQL", "Queues"],
    repo: "https://github.com/ridanajjari/lead-auto-assignment",
  },
  {
    icon: LayoutDashboard,
    cloud: "Lightning Web Components",
    title: { en: "LWC KPI Dashboard", fr: "Tableau de bord KPI en LWC" },
    desc: {
      en: 'Lightning Web Component for Home and App pages showing five sales and service KPIs. Data loads with @wire and the Refresh button uses refreshApex; "Last updated" shows the server timestamp. Apex controller with sharing and WITH USER_MODE, Custom Labels, lightning-formatted-number and SLDS styling hooks.',
      fr: "Composant LWC (Home et App Page) affichant cinq KPI ventes et service. Données chargées via @wire, bouton Actualiser avec refreshApex ; « Dernière mise à jour » affiche l'horodatage serveur. Contrôleur Apex with sharing et WITH USER_MODE, Custom Labels, lightning-formatted-number et styling hooks SLDS.",
    },
    metric: {
      en: "7/7 Apex tests · 100% coverage · 5 Jest tests",
      fr: "7/7 tests Apex · couverture 100 % · 5 tests Jest",
    },
    tags: ["LWC", "@wire", "refreshApex", "Jest", "USER_MODE", "Custom Labels"],
    repo: "https://github.com/ridanajjari/lwc-kpi-dashboard",
  },
  {
    icon: Plug,
    cloud: "Integration",
    title: { en: "External REST API Integration", fr: "Intégration REST API externe" },
    desc: {
      en: "Apex HTTP callout through a Named Credential, with the API key kept in a protected custom setting entered in Setup, never in code or in the repo. Typed JSON parsing with null guards, timeout and error handling, and a Queueable plus a Flow-invocable action that update Accounts in bulk.",
      fr: "Callout HTTP Apex via une Named Credential, avec la clé API dans un custom setting protégé saisi dans Setup, jamais dans le code ni dans le dépôt. Parsing JSON typé avec contrôles de null, gestion des timeouts et erreurs, Queueable et action invocable depuis un Flow pour mettre à jour les Accounts en masse.",
    },
    metric: { en: "18/18 Apex tests passing · 96–100% coverage", fr: "18/18 tests Apex réussis · couverture 96–100 %" },
    tags: ["Apex Callout", "Named Credentials", "HttpCalloutMock", "Queueable", "InvocableMethod"],
    repo: "https://github.com/ridanajjari/salesforce-api-integration",
  },
  {
    icon: Workflow,
    cloud: "Flow · Admin",
    title: { en: "Admin Flow Toolkit", fr: "Boîte à outils Flow Admin" },
    desc: {
      en: "Five Flows for common admin needs, each with fault paths and shipped as Draft: welcome email on Account creation, 48h approval reminders, duplicate-email block before save, Case auto-close 72h after resolution via a scheduled path, and weekly-capped Lead inactivity alerts.",
      fr: "Cinq Flows pour les besoins admin courants, avec chemins d'erreur et livrés en brouillon : e-mail de bienvenue à la création d'un Account, relances d'approbation après 48h, blocage des doublons d'e-mail avant enregistrement, clôture auto des Cases 72h après résolution via un chemin planifié, et alertes d'inactivité des Leads limitées à une par semaine.",
    },
    metric: { en: "5 Flows · deployed & retrieved at API 68.0", fr: "5 Flows · déployés et récupérés en API 68.0" },
    tags: ["Record-Triggered Flow", "Scheduled Flow", "Scheduled Path", "Before Save", "Fault Paths"],
    repo: "https://github.com/ridanajjari/admin-flow-toolkit",
  },
];

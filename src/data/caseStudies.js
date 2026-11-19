// Case study text for each project, keyed by repository URL.
// `built` restates what the repository actually contains; nothing here is a client result.

export const CASE_STUDIES = {
  "https://github.com/ridanajjari/case-escalation-automation": {
    problem: {
      en: "Open cases that breach their SLA keep the same priority until someone notices, so the most urgent customers wait the longest.",
      fr: "Les cases ouverts hors SLA gardent la même priorité tant que personne ne s'en aperçoit : les clients les plus urgents attendent le plus longtemps.",
    },
    built: {
      en: [
        "An hourly Batch Apex job (Schedulable, Database.Stateful) scans open Cases.",
        "Thresholds live in Custom Metadata: Medium → High after 48h, High → Critical after 24h.",
        "Age is measured from the last escalation, so a Case is never escalated twice in a row.",
        "Partial-success DML: a Chatter post and an owner email go out only for updates that succeeded.",
      ],
      fr: [
        "Un Batch Apex horaire (Schedulable, Database.Stateful) parcourt les Cases ouverts.",
        "Seuils dans un Custom Metadata Type : Medium → High après 48h, High → Critical après 24h.",
        "L'âge est mesuré depuis la dernière escalade : jamais de double escalade.",
        "DML en succès partiel : post Chatter et e-mail au propriétaire uniquement pour les mises à jour réussies.",
      ],
    },
  },
  "https://github.com/ridanajjari/lead-auto-assignment": {
    problem: {
      en: "Assigning new leads by hand is slow and inconsistent, and changing the routing rules normally means asking a developer for a deployment.",
      fr: "Attribuer les nouveaux leads à la main est lent et inégal, et modifier les règles de routage demande en général un déploiement par un développeur.",
    },
    built: {
      en: [
        "A before-save Lead trigger built on the Trigger Handler pattern.",
        "Routing rules by industry and country stored in Custom Metadata and matched most specific first.",
        "Leads go to a user (by username) or to a Lead queue.",
        "Assignees are resolved in bulk with cached queries; inactive or unknown assignees are skipped instead of throwing.",
      ],
      fr: [
        "Un trigger Lead en before-save selon le pattern Trigger Handler.",
        "Règles par secteur et pays dans un Custom Metadata Type, appliquées de la plus spécifique à la plus générale.",
        "Attribution à un utilisateur (par username) ou à une file d'attente Lead.",
        "Résolution des propriétaires en bulk avec requêtes mises en cache ; propriétaires inactifs ou inconnus ignorés sans erreur.",
      ],
    },
  },
  "https://github.com/ridanajjari/lwc-kpi-dashboard": {
    problem: {
      en: "Sales and service managers want their key numbers on the home page, without opening several reports.",
      fr: "Les managers ventes et service veulent leurs chiffres clés sur la page d'accueil, sans ouvrir plusieurs rapports.",
    },
    built: {
      en: [
        "A Lightning Web Component for Home and App pages showing five sales and service KPIs.",
        "Data loads with @wire; the Refresh button uses refreshApex and “Last updated” shows the server timestamp.",
        "Apex controller declared with sharing and querying WITH USER_MODE.",
        "Custom Labels, lightning-formatted-number and SLDS styling hooks.",
      ],
      fr: [
        "Un Lightning Web Component (Home et App Page) affichant cinq KPI ventes et service.",
        "Données chargées via @wire ; bouton Actualiser avec refreshApex et « Dernière mise à jour » sur l'horodatage serveur.",
        "Contrôleur Apex with sharing, requêtes WITH USER_MODE.",
        "Custom Labels, lightning-formatted-number et styling hooks SLDS.",
      ],
    },
  },
  "https://github.com/ridanajjari/salesforce-api-integration": {
    problem: {
      en: "Accounts need data from an external REST API, without exposing the API key and without breaking when the API fails or times out.",
      fr: "Les Accounts ont besoin de données d'une API REST externe, sans exposer la clé API et sans casser quand l'API échoue ou ne répond pas.",
    },
    built: {
      en: [
        "An Apex HTTP callout through a Named Credential.",
        "The API key sits in a protected custom setting entered in Setup, never in code or in the repo.",
        "Typed JSON parsing with null guards, plus timeout and error handling.",
        "A Queueable and a Flow-invocable action that update Accounts in bulk.",
      ],
      fr: [
        "Un callout HTTP Apex via une Named Credential.",
        "Clé API dans un custom setting protégé saisi dans Setup, jamais dans le code ni dans le dépôt.",
        "Parsing JSON typé avec contrôles de null, gestion des timeouts et des erreurs.",
        "Un Queueable et une action invocable depuis un Flow pour mettre à jour les Accounts en masse.",
      ],
    },
  },
  "https://github.com/ridanajjari/admin-flow-toolkit": {
    problem: {
      en: "Everyday admin requests such as reminders, duplicate checks and auto-closing records should be solved with clicks, not code.",
      fr: "Les demandes admin du quotidien (relances, contrôle des doublons, clôture automatique) doivent se régler en clics, pas en code.",
    },
    built: {
      en: [
        "Welcome email when an Account is created.",
        "Approval reminders after 48h and weekly-capped Lead inactivity alerts.",
        "Duplicate-email block before save.",
        "Case auto-close 72h after resolution through a scheduled path.",
        "Every Flow has fault paths and ships as Draft.",
      ],
      fr: [
        "E-mail de bienvenue à la création d'un Account.",
        "Relances d'approbation après 48h et alertes d'inactivité des Leads limitées à une par semaine.",
        "Blocage des doublons d'e-mail avant enregistrement.",
        "Clôture automatique des Cases 72h après résolution via un chemin planifié.",
        "Chaque Flow a ses chemins d'erreur et est livré en brouillon.",
      ],
    },
  },
};

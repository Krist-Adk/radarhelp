/* RadarHelp content model.
 * Every page is rendered from this file. To add a guide, add a line to
 * ARTICLES; it appears in its module hub, in search, and in every workflow
 * whose steps point at its id. Cross-links ("Where this shows up",
 * "Part of these workflows", "Configured in") are generated from LINKS,
 * WORKFLOWS and each module's cfg list.
 */
(function () {
  var ROLES = {
    admin:   { name: 'Admin', desc: 'Full access. Sets up the organisation and owns Settings and Customisation.' },
    auditor: { name: 'Quality Auditor', desc: 'Read-only access for audit and review.' },
    trainer: { name: 'Trainer/Assessor', desc: 'Own documents and assigned courses.' },
    coord:   { name: 'Training Coordinator', desc: 'Manages workforce, training assignments and course delivery.' }
  };

  // cat: which Help Guides category the module sits under
  var MODULES = [
    { id: 'dashboard', cat: 'features', name: 'Dashboard',
      blurb: 'The landing page after login. Every widget is a doorway into another module.', cfg: ['cust-dashboard-widgets'] },
    { id: 'qms', cat: 'features', name: 'Document Management (QMS)',
      blurb: 'Your quality management system: the Document Repository, uploading and mapping documents to standards, versions, compliance frameworks, the Compliance Dashboard and audit exports.', cfg: ['cust-compliance-health', 'cust-document-types'],
      updated: '2026-10-15' },
    { id: 'programs', cat: 'features', name: 'Program Management', ai: true,
      blurb: 'Courses, units, AI-assisted validation and the TAS Builder.', cfg: ['cust-course-risk-weights', 'cust-frequency-bands', 'cust-tas-templates'],
      updated: '2026-10-21' },
    { id: 'cir', cat: 'features', name: 'Continuous Improvement Register',
      blurb: 'The central register of improvement items. Most modules feed into it.', cfg: ['cust-cir-settings'] },
    { id: 'workforce', cat: 'features', name: 'Workforce Management', ai: true,
      blurb: 'Staff profiles, documents, course and unit assignments, evidence maps, PD, the Workforce Dashboard, Teams, Document Checklists, search and workforce reports.',
      updated: '2026-10-13' },
    { id: 'users', cat: 'features', name: 'Users, Roles & Teams',
      blurb: 'Invitations, user roles and team configuration. Used together with Workforce Management.', cfg: ['mfa-set-organisation'] },
    { id: 'risk', cat: 'features', name: 'Risk Assessment',
      blurb: 'Your RTO profile, organisational risk score and validation frequency, the risk register with Likelihood × Consequence scoring, treatment plans, Escalation Manager reports, Excel exports and version history.', cfg: ['cust-risk-categories', 'cust-course-risk-weights'],
      updated: '2026-10-12' },
    { id: 'feedback', cat: 'features', name: 'Complaints & Suggestions',
      blurb: 'Embeddable feedback, complaint and conflict of interest forms. Submissions become improvement items.' },
    { id: 'events', cat: 'features', name: 'Events',
      blurb: 'Your calendar, and the Scheduler for consultations and unit validations.' },
    { id: 'pd', cat: 'features', name: 'Professional Development',
      blurb: 'PD appears in Events, on each staff PD calendar and in PD settings. This hub brings it together.', cfg: ['pd-configure'] },
    { id: 'integrations', cat: 'configuration', name: 'Integrations (aXcelerate)',
      blurb: 'Import courses, units and staff from aXcelerate.' },
    { id: 'security', cat: 'configuration', name: 'Security & MFA',
      blurb: 'Organisation-wide MFA enforcement and each user’s MFA status.' },
    { id: 'custom', cat: 'configuration', name: 'Customisation',
      blurb: 'Organisation-wide settings that change how other modules score, display and remind.' },
  ];

  var RISK = ['admin', 'auditor', 'coord']; // Trainer/Assessors have no access to the risk register or organisational documents (QMS)
  var ALL = ['admin', 'auditor', 'trainer', 'coord'], MGR = ['admin', 'coord'], ADM = ['admin'];

  // [module, id, type, title, roles, minutes]
  var LIST = [

    ['dashboard', 'dash-tour', 'Overview', 'Tour the dashboard', ALL, 4],
    ['dashboard', 'dash-widgets', 'Concept', 'What each widget measures', ALL, 5],
    ['dashboard', 'dash-open-record', 'How-to', 'Open the record behind a widget', ALL, 2],
    ['dashboard', 'dash-reference', 'Reference', 'Dashboard widgets and their source modules', ALL, 3],

    ['qms', 'qms-overview', 'Overview', 'The Document Management page', RISK, 5],
    ['qms', 'upload-and-map-a-document', 'How-to', 'Upload a document and map it to standards', MGR, 6],
    ['qms', 'qms-edit-download-delete', 'How-to', 'Open, edit, download or delete a document', MGR, 4],
    ['qms', 'qms-new-version', 'How-to', 'Upload a new version and read version history', MGR, 4],
    ['qms', 'qms-frameworks', 'Concept', 'Frameworks, areas and standards', RISK, 5],
    ['qms', 'qms-custom-framework', 'How-to', 'Create a custom framework', ADM, 8],
    ['qms', 'qms-compliance-dashboard', 'Concept', 'Read the Compliance Dashboard', RISK, 6],
    ['qms', 'qms-health', 'Concept', 'How Policy Compliance Health is calculated', RISK, 3],
    ['qms', 'qms-export', 'How-to', 'Export the audit trail and documents', RISK, 3],

    ['programs', 'prog-overview', 'Overview', 'The Program Management page', ALL, 8],
    ['programs', 'prog-add-course', 'How-to', 'Add a course', MGR, 5],
    ['programs', 'prog-course-risk', 'Concept', 'Course risk and validation frequency', MGR, 5],
    ['programs', 'prog-add-units', 'How-to', 'Add and manage a course’s units', MGR, 6],
    ['programs', 'prog-schedule-validation', 'How-to', 'Schedule, start or continue a unit validation', ['admin', 'coord', 'trainer'], 8],
    ['programs', 'prog-validate-unit', 'How-to', 'Upload files and navigate the unit validation', ['admin', 'coord', 'trainer'], 5],
    ['programs', 'prog-validation-phases', 'How-to', 'Work through the four validation phases', ['admin', 'coord', 'trainer'], 15],
    ['programs', 'prog-complete-validation', 'How-to', 'Record a validation completed outside RTO Radar', MGR, 3],
    ['programs', 'prog-validation-history', 'How-to', 'View, export and share unit validations', ['admin', 'coord', 'trainer'], 4],
    ['programs', 'prog-assessment-judgement', 'How-to', 'Record an assessment judgement', ['admin', 'coord', 'trainer'], 5],
    ['programs', 'prog-industry-consultation', 'How-to', 'Record an industry consultation', MGR, 5],
    ['programs', 'prog-tas-overview', 'Concept', 'How the TAS Builder works', MGR, 6],
    ['programs', 'prog-master-tas', 'How-to', 'Build a Master TAS', MGR, 20],
    ['programs', 'prog-tas-review', 'How-to', 'Submit, review and approve a TAS', MGR, 6],
    ['programs', 'prog-cohort-tas', 'How-to', 'Create a Cohort TAS', MGR, 5],
    ['programs', 'prog-archive', 'How-to', 'Archive and restore courses', MGR, 3],

    ['cir', 'cir-overview', 'Overview', 'What the CIR is for', ALL, 3],
    ['cir', 'cir-sources', 'Concept', 'Where improvement items come from', ALL, 4],
    ['cir', 'cir-add-item', 'How-to', 'Add an ad hoc improvement item', ALL, 3],
    ['cir', 'cir-assign-track', 'How-to', 'Assign, prioritise and track an item', MGR, 4],
    ['cir', 'cir-statuses', 'Concept', 'Item statuses: open, in progress, completed, overdue', ALL, 2],
    ['cir', 'cir-export', 'How-to', 'Export CI records for an audit or governance report', ['admin', 'auditor', 'coord'], 3],
    ['cir', 'cir-import', 'How-to', 'Bulk import items from CSV or Excel', ADM, 5],

    ['workforce', 'wf-overview', 'Overview', 'The Workforce Management page', MGR, 5],
    ['workforce', 'wf-assign-units', 'How-to', 'Assign courses and units to a trainer', MGR, 5],
    ['workforce', 'wf-checklist', 'How-to', 'Set up a document checklist for a role', MGR, 6],
    ['workforce', 'wf-documents', 'How-to', 'Upload and manage staff documents', MGR, 6],
    ['workforce', 'wf-description', 'Concept', 'Write a good document description', MGR, 4],
    ['workforce', 'wf-evidence-map', 'How-to', 'Create an evidence map for a trainer', MGR, 10],
    ['workforce', 'wf-evidence-review', 'How-to', 'Review evidence maps from trainers', MGR, 5],
    ['workforce', 'wf-pd', 'How-to', 'Track and assign professional development', MGR, 5],
    ['workforce', 'wf-dashboard', 'Concept', 'The Workforce Dashboard', MGR, 5],
    ['workforce', 'wf-teams', 'Concept', 'The compliance governance chart and teams', MGR, 5],
    ['workforce', 'wf-export', 'Reference', 'Export workforce reports', MGR, 2],

    ['users', 'users-invite', 'How-to', 'Invite a new user', ADM, 3],
    ['users', 'users-roles', 'Concept', 'Built-in roles and their permissions', ALL, 4],
    ['users', 'users-custom-role', 'How-to', 'Create a custom role', ADM, 5],
    ['users', 'users-teams', 'How-to', 'Create teams and set parent teams', ADM, 5],

    ['risk', 'risk-overview', 'Overview', 'The Risk Register Overview', RISK, 5],
    ['risk', 'risk-rto-profile', 'How-to', 'Update your RTO profile', ADM, 5],
    ['risk', 'risk-add-score', 'How-to', 'Add risks and treatment plans in the comprehensive assessment', MGR, 15],
    ['risk', 'risk-treatment', 'Concept', 'Treatment plans', RISK, 5],
    ['risk', 'risk-heatmap', 'Concept', 'Read the risk heatmap', RISK, 3],
    ['risk', 'risk-factors', 'How-to', 'Browse your risk factors', RISK, 5],
    ['risk', 'risk-provider-factors', 'Concept', 'Risk scores and validation frequency', RISK, 6],
    ['risk', 'risk-escalation-manager', 'Concept', 'The Escalation Manager', RISK, 4],
    ['risk', 'risk-escalation', 'How-to', 'Email and schedule risk reports to your Escalation Manager', ADM, 4],
    ['risk', 'risk-export', 'How-to', 'Export the risk register to Excel', RISK, 4],
    ['risk', 'risk-versions', 'How-to', 'Save, view and export risk register versions', RISK, 6],

    ['feedback', 'fb-overview', 'Overview', 'How feedback forms work', ALL, 3],
    ['feedback', 'fb-create-form', 'How-to', 'Create a feedback, complaint or conflict of interest form', MGR, 6],
    ['feedback', 'fb-embed', 'How-to', 'Embed a form on your website', ADM, 4],
    ['feedback', 'fb-to-cir', 'How-to', 'Turn a submission into an improvement item', MGR, 3],

    ['events', 'ev-overview', 'Overview', 'The calendar and scheduler', ALL, 3],
    ['events', 'ev-consultation', 'How-to', 'Schedule a consultation', MGR, 3],
    ['events', 'ev-validation', 'How-to', 'Schedule a unit validation', MGR, 3],

    ['pd', 'pd-overview', 'Overview', 'PD across RTO Radar', ALL, 3],
    ['pd', 'pd-enrol', 'How-to', 'Browse, enrol or register interest in PD', ALL, 3],
    ['pd', 'pd-assign', 'How-to', 'Assign PD to a staff member', MGR, 3],
    ['pd', 'pd-export', 'How-to', 'Export the PD calendar to CSV', MGR, 2],
    ['pd', 'pd-configure', 'How-to', 'Configure PD sessions and providers', ADM, 6],
    ['pd', 'pd-paid-evidence', 'Concept', 'Paid PD and evidence requirements', ADM, 4],

    ['integrations', 'ax-what-imports', 'Concept', 'What imports from aXcelerate', ADM, 3],
    ['integrations', 'ax-tokens', 'How-to', 'Find your API Token and Web Service Token', ADM, 3],
    ['integrations', 'connect-axcelerate', 'How-to', 'Connect aXcelerate', ADM, 5],

    ['security', 'mfa-levels', 'Concept', 'MFA enforcement levels', ADM, 3],
    ['security', 'mfa-set-organisation', 'How-to', 'Set organisation MFA', ADM, 3],
    ['security', 'mfa-user-status', 'How-to', 'Check a user’s MFA status', ADM, 2],

    ['custom', 'cust-course-risk-weights', 'Concept', 'Course risk score weights and bands', ADM, 6],
    ['custom', 'cust-frequency-bands', 'Concept', 'Validation frequency bands and escalation', ADM, 6],
    ['custom', 'cust-risk-categories', 'How-to', 'Configure risk categories and register versioning', ADM, 4],
    ['custom', 'cust-compliance-health', 'How-to', 'Set compliance health weighting', ADM, 3],
    ['custom', 'cust-document-types', 'How-to', 'Add document types', ADM, 3],
    ['custom', 'cust-dashboard-widgets', 'How-to', 'Choose dashboard widgets and Teams visibility', ADM, 3],
    ['custom', 'cust-cir-settings', 'How-to', 'Set CIR sources, templates and reminders', ADM, 5],
    ['custom', 'cust-tas-templates', 'How-to', 'Customise TAS templates', ADM, 5],

  ];

  // Troubleshooting: which guides fix each symptom
  var FIXES = {};

  // Related guides shown at the end of a feature guide. Guides not listed fall back to their
  // module's settings guides and workflow neighbours.
  var RELATED = {
    'prog-overview': ['prog-add-course', 'prog-add-units', 'prog-validate-unit', 'prog-master-tas'],
    'prog-add-course': ['prog-course-risk', 'prog-add-units'],
    'prog-course-risk': ['risk-provider-factors', 'cust-frequency-bands', 'cust-course-risk-weights', 'prog-schedule-validation'],
    'prog-add-units': ['prog-course-risk', 'prog-validate-unit', 'wf-assign-units'],
    'prog-schedule-validation': ['prog-validate-unit', 'prog-course-risk', 'prog-add-units'],
    'prog-validate-unit': ['prog-validation-phases', 'prog-schedule-validation', 'prog-validation-history'],
    'prog-validation-phases': ['prog-validate-unit', 'prog-validation-history', 'cir-overview'],
    'prog-complete-validation': ['prog-validation-history', 'prog-validate-unit', 'prog-schedule-validation'],
    'prog-validation-history': ['prog-validation-phases', 'prog-archive'],
    'prog-assessment-judgement': ['prog-validation-phases', 'prog-validation-history', 'cir-overview'],
    'prog-industry-consultation': ['prog-master-tas', 'cir-overview', 'prog-add-units'],
    'prog-tas-overview': ['prog-master-tas', 'prog-tas-review', 'cust-tas-templates'],
    'prog-master-tas': ['prog-tas-review', 'prog-cohort-tas', 'cust-tas-templates'],
    'prog-tas-review': ['prog-master-tas', 'prog-cohort-tas', 'cir-overview'],
    'prog-cohort-tas': ['prog-master-tas', 'prog-tas-review', 'prog-tas-overview'],
    'prog-archive': ['prog-overview', 'prog-validation-history'],
    'qms-overview': ['upload-and-map-a-document', 'qms-compliance-dashboard', 'qms-frameworks', 'qms-export'],
    'upload-and-map-a-document': ['qms-frameworks', 'qms-edit-download-delete', 'qms-compliance-dashboard', 'cust-document-types'],
    'qms-edit-download-delete': ['qms-new-version', 'upload-and-map-a-document', 'qms-export'],
    'qms-new-version': ['qms-edit-download-delete', 'qms-export', 'qms-compliance-dashboard'],
    'qms-frameworks': ['qms-custom-framework', 'upload-and-map-a-document', 'qms-compliance-dashboard'],
    'qms-custom-framework': ['qms-frameworks', 'upload-and-map-a-document', 'qms-compliance-dashboard'],
    'qms-compliance-dashboard': ['qms-health', 'upload-and-map-a-document', 'qms-frameworks', 'cust-compliance-health'],
    'qms-health': ['qms-compliance-dashboard', 'cust-compliance-health', 'qms-new-version'],
    'qms-export': ['qms-new-version', 'qms-compliance-dashboard', 'risk-export'],
    'wf-overview': ['wf-assign-units', 'wf-dashboard', 'users-roles'],
    'wf-documents': ['wf-checklist', 'wf-evidence-map', 'wf-dashboard', 'cust-document-types'],
    'wf-assign-units': ['wf-evidence-map', 'wf-dashboard', 'prog-add-units', 'wf-checklist'],
    'wf-description': ['wf-documents', 'wf-evidence-map', 'wf-evidence-review'],
    'wf-evidence-map': ['wf-evidence-review', 'wf-description', 'wf-dashboard', 'wf-assign-units'],
    'wf-evidence-review': ['wf-evidence-map', 'wf-documents', 'wf-dashboard', 'wf-description'],
    'wf-pd': ['pd-assign', 'pd-configure', 'wf-dashboard', 'wf-export'],
    'wf-dashboard': ['wf-evidence-review', 'wf-documents', 'wf-checklist', 'dash-widgets'],
    'wf-teams': ['users-teams', 'users-roles', 'wf-overview'],
    'wf-checklist': ['wf-documents', 'wf-overview', 'cir-overview', 'cust-document-types'],
    'wf-export': ['wf-pd', 'wf-checklist', 'wf-documents'],
    'risk-overview': ['risk-provider-factors', 'prog-course-risk', 'cir-overview', 'dash-widgets'],
    'risk-rto-profile': ['risk-provider-factors', 'risk-escalation', 'cust-frequency-bands', 'users-roles'],
    'risk-add-score': ['risk-treatment', 'risk-heatmap', 'cust-risk-categories', 'cir-assign-track'],
    'risk-treatment': ['risk-add-score', 'cir-assign-track', 'cir-statuses', 'risk-export'],
    'risk-heatmap': ['risk-add-score', 'risk-export', 'dash-widgets'],
    'risk-factors': ['risk-add-score', 'risk-rto-profile', 'risk-escalation'],
    'risk-provider-factors': ['prog-course-risk', 'cust-frequency-bands', 'cust-course-risk-weights', 'ev-validation'],
    'risk-escalation-manager': ['risk-rto-profile', 'risk-escalation', 'risk-treatment', 'users-teams'],
    'risk-escalation': ['risk-escalation-manager', 'risk-rto-profile', 'risk-factors'],
    'risk-export': ['risk-versions', 'risk-heatmap', 'cir-export'],
    'risk-versions': ['risk-export', 'cust-risk-categories', 'cir-export'],
  };

  // Written guides. Everything else shows as "being written" but keeps all its links.
  var BODIES = {
    'qms-overview':
      '<p class="lead">Document Management is your RTO’s quality management system (QMS). Your policies, procedures, forms, TAS and other compliance documents live in one repository, each with an owner, a reviewer and review reminders, and each mapped to the standards it evidences.</p>' +
      '<h2 id="open">Open Document Management</h2>' +
      '<p>Select <b>Document Management</b> on your navigation bar.</p>' +
      '<figure class="shot" data-marks="0.5,35.4,15.2,7.1,oval,#"><img src="assets/img/qms-page.png" alt="RTO Radar with Document Management circled in the navigation bar." loading="lazy"><figcaption>Select Document Management in the navigation bar.</figcaption></figure>' +
      '<p>Along the top of the page are three buttons, with the summary cards (4) beneath them:</p>' +
      '<figure class="shot" data-marks="64.6,25.8,7,9.6,zone,#; 68.1,19.5,#1; 72.1,25.8,12.6,9.6,zone,#; 78.4,19.5,#2; 85.3,25.8,11.3,9.6,zone,#; 91,19.5,#3; 19.7,48.1,76.8,46.6,zone,#4"><img src="assets/img/qms-page.png" alt="Document Management (QMS). Export (marker 1), Manage Frameworks (marker 2) and Upload Document (marker 3) are outlined. Marker 4 outlines the four summary cards: Total Documents 4, Approved 3, Review Due 2 and Drafts 0." loading="lazy"><figcaption>Export (1), Manage Frameworks (2), Upload Document (3) and the summary cards (4).</figcaption></figure>' +
      '<ul>' +
        '<li><b>Export</b> (1) downloads your audit trail or all your documents. See <a href="article.html?id=qms-export">Export the audit trail and documents</a>.</li>' +
        '<li><b>Manage Frameworks</b> (2) shows the compliance frameworks your documents are mapped to. See <a href="article.html?id=qms-frameworks">Frameworks, areas and standards</a>.</li>' +
        '<li><b>Upload Document</b> (3) adds a document to the repository. See <a href="article.html?id=upload-and-map-a-document">Upload a document and map it to standards</a>.</li>' +
        '<li><b>Summary cards</b> (4) count your documents in terms of <b>Total</b>, <b>Approved</b>, <b>Review Due</b> and <b>Drafts</b>. Select each card to view them.</li>' +
      '</ul>' +
      '<h2 id="tabs">Two tabs</h2>' +
      '<p>Below the summary cards are two tabs. Select a tab below to see each one.</p>' +
      '<div class="xl-book" data-hint="1">' +
        '<div class="xl-bar" role="tablist" aria-label="Document Management tabs">' +
          '<button type="button" role="tab" aria-selected="true">Documents</button>' +
          '<button type="button" role="tab" aria-selected="false">Compliance Dashboard</button>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel">' +
          '<p><b>Documents</b> holds the <b>Document Repository</b>, the list of all your documents, with each one’s type, status, compliance status, review date, reviewer and the standards it’s mapped to.</p>' +
          '<figure class="shot"><img src="assets/img/qms-repo.png" alt="The Document Repository, with Filters, Search documents and Select Columns. It lists documents such as Master TAS Approved, a TAS; Marketing, Advertising and Nationally Recognised Training Products, a draft policy under review; Records Management and Privacy; Internal Audit and Compliance, a procedure; and Continuous Improvement, Third-Party Arrangements and Staff Professional Development policies, each with its status, compliance, review date, reviewer and SRTO 2025 standards." loading="lazy"><figcaption>The Document Repository on the Documents tab.</figcaption></figure>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel" hidden>' +
          '<p>The <b>Compliance Dashboard</b> shows how well your documents cover each framework. See <a href="article.html?id=qms-compliance-dashboard">Read the Compliance Dashboard</a>.</p>' +
          '<p>This example shows a healthy compliance policy: all 23 standards of the Standards for RTOs 2025 are covered, with none missing, giving 100% coverage, a Policy Compliance Health score of 100 (Excellent), and no compliance alerts, with every review on track.</p>' +
          '<figure class="shot"><img src="assets/img/qms-dashboard.png" alt="The Compliance Dashboard for the Standards for RTOs 2025, with a VRQA Regulatory Requirements tab beside it. Total Standards 23, Covered 23 and Missing 0. Standards Coverage shows 100% coverage, Policy Compliance Health shows 100, Excellent, and Coverage Progress shows 100% overall. A banner reads No compliance alerts, all reviews are on track, and Upcoming Reviews shows the next review in 336 days, with 25 more scheduled beyond 90 days." loading="lazy"><figcaption>A healthy Compliance Dashboard: every standard covered and every review on track.</figcaption></figure>' +
        '</div>' +
      '</div>' +
      '<h2 id="find">Find a document</h2>' +
      '<p>The Document Repository lists each document with its number, title and category, type, status, compliance status, review date, reviewer, and the standards it’s mapped to. A document mapped to more standards than fit shows a count, such as <b>+2</b>.</p>' +
      '<figure class="shot" data-marks="8.6,7.9,21.9,4.8,zone,#; 31.6,10.3,#1; 1.5,7.9,6.7,4.8,zone,#; 4.85,15.6,#2; 82.6,14,15.8,5.2,zone,#; 81,16.6,#3; 1.4,91.8,15.5,5.6,zone,#4; 83,92.1,15.4,5.2,zone,#; 97.6,89.2,#5"><img src="assets/img/qms-find.png" alt="The Document Repository. Marker 1 outlines Search documents, marker 2 Filters, marker 3 Select Columns, with 2 hidden, marker 4 outlines Items per page, set to 5 items, and marker 5 outlines Previous, Page 1 of 6 and Next. The list shows five of 26 documents with their number, title and category, type, status, compliance, review date, reviewer and SRTO 2025 standards." loading="lazy"><figcaption>Search (1), Filters (2), Select Columns (3), Items per page (4) and Previous and Next (5).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Search documents</h4><p>Type part of a document’s title or number to find it.</p>' +
          '<figure class="shot" data-marks="8,18.5,23,17.5,zone,#; 19.6,72,arrow-down,tiny"><img src="assets/img/qms-search.png" alt="The Document Repository with Training and Assessment typed in the search box, which is outlined. An arrow points to the one match, TA-001 Training and Assessment Policy, an approved and compliant policy in the Training &amp; Assessment category, due for review on 21 Sep 2027 and reviewed by Admin Demo." loading="lazy"><figcaption>Searching for “Training and Assessment” finds the Training and Assessment Policy.</figcaption></figure></li>' +
        '<li class="side"><h4>Filters</h4><p>Narrow the list by <b>Type</b> or <b>Status</b>.</p>' +
          '<figure class="shot shot-small"><img src="assets/img/qms-filters.png" alt="The Filters menu, with Clear all, a Search filters box, Select All, and tick boxes for each Type and Status. Policy and Procedure are ticked under Type, and Under Review and Approved under Status." loading="lazy"><figcaption>Filtering to approved and under-review policies and procedures. Select Clear all to start again.</figcaption></figure></li>' +
        '<li class="side"><h4>Select Columns</h4><p>Show or hide columns in the list. Each framework’s standards have a column of their own, so you can choose which frameworks to show. The button shows how many columns are hidden.</p>' +
          '<figure class="shot shot-columns"><img src="assets/img/qms-columns.png" alt="The Toggle columns menu: Doc #, Title, Type, Status, Compliance, Review Date, Reviewer and SRTO 2025 are ticked, while VRQA Regulatory Requirements and a second SRTO 2025 column are not." loading="lazy"><figcaption>Tick a column to show it.</figcaption></figure></li>' +
        '<li><h4>Items per page</h4><p>Choose how many documents show on each page.</p></li>' +
        '<li><h4>Previous and Next</h4><p>Move between pages of a long list. The page number shows where you are, such as Page 1 of 6.</p></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Select the <b>⋮</b> at the end of a row to open, edit, version, download or delete that document. See <a href="article.html?id=qms-edit-download-delete">Open, edit, download or delete a document</a>.</span></div>',

    'upload-and-map-a-document':
      '<p class="lead">Uploading a document adds it to your repository with an owner, a reviewer and review reminders. Mapping it tells RTO Radar which standards it evidences, so it counts towards your coverage on the Compliance Dashboard.</p>' +
      '<h2 id="steps">Upload a document</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Document Management</b> and select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="85.3,25.8,11.3,9.6,oval,above,#"><img src="assets/img/qms-page.png" alt="Document Management (QMS), with the Upload Document button circled at the top right." loading="lazy"><figcaption>Select Upload Document.</figcaption></figure></li>' +
        '<li>Under <b>Source</b> (1), choose <b>File upload</b> and select <b>Choose File</b> (2), or choose <b>Link</b> and paste the address of a document stored online.' +
          '<figure class="shot" data-marks="9.8,47.6,26.4,13.6,zone,#; 38.4,54.4,#1; 51.3,80,arrow-down,small,#2"><img src="assets/img/qms-upload-source.png" alt="The Upload Document window. Marker 1 outlines Source, with File upload selected and Link beside it. An arrow, marker 2, points down at the Choose File button under Document File." loading="lazy"><figcaption>Choose File upload or Link (1), then select Choose File (2).</figcaption></figure></li>' +
        '<li>Fill in the document details:' +
          '<figure class="shot shot-medium"><img src="assets/img/qms-upload-details.png" alt="The document details for ADM-001-Enrolment-Admissions-Policy-v1.0.docx: Document Number left blank to auto-generate, Initial Version 1.0, Document Title, Document Type Policy, Category Other with Enrolment typed in, a Description, Tags, Review Frequency 12 months, Review Due Date 08/10/2027 and Document Owner Admin Demo." loading="lazy"><figcaption>The document details, filled in for an enrolment and admissions policy.</figcaption></figure>' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>Document Number</h4><p>Your own number for the document, such as POL-001. Leave it blank and RTO Radar generates one, such as DOC-20260404-…</p></div>' +
            '<div><h4><span class="sn">2</span>Initial Version</h4><p>Defaults to 1.0. Change it to match your existing records.</p><div class="callout tip"><b>Tip</b><span>Updating a document you’ve already uploaded? Upload a new version of it instead of a new document, so it keeps its number, mapping and history. See <a href="article.html?id=qms-new-version">Upload a new version and read version history</a>.</span></div></div>' +
            '<div><h4><span class="sn">3</span>Document Title, Type and Category</h4><p>The title and type are required. The category groups related documents, such as Enrolment or Training &amp; Assessment.</p><div class="callout note"><b>Note</b><span>Need a document type that isn’t listed? Admins can add one in Settings › Customisation. See <a href="article.html?id=cust-document-types">Add document types</a>.</span></div></div>' +
            '<div><h4><span class="sn">4</span>Description and Tags</h4><p>A short description of the document, and comma-separated tags to help find it later, such as assessment, validation, quality.</p></div>' +
            '<div><h4><span class="sn">5</span>Review Frequency and Review Due Date</h4><p>How often the document is reviewed, in months. The Review Due Date fills in as the upload date plus the review frequency. Change it to set a different date.</p></div>' +
            '<div><h4><span class="sn">6</span>Document Owner</h4><p>The person responsible for maintaining the document.</p></div>' +
          '</div></li>' +
        '<li>Choose the <b>Document Reviewer</b>, the person responsible for reviewing the document. Then, under <b>Email Reminders</b>, tick when to remind them before the review due date: 1, 3, 5, 7 or 14 days, or 1 month. The default is 14 days. Along with the email reminders, the reviewer is given a Continuous Improvement item to work on. See <a href="article.html?id=cir-overview">What the CIR is for</a>.' +
          '<figure class="shot"><img src="assets/img/qms-upload-reviewer.png" alt="Document Reviewer set to Claire Smith, an Administrator, described as the person responsible for reviewing this document, separate from the author or owner. Beside it, Email Reminders sends reminder emails before the review due date, with 14 days (fortnight) ticked and 1, 3, 5 and 7 days and 1 month unticked." loading="lazy"><figcaption>Choose the reviewer and when to remind them.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The reviewer can be different from the owner, so a document is checked by someone other than its author.</span></div></li>' +
        '<li>Under <b>Map to Compliance Frameworks</b>, open each framework and tick the standards this document addresses. Each framework shows how many standards you’ve selected.' +
          '<div class="callout tip"><b>Tip</b><span>One document can evidence several standards. Map it to all of them rather than uploading copies, so a new version updates every standard at once.</span></div>' +
          '<figure class="shot"><img src="assets/img/qms-upload-mapping.png" alt="Compliance Framework Mapping for Demo RTO, with 5 standards selected. The Standards for RTOs 2025 is open, with 4 selected and a search box. Standards 1.6 and 1.7 are ticked and 1.8 is not, and under Quality Area 2: VET Student Support, 2.1 and 2.2 are ticked." loading="lazy"><figcaption>Tick the standards this document addresses. Each framework shows how many you’ve selected.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Working to standards that aren’t listed, such as state registration standards? Set them up as a custom framework, and they’ll appear here. See <a href="article.html?id=qms-custom-framework">Create a custom framework</a>.</span></div></li>' +
        '<li>Under <b>Document Status</b>, set the <b>Status</b> and <b>Compliance Status</b>, add any notes, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="77.1,86.4,18.8,10.6,oval,above,#"><img src="assets/img/qms-upload-status.png" alt="Document Status, to set the initial status and compliance information for the document: Status set to Approved, Compliance Status set to Compliant, and an empty Notes (optional) box. The Upload Document button is circled." loading="lazy"><figcaption>Set the status and compliance status, then select Upload Document (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="status">Document status and compliance</h2>' +
      '<p>Each document has two statuses: its <b>Status</b>, which shows where it is in your approval process, and its <b>Compliance Status</b>, which shows whether it meets the standards it’s mapped to.</p>' +
      '<h4>Status</h4>' +
      '<table><thead><tr><th>Status</th><th>What it means</th></tr></thead><tbody>' +
        '<tr><td><b>Draft</b></td><td>The document isn’t finished yet, or needs more detail before it’s sent for approval.</td></tr>' +
        '<tr><td><b>Under Review</b></td><td>Someone has been assigned to review the document, or is reviewing it now.</td></tr>' +
        '<tr><td><b>Approved</b></td><td>The reviewer has checked the document and approved it.</td></tr>' +
        '<tr><td><b>Archived</b></td><td>The document is taken out of use. It no longer affects your Compliance Dashboard, but stays on record for audits. Archive a document rather than deleting it.</td></tr>' +
      '</tbody></table>' +
      '<h4>Compliance Status</h4>' +
      '<table><thead><tr><th>Compliance status</th><th>What it means</th></tr></thead><tbody>' +
        '<tr><td><b>Under Review</b></td><td>The document’s compliance is still being checked.</td></tr>' +
        '<tr><td><b>Compliant</b></td><td>The document meets the standards it’s mapped to. Check its mapping to see which standards those are.</td></tr>' +
        '<tr><td><b>Non-Compliant</b></td><td>The document doesn’t meet the standards it’s mapped to yet. Its owner and reviewer should improve it and upload a new version.</td></tr>' +
        '<tr><td><b>Not Applicable</b></td><td>The document isn’t used to evidence your organisation’s compliance, so it isn’t mapped to standards.</td></tr>' +
      '</tbody></table>',

    'qms-edit-download-delete':
      '<p class="lead">Each document in the repository has an actions menu. Select the <b>⋮</b> at the end of its row to open it:</p>' +
      '<table><thead><tr><th>Action</th><th>What it does</th></tr></thead><tbody>' +
        '<tr><td><b>Open in new tab</b></td><td>Opens the document in a new browser tab.</td></tr>' +
        '<tr><td><b>Edit Document</b></td><td>Changes its details, mapping and status. See below.</td></tr>' +
        '<tr><td><b>Upload New Version</b></td><td>Replaces the file with a new version. See <a href="article.html?id=qms-new-version">Upload a new version and read version history</a>.</td></tr>' +
        '<tr><td><b>Version History</b></td><td>Shows every version of the document.</td></tr>' +
        '<tr><td><b>Download</b></td><td>Saves the document to your computer.</td></tr>' +
        '<tr><td><b>Delete</b></td><td>Removes the document from the repository.</td></tr>' +
      '</tbody></table>' +
      '<h2 id="open">Open a document</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Document Repository, select the document’s name.' +
          '<figure class="shot" data-marks="22,79,hand"><img src="assets/img/qms-row-menu.png" alt="The Document Repository showing COM-001 Compliance Management Policy, approved and compliant, reviewed by Admin Demo. A pointing hand is on the document’s name." loading="lazy"><figcaption>Select the document’s name.</figcaption></figure></li>' +
        '<li>A PDF opens in the document viewer, where you can page through, zoom and print it.' +
          '<figure class="shot"><img src="assets/img/qms-open-viewer.png" alt="The Master TAS Approved CHC30121 Certificate III in Early Childhood Education and Care open in the document viewer, with its owner Staff Demo, status Under Review, type Procedure and review date 24 Mar 2027. Close is at the top left, Actions and Download at the top right, and the PDF shows page 1 of 13 at 75% with page thumbnails down the side." loading="lazy"><figcaption>A PDF open in the document viewer.</figcaption></figure></li>' +
        '<li>Only PDFs open in the viewer. To open a Word document or any other file, select <b>⋮</b> › <b>Download</b> on the document’s row, then open it on your computer.' +
          '<figure class="shot" data-marks="95.6,47.6,1.4,6.4,oval,right,#1; 85,82.1,7.2,3.6,oval,#2"><img src="assets/img/qms-edit-menu.png" alt="The Document Repository listing COM-001, GOV-003 and GOV-002, each an approved and compliant policy reviewed by Admin Demo. The triple dot at the end of the COM-001 row is circled as marker 1. Its menu is open, with Open in new tab, Edit Document, Upload New Version, Version History, Download and Delete, and Download is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ at the end of the row (1), then Download (2).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="edit">Edit a document</h2>' +
      '<div class="callout note"><b>Note</b><span>Edit Document changes the document’s details, not its contents. To change the contents, download the document, update it, then upload it as a new version. See <a href="article.html?id=qms-new-version">Upload a new version and read version history</a>. You can also delete the document and upload the updated one as a new document, but it then starts a new version history.</span></div>' +
      '<ol class="steps-list">' +
        '<li>Select <b>⋮</b> › <b>Edit Document</b>. <b>Document Overview</b> opens, showing the file name, when the document was created and its file size.' +
          '<figure class="shot" data-marks="95.6,47.6,1.4,6.4,oval,right,#1; 85,63.4,8.4,3.6,oval,#2"><img src="assets/img/qms-edit-menu.png" alt="The Document Repository listing COM-001, GOV-003 and GOV-002, each an approved and compliant policy reviewed by Admin Demo. The triple dot at the end of the COM-001 row is circled as marker 1. Its menu is open, with Open in new tab, Edit Document, Upload New Version, Version History, Download and Delete, and Edit Document is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ at the end of the row (1), then Edit Document (2).</figcaption></figure></li>' +
        '<li>Change the document details.' +
          '<figure class="shot shot-medium"><img src="assets/img/qms-edit-details.png" alt="Document Overview for Compliance Management Policy and Procedure, file COM-001-Compliance-Management-Policy-v1.0.docx, created 21 Sep 2026 and 37 KB. Version 1.0, review date 21/09/2027, Document Type Policy, Document Number COM-001 and Category Compliance. Admin Demo is both the Document Owner and the Document Reviewer, and the 14 days (fortnight) email reminder is ticked." loading="lazy"><figcaption>The document details in Document Overview.</figcaption></figure></li>' +
        '<li>Under <b>Compliance Framework Mapping</b>, open a framework to change the standards it’s mapped to.' +
          '<figure class="shot"><img src="assets/img/qms-upload-mapping.png" alt="Compliance Framework Mapping for Demo RTO, with 5 standards selected. The Standards for RTOs 2025 is open, with 4 selected and a search box. Standards 1.6 and 1.7 are ticked and 1.8 is not, and under Quality Area 2: VET Student Support, 2.1 and 2.2 are ticked." loading="lazy"><figcaption>Tick or untick standards. Each framework shows how many you’ve selected.</figcaption></figure></li>' +
        '<li>Under <b>Document Status</b>, change the status or compliance status if needed. The current value shows under each, and you can add a note about the change. Then select <b>Save Changes</b>.' +
          '<figure class="shot shot-medium" data-marks="78.4,88.2,15.7,7.9,oval,#"><img src="assets/img/qms-edit-status.png" alt="Document Status. Status is changed to Under Review, from Approved, and Compliance Status to Under Review, from Compliant. The note reads: Updated the internal audit schedule and complaints escalation steps to align with the Standards for RTOs 2025. Sent for review before re-approval. The Save Changes button is circled." loading="lazy"><figcaption>Both statuses changed to Under Review, with a note explaining why. Select Save Changes (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="archive">Archive a document</h2>' +
      '<p>Archiving a document, like deleting it, removes it from your coverage on the Compliance Dashboard. Archive a document only when you need to keep it as a record for audits, such as a policy that’s no longer in use.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>⋮</b> › <b>Edit Document</b>.' +
          '<figure class="shot" data-marks="95.6,47.6,1.4,6.4,oval,right,#1; 85,63.4,8.4,3.6,oval,#2"><img src="assets/img/qms-edit-menu.png" alt="The Document Repository listing COM-001, GOV-003 and GOV-002, each an approved and compliant policy reviewed by Admin Demo. The triple dot at the end of the COM-001 row is circled as marker 1. Its menu is open, with Open in new tab, Edit Document, Upload New Version, Version History, Download and Delete, and Edit Document is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ at the end of the row (1), then Edit Document (2).</figcaption></figure></li>' +
        '<li>Under <b>Document Status</b>, change the <b>Status</b> to <b>Archived</b>. Add a note on why you’re archiving it, then select <b>Save Changes</b>.' +
          '<figure class="shot shot-medium" data-marks="78.6,88.2,15.7,7.9,oval,#"><img src="assets/img/qms-archive-status.png" alt="Document Status. Status is changed to Archived, from Approved, and Compliance Status to Not Applicable, from Compliant. The note reads: No longer in use. Compliance management is now covered by the Governance and Compliance Framework. Archived to keep as a record for audits. The Save Changes button is circled." loading="lazy"><figcaption>Archiving a policy that’s no longer in use, with a note explaining why. Select Save Changes (circled).</figcaption></figure></li>' +
        '<li>To find archived documents, select <b>Filters</b> and tick <b>Archived</b> under <b>Status</b>.' +
          '<figure class="shot shot-small" data-marks="6.3,12.5,31.1,6.5,oval,#; 74,94.8,arrow-left,small"><img src="assets/img/qms-archive-filter.png" alt="The Filters menu open on the Document Repository. The Filters button, showing 1, is circled. No types are ticked, and under Status only Archived is ticked, with an arrow pointing to it." loading="lazy"><figcaption>Select Filters (circled), then tick Archived.</figcaption></figure></li>' +
        '<li>The list shows only your archived documents.' +
          '<figure class="shot"><img src="assets/img/qms-archive-list.png" alt="The Document Repository filtered to archived documents, showing 2 of 2: the Master TAS Approved CHC30125 TAS, marked Not Applicable, and COM-001 Compliance Management Policy, marked Non Compliant and reviewed by Admin Demo. Both have the status Archived." loading="lazy"><figcaption>Your archived documents, kept for audits.</figcaption></figure></li>' +
      '</ol>',

    'qms-new-version':
      '<p class="lead">When a document changes, upload a new version rather than a new document. The document keeps its number, mapping and history, and every earlier version stays on record.</p>' +
      '<h2 id="upload">Upload a new version</h2>' +
      '<ol class="steps-list">' +
        '<li>Select <b>⋮</b> › <b>Upload New Version</b> on the document’s row.' +
          '<figure class="shot" data-marks="95.6,47.6,1.4,6.4,oval,right,#1; 85,69.6,11,3.6,oval,#2"><img src="assets/img/qms-edit-menu.png" alt="The Document Repository listing COM-001, GOV-003 and GOV-002, each an approved and compliant policy reviewed by Admin Demo. The triple dot at the end of the COM-001 row is circled as marker 1. Its menu is open, with Open in new tab, Edit Document, Upload New Version, Version History, Download and Delete, and Upload New Version is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ at the end of the row (1), then Upload New Version (2).</figcaption></figure></li>' +
        '<li>Choose the new file and check its version number.' +
          '<figure class="shot shot-small"><img src="assets/img/qms-new-version-file.png" alt="Upload New Version for COM-001 Compliance Management Policy and Procedure. Current Version v1.0 and New Version v2.0. Source is set to File upload, with Link beside it, and a Choose File button under New Document File." loading="lazy"><figcaption>Choose the file and check the new version number.</figcaption></figure>' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>File upload</h4><p>Under <b>Source</b>, choose <b>File upload</b> and select <b>Choose File</b> to pick the updated file. Or choose <b>Link</b> to link to it instead.</p></div>' +
            '<div><h4><span class="sn">2</span>Version number</h4><p>The <b>New Version</b> moves on from the current version, for example from v1.0 to v2.0. You can edit it, so for minor changes or additions you could use v1.1 instead.</p></div>' +
          '</div></li>' +
        '<li>Describe the change and upload it.' +
          '<figure class="shot shot-small" data-marks="70.6,87.8,24.5,7.5,oval,#"><img src="assets/img/qms-new-version-details.png" alt="The rest of Upload New Version. The new document file COM-001-Compliance-Management-Policy-v1.1.docx is chosen, Change Type is Minor Revision, Change Summary reads Updated compliance section, and Change Details is empty. The Upload Version button is circled." loading="lazy"><figcaption>Select Upload Version (circled) when you’re done.</figcaption></figure>' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>Change Type</h4><p><b>Minor Revision</b>, <b>Major Revision</b> or <b>Correction</b>.</p></div>' +
            '<div><h4><span class="sn">2</span>Change Summary and Change Details</h4><p>A brief summary is required, such as “Updated compliance section”. Add details if you want to describe the changes in full.</p></div>' +
            '<div><h4><span class="sn">3</span>Upload Version</h4><p>Select <b>Upload Version</b>.</p></div>' +
          '</div></li>' +
      '</ol>' +
      '<h2 id="history">Read the version history</h2>' +
      '<ol class="steps-list">' +
        '<li>Select <b>⋮</b> › <b>Version History</b> on the document’s row.' +
          '<figure class="shot" data-marks="95.6,47.6,1.4,6.4,oval,right,#1; 85,75.8,8.4,3.6,oval,#2"><img src="assets/img/qms-edit-menu.png" alt="The Document Repository listing COM-001, GOV-003 and GOV-002, each an approved and compliant policy reviewed by Admin Demo. The triple dot at the end of the COM-001 row is circled as marker 1. Its menu is open, with Open in new tab, Edit Document, Upload New Version, Version History, Download and Delete, and Version History is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ at the end of the row (1), then Version History (2).</figcaption></figure></li>' +
        '<li>Each version is listed with the newest first, marked <b>Current</b> on the latest. For each version you’ll see:' +
          '<ul>' +
            '<li>its version number and change summary</li>' +
            '<li>when it was uploaded, its file name and size</li>' +
            '<li><b>Approved by</b>: who approved it, their email, RTO and team, and when.</li>' +
          '</ul>' +
          '<figure class="shot shot-medium"><img src="assets/img/qms-version-history.png" alt="Version History for COM-001 Compliance Management Policy and Procedure. v1.1, marked Current, has the summary Updated compliance section, was uploaded on 21 Oct 2026 at 10:04 as COM-001-Compliance-Management-Policy-v1.1.docx, 37 KB, and was approved by Admin Demo, admindemo@rtoradar.com.au, Demo RTO, on 21/10/2026 at 10:04 am. Below it, v1.0, the initial version, was uploaded on 21 Sep 2026. Each version has Download and Share link buttons." loading="lazy"><figcaption>Version History, with v1.1 as the current version.</figcaption></figure>' +
          '<p>Select <b>Download</b> to save a version, or <b>Share link</b> to copy a link to it.</p></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Version history shows an auditor who changed each document, when, why, and who approved it.</span></div>',

    'qms-frameworks':
      '<p class="lead">A compliance framework is a set of standards your documents are mapped to, such as the Standards for RTOs 2025. Each framework is split into areas, and each area into standards.</p>' +
      '<h2 id="manage">Manage your frameworks</h2>' +
      '<p>Go to <b>Document Management</b> and select <b>Manage Frameworks</b>.</p>' +
      '<figure class="shot" data-marks="72.2,26.1,12.4,9,oval,#"><img src="assets/img/qms-page.png" alt="Document Management (QMS), with Export, Manage Frameworks and Upload Document at the top right and summary cards for Total Documents, Approved, Review Due and Drafts. Manage Frameworks is circled." loading="lazy"><figcaption>Select Manage Frameworks (circled).</figcaption></figure>' +
      '<p>You’ll see two kinds of framework:</p>' +
      '<figure class="shot shot-medium"><img src="assets/img/qms-frameworks-manage.png" alt="Manage Compliance Frameworks. Predefined Frameworks, managed by RTO Radar, listing the Standards for Registered Training Organisations (RTOs) 2025, v2025, with a view icon. Custom Frameworks, listing VRQA Regulatory Requirements, for Victorian RTOs regulated by the VRQA, with view, edit and delete icons and an on/off switch, turned on. Add Custom Framework and Export frameworks buttons are at the bottom." loading="lazy"><figcaption>Predefined and custom frameworks in Manage Compliance Frameworks.</figcaption></figure>' +
      '<ul>' +
        '<li><b>Predefined Frameworks</b>, such as the Standards for Registered Training Organisations (RTOs) 2025, are managed by RTO Radar and enabled for all RTOs. Contact support to enable additional standards.</li>' +
        '<li><b>Custom Frameworks</b> are ones your RTO builds, such as state registration standards or ISO standards. See <a href="article.html?id=qms-custom-framework">Create a custom framework</a>.</li>' +
      '</ul>' +
      '<p>Each custom framework has four buttons. Predefined frameworks only have the eye.</p>' +
      '<figure class="shot" data-marks="76.9,30,2.6,36,oval,above,#1; 82.7,30,2.6,36,oval,above,#2; 88.4,30,2.6,36,oval,above,#3; 92.8,28,5.4,40,oval,above,#4"><img src="assets/img/qms-framework-row.png" alt="The VRQA Regulatory Requirements custom framework, for Victorian RTOs regulated by the VRQA. The eye, pencil, bin and toggle switch on its right are circled as markers 1 to 4. The switch is on." loading="lazy"><figcaption>View (1), Edit (2), Delete (3) and the toggle switch (4).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>View</h4><p>Opens a read-only view of the framework’s areas and standards.</p>' +
          '<figure class="shot shot-medium"><img src="assets/img/qms-framework-view.png" alt="A read-only view of the Standards for Registered Training Organisations (RTOs) 2025, v2025, predefined. Under Areas &amp; Standards: 1 Training and Assessment, 8 standards; 2 VET Student Support, 8 standards; 3 VET Workforce, 3 standards, open to show its outcome and standards 3.1 to 3.3; and 4 Governance, 4 standards." loading="lazy"><figcaption>Viewing the Standards for RTOs 2025, with area 3 open.</figcaption></figure></li>' +
        '<li><h4>Edit</h4><p>Changes the framework’s name, version, description, areas and standards. The live preview on the right shows how it will look when you map documents. Select <b>Save Changes</b> when you’re done.</p>' +
          '<figure class="shot"><img src="assets/img/qms-framework-edit.png" alt="Edit Compliance Framework for VRQA Regulatory Requirements, with unsaved changes. On the left: Framework Name, Version 2026.1, Description, and Areas &amp; Standards listing Quality Areas Registration &amp; Governance, Training &amp; Assessment, Student Protection and Compliance &amp; Reporting. On the right, a live preview of the mapping view shows each area’s standards, such as 1.1 RTO registration and governance and 2.3 Assessment validation, with 0 of 16 selected. Share with linked RTOs, Undo, Redo, Cancel and Save Changes are at the bottom." loading="lazy"><figcaption>Editing the VRQA Regulatory Requirements framework, with its live preview.</figcaption></figure></li>' +
        '<li><h4>Delete</h4><p>Removes the framework.</p></li>' +
        '<li><h4>Toggle switch</h4><p>Only frameworks that are turned on appear when you map documents and on the Compliance Dashboard. Turn one off to hide it without deleting it.</p></li>' +
      '</ol>' +
      '<h2 id="export">Export your frameworks</h2>' +
      '<ol class="steps-list">' +
        '<li>In Manage Compliance Frameworks, select <b>Export frameworks</b>.' +
          '<figure class="shot shot-medium" data-marks="50.3,87.4,47.2,8.3,zone,#"><img src="assets/img/qms-frameworks-manage.png" alt="Manage Compliance Frameworks, with the Standards for RTOs 2025 under Predefined Frameworks and VRQA Regulatory Requirements under Custom Frameworks. The Export frameworks button at the bottom right is outlined." loading="lazy"><figcaption>Select Export frameworks (outlined).</figcaption></figure></li>' +
        '<li>Tick the frameworks to include, or use <b>Select all</b> or <b>Clear</b>, then select <b>Export</b>. The workbook has a summary sheet, plus one sheet per framework listing its quality areas and standards.' +
          '<figure class="shot shot-medium"><img src="assets/img/qms-framework-export.png" alt="Export compliance frameworks, with 2 of 2 selected: the Standards for RTOs 2025, v2025, under Predefined frameworks, and VRQA Regulatory Requirements, v2026.1, under Custom frameworks. Select all and Clear are at the top, and Cancel and Export (2) at the bottom." loading="lazy"><figcaption>Both frameworks ticked. Select Export to download the workbook.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="structure">Areas and standards</h2>' +
      '<p>Viewing a framework shows its version and description, then its <b>Areas &amp; Standards</b>. Each area has a number, a title and an outcome, and lists its standards. For example, in the Standards for RTOs 2025:</p>' +
      '<ul>' +
        '<li><b>1: Training and Assessment</b> has 8 standards, from 1.1, “Training is engaging, well-structured and enables attainment of required skills and knowledge”, to 1.8.</li>' +
        '<li><b>2: VET Student Support</b> has 8 standards.</li>' +
        '<li><b>3: VET Workforce</b> has 3 standards.</li>' +
        '<li><b>4: Governance</b> has 4 standards.</li>' +
      '</ul>' +
      '<p>The Compliance Dashboard measures coverage against each standard, and against each area as a whole.</p>',

    'qms-custom-framework':
      '<p class="lead">If your RTO works to standards that aren’t built in, such as state registration standards or an ISO standard, build them as a custom framework. You can then map documents to them and see your coverage on the Compliance Dashboard.</p>' +
      '<h2 id="steps">Create a custom framework</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Document Management</b> › <b>Manage Frameworks</b>, then select <b>Add Custom Framework</b>.' +
          '<figure class="shot shot-medium" data-marks="2.5,87.4,47.4,8.3,zone,#"><img src="assets/img/qms-frameworks-manage.png" alt="Manage Compliance Frameworks, with the Standards for RTOs 2025 under Predefined Frameworks and VRQA Regulatory Requirements under Custom Frameworks. The Add Custom Framework button at the bottom left is outlined." loading="lazy"><figcaption>Select Add Custom Framework (outlined).</figcaption></figure></li>' +
        '<li><b>Create Custom Compliance Framework</b> opens in two halves:' +
          '<figure class="shot" data-marks="1,15.6,48.4,75.4,zone,#1; 50.4,15.6,48.2,75.4,zone,#2"><img src="assets/img/qms-framework-create.png" alt="Create Custom Compliance Framework. Marker 1 outlines the left half, with empty Framework Name, Version and Description boxes, and Areas &amp; Standards with no areas added yet and an Add Area button. Marker 2 outlines the right half, the Live Preview of the mapping view for Untitled Framework, which shows no areas yet. Undo, Redo, Cancel and Create Framework are at the bottom." loading="lazy"><figcaption>Build the framework on the left (1) and see it previewed on the right (2).</figcaption></figure>' +
          '<ul>' +
            '<li><b>Left (1):</b> where you build the framework. Enter its details, then add its areas and standards.</li>' +
            '<li><b>Right (2):</b> the <b>Live Preview</b>. It updates as you build, showing the framework as it will look when you map a document to it.</li>' +
          '</ul></li>' +
        '<li>Enter the <b>Framework Name</b>, such as VRQA Registration Standards, and optionally a <b>Version</b> and <b>Description</b>.</li>' +
        '<li>Under <b>Areas &amp; Standards</b>, select <b>Add Area</b>.' +
          '<figure class="shot shot-small" data-marks="3.9,86,17.8,13,oval,#"><img src="assets/img/qms-framework-add-area.png" alt="Areas &amp; Standards, with no areas added yet. The Add Area button below is circled." loading="lazy"><figcaption>Select Add Area (circled).</figcaption></figure></li>' +
        '<li>Fill in the area, then select <b>Add Standard</b>.' +
          '<figure class="shot shot-medium" data-marks="8.8,77.9,18.8,5.4,oval,#"><img src="assets/img/qms-framework-area.png" alt="Area 1: Organisational Governance, with 0 standards. The area heading reads Area, 1, Organisational Governance, and the Area Outcome/Description reads: The organisation demonstrates effective leadership, accountability and oversight through clear governance arrangements, strategic planning, risk management and compliance monitoring. Under Standards, no standards are added yet, and Add Standard is circled. Remove Area is at the bottom right." loading="lazy"><figcaption>A filled-in area. Select Add Standard (circled).</figcaption></figure></li>' +
        '<li>Under <b>Standards</b>, enter each standard’s number, such as 1.1, and its title. Add a description if it helps explain what the standard requires. Select <b>Add Standard</b> for the next one, or <b>Add sub-standard</b> to add one beneath it.' +
          '<figure class="shot"><img src="assets/img/qms-framework-standards.png" alt="Create Custom Compliance Framework. On the left, under Standards, four standards are filled in, each with a number, title, description and Add sub-standard link: 1.1 Leadership and Accountability, 1.2 Strategic Planning, 1.3 Risk Management and 1.4 Compliance Oversight. On the right, the live preview for RTO Organisational Excellence Standards, version 1.0, shows Area 1: Organisational Governance with the same four standards, 0 of 4 selected." loading="lazy"><figcaption>Four standards added to Area 1, shown in the live preview on the right.</figcaption></figure></li>' +
        '<li>Repeat steps 4 to 6 for each area.</li>' +
        '<li>Check the <b>Live Preview</b> on the right. It shows the framework as it will look when you map a document to it.</li>' +
        '<li>Select <b>Create Framework</b>.' +
          '<figure class="shot" data-marks="86.8,93.4,11.4,4,oval,#"><img src="assets/img/qms-framework-done.png" alt="Create Custom Compliance Framework for RTO Organisational Excellence Standards 2026, version 1.0. Five areas are listed on the left, from Area 1: Organisational Governance to Area 5: Stakeholder and Operational Integrity, and the live preview on the right shows Area 2: Quality and Continuous Improvement and Area 3: Training and Learner Experience with their standards. The Create Framework button at the bottom right is circled." loading="lazy"><figcaption>A framework with five areas. Select Create Framework (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Drag the handle beside an area or standard to reorder it, and use <b>Undo</b> and <b>Redo</b> to step back and forward through your changes.</span></div>' +
      '<div class="callout note"><b>Note</b><span>A new framework is turned on in Manage Frameworks, so it appears when you map documents. Turn it off there to hide it without deleting it. To view your framework or toggle it on and off, see <a href="article.html?id=qms-frameworks#manage">Frameworks, areas and standards</a>.</span></div>',

    'qms-compliance-dashboard':
      '<p class="lead">The Compliance Dashboard shows how well your documents cover each framework, using the standards you mapped them to, and which reviews are coming up.</p>' +
      '<h2 id="open">Open the dashboard</h2>' +
      '<p>Go to <b>Document Management</b> and select the <b>Compliance Dashboard</b> tab (1). Then choose a framework (2) to see its coverage.</p>' +
      '<figure class="shot" data-marks="26.6,57.2,10,4.6,oval,right,#1; 19.6,63.6,45,6,zone,#; 66.6,66.6,#2"><img src="assets/img/qms-dashboard-open.png" alt="Document Management (QMS) with the Compliance Dashboard tab selected, circled as marker 1. Marker 2 outlines the framework choices: the Standards for Registered Training Organisations (RTOs) 2025, v2025, which is selected, and Demo Custom Framework, v2026.9.1. Below, the summary cards show 23 total standards, 14 covered and 9 missing." loading="lazy"><figcaption>The Compliance Dashboard tab (1) and the framework choices (2).</figcaption></figure>' +
      '<h2 id="parts">What’s on the dashboard</h2>' +
      '<p>The summary cards show the <b>Total Standards</b> in the framework, how many are <b>Covered</b> by at least one document, and how many are <b>Missing</b>. <b>Standards coverage</b> shows the share of standards that are covered. <b>Policy Compliance Health</b> is a score out of 100 that combines standards coverage, review timeliness and document freshness. See <a href="article.html?id=qms-health">How Policy Compliance Health is calculated</a>.</p>' +
      '<figure class="shot"><img src="assets/img/gs-cd-coverage.png" alt="The top of the Compliance Dashboard for the Standards for RTOs 2025: 23 total standards, 9 covered and 14 missing. A Standards Coverage chart shows 39 percent coverage, and a Policy Compliance Health gauge shows 52, rated Fair, on a scale of 0 to 39, 40 to 69 and 70 to 100." loading="lazy"><figcaption>Standards coverage and Policy Compliance Health.</figcaption></figure>' +
      '<p><b>Upcoming reviews</b> shows documents that are overdue, or due for review in the next 30 or 90 days.</p>' +
      '<figure class="shot"><img src="assets/img/gs-cd-reviews.png" alt="Upcoming Reviews for the next 90 days, on a timeline: 1 overdue, 1 due in 30 days and 1 due in 90 days." loading="lazy"><figcaption>Documents overdue or due for review soon.</figcaption></figure>' +
      '<p><b>Quality area coverage</b> shows how well each quality area of the framework is documented, and <b>Missing Standards</b> lists the standards that still have no documents mapped to them. These are the gaps to fill before an audit.</p>' +
      '<div class="shot-pair"><figure class="shot"><img src="assets/img/gs-cd-missing.png" alt="Missing Standards (14), listing standards such as 1.5, 1.6, 1.7, 2.1, 2.2 and 2.3, each with no documentation found." loading="lazy"><figcaption>Standards that still need a document.</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/gs-cd-quality.png" alt="Quality Area Coverage as a bar chart: Quality Area 1 is about 63 percent covered and Quality Area 4 is fully covered, while Quality Areas 2 and 3 have no coverage yet. Colours show 80 percent and above, 60 to 79, 40 to 59 and under 40." loading="lazy"><figcaption>Coverage for each quality area.</figcaption></figure></div>' +
      '<div class="callout tip"><b>Tip</b><span>To fill a missing standard, upload a document that evidences it, or edit an existing document and map it to that standard.</span></div>',

    'qms-health':
      '<p class="lead">Policy Compliance Health is a score out of 100 on the Compliance Dashboard. It combines three measures, and your organisation decides how much each one counts.</p>' +
      '<ul>' +
        '<li><b>Standards coverage</b>: how many standards have at least one mapped document.</li>' +
        '<li><b>Review timeliness</b>: how many documents are reviewed by their due date.</li>' +
        '<li><b>Document freshness</b>: how recently documents were updated.</li>' +
      '</ul>' +
      '<p>The three weights must add up to 100%. By default, standards coverage counts for 50%, review timeliness for 30% and document freshness for 20%.</p>' +
      '<figure class="shot"><img src="assets/img/qms-health-weighting.png" alt="Compliance Health Weighting, where weights must sum to 100%. Sliders set Standards Coverage, how well your documents cover required standards, to 50%; Review Timeliness, whether documents are reviewed on schedule, to 30%; and Document Freshness, the age and currency of your documents, to 20%. Each matches its default, and the total is 100%. Reset to Defaults and Save Weights buttons are at the bottom." loading="lazy"><figcaption>The default weighting: 50%, 30% and 20%.</figcaption></figure>' +
      '<p>The score is shown on a gauge: <b>0–39</b> in red, <b>40–69</b> in amber, such as 64 Fair, and <b>70–100</b> in green.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins set the weights in Customisation › QMS › Compliance Health Weighting. See <a href="article.html?id=cust-compliance-health">Set compliance health weighting</a>.</span></div>',

    'qms-export':
      '<p class="lead">Export your QMS for an audit, a governance meeting or your own records.</p>' +
      '<h2 id="steps">Export</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Document Management</b> and select <b>Export</b>.' +
          '<figure class="shot" data-marks="64.7,26.1,6.8,9,oval,#"><img src="assets/img/qms-page.png" alt="Document Management (QMS), with Export, Manage Frameworks and Upload Document at the top right and summary cards for Total Documents, Approved, Review Due and Drafts. Export is circled." loading="lazy"><figcaption>Select Export (circled).</figcaption></figure></li>' +
        '<li>Choose an export:' +
          '<figure class="shot shot-narrow"><img src="assets/img/qms-export-menu.png" alt="The Export menu open, with two options: Export Audit Trail (Excel) and Export All Documents (ZIP)." loading="lazy"><figcaption>The two exports.</figcaption></figure>' +
          '<ul>' +
            '<li><b>Export Audit Trail (Excel)</b> downloads a workbook listing every document.</li>' +
            '<li><b>Export All Documents (ZIP)</b> downloads every document file in one ZIP file.</li>' +
          '</ul></li>' +
        '<li>Open the downloaded file. Excel opens downloaded files in <b>Protected View</b>: select <b>Enable Editing</b> to sort or filter.</li>' +
      '</ol>' +
      '<h2 id="audit">What’s in the audit trail</h2>' +
      '<p>The audit trail is named with the date, such as <code>QMS_Audit_Trail_2026-10-15.xlsx</code>, and lists each document on its own row, with filters on every column:</p>' +
      '<ul>' +
        '<li>Document Number, Title and Type</li>' +
        '<li>Status, Compliance Status and Current Version</li>' +
        '<li>Document Owner</li>' +
        '<li>Effective Date, Review Due Date and Last Reviewed</li>' +
        '<li>Created Date and Created By</li>' +
        '<li>Framework Mappings and Mapped Standards, such as 1.1, 1.3, 1.8.</li>' +
      '</ul>',

    // ---- Workforce Management ----
    'wf-overview':
      '<p class="lead">Workforce Management is where you look after your staff: their profiles and documents, the courses and units they deliver, their professional development, and whether they’re ready to deliver.</p>' +
      '<h2 id="open">Open Workforce Management</h2>' +
      '<p>Select <b>Workforce Management</b> on your navigation bar. Along the top of the page are three things you’ll first see:</p>' +
      '<figure class="shot" data-marks="0.4,59.2,17.4,7.6,oval,#"><img src="assets/img/wf-page.png" alt="The top of Workforce Management, with Workforce Management circled in the navigation bar. Export and a greyed-out Assign Training button sit at the top right, above the summary cards: Total Workforce 16, all users in your organisation; RTO Staff 3, staff members; and Admin Actions 5, items awaiting your review." loading="lazy"><figcaption>Select Workforce Management in the navigation bar.</figcaption></figure>' +
      '<ul>' +
        '<li><b>Summary cards</b> showing your <b>Total Workforce</b> (all users in your organisation), <b>RTO Staff</b>, and <b>Admin Actions</b> waiting for your review.</li>' +
        '<li><b>Export</b>, which downloads workforce reports. See <a href="article.html?id=wf-export">Export workforce reports</a>.</li>' +
        '<li><b>Assign Training</b>, which assigns courses and units to the staff member you’re viewing. See <a href="article.html?id=wf-assign-units">Assign courses and units to a trainer</a>.</li>' +
      '</ul>' +
      '<div class="callout note"><b>Note</b><span>Assign Training is greyed out until you select a staff member on the Workforce tab, because it assigns training to the person you’re viewing.</span></div>' +
      '<h2 id="tabs">The five tabs</h2>' +
      '<p>Below the summary cards are five tabs. Select a tab below to see what each one is for.</p>' +
      '<div class="xl-book">' +
        '<div class="xl-bar" role="tablist" aria-label="Workforce Management tabs">' +
          '<button type="button" role="tab" aria-selected="true">Workforce</button>' +
          '<button type="button" role="tab" aria-selected="false">Workforce Dashboard</button>' +
          '<button type="button" role="tab" aria-selected="false">Teams</button>' +
          '<button type="button" role="tab" aria-selected="false">Document Checklist</button>' +
          '<button type="button" role="tab" aria-selected="false">Search</button>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel"><p>Every person in your organisation. Select someone to open their profile, documents, units and PD calendar.</p><figure class="shot"><img src="assets/img/wf-tab-workforce.png" alt="The Workforce tab, showing All (16) selected and a list of staff such as Governance Lead, Compliance Specialist and Network Engineer, each marked Administrator. On the right, Select a Trainer: choose a trainer from the list to view their profile and details." loading="lazy"><figcaption>The Workforce tab, listing everyone in your organisation.</figcaption></figure></div>' +
        '<div class="xl-sheet" role="tabpanel" hidden><p>How ready your trainers are to deliver: evidence maps, unit coverage, document expiry, delivery readiness and admin actions. See <a href="article.html?id=wf-dashboard">The Workforce Dashboard</a>.</p><figure class="shot"><img src="assets/img/wf-tab-dashboard.png" alt="The Workforce Dashboard tab. Trainer Overview shows three charts: Evidence Map (3 completed, 3 in progress, 41 not started), Units with Trainers Assigned (22%, 39 of 180) and Document Expiry Health (11 current, 1 expired). Below, Delivery Readiness shows a bar for each of three trainers." loading="lazy"><figcaption>The Workforce Dashboard tab.</figcaption></figure></div>' +
        '<div class="xl-sheet" role="tabpanel" hidden><p>Your teams and compliance governance chart, with analytics, permissions and the approval structure for each team. See <a href="article.html?id=wf-teams">The compliance governance chart and teams</a>.</p><figure class="shot"><img src="assets/img/wf-tab-teams.png" alt="The Teams tab in Workforce Management. On the left, Teams lists 9 teams, such as System Default, Executive Team, its sub-teams Compliance and Validation, Training Delivery and Programs, Student Services and Administration, and Systems and Digital Services, and the Training Delivery and Programs faculties Business Faculty and Community and Health. On the right, the read-only compliance governance chart shows System Default, managed by Admin Demo, at the top, with the Executive Team and its sub-teams branching beneath it, each with its manager and members." loading="lazy"><figcaption>The Teams tab, with your teams and compliance governance chart.</figcaption></figure></div>' +
        '<div class="xl-sheet" role="tabpanel" hidden><p>The documents each role must provide, and how many staff have provided them. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</p><figure class="shot"><img src="assets/img/wf-tab-checklist.png" alt="The Document Checklist tab for the Trainer/Assessor role, showing Document Expiry Health, Role coverage for each required document, and a table of five configured documents with how many have been received, are expiring soon or have an upcoming review." loading="lazy"><figcaption>The Document Checklist tab for the Trainer/Assessor role.</figcaption></figure></div>' +
        '<div class="xl-sheet" role="tabpanel" hidden><p>Find a person, program or unit, and drill down to the units and evidence maps behind it.</p><figure class="shot"><img src="assets/img/wf-tab-search.png" alt="The Search tab with Staff Demo selected, showing their five assigned programs with the number of units, risk score and date assigned, a View Details button on each, and their PD and document counts." loading="lazy"><figcaption>The Search tab, drilling down into a staff member’s programs.</figcaption></figure></div>' +
      '</div>' +
      '<h2 id="find">Find a staff member</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Workforce</b> tab (1), choose who to list: <b>Trainers</b>, <b>Admin</b> or <b>All</b> (2). Each shows how many people it holds.' +
          '<figure class="shot" data-marks="0.2,1.2,7,7.4,oval,#; 3.4,12.5,#1; 1.2,33,29.2,10,oval,right,#2"><img src="assets/img/wf-find-list.png" alt="The Workforce tab, circled as marker 1. The Workforce list has a search box and three options, Trainers (3), Admin (13) and All (16), which are circled as marker 2. Trainers is selected, listing Ken Lombardo, John Doe and Staff Demo. On the right, Select a Trainer: choose a trainer from the list to view their profile and details." loading="lazy"><figcaption>On the Workforce tab (1), choose Trainers, Admin or All (2).</figcaption></figure></li>' +
        '<li>To narrow the list, type in <b>Search by name, email or role</b>.' +
          '<figure class="shot shot-small" data-marks="4.6,24,90.8,18.8,oval,#; 37,79,arrow-left,small"><img src="assets/img/wf-find-search.png" alt="The Workforce list with Staff typed in the search box, which is circled. The list now shows only Staff Demo, with an arrow pointing left at it." loading="lazy"><figcaption>Searching for “Staff” narrows the list to Staff Demo.</figcaption></figure></li>' +
        '<li>Select a person. The page now shows <b>Now viewing</b> with their name (1), and four tabs: <b>Profile</b>, <b>Documents</b>, <b>Units</b> and <b>PD Calendar</b> (2). Their profile opens first.' +
          '<figure class="shot" data-marks="2.6,0.2,45,13.9,zone,#1; 2.8,15.3,23.4,5.2,oval,right,#2"><img src="assets/img/wf-find-profile.png" alt="Staff Demo’s profile in Workforce Management. Marker 1 outlines the Now viewing card, with Staff Demo, Workforce (16) and a View all button. Marker 2 circles the Profile, Documents, Units and PD Calendar tabs. The Profile tab shows their role, last login, team and manager, a Delivery Competency chart and their most recently issued credentials." loading="lazy"><figcaption>Now viewing shows who you’ve selected (1). Their four tabs sit below it (2).</figcaption></figure></li>' +
        '<li>View their profile.' +
          '<figure class="shot"><img src="assets/img/wf-profile.png" alt="Staff Demo’s Profile tab: their role, last login, team and manager; a Delivery Competency chart of 16 units assigned; their most recently issued credentials, including an expired Working With Children Check; their most recent evidence map; their document checklist, 1 of 5 provided; and their staff document expiry." loading="lazy"><figcaption>A staff member’s profile brings together their details, manager, delivery competency, credentials, evidence map, document checklist and document expiry.</figcaption></figure></li>' +
        '<li>To switch to someone else, select <b>View all</b>. Your workforce list opens over the page: choose a list or search, then select the person.' +
          '<figure class="shot" data-marks="31.8,4.8,8.8,5.8,oval,right,#1; 14.2,16.4,28,83.2,zone,#2"><img src="assets/img/wf-find-viewall.png" alt="Viewing Staff Demo, with the View all button circled as marker 1. Marker 2 outlines the Workforce list that has opened over the profile, with a search box, Trainers, Admin and All options, and staff such as Compliance Specialist, Cybersecurity Specialist and Network Engineer." loading="lazy"><figcaption>Select View all (1) to open your workforce list (2) and switch to someone else.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>New staff are added in <b>Settings</b> › <b>User Management</b> › <b>Staff</b>, not here. See <a href="feature.html?m=getting-started&amp;s=gs-workforce">Add a Trainer</a> in Getting Started.</span></div>',

    'wf-documents':
      '<p class="lead">The <b>Documents</b> tab holds a staff member’s qualifications, licences, professional development and other evidence. These documents count towards their document checklist, and their descriptions feed their evidence maps.</p>' +
      '<p>To open it, go to <b>Workforce Management</b> › <b>Workforce</b>, select the person, then the <b>Documents</b> tab.</p>' +
      '<h2 id="upload">Upload a document</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Documents</b> tab (1), select <b>Upload Document</b> (2).' +
          '<figure class="shot" data-marks="6.4,22.4,6.6,7,oval,above,#1; 84,37.4,11.2,8.4,oval,above,#2"><img src="assets/img/wf-upload-tab.png" alt="Staff Demo’s Documents tab, circled as marker 1, headed Documents: 11, with Folders, Details, Filters, Download All and Upload Document buttons. Upload Document is circled as marker 2. The table lists documents with their category, document checklist item, status and expiry." loading="lazy"><figcaption>Open the Documents tab (1), then select Upload Document (2).</figcaption></figure></li>' +
        '<li>Under <b>Select File</b>, choose the file or drop it in.' +
          '<figure class="shot" data-marks="50,72.4,arrow-down,small"><img src="assets/img/wf-upload-file.png" alt="The Upload Qualifications window, for certificates, diplomas, degrees and other formal qualifications. An arrow points down at the Select File box, which shows the chosen file, Diploma of Community Services.docx." loading="lazy"><figcaption>The chosen file shows in the Select File box.</figcaption></figure></li>' +
        '<li>Choose the <b>Category</b>, such as Qualifications, Professional Development, Licences, Industry Evidence or General. The rest of the form changes to suit the category.</li>' +
        '<li>Under <b>Requirement checklist (optional)</b>, choose the checklist item this document meets, such as <i>Vocational Qualification / Relevant Trade Certificate · Trainer/Assessor</i>. Linking it means the document counts towards the role’s checklist, and shows as provided on their profile.' +
          '<div class="callout note"><b>Note</b><span>The list only shows required documents of the chosen category for the person’s role. If nothing is listed, no required documents are set up for that category yet. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</span></div></li>' +
        '<li>Enter the <b>Document Name</b>. For a qualification, also enter the <b>Course Code</b> and <b>Course Name</b>.</li>' +
        '<li>Write a detailed <b>Description</b>. This is the most important field in the form.' +
          '<p>RTO Radar’s AI reads each document’s description, not the file itself, to write the evidence statements in the trainer’s evidence map. The more detail you give, the stronger the evidence.</p>' +
          '<div class="demo demo-text"><span class="demo-label">Example description</span>' +
            '<p>Completed on 14 June 2026.</p>' +
            '<p>Units completed include:<br>BSBSUS411 Implement and monitor environmentally sustainable work practices<br>CHCECE056 Work effectively in children’s education and care<br>CHCMGT005 Facilitate workplace debriefing and support processes<br>CHCCCS007 Develop and implement service programs<br>CHCDEV002 Analyse impacts of sociological factors on clients<br>CHCCSM005 Develop, facilitate and review all aspects of case management</p>' +
            '<p>Advanced learning in program development, case management, client analysis and team supervision.</p>' +
          '</div>' +
          '<div class="callout tip"><b>Tip</b><span>For what to include, see <a href="article.html?id=wf-description">Write a good document description</a>.</span></div></li>' +
        '<li>Pick the <b>Completion/Issue Date</b>, set the expiry if applicable, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="40,43.4,arrow-down,small; 83.5,94,13.1,3.8,oval,#"><img src="assets/img/wf-upload-form.png" alt="The upload form for a qualification: category Qualifications, Requirement checklist set to Vocational Qualification / Relevant Trade Certificate for the Trainer/Assessor role, document name Staff_Demo_Qualification_CHC52015, course code CHC52015, course name Diploma of Community Services, a description beginning Completed on 14 June 2026 and listing the units completed, a completion date of 14/06/2026, and a note that this requirement does not expire. An arrow points down at the Description field, and the Upload Document button is circled." loading="lazy"><figcaption>A completed qualification, with a detailed description (arrow). Select Upload Document (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="views">View documents</h2>' +
      '<p>The heading shows how many documents they have, for example “Documents: 11”. Switch between two views:</p>' +
      '<ul>' +
        '<li><b>Details</b> lists every document in one table.' +
          '<figure class="shot" data-marks="6.2,32.4,6,5.4,oval,above,#1; 64.6,46.4,5.8,5.6,oval,above,#2"><img src="assets/img/wf-doc-details.png" alt="Staff Demo’s Documents tab, circled as marker 1, headed Documents: 11, in the Details view, with the Details button circled as marker 2. The table lists each document with its category, document checklist item, status, such as Approved or Pending, document expiry and action buttons." loading="lazy"><figcaption>On the Documents tab (1), select Details (2) to list every document in one table.</figcaption></figure></li>' +
        '<li><b>Folders</b> groups them by category, with how many each holds. Select a folder to see its documents.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="82.6,17.8,9.4,27.4,oval,#"><img src="assets/img/wf-doc-folders.png" alt="The Folders view, headed Documents: 11, with five category folders: General 1, Industry Evidence 1, Licences 1, Professional Development 5 and Qualifications 3. The Folders button, beside Details at the top right, is circled." loading="lazy"><figcaption>Select Folders (circled) to group documents by category, with how many each holds.</figcaption></figure>' +
      '<p>Use <b>Filters</b> to narrow the list, and <b>Download All</b> to download every document.</p>' +
      '<h2 id="actions">Work with a document</h2>' +
      '<p>Each row on the Documents tab has parts you can select. Select an underlined part of the example row below to see what it does.</p>' +
      '<div class="hotspots">' +
        '<ul class="hs-list">' +
          '<li><button type="button" class="hs-link" data-panel="0">Open and verify a document</button></li>' +
          '<li><button type="button" class="hs-link" data-panel="1">Open in a new tab or download</button></li>' +
          '<li><button type="button" class="hs-link" data-panel="2">Edit a document</button></li>' +
        '</ul>' +
        '<div class="doc-row" role="group" aria-label="An example document row">' +
          '<div class="dr-head"><span>Document</span><span>Category</span><span>Document Checklist</span><span>Status</span><span>Document Expiry</span><span>Actions</span></div>' +
          '<div class="dr-body">' +
            '<span class="dr-name"><button type="button" class="hs" data-panel="0">Webinar_Certificate_17_Mar_2026.pdf</button></span>' +
            '<span><span class="dr-pill">Professional Development</span></span>' +
            '<span class="dr-muted">–</span>' +
            '<span><span class="dr-status">Pending</span></span>' +
            '<span>Not Applicable</span>' +
            '<span class="dr-actions">' +
              '<span class="dr-split"><span class="dr-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></span>' +
              '<button type="button" class="hs dr-btn" data-panel="1" aria-label="Arrow: open in new tab or download"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button></span>' +
              '<span class="dr-wrap"><button type="button" class="hs dr-btn" data-panel="2" aria-label="Pencil: edit"><svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg></button></span>' +
              '<button type="button" class="hs dr-btn" data-panel="0" aria-label="Tick: open and verify"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></button>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="hs-panel" id="verify" hidden>' +
          '<h4>Open and verify a document</h4>' +
          '<p>Select the document’s name, or the tick on a <b>Pending</b> document, to open it on the page. Under <b>Action Required</b> you’ll see the document itself with a <b>Download</b> button, its <b>Document Description</b> and its <b>Document Details</b>, such as the issue and completion dates.</p>' +
          '<figure class="shot" data-marks="78.8,93.3,arrow-down,small; 85.8,93.3,arrow-down,small"><img src="assets/img/wf-doc-verify.png" alt="Action Required for a webinar certificate: the PDF shown on the page with a Download button, a certificate of participation presented to Staff Demo, then the Document Description, Document Details with issue and completion dates of 16/03/2026, a Verification Notes box, and Reject, Approve and Delete buttons. Arrows point down at Reject and Approve." loading="lazy"><figcaption>A Pending document opened for verification.</figcaption></figure>' +
          '<p>Every uploaded document must be verified, including documents an Admin uploads:</p>' +
          '<ul>' +
            '<li><b>What to check</b>: that it’s the right document, that it hasn’t expired, and that its description is detailed enough to use as evidence.</li>' +
            '<li><b>Who verifies</b>: an Admin, for every uploaded document, including documents an Admin uploads.</li>' +
            '<li><b>Your own process</b>: some RTOs also verify documents externally, for example with the issuing organisation.</li>' +
            '<li><b>Why it matters</b>: only approved documents can be used as evidence in an evidence map.</li>' +
            '<li><b>Where to find them</b>: Pending documents also appear under <a href="article.html?id=wf-dashboard">Admin Action</a> on the Workforce Dashboard.</li>' +
          '</ul>' +
          '<p>To verify a <b>Pending</b> document:</p>' +
          '<ol class="steps-list">' +
            '<li>Check the document against its description.</li>' +
            '<li>Add any <b>Verification Notes</b>. They’re optional, but useful for explaining why you’re rejecting a document.</li>' +
            '<li>Select <b>Approve</b>, or <b>Reject</b> to send it back. <b>Delete</b> removes it.</li>' +
          '</ol>' +
          '<p><i>A rejected document can be fixed and resubmitted. Use your Verification Notes to explain what needs to change.</i></p>' +
        '</div>' +
        '<div class="hs-panel" hidden>' +
          '<h4>Open in a new tab or download</h4>' +
          '<p>The open button opens the document in a new browser tab. Select the arrow beside it to choose:</p>' +
          '<ul>' +
            '<li><b>Open in new tab</b>: the default, the same as the open button.</li>' +
            '<li><b>Download</b>: saves the document to your computer.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="hs-panel" hidden>' +
          '<h4>Edit a document</h4>' +
          '<p>Select the pencil to change the document’s details. You can change its <b>Category</b>, <b>Document Name</b>, <b>Description</b>, <b>Completion/Issue Date</b> and <b>Document Expiry</b>, and link it to a <b>Requirement checklist</b> item so it counts towards the person’s document checklist. Then select <b>Update Document</b>.</p>' +
          '<figure class="shot"><img src="assets/img/wf-doc-edit.png" alt="The Edit Professional Development form: category Professional Development, Requirement checklist (optional) set to Not linked, with a note that no required documents are configured for this category on this person’s role, the document name, a description, a completion date of 16/03/2026, This document does not expire ticked, and Cancel and Update Document buttons." loading="lazy"><figcaption>Editing a document’s details.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The Requirement checklist only lists required documents of the same category for the person’s role. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</span></div>' +
        '</div>' +
      '</div>',

    'wf-assign-units':
      '<p class="lead">Assigning courses and units links a trainer to what they’ll deliver and assess. Their evidence maps, delivery readiness and the Workforce Dashboard all build on these assignments.</p>' +
      '<h2 id="courses">Assign courses</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> › <b>Workforce</b> and select the trainer.' +
          '<figure class="shot" data-marks="34.6,91.3,arrow-left"><img src="assets/img/wf-assign-select.png" alt="The Workforce tab in Workforce Management, listing three trainers: Ken Lombardo, John Doe and Staff Demo. An arrow points left at Staff Demo." loading="lazy"><figcaption>Select the trainer, such as Staff Demo here.</figcaption></figure></li>' +
        '<li>Select <b>Assign Training</b> at the top right of the page.' +
          '<figure class="shot" data-marks="81.4,15.2,13.6,8.2,oval,#"><img src="assets/img/wf-assign-button.png" alt="Workforce Management, now viewing Staff Demo, with the Profile, Documents, Units and PD Calendar tabs below. The Assign Training button at the top right is circled." loading="lazy"><figcaption>Select Assign Training while viewing the trainer.</figcaption></figure></li>' +
        '<li>Manage Assignments opens on step 1, <b>Course Assignments</b>. The page has two sides:' +
          '<figure class="shot" data-marks="2.4,30.2,46,69.6,zone,#; 25,33,#1; 50.2,30.2,47.8,69.6,zone,#; 66.5,32,#2"><img src="assets/img/wf-assign-courses.png" alt="Manage Assignments for Staff Demo, on Step 1, Course Assignments, with Step 2, Unit Assignments beside it. Marker 1 outlines Current Course Assignments on the left: Diploma of Early Childhood Education and Care marked In progress, and Certificate II in Community Services and Diploma of Building and Construction marked Assigned, each with its code, team, assigned date and a cross to remove it, and a Remove all button. Marker 2 outlines Assign New Courses on the right: a search box, Show Archived and Only show courses in Staff’s teams tick boxes, a Select (6) tick box, and a list of courses with tick boxes and team labels." loading="lazy"><figcaption>Current Course Assignments (1) and Assign New Courses (2).</figcaption></figure>' +
          '<ol class="ov-list">' +
            '<li><h4>Current Course Assignments</h4><p>The courses already assigned to this trainer, each with its code, team, the date it was assigned and its status:</p>' +
              '<ul>' +
                '<li><b>Assigned</b>: assigned, with no evidence map work yet.</li>' +
                '<li><b>In progress</b>: their evidence map is under way.</li>' +
                '<li><b>Completed</b>: their evidence map is complete.</li>' +
              '</ul>' +
              '<p>Select the <b>✕</b> beside a course to remove it, or <b>Remove all</b> to clear the list. Step 2, Unit Assignments, shows the trainer’s current units the same way.</p></li>' +
            '<li><h4>Assign New Courses</h4><p>The courses you can assign. Search by course name or code, then tick each course they’ll deliver, or tick <b>Select</b> to choose every course in the list. Each course shows its code and the team it belongs to.</p>' +
              '<ul>' +
                '<li><b>Show Archived</b> includes archived courses.</li>' +
                '<li><b>Only show courses in Staff’s teams</b> narrows the list to courses tagged with the trainer’s teams. Team labels are guidance only: you can still assign any course, whichever team owns it.</li>' +
              '</ul></li>' +
          '</ol></li>' +
        '<li>Search for and tick the courses they’ll deliver, scroll down, then select <b>Assign Courses</b>. The button shows how many you’ve chosen.' +
          '<figure class="shot" data-marks="55,30.4,4.8,3.2,underline,right,#1; 53.4,56.9,1.9,3.6,oval,#2; 86.3,1.6,1.9,39.2,oval,#; 89.6,64,arrow-down,#3; 52,75.2,33.6,6.5,oval,#4"><img src="assets/img/gs-training-courses.png" alt="Manage Assignments for Staff Demo, on step 1, Course Assignments. Current course assignments are listed on the left. On the right, under Assign New Courses, the search box contains BSB50120 and the Diploma of Business is ticked. Marker 1 underlines the course code in the search box, marker 2 circles the tick box before the course, marker 3 circles the scroll bar, with an arrow beside it showing to scroll down, and marker 4 circles the Assign 1 Course(s) button." loading="lazy"><figcaption>Search by course code (1), tick the course (2), scroll down (3), then select Assign Courses (4).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="units">Assign units</h2>' +
      '<ol class="steps-list" start="5" style="counter-reset: s 4">' +
        '<li>Select step 2, <b>Unit Assignments</b>. This side works the same way as Course Assignments:' +
          '<figure class="shot" data-marks="49.3,14.9,46.2,3.8,oval,#; 2.6,23.5,45.5,76.5,zone,#; 22,25.4,#1; 50.4,23,47.8,77,zone,#; 63.5,24.4,#2"><img src="assets/img/wf-assign-units-page.png" alt="Manage Assignments for Staff Demo, on Step 2, Unit Assignments, which is circled. Marker 1 outlines Current Unit Assignments on the left: units such as Work effectively in children’s education and care marked Completed, Foster physical development in early childhood marked In progress and Support emotional and psychological development in early childhood marked Assigned, each with its code, team and assigned date, a cross to remove it, and a Remove all button. Marker 2 outlines Assign New Units on the right: a note that you can only assign units from courses already assigned to this staff member, a search box, Show Archived and Only show units in Staff’s teams tick boxes, and Select (0)." loading="lazy"><figcaption>Unit Assignments (circled), with Current Unit Assignments (1) and Assign New Units (2).</figcaption></figure>' +
          '<ol class="ov-list">' +
            '<li><h4>Current Unit Assignments</h4><p>The units already assigned to this trainer, each with its code, team and assigned date. A unit with a due date shows it too. Its status tracks the trainer’s unit validation for that unit: <b>Assigned</b> (not started), <b>In progress</b> or <b>Completed</b>. Select the <b>✕</b> to remove a unit, or <b>Remove all</b>.</p></li>' +
            '<li><h4>Assign New Units</h4><p>The units you can assign, from the courses already assigned to this trainer. Search by unit name or code, and use <b>Show Archived</b> and <b>Only show units in Staff’s teams</b> to change the list.</p></li>' +
          '</ol></li>' +
        '<li>Under <b>Unit Assignments</b>, search for and tick the units they’ll deliver, scroll down, then select <b>Assign Units</b>. The button shows how many you’ve chosen.' +
          '<figure class="shot" data-marks="50.5,21.2,2.4,2.9,underline,right,#1; 49,47.5,1.7,3,oval,#2; 81.3,9.5,1.9,42.4,oval,#; 85.4,58,arrow-down,#3; 47.6,81.3,33,6.4,oval,#4"><img src="assets/img/gs-training-units.png" alt="Manage Assignments for Staff Demo, on step 2, Unit Assignments. The Current Unit Assignments list on the left is empty. On the right, under Assign New Units, the search box contains BSB and units such as Manage business resources and Articulate, present and debate ideas are ticked, each showing the course it comes from. Marker 1 underlines the search term, marker 2 circles the tick box before the first unit, marker 3 circles the page scroll bar, with an arrow showing to scroll down, and marker 4 circles the Assign 5 Unit(s) button." loading="lazy"><figcaption>Search by unit code (1), tick the units (2), scroll down (3), then select Assign Units (4).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can only assign units from courses already assigned to this trainer.</span></div></li>' +
        '<li>From their staff profile, open the <b>Units</b> tab to check the units assigned to them.' +
          '<figure class="shot" data-marks="11.1,26.2,3.75,6.3,oval,#"><img src="assets/img/gs-staff-units.png" alt="The Units tab of a staff profile, with the Units tab circled, headed Units Delivered: 11. Each row shows the unit code and title, its course, team, unit status of Assigned, an evidence map icon, the assigned date, and the completed date, which reads No map provided." loading="lazy"><figcaption>The Units tab lists every unit assigned to the trainer, with its course, status and evidence map.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Assign units before you generate the evidence map. The map is built from the units assigned here.</span></div>',

    'wf-description':
      '<p class="lead">Every staff document has a <b>Description</b>. It’s the most important field when you upload a document, because it’s what RTO Radar’s AI uses to write a trainer’s evidence map.</p>' +
      '<h2 id="why">Why the description matters</h2>' +
      '<p>When an evidence map is created, RTO Radar’s AI writes evidence statements for the trainer’s <b>vocational competency</b> and <b>industry currency</b> from the documents chosen as evidence. To protect personally identifiable information, the AI reads <b>only the description</b>, never the file itself.</p>' +
      '<p>So a vague description such as “Certificate” gives the AI almost nothing to work with, and the evidence statement will say the evidence is insufficient. A detailed one gives it the skills, units and context it needs to write strong, accurate evidence.</p>' +
      '<div class="callout warn"><b>Important</b><span>Admins can reject a document whose description doesn’t say enough. Write it well the first time.</span></div>' +
      '<h2 id="what">What to include</h2>' +
      '<div class="sub-steps">' +
        '<div><h4><span class="sn">1</span>What it is and when</h4><p>The document’s name, and when it was completed or issued.</p></div>' +
        '<div><h4><span class="sn">2</span>Skills and knowledge</h4><p>The skills or knowledge it demonstrates, in plain words.</p></div>' +
        '<div><h4><span class="sn">3</span>Units, for a qualification</h4><p>Each unit it covers, with its code and title. Being descriptive about the skills gained helps the AI match them to the units the trainer delivers.</p></div>' +
        '<div><h4><span class="sn">4</span>Connection to their delivery</h4><p>How it relates to the units they deliver, and any systems or processes they manage.</p></div>' +
        '<div><h4><span class="sn">5</span>Industry currency</h4><p>How it reflects current industry practice, such as recent work, events or changes in legislation.</p></div>' +
      '</div>' +
      '<h2 id="example">An example</h2>' +
      '<div class="demo demo-text"><span class="demo-label">Example description</span>' +
        '<p>Certificate II in Community Services, completed on 18 November 2025.</p>' +
        '<p>Units completed include:<br>CHCCOM005 Communicate and work in health or community services<br>CHCDIV001 Work with diverse people<br>HLTWHS001 Participate in workplace health and safety<br>CHCCCS015 Provide individualised support<br>CHCVOL002 Lead volunteer teams</p>' +
        '<p>Developed communication skills, awareness of diversity, safe work practices and introductory client support skills.</p>' +
      '</div>' +
      '<p>For professional development, describe what was covered and how it improves the trainer’s delivery, for example: “This workshop on digital learning tools equipped me to integrate technology into classroom instruction for the BSB units I deliver.”</p>' +
      '<div class="callout tip"><b>Tip</b><span>The Description box in the upload form shows prompts and examples for each category. Replace them with your own details.</span></div>',

    'wf-evidence-map':
      '<p class="lead">An evidence map shows how a trainer is competent and current to deliver a unit. It links their approved documents to the unit, with written statements of their <b>vocational competency</b> and <b>industry currency</b>. Exported together, a trainer’s evidence maps form their <b>trainer matrix</b>.</p>' +
      '<h2 id="who">Who creates evidence maps</h2>' +
      '<table><thead><tr><th></th><th>Created by an Admin</th><th>Created by a trainer</th></tr></thead><tbody>' +
        '<tr><td><b>Where</b></td><td>Workforce Management, on the trainer’s Units tab</td><td>Their own portal, under My Courses</td></tr>' +
        '<tr><td><b>Approval</b></td><td>Approved straight away</td><td>An Admin reviews and approves it. See <a href="article.html?id=wf-evidence-review">Review evidence maps from trainers</a>.</td></tr>' +
      '</tbody></table>' +
      '<p>This guide covers creating one as an Admin.</p>' +
      '<h2 id="before">Before you start</h2>' +
      '<ul>' +
        '<li>The unit must be assigned to the trainer. See <a href="article.html?id=wf-assign-units">Assign courses and units to a trainer</a>.</li>' +
        '<li>Their documents must be uploaded and <b>approved</b>. Only approved documents can be chosen as evidence. See <a href="article.html?id=wf-documents">Upload and manage staff documents</a>.</li>' +
        '<li>Each document needs a detailed description. See <a href="article.html?id=wf-description">Write a good document description</a>.</li>' +
      '</ul>' +
      '<h2 id="steps">Create an evidence map</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> › <b>Workforce</b> (1), select the trainer (2), then the <b>Units</b> tab (3).' +
          '<figure class="shot" data-marks="2.4,2,5.4,5.8,oval,#; 5,11.4,#1; 17.4,26,arrow-left,tiny; 18.6,18.6,#2; 12.1,37.4,3.4,5.8,oval,#; 13.8,45.2,#3"><img src="assets/img/wf-map-units.png" alt="Workforce Management with the Workforce tab circled as marker 1, an arrow pointing at Staff Demo in the Now viewing card as marker 2, and the Units tab circled as marker 3. Below, Units Delivered: 16 lists units such as BSBCRT412 Articulate, present and debate ideas, approved, and BSBFIN501 Manage budgets and financial plans, assigned, each with its course, team, unit status, an evidence map icon and dates." loading="lazy"><figcaption>Open the Workforce tab (1), select the trainer (2), then the Units tab (3).</figcaption></figure></li>' +
        '<li>Find the unit and select its evidence map icon in the <b>Evidence Map</b> column.' +
          '<figure class="shot" data-marks="75,90,2.3,5.8,oval,#"><img src="assets/img/wf-map-units.png" alt="Staff Demo’s Units tab, headed Units Delivered: 16. The evidence map icon for BSBFIN501 Manage budgets and financial plans, which is Assigned with no map provided, is circled." loading="lazy"><figcaption>Select the unit’s evidence map icon.</figcaption></figure></li>' +
        '<li>Select <b>Create Evidence Map for Staff</b>.' +
          '<figure class="shot" data-marks="39.2,76.4,21.8,16.8,oval,#"><img src="assets/img/wf-map-create.png" alt="The Evidence Map window for a unit, reading No evidence has been submitted for this unit yet, with the Create Evidence Map for Staff button circled." loading="lazy"><figcaption>A unit with no evidence map yet. Select Create Evidence Map for Staff.</figcaption></figure></li>' +
        '<li>Under <b>Step 1: Select Verifiable Evidence</b>, choose <b>Details</b> (1) to list the documents, or <b>Folders</b> to browse them by category. Tick the approved documents that demonstrate their competency for this unit (2), then select <b>Next</b> (3).' +
          '<figure class="shot" data-marks="90.2,14.3,7.8,3.9,oval,above,#1; 2.1,55.7,93.8,33.4,zone,#2; 90.6,93.4,7.4,4.9,oval,#3"><img src="assets/img/wf-map-step1.png" alt="Step 1: Select Verifiable Evidence for BSBFIN501 Manage budgets and financial plans. The Details view is selected and circled as marker 1. The list shows approved documents with their category, file name, issue date and expiry. Four are ticked and outlined as marker 2: 01_Vocational_Competency_Profile, 02_Presentation_and_Debate_Case_Study, 03_Industry_Currency_Log and 04_Supervisor_Confirmation_and_Feedback. The Next button is circled as marker 3." loading="lazy"><figcaption>Choose Details (1), tick the documents (2), then select Next (3).</figcaption></figure></li>' +
        '<li>Under <b>Step 2: Vocational Competency and Industry Currency</b>, fill in both statements:' +
          '<ul>' +
            '<li><b>Vocational Competency</b>: how they demonstrate competency at the performance element level.</li>' +
            '<li><b>Industry Currency</b>: how they maintain current industry knowledge.</li>' +
          '</ul>' +
          '<p>To draft them for you, select <b>Generate with AI</b>. The AI writes both statements from the descriptions of the documents you selected.</p>' +
          '<div class="callout note"><b>Note</b><span>The AI reads only each document’s description, never the file itself, so the statements are only as good as the descriptions behind them. A detailed description, naming the skills, units and recent industry practice it shows, gives the AI what it needs to write strong evidence. See <a href="article.html?id=wf-description">Write a good document description</a>.</span></div>' +
          '<figure class="shot" data-marks="61.4,92.9,14.2,5.2,oval,#"><img src="assets/img/wf-map-step2.png" alt="Step 2: Vocational Competency and Industry Currency for BSBFIN501 Manage budgets and financial plans. On the left, the four selected evidence documents. In the middle and on the right, empty Vocational Competency and Industry Currency boxes. Along the bottom are Back, Cancel, Generate with AI, which is circled, Save as Draft and Save and Approve." loading="lazy"><figcaption>Select Generate with AI to draft both statements.</figcaption></figure>' +
          '</li>' +
        '<li>Review the statements the AI has written, then select <b>Save &amp; Approve</b>. To finish later, select <b>Save as Draft</b> instead.' +
          '<figure class="shot" data-marks="35,26.7,29.4,62.3,zone,#; 62.2,22.6,#1; 66.6,26.7,31.4,62.3,zone,#; 96.1,22.6,#2; 86.9,93.2,11.2,4.8,oval,above,#3"><img src="assets/img/wf-map-ai.png" alt="Step 2 of the evidence map for BSBFIN501 Manage budgets and financial plans, after Generate with AI. Marker 1 outlines the generated Vocational Competency statement, drawn from the Vocational Competency Profile and the Supervisor Confirmation and Feedback. The box is selected for typing, and a line has been added at the end: Reviewed and confirmed by the RTO, with the text cursor after it. Marker 2 outlines the generated Industry Currency statement, drawn from the Industry Currency Log. Marker 3 circles the Save and Approve button." loading="lazy"><figcaption>The AI’s Vocational Competency (1) and Industry Currency (2) statements. Both boxes can be typed in: here a line has been added to the first. Review and edit both before you select Save &amp; Approve (3).</figcaption></figure>' +
          '<div class="callout warn"><b>Important</b><span>The AI’s statements are a starting point, not a final answer, and the regulator expects you to stay in the loop. Read both, check them against the evidence, apply your own judgement and edit them freely: both boxes can be typed in. If they say the evidence is insufficient, add better evidence or improve the document descriptions. Only then select <b>Save &amp; Approve</b>.</span></div></li>' +
        '<li>In <b>Confirm evidence map</b>, check the unit and the program it’s being made for, then select <b>Save &amp; approve</b>.' +
          '<figure class="shot shot-medium" data-marks="77.2,85.2,19.4,11.4,oval,#"><img src="assets/img/wf-map-confirm.png" alt="Confirm evidence map: this evidence map is being made for BSBFIN501 Manage budgets and financial plans, in BSB50120 Diploma of Business, with an existing evidence map that is approved. This trainer delivers this unit in this program only. The Save and approve button is circled." loading="lazy"><figcaption>Check the unit and program, then select Save &amp; approve.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="view">View an evidence map</h2>' +
      '<p>Select the evidence map icon on the Units tab to open the map.</p>' +
      '<figure class="shot" data-marks="73.9,20,2.3,60,oval,#"><img src="assets/img/wf-map-view.png" alt="A unit row on the Units tab: BSBCRT412 Articulate, present and debate ideas, Diploma of Business, Business Faculty, status Approved, the evidence map icon, which is circled, assigned 08/10/2026 and completed 14/10/2026." loading="lazy"><figcaption>Select the evidence map icon (circled) to open the map.</figcaption></figure>' +
      '<p>The map shows:</p>' +
      '<ul>' +
        '<li>its <b>Status</b> and when it was last updated</li>' +
        '<li><b>Verifiable Evidence</b>: the documents used, each with a download button</li>' +
        '<li>the <b>Vocational Competency</b> and <b>Industry Currency</b> statements</li>' +
        '<li><b>Manager Verification Notes</b>: who verified it, their email, RTO and team, and when</li>' +
        '<li><b>Actions History</b>: every action on the map, such as who approved it.</li>' +
      '</ul>' +
      '<p>Select <b>Edit</b> to change it.</p>' +
      '<figure class="shot" data-marks="88,19.8,7,6.4,oval,#"><img src="assets/img/wf-map-edit.png" alt="An opened evidence map for BSBCRT412 Articulate, present and debate ideas, with status Approved, last updated 10/14/2026, and an Edit button, which is circled. Below, Verifiable Evidence lists four documents, each with a download button, followed by the Vocational Competency section." loading="lazy"><figcaption>An opened evidence map. Select Edit (circled) to change it.</figcaption></figure>' +
      '<h2 id="export">Export the trainer matrix</h2>' +
      '<p>On the trainer’s <b>Units</b> tab, select <b>Export to Excel</b>. The workbook lists every unit assigned to them with its course, status, assigned and completed dates, the vocational competency and industry currency statements, and the verifiable evidence.</p>' +
      '<figure class="shot" data-marks="86.8,52.2,9.8,7.6,oval,#"><img src="assets/img/wf-map-units.png" alt="Staff Demo’s Units tab, headed Units Delivered: 16, with the Export to Excel button circled at the top right of the units list." loading="lazy"><figcaption>Select Export to Excel on the trainer’s Units tab.</figcaption></figure>',

    'wf-evidence-review':
      '<p class="lead">Trainers who sign in to RTO Radar create evidence maps themselves and submit them for review. An Admin then approves the map, or rejects it with notes so the trainer can fix it.</p>' +
      '<h2 id="flow">How a trainer’s evidence map is approved</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>The trainer uploads documents</h4><p>They upload their documents from <b>My Documents</b>. Each is <b>Pending</b> until an Admin approves it. See <a href="article.html?id=wf-documents#verify">Verify a trainer’s document</a>.</p>' +
          '<figure class="shot" data-marks="57.6,81.6,7.4,6.6,oval,#"><img src="assets/img/wf-trainer-docs.png" alt="The My Documents page in the trainer’s portal, with counts of 1 total document, 0 verified, 1 pending review and 0 rejected. The document VetQI Attendance image is listed with its status, Pending, circled." loading="lazy"><figcaption>A trainer’s uploaded document, Pending until an Admin approves it.</figcaption></figure></li>' +
        '<li><h4>The trainer creates a map</h4><p>From <b>My Courses</b> › <b>Manage Course</b>, they select <b>Create Map</b> on a unit, choose their approved documents, write or AI-generate their statements, and select <b>Submit for Review</b>.</p>' +
          '<figure class="shot" data-marks="40.2,70.6,8.9,7,oval,#"><img src="assets/img/wf-trainer-createmap.png" alt="The trainer’s portal, showing the Assigned Units of the Advanced Diploma of Program Management. Each unit has a Create Map button in its Evidence Map column; the one for BSBFIN601 Manage organisational finances is circled." loading="lazy"><figcaption>In their portal, the trainer selects Create Map on a unit.</figcaption></figure></li>' +
        '<li><h4>An Admin reviews it</h4><p>The unit shows <b>Submitted</b> with a red <b>!</b> on its Units tab. The Admin approves or rejects it.</p>' +
          '<figure class="shot" data-marks="27.8,83.2,10.2,14.6,oval,#"><img src="assets/img/wf-trainer-revision.png" alt="The trainer’s Assigned Units after an Admin’s review. BSBCRT611 Apply critical thinking for complex problem solving shows Edit Map and Approved. BSBFIN601 Manage organisational finances shows Edit Map and Needs Revision, which are circled." loading="lazy"><figcaption>After the review, the trainer sees each map’s result. A rejected map shows Needs Revision (circled).</figcaption></figure></li>' +
        '<li><h4>The trainer revises if needed</h4><p>A rejected map shows <b>Needs Revision</b> in the trainer’s portal, with the Admin’s notes. They select <b>Edit Map</b>, make changes and resubmit it, and it shows <b>Resubmitted</b>.</p>' +
          '<figure class="shot"><img src="assets/img/wf-trainer-feedback.png" alt="The trainer editing the evidence map for BSBFIN601 Manage organisational finances. Under Step 1: Verifiable Evidence, VetQI Attendance image is ticked. Below, a red box reads Admin Feedback, Revision Required: Insufficient evidence. Please address the feedback above and resubmit when ready. Close and Next buttons sit at the bottom." loading="lazy"><figcaption>The trainer sees the Admin’s feedback when they edit the map.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="steps">Review a submitted map</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> › <b>Workforce</b> (1), select the trainer (2), then the <b>Units</b> tab (3).' +
          '<figure class="shot" data-marks="2.4,2,5.4,5.8,oval,#; 5,11.4,#1; 17.4,26,arrow-left,tiny; 18.6,18.6,#2; 12.1,37.4,3.4,5.8,oval,#; 13.8,45.2,#3"><img src="assets/img/wf-map-units.png" alt="Workforce Management with the Workforce tab circled as marker 1, an arrow pointing at Staff Demo in the Now viewing card as marker 2, and the Units tab circled as marker 3. Below, Units Delivered: 16 lists units such as BSBCRT412 Articulate, present and debate ideas, approved, and BSBFIN501 Manage budgets and financial plans, assigned, each with its course, team, unit status, an evidence map icon and dates." loading="lazy"><figcaption>Open the Workforce tab (1), select the trainer (2), then the Units tab (3).</figcaption></figure></li>' +
        '<li>Look for a unit marked <b>Submitted</b> or <b>Resubmitted</b>, with a red <b>!</b> beside its evidence map icon. Select the icon to open the map. Its status reads <b>Submitted for Review</b>.' +
          '<figure class="shot" data-marks="73.8,24,2.6,52,oval,#"><img src="assets/img/wf-map-submitted.png" alt="A unit row on the Units tab: BSBOPS501 Manage business resources, Diploma of Business, Business Faculty, status Submitted, the evidence map icon, which is circled, with a red exclamation mark beside it, assigned 08/10/2026, and No map provided." loading="lazy"><figcaption>A submitted map, with a red ! beside its icon. Select the icon (circled) to open it.</figcaption></figure></li>' +
        '<li>Check the <b>Verifiable Evidence</b> (1), and the <b>Vocational Competency</b> (2) and <b>Industry Currency</b> (3) statements.' +
          '<figure class="shot shot-medium" data-marks="2.3,16.7,95.4,30,zone,#1; 2.3,48,95.4,18.4,zone,#2; 2.3,67.7,95.4,18.4,zone,#3"><img src="assets/img/wf-map-review.png" alt="An evidence map for BSBOPS501 Manage business resources, with status Submitted for Review and an Edit button. Marker 1 outlines Verifiable Evidence, four documents each with a download button. Marker 2 outlines the Vocational Competency statement, and marker 3 the Industry Currency statement. Reject and Accept buttons sit at the bottom." loading="lazy"><figcaption>Verifiable Evidence (1), Vocational Competency (2) and Industry Currency (3).</figcaption></figure></li>' +
        '<li>Select <b>Accept</b> to approve it, or <b>Reject</b> to send it back.' +
          '<div class="callout note"><b>Note</b><span>When you reject a map, add notes for the trainer explaining what’s missing, such as “Insufficient evidence”. The map goes back to draft, and the trainer sees your notes when they edit it.</span></div></li>' +
      '</ol>' +
      '<p>Resubmitted maps are reviewed the same way.</p>' +
      '<div class="callout warn"><b>Important</b><span>If a trainer or Admin deletes a document used in an approved evidence map, the map reverts to draft. It then appears under Admin Action as <b>Reverted from approved</b> and needs approving again.</span></div>',

    // Document Management FAQs, shown on the module page under its guides
    'prog-overview':
      '<p class="lead">Program Management is where your courses and units live. You add courses from training.gov.au, assess each course’s risk, validate its units, and build its Training and Assessment Strategy (TAS).</p>' +
      '<h2 id="open">Open Program Management</h2>' +
      '<p>Select <b>Program Management</b> on your navigation bar.</p>' +
      '<figure class="shot" data-marks="0.6,42.4,15,7.2,oval,#"><img src="assets/img/prog-open.png" alt="Program Management, with Schedule, View Archived and Add Course buttons at the top right and summary cards for Total Programs, Accredited Programs, Units Managed, Risk Assessed and Pending Risk Assessment. Program Management on the navigation bar is circled." loading="lazy"><figcaption>Select Program Management (circled).</figcaption></figure>' +
      '<p>Along the top of the page are three buttons:</p>' +
      '<ul>' +
        '<li><b>Schedule</b> opens your validation schedule and the industry consultation scheduler from <a href="feature.html?m=events">Events</a>.</li>' +
        '<li><b>View Archived</b> shows archived courses and validations. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</li>' +
        '<li><b>Add Course</b> adds a course from training.gov.au, or a custom program. See <a href="article.html?id=prog-add-course">Add a course</a>.</li>' +
      '</ul>' +
      '<h2 id="courses">The Courses tab</h2>' +
      '<p>The <b>Courses</b> tab is the landing page in Program Management. It lists every course, with its team, units, risk status and when it was created, and it’s where you find a course and open it.</p>' +
      '<figure class="shot"><img src="assets/img/prog-courses-tab.png" alt="The Courses tab, with a search box, Filters and Team. Seven courses are listed, each with a tick box, program code, title, team, number of units, a Manage button, risk status and when it was created: BSB50420 Diploma of Leadership and Management, BSB40320 Certificate IV in Entrepreneurship and New Business and BSB50120 Diploma of Business in the Business Faculty, CHC50121 Diploma of Early Childhood Education and Care in Community and Health, CPC30220 Certificate III in Carpentry in Construction, and ACM40122 and BSB20120 in System Default. Risk statuses range from Medium to Very High, and ACM40122 shows Risk Assessment Pending." loading="lazy"><figcaption>The Courses tab.</figcaption></figure>' +
      '<h2 id="find">Find a course</h2>' +
      '<figure class="shot" data-marks="1.4,55,79.6,38,zone,#; 41,32,#1; 81,55,9,38,zone,#; 85.5,32,#2; 89.9,55,8.8,38,zone,#; 94.3,32,#3"><img src="assets/img/prog-find.png" alt="The top of the Courses tab. Marker 1 outlines the Search programs or units box, marker 2 the Filters button and marker 3 the Team button." loading="lazy"><figcaption>Search (1), Filters (2) and Team (3).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Search programs or units</h4><p>Type a course or unit code or title. Matching courses are listed, and any matching units are listed below them under <b>Matching units</b>, with the program they belong to and their validation status.</p>' +
          '<figure class="shot" data-marks="8.2,12,arrow-left,small"><img src="assets/img/prog-search.png" alt="The Courses tab with CPC typed in the search box, with an arrow pointing to it. Two courses match: CPC30220 Certificate III in Carpentry and CPC50220 Diploma of Building and Construction (Building). Below, Matching units shows 50 results, such as CPCCCA2011 Handle carpentry materials in CPC30220 with validation in progress at 0%, and CPCCBC4001 in CPC50220, not yet validated." loading="lazy"><figcaption>Searching for “CPC” finds two courses and their matching units.</figcaption></figure></li>' +
        '<li class="side"><h4>Filters</h4><p>Narrow the list by <b>Type</b> (Qualifications or Skill Sets) or <b>Accreditation</b> (Accredited or Custom). Select <b>Clear all</b> to start again.</p>' +
          '<figure class="shot shot-columns"><img src="assets/img/prog-filters.png" alt="The Filters menu, with Clear all. Under Type, Qualifications is ticked and Skill Sets is not. Under Accreditation, Accredited is ticked and Custom is not." loading="lazy"><figcaption>Showing accredited qualifications only.</figcaption></figure></li>' +
        '<li class="side"><h4>Team</h4><p>Show only the courses for a team. Type in <b>Filter teams</b> to find one.</p><p>Courses in <b>System Default</b> are the ones not yet assigned to a team, so every team can see them. See <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</p>' +
          '<figure class="shot shot-columns"><img src="assets/img/prog-team.png" alt="The Team list with a Filter teams box, listing teams such as Business Faculty, Community and Health, Compliance and Validation, Construction, Executive Team, System Default, marked Default, Systems and Digital Services, and Training Delivery and Programs." loading="lazy"><figcaption>Choose a team.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="row">Course actions</h2>' +
      '<figure class="shot" data-marks="59,64.7,8.2,8.9,oval,above,#1; 95.6,67.3,1.1,4,oval,above,#2; 84.5,73.8,13,25.9,zone,#; 3.2,52.8,1.3,35.1,oval,above,#3"><img src="assets/img/prog-course-actions.png" alt="The Courses tab, with two course rows: BSB50120 Diploma of Business in System Default, with 0 units and Risk Assessment Pending, created 7 days ago, and SIT50422 Diploma of Hospitality Management in System Default, with 1 unit, rated Low-Medium. The first Manage button is circled as marker 1. The ⋮ for BSB50120 is circled as marker 2, and its open menu, with View Details, Risk Assessment and Archive, is outlined. The tick boxes, including the one in the header, are circled together as marker 3." loading="lazy"><figcaption>Manage (1), the ⋮ and its options (2), and the tick boxes (3).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Manage</h4><p>Opens the course page, where you manage its units and validations. See <a href="article.html?id=prog-add-units">Add and manage a course’s units</a>.</p></li>' +
        '<li><h4>Actions (⋮)</h4><p>Has three options:</p>' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">2.1</span>View Details</h4><p>Shows the course’s details: its title, code, accreditation, level, team and when it was created. Select the pencil to change its title or team. Under <b>Program Risk Summary</b> are its risk level, risk score, validation frequency and the risk factors selected.</p>' +
              '<figure class="shot shot-medium"><img src="assets/img/prog-details.png" alt="Program Details for CPC30220 Certificate III in Carpentry: TGA Accredited, a Qualification, created 2 months ago, in the Construction team, with pencils to edit the title and team. The Program Risk Summary shows a High risk level, a risk score of 7.8 out of 10, a validation frequency of every 36 months, and the selected risk factor Face-to-face delivery mode." loading="lazy"><figcaption>A course’s details and risk summary.</figcaption></figure></div>' +
            '<div><h4><span class="sn">2.2</span>Risk Assessment</h4><p>Complete the risk assessment for a course marked <b>Risk Assessment Pending</b>, or change one that needs amending. See <a href="article.html?id=prog-add-course#risk">Course Risk Assessment</a>.</p></div>' +
            '<div><h4><span class="sn">2.3</span>Archive</h4><p>Archives the course. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</p><p>There’s no delete option here. To prevent accidental deletion of a course that may have unit validations and other evidence recorded against it, a course can only be deleted once it’s archived, from <b>View Archived</b>.</p></div>' +
          '</div></li>' +
        '<li id="bulk"><h4>Select boxes</h4><p>Select multiple courses to assign them to a team or archive them. Tick the box before each course’s program code, or the box in the header to select every course. A bar shows how many programs are selected:</p>' +
          '<ul>' +
            '<li><b>Assign Team</b> moves the selected courses to a team.</li>' +
            '<li><b>Archive Selected</b> archives them. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</li>' +
            '<li><b>Clear</b> unticks them all.</li>' +
          '</ul>' +
          '<figure class="shot" data-marks="53.3,20.2,44.9,14.4,zone,#; 2.6,57,2.2,38,oval,#"><img src="assets/img/prog-bulk.png" alt="The Courses list with BSB50420 Diploma of Leadership and Management and BSB40320 Certificate IV in Entrepreneurship and New Business ticked, both in the Business Faculty, and their ticked boxes are circled. A bar beside the search, Filters and Team reads 2 programs selected, with Clear, Assign Team and Archive Selected buttons, and is outlined." loading="lazy"><figcaption>Two courses selected, ready to assign to a team or archive.</figcaption></figure></li>' +
      '</ol>',

    'prog-add-course':
      '<p class="lead">RTO Radar is connected to training.gov.au (TGA), so every nationally recognised course is available to add in a few clicks. You can also enter a custom program. Each course is risk assessed as you add it, which sets how often it’s validated.</p>' +
      '<h2 id="steps">Add a course</h2>' +
      '<ol class="steps-list">' +
        '<li>From your navigation bar, go to <b>Program Management</b>, then select <b>Add Course</b>.' +
          '<figure class="shot" data-marks="0.6,39.1,17,6.3,oval,right,#1; 86.5,10.8,9.7,8.1,oval,above,#2"><img src="assets/img/gs-prog-add.png" alt="Program Management, with Schedule, View Archived and Add Course buttons, summary cards for total programs, accredited programs, units managed, risk assessed and pending risk assessment, and the Courses and TAS Builder tabs. Marker 1 circles Program Management in the navigation bar, and marker 2 circles the Add Course button at the top right." loading="lazy"><figcaption>Select Program Management (1), then Add Course (2).</figcaption></figure></li>' +
        '<li>Choose <b>TGA Accredited Courses</b>, or enter a custom program.' +
          '<div class="callout note"><b>Note</b><span>Custom programs aren’t TGA-accredited qualifications. You’ll need to add their units or modules yourself and make sure they meet the relevant industry standards.</span></div></li>' +
        '<li>Under TGA Accredited Courses, search by course code, title or keyword, then select <b>Search TGA</b>.' +
          '<figure class="shot" data-marks="19.6,37.4,17.8,4.2,underline,#1; 18.6,70.6,arrow-left,tiny,#2; 79.2,66,12.1,9.2,oval,right,#3"><img src="assets/img/gs-prog-search.png" alt="Add Courses and Programs, on the TGA Accredited Courses tab. Marker 1 underlines TGA Accredited Courses, marker 2 is an arrow pointing left at the course code BSB50120 entered in the search box, and marker 3 circles the Search TGA button. Hints below say you can search by national code, course title or keywords, and that results come directly from training.gov.au." loading="lazy"><figcaption>On TGA Accredited Courses (1), enter a course code (2), then select Search TGA (3).</figcaption></figure></li>' +
        '<li>Find your course in the search results and select <b>Add Course</b>.' +
          '<figure class="shot" data-marks="73.5,82.6,15.2,6.2,oval,#"><img src="assets/img/gs-prog-results.png" alt="Search results for BSB50120, showing 1 of 1 results: BSB50120 Diploma of Business, marked Qualification and Current. Its Add Course button is circled." loading="lazy"><figcaption>Select Add Course beside your course.</figcaption></figure></li>' +
        '<li>Under <b>Team ownership</b>, choose the team that owns the course. Choose <b>System Default</b> to make it visible to everyone.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-team-ownership.png" alt="Course Information for BSB50120 Diploma of Business. The Team ownership list is open, marked required, with Business and IT ticked. Other teams include System Default (visible to everyone), Administration and Finance, Community and Health, Construction, Executive and Governance, Horticulture, Hospitality and Student Services." loading="lazy"><figcaption>Choose the team that owns the course.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="risk">Course Risk Assessment</h2>' +
      '<p>We recommend assessing a course’s risk straight after you add it. The result sets how often the course is validated. To do it later, select <b>⋮</b> › <b>Risk Assessment</b> on the course’s row. See <a href="article.html?id=prog-overview#row">Course actions</a>.</p>' +
      '<ol class="steps-list">' +
        '<li>Under <b>Course-Specific Risk Factors</b>, answer each question. They’re all required.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-risk-factors.png" alt="Course-Specific Risk Factors: Primary Delivery Mode set to Blended (+1 point), Use of Recognition of Prior Learning set to Minimal use (0 points), Use of unsupervised assessments set to Extensive use (+2 points), a student enrolment volume of 180, where 101 to 200 adds 1 point, and a course completion rate of 72%, where 50% to 74% adds 1 point." loading="lazy"><figcaption>The required course-specific risk factors.</figcaption></figure></li>' +
        '<li>Under <b>Additional Risk Factors</b>, tick any that apply to the course. They’re optional.' +
          '<figure class="shot"><img src="assets/img/prog-risk-additional.png" alt="Additional Risk Factors, each a tick box with the points it adds. Structured work placement or employer-based assessment included (+1 point) and Delivery to international (CRICOS) students (+1 point) are ticked. Others include delivery below nominal hours, new or recently updated assessment tools, a course new to the RTO, offshore delivery (+2 points), government funding contracts, apprenticeships or traineeships, and a history of complaints, validation issues or non-compliance (+2 points)." loading="lazy"><figcaption>Tick any additional risk factors that apply.</figcaption></figure></li>' +
        '<li>Review the course risk assessment result and the recommended validation frequency, then select <b>Complete Course Assessment</b>.' +
          '<figure class="shot" data-marks="61.3,86.5,35.2,8.1,oval,#"><img src="assets/img/gs-prog-result.png" alt="The Course Risk Assessment Result: provider risk 3.6 out of 6, course risk 7 out of 24, and a total risk score of 5.2 out of 10, rated Medium Risk. The recommended validation frequency is every 18 months, based on combined provider and course-specific risk factors. The Complete Course Assessment button is circled." loading="lazy"><figcaption>Your course’s risk score and recommended validation frequency.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can change how risk scores map to validation frequencies in <a href="feature.html?m=custom">Customisation</a>.</span></div></li>' +
        '<li>Find your course on the <b>Courses</b> tab in <b>Program Management</b>. See <a href="article.html?id=prog-overview#courses">The Courses tab</a>.' +
          '<figure class="shot"><img src="assets/img/gs-courses-list.png" alt="The Courses list in Program Management, showing three courses with their program code, title, team, number of units, a Manage button for units, risk status from Low to High, and when each was created." loading="lazy"><figcaption>Each course shows its team, number of units and risk status.</figcaption></figure></li>' +
      '</ol>' +
      '<p>Next, add the course’s units. See <a href="article.html?id=prog-add-units">Add and manage a course’s units</a>.</p>' +
      '<div class="callout tip"><b>Tip</b><span>Using aXcelerate? You can import your courses and their units from it instead. See <a href="article.html?id=gs-connect-axcelerate">Import via aXcelerate</a>.</span></div>',

    'prog-course-risk':
      '<p class="lead">Each course has its own risk assessment. Together with your organisational risk, it sets how often the course’s units should be validated.</p>' +
      '<h2 id="calculation">How risk sets validation frequency</h2>' +
      '<p>Risk is worked out in three tiers, and each builds on the one above it:</p>' +
      '<ul class="formulas">' +
        '<li><b>Organisational risk</b><code>Basic profile + Comprehensive risk assessment</code><span>Worked out from your basic and comprehensive risk profiles in Risk Assessment. This is the Risk Score on the Risk Register Overview. See <a href="feature.html?m=risk">Risk Assessment</a>.</span><figure class="shot shot-small"><img src="assets/img/prog-org-risk.png" alt="RTO Radar Demo, RTO 0001, with annual enrolments of 200 students, and a Risk Score of 4.0 out of 10." loading="lazy"><figcaption>An organisational risk score of 4.0 out of 10.</figcaption></figure></li>' +
      '<li><b>Course validation</b><code>Organisational risk score + Course risk assessment</code><span>Course risk comes from the course’s risk assessment, out of 24: its required course-specific risk factors and any additional ones. Combined with your organisational risk, it gives the course a total risk score out of 10. This sets the validation frequency for the course’s units.</span><figure class="shot"><img src="assets/img/gs-prog-result.png" alt="The Course Risk Assessment Result: provider risk 3.6 out of 6, course risk 7 out of 24, and a total risk score of 5.2 out of 10, rated Medium Risk. The recommended validation frequency is every 18 months, marked Custom bands, based on combined provider and course-specific risk factors." loading="lazy"><figcaption>A course’s risk assessment result: its total risk score and recommended validation frequency.</figcaption></figure></li>' +
        '<li><b>Unit validation frequency</b><code>Unit-specific risks + Course risk score, from 1 to 10</code><span>Every unit follows its course’s validation frequency, unless its own risks shorten it further: physical risk, sensitive content and completion rate. Each score maps to a validation frequency. By default:</span>' +
        '<table><thead><tr><th>Risk score</th><th>Rating</th><th>Validate every</th></tr></thead><tbody>' +
          '<tr><td>8–10</td><td>Very High Risk</td><td>6 months</td></tr>' +
          '<tr><td>6–7</td><td>High Risk</td><td>12 months</td></tr>' +
          '<tr><td>4–5</td><td>Medium Risk</td><td>18 months</td></tr>' +
          '<tr><td>2–3</td><td>Low-Medium Risk</td><td>24 months</td></tr>' +
          '<tr><td>1</td><td>Low Risk</td><td>36 months</td></tr>' +
        '</tbody></table>' +
        '</li>' +
      '</ul>' +
      '<p>So the riskier your RTO and the course, the more often its units are validated. A change to your organisational risk flows down to every course and unit. Admins can customise these risks in <b>Settings</b> › <b>Customisation</b> › <b>Risk</b>.</p>' +
      '<p>For more, see <a href="article.html?id=risk-provider-factors">Risk scores and validation frequency</a>.</p>' +
      '<h2 id="factors">Course-specific risk factors</h2>' +
      '<p>A course’s industry sector sets part of its risk. Courses in high-risk sectors, such as construction or health, add up to 2 points, more than medium-risk sectors such as hospitality or retail.</p>' +
      '<p>You answer these when you add a course. Each answer adds points to the course’s risk:</p>' +
      '<ul>' +
        '<li><b>Primary delivery mode</b>: online or distance learning adds up to 2 points, more than blended or face-to-face delivery.</li>' +
        '<li><b>Use of Recognition of Prior Learning (RPL)</b>: extensive use of RPL adds up to 2 points.</li>' +
        '<li><b>Use of unsupervised assessments</b>, such as take-home or non-invigilated assessments: extensive use adds up to 2 points.</li>' +
        '<li><b>Student enrolment volume</b> in the past 12 months: 0–100 students adds no points, 101–200 adds 1, and 201 or more adds 2.</li>' +
        '<li><b>Course completion rate</b> in the past 12 months: 75–100% adds no points, 50–74% adds 1, and under 50% adds 2.</li>' +
        '<li><b>Additional risk factors</b>: such as delivery below nominal hours, work placement, new assessment tools, a course new to the RTO, CRICOS students, government funding, or apprenticeships and traineeships. Each adds 1 point. Offshore delivery and a history of complaints, validation issues or non-compliance for the course each add 2.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium"><img src="assets/img/prog-risk-all.png" alt="Course-Specific Risk Factors: Primary Delivery Mode Blended (+1 point), Use of RPL Minimal use (0 points), Use of unsupervised assessments Extensive use (+2 points), an enrolment volume of 180, where 101 to 200 adds 1 point, and a completion rate of 72%, where 50% to 74% adds 1 point. Below, Additional Risk Factors, each worth 1 or 2 points, with structured work placement and delivery to international CRICOS students ticked." loading="lazy"><figcaption>The course-specific and additional risk factors, each with the points it adds.</figcaption></figure>' +
      '<p>To view or change a course’s risk assessment, select <b>⋮</b> › <b>Risk Assessment</b> on its row. See <a href="article.html?id=prog-overview#row">Course actions</a>.</p>' +
      '<div class="callout tip"><b>Tip</b><span>A course’s validation frequency can be shorter than your organisational one, never longer. If a course is validated more often than you expect, check its course-specific risk factors.</span></div>' +
      '<h2 id="unit">Unit-specific risk factors</h2>' +
      '<p>Every unit follows its course’s validation frequency, unless its own risks shorten it further: its <b>Physical Risk</b>, any <b>Sensitive Content</b> and its <b>Completion Rate (%)</b>. Each unit shows its own recommended validation frequency.</p>' +
      '<figure class="shot"><img src="assets/img/prog-unit-frequency.png" alt="The unit BSBAUD411 Participate in quality audits, marked Validation Recommended Every 6 months and Validation not scheduled, with Validate Now, Schedule and ⋮ buttons. It is a Core unit with Medium physical risk, Medium sensitive content, and a completion rate of 70%, set for this unit, with a Use course rate link." loading="lazy"><figcaption>A unit with medium physical risk and sensitive content, recommended for validation every 6 months.</figcaption></figure>' +
      '<p>In this example, the course is validated every 18 months. But this unit has medium physical risk, medium sensitive content and a low completion rate of 70%, so it must be validated more often than the course’s other units: every 6 months.</p>' +
      '<p>A unit’s completion rate starts as its course’s. To set its own, enter it in <b>Completion Rate (%)</b>. Select <b>Use course rate</b> to go back to the course’s. See <a href="article.html?id=prog-add-units#risk">Unit risks configuration</a>.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins can change how risk scores map to validation frequencies. See <a href="article.html?id=cust-frequency-bands">Validation frequency bands and escalation</a>.</span></div>',

    'prog-add-units':
      '<p class="lead">A course page lists the course’s units. Here you add units, set each unit’s risk, and validate, schedule or record its validations. Through its training.gov.au (TGA) connection, RTO Radar can load every unit in a nationally recognised course, so you don’t need to enter them yourself.</p>' +
      '<h2 id="add">Add units</h2>' +
      '<ol class="steps-list">' +
        '<li>In <b>Program Management</b>, on the <b>Courses</b> tab, select <b>Manage</b> next to your course.' +
          '<figure class="shot" data-marks="0.6,39.1,15.1,6.4,oval,right,#1; 20.3,4.8,4.2,6.4,oval,#2; 62,60.2,6.3,7.4,oval,above,#3"><img src="assets/img/gs-prog-manage.png" alt="Program Management on the Courses tab, listing BSB50120 Diploma of Business in the Business Faculty with 0 units and a Medium risk status, and CHC50121 Diploma of Early Childhood Education and Care with 26 units. Marker 1 circles Program Management in the navigation bar, marker 2 the Courses tab, and marker 3 the Manage button for the Diploma of Business." loading="lazy"><figcaption>Select Program Management (1), the Courses tab (2), then Manage next to your course (3).</figcaption></figure></li>' +
        '<li>Select <b>Add Unit</b>. Under <b>Search TGA units</b>, select <b>Search [course code]’s Units</b> to load all the units in your course, or enter a unit code to find one.' +
          '<figure class="shot" data-marks="86.9,4.2,9.9,11.6,oval,#1; 8.1,42,15.6,5.4,underline,#2; 66.4,52,28.3,12.7,oval,above,#3"><img src="assets/img/gs-prog-add-unit.png" alt="The Add Unit panel for BSB50120. Marker 1 circles the Add Unit button at the top right, marker 2 underlines Search TGA units, and marker 3 circles the Search BSB50120’s Units button beside the search box. A Create custom unit option sits above, and a hint says to enter a unit code or select the button to load all BSB50120 units." loading="lazy"><figcaption>Select Add Unit (1), then under Search TGA units (2), select Search [course code]’s Units (3).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Unit not on training.gov.au? Choose <b>Create custom unit</b> instead.</span></div></li>' +
        '<li>Filter and select from core or elective units, or from unit groups.</li>' +
        '<li>When you’re happy with your units, select <b>Add Selected</b>. The button shows how many units you’ve chosen.' +
          '<figure class="shot" data-marks="8.7,25.8,3.4,6.6,oval,#1; 18.6,9,15.6,7.4,oval,right,#2"><img src="assets/img/gs-prog-select-units.png" alt="The unit list for the course, showing 12 of 12 units selected: 5 core and 7 elective. Units are grouped under Core Units and Group A, Business Operations, each with a ticked box, its code, Core or Elective, and Current. Filters for status, type and group sit at the top. Marker 1 circles the ticked box beside the first core unit, and marker 2 circles the Add Selected (12) button." loading="lazy"><figcaption>Tick the units you want (1), then select Add Selected (2).</figcaption></figure></li>' +
        '<li>Select <b>Save Changes</b> at the top of the page.' +
          '<figure class="shot" data-marks="82.6,18.4,12.6,8.6,oval,#"><img src="assets/img/gs-prog-save.png" alt="Manage Course Units for BSB50120 Diploma of Business, marked Unsaved Changes. The Save Changes button at the top right is circled. Below, the added units are marked Added in the unit list." loading="lazy"><figcaption>Select Save Changes. Until you do, the page shows Unsaved Changes.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="find">Find a unit</h2>' +
      '<p>There are two ways to reach a unit. Both open the course’s <b>Course Units</b>.</p>' +
      '<ol class="ov-list">' +
        '<li><h4>Manage</h4><p>On the <b>Courses</b> tab, select <b>Manage</b> next to the course.</p>' +
          '<figure class="shot" data-marks="59.4,25,8,52,oval,#"><img src="assets/img/prog-manage-row.png" alt="The row for CHC22015 Certificate II in Community Services, in Community and Health, with 24 units, a Manage button, which is circled, and a Medium risk status." loading="lazy"><figcaption>Select Manage (circled) next to the course.</figcaption></figure></li>' +
        '<li><h4>Search</h4><p>On the <b>Courses</b> tab, search for the unit by its code or title. It’s listed under <b>Matching units</b>, with the program it belongs to.</p>' +
          '<figure class="shot" data-marks="8.2,12,arrow-left,small"><img src="assets/img/prog-search.png" alt="The Courses tab with CPC typed in the search box. Two courses match: CPC30220 Certificate III in Carpentry and CPC50220 Diploma of Building and Construction (Building). Below, Matching units shows 50 results, such as CPCCCA2011 Handle carpentry materials in CPC30220 with validation in progress at 0%, and CPCCBC4001 in CPC50220, not yet validated." loading="lazy"><figcaption>Searching for “CPC” lists matching units under Matching units.</figcaption></figure></li>' +
      '</ol>' +
      '<p>Under <b>Course Units</b>, search by unit code or title, and choose how to sort the list and how many units to show per page.</p>' +
      '<figure class="shot"><img src="assets/img/gs-course-units-v2.png" alt="Course Units (12), with Search Units, Sort By, Order and Units per page, showing 10 of 12 units, page 1 of 2. Each unit shows its code and title, its recommended validation frequency, whether a validation is scheduled, Validate Now and Schedule buttons, and settings for unit type, physical risk, sensitive content and completion rate." loading="lazy"><figcaption>Course Units, with search and sort at the top.</figcaption></figure>' +
      '<h2 id="risk">Unit risks configuration</h2>' +
      '<p>Under <b>Course Units</b>, set each unit’s risks on its card: choose its <b>Physical Risk</b> and <b>Sensitive Content</b>, and enter its <b>Completion Rate (%)</b>. A unit’s completion rate starts as its course’s. Select <b>Use course rate</b> to go back to it. These risks can shorten how often the unit is validated, shown on the card as its recommended validation frequency. To understand risks and validation frequency, see <a href="article.html?id=prog-course-risk">Course risk and validation frequency</a>.</p>' +
      '<figure class="shot" data-marks="27.4,66,6.8,11,underline,#; 50.8,66,6.8,11,underline,#; 74.4,69.4,8.4,11,underline,#"><img src="assets/img/prog-unit-frequency.png" alt="The unit BSBAUD411 Participate in quality audits, marked Validation Recommended Every 6 months and Validation not scheduled, with Medium physical risk, Medium sensitive content, and a completion rate of 70%, set for this unit, with a Use course rate link. The Medium physical risk, Medium sensitive content and 70% completion rate are underlined." loading="lazy"><figcaption>A unit’s risks, set on its card.</figcaption></figure>',

    'prog-schedule-validation':
      '<p class="lead">Schedule a unit validation to book it in ahead of time, start a new validation, or continue one that’s already under way.</p>' +
      '<h2 id="due">Validation tracker</h2>' +
      '<p>The colour of a unit’s <b>Validate Now</b> button shows what stage its validation is at.</p>' +
      '<figure class="shot shot-medium"><img src="assets/img/prog-validation-tracker.png" alt="Three validation stages, each with a coloured tick icon: navy for validated or no validation due yet, blue for validation in progress, and coral for never validated or validation overdue." loading="lazy"></figure>' +
      '<h2 id="steps">Schedule a validation</h2>' +
      '<ol class="steps-list">' +
        '<li>Open the course and find the unit. See <a href="article.html?id=prog-add-units">Add and manage a course’s units</a>.</li>' +
        '<li>Select <b>Schedule</b>. The <b>Program</b> and <b>Unit</b> are filled in for you.' +
          '<figure class="shot" data-marks="81.6,53.6,10.1,7.4,oval,#"><img src="assets/img/prog-schedule-unit.png" alt="Course Units with CHCECE046 typed in Search Units, showing 1 of 1 units: CHCECE046 Implement strategies for the inclusion of all children, a core unit marked Validation Recommended Every 24 months and Validation not scheduled. Its Schedule button, beside Validate Now, is circled." loading="lazy"><figcaption>Select Schedule (circled) on the unit.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Just added a unit to the course? Save first. You can’t validate a new unit until you select <b>Save Changes</b> at the top right of the page.</span></div></li>' +
        '<li>Choose the <b>Scheduled Date</b> and the <b>Assigned Validator</b>, change the <b>Priority Level</b> if needed, and add any <b>Notes</b>. Then select <b>Schedule Validation</b>.' +
          '<figure class="shot shot-medium" data-marks="75.2,92.4,22,6,oval,#"><img src="assets/img/prog-schedule-form.png" alt="Schedule Validation for CHC30125 Certificate III in Early Childhood Education and Care, in Community and Health, and the unit CHCECE046 Implement strategies for the inclusion of all children, both filled in. Scheduled Date and Assigned Validator are required and empty, Priority Level is Medium, and the Notes read Scheduled from recommendation. Risk score: 0. The Schedule Validation button is circled." loading="lazy"><figcaption>The program and unit are filled in for you. Select Schedule Validation (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<p>When you start the validation later, you can link it to this schedule.</p>' +
      '<h2 id="start">Start a validation</h2>' +
      '<ol class="steps-list">' +
        '<li>Open the course, find the unit and select <b>Validate Now</b>.' +
          '<figure class="shot" data-marks="69.2,9.2,13,16.4,oval,#"><img src="assets/img/prog-validate-now.png" alt="The unit CHCECE046 Implement strategies for the inclusion of all children, marked Validation Recommended Every 24 months and Validation not scheduled, with a core unit type, no physical risk or sensitive content, and a completion rate of 70%. Its Validate Now button is circled." loading="lazy"><figcaption>Select Validate Now (circled).</figcaption></figure></li>' +
        '<li><b>Validation Versions</b> opens. Select <b>Start New Validation</b>. If the unit hasn’t been validated before, this creates Version 1.' +
          '<figure class="shot shot-medium" data-marks="2.5,78,95,16.1,zone,#"><img src="assets/img/prog-validation-new.png" alt="Validation Versions for CHCECE046, with no validations recorded yet for the unit, and a note to start a new validation to create Version 1. The Start New Validation button is outlined." loading="lazy"><figcaption>Select Start New Validation (outlined).</figcaption></figure></li>' +
        '<li>In <b>Unit Validation Schedule</b>, choose the validation scheduled for this unit to link to it. The schedule is marked complete once this validation is completed. If none applies, choose <b>Begin ad hoc validation</b> to run it without closing any schedule.' +
          '<figure class="shot shot-medium" data-marks="4.4,52.7,91.7,14,zone,#; 84.7,88.4,arrow-down,small"><img src="assets/img/prog-link-schedule.png" alt="Unit Validation Schedule, to link version 4 of CHCECE046 to a scheduled validation. Two scheduled validations are listed: 23/03/2026, medium priority, assigned to Staff Demo, and 26/10/2026, medium priority, assigned to Admin Demo, which is selected and outlined. Below is Begin ad hoc validation, which runs the validation without closing any schedule. Cancel and Begin validation are at the bottom, with an arrow pointing down to Begin validation." loading="lazy"><figcaption>Choose the scheduled validation to link to, then select Begin validation.</figcaption></figure></li>' +
        '<li>Select <b>Begin validation</b>.</li>' +
      '</ol>' +
      '<h2 id="continue">Continue a unit validation</h2>' +
      '<p>If the unit has validations in progress or completed, select <b>Validate Unit</b> on the unit to see them in <b>Validation Versions</b>.</p>' +
      '<figure class="shot" data-marks="72.7,2.5,12.6,5.1,oval,#"><img src="assets/img/prog-validate-unit-done.png" alt="The unit CHCECE042 Foster holistic early childhood learning, development and wellbeing, last validated on 16/03/2026, with a validation scheduled for 23/03/2026 with Staff Demo. Below its risks, Unit Validation Complete shows version 1, completed by Staff Demo on 16/03/2026, with comments and Export PDF, Export Word and View Validation buttons. The Validate Unit button at the top right is circled." loading="lazy"><figcaption>Select Validate Unit (circled) to open Validation Versions.</figcaption></figure>' +
      '<div class="callout warn"><b>Important</b><span>You can only continue the validations you started. Validations started by others are view only, unless your role has the <b>Lead Validator</b> permission. See <a href="article.html?id=users-roles">Built-in roles and their permissions</a>.</span></div>' +
      '<figure class="shot shot-medium" data-marks="72.5,5.3,18.8,5.1,oval,#"><img src="assets/img/prog-validation-versions.png" alt="Validation Versions for a unit. Version 3 is In Progress at Phase 1, 20% complete, created 1 month ago by John Doe, whose Continue validation button is circled, with Link to Existing Validation Schedule and Continue validation buttons. Version 2 is Completed at Phase 4, 100% complete, by Admin Demo, with a View button. Version 1 is In Progress at Phase 2, 47% complete. Each is an ad hoc validation with no schedule linked. Start New Validation is at the bottom." loading="lazy"><figcaption>Three versions of a unit validation. Select Continue validation (circled) to carry on with John Doe’s version.</figcaption></figure>' +
      '<p>Each version shows its status, phase and progress, who created it and when, and whether it’s linked to a schedule. From here you can:</p>' +
      '<ul>' +
        '<li>select <b>Continue validation</b> on a version that’s <b>In Progress</b></li>' +
        '<li>select <b>View</b> on a version that’s <b>Completed</b></li>' +
        '<li>select <b>Link to Existing Validation Schedule</b> to link an in-progress version to a schedule</li>' +
        '<li>select <b>Start New Validation</b> to start the next version.</li>' +
      '</ul>' +
      '<p>In this example, Admin Demo has the Lead Validator permission, so they can see and continue John Doe’s Version 3 as well as their own Version 1.</p>',

    'prog-validate-unit':
      '<p class="lead">Once you’ve started a unit validation, upload the unit’s documents. RTO Radar reads them to help generate evidence. Then move through the four phases.</p>' +
      '<h2 id="upload">Upload the files</h2>' +
      '<ol class="steps-list">' +
        '<li>Upload the unit’s documents. Three are required:' +
          '<ul>' +
            '<li><b>Unit of Competency</b>: the official unit, from training.gov.au.</li>' +
            '<li><b>Assessment Tools</b>: your assessment instruments.</li>' +
            '<li><b>Mapping Documents</b>: how your assessment maps to the unit.</li>' +
          '</ul>' +
          '<p>You can also add <b>Marking Guides</b>, your <b>Training &amp; Assessment Strategy</b> (or <b>Select from Approved TAS</b>), <b>Session Plans</b> and any <b>Miscellaneous</b> documents.</p>' +
          '<figure class="shot"><img src="assets/img/prog-upload-files.png" alt="The upload boxes for a unit validation. Unit of Competency, Assessment Tools and Mapping Documents are marked required. Uploaded files include CHC30125_R2.pdf as the unit of competency, two assessment tool PDFs, a mapping CSV, two marking guide PDFs and a Cohort TAS. Session Plans has no files yet. Each box accepts PDF, CSV and TXT files, and each file has download and remove buttons." loading="lazy"><figcaption>The unit’s documents, uploaded into each box.</figcaption></figure></li>' +
        '<li>Select <b>Process Files</b> to begin.' +
          '<figure class="shot" data-marks="47.5,60.6,13.5,26,oval,#"><img src="assets/img/prog-process-files.png" alt="Ready to Begin Validation: you have 7 files ready, with a Skip Files tick box and a Process Files button, which is circled." loading="lazy"><figcaption>Select Process Files (circled).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Files must be PDF, CSV or TXT. The <b>File Formats Wiki</b> on the page explains how to save each one from Word or Excel.</span></div></li>' +
        '<li>RTO Radar processes your files, showing its progress as each one finishes. A file may not process if it’s uploaded in the wrong box or is the wrong file type. It’s marked with a red cross. Check it’s in the right box and saved as a PDF, CSV or TXT file, then upload it again.' +
          '<div class="shot-pair"><figure class="shot"><img src="assets/img/prog-processing.png" alt="Processing Files, extracting content from your documents: 2 of 7 files, 29%. The unit of competency and one assessment tool are ticked as done, two more are processing, and the marking guides and TAS are waiting." loading="lazy"><figcaption>Files being processed.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/prog-processing-failed.png" alt="Processing Complete: 0 of 1 files processed successfully. The marking guide CHCECE046-AG-F-v1.1.pdf has a red cross." loading="lazy"><figcaption>A file that didn’t process, marked with a red cross.</figcaption></figure></div></li>' +
        '<li>When your files are processed, select <b>Next</b> to start the validation.</li>' +
      '</ol>' +
      '<p>To validate without documents, tick <b>Skip Files</b> instead. RTO Radar can’t then generate evidence for you.</p>' +
      '<h2 id="navigation">Navigation</h2>' +
      '<p>Move between the phases from the navigation bar in the header, or from <b>Validation Progress</b> in the sidebar on the left. Each phase unlocks only once the one before it is complete.</p>' +
      '<figure class="shot"><img src="assets/img/prog-navbar.png" alt="The navigation bar in the header of the VET Compliance Validation Assistant: Home, Program Management, Course CHC50121, Unit CHCECE046 (v4), Upload Files, Phase 1, Phase 2, Phase 3 and Phase 4, with Progress saved at the right." loading="lazy"><figcaption>The navigation bar in the header.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Need the files someone else uploaded for a unit validation? Open their validation and select <b>Upload Files</b> in the header. From there you can download each file.</span></div>' +
      '<figure class="shot shot-narrow"><img src="assets/img/prog-progress-sidebar.png" alt="Validation Progress. Phase 1: Validation Preparation is complete, with File Analysis and Setup, Validation Team Profile and Cohort Description ticked. Phase 2: Validation Check against UoC is in progress at question 21 of 27, with Q18 to Q20 ticked, Q21 selected, and Q22 to Q25 still to do. Phase 3: Summary of Validation Findings and Phase 4: Add Improvement Items are locked." loading="lazy"><figcaption>The Validation Progress sidebar.</figcaption></figure>' +
      '<p>Next, work through the four phases. See <a href="article.html?id=prog-validation-phases">Work through the four validation phases</a>.</p>',

    'prog-validation-phases':
      '<p class="lead">A unit validation has four phases. Your progress saves as you go. To move between them, see <a href="article.html?id=prog-validate-unit#navigation">Navigation</a>.</p>' +
      '<h2 id="phase1">Phase 1: Validation Preparation</h2>' +
      '<ol class="steps-list">' +
        '<li><b>Unit Details</b>: check the <b>Unit Code</b> and <b>Unit Title</b>, then select <b>Confirm Details</b>.' +
          '<figure class="shot shot-small" data-marks="44,78.5,26.4,8.2,oval,#"><img src="assets/img/prog-p1-unit.png" alt="Phase 1: Validation Preparation, Unit Details. Unit Code CHCECE046 and Unit Title Implement strategies for the inclusion of all children, with Back to Upload and Confirm Details buttons." loading="lazy"><figcaption>Check the unit code and title, then select Confirm Details (circled).</figcaption></figure></li>' +
        '<li><b>Validation Team Profile</b>: enter <b>Your Name</b> and <b>Your Role</b>, and tick your relevant experience, such as VET experience, industry currency or TAE qualified. Under <b>Additional Validators</b>, select <b>Add person</b> for anyone else present. They’ll appear on the validation’s exports.' +
          '<figure class="shot" data-marks="10.6,84.3,6.1,6.1,oval,#"><img src="assets/img/prog-p1-team.png" alt="Validation Team Profile: Your Name Admin Demo, Your Role Training Manager, and VET experience ticked among Industry Currency, Industry Experience, TAE Qualified and External validator. Under Additional Validators, Staff Demo is recorded as an Observer, with an Add person button." loading="lazy"><figcaption>Your details, experience and any additional validators. Select Continue (circled).</figcaption></figure></li>' +
        '<li><b>Cohort Description</b>: tick the AQF levels, and enter the approximate student count, the delivery mode and any additional context.' +
          '<figure class="shot" data-marks="10.8,84.5,6.1,5.8,oval,#"><img src="assets/img/prog-p1-cohort.png" alt="Cohort Description: Certificate III ticked under AQF levels, an approximate student count of 150, Blended ticked as the delivery mode, and Additional Context describing mostly part-time school leavers and career changers, around 20% with English as an additional language. The Continue button is circled." loading="lazy"><figcaption>Describe the cohort, then select Continue (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="phase2">Phase 2: Validation Check against UoC</h2>' +
      '<p>Work through the 27 questions. Answer each one <b>Yes</b>, <b>No</b> or <b>Partially</b>, and add your <b>Comments &amp; Evidence</b>.</p>' +
      '<p><b>Generate Evidence</b> drafts the evidence from your processed files. It needs files uploaded and processed.</p>' +
      '<figure class="shot" data-marks="89.6,50.6,8.8,8.1,oval,#"><img src="assets/img/prog-p2-generate.png" alt="Question 2 of 27: Have the assessment tools been reviewed internally and contextualised to the student cohort? Yes is selected and the Comments and Evidence box is empty. The Generate Evidence button is circled." loading="lazy"><figcaption>Select Generate Evidence (circled) to draft the evidence.</figcaption></figure>' +
      '<p>Then select <b>Save &amp; Next Question</b>.</p>' +
      '<figure class="shot" data-marks="12.4,92.8,14,4.7,oval,#"><img src="assets/img/prog-p2-answered.png" alt="Question 2 of 27: Have the assessment tools been reviewed internally and contextualised to the student cohort? Yes is selected. The generated evidence covers contextualisation to the cohort and industry, RTO branding, version and document control, and alignment with the Cohort TAS, followed by an overall summary. Quick Suggestions are below, then Previous Question and Save and Next Question, which is circled." loading="lazy"><figcaption>Evidence generated from the unit’s documents. Select Save &amp; Next Question (circled).</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>Selecting <b>Save &amp; Next Question</b> saves each answer, so you can leave and continue the validation at any time. If two validators edit the same question at once, the latest change is kept.</span></div>' +
      '<div class="callout tip"><b>Tip</b><span><b>Quick Suggestions</b> under each question give pointers on what to check.</span></div>' +
      '<h2 id="phase3">Phase 3: Summary of Validation Findings</h2>' +
      '<p>RTO Radar summarises your answers. Check and edit each part. Select the pencil <svg class="ui-icon" viewBox="0 0 24 24" aria-label="pencil" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> to change a part or item, and the bin <svg class="ui-icon bin" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to remove an item.</p>' +
      '<ol class="ov-list">' +
        '<li><h4>Executive Summary</h4><p>The purpose of the validation and its overall findings.</p>' +
          '<figure class="shot"><img src="assets/img/prog-p3-summary.png" alt="Executive Summary of the unit validation report, with the purpose of validation under the Standards for RTOs, the findings for CHCECE046 with an 81.5% compliance rate, and a note on how RTO Radar supported the report. A pencil to edit is at the top right." loading="lazy"><figcaption>The executive summary.</figcaption></figure></li>' +
        '<li><h4>Overall Compliance Assessment</h4><p>How many criteria are fully, partially and non-compliant, the overall rate, and whether the principles of assessment and rules of evidence are met. Select <b>Regenerate Analysis</b> to redraft it.</p>' +
          '<figure class="shot"><img src="assets/img/prog-p3-compliance.png" alt="Overall Compliance Assessment, with a Regenerate Analysis button: 22 fully compliant, 3 partially compliant, 2 non-compliant, and an overall rate of 81.5%, rated Adequate, with a summary, strengths and compliance metrics." loading="lazy"><figcaption>The overall compliance assessment.</figcaption></figure></li>' +
        '<li><h4>Key Strengths Identified</h4><p>What the assessment does well. Select <b>Add Strength</b> to add one.</p>' +
          '<figure class="shot" data-marks="91.2,3.7,7,5.2,oval,#"><img src="assets/img/prog-p3-strengths.png" alt="Key Strengths Identified, with an Add Strength button. Assessment Toolkit Integrity, Contextualisation and Relevance, and Comprehensive Assessor Guidance, each with a description, evidence, and edit and delete buttons." loading="lazy"><figcaption>Key strengths, each with its description and evidence. Select Add Strength (circled) to add one.</figcaption></figure></li>' +
        '<li><h4>Critical Areas Requiring Attention</h4><p>Each issue, with its risk, consequence, recommended action, severity and the affected PCs and KEs. Select <b>Add Critical Area</b> to add one.</p>' +
          '<figure class="shot" data-marks="90.2,3.4,8.5,5,oval,#"><img src="assets/img/prog-p3-critical.png" alt="Critical Areas Requiring Attention, with an Add Critical Area button. Assessment Conditions and Authenticity of Assessment Evidence, each medium severity, with the issue, risk, consequence and recommended action." loading="lazy"><figcaption>Critical areas, each with its risk, consequence and recommended action. Select Add Critical Area (circled) to add one.</figcaption></figure></li>' +
        '<li><h4>Improvement Recommendations</h4><p>Each recommendation, with the actions required and its priority. Select <b>Add Improvement</b> to add one.</p>' +
          '<figure class="shot" data-marks="89.3,3.7,9,5,oval,#"><img src="assets/img/prog-p3-improvements.png" alt="Improvement Recommendations, with an Add Improvement button. Assessment Instructions Clarity and Sufficiency of Evidence, each medium priority, with a recommendation, actions required and an ASQA practice guide reference." loading="lazy"><figcaption>Improvement recommendations, each with its actions and priority. Select Add Improvement (circled) to add one.</figcaption></figure></li>' +
        '<li><h4>Compliance Readiness</h4><p>Whether the unit is ready for audit, and a target timeline.</p>' +
          '<figure class="shot"><img src="assets/img/prog-p3-readiness.png" alt="Compliance Readiness, marked Needs Improvement, with a summary, two blockers, suggested next steps over weeks 1 to 6, and a target timeline of 6 weeks." loading="lazy"><figcaption>Compliance readiness, with blockers, next steps and a target timeline.</figcaption></figure></li>' +
      '</ol>' +
      '<p>Use the regenerate buttons to redraft a part. <b>Quick actions</b> let you reset to the AI version, reset to default, or undo and redo. Then select <b>Continue</b>.</p>' +
      '<h2 id="phase4">Phase 4: Add Improvement Items</h2>' +
      '<ol class="steps-list">' +
        '<li>Under <b>Default Settings for All Items</b>, choose the <b>Person Responsible</b>, <b>Due Date</b> and <b>Default Status</b>.' +
          '<figure class="shot"><img src="assets/img/prog-p4-defaults.png" alt="Default Settings for All Items: Person Responsible set to Training Manager, Due Date 25/11/2026, and Default Status Open." loading="lazy"><figcaption>Default settings for the improvement items.</figcaption></figure>' +
          '<p>Or check each improvement item and set its <b>Person Responsible</b>, <b>Due Date</b> and <b>Status</b> separately.</p>' +
          '<figure class="shot"><img src="assets/img/prog-p4-items.png" alt="Phase 4: Add Improvement Items for CHCECE046, with 5 improvement items identified from the validation analysis. Two come from critical areas and three from improvement recommendations, each medium priority, with a description, a person responsible such as Admin Demo, Compliance Manager, Training Manager or Staff Demo, a due date of 25/11/2026 and a status of Open." loading="lazy"><figcaption>Each improvement item, with its own person responsible, due date and status.</figcaption></figure></li>' +
        '<li>Under <b>Programs covered by this validation</b>, tick any other programs that use the same assessment tools, to link this validation to them too.' +
          '<figure class="shot" data-marks="2.56,50.7,0.6,5.4,oval,#; 92.3,75.6,arrow-down,small"><img src="assets/img/prog-p4-programs.png" alt="Programs covered by this validation: the programs below also contain this unit. CHC50121 Diploma of Early Childhood Education and Care, this validation’s program, is ticked. CHC30125 Certificate III in Early Childhood Education and Care is also ticked, and its tick box is circled. An arrow points down to the Add Items to Register button below." loading="lazy"><figcaption>Tick any other programs that use the same assessment tools (circled), then select Add Items to Register.</figcaption></figure></li>' +
        '<li>Select <b>Add Items to Register</b>, then <b>Submit</b>.</li>' +
      '</ol>' +
      '<p>Each critical area and improvement becomes an item in the <a href="feature.html?m=cir">Continuous Improvement Register</a>, with the source Validation. Under <b>Export Options</b>, select <b>Download PDF</b> or <b>Download DOCX</b> for the validation report. Any rich text in Phase 2’s Comments &amp; Evidence is exported as plain text.</p>' +
      '<figure class="shot shot-narrow"><img src="assets/img/prog-export-options.png" alt="Export Options, noting that any rich text used in the Comments and Evidence section in Phase 2 will be exported as plain text only, with Download PDF and Download DOCX buttons." loading="lazy"><figcaption>Export the validation report as a PDF or Word document.</figcaption></figure>',

    'prog-complete-validation':
      '<p class="lead">Validated a unit outside RTO Radar? Upload the evidence so the validation is recorded against the unit.</p>' +
      '<h2 id="steps">Record a validation</h2>' +
      '<ol class="steps-list">' +
        '<li>Open the course, find the unit and select <b>⋮</b> › <b>Complete Validation</b>.' +
          '<figure class="shot" data-marks="94,6.9,4,12.5,oval,above,#1; 79.6,22.9,17.6,9.7,oval,#2"><img src="assets/img/prog-complete-menu.png" alt="The unit CHCECE041 Maintain a safe and healthy environment for children, with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ button is circled as marker 1, and Complete Validation as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Complete Validation (2).</figcaption></figure></li>' +
        '<li>Choose <b>Upload Validation Evidence</b>. (<b>Complete in RTO Radar</b> starts a validation instead.)' +
          '<figure class="shot shot-medium" data-marks="5,73.3,86,23.7,zone,#"><img src="assets/img/prog-complete-option.png" alt="Complete Validation for CHCECE041 Maintain a safe and healthy environment for children, asking how you’d like to complete this validation: Complete in RTO Radar, to run the full validation workflow with AI-assisted analysis, or Upload Validation Evidence, to upload an existing validation document completed outside RTO Radar. Upload Validation Evidence is selected and outlined." loading="lazy"><figcaption>Choose Upload Validation Evidence (outlined).</figcaption></figure></li>' +
        '<li>Upload the <b>Validation Evidence Document</b> and choose the <b>Validation Completion Date</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-complete-evidence.png" alt="The Validation Evidence Document CHCECE041_Validation_Report_Oct2026.pdf, uploaded, and a Validation Completion Date of 26/10/2026." loading="lazy"><figcaption>The uploaded evidence and its completion date.</figcaption></figure></li>' +
        '<li>Under <b>Programs covered by this validation</b>, tick every program that uses this unit. They share the same evidence, completion date and open schedules. Add any <b>Notes</b>, then select <b>Complete Validation</b>.' +
          '<figure class="shot shot-medium" data-marks="71.5,85.4,arrow-down,small"><img src="assets/img/prog-complete-programs.png" alt="Programs covered by this validation: select every program that uses CHCECE041, and the same evidence, completion date and open schedules will be synchronised. CHC50121 Diploma of Early Childhood Education and Care and CHC30125 Certificate III in Early Childhood Education and Care are both ticked. The notes read: Validated at the October 2026 validation panel meeting. Report signed off by the Training Manager. An arrow points down to the Complete Validation button." loading="lazy"><figcaption>Tick the programs, add any notes, then select Complete Validation.</figcaption></figure></li>' +
      '</ol>',

    'prog-validation-history':
      '<p class="lead">Each validation of a unit is kept as a version. You can view, export and share each one.</p>' +
      '<h2 id="view">View and export validations</h2>' +
      '<p>Each completed validation shows on the unit, under <b>Unit Validation Complete</b>, with who completed it, when, its version and any notes. Select <b>View Validation</b> to open it, or <b>Export PDF</b> or <b>Export Word</b> to download it. Earlier versions are in the unit’s validation history.</p>' +
      '<figure class="shot" data-marks="27.7,87.9,13.1,8.7,oval,#"><img src="assets/img/prog-complete-done.png" alt="The unit CHCECE041 Maintain a safe and healthy environment for children, now with a Validate Unit button and last validated on 26/10/2026. Under Unit Validation Complete: completed by Admin Demo on 26/10/2026, with the comments Validated at the October 2026 validation panel meeting. Report signed off by the Training Manager. Export PDF, Export Word and View Validation buttons are below, and View Validation is circled." loading="lazy"><figcaption>A completed validation on the unit. Select View Validation (circled) to open it.</figcaption></figure>' +
      '<h2 id="history">Unit validation history</h2>' +
      '<p>A unit’s validation history keeps a record of all its validations, whether they’re in progress, completed or archived.</p>' +
      '<p>Select <b>⋮</b> on the unit, then <b>Unit Validation History</b>.</p>' +
      '<figure class="shot" data-marks="94,6.9,4,12.5,oval,above,#1; 79.6,34,17.6,9.7,oval,#2"><img src="assets/img/prog-complete-menu.png" alt="The unit CHCECE041 with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ button is circled as marker 1, and Unit Validation History as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Unit Validation History (2).</figcaption></figure>' +
      '<p>Each time a unit is validated, a new version is added, numbered from Version 1. The newest is at the top.</p>' +
      '<figure class="shot"><img src="assets/img/prog-history.png" alt="Unit Validation History for CHCECE046 Implement strategies for the inclusion of all children. Version 5 is completed, with uploaded evidence, shared with 2 programs, completed by Admin Demo on 26/10/2026, with its validation report file and completion notes, and Archive, View and Download buttons. Version 4 is completed in RTO Radar, shared with 2 programs, with a linked schedule. Versions 3 and 1 are in progress, and Version 2 is completed in RTO Radar." loading="lazy"><figcaption>Each version, newest first.</figcaption></figure>' +
      '<p>A version with uploaded evidence has a <b>Download</b> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="download" role="img"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg> button for its validation report, along with any completion notes. <b>Shared with programs</b> shows how many programs the validation covers. To archive a version, select the archive icon <svg class="ui-icon" viewBox="0 0 24 24" aria-label="archive" role="img"><path d="M3 5h18v4H3zM5 9v10h14V9M10 13h4"/></svg>. Find archived validations under <b>View Archived</b> at the top of the Program Management page. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</p>' +
      '<h2 id="share">Share unit validations</h2>' +
      '<p>If the same unit is in more than one of your programs and they use the same assessment tools, one validation can cover them all. Choose the programs it covers under <b>Programs covered by this validation</b>, in Phase 4 of the validation. See <a href="article.html?id=prog-validation-phases#phase4">Phase 4: Add Improvement Items</a>. For a validation completed outside RTO Radar, choose them in <b>Complete Validation</b>. See <a href="article.html?id=prog-complete-validation">Record a validation completed outside RTO Radar</a>.</p>',

    'prog-assessment-judgement':
      '<p class="lead">An assessment judgement validation checks assessment decisions made on student work, after assessment.</p>' +
      '<h2 id="steps">Record an assessment judgement</h2>' +
      '<ol class="steps-list">' +
        '<li>Open the course, find the unit and select <b>⋮</b> › <b>Assessment Judgement</b>. The unit and qualification details are filled in for you.' +
          '<figure class="shot" data-marks="94.6,5.3,3.9,10.2,oval,above,#1; 79.4,34.2,19.6,8.7,oval,#2"><img src="assets/img/prog-aj-menu.png" alt="The unit CHCECE041, last validated on 26/10/2026, with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ button is circled as marker 1, and Assessment Judgement as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Assessment Judgement (2).</figcaption></figure></li>' +
        '<li>Under <b>Validation Context</b>, choose the <b>Delivery Mode</b> and the <b>Assessment Period Reviewed</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-aj-context.png" alt="Assessment Judgement. Unit and Qualification Details are filled in: unit CHCECE041 Maintain a safe and healthy environment for children, qualification CHC50121 Diploma of Early Childhood Education and Care, and the locked validation type Assessment Judgement. Under Validation Context, Delivery Mode is Blended and the Assessment Period Reviewed is 01/01/2026 to 30/09/2026." loading="lazy"><figcaption>The unit details, filled in for you, and the validation context.</figcaption></figure></li>' +
        '<li>Under <b>Validator Details</b>, choose the <b>Validator Role</b>, and enter the <b>Validator Name</b> and <b>Date of Validation</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-aj-validator.png" alt="Validator Details: Validator Role Internal Validator, Validator Name Admin Demo, and Date of Validation 26/10/2026." loading="lazy"><figcaption>The validator’s details.</figcaption></figure></li>' +
        '<li>Under <b>Assessment Evidence Reviewed</b>, tick the assessment tools reviewed, enter the <b>Number of Student Submissions Reviewed</b>, and add an optional <b>Evidence Summary</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-aj-evidence.png" alt="Assessment Evidence Reviewed: knowledge questions, practical observation tools, projects or case studies, third party reports, and marking guides and benchmarks are all ticked. 20 student submissions were reviewed. The evidence summary describes reviewing 20 submissions for CHCECE041 against the unit’s performance criteria, performance evidence and knowledge evidence, finding assessment decisions consistent with the marking guide, and noting one observation checklist that did not clearly map to all performance evidence items for sleep and rest practices." loading="lazy"><figcaption>The assessment tools reviewed, how many submissions, and a summary of the evidence.</figcaption></figure></li>' +
        '<li>Under <b>Evidence Upload</b>, select <b>Select File</b> to attach evidence.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-aj-upload.png" alt="Evidence Upload, with CHCECE041_Assessment_Judgement_Oct2026.pdf (3.4 KB) attached and a bin to remove it." loading="lazy"><figcaption>The uploaded evidence.</figcaption></figure></li>' +
        '<li>Open <b>Actions and Continuous Improvement</b> to record any actions. For each, enter the <b>Action Description</b>, <b>Person Responsible</b>, <b>Due Date</b> and <b>Priority</b>, then select <b>Send to CI Register</b> to add it to the <a href="feature.html?m=cir">Continuous Improvement Register</a>. Select <b>Add Action Item</b> for another.' +
          '<figure class="shot shot-medium" data-marks="6.2,74.3,88,7,zone,#"><img src="assets/img/prog-aj-actions.png" alt="Actions and Continuous Improvement: an action to update the workplace observation checklist so every performance evidence item for sleep and rest practices is mapped explicitly, then re-issue it to assessors. Person Responsible is Training Manager, Due Date 30/11/2026 and Priority Medium. Send to CI Register is outlined, with Add Action Item below." loading="lazy"><figcaption>An action, ready to send to the CI register (outlined).</figcaption></figure></li>' +
        '<li>Tick the <b>Declaration</b>, then select <b>Save Validation</b>.' +
          '<figure class="shot shot-medium" data-marks="3.3,30.2,2.2,9.8,oval,#; 90.7,69.3,arrow-down,small"><img src="assets/img/prog-aj-declaration.png" alt="The Declaration, confirming this assessment validation was conducted in accordance with the Standards for RTOs, ticked, with its tick box circled. An arrow points down to the Save Validation button, beside Cancel." loading="lazy"><figcaption>Tick the declaration (circled), then select Save Validation.</figcaption></figure></li>' +
      '</ol>' +
      '<p>To see past assessment judgements, select <b>⋮</b> › <b>Post Validation History</b>.</p>' +
      '<figure class="shot" data-marks="94.6,5.3,3.9,10.2,oval,above,#1; 79.4,41.6,19.6,8.7,oval,#2"><img src="assets/img/prog-aj-menu.png" alt="The unit CHCECE041 with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ button is circled as marker 1, and Post Validation History as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Post Validation History (2).</figcaption></figure>',

    'prog-industry-consultation':
      '<p class="lead">Record each industry consultation as evidence of industry engagement. Consultations feed the Industry &amp; Feedback section of your TAS.</p>' +
      '<h2 id="steps">Record a consultation</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Courses</b> tab, find the course you want to record the consultation for and select <b>Manage</b>.' +
          '<figure class="shot" data-marks="59.4,25,8,52,oval,#"><img src="assets/img/prog-manage-row.png" alt="The row for CHC22015 Certificate II in Community Services, in Community and Health, with 24 units, a Manage button, which is circled, and a Medium risk status." loading="lazy"><figcaption>Select Manage (circled) next to the course.</figcaption></figure></li>' +
        '<li>On the course page, select <b>Industry Consultation</b>.' +
          '<figure class="shot" data-marks="64.3,58.5,14.2,18.8,oval,#"><img src="assets/img/prog-ic-button.png" alt="Manage Course Units for CHC22015 Certificate II in Community Services, Community and Health, with Industry Consultation, Back and Save Changes buttons. Industry Consultation is circled." loading="lazy"><figcaption>Select Industry Consultation (circled).</figcaption></figure></li>' +
        '<li>Under <b>Program Selection</b>, tick the programs it relates to. Leave it blank to record an organisation-wide consultation.' +
          '<figure class="shot shot-medium" data-marks="4.9,79.5,2.1,3.6,oval,#"><img src="assets/img/prog-ic-programs.png" alt="Industry Consultation, to document industry engagement for this course. Under Program Selection, with a search box, CHC22015 Certificate II in Community Services is ticked, with its tick box circled, and shown as a chip below the list. BSB50120 Diploma of Business, in System Default and in Business Faculty, is not ticked." loading="lazy"><figcaption>Tick the programs the consultation relates to (circled).</figcaption></figure></li>' +
        '<li>Choose the <b>Consultation Date</b> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="calendar" role="img"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/></svg> and <b>Consultation Method</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-details.png" alt="Consultation Details: Consultation Date 27/10/2026 and Consultation Method Video conference." loading="lazy"><figcaption>The consultation date and method.</figcaption></figure></li>' +
        '<li><b>Q1: Industry Representative Details</b>: enter their name, organisation, role and email, or select <b>Select Existing Contact</b>.' +
          '<figure class="shot shot-medium" data-marks="75.4,4.6,23.8,11.4,oval,#"><img src="assets/img/prog-ic-rep.png" alt="Q1: Industry Representative Details, with a Select Existing Contact button, which is circled. Representative Name Community Services Expert, Organisation RTO Radar, Role or Position Subject Expert, and Email communityservicesexpert@rtoradar.com." loading="lazy"><figcaption>The industry representative’s details. Use Select Existing Contact (circled) to choose someone you’ve recorded before.</figcaption></figure></li>' +
        '<li><b>Q2: Topics Discussed</b>: tick each topic covered, and add any <b>Other Topics</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-topics.png" alt="Q2: Topics Discussed. Ticked: training content relevance to current industry practices, assessment methods and industry standards, equipment and technology requirements, emerging skills and knowledge requirements, workplace health and safety considerations, and employment pathways and job roles. Industry licensing or regulatory requirements is not ticked. Other Topics: work placement availability and supervision; digital literacy for client records." loading="lazy"><figcaption>The topics covered in the consultation.</figcaption></figure></li>' +
        '<li><b>Q3: Key Feedback Received</b>: summarise the feedback, insights and recommendations.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-feedback.png" alt="Q3: Key Feedback Received, to document the main insights, suggestions and outcomes from the consultation. The feedback covers relevant core content, digital client records and case notes, de-escalation and boundary-setting in role-plays, working alone and home-visit safety, pathways to further study, and an offer to host two placement students per term." loading="lazy"><figcaption>The key feedback from the consultation.</figcaption></figure></li>' +
        '<li>Optionally, link feedback and attach evidence. Feedback comes from forms built in <b>Complaints &amp; Suggestions</b>, such as an industry feedback form for a course. You can build a form for anything in RTO Radar you want feedback on, and embed it on your website. See <a href="article.html?id=fb-overview">How feedback forms work</a> and <a href="article.html?id=fb-embed">Embed a form on your website</a>.' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>Link feedback submissions</h4><p>Under <b>Link Feedback Submissions</b>, select <b>Show Feedback Search</b> to find feedback form submissions to attach as evidence.</p>' +
              '<figure class="shot shot-medium" data-marks="75.3,23.6,23.6,52.5,oval,#"><img src="assets/img/prog-ic-feedback-search.png" alt="Link Feedback Submissions, to optionally attach feedback form submissions as evidence, with a Show Feedback Search button, which is circled." loading="lazy"><figcaption>Select Show Feedback Search (circled).</figcaption></figure></div>' +
            '<div><h4><span class="sn">2</span>Choose a feedback form</h4><p>On the <b>Forms</b> tab, search for or select the feedback form the submissions came from, such as the course’s industry feedback form.</p>' +
              '<figure class="shot shot-medium" data-marks="5.4,18.2,8.7,9.2,oval,#; 47,71.3,arrow-left,small"><img src="assets/img/prog-ic-forms.png" alt="Link Feedback Submissions, with a Hide Feedback Search button. The Forms tab, which is circled, is selected beside Submissions, with a search box and a list of feedback forms: CHC33021 - CHCCCS031 - Student Evaluation, a general form; CHC22015 - Industry Feedback, a suggestion form, with an arrow pointing to it; and End of Program Survey - ICT50220 Diploma of Information Technology, a general form." loading="lazy"><figcaption>On the Forms tab (circled), select the course’s industry feedback form.</figcaption></figure></div>' +
            '<div><h4><span class="sn">3</span>Add submissions</h4><p>The <b>Submissions</b> tab lists the submissions made against that form. Tick the ones to link, then select <b>Add selected</b>. The button shows how many you’ve chosen.</p>' +
              '<figure class="shot shot-medium" data-marks="10.9,6.3,13.4,12.9,oval,right,#1; 5.9,71,2.6,6.9,oval,#2; 80.4,6.3,18.6,12.9,oval,#3"><img src="assets/img/prog-ic-submissions.png" alt="The Submissions tab, circled as marker 1, viewing the Industry Feedback form, with a Back to all submissions link and a search box. Submission FS-0006, in the Other category and Open, is ticked, and its tick box is circled as marker 2. The Add 1 selected button is circled as marker 3." loading="lazy"><figcaption>On Submissions (1), tick the submissions (2), then select Add selected (3).</figcaption></figure></div>' +
            '<div><h4><span class="sn">4</span>Check the linked feedback</h4><p>The submissions you added appear under <b>Linked Feedback Evidence</b>, with each response. You can link submissions from several forms: repeat sub-steps 2 and 3 to add more. Select <b>Clear linked feedback</b> to remove them all.</p>' +
              '<figure class="shot shot-medium"><img src="assets/img/prog-ic-linked.png" alt="Linked Feedback Evidence: submission FS-0006, Other, open, from RTO Radar, role Subject Expert, email communityservicesexpert@rtoradar.com. Asked whether the course prepares students for entry-level roles, the response is yes, with more practice using digital client records. A Clear linked feedback link is below." loading="lazy"><figcaption>A linked feedback submission.</figcaption></figure></div>' +
            '<div><h4><span class="sn">5</span>Or attach supporting documents</h4><p>Instead of linking feedback from an RTO Radar form, you can attach a document from outside RTO Radar. Under <b>Attachment</b>, select <b>Choose File</b> to attach meeting notes, signed feedback forms or other supporting documents, up to 20 MB.</p>' +
              '<figure class="shot shot-medium"><img src="assets/img/prog-ic-attach.png" alt="Attachment (Optional), with a Choose File button and Industry_Consultation_Feedback_Form_CHC22015.pdf attached. A hint says meeting notes, signed feedback forms or other supporting documents, up to 20MB." loading="lazy"><figcaption>A signed feedback form, attached.</figcaption></figure></div>' +
          '</div></li>' +
        '<li>Optionally, add action items to the Continuous Improvement Register, then save the consultation:' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>Show action items</h4><p>Under <b>Action Items</b>, select <b>Show Action Items</b>.</p>' +
              '<figure class="shot shot-medium" data-marks="79.5,30,20.3,47.5,oval,#"><img src="assets/img/prog-ic-show-actions.png" alt="Action Items, to add improvement actions to the Continuous Improvement Register, with a Show Action Items button, which is circled." loading="lazy"><figcaption>Select Show Action Items (circled).</figcaption></figure></div>' +
            '<div><h4><span class="sn">2</span>Add each action, then save</h4><p>For each action, enter its <b>Description</b>, <b>Person Responsible</b>, <b>Due Date</b> and <b>Priority</b>. Each action becomes an item in the <a href="feature.html?m=cir">Continuous Improvement Register</a>. Then select <b>Save Consultation</b>.</p>' +
              '<figure class="shot shot-medium" data-marks="87.6,91.8,arrow-down,small"><img src="assets/img/prog-ic-actions.png" alt="Action Items with two actions. Action Item 1: add a simulated client record-keeping task, with case notes in a digital system, to the assessment, assigned to the Training Manager, due 31/01/2027, medium priority. Action Item 2: add working-alone and home-visit safety scenarios to WHS materials, assigned to Staff Demo, due 28/02/2027. An arrow points down to the Save Consultation button, beside Cancel." loading="lazy"><figcaption>Two action items from the consultation. Select Save Consultation.</figcaption></figure></div>' +
          '</div></li>' +
        '<li>Your consultation and its evidence are saved in <b>Events</b>. To find them, go to <b>Events</b> › <b>Schedule</b> › <b>Consultations</b> and select <b>View Evidence</b>. See <a href="article.html?id=ev-consultation#view-evidence">View consultation evidence</a>.</li>' +
      '</ol>',

    'prog-tas-overview':
      '<p class="lead">The TAS Builder creates a Training and Assessment Strategy for each qualification, using training.gov.au data and your RTO’s own boilerplate. Every TAS is versioned, reviewed, signed off and stored as a QMS document.</p>' +
      '<h2 id="sources">Where a TAS’s content comes from</h2>' +
      '<table><thead><tr><th>Source</th><th>What it provides</th><th>Where it’s managed</th></tr></thead><tbody>' +
        '<tr><td>training.gov.au</td><td>Qualification description, licensing requirements, packaging rules, release version and date, and the qualification’s units</td><td>Pulled in when you create the Master TAS. Update it with <b>Refresh from TGA</b>.</td></tr>' +
        '<tr><td>Your RTO’s boilerplate</td><td>Standard wording for pathways, entry requirements, pre-training review, cohort profile, delivery, assessment, student support, credit transfer and RPL, resourcing, trainers, validation and risk</td><td>Customisation › TAS templates. See <a href="article.html?id=cust-tas-templates">Customise TAS templates</a>.</td></tr>' +
        '<tr><td>Your RTO’s records in RTO Radar</td><td>Industry contacts and consultations, units and trainers</td><td>Program Management and <a href="article.html?id=prog-industry-consultation">industry consultations</a></td></tr>' +
        '<tr><td>You, per TAS</td><td>Units chosen, hours, assessment methods, clustering and trainers, and any edits to the wording</td><td>The TAS editor</td></tr>' +
      '</tbody></table>' +
      '<h2 id="types">Master and Cohort TAS</h2>' +
      '<ul>' +
        '<li>A <b>Master TAS</b> is the strategy for a qualification. See <a href="article.html?id=prog-master-tas">Build a Master TAS</a>.</li>' +
        '<li>A <b>Cohort TAS</b> is created from a Master TAS for one delivery, such as an intake, campus or delivery mode. <b>Re-sync from Master</b> replaces its content with the Master TAS’s current content. See <a href="article.html?id=prog-cohort-tas">Create a Cohort TAS</a>.</li>' +
      '</ul>' +
      '<h2 id="lifecycle">Status and versions</h2>' +
      '<p class="tag-row"><img src="assets/img/tas-tag-draft.png" alt="Draft"><img src="assets/img/tas-tag-submitted.png" alt="Submitted"><img src="assets/img/tas-tag-approved.png" alt="Approved"><img src="assets/img/tas-tag-rejected.png" alt="Rejected"></p>' +
      '<ol class="ov-list">' +
        '<li><h4>Draft</h4><p>Editable. Save as often as you need.</p></li>' +
        '<li><h4>Submitted</h4><p>Sent to a reviewer. A Continuous Improvement Register item tracks the review.</p></li>' +
        '<li><h4>Approved</h4><p>Signed off and read-only. On approval, the TAS is saved as a QMS document, with a next review date and its standards mapping, and appears in <a href="feature.html?m=qms">Document Management</a>. To change an approved TAS, open it and select <b>Create New Version</b>. This creates a draft of the next version, such as draft v2, which must be submitted for review again.</p></li>' +
        '<li><h4>Rejected</h4><p>Declined by the reviewer and returned with their comments, to fix and resubmit.</p></li>' +
      '</ol>' +
      '<p>Every submission and decision is kept, with signatures, timestamps, devices and comments. See <a href="article.html?id=prog-tas-review">Submit, review and approve a TAS</a>.</p>' +
      '<h2 id="standards">How a TAS evidences the Standards</h2>' +
      '<p>Each section of a TAS supports one or more Outcome Standards in the Standards for RTOs 2025:</p>' +
      '<table><thead><tr><th>TAS section</th><th>Standards for RTOs 2025</th></tr></thead><tbody>' +
        '<tr><td>A. Qualification Setup: units of competency and packaging rules</td><td>1.3 Assessment system is fit-for-purpose and consistent with the training product</td></tr>' +
        '<tr><td>A. Qualification Setup: pathways and entry requirements</td><td>2.1 Students have access to clear and accurate information about training and changes</td></tr>' +
        '<tr><td>B. Cohort &amp; Training Review: pre-training review and LLND</td><td>2.2 Suitability advice is provided prior to enrolment</td></tr>' +
        '<tr><td>B. Cohort &amp; Training Review: cohort profile</td><td>2.6 Wellbeing needs of student cohorts are identified and supported, and 2.5 Learning environment promotes diversity and inclusion</td></tr>' +
        '<tr><td>C. Delivery: delivery methodology and volume of learning</td><td>1.1 Training is engaging, well-structured and enables attainment of required skills and knowledge</td></tr>' +
        '<tr><td>D. Assessment Framework</td><td>1.3 Assessment system is fit-for-purpose and consistent with the training product, and 1.4 Assessment ensures fair, valid, flexible and reliable judgements</td></tr>' +
        '<tr><td>E. Student, Credits &amp; RPL: student support</td><td>2.3 Students have access to training support, trainers, assessors and staff</td></tr>' +
        '<tr><td>E. Student, Credits &amp; RPL: reasonable adjustment</td><td>2.4 Reasonable adjustments support students with disability, and 1.4 Assessment ensures fair, valid, flexible and reliable judgements</td></tr>' +
        '<tr><td>E. Student, Credits &amp; RPL: credit transfer and RPL</td><td>1.6 Recognition of prior learning supports progression through training products, and 1.7 Credit transfer supports recognition of equivalent outcomes</td></tr>' +
        '<tr><td>F. Requirements Strategy: resourcing</td><td>1.8 Facilities, resources and equipment are fit-for-purpose, safe, accessible and sufficient</td></tr>' +
        '<tr><td>F. Requirements Strategy: trainer and assessor requirements</td><td>3.1 Workforce is effectively managed to ensure appropriate staffing, 3.2 Training and assessment delivered by credentialled people with current training and assessment skills, and 3.3 Training and assessment delivered by people with current industry skills and knowledge</td></tr>' +
        '<tr><td>F. Requirements Strategy: validation and quality assurance</td><td>1.5 Assessment is quality-assured through validation by skilled persons, and 4.4 Systematic monitoring and evaluation drive continuous improvement</td></tr>' +
        '<tr><td>F. Requirements Strategy: risk management</td><td>4.3 Risks to students, staff and the organisation are identified and managed</td></tr>' +
        '<tr><td>G. Industry &amp; Feedback</td><td>1.2 Engagement with industry, employers and community informs industry relevance, and 2.7 Feedback and complaints systems inform continuous improvement</td></tr>' +
      '</tbody></table>' +
      '<div class="callout note"><b>Note</b><span>By default, a TAS is mapped to 1.1, 1.3 and 1.8 on approval. Admins can add more. See <a href="article.html?id=cust-tas-templates#standards">TAS compliance standards</a>.</span></div>',

    'prog-master-tas':
      '<p class="lead">A Master TAS is the Training and Assessment Strategy for a qualification. RTO Radar builds the first draft from training.gov.au and your boilerplate. You then complete and edit each section.</p>' +
      '<div class="callout tip"><b>Before you start</b><span>Check or customise your RTO’s TAS boilerplate in <b>Settings</b>, so every new Master TAS starts with your own wording. See <a href="article.html?id=cust-tas-templates">Customise TAS templates</a>.</span></div>' +
      '<h2 id="create">Create a Master TAS</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Program Management</b>, select the <b>TAS Builder</b> tab, then <b>New Master TAS</b>.' +
          '<figure class="shot" data-marks="0.4,41.5,12.8,6.9,oval,right,#1; 29.3,2.6,5.2,7.3,oval,right,#2; 80.4,52.5,8.3,7.8,oval,above,#3"><img src="assets/img/tas-open.png" alt="Program Management, with Program Management on the navigation bar circled as marker 1, the Courses and TAS Builder tabs above, the TAS Builder tab circled as marker 2, and the New Master TAS button circled as marker 3. The TAS Builder lists Master TAS documents, such as BSB50120 Diploma of Business, a draft, and CPC50220 Diploma of Building and Construction, approved." loading="lazy"><figcaption>Select Program Management (1), the TAS Builder tab (2), then New Master TAS (3).</figcaption></figure></li>' +
        '<li>Under <b>Available Programs</b>, select the qualification. Search by code or title. Each program shows its risk status, team, units and when it was created.' +
          '<figure class="shot" data-marks="2.6,29.4,36.8,4.6,zone,#; 46,61.3,arrow-left,small; 91.5,92.7,arrow-down,small"><img src="assets/img/tas-new-master.png" alt="New Master TAS. Under Available Programs, Diploma is typed in the search box, which is outlined. Diploma programs are listed with their code, title, risk status, team, units and created date: BSB50420 Diploma of Leadership and Management, BSB50120 Diploma of Business, CHC52021 Diploma of Community Services, CHC50121 Diploma of Early Childhood Education and Care, which is selected, with an arrow pointing to it, CPC50220 Diploma of Building and Construction (Building) and SIT50422 Diploma of Hospitality Management. Below, the Master TAS Name defaults to Diploma of Early Childhood Education and Care, and an arrow points down to Create Master TAS at the bottom right." loading="lazy"><figcaption>Search for the qualification (outlined), select it, then select Create Master TAS.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Choose the program in the right team. Programs in <b>System Default</b> are visible to every team.</span></div></li>' +
        '<li>Check the <b>Master TAS Name</b>. It defaults to the qualification title, and you can rename it now or later. Then select <b>Create Master TAS</b>. The Master TAS opens as a draft (v1).</li>' +
        '<li>The Master TAS opens in the TAS editor. Work through its sections, explained below: <a href="#a">A. Qualification Setup</a>, <a href="#b">B. Cohort &amp; Training Review</a>, <a href="#c">C. Delivery</a>, <a href="#d">D. Assessment Framework</a>, <a href="#e">E. Student, Credits &amp; RPL</a>, <a href="#f">F. Requirements Strategy</a>, <a href="#g">G. Industry &amp; Feedback</a> and <a href="#h">H. Additional Sections</a>.' +
          '<figure class="shot" data-marks="0.8,86,99.2,9.3,zone,#"><img src="assets/img/tas-editor.png" alt="A new Master TAS for CHC50121 Diploma of Early Childhood Education and Care, Community and Health team, release version 1, draft v1, with Refresh from TGA, Export, Submit for Review and Save, the Search bar, and the section tabs A to G, which are outlined." loading="lazy"><figcaption>The new Master TAS, open in the TAS editor, with its section tabs (outlined).</figcaption></figure>' +
          '<p>Use <b>Search</b> to find text anywhere in the TAS. Every text box has <b>Formatting options</b> for headings, lists, bold and tables.</p></li>' +
      '</ol>' +
      '<h2 id="a">A. Qualification Setup</h2>' +
      '<ol class="ov-list no-num">' +
        '<li><h4>1. Qualification Overview</h4><p><b>1.1 Description</b>, <b>1.2 Licensing Requirements</b> and <b>1.3 Packaging Rules</b> are filled in from training.gov.au. <b>1.4 Unit Prerequisites</b> lists any prerequisite units.</p>' +
          '<figure class="shot"><img src="assets/img/tas-qual-overview.png" alt="1. Qualification Overview for the Diploma of Early Childhood Education and Care. 1.1 Description, filled in from training.gov.au, describes the educator role, where educators work, and the 280 hours of work required in a regulated service. 1.2 Licensing Requirements says no occupational licensing applies, and refers to ACECQA’s lists of approved qualifications. 1.3 Packaging Rules: 15 units, 12 core and 3 elective, and how electives are chosen." loading="lazy"><figcaption>The qualification overview, filled in from training.gov.au.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-prerequisites.png" alt="1.4 Unit Prerequisites: No units in this qualification have prerequisite units." loading="lazy"><figcaption>1.4 Unit Prerequisites, completed.</figcaption></figure></li>' +
        '<li><h4>1.5 Units of Competency</h4><p>Set each unit’s delivery hours, and make sure the units meet the qualification’s packaging rules. The overview at the top shows the total nominal and delivery hours, and the core and elective units selected against the packaging rules, such as Core Units (12/12).</p>' +
          '<figure class="shot" data-marks="87.1,6.6,#1; 92.2,20.4,#2; 96.1,28.2,#3"><img src="assets/img/tas-units.png" alt="1.5 Units of Competency for the Diploma of Early Childhood Education and Care: total nominal hours 1288, total delivery hours 960, Core Units 12 of 12, Elective Units 3 of 3 and 15 of 15 units selected. The Add Unit button is marked 1, the Delivery Hours column 2 and the bin on each row 3. The unit table lists BSBTWK502 and CHCECE041 to CHCECE050 as Core, and CHCECE051, CHCECE052 and CHCECE053 as Elective. Each unit has its nominal hours and delivery hours, such as CHCECE042 with 200 nominal and 150 delivery hours." loading="lazy"><figcaption>Add Unit (1), Delivery Hours (2) and the bin (3).</figcaption></figure>' +
          '<ul>' +
            '<li><b>1. Add units:</b> select <b>Add Unit</b> to add units from the qualification on training.gov.au or from your RTO’s units.</li>' +
            '<li><b>2. Set delivery hours:</b> enter each unit’s hours in its <b>Delivery Hours</b> box. To set the same hours for several units, tick them, enter the hours in <b>Delivery Hours</b> above the table, then select <b>Apply to selected</b>.</li>' +
            '<li><b>3. Remove units:</b> select the bin <svg class="ui-icon bin" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> on a unit’s row to remove it.</li>' +
          '</ul>' +
          '<div class="callout warn"><b>Important</b><span>The units must meet the packaging rules before you can submit the TAS for review.</span></div></li>' +
        '<li><h4>2. Pathways and 3. Entry Requirements</h4><p>Further study and employment pathways, and how enrolment decisions are made. They start from your boilerplate.</p>' +
          '<figure class="shot"><img src="assets/img/tas-pathways.png" alt="2. Pathways, with Further Study, a placeholder for qualification requirements as listed on training.gov.au, and Employment. 3. Entry Requirements, listing what final enrolment decisions consider: minimum entry requirements compliance, LLND assessment outcomes, interview performance and readiness indicators, availability of appropriate support services, and industry currency and work experience credit." loading="lazy"><figcaption>Pathways and entry requirements, from your boilerplate.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="b">B. Cohort &amp; Training Review</h2>' +
      '<ol class="ov-list no-num">' +
        '<li><h4>4. Pre-Training Review</h4><p>An optional section intro, then the pre-training review process: structured interviews, LLND assessment and learning support identification. Complete the placeholders, such as <b>[INSERT ASSESSMENT TOOL NAME]</b> and the ACSF level.</p>' +
          '<figure class="shot"><img src="assets/img/tas-pretraining.png" alt="4. Pre-Training Review. The optional section intro says RTO Radar Demo conducts a comprehensive pre-training review for all prospective participants to ensure appropriate training pathways and support arrangements are in place before enrolment is confirmed. The process lists structured interview topics, then LLND testing with placeholders for the assessment tool name and ACSF level, a scoring matrix and support recommendations, then learning support identification: academic, learning, accessibility and pastoral support." loading="lazy"><figcaption>Your RTO’s name replaces [INSERT RTO NAME]. Complete the remaining placeholders.</figcaption></figure></li>' +
        '<li><h4>5. Cohort Profile</h4><p>The target group, LLND, lifestyles and personal circumstances, then 5.1 Interests, Motivations and Objectives, 5.2 Career Outcomes and Vocational Pathways, and 5.3 Prior Educational Attainment and Industry Experience.</p>' +
          '<figure class="shot"><img src="assets/img/tas-cohort-profile.png" alt="5. Cohort Profile, with an optional section intro describing the target group of adults aged 18 to 45, their LLND skills at ACSF Level 2 to 3, their lifestyles and personal circumstances, and a summary." loading="lazy"><figcaption>The cohort profile’s section intro.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-cohort-profile-sub.png" alt="5.1 Interests, Motivations and Objectives, listing what learners are typically motivated by; 5.2 Career Outcomes and Vocational Pathways, describing graduate roles and industry feedback on transferable skills; and 5.3 Prior Educational Attainment and Industry Experience, describing learners’ schooling and experience." loading="lazy"><figcaption>5.1 to 5.3.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="c">C. Delivery</h2>' +
      '<p>6. Delivery Methodology, 6.1 Volume of Learning Justification, against the indicative duration and nominal hours for each AQF level, 6.2 Structured Training Delivery and Learning Activities, 6.3 Workplace-Based Face-to-Face Training, 6.4 Structured Self-Directed Online Learning, 6.5 Trainer-Led Virtual Classroom Sessions, 6.6 Contextualisation of Learning and Assessment Resources, and 6.7 Interactive Learning Strategies and Resources. Remove or edit the delivery modes you don’t use.</p>' +
      '<p>In <b>6.1 Volume of Learning Justification</b>, choose the <b>Delivery Mode</b>, and enter the <b>Trainer : Student Ratio</b> and <b>Delivery Duration (weeks)</b>. Then describe how the delivery mode works for this qualification.</p>' +
      '<figure class="shot"><img src="assets/img/tas-delivery.png" alt="6.1 Volume of Learning Justification, with a table of indicative duration and nominal hours for Certificate I to IV. Delivery Mode is Blended, Trainer to Student Ratio 1:20 and Delivery Duration 78 weeks. 6.1.1 Blended delivery mode describes training over 78 weeks through online self-paced learning, weekly virtual classroom sessions and on-campus practical workshops, with at least 280 hours of work placement in a regulated children’s education and care service." loading="lazy"><figcaption>Blended delivery over 78 weeks, with its description.</figcaption></figure>' +
      '<p>The rest of the section describes how training is delivered. Edit each part to match how your RTO delivers the qualification, and remove any delivery mode you don’t use.</p>' +
      '<figure class="shot"><img src="assets/img/tas-delivery-62.png" alt="6.2 Structured Training Delivery and Learning Activities, describing how each unit is structured, its learning activities, and what the structured delivery model ensures. 6.3 Workplace-Based Face-to-Face Training, describing face-to-face classroom sessions, practical demonstrations, and supervised workplace-based training under a third-party arrangement and workplace agreement." loading="lazy"><figcaption>6.2 and 6.3.</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/tas-delivery-64.png" alt="6.4 Structured Self-Directed Online Learning, describing the learning management system and non-structured learning activities such as private study and industry events. 6.5 Trainer-Led Virtual Classroom Sessions, describing live online sessions delivered through a video conferencing platform, with attendance recorded and learner identity verified." loading="lazy"><figcaption>6.4 and 6.5.</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/tas-delivery-66.png" alt="6.6 Contextualisation of Learning and Assessment Resources, describing how resources are contextualised, documented, reviewed and validated through the RTO Radar Demo validation schedule. 6.7 Interactive Learning Strategies and Resources, describing interactive strategies and non-structured learning activities." loading="lazy"><figcaption>6.6 and 6.7.</figcaption></figure>' +
      '<h2 id="d">D. Assessment Framework</h2>' +
      '<ol class="ov-list no-num">' +
        '<li><h4>7. Assessment Framework</h4><p>The section intro, then 7.1 Workplace Integrated Learning, 7.2 Assessment Arrangements and 7.3 Assessment Conditions.</p>' +
          '<figure class="shot"><img src="assets/img/tas-assessment.png" alt="7. Assessment Framework, with an optional section intro covering competency-based training principles, the principles of assessment, fairness, flexibility, validity and reliability, and the rules of evidence, sufficiency, authenticity, currency and validity." loading="lazy"><figcaption>The assessment framework’s section intro, with the principles of assessment and rules of evidence.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-assessment-71.png" alt="7.1 Workplace Integrated Learning, describing how workplace assessment evidence is gathered under a written workplace agreement, with workplace, simulated, portfolio and project-based assessment. 7.2 Assessment Arrangements, describing assessment against each unit’s requirements, with formative and summative assessment. 7.3 Assessment Conditions, completed: skills are demonstrated in a regulated children’s education and care service, or an environment that accurately reflects one, as specified in each unit’s Assessment Conditions, with workplace evidence verified through third-party reports and assessors meeting the credential requirements of the Standards for RTOs 2025." loading="lazy"><figcaption>7.1 to 7.3, with the assessment conditions completed.</figcaption></figure>' +
        '</li>' +
        '<li id="d-methods"><h4>8. Assessment Methods, Assigned Trainer, Unit Sequencing &amp; Clustering</h4>' +
          '<p>Add a section intro describing how units are sequenced and clustered, and how they’re assessed. Then set up the assessment methods for this TAS. These are the methods you can choose for each unit, along with its order, cluster and trainer.</p>' +
          '<p>To add a method, type its name in <b>Add new method</b> and select <b>Add</b>. To rename one, select its tag and edit the name; the change updates every unit that uses it. Select the <b>×</b> on a method to remove it, or <b>Reset</b> to return to the default methods.</p>' +
          '<figure class="shot" data-marks="2.3,89.4,25,6,zone,#; 42.7,82.6,1.6,4.2,oval,#; 91.6,64.6,5.4,4,oval,#; 25.6,82.6,8.3,4.2,oval,#; 31,83.3,3.1,caret"><img src="assets/img/tas-methods.png" alt="8. Assessment Methods, Assigned Trainer, Unit Sequencing and Clustering. The section intro describes how units are sequenced and clustered and how they are assessed. Assessment Methods available for this TAS lists Third Party Report, Role Play, Case Study, Presentation, Online Quiz, Observation, Oral Questioning, Written, Test, Practical Task, Logbook and Portfolio, each with an × to remove it. Project is typed in Add new method, beside the Add button, and both are outlined. The × on Portfolio and Reset, at the top right, are circled. The Logbook tag is circled, with a text cursor after its name to show it being renamed." loading="lazy"><figcaption>Add a method, rename one by selecting its tag, remove one with its ×, or reset to the defaults.</figcaption></figure>' +
          '<p>To cluster units and set their assessment methods and trainers:</p>' +
          '<ul>' +
            '<li><b>1. Select units:</b> tick the box on each unit you want in the cluster.</li>' +
            '<li><b>2. Create Cluster:</b> groups the ticked units into a cluster.</li>' +
            '<li><b>3. Assessment Methods:</b> sets the assessment methods for every ticked unit.</li>' +
            '<li><b>4. Assign Trainers:</b> sets the trainer for every ticked unit.</li>' +
            '<li><b>5. A unit’s own methods and trainer:</b> for a unit with its own methods or trainer, choose them in its row, under <b>Assessment Method</b> and <b>Trainer</b>.</li>' +
          '</ul>' +
          '<p>Clustered units are shaded in the same colour. In this example, CHCECE041, CHCECE044 and CHCECE049 are in one cluster, shown in blue. Set each unit’s place in the sequence in its <b>Order</b> box. Clustered units always sit together in the list, whatever their order.</p>' +
          '<figure class="shot" data-marks="2.2,66.2,2.6,31.6,zone,#; 6.6,68,#1; 46.1,1.7,10.5,3.4,oval,#2; 72.8,1.7,12,3.4,oval,#3; 87.6,1.7,9.2,3.4,oval,right,#4; 77.9,61.4,20.8,14,zone,#; 75.4,63.2,#5"><img src="assets/img/tas-clusters.png" alt="Unit sequencing and clustering, with 4 selected. Create Cluster, Remove from Cluster, Assessment Methods and Assign Trainers are along the top, and Create Cluster, Assessment Methods and Assign Trainers are circled. CHCECE041, CHCECE044 and CHCECE049, in order 2 to 4, are clustered and shaded blue, and have Staff Demo as trainer and their own assessment methods, such as Written, Practical Task, Logbook and Third Party Report for CHCECE041, outlined for the first unit. CHCECE042, CHCECE043 and CHCECE047, not yet clustered, are ticked, with their tick boxes outlined, and have John Doe as trainer. The assessment methods and trainer for CHCECE042 are outlined." loading="lazy"><figcaption>Select units (1), then Create Cluster (2), Assessment Methods (3) or Assign Trainers (4). A unit’s own methods and trainer are set in its row (5).</figcaption></figure>' +
          '<p>Each cluster gets its own section below the table, numbered 8.1, 8.2 and so on. Enter its <b>Cluster Name</b> and a <b>Rationale</b> explaining why its units are grouped together, such as shared workplace tasks or evidence. The section lists the cluster’s units in its colour.</p>' +
          '<figure class="shot"><img src="assets/img/tas-cluster-rationale.png" alt="8.1 Safe and compliant practice, with the cluster name and a rationale explaining that the three units cover the service’s legal and operational obligations, that their evidence overlaps, and that the cluster runs first, before work placement. Its 3 units, CHCECE041, CHCECE044 and CHCECE049, are listed in blue. 8.2 Children’s learning and curriculum, with a rationale explaining that its units follow the planning cycle in the Early Years Learning Framework, share one body of placement evidence, and run during placement. Its 4 units, including CHCECE042 and CHCECE043, are listed in yellow." loading="lazy"><figcaption>Each cluster’s name and rationale, with its units in its colour.</figcaption></figure>' +
        '</li>' +
      '</ol>' +
      '<h2 id="e">E. Student, Credits &amp; RPL</h2>' +
      '<ol class="ov-list no-num">' +
        '<li><h4>9. Support Services</h4><p>The section intro and the support available to learners: training support, language, literacy and numeracy support, and wellbeing and personal support. Then 9.1 Access to Staff and Response Timeframes, 9.2 Referral Services, 9.3 Disability Support Services and Reasonable Adjustment, 9.4 Scope of Reasonable Adjustment, 9.5 Adjustment Process and 9.6 Maintaining Competency Standards.</p>' +
          '<figure class="shot"><img src="assets/img/tas-support.png" alt="9. Support Services, with a section intro on how support needs are identified, then Training Support Services, such as study skills workshops, peer mentoring and additional tutorials; Language, Literacy and Numeracy Support, such as LLN assessment and individual support plans; and Wellbeing and Personal Support, such as counselling, financial assistance, flexible scheduling and childcare assistance." loading="lazy"><figcaption>The support services intro.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-support-93.png" alt="9.3 Disability Support Services and Reasonable Adjustment, under the Disability Discrimination Act 1992 and the Standards for RTOs 2025, with reasonable adjustments, accessibility compliance, assistive technology and individual accommodation plans. 9.4 Scope of Reasonable Adjustment, covering training delivery, assessment tasks, learning resources and the physical environment, with examples such as additional time and assistive technology." loading="lazy"><figcaption>9.3 and 9.4.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-support-95.png" alt="9.5 Adjustment Process, from identifying the need to regular review. 9.6 Maintaining Competency Standards, explaining that adjustments change how competency is demonstrated, not the standard itself, and that evidence must still meet the rules of evidence." loading="lazy"><figcaption>9.5 and 9.6.</figcaption></figure></li>' +
        '<li><h4>10. Credit Transfer &amp; RPL</h4><p>The section intro, then 10.1 Credit Transfer, 10.2 Recognition of Prior Learning (RPL), 10.3 RPL Process and 10.4 Evidence for RPL. Complete the placeholder for how long credit transfer applications take, <b>[INSERT TIMEFRAME]</b>.</p>' +
          '<figure class="shot"><img src="assets/img/tas-rpl.png" alt="10. Credit Transfer and RPL, with a section intro on recognising prior achievement. 10.1 Credit Transfer, with the credit transfer process from submitting certified copies to notifying the participant. 10.2 Recognition of Prior Learning, explaining that RPL is available for all units in the qualification." loading="lazy"><figcaption>The section intro, 10.1 and 10.2.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/tas-rpl-103.png" alt="10.3 RPL Process, from initial consultation and self-assessment to evidence gathering, assessment, gap training and outcome. 10.4 Evidence for RPL, listing acceptable evidence such as previous qualifications, employment records and work samples, and Fees and Timeframes, with an [INSERT TIMEFRAME] placeholder for credit transfer applications." loading="lazy"><figcaption>10.3 and 10.4, with the timeframe placeholder to complete.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="f">F. Requirements Strategy</h2>' +
      '<ol class="ov-list no-num">' +
        '<li><h4>11. Resourcing Requirements</h4><p>How your RTO identifies and manages facilities, equipment and learning resources.</p>' +
          '<figure class="shot"><img src="assets/img/tas-resourcing.png" alt="11. Resourcing Requirements: facilities and equipment requirements, facility identification procedures such as training package analysis, industry consultation and capacity planning, equipment suitability management, and learning resource management, such as digital resources, library services and simulation equipment." loading="lazy"><figcaption>Facilities, equipment and learning resources.</figcaption></figure></li>' +
        '<li><h4>12. Trainer &amp; Assessor Requirements</h4><p>The credentials your trainers and assessors must hold, as set out in your RTO’s credential policy, for training and assessment, and for assessment only.</p>' +
          '<figure class="shot"><img src="assets/img/tas-trainers.png" alt="12. Trainer and Assessor Requirements: as per the credential policy, trainers and assessors must hold one of the listed credentials. 1A, training and assessment credentials, such as TAE40122 Certificate IV in Training and Assessment or its successor, TAE40116, TAE40110, a diploma or higher in adult or vocational education, or a secondary teaching qualification with an assessor skill set. 1B, assessment only credentials, such as TAE40122, TAE40116 and assessor skill sets." loading="lazy"><figcaption>Training and assessment credentials (1A) and assessment only credentials (1B).</figcaption></figure></li>' +
        '<li><h4>13. Validation &amp; Quality Assurance</h4><p>Your validation strategy: how often each training product is validated, your annual validation schedule, and how validation priorities are set using a risk-based approach.</p>' +
          '<figure class="shot"><img src="assets/img/tas-validation.png" alt="13. Validation and Quality Assurance: every training product on the scope of registration is validated at least once every five years, and more often where risks, changes or feedback arise. The annual validation schedule uses a risk-based approach, industry input and continuous improvement. Assessment system compliance, and a risk-based validation approach with priorities such as high enrolment and new qualifications." loading="lazy"><figcaption>The validation strategy.</figcaption></figure></li>' +
        '<li><h4>14. Risk Management Strategy</h4><p>The risks to training and assessment quality, and how they’re mitigated, under each quality area of the Standards for RTOs 2025.</p>' +
          '<figure class="shot"><img src="assets/img/tas-risk.png" alt="14. Risk Management Strategy, aligned with the Standards for RTOs 2025 across four quality areas. Quality Area 1, trainer and assessor competence, lists identified risks such as inadequately qualified staff and lack of current industry skills, and mitigation strategies such as credential verification, mandatory professional development and mentoring. Quality Area 2, assessment system integrity, follows." loading="lazy"><figcaption>Identified risks and mitigation strategies.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="g">G. Industry &amp; Feedback</h2>' +
      '<p>15. Industry and Feedback draws on the industry engagement and feedback you’ve recorded in RTO Radar. Feedback comes from forms built in Complaints &amp; Suggestions. See <a href="article.html?id=fb-overview">How feedback forms work</a>. Start with a section intro on how your RTO engages with industry and uses feedback:</p>' +
      '<figure class="shot"><img src="assets/img/tas-industry-intro.png" alt="15. Industry and Feedback, with a section intro saying RTO Radar Demo consults with industry, employers and community to keep the qualification relevant, that industry contacts and consultations are recorded in RTO Radar and summarised below, and that feedback from students, trainers and industry informs continuous improvement." loading="lazy"><figcaption>The industry and feedback section intro.</figcaption></figure>' +
      '<p>Then:</p>' +
      '<ul>' +
        '<li><b>15.1 Industry Feedback Contacts</b>: tick the saved contacts to include, then select <b>Add selected</b>. Each is added below with their organisation, role and email. Search to find a contact. Contacts are saved when you <a href="article.html?id=prog-industry-consultation">record an industry consultation</a>.' +
          '<figure class="shot" data-marks="11.6,41.4,1.6,6.4,oval,right,#1; 81.4,9.1,10.1,7.1,oval,#2; 2,61,95.8,35.5,zone,#3"><img src="assets/img/tas-industry-contacts.png" alt="15.1 Industry Feedback Contacts. Saved contacts are listed with their name, organisation, role and email: Community Services Expert, Subject Expert at RTO Radar, whose tick box is circled as marker 1, and Staff Demo, Trainer and Assessor. Add 1 selected, at the top right, is circled as marker 2. Below, the added contact is outlined as marker 3: Community Services Expert, RTO Radar, Subject Expert, with their email." loading="lazy"><figcaption>Tick a contact (1), select Add selected (2), and it’s added to the TAS (3).</figcaption></figure></li>' +
        '<li><b>15.2 Consultation Summary</b>: choose <b>Scheduled</b> for consultations booked in Events, or <b>Recorded Evidence</b> for consultations you’ve recorded. Tick the ones to include, then select <b>Add selected</b>. Each is added below with its date, method, representative, topics, key feedback, linked feedback and attachments. See <a href="article.html?id=prog-industry-consultation">Record an industry consultation</a>.' +
          '<figure class="shot" data-marks="8.7,4.8,10.6,4.2,oval,right,#1; 4.6,21.8,1.4,4.2,oval,right,#2; 81.6,4.9,10.2,3.6,oval,#3; 2.1,30.3,95.8,68.2,zone,#4"><img src="assets/img/tas-consultation-summary.png" alt="15.2 Consultation Summary, on the Recorded Evidence tab, circled as marker 1. One recorded consultation, with Community Services Expert from RTO Radar on 27 Oct 2026 by video conference, is ticked, with its tick box circled as marker 2. Add 1 selected is circled as marker 3. Below, the added consultation is outlined as marker 4, with its date, method, representative, topics and key feedback, then the linked feedback FS-0006 from RTO Radar, Subject Expert, with their answers to questions on how well the course prepares students for entry-level roles, its relevance, the assessment tasks, the skills graduates lack, WHS content and hosting placement students." loading="lazy"><figcaption>Select Recorded Evidence (1), tick a consultation (2), then select Add selected (3). It’s added to the TAS (4).</figcaption></figure></li>' +
        '<li><b>15.3 Student Feedback</b>: on <b>Submissions</b>, submissions are grouped by form. Tick a form to select all its submissions. You can also tick each submission one by one. Then select <b>Add selected</b>. Each is added below with its answers.' +
          '<figure class="shot" data-marks="7.5,4.4,7.3,3.1,oval,right,#1; 2.9,14.5,1.2,1.7,oval,above,#2; 80.2,4.5,10.2,3.1,oval,#3; 1.9,39.8,96,60.2,zone,#4"><img src="assets/img/tas-student-feedback.png" alt="15.3 Student Feedback, on the Submissions tab, circled as marker 1, with 17 results. The CHC50121 - CHCECE042 - Student Evaluation form has 6 submissions, such as FS-0017, FS-0016 and FS-0015, all ticked, and its tick box, which selects them all, is circled as marker 2. Add 17 selected is circled as marker 3. Below, the added submissions are outlined as marker 4, starting with FS-0017 and its ratings out of 5 for 12 questions, and two written answers: the lessons were well structured with practical activities, and short revision activities at the end of each topic would have helped." loading="lazy"><figcaption>On Submissions (1), tick the form to select all its submissions (2), then select Add selected (3). They’re added to the TAS (4).</figcaption></figure></li>' +
        '<li><b>15.4 Trainer Feedback</b>: add feedback from trainers and assessors in the same way. On <b>Submissions</b>, open a form to see its submissions, tick them all with the box in the header or tick each one, then select <b>Add selected</b>. Select <b>Back to all submissions</b> to choose another form.' +
          '<figure class="shot" data-marks="7.5,4.2,7.3,3.1,oval,right,#1; 4.6,17.5,1.3,1.6,oval,right,#2; 81,4.4,10.1,3.1,oval,#3; 2.1,42.4,95.9,57.6,zone,#4"><img src="assets/img/tas-trainer-feedback.png" alt="15.4 Trainer Feedback, on the Submissions tab, circled as marker 1, viewing CHC50121 - Trainer Feedback, with 4 results. The header tick box, which selects all submissions, is circled as marker 2, and FS-0021, FS-0020, FS-0019 and FS-0018 are ticked, with ratings for questions such as whether learners were well prepared and resources supported delivery. Add 4 selected is circled as marker 3. Below, the added submissions are outlined as marker 4, starting with FS-0021: ratings out of 5 for ten questions, such as assessment tools, mapping, delivery hours, placements and professional development, then comments on what worked well, suggested improvements to the observation checklist, and support for learners with English as an additional language." loading="lazy"><figcaption>On Submissions (1), tick all submissions (2), then select Add selected (3). They’re added to the TAS (4).</figcaption></figure></li>' +
        '<li><b>15.5 Evidence of Industry Currency</b>: filled in automatically from your selections in 15.2, 15.3 and 15.4, grouped into industry, student and trainer feedback, with each person’s role, organisation and date of engagement. Edit any cell, select <b>Add row</b> to add someone, or select the bin <svg class="ui-icon bin" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to remove a row.' +
          '<figure class="shot"><img src="assets/img/tas-industry-currency.png" alt="15.5 Evidence of Industry Currency, auto-populated from selections in 15.2, 15.3 and 15.4, with columns for person, role, organisation and date of engagement. Industry Feedback Summary lists Community Services Expert, Subject Expert, RTO Radar, 27 Oct 2026. Student Feedback, from CHC50121 - CHCECE042 - Student Evaluation, lists Students 1 to 6 at RTO Radar Demo on 03/09/2026. Trainer Feedback, from CHC50121 - Trainer Feedback, lists Trainers 1 to 4. Each group has an Add row link, and each row a bin." loading="lazy"><figcaption>Evidence of industry currency, built from your feedback selections.</figcaption></figure></li>' +
      '</ul>' +
      '<h2 id="h">H. Additional Sections</h2>' +
      '<p>Use this section for anything your TAS needs that the standard sections don’t cover, such as licensing or regulatory arrangements, third-party arrangements, or details specific to a funding contract.</p>' +
      '<ul>' +
        '<li><b>Custom sections from your boilerplate:</b> any custom sections your RTO has added to its TAS templates appear here, ready to complete. See <a href="article.html?id=cust-tas-templates#custom">Custom boilerplate sections</a>.</li>' +
        '<li><b>Add Custom Section:</b> select <b>Add Custom Section</b> to add a section to this TAS only. Enter its title and content.</li>' +
        '<li><b>Attachments:</b> attach supporting documents, such as a third-party agreement or a mapping document.</li>' +
      '</ul>' +
      '<p>When the TAS is complete, submit it for review. See <a href="article.html?id=prog-tas-review">Submit, review and approve a TAS</a>.</p>',

    'prog-tas-review':
      '<p class="lead">A TAS is submitted for review, then approved or declined. An approved TAS is read-only and saved as a QMS document. Every submission and decision is kept, with signatures and an audit trail.</p>' +
      '<h2 id="editor">The TAS editor</h2>' +
      '<figure class="shot" data-marks="17,86,#1; 27.9,86,#2; 38.8,86,#3; 49.3,86,#4"><img src="assets/img/tas-editor-header.png" alt="The header of a Master TAS for CHC50121 Diploma of Early Childhood Education and Care, Community and Health team, release version 1, release date 20/07/2021, draft v1. Numbers mark Refresh from TGA (1), Export (2), Submit for Review (3) and Save (4)." loading="lazy"><figcaption>Refresh from TGA (1), Export (2), Submit for Review (3) and Save (4).</figcaption></figure>' +
      '<ul>' +
        '<li><b>Refresh from TGA</b> (1) checks training.gov.au for changes to the qualification. Choose to <b>replace</b> the TGA content with the latest, or <b>append</b> the new TGA additions below your current content.' +
          '<figure class="shot shot-medium"><img src="assets/img/tas-refresh-tga.png" alt="The Packaging Rules, your edits detected window. It says TGA has published a fresh Packaging Rules block and shows the current packaging rules: 15 units in total, 12 core and 3 electives, with the elective selection rules. Below are Cancel, Replace entirely with new TGA and Append new TGA additions below." loading="lazy"><figcaption>Refresh from TGA found new packaging rules. Replace them entirely, or append the new additions below your edits.</figcaption></figure></li>' +
        '<li><b>Export</b> (2) downloads the TAS as a PDF or Word document.</li>' +
        '<li><b>Submit for Review</b> (3). See <a href="#submit">Submit a TAS for review</a>.</li>' +
        '<li><b>Save</b> (4) saves your changes. Save as you go.</li>' +
      '</ul>' +
      '<h2 id="submit">Submit a TAS for review</h2>' +
      '<ol class="steps-list">' +
        '<li>In the TAS, select <b>Submit for Review</b>. The units must meet the packaging rules first.' +
          '<figure class="shot" data-marks="32,67.3,13.7,12.6,oval,#"><img src="assets/img/tas-editor-header.png" alt="The header of a Master TAS for CHC50121 Diploma of Early Childhood Education and Care, draft v1, with the Submit for Review button circled." loading="lazy"><figcaption>Select Submit for Review.</figcaption></figure></li>' +
        '<li>Choose the <b>Priority</b>, <b>Due Date</b> and <b>Reviewer</b>, and add any <b>Notes</b>.' +
          '<figure class="shot shot-medium" data-marks="82,84.2,3.3,caret"><img src="assets/img/tas-submit-form.png" alt="The Submit for Review window. A message says unit requirements are met, core units 12 of 12 and elective units 6 of 3, and that a CIR item will be created to track the review. The title is auto-generated, TAS Submitted for Review: Diploma of Early Childhood Education and Care, and the source is TAS Builder. Priority is Medium, the due date is 11/11/2026, the reviewer is the Training Manager, and a note is being typed: First version for the 2027 intake. Industry consultation outcomes are in section G." loading="lazy"><figcaption>Set the priority, due date and reviewer, and add any notes for the reviewer.</figcaption></figure></li>' +
        '<li>Under <b>QMS Standards Review</b>, tick the standards the TAS addresses.' +
          '<figure class="shot" data-marks="7.3,34.3,4.5,36.3,zone,#; 83.1,88.9,arrow-down,small"><img src="assets/img/tas-submit-standards.png" alt="QMS Standards Review in the Submit for Review window, with 10 standards selected under the Standards for RTOs 2025. Under Quality Area 1: Training and Assessment, standards 1.1 to 1.4 are ticked, and their checkboxes are outlined. A Demo Custom Framework is listed below, and an arrow points down at the Confirm and Submit button." loading="lazy"><figcaption>Tick the standards the TAS addresses, then select Confirm &amp; Submit.</figcaption></figure></li>' +
        '<li>Select <b>Confirm &amp; Submit</b>.</li>' +
      '</ol>' +
      '<p>The TAS shows as Submitted, and a <a href="feature.html?m=cir">Continuous Improvement Register</a> item is created to track the review.</p>' +
      '<h2 id="review">Review a TAS</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>TAS Builder</b> tab, select <b>Submission Management</b>. Pending submissions are listed with their type, qualification, version, team, date and comments. Select <b>View</b>.' +
          '<figure class="shot" data-marks="26.6,36.2,11.9,4,oval,above,#1; 85.5,70.6,7,8.3,oval,right,#2"><img src="assets/img/tas-submission-mgmt.png" alt="The TAS Builder tab in Program Management, with Submission Management selected and circled as marker 1. Two pending master TAS submissions are listed with their qualification, team, submitted date and comments: CHC50121 Diploma of Early Childhood Education and Care, v1, Community and Health, submitted 28/10/2026, and CPC30220 Certificate III in Carpentry, v1, Construction, submitted 10/09/2026, both Submitted for review. The first View button is circled as marker 2." loading="lazy"><figcaption>Select Submission Management (1), then View (2).</figcaption></figure></li>' +
        '<li>In <b>Submission Details</b>, select <b>View TAS</b> or <b>Export TAS</b> to read it. <b>Signatures</b> shows who signed and when, from which device. The <b>Audit Trail</b> records each action.' +
          '<figure class="shot shot-medium" data-marks="18.4,93.2,arrow-down,tiny; 27.7,93.2,arrow-down,tiny"><img src="assets/img/tas-submission-details.png" alt="Submission Details for a Master TAS, v1, CHC50121 Diploma of Early Childhood Education and Care, submitted 28/10/2026 with the comment Submitted for review. View TAS and Export TAS buttons. Signatures: Admin Demo, signed Wed 28/10/2026 14:41 from Windows 10/11, Chrome. The audit trail shows Admin Demo submitted the TAS for review. Under Review Action, arrows point down at Approve and Decline." loading="lazy"><figcaption>Review the TAS, then select Approve or Decline.</figcaption></figure></li>' +
        '<li>Select <b>Approve</b> or <b>Decline</b>. Add a comment and an optional attachment, then select <b>Confirm Approval</b> or <b>Confirm Decline</b>. When you decline, say what needs to change before the TAS is resubmitted.' +
          '<figure class="shot shot-medium" data-marks="4.8,82.4,22.9,9.9,oval,#"><img src="assets/img/tas-approve.png" alt="Review Action, set up to approve. The required comment reads: Approved. Packaging rules are met, the 280 hours of work placement are in section C, and industry consultation is documented in section G. Review checklist attached. The attachment is TAS_Review_Checklist_CHC50121.pdf. The Confirm Approval button is circled, with Decline and Cancel beside it." loading="lazy"><figcaption>Add your approval comment and any attachment, then select Confirm Approval.</figcaption></figure></li>' +
        '<li>When you approve, <b>QMS Document Settings</b> opens. Choose the <b>Next Review Date</b> and check the <b>Compliance Framework Mappings</b>, then select <b>Save &amp; Continue</b>. The approved TAS appears in <a href="feature.html?m=qms">Document Management</a>, with its review date and mappings.' +
          '<figure class="shot shot-medium" data-marks="76.9,87.4,18.8,7.6,oval,#"><img src="assets/img/tas-qms-settings.png" alt="QMS Document Settings, to set the review date and compliance framework mappings for the QMS document record. The Next Review Date is 28/10/2027. Under Compliance Framework Mappings, the Standards for RTOs 2025 has 10 selected, carried over from the submission, and Demo Custom Framework is below. Skip, and Save and Continue, which is circled." loading="lazy"><figcaption>Set the next review date and mappings, then select Save &amp; Continue (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>An approved TAS is read-only. To change it, open it in the TAS Builder and select <b>Create New Version</b>. This creates a draft of the next version, such as draft v2. Make your changes, then submit it for review again.<br><br>A declined TAS shows as Rejected. Open it in the TAS Builder, read the reviewer’s comment, make the changes, then select <b>Submit for Review</b> again.</span></div>' +
      '<h2 id="history">Past submissions</h2>' +
      '<p>The <b>Submissions</b> tab lists every submission and decision, with its type, qualification, team, action, comments and date. Filter by qualification or comments, action, type and team. Select <b>ZIP</b> to download a submission with its records.</p>' +
      '<figure class="shot" data-marks="18.8,30.9,6.9,3.8,oval,#"><img src="assets/img/tas-submissions.png" alt="The Submissions tab of the TAS Builder, which is circled, with a filter box, All Actions, All Types and a Team filter. Three submissions are listed with their type, qualification, team, action, comments and date: a Master TAS for CHC50121 Diploma of Early Childhood Education and Care, approved 28/10/2026; a Cohort TAS for CHC22015 Certificate II in Community Services, rejected 27/10/2026; and a Master TAS for CHC30121 Certificate III in Early Childhood Education and Care, approved 27/10/2026. Each has a ZIP download and a bin." loading="lazy"><figcaption>The Submissions tab (circled) keeps every submission and decision for audit.</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>The <b>Submissions</b> tab is for viewing and downloading approved and rejected submissions. To create a new version of an approved TAS, fix a rejected TAS or keep working on a draft, open it from the <b>Master TAS</b> or <b>Cohort TAS</b> tab.</span></div>',

    'prog-cohort-tas':
      '<p class="lead">A Cohort TAS adapts a Master TAS for one delivery, such as an intake, campus or delivery mode.</p>' +
      '<h2 id="example">How a Cohort TAS differs from its Master</h2>' +
      '<p>The Master TAS sets out how your RTO delivers and assesses the qualification across all its intakes. Each Cohort TAS keeps that strategy and records what’s specific to one intake. For example, for CHC50121 Diploma of Early Childhood Education and Care:</p>' +
      '<table><thead><tr><th>Section</th><th>Master TAS</th><th>Cohort TAS: Semester 1 2027, Melbourne Campus</th></tr></thead><tbody>' +
        '<tr><td>Cohort Information</td><td>Not applicable</td><td>22 students enrolled, starting 1 February 2027</td></tr>' +
        '<tr><td>5. Cohort Profile</td><td>Educators moving into lead roles, such as room leader, and learners who hold the Certificate III in Early Childhood Education and Care</td><td>Mostly recent Certificate III graduates working part-time in long day care</td></tr>' +
        '<tr><td>6. Delivery</td><td>Face-to-face, blended and workplace-based delivery</td><td>Two days a week on campus, with online classes for theory. Workplace-based delivery removed.</td></tr>' +
        '<tr><td>6.1 Volume of Learning</td><td>18 months full-time</td><td>18 months, timetabled around part-time work</td></tr>' +
        '<tr><td>7.1 Workplace Integrated Learning</td><td>Workplace assessment through observation, third-party reports, work samples and reflection, under a written workplace agreement</td><td>The Master wording, plus 280 hours of placement at three partner long day care services near the campus</td></tr>' +
        '<tr><td>8. Units &amp; Clustering</td><td>Assessment methods and trainers for each unit</td><td>The trainers assigned to this intake</td></tr>' +
        '<tr><td>9. Student Support</td><td>The RTO’s support services</td><td>Extra academic writing support, based on this intake’s pre-training review results</td></tr>' +
      '</tbody></table>' +
      '<p>The qualification and its packaging rules stay the same as in the Master TAS.</p>' +
      '<h2 id="steps">Create a Cohort TAS</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>TAS Builder</b> tab, select <b>Cohort TAS</b>, then <b>New Cohort TAS</b>.' +
          '<figure class="shot" data-marks="10.7,35,6.7,4.3,oval,above,#1; 85.5,47.2,11.7,5.7,oval,above,#2"><img src="assets/img/tas-cohort-list.png" alt="The Cohort TAS tab of the TAS Builder, which is circled as marker 1, with a filter box, All Status, Team and the New Cohort TAS button, circled as marker 2. Two Cohort TAS documents are listed with their cohort name, qualification, team, location, start date and status, one Rejected and one Draft." loading="lazy"><figcaption>Select the Cohort TAS tab (1), then New Cohort TAS (2).</figcaption></figure></li>' +
        '<li>Under <b>Available Master TAS</b>, select the Master TAS to base it on. Search by code or title.' +
          '<figure class="shot" data-marks="2.5,44,36.9,6.8,zone,#; 49.4,64.7,arrow-left,small"><img src="assets/img/tas-new-cohort.png" alt="New Cohort TAS, to select a Master TAS to base your cohort on. Under Available Master TAS, CHC50121 is typed in the search box, which is outlined. Three Master TAS documents for CHC50121 Diploma of Early Childhood Education and Care are listed with their status, team, units and created date: one Approved, created 27 Oct 2026, with an arrow pointing to it, and two drafts." loading="lazy"><figcaption>Search for the qualification (outlined), then select its approved Master TAS.</figcaption></figure></li>' +
        '<li>Under <b>Name Your Cohort</b>, enter the <b>Cohort Title</b>, such as Semester 1 2027, the <b>Location</b>, such as Brisbane Campus or Online, and the <b>Start Date</b>. Select <b>Change selection</b> to pick a different Master TAS.' +
          '<figure class="shot" data-marks="85.3,90.8,12.1,5.8,oval,#"><img src="assets/img/tas-name-cohort.png" alt="Name Your Cohort, based on the Master TAS CHC50121 Diploma of Early Childhood Education and Care, with a Change selection link. The Cohort Title is Semester 1 2027, the Location is Melbourne Campus and the Start Date is 01/01/2027. The document will be named Diploma of Early Childhood Education and Care (Semester 1 2027). Back and Create Cohort TAS buttons, with Create Cohort TAS circled." loading="lazy"><figcaption>Name the cohort, then select Create Cohort TAS (circled).</figcaption></figure></li>' +
        '<li>Select <b>Create Cohort TAS</b>.</li>' +
      '</ol>' +
      '<h2 id="edit">Edit a Cohort TAS</h2>' +
      '<p>A Cohort TAS opens in the TAS editor, with the same sections as its Master TAS. Its name includes the cohort title, and its header shows the qualification, the TGA release and the status, such as Draft.</p>' +
      '<figure class="shot" data-marks="31.3,79,11.4,12.6,oval,#"><img src="assets/img/tas-cohort-editor.png" alt="A Cohort TAS, Diploma of Early Childhood Education and Care (Semester 1 2027), v1, Community and Health, for CHC50121 release 1, in draft, with Export, Submit for Review, Re-sync from Master, which is circled, and Save." loading="lazy"><figcaption>A Cohort TAS, with Re-sync from Master (circled).</figcaption></figure>' +
      '<div class="callout warn"><b>Important</b><span><b>Re-sync from Master</b> replaces the Cohort TAS’s content with the Master TAS’s current content, overwriting changes made in the Cohort TAS. It can’t be undone.</span></div>' +
      '<figure class="shot shot-medium"><img src="assets/img/tas-resync.png" alt="Re-sync from Master TAS. This will overwrite all inherited content fields and unit types in this Cohort TAS with the current values from the Master TAS. Local edits will be lost. This cannot be undone. Cancel and Re-sync buttons." loading="lazy"><figcaption>Re-sync asks you to confirm before it overwrites the Cohort TAS.</figcaption></figure>' +
      '<p><b>Cohort Information</b> is at the top: the <b>Cohort Name</b>, <b>Student Enrolment</b> and <b>Notes</b>. Student Enrolment shows a reference, the maximum across the units, to check your enrolment against.</p>' +
      '<figure class="shot"><img src="assets/img/tas-cohort-info.png" alt="Cohort Information, with the Cohort Name Diploma of Early Childhood Education and Care (Semester 1 2027), Student Enrolment of 22, with the reference max across units is 150 students, and the note Semester 1 2027 intake, Melbourne Campus. Classes on Tuesdays and Wednesdays; placements start in week 6." loading="lazy"><figcaption>Cohort Information.</figcaption></figure>' +
      '<p>Then edit the sections that differ for this intake. For example, <b>7.1 Workplace Integrated Learning</b> in the Master TAS sets out workplace assessment for every intake. In the Cohort TAS, keep that wording and add where and how this intake completes its placement.</p>' +
      '<figure class="shot" data-marks="2.4,77,92.8,15.5,zone,#"><img src="assets/img/tas-wil-cohort.png" alt="7.1 Workplace Integrated Learning in the Semester 1 2027 Cohort TAS. It keeps the Master TAS wording on workplace assessment evidence and the four assessment types, and adds an outlined paragraph: Students complete the 280 hours of work placement at three partner long day care services near the Melbourne Campus, each a regulated education and care service with a current service approval. Each student is placed at one service for the whole placement and supervised by a qualified educator nominated by the service. Placement agreements are signed before the placement starts." loading="lazy"><figcaption>The Cohort TAS keeps the Master wording and adds this intake’s placement arrangements (outlined).</figcaption></figure>' +
      '<p>A Cohort TAS is submitted, reviewed and approved in the same way as a Master TAS. See <a href="article.html?id=prog-tas-review">Submit, review and approve a TAS</a>.</p>',

    'cust-tas-templates':
      '<p class="lead">TAS templates set the boilerplate wording in every new TAS, and the standards a TAS is mapped to on approval. Changes apply to new TAS documents only. Existing TAS documents keep their content.</p>' +
      '<h2 id="boilerplate">TAS Boilerplate Templates</h2>' +
      '<ol class="steps-list">' +
        '<li>Under <b>RTO name used in TAS documents</b>, enter the name to use in TAS documents, or leave it blank to use your organisation’s legal name. It replaces the <b>[INSERT RTO NAME]</b> placeholder. Manually edited fields aren’t overwritten.' +
          '<figure class="shot" data-marks="82.1,4.2,15.7,4.4,oval,#"><img src="assets/img/tas-bp-list.png" alt="TAS Boilerplate Templates, with the RTO name used in TAS documents set to RTO Radar Demo. Sections are grouped by tab: Tab 1, Qualification Setup, with 2. Pathways and 3. Entry Requirements; Tab 2, Cohort and Training Review, with 4. Pre-Training Review and 5. Cohort Profile sections; and Tab 3, Delivery. Save All Templates, at the top right, is circled." loading="lazy"><figcaption>Boilerplate sections, grouped by TAS tab. Select Save All Templates (circled) when you’re done.</figcaption></figure></li>' +
        '<li>Open a section to edit its wording. Sections are grouped by TAS tab, from Tab 1 Qualification Setup to Tab 7 Industry &amp; Feedback. Sections marked <b>section intro</b> appear at the start of a TAS section.' +
          '<figure class="shot"><img src="assets/img/tas-bp-pretraining.png" alt="4. Pre-Training Review section intro and 4. Pre-Training Review Process, open for editing, with the [INSERT RTO NAME], [INSERT ASSESSMENT TOOL NAME] and [INSERT LEVEL] placeholders." loading="lazy"><figcaption>Editing the pre-training review boilerplate.</figcaption></figure></li>' +
        '<li>Select <b>Save All Templates</b>.</li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Leave placeholders such as <b>[INSERT ASSESSMENT TOOL NAME]</b> in the boilerplate where the detail differs by qualification, so each TAS prompts for it.</span></div>' +
      '<h2 id="legacy">Legacy aggregate sections</h2>' +
      '<p>Combined versions of some sections, such as Target Cohort Profile and Delivery Methodology, used by some exports and older TAS layouts. Keep them consistent with the individual sections.</p>' +
      '<h2 id="custom">Custom boilerplate sections</h2>' +
      '<p>Select <b>Add Custom Section</b> to add your own section to every new TAS created in your RTO. They appear under H. Additional Sections.</p>' +
      '<figure class="shot" data-marks="2,57.8,15.4,3.7,oval,#"><img src="assets/img/tas-bp-custom.png" alt="Legacy aggregate sections, used by some exports and older TAS layouts, followed by Custom Boilerplate Sections, with no custom sections yet and an Add Custom Section button, which is circled. Below, TAS Unit Table has three toggles: Disable Delivery Hours column, which is on, Enable Structured and Unstructured Hours columns, and Enable Supervised and Unsupervised Hours columns." loading="lazy"><figcaption>Add Custom Section (circled), and the TAS Unit Table columns.</figcaption></figure>' +
      '<h2 id="units">TAS Unit Table</h2>' +
      '<p>Choose the optional columns in the TAS units table and in PDF and Word exports: <b>Delivery Hours</b>, <b>Structured and Unstructured Hours</b>, and <b>Supervised and Unsupervised Hours</b>. Each appears alongside Nominal Hours.</p>' +
      '<h2 id="standards">TAS compliance standards</h2>' +
      '<p>By default, three Standards for RTOs 2025 standards apply to a new TAS on approval: 1.1, 1.3 and 1.8. Tick more to add them to the default selection across your RTO. Standards that aren’t ticked are hidden from TAS mapping and exports. Custom frameworks are listed too.</p>' +
      '<figure class="shot" data-marks="84.6,95,13.1,3.7,oval,#"><img src="assets/img/tas-standards.png" alt="TAS Compliance Standards. The Standards for RTOs 2025, Default preset, has 3 of 23 selected: 1.1, 1.3 and 1.8, each marked Default, under 1. Training and Assessment, with Select all and Clear. 2. VET Student Support, 3. VET Workforce and 4. Governance have none selected. Demo Custom Framework has 0 of 4 selected. Reset to defaults, Select all and Save selection, which is circled." loading="lazy"><figcaption>Tick the standards, then select Save selection (circled).</figcaption></figure>' +
      '<p>Select <b>Reset to defaults</b> to return to 1.1, 1.3 and 1.8.</p>',

    'prog-archive':
      '<p class="lead">Archive a course you no longer deliver, or a unit validation you no longer need. You can restore either at any time.</p>' +
      '<h2 id="archive">Archive a course</h2>' +
      '<p>On the <b>Courses</b> tab, select <b>⋮</b> › <b>Archive</b> on the course’s row. To archive several courses at once, tick them, then select <b>Archive Selected</b>.</p>' +
      '<figure class="shot" data-marks="95.6,67.3,1.1,4,oval,above,#1; 85.6,92.2,5.8,5.1,oval,#2"><img src="assets/img/prog-course-actions.png" alt="The Courses tab, with BSB50120 Diploma of Business and SIT50422 Diploma of Hospitality Management. The ⋮ for BSB50120 is circled as marker 1, and Archive in its open menu is circled as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Archive (2).</figcaption></figure>' +
      '<h2 id="unit-validation">Archive a unit validation</h2>' +
      '<p>Archive a unit validation version you no longer need, such as one started by mistake. It moves to <b>Archived Validations</b>, where you can restore it.</p>' +
      '<ol class="steps-list">' +
        '<li>Open the course, then select <b>⋮</b> › <b>Unit Validation History</b> on the unit.' +
          '<figure class="shot" data-marks="94.8,6.4,3.9,12,oval,#1; 80.6,34.4,15.7,7.7,oval,#2"><img src="assets/img/prog-archive-unit-menu.png" alt="The unit CHCECE041 Maintain a safe and healthy environment for children, with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ is circled as marker 1, and Unit Validation History as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Unit Validation History (2).</figcaption></figure></li>' +
        '<li>On the version you want to archive, select the archive icon <svg class="ui-icon" viewBox="0 0 24 24" aria-label="archive" role="img"><path d="M3 5h18v4H3zM5 9v10h14V9M10 13h4"/></svg>.' +
          '<figure class="shot" data-marks="72.2,20.3,1.5,2.9,oval,#"><img src="assets/img/prog-archive-unit-history.png" alt="Unit Validation History for CHCECE046 Implement strategies for the inclusion of all children, listing completed versions 8, 4 and 2 with how each was completed, who completed it and the programs it is shared with. Each version has an archive icon, View, and for version 8 Download. The archive icon on version 8 is circled." loading="lazy"><figcaption>Select the archive icon (circled) on the version.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="restore">Restore or delete</h2>' +
      '<ol class="steps-list">' +
        '<li>In Program Management, select <b>View Archived</b>.' +
          '<figure class="shot" data-marks="72.8,61.3,10.5,20.6,oval,#"><img src="assets/img/prog-view-archived.png" alt="The top of Program Management, with Schedule, View Archived and Add Course buttons. View Archived is circled." loading="lazy"><figcaption>Select View Archived (circled).</figcaption></figure></li>' +
        '<li>Choose <b>Archived Courses</b> or <b>Archived Validations</b>.' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">A</span>Archived Courses</h4><p>Select <b>Restore</b> on a course, or tick courses and select <b>Delete selected</b> to delete them permanently.</p>' +
            '<figure class="shot" data-marks="1.5,3.2,13,9.2,oval,#; 8,23,#1; 4.7,83,1.5,5.4,oval,above,#2"><img src="assets/img/prog-archived-courses.png" alt="The Archived Courses tab, circled as marker 1, beside Archived Validations. Archived Courses (10) lists courses with their code, title, archived date and risk status, such as UET30621 Certificate III in ESI - Distribution Overhead, archived 7 days ago and rated Low-Medium. Its ticked box is circled as marker 2." loading="lazy"><figcaption>Select the Archived Courses tab (1), then tick the course (2).</figcaption></figure>' +
            '<figure class="shot" data-marks="84.6,13.3,12.1,17.2,oval,#; 87.2,74.4,9.1,16.9,oval,#"><img src="assets/img/prog-archived-actions.png" alt="Archived Courses (10) with 1 selected. Delete selected, at the top right, is circled, and so is Restore on the row for UET30621 Certificate III in ESI - Distribution Overhead." loading="lazy"><figcaption>Restore the course, or select Delete selected (both circled).</figcaption></figure>' +
            '<div class="callout warn"><b>Important</b><span>Deleting a course is kept here, under archive, to prevent accidental deletion of a course that may have unit validations and other evidence recorded against it. Delete a course only if you’re sure you no longer need it or its records.</span></div>' +
            '</div>' +
            '<div><h4><span class="sn">B</span>Archived Validations</h4><p>Select <b>Files</b> to download a validation’s files, <b>Restore</b> to return it to the unit’s validation history, or <b>Delete</b> to delete it permanently.</p>' +
              '<figure class="shot" data-marks="12.9,2,11.4,6.7,oval,#"><img src="assets/img/prog-archived-validations.png" alt="The Archived Validations tab, which is circled, beside Archived Courses. It lists archived unit validations with their unit code, title, program, version, status, archived date and who archived them, such as CHCECE042 Foster holistic early childhood learning, development and wellbeing, version 3, in progress when archived, archived 5 months ago by Admin Demo." loading="lazy"><figcaption>The Archived Validations tab (circled).</figcaption></figure>' +
              '<figure class="shot" data-marks="72.2,67.4,5.8,8.8,oval,above,#1; 80.1,67.4,7.4,8.8,oval,above,#2; 89.7,67.4,6.5,8.8,oval,above,#3"><img src="assets/img/prog-archived-val-actions.png" alt="An archived validation, version 3, in progress when archived, with Files circled as marker 1, Restore as marker 2 and Delete as marker 3." loading="lazy"><figcaption>Files (1), Restore (2) and Delete (3).</figcaption></figure>' +
            '</div>' +
          '</div></li>' +
      '</ol>' +
      '<p>Select <b>Back to Active Courses</b> to return.</p>',

    'faq-programs':
      '<section class="gs-faq">' +
        '<details><summary>How do I get the files someone else uploaded for a unit validation?</summary><div class="prose">' +
          '<p>Open their validation from <b>Validation Versions</b>, then select <b>Upload Files</b> in the navigation bar in the header. You can download each file from there, for example to start your own validation with the same documents.</p>' +
          '<p>See <a href="article.html?id=prog-validate-unit#navigation">Navigation</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I continue a validation someone else started?</summary><div class="prose">' +
          '<p>A validation can only be continued by the person who started it. Everyone else can only view it. This prevents conflicts when several staff try to edit the same validation at once.</p>' +
          '<p>Staff whose role has the <b>Lead Validator</b> permission can view and edit any in-progress validation, whoever started it. See <a href="article.html?id=users-roles">Built-in roles and their permissions</a>.</p>' +
          '<p>Adding someone as an <b>Additional Validator</b> in Phase 1 records that they took part. It doesn’t let them edit the validation.</p>' +
        '</div></details>' +
        '<details><summary>How do I let staff work on the same validation?</summary><div class="prose">' +
          '<p>Give them the <b>Lead Validator</b> permission. It’s turned off by default. See <a href="article.html?id=users-roles">Built-in roles and their permissions</a>. Go to <b>Settings</b> › <b>User Management</b> › <b>User Roles</b> and look under <b>Compliance &amp; Quality</b>. Then either:</p>' +
          '<ul>' +
            '<li>add the Lead Validator permission, with <b>View</b> and <b>Edit</b>, to the Admin role, for all admins, or</li>' +
            '<li>create a Lead Validator role with the permissions they need plus Lead Validator, and give it to selected staff.</li>' +
          '</ul>' +
          '<p>Lead Validators can then continue each other’s validations, one after another, in the same record. The person who started a validation stays its owner, and ownership can’t be transferred. If two people edit the same question at once, the latest change is kept.</p>' +
          '<p>Want someone else to own a new validation using the same files? They can open the existing validation, download its documents from the upload step before Phase 1, then start a new validation with them.</p>' +
        '</div></details>' +
        '<details><summary>What happens to a course’s units and validations when I archive it?</summary><div class="prose">' +
          '<p>Nothing is lost. Archiving only removes the course from your course list, to keep it tidy. Its units, unit validations and any other evidence recorded against it are kept.</p>' +
          '<p>When you restore the course, it returns to the list with all of them. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I delete a course?</summary><div class="prose">' +
          '<p>Archive it first, then delete it from the archive:</p>' +
          '<ol>' +
            '<li>On the <b>Courses</b> tab, select <b>⋮</b> › <b>Archive</b> on the course’s row.</li>' +
            '<li>Select <b>View Archived</b>.</li>' +
            '<li>On <b>Archived Courses</b>, tick the course and select <b>Delete selected</b>.</li>' +
          '</ol>' +
          '<p>Deleting is kept under archive to prevent accidental deletion of a course that may have unit validations and other evidence recorded against it. Delete a course only if you’re sure you no longer need it or its records. See <a href="article.html?id=prog-archive">Archive and restore courses</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why is a course in System Default, and why can my team see it?</summary><div class="prose">' +
          '<p>A course in <b>System Default</b> hasn’t been assigned to a team yet. Until it is, every team can see it.</p>' +
          '<p>To give it to a team, tick it on the <b>Courses</b> tab and select <b>Assign Team</b>. See <a href="article.html?id=prog-overview#bulk">Course actions</a> and <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I generate evidence in Phase 2?</summary><div class="prose">' +
          '<p>Generate Evidence reads the files you uploaded and processed for the unit. If you skipped files, or none were processed, upload and process your assessment documents first. See <a href="article.html?id=prog-validate-unit">Upload files and navigate the unit validation</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I link a unit validation to other programs?</summary><div class="prose">' +
          '<p>Yes. If the same unit is in more than one of your programs and they use the same assessment tools, one validation can cover them all, so you don’t need to validate the unit again for each program.</p>' +
          '<p>In Phase 4 of the unit validation you want to link from, go to <b>Programs covered by this validation</b> and tick the other programs it should cover. Then select <b>Add Items to Register</b>. See <a href="article.html?id=prog-validation-phases#phase4">Phase 4: Add Improvement Items</a>.</p>' +
          '<p>Recording a validation completed outside RTO Radar? Tick the programs under <b>Programs covered by this validation</b> in <b>Complete Validation</b> instead. See <a href="article.html?id=prog-complete-validation">Record a validation completed outside RTO Radar</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I submit my TAS for review?</summary><div class="prose">' +
          '<p>The TAS must meet the qualification’s packaging rules: the right number of core and elective units. Check the units overview under <b>1.5 Units of Competency</b> and add the missing units.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between a Master TAS and a Cohort TAS?</summary><div class="prose">' +
          '<p>A Master TAS is the strategy for a qualification. A Cohort TAS is created from a Master TAS for one delivery, such as an intake, campus or delivery mode. <b>Re-sync from Master</b> replaces the Cohort TAS’s content with the Master TAS’s current content, overwriting changes made in the Cohort TAS. See <a href="article.html?id=prog-tas-overview">How the TAS Builder works</a>.</p>' +
        '</div></details>' +
        '<details><summary>Does Refresh from TGA overwrite my TAS?</summary><div class="prose">' +
          '<p>You choose. <b>Refresh from TGA</b> can replace the training.gov.au content entirely with the latest, or append the new TGA additions below your current content, keeping your edits.</p>' +
        '</div></details>' +
        '<details><summary>What is an imported unit?</summary><div class="prose">' +
          '<p>A unit from outside the qualification’s own training package, such as a first aid unit in an aviation qualification. It’s usually counted as an elective, under the packaging rules for imported units, and is marked <b>Imported</b> in 1.5 Units of Competency.</p>' +
        '</div></details>' +
        '<details><summary>How do I change an approved TAS?</summary><div class="prose">' +
          '<p>An approved TAS is read-only. Open it in the TAS Builder and select <b>Create New Version</b>. This creates a draft of the next version, such as draft v2. Make your changes, then submit it for review again. Earlier versions and their approvals stay on record.</p>' +
        '</div></details>' +
        '<details><summary>If I change our TAS templates, do existing TAS documents change?</summary><div class="prose">' +
          '<p>No. Template changes apply to new TAS documents only. See <a href="article.html?id=cust-tas-templates">Customise TAS templates</a>.</p>' +
        '</div></details>' +
        '<details><summary>Where does an approved TAS go?</summary><div class="prose">' +
          '<p>It’s saved as a QMS document in <a href="feature.html?m=qms">Document Management</a>, with the next review date and standards mapping set on approval. Its submission and approval stay on the <b>Submissions</b> tab, with signatures and the audit trail.</p>' +
        '</div></details>' +
      '</section>',

    'faq-qms':
      '<section class="gs-faq">' +
        '<details><summary>What’s the difference between a document’s owner and its reviewer?</summary><div class="prose">' +
          '<p>Each document has both, and they can be different people:</p>' +
          '<ul>' +
            '<li>The <b>Document Owner</b> is responsible for maintaining the document: keeping it accurate and up to date, and uploading new versions when it changes.</li>' +
            '<li>The <b>Document Reviewer</b> is responsible for reviewing it. They’re emailed as the review due date approaches, at each reminder you tick, and given a Continuous Improvement item to work on. They check that the document is still fit for purpose.</li>' +
          '</ul>' +
          '<p>Choosing a reviewer who isn’t the owner means every document is checked by someone other than its author. You set both when you upload a document, and can change them with Edit Document. See <a href="article.html?id=upload-and-map-a-document">Upload a document and map it to standards</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I edit a document’s contents in RTO Radar?</summary><div class="prose">' +
          '<p>No. <b>Edit Document</b> only changes a document’s details, such as its title, review date, owner, reviewer, mapping and status. To change what the document says:</p>' +
          '<ol>' +
            '<li>Select <b>⋮</b> › <b>Download</b> to save the document to your computer.</li>' +
            '<li>Make your changes and save the file.</li>' +
            '<li>Select <b>⋮</b> › <b>Upload New Version</b> and upload the updated file.</li>' +
          '</ol>' +
          '<p>Uploading a new version keeps the document’s number, mapping and version history. See <a href="article.html?id=qms-new-version">Upload a new version and read version history</a>.</p>' +
          '<p>You can also delete the document and upload the updated file as a new document, but it then starts a new version history.</p>' +
        '</div></details>' +
      '</section>',

    // Workforce Management FAQs, shown on the module page under its guides
    'faq-workforce':
      '<section class="gs-faq">' +
        '<details><summary>Why can’t I see a document when I create a trainer’s evidence map or trainer matrix?</summary><div class="prose">' +
          '<p>The document hasn’t been approved yet. Only <b>approved</b> documents can be chosen as verifiable evidence, so a document that’s still <b>Pending</b> or was <b>Rejected</b> doesn’t appear in the list.</p>' +
          '<p>Documents a trainer uploads themselves stay Pending until an Admin approves them. To approve one, open the trainer’s <b>Documents</b> tab, select the tick beside the Pending document, then select <b>Approve</b>. Pending documents are also listed under <b>Admin Action</b> on the Workforce Dashboard.</p>' +
          '<p>Once it’s approved, it appears when you create the evidence map. See <a href="article.html?id=wf-documents#verify">Verify a trainer’s document</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I upload documents that aren’t on the document checklist?</summary><div class="prose">' +
          '<p>Yes. The document checklist is a guide to the documents each role should provide, not a limit on what can be uploaded. Staff can upload any document that supports their competency or currency, and linking it to a checklist item is optional.</p>' +
          '<p>A checklist item can also include a downloadable template or sample document, so staff can see what’s expected and compare it against their own. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I see a staff member to assign an improvement item, courses or units?</summary><div class="prose">' +
          '<p>They’re probably not in your team. Teams form a tree, and you can only see and assign work to people in your own branch of it. A team manager sees the members of the teams they manage and the sub-teams beneath them. Other staff see the people beside them in the same team and those beneath them.</p>' +
          '<p>Check the compliance governance chart on the <b>Teams</b> tab to see where the person sits. If they should be in your team, ask an Admin to move them in <b>Settings</b> › <b>User Management</b>. See <a href="article.html?id=wf-teams#visibility">Understanding the compliance governance chart</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between a checklist item’s review frequency and document expiry?</summary><div class="prose">' +
          '<p>They answer two different questions:</p>' +
          '<ul>' +
            '<li><b>Review frequency</b> is how often you review whether the checklist item itself is still a requirement for the role. Requirements change over time. For example, a Trainer/Assessor checklist item for the Certificate IV in Training and Assessment once asked for TAE40116; when it was superseded by TAE40122, the item needed updating to the current qualification. A yearly review catches changes like this, so the documents staff must provide stay up to date.</li>' +
            '<li><b>Document expiry</b> is for checklist items whose documents have an expiry date of their own, such as a Working With Children Check. When a trainer uploads one that expires in two months, RTO Radar tracks that date so it can be renewed on time.</li>' +
          '</ul>' +
          '<p>In short, review frequency is about the requirement; document expiry is about each staff member’s document. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</p>' +
        '</div></details>' +
      '</section>',

    'wf-pd':
      '<p class="lead">The <b>PD Calendar</b> tab tracks a staff member’s professional development: the sessions they’ve completed, planned or shown interest in, and anything that’s overdue.</p>' +
      '<p>To open it, go to <b>Workforce Management</b> › <b>Workforce</b> (1), select the person (2), then the <b>PD Calendar</b> tab (3).</p>' +
      '<figure class="shot" data-marks="0.2,0.4,5.8,4.2,oval,#; 3,7,#1; 15.8,15.4,arrow-left,tiny; 17.5,10.5,#2; 13.7,22,6.6,4.2,oval,right,#3"><img src="assets/img/wf-pd-open.png" alt="Workforce Management with the Workforce tab circled as marker 1, an arrow pointing at Staff Demo as marker 2, and the PD Calendar tab circled as marker 3. Below, Professional Development shows 5 total PD, 1 completed, 4 pending and 2 overdue, with Export CSV and Assign PD buttons and a list of five sessions, two of them admin assigned." loading="lazy"><figcaption>Open the Workforce tab (1), select the person (2), then the PD Calendar tab (3).</figcaption></figure>' +
      '<h2 id="assign">Assign a PD session</h2>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Assign PD</b>.' +
          '<figure class="shot" data-marks="89.9,4.2,8.9,7.4,oval,#"><img src="assets/img/wf-pd-list.png" alt="Professional Development on the PD Calendar tab, showing 5 total PD, 1 completed, 4 pending and 2 overdue, and a list of five sessions. The Assign PD button at the top right is circled." loading="lazy"><figcaption>Select Assign PD.</figcaption></figure></li>' +
        '<li>Under <b>Session</b>, find the session. Search by title, provider or location, and narrow the list by <b>Mode</b> and <b>Cost</b>. Tick <b>Include past events</b> to see sessions that have already run.</li>' +
        '<li>Select the session. Each shows its date, mode, cost and provider.</li>' +
        '<li>Choose the <b>Requirement Type</b>: Optional, Recommended or Mandatory.' +
          '<div class="callout note"><b>Note</b><span>Mandatory PD is flagged as overdue if it isn’t completed by its due date.</span></div></li>' +
        '<li>Add any <b>Admin Notes</b>. These are internal and optional.</li>' +
        '<li>Select <b>Assign PD</b>.' +
          '<figure class="shot" data-marks="86,90,12,6.8,oval,#"><img src="assets/img/wf-pd-assign.png" alt="Assign Professional Development, assigning a PD session to Staff Demo. Under Session, a search box, All Modes and All Costs filters, an Include past events tick box and a list of 2 sessions, with VET Workforce Week selected. Requirement Type is set to Recommended, with a note that mandatory PD is flagged as overdue if not completed by the due date. Admin Notes is optional. The Assign PD button at the bottom right is circled." loading="lazy"><figcaption>Choose the session, requirement type and any notes, then select Assign PD (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="complete">Mark PD as complete</h2>' +
      '<p>Each session in the PD Calendar has buttons under <b>Actions</b>: the tick marks it complete, and the red cross removes the PD assignment.</p>' +
      '<ol class="steps-list">' +
        '<li>On the session’s row, select the tick (1). To remove the assignment instead, select the red cross (2).' +
          '<figure class="shot" data-marks="90.5,77.4,arrow-down,small,#1; 92.8,82,arrow,small,#2"><img src="assets/img/wf-pd-list.png" alt="Professional Development on the PD Calendar tab. On The RTO Audit Preparation Plan row, an arrow from above, marker 1, points at the tick under Actions, and an arrow from below, marker 2, points at the red cross beside it." loading="lazy"><figcaption>Select the tick to complete a session (1), or the cross to remove the assignment (2).</figcaption></figure></li>' +
        '<li>In <b>Complete PD Session</b>, write the <b>Event Description</b>: the outcome or key takeaways from the session. It can also serve as the staff member’s reflection on it.</li>' +
        '<li>Optionally, under <b>Attach Evidence</b>, select <b>Add file</b> to attach evidence, such as a certificate of completion.</li>' +
        '<li>Select <b>Complete PD</b>.' +
          '<figure class="shot" data-marks="89.3,86.3,8.9,8.4,oval,above,#"><img src="assets/img/wf-pd-complete.png" alt="Complete PD Session for The RTO Audit Preparation Plan. The Event Description describes the session’s key takeaways and how the trainer will apply them, and RTO_Audit_Preparation_Plan_Certificate.pdf is attached as evidence. The Complete PD button is circled." loading="lazy"><figcaption>A completed form, with an event description and a certificate attached. Select Complete PD (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="export">Export the PD calendar</h2>' +
      '<p>Select <b>Export CSV</b> to download the staff member’s PD calendar. For every staff member’s PD in one file, use <b>Export</b> › <b>Workforce PD Log</b> at the top of Workforce Management.</p>' +
      '<figure class="shot" data-marks="80.8,4.2,9.3,7.4,oval,#"><img src="assets/img/wf-pd-list.png" alt="Professional Development on the PD Calendar tab, with the Export CSV button circled at the top right, beside Assign PD." loading="lazy"><figcaption>Select Export CSV to download the PD calendar.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>The sessions you can assign are set up in <a href="feature.html?m=pd">Professional Development</a>.</span></div>',

    'wf-dashboard':
      '<p class="lead">The <b>Workforce Dashboard</b> shows how ready your trainers are to deliver, across your whole RTO, and what needs your attention.</p>' +
      '<p>To open it, go to <b>Workforce Management</b> (1) and select the <b>Workforce Dashboard</b> tab (2).</p>' +
      '<figure class="shot" data-marks="0.4,47.2,14.4,6.4,oval,right,#1; 22.8,89.8,9.8,6.2,oval,above,#2"><img src="assets/img/wf-dash-open.png" alt="Workforce Management with Workforce Management circled in the navigation bar as marker 1 and the Workforce Dashboard tab circled as marker 2. The page shows the Show archived units tick box and four summary cards: Trainers Assigned but Unprepared 3, PD Records Awaiting Approval 1, Draft Evidence Maps 3 and Evidence Maps over 2 Years Old 0." loading="lazy"><figcaption>Select Workforce Management (1), then the Workforce Dashboard tab (2).</figcaption></figure>' +
      '<h2 id="sections">What’s on the dashboard</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>The summary cards</h4><p>On this tab, the cards along the top change to four workforce measures. Select a card to see the items behind it.</p>' +
          '<ul>' +
            '<li><b>Trainers Assigned but Unprepared</b>: trainers with assigned units they aren’t yet ready to deliver.</li>' +
            '<li><b>PD Records Awaiting Approval</b>: PD records to review.</li>' +
            '<li><b>Draft Evidence Maps</b>: evidence maps that haven’t been finished.</li>' +
            '<li><b>Evidence Maps &gt; 2 Years Old</b>: evidence maps that need re-validation.</li>' +
          '</ul>' +
          '<p>Tick <b>Show archived units</b> to include archived units in the figures.</p>' +
          '<figure class="shot"><img src="assets/img/wf-dash-cards.png" alt="The four summary cards: Trainers Assigned but Unprepared 3, PD Records Awaiting Approval 1, Draft Evidence Maps 3 and Evidence Maps over 2 Years Old 0. Draft Evidence Maps is selected, opening a list below it: 1 trainer, Staff Demo, with 3 draft maps." loading="lazy"><figcaption>Select a card, such as Draft Evidence Maps, to see the trainers behind it.</figcaption></figure></li>' +
        '<li><h4>Trainer Overview</h4><p>Three charts across all your trainers:</p>' +
          '<ul>' +
            '<li><b>Evidence Map</b>: the status of trainer evidence mapping across all assigned units: Completed, In Progress or Not started.</li>' +
            '<li><b>Units with Trainers Assigned</b>: the share of units in Program Management with at least one trainer, for example 39 of 180.</li>' +
            '<li><b>Document Expiry Health</b>: submitted staff documents that are Current, Nearing expiry or Expired.</li>' +
          '</ul>' +
          '<figure class="shot"><img src="assets/img/wf-dash-overview.png" alt="Trainer Overview: an Evidence Map pie chart with 5 completed, 4 in progress and 38 not started; a Units with Trainers Assigned ring showing 22%, 39 of 180; and a Document Expiry Health ring showing 1 expired document, with a list below it naming Staff Demo’s Working With Children Check, expired 29/03/2026." loading="lazy"><figcaption>Trainer Overview. Select a chart, such as Document Expiry Health, to see the items behind it.</figcaption></figure></li>' +
        '<li><h4>Delivery Readiness</h4><p>A bar for each trainer showing how ready they are to deliver their assigned units.</p>' +
          '<figure class="shot"><img src="assets/img/wf-dash-readiness.png" alt="Delivery Readiness: a bar for each of three trainers, split into Approved Map, Draft and Action Required. Hovering over Staff Demo’s bar shows Approved Map 31%, Draft 25% and Action Required 44%, across 16 units. A People filter sits at the top right." loading="lazy"><figcaption>Delivery Readiness. Hover over a bar to see that trainer’s breakdown.</figcaption></figure></li>' +
        '<li><h4>Admin Action</h4><p>Items from the workforce awaiting your review.</p>' +
          '<figure class="shot"><img src="assets/img/wf-dash-admin.png" alt="Admin Action: items awaiting review, each with its trainer, item, type, status and an Open link, such as a document pending verification, an evidence map reverted from approved, overdue PD and a submitted evidence map. A search box and Filters sit above the list." loading="lazy"><figcaption>Admin Action. Select Open to go straight to an item.</figcaption></figure></li>' +
        '<li><h4>Document Category</h4><p>Staff documents in each category, by how recent they are: <b>Recent</b> (under a year), <b>Current</b> (one to two years) and <b>Renewal Pending</b>, so expired documents are renewed on time. Switch between <b>Bar</b>, <b>Scatter</b> and <b>Radar</b> charts.</p>' +
          '<figure class="shot"><img src="assets/img/wf-dash-category.png" alt="Document Category: a bar chart of staff documents in each category, Qualifications, Industry Evidence, PD, Memberships, Licences and General, split into Recent (under a year), Current (one to two years) and Renewal Pending. Bar, Scatter and Radar buttons sit at the top right." loading="lazy"><figcaption>Document Category as a bar chart. Switch to Scatter or Radar at the top right.</figcaption></figure></li>' +
      '</ol>',

    'wf-teams':
      '<p class="lead">The <b>Teams</b> tab shows how your RTO is organised: every team, the compliance governance chart, and how each team is performing.</p>' +
      '<p>To open it, go to <b>Workforce Management</b> and select the <b>Teams</b> tab.</p>' +
      '<figure class="shot" data-marks="18.6,0.6,3.9,3.4,oval,#"><img src="assets/img/wf-teams-open.png" alt="The Teams tab, circled. On the left, Teams lists 9 teams, such as System Default, Executive Team, its sub-teams Compliance and Validation, Training Delivery and Programs, Student Services and Administration, and Systems and Digital Services, and the Training Delivery and Programs faculties Business Faculty and Community and Health. On the right, the read-only compliance governance chart shows System Default, managed by Admin Demo, at the top, with the Executive Team and its sub-teams branching beneath it, each with its manager and members." loading="lazy"><figcaption>The Teams tab: your teams on the left and the compliance governance chart on the right.</figcaption></figure>' +
      '<h2 id="visibility">Understanding the compliance governance chart</h2>' +
      '<p>The chart decides what each person can see and work on in RTO Radar. Where someone sits in it controls which people, courses, TAS and submissions they can reach. It’s a compliance-focused chart, not an organisational chart.</p>' +
      '<h4>System Default</h4>' +
      '<p><b>System Default</b> sits at the top of the chart and oversees everything in your RTO. Its manager is usually your RTO’s Compliance Manager, who is often also the Escalation Manager.</p>' +
      '<p>Anything not assigned to a team when it’s created goes into System Default, such as a new member, course, TAS or form. Everyone in the organisation can see it until it’s assigned to a team.</p>' +
      '<figure class="shot"><img src="assets/img/wf-gov-default.png" alt="The top of the compliance governance chart. System Default, with the Compliance Manager at the top. Beneath them are Governance Lead, Admin Demo and Quality Assurance Manager, and the Design Manager, who heads the Learning Design team." loading="lazy"><figcaption>System Default, with the Compliance Manager at the top.</figcaption></figure>' +
      '<h4>How teams limit what people see</h4>' +
      '<p>Create a team for each area whose records should stay within it. People see the documents, courses, TAS, staff, forms and improvement items of their own team, not those of teams on other branches of the chart. For example:</p>' +
      '<figure class="shot" data-marks="68.4,18.9,16.4,4.7,oval,#A; 3,18.9,16.4,4.7,oval,right,#B"><img src="assets/img/wf-gov-teams.png" alt="Part of the compliance governance chart. Beneath the Executive Team are Learning Design, managed by Design Manager, circled as B, with three teams beneath it: Business Faculty with Member Demo 1, Hospitality Faculty with Member Demo 2, and IT Faculty, managed by IT Faculty Manager, with Staff Demo; Compliance and Validation, managed by Compliance Manager, circled as A, with Compliance Officer and Compliance Specialist; and Student Services and Administration." loading="lazy"><figcaption>Compliance &amp; Validation (A) and Learning Design (B), each with its own manager and members.</figcaption></figure>' +
      '<div class="sub-steps">' +
        '<div><h4><span class="sn">A</span>Compliance &amp; Validation</h4><p>Compliance documents belong to the Compliance &amp; Validation team, so only its manager, the Compliance Manager, and its members, the Compliance Officer and Compliance Specialist, can see them.</p></div>' +
        '<div><h4><span class="sn">B</span>Learning Design</h4><p>This team manages the training and courses assigned to it, but can’t see administrative documents or the workforce of other teams. Beneath it, the <b>Business Faculty</b>, <b>Hospitality Faculty</b> and <b>IT Faculty</b> teams each see only their own courses, TAS, workforce, forms and improvement items. A Business Faculty trainer never sees a Hospitality Faculty course.</p></div>' +
      '</div>' +
      '<h4>Managers and their members</h4>' +
      '<p>A team’s members report to its manager. The manager can assign them work and review how they’re tracking, such as their delivery readiness, evidence maps and improvement items. A team without a manager reports to the manager of the team above it.</p>' +
      '<div class="sub-steps">' +
        '<div><h4><span class="sn">1</span>A team sees its own work</h4><p>A team’s manager can see the members of their team and the manager they report to, and can assign work to their members. Teams on other branches stay out of view.</p></div>' +
        '<div><h4><span class="sn">2</span>System Default sees everything</h4><p>Anyone in <b>System Default</b> bypasses teams: they can see everyone in the organisation and every team’s work.</p></div>' +
        '<div><h4><span class="sn">3</span>System Default work is shared</h4><p>Anything in System Default is unassigned, so every team can see and use it until it’s assigned to a team.</p></div>' +
      '</div>' +
      '<h4>An example</h4>' +
      '<p>Design Manager, who is in System Default, also manages the <b>Learning Design</b> team. Learning Design has three teams beneath it:</p>' +
      '<ul>' +
        '<li>The <b>Business Faculty</b> and <b>Hospitality Faculty</b>, each with one member and no manager. Their members report to Design Manager, the manager of the team above.</li>' +
        '<li>The <b>IT Faculty</b>, managed by IT Faculty Manager, with Staff Demo as its member. Staff Demo reports only to IT Faculty Manager. IT Faculty Manager isn’t in System Default.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="67.9,40.8,28.5,24.8,zone,#"><img src="assets/img/wf-gov-chart.png" alt="Part of the compliance governance chart. Learning Design, managed by Design Manager, has three teams beneath it: Business Faculty, with Member Demo 1, and Hospitality Faculty, with Member Demo 2, neither with a manager; and the IT Faculty, outlined, managed by IT Faculty Manager, an Administrator, with Staff Demo, a Trainer/Assessor, beneath." loading="lazy"><figcaption>Learning Design and the three teams beneath it. The IT Faculty (outlined) is managed by IT Faculty Manager.</figcaption></figure>' +
      '<div class="xl-book" data-hint="1">' +
        '<div class="xl-bar" role="tablist" aria-label="What the IT Faculty Manager sees">' +
          '<button type="button" role="tab" aria-selected="true">IT Faculty Manager</button>' +
          '<button type="button" role="tab" aria-selected="false">IT Faculty Manager and System Default member</button>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel">' +
        '<p>In <b>Program Management</b>, IT Faculty Manager sees only the courses assigned to the IT Faculty and the unassigned courses in System Default:</p>' +
        '<figure class="shot" data-marks="37.8,32.2,12.6,64,zone,#"><img src="assets/img/wf-gov-courses-team.png" alt="The Courses list as IT Faculty Manager sees it. The Team column, outlined, shows only System Default and IT Faculty courses, such as Diploma of Hospitality Management and Digital Literacy course wrapper in System Default, and Certificate III in Business, Diploma of Business and Certificate I in Engineering in the IT Faculty." loading="lazy"><figcaption>As a manager of the IT Faculty only: IT Faculty and System Default courses.</figcaption></figure>' +
        '<p>If IT Faculty Manager managed the Business Faculty instead, they would see only the Business Faculty’s courses and any System Default courses. A member, such as Staff Demo, sees only the courses and units assigned to them.</p>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel" hidden>' +
        '<p>Once IT Faculty Manager is added to <b>System Default</b>, every course in the organisation appears, including Learning Design’s courses and those of the Business Faculty and Hospitality Faculty:</p>' +
        '<figure class="shot" data-marks="34.4,23.6,16.6,76.4,zone,#"><img src="assets/img/wf-gov-courses-all.png" alt="The Courses list after IT Faculty Manager joins System Default. The Team column, outlined, now shows courses from every team, including System Default, IT Faculty, Learning Design, Business Faculty, with the Diploma of Business, and Hospitality Faculty, with the Diploma of Hospitality Management." loading="lazy"><figcaption>In System Default: every team’s courses.</figcaption></figure>' +
        '</div>' +
      '</div>' +
      '<p>The <b>TAS Builder</b> works the same way. IT Faculty Manager can only build and manage TAS for courses their team can see:</p>' +
      '<figure class="shot" data-marks="55.2,58.4,10.4,30.6,zone,#"><img src="assets/img/wf-gov-tas.png" alt="The TAS Builder on the Master TAS tab, listing two draft TAS, Advanced Diploma of Cyber Security and Diploma of Business, both in the IT Faculty, outlined." loading="lazy"><figcaption>The TAS Builder shows only the IT Faculty’s TAS.</figcaption></figure>' +
      '<h4>Where else this applies</h4>' +
      '<ul>' +
        '<li><b>Workforce Management</b>: a manager sees only their own members and the manager they report to. Someone in System Default sees everyone in the organisation.</li>' +
        '<li><b>Continuous Improvement</b>: improvement items can only be assigned to people you can see.</li>' +
        '<li><b>Complaints &amp; Suggestions</b>: a form submitted to a team can only be viewed by that team’s managers and members with the right permissions.</li>' +
      '</ul>' +
      '<p>This keeps each team’s work to itself. The Business Faculty doesn’t receive the IT Faculty’s courses, TAS, improvement items or complaints.</p>' +
      '<div class="callout tip"><b>Tip</b><span>Can’t find someone or something? Check the compliance governance chart to see whether it belongs to your team. If you need to oversee the whole organisation, ask an Admin to add you to <b>System Default</b> in <b>Settings</b> › <b>User Management</b>.</span></div>' +
      '<h2 id="team">Open a team</h2>' +
      '<p>Select a team in the list, such as Compliance &amp; Validation, to open it. You’ll see its analytics, such as how its improvement items are progressing and how many members it has, and its <b>Member Permissions Overview</b>: what members in each role can view, create, edit and delete in each feature.</p>' +
      '<figure class="shot" data-marks="17.2,43.9,arrow-left,small"><img src="assets/img/wf-teams-open.png" alt="The Teams tab. An arrow points at Compliance and Validation in the Teams list. On the left, Teams lists 9 teams, such as System Default, Executive Team, its sub-teams Compliance and Validation, Training Delivery and Programs, Student Services and Administration, and Systems and Digital Services, and the Training Delivery and Programs faculties Business Faculty and Community and Health. On the right, the read-only compliance governance chart shows System Default, managed by Admin Demo, at the top, with the Executive Team and its sub-teams branching beneath it, each with its manager and members." loading="lazy"><figcaption>Select a team, such as Compliance &amp; Validation, to open it.</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/wf-team-profile.png" alt="The Compliance and Validation team, opened. Analytics shows Tasks Progress, with 1 overdue task, Team Composition, with 3 team members who are Administrators, and Team Productivity, improvement items per member by status. The Member Permissions Overview shows, for the Administrators role, which core features members can view, create, edit and delete, such as QMS Documents, Program Management, Continuous Improvement, Events, TAS Builder and TAS Builder Review." loading="lazy"><figcaption>The Compliance &amp; Validation team, with its analytics and member permissions.</figcaption></figure>' +
      '<h4>Approval structure</h4>' +
      '<p>Scroll down to <b>Approval Structure</b>. It shows who approves whose work in the team: the team manager sits at the top, and the members whose work they approve sit beneath them. Here, the Compliance Manager approves the work of the Compliance Officer and the Compliance Specialist.</p>' +
      '<figure class="shot" data-marks="39.6,26.6,20.8,29.6,oval,#"><img src="assets/img/wf-team-approval.png" alt="The Approval Structure of the Compliance and Validation team: the Compliance Manager, the Team Manager, circled at the top, with the Compliance Officer, a Team Member, and the Compliance Specialist, an Administrator, beneath. Zoom and reset controls sit at the top right." loading="lazy"><figcaption>The team manager (circled) approves the work of the members reporting to them. Team managers are automatically assigned as workforce document reviewers and PD approvers for their team.</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>Teams are created and edited in <b>Settings</b> › <b>User Management</b>. See <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</span></div>',

    'wf-checklist':
      '<p class="lead">A document checklist sets out the documents everyone in a role must provide, such as a Working With Children Check or White Card. RTO Radar then tracks who’s provided each one and when they expire.</p>' +
      '<h2 id="view">View a role’s checklist</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> and select the <b>Document Checklist</b> tab (1).</li>' +
        '<li>Under <b>Selected role</b>, choose the role, such as <b>Trainer/Assessor</b> (2). Each role shows how many people hold it.' +
          '<figure class="shot" data-marks="35,40.4,14.6,5.6,oval,above,#1; 64.3,74.3,28.8,6.9,oval,above,#2"><img src="assets/img/wf-checklist-role.png" alt="Workforce Management on the Document Checklist tab, circled as marker 1. The role selector is open, headed Select a role, showing 2 of 4 roles, a Show roles with no assigned personnel tick box, and three options: Display all documents, Administrator with 13 people and Trainer/Assessor with 3, which is circled as marker 2. Below, a message says to open the selector and choose a role to view its document checklist." loading="lazy"><figcaption>Open the Document Checklist tab (1), then choose a role such as Trainer/Assessor (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Only roles with staff are listed. Tick <b>Show roles with no assigned personnel</b> to see every role, or select <b>Display all documents</b> to see the documents for all roles together.</span></div></li>' +
      '</ol>' +
      '<h2 id="add">Add a document type</h2>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Add document type</b>.' +
          '<figure class="shot" data-marks="86.9,53.9,12.2,5.2,oval,#"><img src="assets/img/wf-doctype-add.png" alt="The document checklist for the Trainer/Assessor role, with Document Expiry Health, Role coverage and a table of five configured documents. The Add document type button above the table is circled." loading="lazy"><figcaption>Select Add document type.</figcaption></figure></li>' +
        '<li>Fill in the <b>Add document type</b> form:' +
          '<figure class="shot shot-medium" data-marks="2.6,18.4,94.8,50.4,zone,#1; 2.6,70,94.8,15.8,zone,#2; 2.6,87,94.8,11.4,zone,#3"><img src="assets/img/wf-doctype-form.png" alt="The Add document type form, filled in for a First Aid Certificate. Marker 1 outlines the document details: name First Aid Certificate, category Licences, a description of evidence of completed first aid training where required by the role, delivery environment or RTO policy, a review frequency of 12 months and Document expiry turned on. Marker 2 outlines Roles required for, with Trainer/Assessor ticked. Marker 3 outlines Template / sample document, with Choose file and Pick from QMS buttons." loading="lazy"><figcaption>Document details (1), Roles required for (2) and a sample document (3).</figcaption></figure>' +
          '<ol class="ov-list">' +
            '<li><h4>Document details</h4><p>Enter the <b>Checklist Item’s Name</b>, such as First Aid Certificate, and choose its <b>Document Category</b>. Add a <b>Checklist Item’s Description</b> of what the document is and what it’s used for, then choose its <b>Checklist Item’s Review Frequency</b>, such as 12 months. Turn on <b>Document expiry</b> if the document expires.</p></li>' +
            '<li><h4>Roles required for</h4><p>Tick each role that must provide the document. It’s added to each ticked role’s checklist, and counts towards that role’s coverage. Tick <b>Show roles with no assigned personnel</b> to see every role.</p></li>' +
            '<li><h4>Sample document (optional)</h4><p>Add a template or sample with <b>Choose file</b>, or <b>Pick from QMS</b> to use a document from your QMS. Staff in the role can download it to compare against their own document.</p></li>' +
          '</ol></li>' +
        '<li>Optionally, add <b>Action items</b>, then select <b>Add document type</b>. Each action item becomes an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register</a>, with its title, description, person responsible, priority and due date.' +
          '<figure class="shot shot-medium" data-marks="5.2,60.6,27,10.8,oval,#; 82,80.2,arrow-down,small"><img src="assets/img/wf-doctype-actions.png" alt="Action items (optional): action items are added to the CI Register; leave the assignee blank to skip. One action item reads Review First Aid Certificate in Staff Document Checklist, with a description, person responsible Admin Demo, which is circled, priority Medium and due date 13/10/2027. Below are Cancel and Add document type buttons, with an arrow pointing down at Add document type." loading="lazy"><figcaption>An action item for the new document type. It’s only created when a person responsible (circled) is chosen. Then select Add document type.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Action items are optional. If you leave <b>Person responsible</b> empty, no improvement item is created. Items that are created appear in the Continuous Improvement Register, assigned to the person responsible.</span></div></li>' +
        '<li>For that role, you’ll see:' +
          '<figure class="shot" data-marks="0.1,10.5,49.5,39.9,zone,#1; 50.6,10.5,49.3,39.9,zone,#2; 0.1,52.3,86.6,47.6,zone,#3"><img src="assets/img/wf-checklist-view.png" alt="The document checklist for the Trainer/Assessor role. Marker 1 outlines Document Expiry Health: 1 expired document, with 10 current, 0 nearing expiry and 1 expired. Marker 2 outlines Role coverage: for each required document, such as Trainer CV/Resume and Working With Children Check, how many staff are expected to submit it and how many have. Marker 3 outlines Documents for Trainer/Assessor, a table of five configured documents with their category, document type, received, expiring soon and upcoming review, and an Add document type button." loading="lazy"><figcaption>Document Expiry Health (1), Role coverage (2) and the role’s documents (3).</figcaption></figure>' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">1</span>Document Expiry Health</h4><p>Submitted documents for staff in this role that are Current, Nearing expiry or Expired.</p></div>' +
            '<div><h4><span class="sn">2</span>Role coverage</h4><p>For each required document, how many staff are expected to provide it and how many have.</p></div>' +
            '<div><h4><span class="sn">3</span>Documents for the role</h4><p>Each document type with its category, how many have been <b>Received</b> (for example 1 / 3), how many are <b>Expiring soon</b>, and how many have an <b>Upcoming review</b>. Hover over the <b>i</b> beside a column heading for more about it.</p></div>' +
          '</div></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>When staff upload a document, they can link it to a checklist item. It then counts towards the role’s coverage and shows as provided on their profile.</span></div>',

    'wf-export':
      '<p class="lead">Workforce Management can export five reports, for audits, governance meetings or your own records.</p>' +
      '<h2 id="steps">Export a report</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b>.</li>' +
        '<li>Select <b>Export</b> at the top right of the page.' +
          '<figure class="shot" data-marks="67.6,58.2,8.6,22,oval,#"><img src="assets/img/wf-export.png" alt="The top of Workforce Management, with the Export button circled beside Assign Training at the top right." loading="lazy"><figcaption>Select Export at the top right of Workforce Management.</figcaption></figure></li>' +
        '<li>Choose a report.</li>' +
      '</ol>' +
      '<h2 id="reports">The reports</h2>' +
      '<ul>' +
        '<li><b>Workforce PD Log</b>: professional development across your workforce.</li>' +
        '<li><b>Evidence Map</b>: trainer evidence maps.</li>' +
        '<li><b>Complete Delivery Assignment</b>: which trainers are assigned to which courses and units.</li>' +
        '<li><b>Document Checklist Status</b>: who has provided each required document.</li>' +
        '<li><b>Workforce Document Report</b>: staff documents across your workforce.</li>' +
      '</ul>' +
      '<div class="callout tip"><b>Tip</b><span>To export one person’s records, use <b>Export to Excel</b> on their Units tab or <b>Export CSV</b> on their PD Calendar tab.</span></div>',

    // ---- Risk Assessment ----
    'risk-overview':
      '<p class="lead">Risk Assessment is where you record and manage your RTO’s organisational risks. It opens on the <b>Risk Register Overview</b>, a one-page summary of your risk profile and how often your courses should be validated.</p>' +
      '<h2 id="open">Open Risk Assessment</h2>' +
      '<p>Select <b>Risk Assessment</b> on your navigation bar.</p>' +
      '<figure class="shot shot-narrow" data-marks="2.4,67.3,95.4,7.6,oval,#"><img src="assets/img/risk-nav.png" alt="The RTO Radar navigation bar, listing Dashboard, Document Management, Program Management, Continuous Improvement, Workforce Management, Risk Assessment, Complaints and Suggestions, Events and Settings. Risk Assessment is circled." loading="lazy"><figcaption>Select Risk Assessment in the navigation bar.</figcaption></figure>' +
      '<p>Along the top of the page are three tabs:</p>' +
      '<ul>' +
        '<li><b>Overview</b>: your risk profile, actions and risk factors. This is the tab described below.</li>' +
        '<li><b>Version History</b>: every saved version of your risk register, and how your risks have changed over time. See <a href="article.html?id=risk-versions">Save, view and export risk register versions</a>.</li>' +
        '<li><b>Guide</b>: how course risk is worked out and the validation frequency for each risk score. See <a href="article.html?id=risk-provider-factors">Risk scores and validation frequency</a>.</li>' +
      '</ul>' +
      '<h2 id="cards">What’s on the Overview</h2>' +
      '<p>The <b>Overview</b> tab is open when you arrive. Each numbered part of the page is explained below.</p>' +
      '<figure class="shot shot-medium" data-marks="0.6,0.1,33,3.3,oval,#; 92.5,9.9,#1; 44.2,23.4,#2; 95.8,23.4,#3; 44.2,53,#4; 44.2,67.2,#5; 95.8,48.4,#6; 95.8,82,#7"><img src="assets/img/risk-overview-page.png" alt="The Overview tab of the Risk Register, with the Overview tab circled. Numbered markers point to each part of the page: 1 the RTO details card for RTO Radar Demo, RTO code 0001 and 200 annual enrolments; 2 the Risk Score card, 6.0 out of 10, with Last Updated, Next Review and Risk Calculation; 3 the Validation Frequency card, 6 months; 4 Risks Identified, 27; 5 the Escalation Manager, Admin Demo; 6 the Actions panel, with Update RTO Profile, Edit Comprehensive Assessment, Email Escalation Manager, Schedule Email and Export Excel; and 7 the Risk Factors panel, with Basic Provider Risk Factors, 3 active, and Comprehensive Risk Factors, 24 identified." loading="lazy"><figcaption>The Overview tab (circled) and the parts of the page (1 to 7).</figcaption></figure>' +
      '<ol class="ov-list">' +
      '<li><h4>RTO details</h4>' +
      '<p>Your RTO’s name, RTO code and annual enrolments, as entered in your RTO profile.</p></li>' +
      '<li><h4>Risk Score</h4>' +
      '<p>Your organisational risk score, out of 10. It’s worked out from your RTO profile and your comprehensive risk assessment, and the higher it is, the more often your courses should be validated.</p>' +
      '<ul>' +
        '<li><b>Last Updated</b> is when your risk register was last saved.</li>' +
        '<li><b>Next Review</b> is when your risk register is next due for review, 12 months after it was last saved.</li>' +
        '<li><b>Risk Calculation</b> shows how your score was worked out.</li>' +
      '</ul></li>' +
      '<li><h4>Validation Frequency</h4>' +
      '<p>How often your courses should be validated, based on your current risk score. For example, a score of 6 (High Risk) gives a validation frequency of 6 months. This is the baseline for every course: a course’s own risk factors can shorten it further, never lengthen it.</p></li>' +
      '<li><h4>Risks Identified</h4>' +
      '<p>The total number of risks on your register. It counts your active basic provider risk factors and the risks in your comprehensive assessment, so 3 basic factors and 24 comprehensive risks show as 27.</p></li>' +
      '<li><h4>Escalation Manager</h4>' +
      '<p>The name and email of the person who keeps watch over your organisational risks. You nominate them in your RTO profile. See <a href="article.html?id=risk-escalation-manager">The Escalation Manager</a>.</p></li>' +
      '<li><h4>Actions</h4>' +
      '<p>Everything you can do with your risk register:</p>' +
      '<table><thead><tr><th>Action</th><th>What it does</th></tr></thead><tbody>' +
        '<tr><td><b>Update RTO Profile</b></td><td>Change your RTO details, annual enrolments, basic provider risk factors and Escalation Manager. See <a href="article.html?id=risk-rto-profile">Update your RTO profile</a>.</td></tr>' +
        '<tr><td><b>Edit Comprehensive Assessment</b></td><td>Add, change or remove risks and their treatment plans. Before your first assessment it reads <b>Begin Comprehensive Assessment</b>. See <a href="article.html?id=risk-add-score">Add risks and treatment plans</a>.</td></tr>' +
        '<tr><td><b>Email Escalation Manager</b></td><td>Send your Escalation Manager a copy of your risk report now.</td></tr>' +
        '<tr><td><b>Schedule Email</b></td><td>Choose when your Escalation Manager is emailed about new risks. See <a href="article.html?id=risk-escalation">Email and schedule risk reports</a>.</td></tr>' +
        '<tr><td><b>Export Excel</b></td><td>Download your risk register as an Excel workbook. See <a href="article.html?id=risk-export">Export the risk register to Excel</a>.</td></tr>' +
      '</tbody></table></li>' +
      '<li><h4>Risk Factors</h4>' +
      '<p>At the bottom of the page, every risk factor behind your score, in two lists you can expand: your <b>Basic Provider Risk Factors</b> and your <b>Comprehensive Risk Factors</b>. See <a href="article.html?id=risk-factors">Browse your risk factors</a>.</p></li>' +
      '</ol>' +
      '<h2 id="save">Save Risk Register</h2>' +
      '<p>The <b>Save Risk Register</b> button at the top right saves a new version of your register as it stands now. Each version is kept in Version History, so you can look back at your risk profile on any date.</p>' +
      '<figure class="shot" data-marks="78.6,56.7,17.7,29.3,oval,#"><img src="assets/img/risk-save-register.png" alt="The top of the Risk Register Overview page, headed Risk Register Overview, Your RTO risk profile and validation frequency framework. The Save Risk Register button at the top right is circled." loading="lazy"><figcaption>Select Save Risk Register at the top right of the page.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Save your register after a review, even if nothing has changed. It records that the review took place and resets the Next Review date.</span></div>',

    'risk-rto-profile':
      '<p class="lead">Your RTO profile is the starting point for your organisational risk score. Keep it up to date whenever your enrolments, registration or compliance situation changes.</p>' +
      '<h2 id="steps">Update your RTO profile</h2>' +
      '<ol class="steps-list">' +
        '<li>On your navigation bar, go to <b>Risk Assessment</b>.</li>' +
        '<li>Under <b>Actions</b>, select <b>Update RTO Profile</b>.' +
          '<figure class="shot" data-marks="63.6,57.2,36,10.4,oval,#"><img src="assets/img/gs-org-step1.png" alt="The Risk Assessment page, with the Update RTO Profile button circled, the first button in the Actions panel." loading="lazy"><figcaption>Select Update RTO Profile under Actions.</figcaption></figure></li>' +
        '<li>Check your RTO name and code, enter your RTO’s <b>Approximate Annual Enrolments</b>, and choose your <b>Basic Provider Risk Factors</b>. Together, your enrolments and risk factors feed into your organisational risk score.' +
          '<figure class="shot shot-medium"><img src="assets/img/gs-org-details.png" alt="The top of the Update RTO Profile form. RTO Information shows the RTO name and code and Approximate Annual Enrolments of 200. Basic Provider Risk Factors lists checkboxes such as CRICOS registered, government funding received, compliance issues identified within the past 3 years and high assessor turnover." loading="lazy"><figcaption>Your RTO information and basic provider risk factors.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Not sure which risk factors apply? Choose what you know now. You can change them later from Update RTO Profile.</span></div></li>' +
        '<li>Nominate an <b>Escalation Manager</b>, then select <b>Save &amp; Exit</b>.' +
          '<div class="callout note"><b>Note</b><span>Your Escalation Manager keeps watch over your organisational risks. RTO Radar notifies them whenever a risk is added to or removed from your register, at any risk level, so nothing changes without them knowing. Choose a senior manager or board member.</span></div>' +
          '<figure class="shot" data-marks="91.7,87,arrow-down,small"><img src="assets/img/gs-org-escalation.png" alt="The Escalation Manager section of the Update RTO Profile form, with Name and Email fields filled in as Admin Demo and admindemo@rtoradar.com.au, and a note that the Escalation Manager also serves as the default manager for the System Default team. Below it, the save bar shows Save Status: Not saved, with Edit Comprehensive Assessment and Save and Exit buttons. An arrow points down at the Save and Exit button." loading="lazy"><figcaption>Enter your Escalation Manager’s name and email, then select Save &amp; Exit.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="what-changes">What changes when you save</h2>' +
      '<p>Your enrolments and basic provider risk factors feed into your organisational risk score. When you save, the Overview updates your <b>Risk Score</b>, <b>Validation Frequency</b> and <b>Risks Identified</b> straight away, and the new validation frequency flows through to every course.</p>' +
      '<div class="callout note"><b>Note</b><span>Only Admins can update the RTO profile. While you’re viewing an older version of the register, Update RTO Profile is unavailable: return to the current version first.</span></div>',

    'risk-add-score':
      '<p class="lead">The comprehensive assessment is your full risk register. You record each risk under a category, rate how likely it is and how serious it would be, and RTO Radar scores it for you.</p>' +
      '<h2 id="scoring">How risks are scored</h2>' +
      '<p>Every risk is rated on two five-point scales:</p>' +
      '<table><thead><tr><th>Rating</th><th>Likelihood</th><th>Consequence</th></tr></thead><tbody>' +
        '<tr><td>1</td><td>Rare</td><td>Insignificant</td></tr>' +
        '<tr><td>2</td><td>Unlikely</td><td>Minor</td></tr>' +
        '<tr><td>3</td><td>Possible</td><td>Moderate</td></tr>' +
        '<tr><td>4</td><td>Likely</td><td>Major</td></tr>' +
        '<tr><td>5</td><td>Almost Certain</td><td>Catastrophic</td></tr>' +
      '</tbody></table>' +
      '<p>The <b>risk score</b> is likelihood × consequence, from 1 to 25, and it sets the <b>risk level</b>:</p>' +
      '<ul>' +
        '<li><b>Low</b>: 1–4</li>' +
        '<li><b>Medium</b>: 5–9</li>' +
        '<li><b>High</b>: 10–16</li>' +
        '<li><b>Extreme</b>: 17–25.</li>' +
      '</ul>' +
      '<p>For example, a risk that’s <i>Possible</i> (3) with a <i>Moderate</i> consequence (3) scores 9, a Medium risk.</p>' +
      '<h2 id="steps">Add a risk</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Edit Comprehensive Assessment</b>.' +
          '<figure class="shot" data-marks="0.4,47.3,15.6,7.8,oval,#1; 63.6,65.6,36,10.4,oval,#2"><img src="assets/img/gs-org-step1.png" alt="RTO Radar with Risk Assessment selected in the navigation, showing the Actions panel. Marker 1 circles Risk Assessment in the navigation, and marker 2 the second button in Actions, Edit Comprehensive Assessment." loading="lazy"><figcaption>Select Risk Assessment (1), then Edit Comprehensive Assessment (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Before your first assessment, this button reads Begin Comprehensive Assessment.</span></div></li>' +
        '<li>You’ll be greeted by the <b>Risk Heatmap</b>.' +
          '<figure class="shot"><img src="assets/img/gs-risk-heatmap-grid.png" alt="The Risk Heatmap: a five by five grid with likelihood across the top, from Rare to Almost Certain, and consequence down the side, from Insignificant to Catastrophic. Each square is coloured Low, Medium, High or Extreme and shows how many risks fall in it." loading="lazy"><figcaption>The Risk Heatmap.</figcaption></figure>' +
          '<p>The Risk Heatmap shows all your organisational risks at a glance, placed by how likely each one is and how serious it would be. The further towards the top right a risk sits, the more urgently it needs attention.</p></li>' +
        '<li>Scroll down to <b>Risk Assessment by Category</b>.</li>' +
        '<li>Choose the category where you want to enter a risk, then select <b>Add Additional Risk</b>.' +
          '<figure class="shot" data-marks="5.6,21.8,10.4,6.2,oval,right,#1; 55.4,30,15.4,4.4,oval,right,#2"><img src="assets/img/gs-risk-categories.png" alt="Risk Assessment by Category in the comprehensive assessment. On the left is the list of 12 risk categories with how many risks each has; Financial Risk is selected and shows 0 risks identified, an example, and an Add Additional Risk button. Marker 1 circles the Financial Risk category, and marker 2 the Add Additional Risk button. A bar along the bottom shows the save status and a Complete Risk Assessment button." loading="lazy"><figcaption>Choose a category such as Financial Risk (1), then select Add Additional Risk (2).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Want categories that fit your RTO? Set them up in <a href="article.html?id=cust-risk-categories">Configure risk categories and register versioning</a>.</span></div></li>' +
        '<li>Enter the risk title, description, likelihood and consequence, then select <b>Add Risk Factor</b>. The risk’s score and level appear as you choose.' +
          '<figure class="shot shot-medium" data-marks="2.9,86.9,26.9,9.3,oval,#"><img src="assets/img/gs-risk-add-factor.png" alt="The Add New Risk Factor form, filled in with an example: the risk title Cash-flow pressure from delayed student payments, a description, likelihood 3 - Possible and consequence 3 - Moderate. The Add Risk Factor button is circled." loading="lazy"><figcaption>Enter the risk details, then select Add Risk Factor.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="treatment">Add existing controls and a treatment plan</h2>' +
      '<p>For risks rated Medium or higher, we recommend adding Existing Controls and a Treatment Plan. To learn what makes a good one, see <a href="article.html?id=risk-treatment">Treatment plans</a>.</p>' +
      '<ol class="steps-list" start="6" style="counter-reset: s 5">' +
        '<li>Add your <b>Existing Controls</b>: what you already do to manage this risk.' +
          '<div class="callout note"><b>Note</b><span>Existing Controls and the treatment plan only appear after you select Add Risk Factor.</span></div></li>' +
        '<li>Select <b>Treatment Plan Strongly Recommended</b>.' +
          '<figure class="shot shot-medium" data-marks="2.1,81.2,58.2,6.7,oval,#; 30,81.2,arrow-down,tiny"><img src="assets/img/gs-risk-controls.png" alt="A saved risk, Cash-flow pressure from delayed student payments, rated Medium Risk with a score of 9 and marked Escalation Required, with its Existing Controls filled in. A small arrow leads from the last existing control, management review of outstanding debts, down to the Treatment Plan Strongly Recommended button, which is circled." loading="lazy"><figcaption>Select Treatment Plan Strongly Recommended.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>This button’s wording depends on the risk’s score. For medium, high and extreme risks it reads Treatment Plan Strongly Recommended. For low risks a treatment plan is optional, so it reads Add Optional Treatment Plan instead.</span></div></li>' +
        '<li>Enter a title, description and proposed treatment, nominate the person responsible, and set a due date and status.' +
          '<div class="callout note"><b>Note</b><span>The responsible person gets an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register (CIR)</a> with the proposed treatment.</span></div>' +
          '<figure class="shot"><img src="assets/img/gs-risk-treatment.png" alt="A treatment plan being added to a risk: title Monthly Cash-Flow Monitoring, a description, a proposed treatment, responsible person Compliance Manager, due date 30/10/2026 and status Not started. A bar along the bottom shows the save status, 1 item queued for CI Register and a Complete Risk Assessment button." loading="lazy"><figcaption>Fill in the treatment plan. Use the calendar icon to pick a due date.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="complete">Complete the assessment</h2>' +
      '<ol class="steps-list" start="9" style="counter-reset: s 8">' +
        '<li>Repeat steps 4 to 8 to add more risks, then select <b>Complete Risk Assessment</b>.' +
          '<figure class="shot" data-marks="8.4,54.2,17.6,10,oval,#1; 49,16.4,arrow-down,#2; 88.1,92.6,arrow-down,#3"><img src="assets/img/gs-risk-repeat.png" alt="Risk Assessment by Category with a second category selected. Marker 1 circles ICT and Cyber-Security Risk in the category list, and marker 2 is an arrow pointing down at its content on the right: its description, an example, and a risk being entered, Staff Awareness of Cyber Risks, rated Medium Risk with a score of 9. Marker 3 is an arrow pointing down at the Complete Risk Assessment button in the save bar along the bottom, which shows 2 items queued for CI Register." loading="lazy"><figcaption>Choose another category (1), add its risks the same way (2), then select Complete Risk Assessment (3).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The bar along the bottom shows whether your changes are saved, and how many items are queued for the Continuous Improvement Register. Queued items are created when you complete the assessment.</span></div></li>' +
        '<li>Review your changes, then select <b>Complete Risk Assessment</b>. To leave without saving, select <b>Discard and Exit</b>.' +
          '<figure class="shot" data-marks="60.9,89.4,23.5,7.4,oval,#"><img src="assets/img/gs-risk-review.png" alt="The review shown before completing the assessment, headed New Risks Added (2). It lists both new risks with their category, likelihood and consequence, and treatment plan: Cash-flow pressure from delayed student payments, rated Medium with a score of 9, and Staff Awareness of Cyber Risks, rated Low with a score of 4. The Complete Risk Assessment button, between Discard and Exit and Cancel, is circled." loading="lazy"><figcaption>Review the new risks and their treatment plans, then select Complete Risk Assessment.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="after">What happens when you complete it</h2>' +
      '<ul>' +
        '<li>Your organisational <b>risk score</b>, <b>validation frequency</b> and <b>risks identified</b> update on the Overview.</li>' +
        '<li>The <b>Risk Heatmap</b> updates to include the new risks. See <a href="article.html?id=risk-heatmap">Read the risk heatmap</a>.</li>' +
        '<li>A new version of your risk register is saved in Version History.</li>' +
        '<li>Each treatment plan becomes an improvement item for its responsible person in the <a href="feature.html?m=cir">Continuous Improvement Register</a>.</li>' +
        '<li>Your Escalation Manager is emailed about the new risks.</li>' +
      '</ul>' +
      '<div class="callout tip"><b>Tip</b><span>Each completion sends a new email, so add all the risks you want to record before you complete the assessment, rather than completing it after each one.</span></div>' +
      '<h2 id="ids">Risk IDs</h2>' +
      '<p>Every risk gets an ID made from its category’s initials and a number, such as <b>FR-1</b> for the first Financial Risk or <b>CRR-1</b> for the first Compliance &amp; Reputational Risk. IDs stay the same across versions and exports, so you can refer to a risk by its ID in meetings and reports.</p>',

    'risk-treatment':
      '<p class="lead">A treatment plan is your RTO’s answer to a risk: the actions you’ll take to make it less likely or less serious, who will take them, and by when. It turns a risk on paper into work someone is accountable for.</p>' +
      '<h2 id="find">Where to find them</h2>' +
      '<p>Treatment plans are added to risks in the comprehensive assessment. Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Edit Comprehensive Assessment</b>, choose a category under <b>Risk Assessment by Category</b>, and open a risk. The treatment plan sits below its existing controls.</p>' +
      '<div class="callout tip"><b>Tip</b><span>For step-by-step instructions with pictures, see <a href="article.html?id=risk-add-score#treatment">Add risks and treatment plans in the comprehensive assessment</a>, steps 6 to 8.</span></div>' +
      '<h2 id="controls">Existing controls and treatment plans</h2>' +
      '<p>Every risk can record two kinds of response:</p>' +
      '<ul>' +
        '<li><b>Existing Controls</b> are what your RTO already does to manage the risk today, such as policies, checks, training or regular reviews.</li>' +
        '<li>A <b>Treatment Plan</b> is what you’ll do next to reduce the risk further, because the existing controls aren’t enough on their own.</li>' +
      '</ul>' +
      '<p>A risk’s likelihood and consequence describe it with your existing controls in place. The treatment plan is how you bring them down.</p>' +
      '<figure class="shot shot-medium" data-marks="2.1,81.2,58.2,6.7,oval,#"><img src="assets/img/gs-risk-controls.png" alt="A risk, Cash-flow pressure from delayed student payments, rated Medium Risk with a score of 9 and marked Escalation Required. Its Existing Controls list what the RTO already does, such as accounts receivable monitoring and management review of outstanding debts. Below them, the Treatment Plan Strongly Recommended button is circled." loading="lazy"><figcaption>A Medium risk with its existing controls filled in. The circled button adds a treatment plan.</figcaption></figure>' +
      '<h2 id="when">When you need one</h2>' +
      '<table><thead><tr><th>Risk level</th><th>Treatment plan</th><th>The button reads</th></tr></thead><tbody>' +
        '<tr><td><b>Low</b> (1–4)</td><td>Optional</td><td>Add Optional Treatment Plan</td></tr>' +
        '<tr><td><b>Medium</b> (5–9)</td><td>Strongly recommended</td><td>Treatment Plan Strongly Recommended</td></tr>' +
        '<tr><td><b>High</b> (10–16)</td><td>Strongly recommended</td><td>Treatment Plan Strongly Recommended</td></tr>' +
        '<tr><td><b>Extreme</b> (17–25)</td><td>Strongly recommended</td><td>Treatment Plan Strongly Recommended</td></tr>' +
      '</tbody></table>' +
      '<p>A Medium, High or Extreme risk without a plan shows as a <b>missing treatment</b> on the dashboard.</p>' +
      '<h2 id="parts">What’s in a treatment plan</h2>' +
      '<ul>' +
        '<li><b>Title</b> and <b>description</b>: a short name for the plan and what it sets out to achieve.</li>' +
        '<li><b>Proposed Treatment</b>: the actions that will reduce the risk.</li>' +
        '<li><b>Responsible Person</b>: who will carry them out.</li>' +
        '<li><b>Due Date</b>: when they should be done by.</li>' +
        '<li><b>Status</b>: Not started, In Progress or Completed.</li>' +
      '</ul>' +
      '<figure class="shot"><img src="assets/img/gs-risk-treatment.png" alt="A treatment plan being added to a risk: title Monthly Cash-Flow Monitoring, a description, a proposed treatment, responsible person Compliance Manager, due date 30/10/2026 and status Not started. A bar along the bottom shows the save status, 1 item queued for CI Register and a Complete Risk Assessment button." loading="lazy"><figcaption>An example treatment plan, Monthly Cash-Flow Monitoring, assigned to the Compliance Manager. The bar along the bottom shows 1 item queued for the CI Register.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Write the proposed treatment as concrete actions someone can tick off, such as “Introduce a monthly cash-flow review”, rather than a general aim such as “Improve cash flow”.</span></div>' +
      '<h2 id="cir">From treatment plan to improvement item</h2>' +
      '<p>When you complete the assessment, each treatment plan becomes an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register (CIR)</a>, assigned to its responsible person. The item carries over the risk’s category, description, level, existing controls, likelihood, consequence and proposed treatment, so they have everything they need without opening the risk register.</p>' +
      '<p>In the CIR, items created from treatment plans show <b>Risk Register</b> as their source:</p>' +
      '<figure class="shot" data-marks="23.9,57.4,6.9,9.6,underline,#"><img src="assets/img/gs-cir-list.png" alt="The Continuous Improvement item list, showing two items with Risk Register as their source. Each row shows the item number, who created it, status, person responsible, assigned date, description, tags, due date and priority. Risk Register is underlined on the first item." loading="lazy"><figcaption>Improvement items created from treatment plans, with Risk Register as their source.</figcaption></figure>' +
      '<p>Opened in full, the item shows everything carried over from the risk and its treatment plan:</p>' +
      '<figure class="shot shot-small"><img src="assets/img/gs-cir-item.png" alt="An improvement item opened in full. It shows the title, source, person responsible, dates, tags and the original risk score, notes carried over from the risk (category, description, level, existing controls, likelihood and consequence), and the proposed treatment. Buttons along the bottom are Delete Item, Complete Item, Verify, More info and Edit Item." loading="lazy"><figcaption>An improvement item created from a risk treatment plan. Complete Item and Verify close it out.</figcaption></figure>' +
      '<p>When they complete or verify the item, they record the actions taken and any updated risk level. That record shows against the risk in your Excel export, under Actions Completed, Completed By and Completed Date, so your register keeps a full history of how each risk was treated.</p>' +
      '<h2 id="who">Responsible person or Escalation Manager?</h2>' +
      '<p>The responsible person carries out one treatment plan. The <a href="article.html?id=risk-escalation-manager">Escalation Manager</a> oversees all of your organisational risks. They can be the same person, but they don’t have to be.</p>' +
      '<p>To add a treatment plan, see <a href="article.html?id=risk-add-score">Add risks and treatment plans in the comprehensive assessment</a>.</p>',

    'risk-heatmap':
      '<p class="lead">The Risk Heatmap shows all of your organisational risks on one grid, so you can see at a glance where they cluster and which need attention first.</p>' +
      '<p>You’ll find it at the top of the comprehensive assessment: go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Edit Comprehensive Assessment</b>.</p>' +
      '<figure class="shot" data-marks="49.1,40.9,10.7,9.2,oval,#1; 49.2,51,22.6,43.2,zone,#2; 30.8,84.2,18.3,12,oval,#3"><img src="assets/img/risk-heatmap-hover.png" alt="The Risk Heatmap: a five by five grid with likelihood across the top, from Rare to Almost Certain, and consequence down the side, from Insignificant to Catastrophic. Each square is coloured by risk level and shows how many risks fall in it. Marker 1 circles the Possible and Moderate square, which holds 4 risks. Marker 2 outlines the panel that opens over it, headed 4 Risks, Likelihood 3 times Consequence 3 equals Score 9, listing each risk with a Medium Risk label. Below the grid are summary cards: 24 Total Comprehensive Risks, and 19 Med/High/Extreme, circled as marker 3. An Export Register button sits at the right." loading="lazy"><figcaption>The grid (1), the risks in a square (2) and the summary cards (3), each explained below.</figcaption></figure>' +
      '<h2 id="parts">What’s on the heatmap</h2>' +
      '<ol class="ov-list">' +
      '<li><h4>Reading the grid</h4>' +
      '<ul>' +
        '<li><b>Likelihood</b> runs across the top, from Rare to Almost Certain.</li>' +
        '<li><b>Consequence</b> runs down the side, from Catastrophic at the top to Insignificant at the bottom.</li>' +
        '<li>Each square shows <b>how many risks</b> share that rating. An empty square has none.</li>' +
      '</ul>' +
      '<p>A risk’s score is its likelihood multiplied by its consequence, and the colour shows its level:</p>' +
      '<table><thead><tr><th>Colour</th><th>Risk level</th><th>Score</th></tr></thead><tbody>' +
        '<tr><td>Green</td><td>Low</td><td>1–4</td></tr>' +
        '<tr><td>Yellow</td><td>Medium</td><td>5–9</td></tr>' +
        '<tr><td>Orange</td><td>High</td><td>10–16</td></tr>' +
        '<tr><td>Red</td><td>Extreme</td><td>17–25</td></tr>' +
      '</tbody></table>' +
      '<p>The further towards the top right a risk sits, the more likely and the more serious it is, so start there.</p></li>' +
      '<li><h4>See the risks in a square</h4>' +
      '<p>Hover over a square to open a panel listing its risks. The top of the panel shows how they were scored, for example “Likelihood: 3 × Consequence: 3 = Score 9”, and each risk is listed with its description and level.</p>' +
      '<div class="callout tip"><b>Tip</b><span>Everything here takes you straight to the risk. Select any risk in the panel, or the <b>Med/High/Extreme</b> or <b>missing treatment plans</b> card below the grid, and the assessment jumps to that risk in its category, ready to review or add a treatment plan.</span></div></li>' +
      '<li><h4>The summary cards</h4>' +
      '<p>Below the grid, cards count your risks: your <b>Total Comprehensive Risks</b>, how many are <b>Med/High/Extreme</b>, and how many are missing a treatment plan. <b>Export Register</b> downloads your register to Excel.</p></li>' +
      '</ol>' +
      '<h2 id="export">In your Excel export</h2>' +
      '<p>The heatmap also appears on the <b>Risk Overview</b> sheet of your Excel export, with a legend and your highest-scoring risks underneath. See <a href="article.html?id=risk-export">Export the risk register to Excel</a>.</p>',

    'risk-factors':
      '<p class="lead">The <b>Risk Factors</b> panel at the bottom of the Overview lists every factor behind your risk score. It’s the quickest way to read your register without opening the assessment.</p>' +
      '<h2 id="basic">Basic Provider Risk Factors</h2>' +
      '<p>Select <b>Basic Provider Risk Factors</b> to expand it. It shows how many factors are active, and lists the ones you ticked in your RTO profile, such as CRICOS registered or government funding. To change them, use <a href="article.html?id=risk-rto-profile">Update RTO Profile</a>.</p>' +
      '<figure class="shot" data-marks="93.8,36.6,4.6,9.2,oval,#"><img src="assets/img/risk-basic-factors.png" alt="The Risk Factors panel, headed Your RTO’s baseline risk factors that apply to all courses. Basic Provider Risk Factors is expanded, showing 5 active: CRICOS registered, Government funding, Compliance history, Apprentices/trainees and Remote/regional students. The arrow that expands and collapses the list is circled." loading="lazy"><figcaption>Basic Provider Risk Factors expanded, with 5 active. Select the arrow (circled) to expand or collapse the list.</figcaption></figure>' +
      '<h2 id="comprehensive">Comprehensive Risk Factors</h2>' +
      '<p>Select <b>Comprehensive Risk Factors</b> to expand the risks from your comprehensive assessment, grouped by category.</p>' +
      '<figure class="shot" data-marks="2.6,8.4,27.6,7.8,oval,right,#1; 2.8,25.6,94.8,9.2,zone,#2; 84.2,71.7,12.2,6.2,oval,#3; 8.2,79.8,20,4.6,underline,right,#4"><img src="assets/img/risk-comprehensive-factors.png" alt="Comprehensive Risk Factors expanded, with 24 identified. Marker 1 circles the Descending and Options buttons, above the line Showing 24 of 24 risks across 11 categories. Marker 2 outlines the Escalation Required banner: High/extreme risks will be sent to Admin Demo. Below are the categories, each with a count badge: Child Safe Risk 2, Compliance and Reputational Risk 1 with a warning triangle, Environmental Risk 1, and Financial Risk 2 with a warning triangle. Marker 3 circles the warning triangle, badge and arrow on Financial Risk, which is expanded to show two risks. Marker 4 underlines the first, Reliance on State Funding." loading="lazy"><figcaption>Sort and filter the risks (1), check the Escalation Required banner (2), expand a category (3), then select a risk (4).</figcaption></figure>' +
      '<ol class="steps-list">' +
        '<li>Choose how the risks are ordered with the <b>Descending</b> button, and filter them with <b>Options</b>. The line underneath shows how many risks are showing, for example “Showing 24 of 24 risks across 11 categories”.' +
          '<div class="callout note"><b>Note</b><span>Sorting and filtering apply to the risks inside each category, not to the categories themselves. The categories stay where they are, and each one shows its own risks in the order and selection you’ve chosen.</span></div></li>' +
        '<li>Check the <b>Escalation Required</b> banner. It names the Escalation Manager that High and Extreme risks are sent to.</li>' +
        '<li>Select a category to expand it. The badge shows how many risks it holds, and a warning triangle marks a category with a High or Extreme risk.</li>' +
        '<li>Select a risk to open its <b>Risk Details</b>.</li>' +
      '</ol>' +
      '<h2 id="details">Risk Details</h2>' +
      '<p>Each risk’s details show everything recorded for it in the assessment:</p>' +
      '<ul>' +
        '<li><b>Risk ID</b> and <b>Category</b>, such as FR-2 in Financial Risk</li>' +
        '<li><b>Risk Level</b> and <b>Risk Score</b>, with the <b>Likelihood</b> and <b>Consequence</b> behind them</li>' +
        '<li><b>Responsible Person</b> and <b>Status</b></li>' +
        '<li><b>Description</b> and <b>Existing Controls</b></li>' +
        '<li><b>Treatment Plans</b>, with how many the risk has. Each plan shows its proposed treatment, responsible person, due date and status.</li>' +
      '</ul>' +
      '<figure class="shot"><img src="assets/img/risk-details.png" alt="Risk Details for FR-2 in Financial Risk: Medium risk level, responsible person Compliance Manager, likelihood 3, consequence 3, risk score 9, status Not started, the risk description and five existing controls. Below, Treatment Plans (1) shows Monthly Cash-Flow Monitoring with its proposed treatment, responsible person Compliance Manager, due date 2026-10-30 and status Not started. It is marked Linked to CI item." loading="lazy"><figcaption>The details of a risk and its treatment plan.</figcaption></figure>' +
      '<p>A treatment plan marked <b>Linked to CI item</b> has an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register</a>, assigned to its responsible person. See <a href="article.html?id=risk-treatment">Treatment plans</a>.</p>' +
      '<div class="callout note"><b>Note</b><span>The Risk Factors panel is read-only. To change a risk, use Edit Comprehensive Assessment.</span></div>',

    'risk-provider-factors':
      '<p class="lead">RTO Radar uses your risk scores to recommend how often each course should be validated. The riskier your RTO and the course, the more often it’s validated.</p>' +
      '<h2 id="tiers">Three tiers of risk</h2>' +
      '<p>Risk is worked out in three tiers, and each builds on the one above it:</p>' +
      '<ul class="formulas">' +
        '<li><b>Organisational risk</b><code>Basic profile + Comprehensive risk assessment</code><span>Worked out from your basic and comprehensive risk profiles in Risk Assessment. This is the Risk Score on the Risk Register Overview.</span></li>' +
        '<li><b>Course risk</b><code>Organisational risk score + Course risk assessment</code><span>Comes from the course’s risk assessment: its required course-specific risk factors and any additional ones. Combined with your organisational risk, it gives the course a total risk score out of 10, which sets how often the course is validated.</span></li>' +
        '<li><b>Unit risk</b><code>Unit-specific risks + Course risk score, from 1 to 10</code><span>Every unit follows its course’s validation frequency, unless its own risks shorten it further: physical risk, sensitive content and completion rate.</span></li>' +
      '</ul>' +
      '<p>So a change to your organisational risk flows down to every course and unit. Admins can customise these risks in <b>Settings</b> › <b>Customisation</b> › <b>Risk</b>.</p>' +
      '<h2 id="frequency">Validation frequency</h2>' +
      '<p>Each risk score maps to a validation frequency. To see the bands your RTO uses, go to <b>Risk Assessment</b> and select the <b>Guide</b> tab.</p>' +
      '<figure class="shot" data-marks="62.8,70,29,17.5,oval,#"><img src="assets/img/risk-guide-tab.png" alt="The top of the Risk Register Overview page, with three tabs: Overview, Version History and Guide. The Guide tab is selected and circled." loading="lazy"><figcaption>Select the Guide tab.</figcaption></figure>' +
      '<p>For example:</p>' +
      '<table><thead><tr><th>Total risk score</th><th>Situation</th><th>Validate every</th></tr></thead><tbody>' +
        '<tr><td>8–10</td><td>Very High Risk</td><td>6 months</td></tr>' +
        '<tr><td>6–7</td><td>High Risk</td><td>6 months (customised in this example)</td></tr>' +
        '<tr><td>4–5</td><td>Medium Risk</td><td>18 months</td></tr>' +
        '<tr><td>2–3</td><td>Low-Medium Risk</td><td>24 months</td></tr>' +
        '<tr><td>1</td><td>Low Risk</td><td>36 months</td></tr>' +
      '</tbody></table>' +
      '<p>The <b>Status</b> column on the Guide tab shows whether each band is the <b>Recommended</b> default or a <b>Custom</b> setting, and a <b>Custom Settings Applied</b> badge appears when any band has been changed.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins can change the bands in <b>Settings</b> › <b>Risk</b>. See <a href="article.html?id=cust-frequency-bands">Validation frequency bands and escalation</a>.</span></div>' +
      '<p>For the factors that add to a course’s risk, see <a href="article.html?id=prog-course-risk#factors">Course-specific risk factors</a> in Program Management.</p>',

    'risk-escalation-manager':
      '<p class="lead">The Escalation Manager is the one person who keeps watch over your RTO’s organisational risks. Whatever happens on your risk register, they hear about it, so serious risks reach someone with the authority to act.</p>' +
      '<h2 id="who">Who to choose</h2>' +
      '<p>Choose a senior manager or board member: someone who can make decisions about resources, priorities and policy when a serious risk comes up. Your RTO has one Escalation Manager at a time.</p>' +
      '<p>You nominate them by name and email in <a href="article.html?id=risk-rto-profile">Update RTO Profile</a>, and their details show on the Risk Register Overview.</p>' +
      '<h2 id="receive">What they receive</h2>' +
      '<ul>' +
        '<li><b>An email when a risk assessment is completed</b>, summarising the risks that were added.</li>' +
        '<li><b>Risk reports on request</b>, when someone selects Email Escalation Manager on the Overview.</li>' +
        '<li><b>Instant alerts</b> as soon as a new risk is added, if turned on in Schedule Email.</li>' +
        '<li><b>A monthly digest</b> of the risks added since the last one, if turned on in Schedule Email.</li>' +
      '</ul>' +
      '<p>On the Risk Factors panel, the <b>Escalation Required</b> banner names the Escalation Manager that High and Extreme risks are sent to.</p>' +
      '<h2 id="vs-responsible">Escalation Manager or responsible person?</h2>' +
      '<p>The two are easy to mix up:</p>' +
      '<table><thead><tr><th></th><th>Escalation Manager</th><th>Responsible person</th></tr></thead><tbody>' +
        '<tr><td><b>How many</b></td><td>One for your whole RTO</td><td>One for each treatment plan</td></tr>' +
        '<tr><td><b>Set in</b></td><td>Update RTO Profile</td><td>The treatment plan, in the comprehensive assessment</td></tr>' +
        '<tr><td><b>Their job</b></td><td>Oversee all organisational risks and act on serious ones</td><td>Carry out the proposed treatment for one risk</td></tr>' +
        '<tr><td><b>What they get</b></td><td>Emails and risk reports</td><td>An improvement item in the Continuous Improvement Register</td></tr>' +
      '</tbody></table>' +
      '<h2 id="team">The System Default team</h2>' +
      '<p>Your Escalation Manager is also the default manager for the <b>System Default</b> team in <a href="feature.html?m=users">Users, Roles &amp; Teams</a>.</p>' +
      '<h2 id="change">Changing your Escalation Manager</h2>' +
      '<p>Update their name and email in Update RTO Profile and save. From then on, all risk emails go to the new person. Each version in Version History records who the Escalation Manager was when it was saved, so you can show who had oversight at any point.</p>' +
      '<div class="callout tip"><b>Tip</b><span>When your Escalation Manager changes, send the new one a risk report straight away with Email Escalation Manager, so they start with the full picture.</span></div>',

    'risk-escalation':
      '<p class="lead">Your Escalation Manager keeps watch over your organisational risks. You can send them your risk report at any time, and choose when they’re emailed about new risks.</p>' +
      '<h2 id="email">Email your Escalation Manager now</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Email Escalation Manager</b>.' +
          '<figure class="shot shot-small" data-marks="4.5,51.3,91,12.3,oval,#"><img src="assets/img/risk-actions.png" alt="The Actions panel, listing Update RTO Profile, Edit Comprehensive Assessment, Email Escalation Manager, Schedule Email and Export Excel. Email Escalation Manager is circled." loading="lazy"><figcaption>Select Email Escalation Manager under Actions.</figcaption></figure></li>' +
        '<li>Check the confirmation. It names your Escalation Manager and the email address the risk report will go to.</li>' +
        '<li>Select <b>Send</b>.' +
          '<figure class="shot shot-medium" data-marks="81.7,72.5,15.2,19.6,oval,#"><img src="assets/img/risk-email-confirm.png" alt="The Confirm Email window: You are about to email Admin Demo a copy of the RTO Radar Demo’s Risk Report. Make sure the email address provided is correct: admindemo@rtoradar.com.au. Below are Cancel and Send buttons, with Send circled." loading="lazy"><figcaption>Check the name and email address, then select Send.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Wrong email address? Select Cancel, correct it in Update RTO Profile, then send again.</span></div>' +
      '<h2 id="schedule">Schedule risk report emails</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Schedule Email</b>.' +
          '<figure class="shot shot-small" data-marks="4.5,66.4,91,12.3,oval,#"><img src="assets/img/risk-actions.png" alt="The Actions panel, listing Update RTO Profile, Edit Comprehensive Assessment, Email Escalation Manager, Schedule Email and Export Excel. Schedule Email is circled." loading="lazy"><figcaption>Select Schedule Email under Actions.</figcaption></figure></li>' +
        '<li>Choose how your Escalation Manager is notified:' +
          '<ul>' +
            '<li><b>Instant alerts</b> email them as soon as a new risk is added to the register. This is off by default. When it’s on, the date of the last alert sent shows underneath.</li>' +
            '<li><b>Monthly digest</b> sends a routine monthly email listing the risks added since the last digest. Choose the <b>Day of month</b> and the <b>Time</b> to send it.</li>' +
          '</ul>' +
          '<figure class="shot shot-small" data-marks="80.4,31,11.2,6.1,oval,#; 80.4,51.2,11.2,6.1,oval,#"><img src="assets/img/risk-schedule-email.png" alt="The Schedule Risk Report Email window: Choose how the escalation manager is notified about new risks. Instant alerts, Email as soon as a new risk is added to the register, off by default, is switched on, with Last instant alert sent: 8 Oct 2026. Monthly digest, Routine monthly email listing risks added since the last digest, is switched on, set to the 1st of every month at 8:00 am Melbourne time. Both switches are circled. Below, Sends to Admin Demo (admindemo@rtoradar.com.au), and Cancel and Save preferences buttons." loading="lazy"><figcaption>Turn on Instant alerts, the Monthly digest or both (circled), and choose when the digest is sent.</figcaption></figure></li>' +
        '<li>Check who the emails go to at the bottom of the window, then select <b>Save preferences</b>.</li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>You can turn on both, either or neither. Times are in your organisation’s time zone, shown next to Time.</span></div>',

    'risk-export':
      '<p class="lead">Export your risk register to an Excel workbook to share it with your board, attach it to governance reports or show it to an auditor.</p>' +
      '<h2 id="steps">Export the register</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Export Excel</b>.' +
          '<figure class="shot shot-small" data-marks="4.5,81.5,91,12.3,oval,#"><img src="assets/img/risk-actions.png" alt="The Actions panel, listing Update RTO Profile, Edit Comprehensive Assessment, Email Escalation Manager, Schedule Email and Export Excel. Export Excel is circled." loading="lazy"><figcaption>Select Export Excel under Actions.</figcaption></figure></li>' +
        '<li>Open the downloaded file. It’s named with your RTO code and the date, for example <code>RTO_Risk_Register_0001_2026-10-12.xlsx</code>.' +
          '<figure class="shot" data-marks="72.2,70.3,26.3,23.7,oval,#"><img src="assets/img/risk-export-download.png" alt="A browser showing RTO Radar’s risk register, with the Recent download history panel open at the top right. The downloaded file, RTO_Risk_Register_0001_2026-10-12.xlsx, 66.1 KB, Done, is circled." loading="lazy"><figcaption>Open the downloaded file from your browser’s downloads.</figcaption></figure></li>' +
        '<li>Excel opens downloaded files in <b>Protected View</b>. To sort, filter or edit, select <b>Enable Editing</b>.</li>' +
      '</ol>' +
      '<h2 id="sheets">What’s in the workbook</h2>' +
      '<p>The workbook has four sheets. Select a tab below to see each one.</p>' +
      '<div class="xl-book" data-hint="1">' +
        '<div class="xl-bar" role="tablist" aria-label="Workbook sheets">' +
          '<button type="button" role="tab" aria-selected="true">Risk Overview</button>' +
          '<button type="button" role="tab" aria-selected="false">Assessment Summary</button>' +
          '<button type="button" role="tab" aria-selected="false">Risk Register</button>' +
          '<button type="button" role="tab" aria-selected="false">Archived Categories</button>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel">' +
          '<p>Your RTO name and code, the export date, the risk heatmap with a count of risks in each square and a legend, and your highest-scoring risks with their category, description, likelihood, consequence, score and level.</p>' +
          '<figure class="shot"><img src="assets/img/risk-export-overview.png" alt="The Risk Overview sheet of the Excel export. The Risk Heatmap shows the number of risks for each consequence and likelihood, with a legend: Low 1 to 4, Medium 5 to 9, High 10 to 16 and Extreme 17 to 25. Below, Top Risks by Score lists each risk’s ID, category, description, likelihood, consequence, score and level, from GR-2, Extreme with a score of 25, down through High risks." loading="lazy"><figcaption>The Risk Overview sheet.</figcaption></figure>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel" hidden>' +
          '<p>A one-page summary of your RTO and its risk assessment.</p>' +
          '<figure class="shot shot-medium"><img src="assets/img/risk-export-summary.png" alt="The Assessment Summary sheet of the Excel export, headed Risk assessment summary. Provider Information lists the RTO name RTO Radar Demo, RTO code 0001 and annual enrolments 200. Escalation Manager lists Admin Demo and admindemo@rtoradar.com.au. Provider Profile answers Yes or No for CRICOS registered, Skills First funding, apprentices and trainees, students under 18, remote and regional students, compliance history issues and high staff turnover. Risk Assessment Summary shows a provider risk score of 6 of 10, 29 total risks identified, 2 extreme, 10 high, 7 medium and 5 low. Basic Risk Profile begins a list of provider risk factors." loading="lazy"><figcaption>The Assessment Summary sheet.</figcaption></figure>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel" hidden>' +
          '<p>Every risk, one per row, with its existing controls, proposed treatment and treatment progress. Each column has a filter, so you can sort and narrow the list.</p>' +
          '<figure class="shot"><img src="assets/img/risk-export-register.png" alt="The Risk Register sheet of the Excel export, with filter buttons on every column heading: Risk ID, Category, Risk Level, Likelihood, Consequence, Risk Score, Description, Existing Controls and Proposed Treatment. The rows are sorted by Consequence from high to low, starting with GR-2, an Extreme Governance Risk with consequence 5, followed by risks with consequence 4 and then 3." loading="lazy"><figcaption>An example of the Risk Register sorted by Consequence, from high to low.</figcaption></figure>' +
        '</div>' +
        '<div class="xl-sheet" role="tabpanel" hidden>' +
          '<p>Every risk category your RTO has archived, with who archived it, their role and email, when, why they archived it and the actions taken that led to it, so the decision stays on record.</p>' +
          '<figure class="shot"><img src="assets/img/risk-export-archived.png" alt="The Archived Categories sheet of the Excel export, with the columns Category, Category Type, RTO Name, RTO Code, Archived By, Role, Email, Date Archived, Why do you want to archive this risk category, and Please detail the actions taken that resulted in archiving this category. One row shows Political Risk, a Default category, archived by Admin Demo, RTO Admin, on 01/09/2026 at 3:38 PM, because a recent risk review found it no longer relevant, with the actions taken to confirm that." loading="lazy"><figcaption>The Archived Categories sheet, with one archived category.</figcaption></figure>' +
        '</div>' +
      '</div>' +
      '<div class="callout tip"><b>Tip</b><span>Need the register as it was on an earlier date? Export that version from Version History. See <a href="article.html?id=risk-versions">Save, view and export risk register versions</a>.</span></div>',

    'risk-versions':
      '<p class="lead">Every time your risk register is saved, RTO Radar keeps a version of it. Version History lets you see how your risks have changed, look at the register as it was on any date, and export any version.</p>' +
      '<h2 id="created">When versions are created</h2>' +
      '<p>A new version is saved automatically when you:</p>' +
      '<ul>' +
        '<li>complete a comprehensive risk assessment</li>' +
        '<li>select <b>Save Risk Register</b> at the top right of Risk Assessment.</li>' +
      '</ul>' +
      '<p>Each version records why it was saved, for example “Completed comprehensive risk assessment” or “Manually saved risk register”.</p>' +
      '<h2 id="open">How to view risk register versions</h2>' +
      '<p>Go to <b>Risk Assessment</b> (1) and select the <b>Version History</b> tab (2).</p>' +
      '<figure class="shot" data-marks="0.5,62.1,14.5,6.4,oval,right,#1; 48.9,46.6,16.2,6.6,oval,above,#2"><img src="assets/img/risk-versions-tab.png" alt="Risk Assessment, circled as marker 1 in the navigation bar, with the Version History tab selected and circled as marker 2. Below, Risk Register Versions explains that versions are created automatically when a risk register is saved, with an Export all button, and Risk trend over time with a Show button." loading="lazy"><figcaption>Go to Risk Assessment (1), then select the Version History tab (2).</figcaption></figure>' +
      '<h2 id="trend">Risk trend over time</h2>' +
      '<p>At the top of the Version History tab, <b>Risk trend over time</b> charts the total number of risks in each version, split into Extreme, High, Medium and Low.</p>' +
      '<ul>' +
        '<li>Choose a period: <b>All time</b>, <b>Last 30 days</b>, <b>Last 6 months</b>, <b>Last 12 months</b> or a <b>Custom date range</b>.</li>' +
        '<li>Select <b>Show</b> to open the chart, and <b>Hide</b> to fold it away.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium"><img src="assets/img/risk-versions-trend.png" alt="Risk trend over time, open, with period buttons: All time, which is selected, Last 30 days, Last 6 months, Last 12 months and Custom date range. The chart shows the total number of risks across 65 versions, split into Extreme, High, Medium and Low." loading="lazy"><figcaption>The risk trend over time, for all time.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>A shrinking band of High and Extreme risks is good evidence for an auditor that your treatment plans are working.</span></div>' +
      '<h2 id="list">The version list</h2>' +
      '<p>Below the chart, every version is listed with the newest first. Use <b>Sort</b> to change the order, and filter by <b>Created Date</b> or <b>Review Date</b>. Each version shows:</p>' +
      '<ul>' +
        '<li>its version number and risk score, with <b>Active</b> on the current version</li>' +
        '<li>when it was created and who saved it</li>' +
        '<li>how often the register is reviewed and when the next review is due</li>' +
        '<li>how many risks it holds, across how many categories</li>' +
        '<li>the Escalation Manager at the time</li>' +
        '<li>how it was saved.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium" data-marks="22,0.4,36.8,3.6,underline,#1; 34.4,9.1,arrow-left,tiny,#2"><img src="assets/img/risk-versions-list.png" alt="The version list. Marker 1 underlines Sort: Created Date and the Created Date and Review Date filters. Version 65, marked Active, with an arrow as marker 2 pointing at it, shows its creation date, RTO, review frequency, next review, who saved it, 24 risks across 11 categories, the Escalation Manager and the note Manually saved risk register, with Export Version and Current Version buttons. Versions 64 and 63 below each have Export Version and Load Version buttons." loading="lazy"><figcaption>Sort and filter the list (1). The current version is marked Active (2).</figcaption></figure>' +
      '<h2 id="view">View an earlier version</h2>' +
      '<ol class="steps-list">' +
        '<li>In the version list, select <b>Load Version</b> on the version you want to see.' +
          '<figure class="shot shot-medium" data-marks="66.6,58.1,10.2,3.5,oval,#"><img src="assets/img/risk-versions-list.png" alt="The version list, with the Load Version button on Version 64 circled." loading="lazy"><figcaption>Select Load Version.</figcaption></figure></li>' +
        '<li>The Overview shows the register as it was then. A banner reads <b>Viewing Historical Version</b> with the date it was created, and the version number appears next to the page title.</li>' +
        '<li>Look through its risk score, validation frequency, Escalation Manager and risk factors. You can still email it, schedule emails and export it to Excel.</li>' +
        '<li>Select <b>Return to Current Version</b> when you’re done.' +
          '<figure class="shot" data-marks="59,17.3,11.4,3.8,oval,#"><img src="assets/img/risk-versions-loaded.png" alt="Version 24 loaded, with a Version 24 label beside the Risk Register Overview title and a banner reading Viewing Historical Version 24, created on 8 Apr 2026, a read-only snapshot of your risk register. Its Return to Current Version button is circled. The Overview shows that version’s risk score of 6.8 out of 10, validation frequency of 6 months and 25 risks identified. Under Actions, Update RTO Profile and Edit Comprehensive Assessment are greyed out with a note to return to the current version to edit, while Email Escalation Manager and Schedule Email are available. A message confirms the version was loaded." loading="lazy"><figcaption>Select Return to Current Version (circled) when you’re done.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>An earlier version is a read-only snapshot. Update RTO Profile and Edit Comprehensive Assessment are unavailable until you return to the current version.</span></div>' +
      '<h2 id="export">Export versions</h2>' +
      '<ul>' +
        '<li><b>Export Version</b> (1) on a version downloads that version’s register.</li>' +
        '<li><b>Export all</b> (2) at the top of the list downloads every version.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium" data-marks="59.6,92.4,17.8,3.9,oval,above,#1; 82.3,2.9,15,4.4,oval,#2"><img src="assets/img/risk-versions-export.png" alt="Risk Register Versions with the risk trend chart open and Version 38 below it. Marker 1 circles the Export Version button on Version 38, and marker 2 circles the Export all button at the top." loading="lazy"><figcaption>Export Version (1) downloads one version. Export all (2) downloads every version.</figcaption></figure>' +
      '<p>See <a href="article.html?id=risk-export">Export the risk register to Excel</a> for what’s in an export.</p>',
    'cir-sources':
      '<p>Improvement items can come from anywhere in RTO Radar. Each item keeps its source, so you can filter the register by where items came from and spot trends.</p>' +
      '<h2 id="sources">Sources</h2>' +
      '<ul><li><b>Feedback forms</b>: complaints, suggestions and conflict of interest submissions.</li><li><b>Risk register treatments</b>: treatment plans from the risk assessment.</li><li><b>Industry consultation</b>.</li><li><b>Audit findings</b>.</li><li><b>Unit validation outcomes</b>: findings from the four-phase validation.</li><li><b>Ad hoc entries</b>: anything added directly to the register.</li></ul>' +
      '<div class="callout note"><b>Note</b><span>Admins can add source categories in Customisation › CIR › Sources. System sources can’t be deleted.</span></div>',
    'mfa-levels':
      '<p>MFA enforcement is set once for the whole organisation.</p>' +
      '<ul><li><b>Optional</b>: users can turn on MFA themselves.</li><li><b>Recommended</b>: users are prompted to set it up.</li><li><b>Required</b>: users must set it up before they can continue.</li></ul>' +
      '<p>You can see who has MFA turned on in Settings › Security › User MFA Status.</p>',
    'connect-axcelerate':
      '<p>Connecting aXcelerate imports your courses, units and staff, so you set up your account with less manual entry.</p>' +
      '<h2 id="steps">Connect</h2>' +
      '<ol class="steps-list">' +
        '<li>In aXcelerate, go to <b>Settings</b> › <b>System Settings</b> › <b>Web and Other Integrations</b>. Copy your <b>API Token</b> and <b>Web Service Token</b>.</li>' +
        '<li>Note your <b>API endpoint</b>. It’s the web address you use to sign in to aXcelerate, for example <code>https://yourrto.app.axcelerate.com</code>.</li>' +
        '<li>In RTO Radar, open <b>Settings</b> › <b>Integrations</b>.' +
          '<figure class="shot" data-marks="0.2,45.4,6.6,4.8,oval,right,#1; 33.4,14.4,8.8,4.8,oval,#2; 25.7,91.3,arrow-down,tiny"><img src="assets/img/gs-ax-settings.png" alt="Organisation Settings, showing the aXcelerate Integration settings with fields for API Endpoint, API Token and WS Token, and Save Settings and Test Connection buttons. Marker 1 circles Settings in the navigation bar, marker 2 circles the Integrations tab, and an arrow points down at Save Settings." loading="lazy"><figcaption>Select Settings (1), then the Integrations tab (2). Once your details are in, select Save Settings.</figcaption></figure></li>' +
        '<li>Enter your API endpoint, paste both tokens, and connect.</li>' +
      '</ol>' +
      '<div class="callout warn"><b>Permission</b><span>Only Admins can connect integrations. Treat both tokens like passwords.</span></div>',
  };
  MODULES.forEach(function (m) { if (BODIES['faq-' + m.id]) m.faqHtml = BODIES['faq-' + m.id]; });

  var ARTICLES = {}, ORDER = [];
  LIST.forEach(function (r) {
    ARTICLES[r[1]] = { id: r[1], module: r[0], type: r[2], t: r[3], roles: r[4], mins: r[5], body: BODIES[r[1]] || null, fixes: FIXES[r[1]] || null, related: RELATED[r[1]] || null };
    ORDER.push(r[1]);
  });

  // How data moves between modules: [from, to, what]
  var LINKS = [
    ['risk', 'dashboard', 'Risk overview, level breakdown, treatment status and matrix widgets'],
    ['risk', 'cir', 'Treatment plans create improvement items'],
    ['risk', 'programs', 'Your organisational risk score sets the baseline validation frequency for every course'],
    ['qms', 'dashboard', 'QMS overview and policy compliance health'],
    ['qms', 'programs', 'AI-assisted validation reads your documents as evidence'],
    ['programs', 'cir', 'Validation findings become improvement items'],
    ['programs', 'events', 'Unit validations are booked in the Scheduler'],
    ['programs', 'workforce', 'Course units are assigned to trainers'],
    ['feedback', 'cir', 'Submissions become improvement items'],
    ['cir', 'dashboard', 'Your improvement items widget'],
    ['cir', 'workforce', 'Team analytics count CI items per member'],
    ['workforce', 'dashboard', 'Pending admin actions and delivery readiness'],
    ['users', 'workforce', 'Roles and teams shape profiles, checklists and the org chart'],
    ['pd', 'workforce', 'Assigned PD appears on staff PD calendars'],
    ['pd', 'events', 'PD sessions appear in the calendar'],
    ['events', 'dashboard', 'Upcoming events widget'],
    ['integrations', 'programs', 'Imports courses and units'],
    ['integrations', 'users', 'Imports staff'],
    ['security', 'users', 'MFA enforcement applies to every user'],
    ['custom', 'risk', 'Risk scoring weights, bands and categories'],
    ['custom', 'qms', 'Compliance health weighting and document types'],
    ['custom', 'dashboard', 'Which widgets everyone sees'],
    ['custom', 'cir', 'Sources, item templates and reminders'],
    ['custom', 'programs', 'TAS templates and course risk weights']
  ];

  // steps: [articleId, what to do]
  var WORKFLOWS = [];

  // Workflow group cards on the Workflows page
  var WF_GROUPS = {};

  var ROLE_HUBS = {};

  var FAQS = [
    ['How is my Policy Compliance Health score calculated?', 'qms-health'],
    ['What does “delivery ready” mean for a trainer?', 'wf-dashboard'],
    ['Which roles can see the risk register?', 'users-roles'],
    ['What imports from aXcelerate?', 'ax-what-imports']
  ];

  window.RH = { ONLY: ['features', 'configuration'], ROLES: ROLES, MODULES: MODULES, ARTICLES: ARTICLES, ORDER: ORDER, LINKS: LINKS, WORKFLOWS: WORKFLOWS, WF_GROUPS: WF_GROUPS, ROLE_HUBS: ROLE_HUBS, FAQS: FAQS };
})();

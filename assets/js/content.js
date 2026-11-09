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
    { id: 'getting-started', cat: 'getting-started', name: 'Getting Started', series: true,
      blurb: 'A 9-step series that takes you from a new account to filling up your dashboard. Work through it in order.',
      // FAQs shown at the end of the page: [question, answer HTML]
      faqs: [
        ['What’s the difference between the person responsible for proposed treatment of risks and the Escalation Manager?',
          '<p>The <b>Escalation Manager</b> is nominated once for your whole RTO, in Update RTO Profile. They keep watch over all of your organisational risks and are notified whenever a risk is added to or removed from your register, at any risk level.</p>' +
          '<p>The <b>person responsible for the proposed treatment</b> is nominated on each treatment plan. They get an improvement item in the Continuous Improvement Register with the proposed treatment to carry out.</p>'],
        ['What happens when I complete a risk assessment?',
          '<p>Completing a risk assessment saves a snapshot of your RTO’s risks at that point in time, and sends your Escalation Manager one email summarising the risks you’ve added.</p>' +
          '<p>Because each completion sends a new email, complete your assessment once you’ve added all the risks you want to record, rather than after each one. You can always add more later from Risk Assessment › Actions › Edit Comprehensive Assessment.</p>'],
        ['How are organisational, course and unit risk scores calculated?',
          '<p>Risk is worked out in three tiers, and each builds on the one above it:</p>' +
          '<ul class="formulas">' +
            '<li><b>Organisational risk</b><code>Basic profile + Comprehensive risk assessment</code><span>Worked out from your basic and comprehensive risk profiles in Risk Assessment. This is the Risk Score on the Risk Register Overview.</span></li>' +
            '<li><b>Course risk</b><code>Organisational risk score + Course risk assessment</code><span>Comes from the course’s risk assessment: its required course-specific risk factors and any additional ones. Combined with your organisational risk, it gives the course a total risk score out of 10, which sets how often the course is validated.</span></li>' +
            '<li><b>Unit risk</b><code>Unit-specific risks + Course risk score, from 1 to 10</code><span>Every unit follows its course’s validation frequency, unless its own risks shorten it further: physical risk, sensitive content and completion rate.</span></li>' +
          '</ul>' +
          '<p>So a change to your organisational risk flows down to every course and unit, and a riskier course or unit is validated more often. Admins can customise these risks in <b>Settings</b> › <b>Customisation</b> › <b>Risk</b>.</p>'],
        ['What’s the difference between Complete and Verify on an improvement item?',
          '<p>Both close out an improvement item, and both ask you to record what was done: the actions taken, how they resolve the item, a follow-up or review date, and any updated risk level as a result.</p>' +
          '<ul>' +
            '<li><b>Complete</b> marks the item as complete straight away.</li>' +
            '<li><b>Verify</b> sends it to another person in your RTO to check first. They confirm the right steps were taken and the updated risk level is correct. The item is only marked complete across your organisation once they’ve verified it. If they think it needs more scrutiny, the verifier can escalate it to someone more senior to verify as well.</li>' +
          '</ul>' +
          '<p>Use Verify when an item needs a second set of eyes, such as one tied to a high or extreme risk.</p>'],
        ['What’s the difference between a silent user and a regular user?',
          '<p>A <b>regular user</b> is emailed an invitation, signs in to RTO Radar and works in it themselves, for example uploading their own documents and mapping their evidence.</p>' +
          '<p>A <b>silent user</b> has a profile but no sign-in access, and isn’t emailed an invitation. You manage their records for them. Silent users are useful when you want to:</p>' +
          '<ul>' +
            '<li><b>Set up an account before inviting someone</b>: add their documents, courses and units first, so everything’s ready when they first sign in.</li>' +
            '<li><b>Keep compliance records</b> for staff who don’t need to sign in themselves, such as their credentials and document expiry dates.</li>' +
            '<li><b>Test</b> roles, checklists and settings without emailing real people.</li>' +
          '</ul>'],
        ['Why is a document’s description important, and how should I write it?',
          '<p>When you create a trainer’s evidence map, RTO Radar’s AI uses each document’s description to write evidence statements for their vocational competency and industry currency. To protect personally identifiable information, the AI reads <b>only the description</b>, never the file itself. A vague description gives the AI little to work with, while a detailed one produces stronger, more accurate evidence.</p>' +
          '<p>A good description covers:</p>' +
          '<ul>' +
            '<li>what the document is, and when it was completed or issued</li>' +
            '<li>the skills or knowledge it demonstrates</li>' +
            '<li>for a qualification, the units it covers, with their codes and titles</li>' +
            '<li>how it connects to the units the trainer delivers, and any systems or processes they manage</li>' +
            '<li>how it reflects current industry practice.</li>' +
          '</ul>' +
          '<p>For example: “Certificate II in Community Services, completed on 18 November 2025. Units completed include CHCCOM005 Communicate and work in health or community services, CHCDIV001 Work with diverse people, HLTWHS001 Participate in workplace health and safety, CHCCCS015 Provide individualised support and CHCVOL002 Lead volunteer teams. Developed communication skills, awareness of diversity, safe work practices and introductory client support skills.”</p>'],
        ['Can I convert a silent user to a regular user?',
          '<p>Yes. When you’re ready for them to sign in, send them an invitation from <b>Settings</b> › <b>User Management</b> › <b>Staff</b>. Their profile, documents and assignments stay as they are, so everything you set up is waiting for them when they first sign in.</p>']
      ],
      updated: '2026-10-05', // shown when the site is opened from disk; on a web server the files' own dates are used

      related: ['qms-frameworks', 'connect-axcelerate', 'users-roles', 'mfa-set-organisation', 'prog-course-risk', 'qms-health'] },
    { id: 'dashboard', cat: 'features', name: 'Dashboard & Profile',
      blurb: 'The landing page after login, with a widget for each module, and your own profile: your details, two-factor authentication and email notifications.', cfg: ['cust-dashboard-widgets'],
      updated: '2026-11-05' },
    { id: 'qms', cat: 'features', name: 'Document Management (QMS)',
      blurb: 'Your quality management system: the Document Repository, uploading and mapping documents to standards, versions, compliance frameworks, the Compliance Dashboard and audit exports.', cfg: ['cust-compliance-health', 'cust-document-types'],
      updated: '2026-10-15' },
    { id: 'programs', cat: 'features', name: 'Program Management', ai: true,
      blurb: 'Courses, units, AI-assisted validation and the TAS Builder.', cfg: ['cust-course-risk-weights', 'cust-frequency-bands', 'cust-tas-templates'],
      updated: '2026-10-21' },
    { id: 'cir', cat: 'features', name: 'Continuous Improvement Register',
      blurb: 'One register of every improvement action in your RTO. Risk treatments, validation findings, consultations, feedback and more feed into it automatically.', cfg: ['cust-cir-settings'],
      updated: '2026-11-06' },
    { id: 'workforce', cat: 'features', name: 'Workforce Management', ai: true,
      blurb: 'Staff profiles, documents, course and unit assignments, evidence maps, PD, the Workforce Dashboard, Teams, Document Checklists, search and workforce reports.',
      updated: '2026-10-13' },
    { id: 'users', cat: 'features', name: 'Users, Roles & Teams',
      blurb: 'Invitations, user roles and team configuration. Used together with Workforce Management.', cfg: ['mfa-set-organisation'],
      updated: '2026-11-02' },
    { id: 'risk', cat: 'features', name: 'Risk Assessment',
      blurb: 'Your RTO profile, organisational risk score and validation frequency, the risk register with Likelihood × Consequence scoring, treatment plans, Escalation Manager reports, Excel exports and version history.', cfg: ['cust-risk-categories', 'cust-course-risk-weights', 'cust-frequency-bands'],
      updated: '2026-11-09' },
    { id: 'feedback', cat: 'features', name: 'Complaints & Suggestions',
      blurb: 'Feedback, suggestion and complaint forms you build, share or embed on your website, and the submissions they collect. Submissions can become improvement items.',
      updated: '2026-11-05' },
    { id: 'events', cat: 'features', name: 'Events',
      blurb: 'Your calendar of compliance dates, the schedulers for industry consultations and unit validations, and professional development.',
      updated: '2026-11-02' },
    { id: 'pd', cat: 'features', name: 'Professional Development',
      blurb: 'PD providers and sessions, assigning PD to staff, enrolling and requesting approval for paid PD, completing PD with evidence, and approving that evidence for evidence maps.', cfg: ['pd-configure'],
      updated: '2026-11-04' },
    { id: 'custom', cat: 'configuration', name: 'Customisation',
      blurb: 'Organisation settings: connect aXcelerate, set MFA, and change how other modules score, display and remind.',
      updated: '2026-11-08' },
  ];

  var RISK = ['admin', 'auditor', 'coord']; // Trainer/Assessors have no access to the risk register or organisational documents (QMS)
  var ALL = ['admin', 'auditor', 'trainer', 'coord'], MGR = ['admin', 'coord'], ADM = ['admin'];

  // [module, id, type, title, roles, minutes]
  var LIST = [
    ['getting-started', 'gs-welcome', 'Overview', 'How to Use This Guide', ADM, 5],
    ['getting-started', 'gs-organisation', 'How-to', 'Set Up Your Organisation', ADM, 10],
    ['getting-started', 'gs-risks', 'How-to', 'Set Up Your Organisational Risks', ADM, 10],
    ['getting-started', 'gs-cir', 'How-to', 'Visit the Continuous Improvement Register', ADM, 5],
    ['getting-started', 'gs-documents', 'How-to', 'Start Adding Your Documents and View Compliance Dashboard', ADM, 10],
    ['getting-started', 'gs-connect-axcelerate', 'How-to', 'Import via aXcelerate (optional)', ADM, 10],
    ['getting-started', 'gs-programs', 'How-to', 'Add Your Programs', ADM, 10],
    ['getting-started', 'gs-workforce', 'How-to', 'Add a Trainer', ADM, 5],
    ['getting-started', 'gs-training', 'How-to', 'Assign Training', ADM, 10],
    ['getting-started', 'gs-dashboard', 'How-to', 'View Your Dashboard', ADM, 5],

    ['dashboard', 'dash-tour', 'Overview', 'The dashboard', ALL, 5],
    ['dashboard', 'profile-open', 'How-to', 'Your profile', ALL, 4],
    ['dashboard', 'profile-notifications', 'Reference', 'Choose your email notifications', ALL, 4],

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
    ['programs', 'prog-archive', 'How-to', 'Archive and restore courses and unit validations', MGR, 3],

    ['cir', 'cir-overview', 'Overview', 'The Continuous Improvement Register', ALL, 4],
    ['cir', 'cir-sources', 'Concept', 'Where improvement items come from', ALL, 4],
    ['cir', 'cir-add-item', 'How-to', 'Add an improvement item', ALL, 4],
    ['cir', 'cir-assign-track', 'How-to', 'View, edit and track an item', ALL, 5],
    ['cir', 'cir-complete', 'How-to', 'Complete or verify an item', ALL, 4],
    ['cir', 'cir-export', 'How-to', 'Export the register', ['admin', 'auditor', 'coord'], 2],

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

    ['users', 'users-overview', 'Overview', 'The User Management page', ADM, 3],
    ['users', 'users-invite', 'How-to', 'Add a user', ADM, 4],
    ['users', 'users-manage', 'How-to', 'Find and manage staff', ADM, 4],
    ['users', 'users-roles', 'Concept', 'Organisation roles and role templates', ADM, 4],
    ['users', 'users-permissions', 'Concept', 'What each permission covers', ADM, 5],
    ['users', 'users-custom-role', 'How-to', 'Create a custom role', ADM, 6],
    ['users', 'users-portal-custom', 'Concept', 'What each role sees', ALL, 5],
    ['users', 'users-plan-roles', 'Concept', 'Plan roles and permissions for your RTO', ADM, 7],
    ['users', 'users-governance', 'Concept', 'Understanding the compliance governance chart', ALL, 8],
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
    ['risk', 'risk-versions', 'How-to', 'Risk register revisions and versions', RISK, 7],

    ['feedback', 'fb-overview', 'Overview', 'The Complaints & Suggestions page', ALL, 4],
    ['feedback', 'fb-create-form', 'How-to', 'Create and build a form', MGR, 9],
    ['feedback', 'fb-manage-forms', 'How-to', 'Manage your forms', MGR, 4],
    ['feedback', 'fb-embed', 'How-to', 'Share or embed a form on your website', MGR, 4],
    ['feedback', 'fb-submissions', 'How-to', 'Review and respond to submissions', MGR, 6],
    ['feedback', 'fb-to-cir', 'How-to', 'Turn a submission into an improvement item', MGR, 3],
    ['feedback', 'fb-plan', 'Concept', 'Plan your forms: teams, access and uses', ADM, 5],

    ['events', 'ev-overview', 'Overview', 'The Events page', ALL, 3],
    ['events', 'ev-calendar', 'How-to', 'Use the calendar', ALL, 4],
    ['events', 'ev-add-event', 'How-to', 'Add an event', MGR, 3],
    ['events', 'ev-export', 'How-to', 'Export events', MGR, 2],
    ['events', 'ev-consultation', 'How-to', 'Schedule an industry consultation', MGR, 5],
    ['events', 'ev-record-consultation', 'How-to', 'Record industry consultation evidence', MGR, 4],
    ['events', 'ev-consultation-history', 'How-to', 'View and manage consultation evidence', MGR, 3],
    ['events', 'ev-validation', 'How-to', 'Schedule a unit validation', MGR, 4],

    ['pd', 'pd-overview', 'Overview', 'PD across RTO Radar', ALL, 3],
    ['pd', 'pd-configure', 'How-to', 'Set up Professional Development', ADM, 5],
    ['pd', 'pd-assign', 'How-to', 'Assign PD to a staff member', MGR, 4],
    ['pd', 'pd-enrol', 'How-to', 'Find and enrol in PD', ALL, 3],
    ['pd', 'pd-eoi', 'How-to', 'Request approval for paid PD', ALL, 4],
    ['pd', 'pd-complete', 'How-to', 'Complete PD and attach evidence', ALL, 10],
    ['pd', 'pd-export', 'How-to', 'Export PD records', MGR, 2],

    ['custom', 'cust-overview', 'Overview', 'Organisation settings', ADM, 2],
    ['custom', 'connect-axcelerate', 'How-to', 'aXcelerate integration', ADM, 10],

    ['custom', 'mfa-set-organisation', 'How-to', 'Set up MFA for your organisation', ADM, 3],

    ['custom', 'cust-course-risk-weights', 'How-to', 'Set course and unit risk scoring', ADM, 5],
    ['custom', 'cust-frequency-bands', 'How-to', 'Set validation frequency and escalation', ADM, 4],
    ['custom', 'cust-risk-categories', 'How-to', 'Configure risk categories and register versioning', ADM, 4],
    ['custom', 'cust-compliance-health', 'How-to', 'Set compliance health weighting', ADM, 3],
    ['custom', 'cust-document-types', 'How-to', 'Manage document types', ADM, 2],
    ['custom', 'cust-dashboard-widgets', 'How-to', 'Choose dashboard widgets and Teams visibility', ADM, 3],
    ['custom', 'cust-cir-settings', 'How-to', 'Set up the CIR: custom registers, imports, sources and reminders', ADM, 6],
    ['custom', 'cust-tas-templates', 'How-to', 'Customise TAS templates', ADM, 5],
    ['custom', 'cust-branding', 'How-to', 'Add your logo', ADM, 1],

  ];

  // Troubleshooting: which guides fix each symptom
  var FIXES = {};

  // Related guides shown at the end of a feature guide. Guides not listed fall back to their
  // module's settings guides and workflow neighbours.
  var RELATED = {
    'cust-overview': ['connect-axcelerate', 'mfa-set-organisation', 'cust-course-risk-weights'],
    'cust-course-risk-weights': ['cust-frequency-bands', 'prog-course-risk', 'risk-provider-factors'],
    'cust-frequency-bands': ['cust-course-risk-weights', 'prog-course-risk', 'prog-schedule-validation'],
    'cust-risk-categories': ['risk-versions', 'risk-add-score', 'cust-course-risk-weights'],
    'cust-compliance-health': ['qms-health', 'cust-document-types', 'qms-compliance-dashboard'],
    'cust-document-types': ['upload-and-map-a-document', 'cust-compliance-health', 'wf-documents'],
    'cust-dashboard-widgets': ['dash-tour', 'users-teams', 'cust-overview'],
    'cust-cir-settings': ['cir-add-item', 'cir-sources', 'profile-notifications'],
    'cust-branding': ['cust-tas-templates', 'cust-overview', 'dash-tour'],
    'prog-overview': ['prog-add-course', 'prog-add-units', 'prog-validate-unit', 'prog-master-tas'],
    'prog-add-course': ['prog-course-risk', 'prog-add-units', 'gs-programs'],
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
    'cir-overview': ['cir-sources', 'cir-add-item', 'cust-cir-settings'],
    'cir-sources': ['risk-treatment', 'fb-to-cir', 'prog-validation-phases'],
    'cir-add-item': ['cir-assign-track', 'cir-complete', 'cust-cir-settings'],
    'cir-assign-track': ['cir-complete', 'cir-sources', 'cir-add-item'],
    'cir-complete': ['cir-assign-track', 'cir-export', 'cir-sources'],
    'cir-export': ['cir-overview', 'cir-complete', 'qms-export'],
    'dash-tour': ['cust-dashboard-widgets', 'profile-open', 'risk-overview'],
    'profile-open': ['profile-notifications', 'dash-tour', 'mfa-set-organisation'],
    'profile-notifications': ['profile-open', 'risk-escalation-manager', 'dash-tour'],
    'wf-dashboard': ['wf-evidence-review', 'wf-documents', 'wf-checklist', 'dash-tour'],
    'wf-teams': ['users-teams', 'users-roles', 'wf-overview'],
    'ev-overview': ['ev-calendar', 'ev-consultation', 'ev-validation', 'pd-enrol'],
    'ev-calendar': ['ev-add-event', 'ev-export', 'cir-overview'],
    'ev-add-event': ['ev-calendar', 'ev-export'],
    'ev-export': ['ev-calendar', 'ev-add-event'],
    'ev-consultation': ['ev-record-consultation', 'ev-consultation-history', 'prog-course-risk'],
    'ev-record-consultation': ['ev-consultation-history', 'ev-consultation', 'prog-industry-consultation'],
    'ev-consultation-history': ['ev-record-consultation', 'ev-consultation', 'cir-overview'],
    'ev-validation': ['prog-schedule-validation', 'prog-validate-unit', 'prog-course-risk'],
    'pd-overview': ['pd-configure', 'pd-assign', 'pd-enrol', 'pd-complete'],
    'pd-configure': ['pd-assign', 'pd-enrol', 'pd-overview'],
    'pd-assign': ['pd-configure', 'pd-complete', 'wf-pd', 'pd-export'],
    'pd-enrol': ['pd-eoi', 'pd-complete', 'pd-overview'],
    'pd-eoi': ['pd-enrol', 'pd-complete', 'pd-overview'],
    'pd-complete': ['wf-documents', 'wf-description', 'wf-evidence-map', 'pd-export'],
    'pd-export': ['wf-export', 'pd-assign', 'wf-pd'],
    'fb-overview': ['fb-create-form', 'fb-submissions', 'fb-plan'],
    'fb-create-form': ['fb-manage-forms', 'fb-embed', 'fb-plan'],
    'fb-manage-forms': ['fb-create-form', 'fb-embed', 'fb-submissions'],
    'fb-embed': ['fb-manage-forms', 'fb-submissions', 'fb-create-form'],
    'fb-submissions': ['fb-to-cir', 'fb-overview', 'cir-overview'],
    'fb-to-cir': ['fb-submissions', 'cir-overview', 'cir-assign-track'],
    'fb-plan': ['users-governance', 'users-custom-role', 'fb-create-form'],
    'users-overview': ['users-invite', 'users-roles', 'users-teams', 'users-plan-roles'],
    'users-invite': ['users-manage', 'users-roles', 'users-teams'],
    'users-manage': ['users-invite', 'users-roles', 'users-teams'],
    'users-roles': ['users-custom-role', 'users-plan-roles', 'users-manage'],
    'users-permissions': ['users-custom-role', 'users-roles', 'users-plan-roles'],
    'users-custom-role': ['users-permissions', 'users-portal-custom', 'users-roles'],
    'users-portal-custom': ['users-custom-role', 'users-permissions', 'wf-evidence-map'],
    'users-plan-roles': ['users-roles', 'users-custom-role', 'users-governance', 'users-teams'],
    'users-governance': ['users-teams', 'users-plan-roles', 'wf-teams'],
    'users-teams': ['users-governance', 'wf-teams', 'users-manage'],
    'wf-checklist': ['wf-documents', 'wf-overview', 'cir-overview', 'cust-document-types'],
    'wf-export': ['wf-pd', 'wf-checklist', 'wf-documents'],
    'risk-overview': ['risk-provider-factors', 'prog-course-risk', 'cir-overview', 'dash-tour'],
    'risk-rto-profile': ['risk-provider-factors', 'risk-escalation', 'cust-frequency-bands', 'users-roles'],
    'risk-add-score': ['risk-treatment', 'risk-heatmap', 'cust-risk-categories', 'cir-assign-track'],
    'risk-treatment': ['risk-add-score', 'cir-assign-track', 'cir-complete', 'risk-export'],
    'risk-heatmap': ['risk-add-score', 'risk-export', 'dash-tour'],
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
            '<div><h4><span class="sn">3</span>Document Title, Type and Category</h4><p>The title and type are required. The category groups related documents, such as Enrolment or Training &amp; Assessment.</p><div class="callout note"><b>Note</b><span>Need a document type that isn’t listed? Admins can add one in Settings › Customisation. See <a href="article.html?id=cust-document-types">Manage document types</a>.</span></div></div>' +
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
      '</ul>' +
      '<p>Archived documents are listed on a separate <b>Archived Documents</b> sheet, so they stay on record for audits. See <a href="article.html?id=qms-edit-download-delete#archive">Archive a document</a>.</p>',

    // ---- Complaints & Suggestions ----
    'fb-overview':
      '<p class="lead">Complaints &amp; Suggestions is where you build forms to collect feedback, suggestions and complaints, share them or embed them on your website, and manage the submissions they collect.</p>' +
      '<h2 id="open">Open Complaints &amp; Suggestions</h2>' +
      '<p>Select <b>Complaints &amp; Suggestions</b> on your navigation bar. The page has two tabs, <b>Submissions</b> (1) and <b>Forms</b> (2):</p>' +
      '<figure class="shot" data-marks="15.6,58,arrow-left,small; 37.2,36.4,6.6,3.6,oval,right,#1; 75.6,36.4,4,3.6,oval,right,#2"><img src="assets/img/fb-page.png" alt="Complaints and Suggestions on the navigation bar, with an arrow pointing at it, open on the Submissions tab, circled as 1, beside the Forms tab, circled as 2. Submissions shows 18 of 18 submissions, with Filters, Assigned To, Team and a search box, and Refresh, Generate Report and Export CSV. FS-0018 from the Business Form, in the Business Faculty, and FS-0017 from the CHC33021 - CHCCCS031 Student Evaluation, in System Default, are both Open and Unassigned." loading="lazy"><figcaption>Select Complaints &amp; Suggestions. It opens on Submissions (1), beside Forms (2).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Submissions</h4><p>Every response to your forms, with its number, type, category, form, team, status, who it’s assigned to and the date. Open a submission to read it, assign it, and add notes and action items. See <a href="article.html?id=fb-submissions">Review and respond to submissions</a>.</p></li>' +
        '<li><h4>Forms</h4><p>Your feedback forms, with each one’s type, team, status, whether it accepts anonymous submissions, how many submissions it has had and when it was created. Create, build, share and embed forms here. See <a href="article.html?id=fb-create-form">Create and build a form</a>.</p></li>' +
      '</ol>' +
      '<h2 id="flow">How forms and submissions work</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Create the form</h4><p>Give it a name and type, and choose how contact details are collected, who’s notified and which team owns it. See <a href="article.html?id=fb-create-form">Create and build a form</a>.</p></li>' +
        '<li><h4>Build its questions</h4><p>Add questions in the form builder, preview the form, then complete it. See <a href="article.html?id=fb-create-form#questions">Build the form</a>.</p></li>' +
        '<li><h4>Share or embed it</h4><p>Send people the form’s public link, or embed it on your website. See <a href="article.html?id=fb-embed">Share or embed a form on your website</a>.</p></li>' +
        '<li><h4>Respond to submissions</h4><p>Each response appears on the Submissions tab. Assign it, update its status, and add internal notes and action items. See <a href="article.html?id=fb-submissions">Review and respond to submissions</a>.</p></li>' +
        '<li><h4>Improve</h4><p>Action items on a submission become improvement items in the Continuous Improvement Register. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</p></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>A form and its submissions belong to the form’s team, so only that team’s managers and members with the right permissions can see them. See <a href="article.html?id=fb-plan">Plan your forms: teams, access and uses</a>.</span></div>',

    'fb-create-form':
      '<p class="lead">Create a form for each kind of feedback you collect, such as course feedback, suggestions or complaints. You set up its details first, then build its questions.</p>' +
      '<h2 id="steps">Create a form</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Complaints &amp; Suggestions</b>, open the <b>Forms</b> tab (1) and select <b>Create Form</b> (2).' +
          '<figure class="shot" data-marks="17.6,62.8,arrow-left,small; 75,38.4,5.2,5.6,oval,right,#1; 84,53.4,10.2,7.4,oval,above,#2"><img src="assets/img/fb-forms.png" alt="Complaints and Suggestions, with an arrow pointing at it on the navigation bar, open on the Forms tab, circled as 1. Feedback Forms, to create and manage forms that can be embedded on your website, has no forms yet. Create Form, at the top right, is circled as 2." loading="lazy"><figcaption>Select Complaints &amp; Suggestions, the Forms tab (1), then Create Form (2).</figcaption></figure></li>' +
        '<li>Enter the <b>Form Name</b>, and choose the <b>Form Type</b>, such as General Feedback or Suggestion. Optionally, add a <b>Description</b> shown to people filling it in.' +
          '<figure class="shot shot-small"><img src="assets/img/fb-create-details.png" alt="Create Feedback Form: set up a new feedback form, and add questions after creating it. The Form Name is CHC33021 Course Feedback and the Form Type is General Feedback. The description reads: Tell us about your experience in CHC33021 Certificate III in Individual Support. Your feedback helps us improve our training, assessment and student support. It takes about 3 minutes." loading="lazy"><figcaption>A course feedback form’s name, type and description.</figcaption></figure></li>' +
        '<li>Under <b>Contact Information</b>, choose how contact details are collected:' +
          '<ul>' +
            '<li><b>Anonymous Only</b>: no contact details are collected.</li>' +
            '<li><b>Optional</b>: people can choose to give their contact details.</li>' +
            '<li><b>Required</b>: people must give their contact details.</li>' +
          '</ul>' +
          '<figure class="shot shot-small"><img src="assets/img/fb-create-contact.png" alt="Contact Information, with Optional selected: users can choose to provide contact details. The other options are Anonymous Only, with no contact details collected, and Required, where contact details must be provided." loading="lazy"><figcaption>Optional lets people choose whether to give their contact details.</figcaption></figure></li>' +
        '<li>Optionally, turn on <b>Email notifications</b> and choose the <b>Responsible person</b>. They receive an email each time someone submits the form.' +
          '<figure class="shot shot-small"><img src="assets/img/fb-create-notify.png" alt="Email notifications turned on, with Design Manager chosen as the responsible person, who will receive an email each time a submission is made on this form." loading="lazy"><figcaption>The Design Manager is emailed about each submission.</figcaption></figure></li>' +
        '<li id="team">Choose the <b>Team</b> that owns the form. Its submissions go to that team. Leave it empty to keep the form in <b>System Default</b>, visible to everyone. Then select <b>Create &amp; Build Form</b>.' +
          '<figure class="shot shot-small" data-marks="79,65.6,arrow-down,tiny"><img src="assets/img/fb-create-team.png" alt="Team, which is optional, set to Community and Health Faculty. A note says that as a System Default member you can assign this form to any team, and submissions will go to the team you pick. An arrow points down at Create and Build Form." loading="lazy"><figcaption>The form is owned by the Community &amp; Health Faculty. Select Create &amp; Build Form.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Provided you have the right permissions, the teams you can choose depend on where you are:' +
            '<ul>' +
              '<li><b>In System Default:</b> create it in any team, so only that team’s members can see it, or in System Default, so everyone can see it.</li>' +
              '<li><b>In a team:</b> create it in your team, or in System Default. If you’re in more than one team, you can choose any of them.</li>' +
            '</ul>' +
            'See <a href="article.html?id=fb-plan">Plan your forms: teams, access and uses</a>.</span></div></li>' +
        '<li>The form builder opens, ready for you to add questions.</li>' +
      '</ol>' +
      '<h2 id="types">Question types</h2>' +
      '<p>The form builder offers these question types, under <b>Add Question</b>:</p>' +
      '<figure class="shot"><img src="assets/img/fb-question-types.png" alt="Add Question: choose a question type to add to your form. Text Inputs: Short Text, Long Text and Number. Contact Details: Email and Phone Number. Choice Questions: Single Choice, Multiple Choice, Dropdown and Category. Ratings and Scales: Star Rating, NPS Score and Likert Scale. Other: Date, File Upload, Table, and Heading and Instructions." loading="lazy"><figcaption>The question types, in five groups.</figcaption></figure>' +
      '<h2 id="questions">Build the form</h2>' +
      '<p>The form builder is where you add, edit and arrange a form’s questions. To come back to it later, select <b>⋮</b> › <b>Build Form</b> on the Forms tab.</p>' +
      '<ol class="steps-list">' +
        '<li>Under <b>Add Question</b>, select a question type. See <a href="#types">Question types</a> above. It’s added to <b>Form Questions</b>, and <b>Edit Question</b> opens. Start with a <b>Heading &amp; Instructions</b> block to introduce the form.</li>' +
        '<li>In <b>Edit Question</b>, enter the <b>Question Text</b>, and optionally <b>Help Text</b> shown below it. Then select <b>Save Changes</b>.' +
          '<figure class="shot shot-small" data-marks="83.8,84.6,arrow-down,small"><img src="assets/img/fb-q-heading.png" alt="Edit Question for a Heading and Instructions block. The Question Text is About your course, and the Help Text reads: Your answers are confidential and help us improve CHC33021. It takes about 3 minutes. An arrow points down at Save Changes." loading="lazy"><figcaption>For example, a Heading &amp; Instructions block that opens the form. Select Save Changes.</figcaption></figure></li>' +
        '<li>For a question people answer, you can also add a <b>Placeholder</b>, the hint shown inside the field before it’s answered (1), and turn on <b>Required question</b> if it must be answered (2). For a choice question, add its answers under <b>Options</b>: select <b>Add Option</b> (3) for each one. To remove an option, select the bin <svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> beside it.' +
          '<figure class="shot shot-small" data-marks="5,58,90,12,zone,#1; 5,73.4,40,5.6,oval,right,#2; 5,94,26,5.6,oval,right,#3"><img src="assets/img/fb-q-edit.png" alt="Edit Question for What is your feedback mainly about? Help Text is empty. The Placeholder, Select an option…, is outlined as 1, Required question is turned on and circled as 2, and the first option is Training and assessment, with a bin beside it. Add Option is circled as 3." loading="lazy"><figcaption>For example, a required Dropdown question: its placeholder (1), Required question (2) and Add Option (3).</figcaption></figure>' +
          '<figure class="shot shot-small" data-marks="82.9,85.4,arrow-down,small"><img src="assets/img/fb-q-options.png" alt="The options: Training and assessment, Trainer, Learning Resources, Student Support, Work Placement, and Facilities and Equipment, each with a bin beside it, then Add Option. An arrow points down at Save Changes." loading="lazy"><figcaption>All six options added. Select Save Changes.</figcaption></figure></li>' +
        '<li>Your questions are listed under <b>Form Questions</b>, each with its type and whether it’s required. To reorder a question, drag its handle <svg class="ui-icon" viewBox="0 0 24 24" aria-label="drag handle" role="img"><path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" stroke-width="3"/></svg>, or point at it and use the arrows <svg class="ui-icon" viewBox="0 0 24 24" aria-label="move up" role="img"><path d="M12 19V5M6 11l6-6 6 6"/></svg> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="move down" role="img"><path d="M12 5v14M6 13l6 6 6-6"/></svg> (1). Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="edit" role="img"><path d="M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4"/></svg> to edit it (2), or the bin <svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to delete it (3).' +
          '<figure class="shot" data-marks="4.4,41.8,2.8,4.8,oval,#1; 80.2,41.8,6.4,4.8,oval,above,#1; 87.9,41.8,2.8,4.8,oval,above,#2; 92.5,41.8,2.8,4.8,oval,above,#3"><img src="assets/img/fb-q-list.png" alt="Form Questions: add and arrange questions for your feedback form, and drag to reorder. About your course, Heading and Instructions; What is your feedback mainly about?, Dropdown, Required; Which unit is your feedback about?, Dropdown; Overall, how would you rate this course?, Star Rating, Required; How much do you agree with each statement?, Heading and Instructions; then the Likert Scale statements The trainer explained things clearly and Assessment tasks matched what I was taught, both Required. On Which unit is your feedback about?, the drag handle and the up and down arrows are both circled as 1, the edit button as 2 and the delete button as 3." loading="lazy"><figcaption>Reorder a question with its handle or arrows (1), edit it (2) or delete it (3).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>To ask people to rate several statements, add a <b>Heading &amp; Instructions</b> block, then a <b>Likert Scale</b> question for each statement.</span></div></li>' +
        '<li>Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> <b>Preview</b> to see the form as people will (see step 6), and <svg class="ui-icon" viewBox="0 0 24 24" aria-label="save" role="img"><path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/></svg> <b>Save</b> as you go. <b>Unsaved changes</b> shows until you save. When the form is finished, select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="tick" role="img"><path d="M5 12l5 5 9-10"/></svg> <b>Complete Form</b> (circled).' +
          '<figure class="shot" data-marks="77,28.4,11.6,9,oval,#"><img src="assets/img/fb-builder-top.png" alt="The form builder for CHC33021 Course Feedback, marked Unsaved changes, with Preview, Save and Complete Form at the top right. Complete Form is circled. Form Questions begins with About your course, a Heading and Instructions block." loading="lazy"><figcaption>Select Complete Form (circled) when the form is finished.</figcaption></figure></li>' +
        '<li><b>Preview</b> opens <b>Form Preview</b>, showing the form as people will see it. Close it to keep building. For a filled-in example, see <a href="article.html?id=fb-embed#respondents">Live form on a website</a>.' +
          '<figure class="shot shot-medium"><img src="assets/img/fb-form-preview.png" alt="Form Preview for CHC33021 Course Feedback: About your course and its instructions, What is your feedback mainly about? and Which unit is your feedback about?, each showing Select an option…, five empty stars for Overall, how would you rate this course?, and How much do you agree with each statement? Required questions are marked with a red asterisk." loading="lazy"><figcaption>Form Preview, before anything is filled in.</figcaption></figure></li>' +
      '</ol>' +
      '<p>Then share or embed it. See <a href="article.html?id=fb-embed">Share or embed a form on your website</a>.</p>' +
      '<p>To change these settings later, select <b>⋮</b> › <b>Edit Settings</b> on the form. See <a href="article.html?id=fb-manage-forms">Manage your forms</a>.</p>',

    'fb-manage-forms':
      '<p class="lead">Every form on the <b>Forms</b> tab has a menu of actions. Use <b>Team</b> to show only one team’s forms.</p>' +
      '<p>On a form’s row, select <b>⋮</b> to:</p>' +
      '<figure class="shot" data-marks="89.8,56.6,3,5.6,oval,#; 81.2,62.4,11.8,33.4,zone,#"><img src="assets/img/fb-form-menu.png" alt="The Forms tab, listing CHC33021 Course Feedback, a General form in the Community and Health Faculty, Active, anonymous, with 0 submissions, created 05 Nov 2026. Its ⋮ is circled, and its menu is outlined: Build Form, Preview, Get Embed Code, Share Form, Edit Settings, Deactivate and Delete." loading="lazy"><figcaption>Select ⋮ (circled) on a form to open its menu (outlined).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 17H5M19 7h-9M17 20a3 3 0 1 0 0-6a3 3 0 1 0 0 6zM7 10a3 3 0 1 0 0-6a3 3 0 1 0 0 6z"/></svg> Build Form</h4><p>Add, edit and reorder its questions. See <a href="article.html?id=fb-create-form#questions">Build the form</a>.</p></li>' +
        '<li id="preview"><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> Preview</h4><p>See the form as people will, with its title, description and questions. Required questions are marked <b>*</b>. See <a href="article.html?id=fb-embed#respondents">Live form on a website</a>.</p></li>' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg> Get Embed Code</h4><p>Copy its direct link, or the code to embed it on your website. See <a href="article.html?id=fb-embed#embed">Embed a form</a>.</p></li>' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0 0-6a3 3 0 1 0 0 6zM6 15a3 3 0 1 0 0-6a3 3 0 1 0 0 6zM18 22a3 3 0 1 0 0-6a3 3 0 1 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg> Share Form</h4><p>Copy its public link to send to people. See <a href="article.html?id=fb-embed#share">Share a form’s link</a>.</p></li>' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> Edit Settings</h4><p>Change its name, type, description, contact information, email notifications and team, then select <b>Update Settings</b>.</p>' +
          '<figure class="shot shot-small" data-marks="7.6,27.2,83.8,8.4,oval,#; 81.3,83,arrow-down,small"><img src="assets/img/fb-edit-settings.png" alt="Part of Edit Form Settings for CHC33021 Course Feedback. Email notifications are on, and the Responsible person, circled, is now Training Coordinator, who will receive an email each time a submission is made on this form. The team is Community and Health Faculty. An arrow points down at Update Settings." loading="lazy"><figcaption>For example, course feedback now goes to the Training Coordinator (circled). Select Update Settings.</figcaption></figure></li>' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 7zM8 12h.01"/></svg> Deactivate</h4><p>Stop the form taking new submissions, without deleting it or its submissions.</p></li>' +
        '<li><h4><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> Delete</h4><p>Remove the form.</p></li>' +
      '</ol>' +
      '<div class="callout warn"><b>Important</b><span>Deactivate a form you no longer use rather than deleting it, so its submissions stay on record.</span></div>',

    'fb-embed':
      '<p class="lead">Each form has a public link. Send the link to people, or embed the form on your website so visitors can fill it in there.</p>' +
      '<h2 id="share">Share a form’s link</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Forms</b> tab, select <b>⋮</b> › <b>Share Form</b> on the form.</li>' +
        '<li>Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="copy" role="img"><path d="M9 9h11v11H9zM5 15H4V4h11v1"/></svg> to copy the public link, then send it to people, for example in an email or your learning platform. Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="open link" role="img"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg> to open it and check the form.' +
          '<figure class="shot shot-small"><img src="assets/img/fb-share.png" alt="Share Form, to share this public link for CHC33021 Course Feedback: https://rtoradar.com.au/feedback/embed/ followed by the form’s ID, with copy and open-link buttons beside it." loading="lazy"><figcaption>The form’s public link, with copy and open-link buttons.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="embed">Embed a form</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Forms</b> tab, select <b>⋮</b> › <b>Get Embed Code</b> on the form.</li>' +
        '<li>Under <b>iFrame Embed Code</b>, select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="copy" role="img"><path d="M9 9h11v11H9zM5 15H4V4h11v1"/></svg> <b>Copy</b> (1), then paste the code into your website’s HTML where you want the form to appear. Above it, the <b>Direct Link</b> is the form’s public link: select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="copy" role="img"><path d="M9 9h11v11H9zM5 15H4V4h11v1"/></svg> to copy it or <svg class="ui-icon" viewBox="0 0 24 24" aria-label="open link" role="img"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg> to open it.' +
          '<figure class="shot shot-small" data-marks="76.8,46,17.2,7.2,oval,above,#1; 4.8,75.4,90.4,22.4,zone,#2"><img src="assets/img/fb-embed-code.png" alt="Embed Form: CHC33021 Course Feedback, to copy the embed code and add the form to your website. The Direct Link is https://rtoradar.com.au/feedback/embed/ followed by the form’s ID, with copy and open buttons. The iFrame Embed Code sets the form’s source, a width of 100%, a height of 700 and no border, with a maximum width of 600px. Copy is circled as 1. Form Settings, outlined as 2, lists Type: General, Anonymous submissions: Allowed, Contact details: Optional and Categories: 6." loading="lazy"><figcaption>Copy the embed code (1). Form Settings (2) summarises the form.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>If someone else looks after your website, send them the embed code. They don’t need access to RTO Radar.</span></div></li>' +
        '<li>Check the <b>Form Settings</b> (2): the form’s type, whether it allows anonymous submissions, its contact details setting and how many categories it has. To change them, select <b>⋮</b> › <b>Edit Settings</b>. See <a href="article.html?id=fb-manage-forms">Manage your forms</a>.</li>' +
      '</ol>' +
      '<h2 id="respondents">Live form on a website</h2>' +
      '<p>The form shows your logo, its title and description, and its questions, with required ones marked <b>*</b>. When someone selects <b>Submit Feedback</b>, their response appears on the Submissions tab.</p>' +
      '<figure class="shot shot-medium"><img src="assets/img/fb-preview.png" alt="The live CHC33021 Course Feedback form, filled in as a student would. Your logo is at the top, then the form’s description and About your course. What is your feedback mainly about? is Learning Resources, the unit is CHCCCS031 Provide individualised support, and the course is rated 4 out of 5 stars. The trainer explained things clearly is Strongly Agree, Assessment tasks matched what I was taught is Agree, Learning resources were up to date and useful is Disagree, and I felt supported throughout my course is Agree. Practical simulations, Work placement and One-on-one trainer support are ticked as most useful, and the course is scored 8 out of 10 for recommending it. What could we improve? says the CHCCCS031 learner workbook still refers to the old Aged Care Quality Standards and should be updated. Email is left blank, the acknowledgement is ticked, and Submit Feedback is at the end. Required questions are marked with a red asterisk." loading="lazy"><figcaption>The live form, filled in as a student would.</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>Every form ends with an acknowledgement that the feedback will be recorded and used to improve services. You don’t need to add it as a question.</span></div>',

    'fb-submissions':
      '<p class="lead">Every response to your forms appears on the <b>Submissions</b> tab. Open one to read it, assign it to someone, update its status and record what you did about it.</p>' +
      '<h2 id="list">Find a submission</h2>' +
      '<p>Each submission has a number, such as FS-0001, with its type, category, form, team, status, who it’s assigned to, the date and whether it has an improvement item (CI). The category comes from the form’s category question, such as “What is your feedback mainly about?”.</p>' +
      '<figure class="shot"><img src="assets/img/fb-submissions.png" alt="Complaints and Suggestions on the Submissions tab, showing 3 of 3 submissions from the CHC33021 Course Feedback form, all in the Community and Health Faculty. FS-0003, facilities and equipment, is Completed and assigned to the Compliance Officer. FS-0002, training and assessment, is In Progress, assigned to the Training Coordinator, with a link in the CI column. FS-0001, learning resources, is Open and Unassigned. All are dated 05 Nov 2026." loading="lazy"><figcaption>Submissions from the CHC33021 Course Feedback form, at different statuses.</figcaption></figure>' +
      '<ul>' +
        '<li>Narrow the list with <b>Filters</b>, <b>Assigned To</b> and <b>Team</b>, or search for a submission.</li>' +
        '<li>Select <b>Refresh</b> to check for new submissions, <b>Generate Report</b> for a report on your submissions, or <b>Export CSV</b> to download them.</li>' +
      '</ul>' +
      '<h2 id="respond">Respond to a submission</h2>' +
      '<ol class="steps-list">' +
        '<li>Select the eye <svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> on the submission’s row (circled).' +
          '<figure class="shot" data-marks="94,28,3.4,46,oval,#"><img src="assets/img/fb-sub-row.png" alt="FS-0001, a General submission in the learning resources category, from the CHC33021 Course Feedback form, in the Community and Health Faculty, Open and Unassigned, dated 05 Nov 2026. Its eye button is circled." loading="lazy"><figcaption>Select the eye (circled) to open the submission.</figcaption></figure></li>' +
        '<li>Read the <b>Form Responses</b>. The top shows the submission’s number, type and when it was submitted, with its category below.' +
          '<figure class="shot shot-medium" data-marks="2.4,30.2,93,69.2,zone,#"><img src="assets/img/fb-sub-open.png" alt="FS-0001, General, submitted on 05 November 2026 at 15:03, tagged Learning resources. Form Responses, outlined: What is your feedback mainly about? Learning Resources. Which unit is your feedback about? CHCCCS031 Provide individualised support. Overall, how would you rate this course? 4 out of 5. The trainer explained things clearly: 5, Strongly Agree. Assessment tasks matched what I was taught: 4, Agree. Learning resources were up to date and useful: 2, Disagree. Required questions are marked required." loading="lazy"><figcaption>The submission’s details and its Form Responses (outlined).</figcaption></figure></li>' +
        '<li>Scroll down. Update its <b>Status</b>, such as <b>In Progress</b>. Under <b>Assigned To</b>, choose who owns this submission: they look into what it says, and can assign its action items to others. Add <b>Internal Notes</b> about what you’ve found and what happens next. People who submitted the form don’t see these.' +
          '<figure class="shot shot-medium"><img src="assets/img/fb-respond.png" alt="Status set to In Progress, and Assigned To set to Design Manager. The Internal Notes read: Confirmed the CHCCCS031 learner workbook still refers to the old Aged Care Quality Standards. Design Manager to update it to the strengthened standards before the next intake, and trainers to cover the changes in class." loading="lazy"><figcaption>The status, who it’s assigned to and internal notes.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span><b>Assigned To</b> gives ownership of this submission only, not the form. By default, the form’s <b>Responsible person</b>, chosen when the form was created, looks after its submissions. To make someone else responsible for this submission, choose them here. See <a href="article.html?id=fb-create-form">Create and build a form</a>.</span></div></li>' +
        '<li>To record what needs to happen, add action items. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</li>' +
        '<li>Select <b>Save Changes</b> (circled). <b>Close</b> leaves without saving.' +
          '<figure class="shot shot-medium" data-marks="77.2,29.4,19.6,51,oval,#"><img src="assets/img/fb-sub-save.png" alt="The bottom of the submission, with Delete on the left, and Close and Save Changes on the right. Save Changes is circled." loading="lazy"><figcaption>Select Save Changes (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout warn"><b>Important</b><span><b>Delete</b> removes the submission. Keep complaints on record rather than deleting them, so you can show an auditor how each was handled.</span></div>',

    'fb-to-cir':
      '<p class="lead">When a submission needs follow-up, add action items to it. Each action item becomes an improvement item in the Continuous Improvement Register, so it’s tracked to completion.</p>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Submissions</b> tab, select the eye <svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> (circled) to open the submission. See <a href="article.html?id=fb-submissions#respond">Respond to a submission</a>.' +
          '<figure class="shot" data-marks="94,26,3.4,46,oval,#"><img src="assets/img/fb-sub-row-progress.png" alt="FS-0001, a General submission in the learning resources category, from the CHC33021 Course Feedback form, in the Community and Health Faculty. It’s In Progress, assigned to the Design Manager, dated 05 Nov 2026. Its eye button is circled." loading="lazy"><figcaption>FS-0001, now In Progress and assigned to the Design Manager. Select the eye (circled).</figcaption></figure></li>' +
        '<li>Check the suggested action item. When the submitter answers <b>What could we improve?</b>, RTO Radar adds their answer as an action item, marked <b>Draft</b> (1). It’s only a suggestion, and nothing is sent to the CI register yet. With its buttons (2), you can:' +
          '<ul>' +
            '<li>select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="send" role="img"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg> to send it to the person responsible, so it becomes an improvement item;</li>' +
            '<li>select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="edit" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> to edit it first, such as giving it a clearer title, a person responsible and a due date;</li>' +
            '<li>select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to remove it if no action is needed.</li>' +
          '</ul>' +
          '<figure class="shot shot-medium" data-marks="83.2,67.8,8.8,3.8,oval,#1; 75.6,85.8,15.6,5,oval,#2"><img src="assets/img/fb-action-draft.png" alt="The lower half of submission FS-0006. What could we improve: The CHCCCS031 learner workbook still refers to the old Aged Care Quality Standards, which confused me on placement because my host employer uses the strengthened standards. Updating the workbook and adding a short session on the changes would help. Status Open, assigned to the Design Manager, with internal notes confirming the workbook needs updating. Action Items, 1: General – FS-0006, marked Draft and circled as 1, with the same text as the response, Admin Demo, Medium priority, due 22/11/2026, and the edit, send and bin buttons, circled as 2. Add is at the top right of Action Items." loading="lazy"><figcaption>The submitter’s suggestion, added as a Draft action item (1), with edit, send and remove (2).</figcaption></figure></li>' +
        '<li>To add your own action item, scroll down to <b>Action Items</b> and select <b>Add</b> (circled).' +
          '<figure class="shot shot-medium" data-marks="83.4,81.4,12.8,10.4,oval,#"><img src="assets/img/fb-ai-add.png" alt="The lower half of FS-0001: Status In Progress, Assigned To Design Manager, and the internal notes. Below, Action Items, with Add circled." loading="lazy"><figcaption>Select Add (circled) under Action Items.</figcaption></figure></li>' +
        '<li>Enter a <b>Title</b> (optional) and a <b>Description</b> of what needs to happen. Choose the <b>Person Responsible</b>, the <b>Priority</b> and the <b>Due Date</b>, then select <b>Add Action Item</b>.' +
          '<figure class="shot shot-medium" data-marks="80.4,86.2,arrow-down,small"><img src="assets/img/fb-ai-form.png" alt="A new action item. The title is Update CHCCCS031 learner workbook to strengthened Aged Care Quality Standards. The description reads: Student feedback (FS-0001) reports the CHCCCS031 learner workbook still refers to the old Aged Care Quality Standards. Review the workbook and replace outdated references with the strengthened standards. Check the related assessment tasks and marking guide for the same references, and brief CHC33021 trainers on the changes before the Semester 1 2027 intake. The person responsible is the Training Coordinator, the priority is High and the due date is 30/01/2027. An arrow points down at Add Action Item." loading="lazy"><figcaption>The Design Manager hands the work to the Training Coordinator. Select Add Action Item.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The submission’s <b>Assigned To</b> is its owner, who looks into it. See <a href="article.html?id=fb-submissions#respond">Respond to a submission</a>. Action items are the work the owner gives to other people, each with its own <b>Person Responsible</b>. For example, the Design Manager owns FS-0001. They add one action item for the Training Coordinator to update the CHCCCS031 workbook, and another for the Compliance Officer to check the other CHC33021 learner resources for the same outdated references.</span></div></li>' +
        '<li>The action item is added as a <b>Draft</b>. Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="edit" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> to edit it, <svg class="ui-icon" viewBox="0 0 24 24" aria-label="send" role="img"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg> to send it to the Continuous Improvement Register, or the bin <svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to delete it.' +
          '<ol class="ov-list">' +
            '<li><h4>Send it to the CI register</h4><p>Select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="send" role="img"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg> (1). It becomes an improvement item, assigned to the person responsible.</p></li>' +
            '<li><h4>Save the submission</h4><p>Select <b>Save Changes</b> (2).</p></li>' +
          '</ol>' +
          '<figure class="shot shot-medium" data-marks="83.8,67.6,4.6,6.2,oval,above,#1; 77.2,84.2,19.4,10.4,oval,right,#2"><img src="assets/img/fb-ai-draft.png" alt="Action Items, 1: Update CHCCCS031 learner workbook to strengthened Aged Care Quality Standards, marked Draft, with its description, the Training Coordinator, High priority and due 30/01/2027. Its edit, send and delete buttons are below, with send circled as 1. Delete, Close and Save Changes are at the bottom, with Save Changes circled as 2." loading="lazy"><figcaption>Send the action item to the CI register (1), then Save Changes (2).</figcaption></figure></li>' +
        '<li>The submission now has a link in the <b>CI</b> column on the Submissions tab. Select it to open the improvement item, which appears in the <a href="feature.html?m=cir">Continuous Improvement Register</a>, assigned to the responsible person.' +
          '<figure class="shot" data-marks="84.9,85.4,3.4,5.6,oval,#"><img src="assets/img/fb-submissions-ci.png" alt="The Submissions tab, showing 3 of 3 submissions from the CHC33021 Course Feedback form. FS-0003 is Completed, assigned to the Compliance Officer; FS-0002 is In Progress, assigned to the Training Coordinator; and FS-0001 is In Progress, assigned to the Design Manager. Each has a link in the CI column, and FS-0001’s is circled." loading="lazy"><figcaption>FS-0001 now has a link in the CI column (circled).</figcaption></figure></li>' +
      '</ol>',

    'fb-plan':
      '<p class="lead">A form and its submissions belong to the form’s team. Choosing the right team for each form decides who can see the responses, which matters most for complaints.</p>' +
      '<h2 id="teams">Who sees a form’s submissions</h2>' +
      '<ul>' +
        '<li>A form owned by a team can only be seen by that team’s managers and members whose role includes Complaints &amp; Suggestions.</li>' +
        '<li>A form left in <b>System Default</b> is visible to everyone with that permission.</li>' +
      '</ul>' +
      '<h2 id="choose">Which teams you can choose</h2>' +
      '<p>Provided you have the right permissions, the teams you can create a form in depend on where you are:</p>' +
      '<ul>' +
        '<li><b>In System Default:</b> create it in any team, so only that team’s members can see it, or in System Default, so everyone can see it.</li>' +
        '<li><b>In a team:</b> create it in your team, or in System Default. If you’re in more than one team, you can choose any of them.</li>' +
      '</ul>' +
      '<h2 id="suggested">A suggested setup</h2>' +
      '<table><thead><tr><th>Form</th><th>Owning team</th><th>Why</th></tr></thead><tbody>' +
        '<tr><td>Course or unit feedback</td><td>The course’s faculty, such as Business Faculty</td><td>The faculty can act on feedback about its own courses.</td></tr>' +
        '<tr><td>Complaints and appeals</td><td>Compliance &amp; Validation, or Student Services &amp; Administration</td><td>Complaints are often about a trainer or course, so they must be handled independently and confidentially.</td></tr>' +
        '<tr><td>Industry feedback</td><td>The course’s faculty</td><td>It feeds the faculty’s industry consultation evidence.</td></tr>' +
        '<tr><td>General suggestions</td><td>System Default</td><td>Anyone with the permission can see and act on them.</td></tr>' +
      '</tbody></table>' +
      '<div class="callout tip"><b>Tip</b><span>A Head of Faculty can create and run course feedback forms for their own faculty if their role includes Complaints &amp; Suggestions view and create. See <a href="article.html?id=users-custom-role">Create a custom role</a>.</span></div>' +
      '<p>See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
      '<h2 id="elsewhere">Where else your forms are used</h2>' +
      '<p>Forms and their submissions aren’t only for complaints and suggestions. Other parts of RTO Radar draw on them:</p>' +
      '<table><thead><tr><th>Where</th><th>How it uses your forms</th></tr></thead><tbody>' +
        '<tr><td>Scheduling an industry consultation</td><td>Choose a <b>Feedback Form</b>, such as an industry feedback form for the course, to send to the industry representative. See <a href="article.html?id=ev-consultation#schedule">Schedule a consultation</a>.</td></tr>' +
        '<tr><td>Completing a consultation</td><td>Select <b>Link Feedback</b> to attach the representative’s submissions as evidence that the consultation took place. See <a href="article.html?id=ev-consultation#complete">Mark a consultation complete</a>.</td></tr>' +
        '<tr><td>Recording consultation evidence</td><td>Under <b>Link Feedback Submissions</b>, find and attach feedback submissions as evidence, from Events or from the course in Program Management. See <a href="article.html?id=ev-record-consultation">Record industry consultation evidence</a> and <a href="article.html?id=prog-industry-consultation">Record an industry consultation</a>.</td></tr>' +
        '<tr><td>TAS Builder</td><td>Section 15, <b>Industry and Feedback</b>, draws on the industry engagement and feedback you’ve recorded, including form submissions. See <a href="article.html?id=prog-master-tas">Build a Master TAS</a>.</td></tr>' +
        '<tr><td>Continuous Improvement Register</td><td>Action items on a submission become improvement items, tracked to completion. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</td></tr>' +
      '</tbody></table>' +
      '<div class="callout tip"><b>Tip</b><span>Build an industry feedback form for each course, owned by the course’s faculty. Its submissions then serve as consultation evidence, feed the course’s TAS, and can become improvement items.</span></div>',

    // ---- Continuous Improvement Register ----
    'cir-overview':
      '<p class="lead">The Continuous Improvement Register (CIR) is one list of every improvement action in your RTO. Risk treatments, validation findings, consultation actions, feedback and more all land here, each with a person responsible, a due date and a priority, so nothing slips through.</p>' +
      '<h2 id="open">Open the register</h2>' +
      '<p>Select <b>Continuous Improvement</b> on your navigation bar. <b>Item List</b> shows every item you can see.</p>' +
      '<figure class="shot" data-marks="0.1,21.9,11.8,5.4,oval,#"><img src="assets/img/gs-cir-nav.png" alt="The Continuous Improvement Register, with Continuous Improvement circled in the navigation bar on the left. The Item List shows 10 improvement items with their item number, who created them, status, source, person responsible, assigned date, description, tags, due date and priority." loading="lazy"><figcaption>Select Continuous Improvement in the navigation bar (circled).</figcaption></figure>' +
      '<p>Each item shows its <b>Item Number</b>, such as CI-2026-145, who created it, its <b>Status</b> and <b>Source</b>, the <b>Person Responsible</b>, the date it was assigned, its <b>Description</b>, <b>Tags</b>, <b>Due Date</b> and <b>Priority</b>.</p>' +
      '<h2 id="what-next">What you can do</h2>' +
      '<ul>' +
        '<li><b>Add an item</b>, for an improvement that doesn’t come from elsewhere in RTO Radar. See <a href="article.html?id=cir-add-item">Add an improvement item</a>.</li>' +
        '<li><b>Open, edit or delete an item</b>. See <a href="article.html?id=cir-assign-track">View, edit and track an item</a>.</li>' +
        '<li><b>Complete or verify an item</b> once the actions are done. See <a href="article.html?id=cir-complete">Complete or verify an item</a>.</li>' +
        '<li><b>Export</b> the register for an audit or governance meeting. See <a href="article.html?id=cir-export">Export the register</a>.</li>' +
      '</ul>' +
      '<h2 id="access">Who sees which items</h2>' +
      '<p>What you see in the register depends on your portal and your role’s permissions:</p>' +
      '<ul>' +
        '<li><b>Admin portal</b>: all the improvement items in your organisation, if your role includes the Continuous Improvement permission.</li>' +
        '<li><b>Trainer/Assessor portal</b>: only the items assigned to you, where you’re the person responsible.</li>' +
      '</ul>' +
      '<p>See <a href="article.html?id=users-permissions">What each permission covers</a>.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins can see improvement items across the organisation, but can only assign items to people in their teams, and only if their role has the right permissions. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</span></div>' +
      '<h2 id="find">Find an item</h2>' +
      '<p>To narrow the register:</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Filters</b> (1) and choose what to show, such as one <b>Source</b> or <b>Status</b>. The number on the button shows how many filters are on.</li>' +
        '<li>Select <b>Person Responsible</b> (2) and tick the people whose items you want to see.</li>' +
        '<li>To see one team’s items, choose it in the team list beside them. To find a particular item, type part of its number or description in the search box.' +
          '<figure class="shot" data-marks="1.6,24,8.4,10.6,oval,above,#1; 11.1,24,12.3,10.6,oval,above,#2"><img src="assets/img/gs-cir-list.png" alt="The Item List filtered to show only Risk Register items assigned to the Compliance Manager, showing 2 of 2 items. Filters, with 2 filters on, is circled as 1, and Person Responsible, with 1 person chosen, as 2. CI-2026-096, Staff Awareness of Cyber Risks, is In Progress, Medium, due 15/10/2026, and CI-2026-092, a VETiS student cohort child safety risk, is Completed, High." loading="lazy"><figcaption>The register filtered to Risk Register items (1) assigned to the Compliance Manager (2).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Select <b>Select Columns</b> to choose which columns show, such as <b>Completed By</b> and <b>Verified By</b>.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins set up CIR sources, custom item fields, reminders and bulk imports in <b>Settings</b> › <b>Customisation</b> › <b>CIR</b>. See <a href="article.html?id=cust-cir-settings">Set up the CIR: custom registers, imports, sources and reminders</a>.</span></div>',

    'cir-sources':
      '<p class="lead">Improvement items can come from anywhere in RTO Radar. When an action is raised in another module, it’s sent to the register with an automatic <b>Source</b>, so you can filter by where items came from and spot trends.</p>' +
      '<h2 id="sources">Where items come from</h2>' +
      '<table><thead><tr><th>Source</th><th>Raised from</th></tr></thead><tbody>' +
        '<tr><td>Risk Register</td><td>Each treatment plan, when you complete the comprehensive risk assessment. See <a href="article.html?id=risk-treatment#cir">From treatment plan to improvement item</a>.</td></tr>' +
        '<tr><td>Validation</td><td>Critical areas and improvements in Phase 4 of a unit validation. See <a href="article.html?id=prog-validation-phases#phase4">Phase 4: Add Improvement Items</a>.</td></tr>' +
        '<tr><td>Assessment Judgement</td><td>Actions sent to the CI register from an assessment judgement. See <a href="article.html?id=prog-assessment-judgement">Record an assessment judgement</a>.</td></tr>' +
        '<tr><td>Consultation</td><td>Action items from an industry consultation, recorded in Events or Program Management, or added later from its evidence history. See <a href="article.html?id=ev-record-consultation">Record industry consultation evidence</a> and <a href="article.html?id=ev-consultation-history">View and manage consultation evidence</a>.</td></tr>' +
        '<tr><td>Feedback</td><td>Action items on a submission in Complaints &amp; Suggestions. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</td></tr>' +
        '<tr><td>TAS Builder</td><td>Submitting a TAS for review creates an item to track the review. See <a href="article.html?id=prog-tas-review#submit">Submit a TAS for review</a>.</td></tr>' +
        '<tr><td>PD EOI Request</td><td>A staff member’s request for approval of paid PD, assigned to the approver. See <a href="article.html?id=pd-eoi">Request approval for paid PD</a>.</td></tr>' +
        '<tr><td>Document checklist</td><td>Action items added with a document type, such as getting staff to provide a new document. See <a href="article.html?id=wf-checklist#add">Add a document type</a>.</td></tr>' +
        '<tr><td>Ad Hoc</td><td>Items you add yourself in the register. See <a href="article.html?id=cir-add-item">Add an improvement item</a>.</td></tr>' +
      '</tbody></table>' +
      '<p>To see items from one source, select <b>Filters</b> (1), then tick the source under <b>Source</b>, such as <b>Feedback</b> (2).</p>' +
      '<figure class="shot shot-small" data-marks="2.4,3,33,8.4,oval,#; 37.6,7.2,#1; 4.6,54.2,24,6.6,oval,right,#2"><img src="assets/img/cir-filter-source.png" alt="Filters, circled as 1, with 1 filter on, and its menu open on Source: Ad Hoc, Audit, Complaint, Evidence Map, Feedback, Consultation, PD EOI Request, Assessment Judgement, QMS Review, Risk Register, TAS Builder, Validation and Workforce Document. Feedback is ticked and circled as 2." loading="lazy"><figcaption>Select Filters (1), then tick a source, such as Feedback (2).</figcaption></figure>' +
      '<figure class="shot" data-marks="17.8,31,7.6,44,zone,#"><img src="assets/img/cir-list-feedback.png" alt="The Item List filtered to 2 items from Feedback, with the Source column outlined. An RTO feedback form item for Staff Demo is Completed, and an item about industry-based case studies for Quality Assurance is Overdue, both Medium." loading="lazy"><figcaption>Only Feedback items show, with their source in the Source column (outlined).</figcaption></figure>' +
      '<h2 id="managed">Items managed by their source</h2>' +
      '<p>An item raised elsewhere stays linked to where it came from. When you edit it, a banner says which module manages it, such as <b>Assessment Judgement</b> or <b>Risk Register</b>. To change the description, update it at the source: select <b>Go to Source</b>, or <b>More info</b> on the open item. You can still change its person responsible, due date, priority, status, tags and attachments in the register. Its <b>Source</b> can’t be changed, and any notes carried over from the source show under <b>Source Context / Notes</b>.</p>' +
      '<figure class="shot shot-medium" data-marks="70.4,16.6,20.6,5.4,oval,above,#1; 65,88,29,6.2,oval,above,#2"><img src="assets/img/cir-managed.png" alt="Edit Improvement Item for an item from the Risk Register, with the banner: this item is managed by Risk Register, to edit the description, update it at the source. Go to Source is circled as 1. The item is for the Compliance Manager, due 30/10/2026, titled Trainer Industry Currency - RTO Radar to Document Trainer Matrix, with its description, existing controls and proposed treatment, and Source Context notes carried over from the risk: Operational and Educational Risk, High, score 16, likelihood 4 and consequence 4. Priority High, Status Overdue, and Source Risk Register, greyed out and circled as 2." loading="lazy"><figcaption>An item managed by the Risk Register. Select Go to Source (1) to change its description. Its Source (2) can’t be changed.</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>Admins can add your own source categories in <b>Settings</b> › <b>Customisation</b> › <b>CIR</b> › <b>Sources</b>. See <a href="article.html?id=cust-cir-settings">Set up the CIR: custom registers, imports, sources and reminders</a>.</span></div>',

    'cir-add-item':
      '<p class="lead">Add an item for an improvement that doesn’t come from elsewhere in RTO Radar, such as an issue raised in a staff meeting or found during an internal audit. Its source is <b>Ad Hoc</b> unless you choose another.</p>' +
      '<h2 id="add">Add an item</h2>' +
      '<ol class="steps-list">' +
        '<li>In the register, select <b>Add Item</b> (1), then <b>Add Item (Default)</b> (2).' +
          '<figure class="shot" data-marks="84.6,63.6,9.2,10.4,oval,above,#1; 84.8,77.4,9,6.8,oval,#2"><img src="assets/img/cir-add-menu.png" alt="The Continuous Improvement Register’s Item List, with Add Item circled as 1 and its menu open, showing Add Item (Default), circled as 2, and External CI Register." loading="lazy"><figcaption>Select Add Item (1), then Add Item (Default) (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The menu also lists your RTO’s custom CI registers, such as <b>External CI Register</b>, which add extra fields of your own. Admins set them up in <b>Settings</b> › <b>Customisation</b> › <b>CIR</b>. See <a href="article.html?id=cust-cir-settings#custom">Create a custom CI register</a>.</span></div></li>' +
        '<li id="person">Choose the <b>Person Responsible</b> and the <b>Due Date</b>. Add a short <b>Title</b>: it’s what shows in the register. Then describe the improvement under <b>Description</b>. The description shows when someone opens the item.' +
          '<figure class="shot shot-medium"><img src="assets/img/cir-add-form.png" alt="Add New Improvement Item: Person Responsible Student Services Coordinator, Due Date 15/12/2026, and the title Update the student handbook complaints and appeals process. The description reads: Internal audit (November 2026) found the student handbook still describes the previous complaints and appeals process, with outdated timeframes and contact details. Update the handbook to match the current Complaints and Appeals Policy, including the 10 working day response timeframe and how to request an external review. Publish the updated version on the website and the learning platform, and brief student services staff on the changes." loading="lazy"><figcaption>An item raised from an internal audit finding.</figcaption></figure></li>' +
        '<li>Set the <b>Priority</b>, <b>Status</b> and <b>Source</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/cir-add-status.png" alt="Priority Medium, Status Open and Source Ad Hoc." loading="lazy"><figcaption>Medium priority, Open, from an Ad Hoc source.</figcaption></figure></li>' +
        '<li>Optionally, add <b>Tags</b>: choose an existing tag, or type a new one and select <b>Add</b> (arrow).' +
          '<figure class="shot shot-medium" data-marks="81.6,62,arrow-right,small"><img src="assets/img/cir-add-tags.png" alt="Tags, with Student Support already added, and Complaints typed in the new tag box. An arrow points right at Add." loading="lazy"><figcaption>Student Support added, and Complaints about to be added (arrow).</figcaption></figure></li>' +
        '<li>Optionally, add <b>Attachments</b>: PDF, DOC, XLS, TXT or images, up to 20 MB each. Then select <b>Create</b>. The person responsible is emailed about their new item.' +
          '<figure class="shot shot-medium" data-marks="85.2,83.2,10.6,12.4,oval,#"><img src="assets/img/cir-add-attach.png" alt="Attachments, with Internal_Audit_Findings_Nov2026.pdf attached. Create is circled." loading="lazy"><figcaption>The internal audit findings attached. Select Create (circled).</figcaption></figure></li>' +
        '<li>The item appears in the register with its title, source, person responsible, assigned date, tags, due date and priority. As an item with an attachment, it has a download <svg class="ui-icon" viewBox="0 0 24 24" aria-label="download" role="img"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg> button beside the eye under <b>Actions</b>.' +
          '<figure class="shot"><img src="assets/img/cir-add-done.png" alt="The Item List, showing the new item: Not Started, Ad Hoc, for the Student Services Coordinator, assigned 06/11/2026, Update the student handbook complaints and appeals process, tagged Student Support, due 15/12/2026, Medium, with download and view buttons under Actions." loading="lazy"><figcaption>The new item in the register.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="import">Bulk import items</h2>' +
      '<p>Admins can bulk import items from a CSV or Excel file in <b>Settings</b> › <b>Customisation</b> › <b>CIR</b> › <b>Import</b>, such as a register you kept in a spreadsheet. Import them as default items, or into a custom CI register, which must be set up first with fields matching the file’s columns. The columns match the register’s <b>Export Excel</b>, so you can also export the register, edit the file and import it again.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Settings</b> (1), then <b>Customisation</b> (2), then <b>CIR</b> (3). It opens on the <b>Import</b> tab.' +
          '<figure class="shot" data-marks="0.6,91.2,15.2,6.6,oval,right,#1; 72.9,48.9,9.2,8,oval,above,#2; 58,87,12.6,8,oval,above,#3"><img src="assets/img/cir-import-open.png" alt="RTO Admin, with Settings selected in the navigation, circled as 1. Organisation Settings: configure your organisation’s settings and integrations, with the tabs Integrations, User Management, Security, Professional Development and Customisation, circled as 2. Customisation: configure validation settings and personalise your dashboard, with the tabs Risk, QMS, Dashboard, CIR, circled as 3, TAS Templates and Branding." loading="lazy"><figcaption>Select Settings (1), Customisation (2), then CIR (3).</figcaption></figure></li>' +
        '<li>On the <b>Import</b> tab, choose what to <b>Import as</b> (1): a <b>Default CI item</b>, or one of your custom CI registers, such as External CI Register, to import its custom fields too. Then select <b>Download CSV</b> (2) for a matching template.' +
          '<figure class="shot" data-marks="4,33.4,26.4,7.4,oval,right,#1; 84.4,52.2,10.6,7.4,oval,above,#2"><img src="assets/img/cir-import-tab.png" alt="Import Continuous Improvement Items, on the Import tab beside Sources, Custom Items and Reminders: bulk import improvement items from a CSV or Excel file. Import as is Default CI item, circled as 1, with a note to choose a custom item type to download a matching template and import its custom fields. Download CSV is circled as 2. Below is a box to drag and drop your file, or browse, for CSV and XLSX files up to 5 MB." loading="lazy"><figcaption>Choose what to import as (1), then download the template (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>To import into a custom CI register, set it up first, with fields matching your file’s columns. See <a href="article.html?id=cust-cir-settings#custom">Create a custom CI register</a>.</span></div></li>' +
        '<li>Open the template and replace or delete its sample rows and the “# Valid choices” line. Then copy and paste in your existing register, or type your items, one per row, as in the example below. Follow the <b>Import Instructions</b> on the page.' +
          '<figure class="shot"><img src="assets/img/cir-import-rules.png" alt="Import Instructions. Required columns: Description and Due Date. Date format: DD/MM/YYYY or YYYY-MM-DD, and Excel date cells are also accepted. Replace or delete the sample rows and the # Valid choices line in the template before importing. Person Responsible: email or full name of an existing staff member. Columns match the CI Register Excel export, so you can edit an exported file and re-upload it. Valid priority values: low, medium, high and critical. Valid status values: Open, In Progress and Completed. Valid source values: Adhoc, Audit, Complaint, Evidence Map, Feedback, Industry Consultation, Post Assessment Validation, Risk Register, Tas Builder and Validation." loading="lazy"><figcaption>The import rules, with the valid priority, status and source values.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/cir-import-sheet.png" alt="The template in Excel, with columns Title, Status, Priority, Person Responsible, Due Date, Source, Description, Tags, Notes, Impact of Action, Created By and Created Date, filled with nine items, such as Update student handbook complaints process, Open, Medium, Student Services Coordinator, 15/12/2026, Audit, and Revise BSB50120 marking guides, In Progress, High, Training Coordinator, 30/11/2026, Validation." loading="lazy"><figcaption>A template filled in with nine items, one per row.</figcaption></figure></li>' +
        '<li>Drag your file into the box, or select <b>browse</b> (circled). CSV and XLSX files up to 5 MB are supported.' +
          '<figure class="shot" data-marks="56.6,52.2,4.8,9.6,oval,#"><img src="assets/img/cir-import-drop.png" alt="The upload box: drag and drop your file here, or browse, which is circled. Supports CSV and XLSX files up to 5 MB." loading="lazy"><figcaption>Drag your file in, or select browse (circled).</figcaption></figure></li>' +
        '<li>In <b>Review Import</b>, check the rows. Each is marked valid or invalid, with a count of each at the top, and every field can be edited here. Problems show under the row, such as a staff member who can’t be found or an invalid source. Untick any row you don’t want to import.' +
          '<figure class="shot" data-marks="2,12.2,16,4.6,oval,above,#; 85.4,3.6,13.4,5.6,oval,#"><img src="assets/img/cir-import-review.png" alt="Review Import for ci_import_template.csv: 11 rows, with all fields editable. 10 Valid and 1 Invalid are circled. A note says the file was imported as a default item, so any extra columns have been added as tags; if it belongs to a custom item type, cancel and select that item type before uploading. Each row has a tick box, its row number, whether it’s valid, and its title, description, due date, priority and status. Two rows show Staff member not found, for trainer@example.com and Jane Smith. Import 10 Items is circled." loading="lazy"><figcaption>10 valid and 1 invalid row. Select Import 10 Items (circled) to import the valid ones.</figcaption></figure>' +
          '<figure class="shot"><img src="assets/img/cir-import-invalid.png" alt="An invalid row, row 7, Add digital marketing case study, with the message Invalid source: consultation." loading="lazy"><figcaption>An invalid row: “Consultation” isn’t a valid source. Change it to Industry Consultation to import it.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>When you import as a default item, extra columns, such as Notes or Impact of Action, become tags. If the file belongs to a custom CI register, select <b>Cancel</b> and choose it under <b>Import as</b> before uploading.</span></div></li>' +
        '<li>Select <b>Import</b>. The button shows how many items will be imported. The items appear in the register, created by you.' +
          '<figure class="shot"><img src="assets/img/cir-import-done.png" alt="The Item List after the import, showing 10 of 10 items created by Admin Demo, each assigned 06/11/2026, such as Update WHS induction slides, Completed, Ad Hoc, Compliance Officer, and Refresh trainer industry currency records, In Progress, Validation, Compliance Manager. Two items whose staff member wasn’t found, Feedback process improvement and Update learner resources with current legislation references, are Unassigned and Overdue." loading="lazy"><figcaption>The imported items in the register.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Items whose person responsible couldn’t be found are imported as <b>Unassigned</b>. Assign them from the register: open each one and select <b>Edit Item</b>. See <a href="article.html?id=cir-assign-track#edit">Edit an item</a>.</span></div></li>' +
      '</ol>',

    'cir-assign-track':
      '<p class="lead">Open an item to see everything about it, then edit it, change who’s responsible, or follow its progress through the activity log.</p>' +
      '<h2 id="view">View an item</h2>' +
      '<ol class="steps-list">' +
        '<li>In the register, select the eye <svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> under <b>Actions</b> on the item’s row.' +
          '<figure class="shot" data-marks="93.4,54.6,5.6,14.6,oval,#"><img src="assets/img/gs-cir-list.png" alt="The Item List, filtered to two items from the Risk Register, both for the Compliance Manager: CI-2026-096, Staff Awareness of Cyber Risks, In Progress, Medium, due 15/10/2026, and CI-2026-092, a VETiS student cohort child safety risk, Completed, High. The eye under Actions on the first item is circled." loading="lazy"><figcaption>Select the eye (circled) to open an item.</figcaption></figure></li>' +
        '<li>The item shows its number, priority and status, then its title, source, who created it, the person responsible, the assigned date, due date and created date, its tags, notes and description. The <b>Activity Log</b> records each change, such as when a verifier was assigned, and who made it.' +
          '<figure class="shot shot-small" data-marks="12.4,91.2,#1; 33.8,91.2,#2; 53,91.2,#3; 70,91.2,#4; 88.4,91.2,#5"><img src="assets/img/gs-cir-item.png" alt="CI-2026-096 opened in full: Medium and In Progress. Its title is Staff Awareness of Cyber Risks - Checking Staff have completed the refresher, from the Risk Register, created by Admin Demo for the Compliance Manager, assigned 12/08/2026 and due 15/10/2026, tagged ICT and Cyber-Security Risk, with its original risk of 3 by 3, 9. The notes carry over the risk category, description, level, existing controls, likelihood and consequence, and the description gives the proposed treatment. Delete Item, Complete Item, Verify, More info and Edit Item along the bottom are numbered 1 to 5." loading="lazy"><figcaption>An item raised from the Risk Register, with its five buttons (1–5).</figcaption></figure></li>' +
      '</ol>' +
      '<p>At the bottom of an open item:</p>' +
      '<ol class="ov-list">' +
        '<li><h4>Delete Item</h4><p>Removes the item.</p></li>' +
        '<li><h4>Complete Item</h4><p>Record the actions taken and mark the item complete. See <a href="article.html?id=cir-complete">Complete or verify an item</a>.</p></li>' +
        '<li><h4>Verify</h4><p>Send the item to someone to confirm the actions worked. See <a href="article.html?id=cir-complete#verify">Send an item for verification</a>.</p></li>' +
        '<li><h4>More info</h4><p>Takes you to where the item came from, such as the risk or validation that raised it, like <b>Go to Source</b>. See <a href="article.html?id=cir-sources#managed">Items managed by their source</a>.</p></li>' +
        '<li><h4>Edit Item</h4><p>Change its details. See below.</p></li>' +
      '</ol>' +
      '<h2 id="edit">Edit an item</h2>' +
      '<ol class="steps-list">' +
        '<li>Open the item and select <b>Edit Item</b>.</li>' +
        '<li>Change the <b>Person Responsible</b>, <b>Due Date</b>, <b>Title</b>, <b>Description</b>, <b>Priority</b>, <b>Status</b>, <b>Tags</b> or <b>Attachments</b>, then select <b>Update</b>.' +
          '<figure class="shot shot-medium" data-marks="87.4,92,arrow-down,small"><img src="assets/img/cir-edit.png" alt="Edit Improvement Item for the student handbook item. The description now ends: Draft updated 20/11/2026 and sent to the Compliance Manager for review. Priority Medium, Status In Progress and Source Ad Hoc. Tags Student Support, Complaints and Policy. Attachments: Internal_Audit_Findings_Nov2026.pdf, and Student_Handbook_2027_Draft.pdf, newly added. An arrow points down at Update." loading="lazy"><figcaption>The item updated: In Progress, with a progress note, a Policy tag and the draft handbook attached. Select Update.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>If the item came from elsewhere in RTO Radar, its description is managed there. Select <b>Go to Source</b> to change it. See <a href="article.html?id=cir-sources#managed">Items managed by their source</a>.</span></div></li>' +
      '</ol>' +
      '<h2 id="status">Change an item’s status</h2>' +
      '<p>Select the arrow beside an item’s status in the register to change it, for example from <b>Open</b> to <b>In Progress</b>.</p>' +
      '<figure class="shot" data-marks="10.4,30,6.4,38,oval,#"><img src="assets/img/cir-status-row.png" alt="An item from QMS Review for Admin Demo: Document Review Due, #TAS-CHC30121v1, Cohort TAS Approved, CHC30121 Certificate III in Early Childhood Education and Care, due 31/10/2026, High. Its status, In Progress, with the arrow beside it, is circled." loading="lazy"><figcaption>Select the arrow beside the status (circled) to change it.</figcaption></figure>' +
      '<h2 id="tags">Manage tags</h2>' +
      '<p>Tags are shared by everyone in your RTO.</p>' +
      '<ol class="steps-list">' +
        '<li>In the register, select the gear beside <b>Tags</b> (circled). <b>Manage Organization Tags</b> opens.' +
          '<figure class="shot" data-marks="69.3,42.6,2.4,7.4,oval,#"><img src="assets/img/gs-cir-list.png" alt="The Item List, with the gear beside the Tags column heading circled." loading="lazy"><figcaption>Select the gear beside Tags (circled).</figcaption></figure></li>' +
        '<li>Type a tag in the search box (arrow). If it isn’t there yet, select <b>Create</b> (1) to add it. Tags that already exist are listed below, with how many items use each one. Select the bin <svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> (2) to delete a tag, or tick several and select <b>Delete Selected</b>.' +
          '<figure class="shot shot-medium" data-marks="17,25.9,arrow-left,small; 6,46.2,88,6.6,oval,above,#1; 90,56.8,4,4.4,oval,#2"><img src="assets/img/cir-tags.png" alt="Manage Organization Tags: create, view and delete tags for your organisation, shared across all staff members. An arrow points at Admin, typed in the search box. Below, Create Admin is circled as 1, and the existing tag Administration, used in 2 items and created 10/03/2026, has its bin circled as 2." loading="lazy"><figcaption>Type a tag (arrow), then create it (1), or delete an existing one (2).</figcaption></figure></li>' +
      '</ol>',

    'cir-complete':
      '<p class="lead">When the actions for an item are done, open it and either send it for verification or complete it. A verifier can complete the item or send it on to someone else, until the item is completed.</p>' +
      '<p>These examples follow the item <b>Update the student handbook complaints and appeals process</b>, from <a href="article.html?id=cir-add-item" target="_blank" rel="noopener">Add an improvement item</a>. The Student Services Coordinator updates the handbook, the Compliance Manager checks it, and the Governance Lead signs it off.</p>' +
      '<h2 id="verify">Verify an item</h2>' +
      '<p>Send an item for verification when someone else should confirm the actions worked.</p>' +
      '<ol class="steps-list">' +
        '<li>Select the eye (1) beside the item in the register.' +
          '<figure class="shot" data-marks="94.9,75,2.6,10.6,oval,above,#1"><img src="assets/img/cir-verify-list.png" alt="The Item List, showing the student handbook item: created by Admin Demo, In Progress, Ad Hoc, for the Student Services Coordinator, assigned 06/11/2026, Update the student handbook complaints and appeals process, tagged Student Support, Complaints and Policy, due 19/12/2026, Medium, and not yet verified. The eye under Actions is circled as 1." loading="lazy"><figcaption>Select the eye (1) to open the item.</figcaption></figure></li>' +
        '<li>Select <b>Verify</b> (2). The <b>Complete Continuous Improvement Item</b> form opens, with <b>Verify</b> selected.' +
          '<figure class="shot shot-medium" data-marks="64.6,93.9,13.7,4.1,oval,above,#2"><img src="assets/img/cir-verify-item.png" alt="Item CI-2026-149, Medium and In Progress: Update the student handbook complaints and appeals process, Ad Hoc, created by Admin Demo, for the Student Services Coordinator, assigned and created 06/11/2026, due 19/12/2026, tagged Student Support, Complaints and Policy. Attachments: Internal_Audit_Findings_Nov2026.pdf and Student_Handbook_2027_Draft.pdf, with Download All as ZIP. The description ends: Draft updated 20/11/2026 and sent to the Compliance Manager for review. At the bottom are Delete Item, Complete Item, Verify, circled as 2, and Edit Item." loading="lazy"><figcaption>Select Verify (2).</figcaption></figure></li>' +
        '<li>Choose who will verify it under <b>Assign Verifier</b>. Describe <b>What were the actions taken?</b> and <b>What is the intent of resolving this CIR?</b>, and optionally set a <b>Follow-up / Review Date</b>. Then select <b>Send for Verification</b>.' +
          '<figure class="shot shot-medium" data-marks="83.1,93.2,arrow-down,small"><img src="assets/img/cir-verify-send.png" alt="Complete Continuous Improvement Item: document the outcome of this improvement action before progressing it. CI-2026-149, Internal audit (November 2026) found the student handbook still describes the previous complaints and appeals process. Status Pathway is Verify: the item will be assigned to a verifier for confirmation before final completion. Assign Verifier is the Compliance Manager. What were the actions taken: Updated the student handbook to match the current Complaints and Appeals Policy, including the 10 working day response timeframe, current contact details and how to request an external review. Published it on the website and the learning platform on 24/11/2026, and briefed student services staff on 25/11/2026. What is the intent of resolving this CIR: Students have accurate, current information on how to make a complaint or appeal, and staff handle complaints in line with the policy. Follow-up / Review Date 15/06/2027. An arrow points down at Send for Verification." loading="lazy"><figcaption>Sent to the Compliance Manager to verify. Select Send for Verification.</figcaption></figure></li>' +
        '<li>The item’s status changes to <b>Verify</b> (circled). The verifier is now the person responsible, and the due date is the follow-up date.' +
          '<figure class="shot" data-marks="10,75,4.6,11,oval,#"><img src="assets/img/cir-verify-status.png" alt="The Item List, showing the student handbook item: created by Admin Demo, with the status Verify circled, Ad Hoc, for the Compliance Manager, assigned 06/11/2026, Update the student handbook complaints and appeals process, tagged Student Support, Complaints and Policy, due 15/06/2027, Medium, and not yet verified." loading="lazy"><figcaption>The item, now with the Compliance Manager to verify (circled).</figcaption></figure></li>' +
        '<li>The verifier opens the item and checks the actions. To send it on, they select <b>Verify</b> and repeat step 3. Here, the Compliance Manager sends it to the Governance Lead to sign off.' +
          '<figure class="shot shot-medium" data-marks="82.4,93.4,arrow-down,small"><img src="assets/img/cir-verify-onward.png" alt="Complete Continuous Improvement Item for CI-2026-149, filled in by the Compliance Manager. Status Pathway is Verify, and Assign Verifier is the Governance Lead. What were the actions taken: Checked the published handbook against the Complaints and Appeals Policy. The response timeframes, contact details and external review process are correct, the same version is on the website and the learning platform, and all student services staff attended the briefing. What is the intent of resolving this CIR: Confirm the handbook is accurate before sign-off, so students and staff follow the current process. Follow-up / Review Date 15/06/2027. An arrow points down at Send for Verification." loading="lazy"><figcaption>The Compliance Manager sends it on to the Governance Lead.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="complete">Complete an item</h2>' +
      '<p>The person responsible, or the last verifier, completes the item.</p>' +
      '<ol class="steps-list">' +
        '<li>Open the item and select <b>Complete Item</b>.</li>' +
        '<li>Under <b>Status Pathway</b>, choose <b>Mark as Complete</b>. Describe the actions taken and the intent, and optionally set a follow-up date. Then select <b>Complete Item</b>.' +
          '<figure class="shot shot-medium" data-marks="85.9,91.9,arrow-down,small"><img src="assets/img/cir-verify-complete.png" alt="Complete Continuous Improvement Item for CI-2026-149, filled in by the Governance Lead. Status Pathway is Mark as Complete: the item will be marked as fully resolved. What were the actions taken: Reviewed the updated handbook and the Compliance Manager’s check, and approved the 2027 student handbook for use. What is the intent of resolving this CIR: Close the internal audit finding with an accurate, approved complaints and appeals process for students. Follow-up / Review Date 15/06/2027. An arrow points down at Complete Item." loading="lazy"><figcaption>The Governance Lead marks it complete. Select Complete Item.</figcaption></figure></li>' +
        '<li>The item shows as <b>Completed</b>. It records who completed it, with their signature, date and device, and the activity log shows each verification.' +
          '<figure class="shot shot-medium"><img src="assets/img/cir-verify-done.png" alt="Item CI-2026-149, Medium and Completed: Update the student handbook complaints and appeals process, Ad Hoc, created by Admin Demo, with the Governance Lead as person responsible, assigned and created 06/11/2026, due 15/06/2027. Verification requested by the Compliance Manager on 08/11/2026, and assigned to verify to the Governance Lead on 08/11/2026. Completed by the Governance Lead, with their signature, signed at Sun, 08/11/2026 13:09, from device Windows 10/11, Chrome. Completed date 08/11/2026. Tags Student Support, Complaints and Policy. Attachments Internal_Audit_Findings_Nov2026.pdf and Student_Handbook_2027_Draft.pdf. Actions taken: Reviewed the updated handbook and the Compliance Manager’s check, and approved the 2027 student handbook for use. Resolution intent: Close the internal audit finding with an accurate, approved complaints and appeals process for students. Review date 15/06/2027. The activity log lists, newest first: Completed, by the Governance Lead, 08 Nov 2026 13:09; Verification Assigned, by the Compliance Manager, reassigned to the Governance Lead, 13:06; and Verification Assigned, by the Student Services Coordinator, reassigned to the Compliance Manager, 13:00." loading="lazy"><figcaption>The completed item, with the Governance Lead’s signature and each round in the activity log.</figcaption></figure></li>' +
      '</ol>',

    'cir-export':
      '<p class="lead">Export the register for an audit, a governance meeting or your own records.</p>' +
      '<ol class="steps-list">' +
        '<li>Filter the register to the items you need. For example, to export the Compliance Manager’s completed items, choose the Compliance Manager under <b>Person Responsible</b>, and <b>Completed</b> under <b>Filters</b>. See <a href="article.html?id=cir-overview#find" target="_blank" rel="noopener">Find an item</a>.</li>' +
        '<li>Select <b>Export Excel</b>, then <b>Export with filters</b> to export only the items shown, or <b>Export all</b> for the whole register. Each option shows how many items it includes.' +
          '<figure class="shot" data-marks="1.1,9.6,20.1,6.4,oval,above,#1; 78.9,8.9,10.8,3.4,oval,#2"><img src="assets/img/cir-export-filters.png" alt="The Item List filtered to the Compliance Manager’s completed items, with Filters (2) and Person Responsible (1), circled as 1, showing 6 of 6 items. The Export Excel menu is open on Export with filters (6 items), circled as 2, and Export all (112 items). The six items are all Completed, from the Risk Register, created by Admin Demo, such as New Digital Enrolment Process - Further Staff Training, High, and Ensuring appropriate documentation of Conflict of Interest - Internal Audit - Identify gaps, Medium." loading="lazy"><figcaption>Filtered to the Compliance Manager’s completed items (1), then Export with filters (2).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>A register showing items raised from every source, with actions taken and verification recorded, is strong evidence of continuous improvement for an auditor.</span></div>',

    // ---- Dashboard & Profile ----
    'dash-tour':
      '<p class="lead">Your dashboard is the first page you see after signing in. It’s a live snapshot of your RTO: risk, improvement items, workforce readiness, documents and upcoming events each have a widget that brings forward what needs your attention.</p>' +
      '<h2 id="open">Open the dashboard</h2>' +
      '<p>Select <b>Dashboard</b> in the navigation bar (circled). The heading shows your team and your role in it, such as Executive Team - Manager.</p>' +
      '<figure class="shot" data-marks="0.3,13.6,7.3,3.9,oval,#"><img src="assets/img/gs-welcome-dashboard.png" alt="The Admin Dashboard, with Dashboard circled in the navigation bar. It shows a Risk Register Overview with missing treatments, responsibility gaps and overdue or missing dates, a Risk Level Breakdown bar chart and a Treatment Status Overview pie chart." loading="lazy"><figcaption>Select Dashboard in the navigation bar.</figcaption></figure>' +
      '<h2 id="widgets">What’s on the dashboard</h2>' +
      '<p>Each widget draws on one module, and shows only the items you’re allowed to see:</p>' +
      '<ul>' +
        '<li><b>Risk Register Overview</b>: risks with missing treatments, responsibility gaps, and overdue or missing dates, with a <b>Risk Level Breakdown</b> and a <b>Treatment Status Overview</b> (shown above). <b>Matrix Risks Identified</b> lists each risk with its category, risk level, proposed treatment and status, and can be filtered by level, status and category. See <a href="feature.html?m=risk">Risk Assessment</a>.' +
          '<figure class="shot"><img src="assets/img/dash-risks.png" alt="Matrix Risks Identified (27), with Risk Level, Status and Category filters. Each risk shows its category, description, risk level, proposed treatment and status, such as Ensuring we are properly prepared for reregistration, a High strategic risk In Progress, and Reliance on State Funding, a High financial risk Not started. Page 1 of 6." loading="lazy"><figcaption>Matrix Risks Identified, with filters for level, status and category.</figcaption></figure></li>' +
        '<li><b>Continuous Improvement Items</b>: your overdue and upcoming improvement items, with their due dates, priority and status. See <a href="feature.html?m=cir">Continuous Improvement Register</a>.' +
          '<figure class="shot"><img src="assets/img/dash-cir.png" alt="Continuous Improvement Items, with Overdue, Upcoming and All tabs. On Upcoming, CI-2026-105, TAS submission approved, due 10/10/2026, and CI-2026-107, a Master TAS submitted for review, due 13/10/2026, both Medium and Open." loading="lazy"><figcaption>Your overdue and upcoming improvement items.</figcaption></figure></li>' +
        '<li><b>Workforce</b>: pending admin actions, such as documents waiting for verification, units needing a response and overdue PD, and each trainer’s delivery readiness. Select a bar to see that trainer’s units. See <a href="feature.html?m=workforce">Workforce Management</a>.' +
          '<figure class="shot"><img src="assets/img/dash-workforce.png" alt="Workforce (16), with a search box. Pending Admin Actions: 2 documents pending verification, 1 unit needing admin response and 2 overdue PD. Delivery Readiness shows a bar for each trainer split into Approved Map, Draft and Action Required." loading="lazy"><figcaption>Pending admin actions and each trainer’s delivery readiness.</figcaption></figure></li>' +
        '<li><b>QMS Overview</b>: your total, approved, review-due and draft documents, any overdue reviews under <b>Review Alerts</b>, and your <b>Policy Compliance Health</b> score. See <a href="feature.html?m=qms">Document Management</a>.' +
          '<figure class="shot"><img src="assets/img/dash-qms.png" alt="QMS Overview for RTO Radar Demo: 5 total documents, 5 approved, 2 review due and 0 drafts. Review Alerts shows 2 overdue reviews. Policy Compliance Health is 54, Fair, on a scale of 0 to 39, 40 to 69 and 70 and above." loading="lazy"><figcaption>Your documents, review alerts and Policy Compliance Health.</figcaption></figure></li>' +
        '<li><b>Upcoming Events</b>: validations, consultations and improvement items due this week or fortnight. Switch between <b>1W</b> and <b>2W</b>, list and grid views, and filter by type. See <a href="feature.html?m=events">Events</a>.' +
          '<figure class="shot"><img src="assets/img/dash-events.png" alt="Upcoming Events - This Fortnight, with 1W and 2W, list and grid views, Filters, and 14 events. Each day shows its events, such as validations, consultations and improvement items for the TAS Builder and industry consultations." loading="lazy"><figcaption>The fortnight’s events, by day.</figcaption></figure></li>' +
      '</ul>' +
      '<div class="callout tip"><b>Tip</b><span>Select a card marked <b>Click to view</b>, or an item in a widget, to open the records behind it in their module.</span></div>' +
      '<h2 id="filter">Filter a widget</h2>' +
      '<p>Use the filter on a widget to narrow down the items it shows. For example, filter Matrix Risks Identified by category to see only your financial risks.</p>' +
      '<figure class="shot" data-marks="67,21.9,8.5,5.8,oval,#; 3.3,48.7,7.1,4.5,underline,#; 3.3,61.4,7.1,4.5,underline,#"><img src="assets/img/gs-dashboard-filter.png" alt="The Matrix Risks Identified widget, filtered by Category to Financial Risk, which is circled. The two remaining risks, Reliance on State Funding rated High and a cash-flow risk rated Medium, both have their Financial Risk category underlined." loading="lazy"><figcaption>Filtering by Financial Risk shows only the risks in that category.</figcaption></figure>' +
      '<h2 id="customise">Customise your dashboard</h2>' +
      '<ol class="steps-list">' +
        '<li>Select the gear icon at the top right of the dashboard. <b>Customise Dashboard</b> opens.</li>' +
        '<li>Tick the widgets you want to see, and untick the rest. Use the arrows beside a widget to move it up or down.</li>' +
        '<li>Select <b>Save</b>.' +
          '<figure class="shot" data-marks="92.55,13.65,3.45,6,oval,#; 93.3,30.5,arrow-down,small; 88.2,87.85,4.9,6.1,oval,#"><img src="assets/img/gs-dashboard-customise.png" alt="The Admin Dashboard with the Customise Dashboard menu open on top of it. The gear icon at the top right is circled, and an arrow points from it down to the menu, which lists widgets such as Risk Matrix Dashboard, Continuous Improvement, Workforce Statistics, Workforce Table and QMS Overview, each with a tick box and arrows to reorder it. The Save button at the bottom of the menu is circled." loading="lazy"><figcaption>Select the gear icon to open Customise Dashboard, choose your widgets, then select Save.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Admins choose which widgets are available to everyone in <b>Settings</b> › <b>Customisation</b>. See <a href="article.html?id=cust-dashboard-widgets">Choose dashboard widgets and Teams visibility</a>.</span></div>',

    'profile-open':
      '<p class="lead">Your profile holds your own details: your photo, name, email and password, your two-factor authentication, and the emails RTO Radar sends you.</p>' +
      '<h2 id="switch">Switch organisations</h2>' +
      '<p>If you belong to more than one RTO, select your RTO’s name at the top right (1). Under <b>Switch Organisation</b> (2), choose the RTO to work in. A tick shows the one you’re in, with your role in each RTO below its name. <b>Choose organisation</b> opens the full list.</p>' +
      '<figure class="shot" data-marks="70.4,3,10.9,15,oval,above,#1; 49.6,20.4,33.9,70,zone,#2"><img src="assets/img/switch-org.png" alt="The Admin Dashboard for the Executive Team and System Default, both as Manager. RTO Radar Demo at the top right is circled as 1, and its Switch Organisation menu is outlined as 2: Demo Training College, RTO Radar Demo, ticked, Demo Skills Institute and Demo Community College, each as Administrator, then Choose organisation." loading="lazy"><figcaption>Select your RTO’s name (1), then choose an RTO under Switch Organisation (2).</figcaption></figure>' +
      '<p>Your dashboard, data and email notifications are separate for each RTO.</p>' +
      '<h2 id="open">Open your profile</h2>' +
      '<p>Select your email address at the top right (1), then <b>Profile</b> (2). <b>Logout</b> signs you out.</p>' +
      '<figure class="shot" data-marks="81.9,1.1,16.8,4.8,oval,#1; 83.4,12.2,15.4,4.6,oval,#2"><img src="assets/img/profile-menu.png" alt="The Admin Dashboard, with admindemo@rtoradar.com.au at the top right circled as 1, and its My Account menu open, with Profile circled as 2 and Logout below it." loading="lazy"><figcaption>Select your email address (1), then Profile (2).</figcaption></figure>' +
      '<p>The top of the page shows your photo or initials, name and email, your role, such as Administrator, and your team and your role in it, such as Executive Team, Manager. Below are four tabs:</p>' +
      '<figure class="shot" data-marks="34.5,79.6,#1; 44.8,79.6,#2; 53.3,79.6,#3; 62.7,79.6,#4"><img src="assets/img/profile-open.png" alt="The profile of Admin Demo, admindemo@rtoradar.com.au, Administrator, Manager of the Executive Team, with AD as their initials. Below are the Edit Profile, Multi RTO Setup, MFA and Email Notifications tabs, numbered 1 to 4." loading="lazy"><figcaption>Your profile’s four tabs (1–4).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Edit Profile</h4><p>Your photo, name, email, RTO name and password. See <a href="#photo">Upload a profile picture</a>, <a href="#edit">Edit your information</a> and <a href="#password">Change your password</a> below.</p></li>' +
        '<li><h4>Multi RTO Setup</h4><p>If you belong to more than one RTO, your profile details for each one.</p></li>' +
        '<li><h4>MFA</h4><p>Your two-factor authentication and trusted devices. See <a href="article.html?id=mfa-set-organisation">Set up MFA for your organisation</a>.</p></li>' +
        '<li><h4>Email Notifications</h4><p>Which emails RTO Radar sends you. See <a href="article.html?id=profile-notifications">Choose your email notifications</a>.</p></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Your role and team are set by an Admin in <b>Settings</b> › <b>User Management</b>, not on your profile. See <a href="feature.html?m=users">Users, Roles &amp; Teams</a>.</span></div>' +
      '<h2 id="photo">Upload a profile picture</h2>' +
      '<p>On the <b>Edit Profile</b> tab, under <b>Profile Picture</b>, select <b>Upload photo</b> (circled) and choose a PNG, JPG, WEBP or GIF up to 2 MB. Your photo shows across the workforce and wherever your profile appears. Until you add one, your initials show.</p>' +
      '<figure class="shot" data-marks="13.3,52.3,15.4,19.8,oval,#"><img src="assets/img/profile-photo.png" alt="Profile Picture: shown across the workforce and wherever your profile appears. The initials AD, and Upload photo, circled, for a PNG, JPG, WEBP or GIF up to 2 MB." loading="lazy"><figcaption>Select Upload photo (circled).</figcaption></figure>' +
      '<h2 id="edit">Edit your information</h2>' +
      '<p>Under <b>Profile Information</b>, update your <b>First Name</b>, <b>Last Name</b>, <b>Email</b> or <b>RTO Name</b>, then select <b>Update Profile</b>.</p>' +
      '<figure class="shot" data-marks="91.4,85.8,arrow-down,small"><img src="assets/img/profile-info.png" alt="Profile Information: update your personal information and RTO details. First Name Admin, Last Name Demo, Email admindemo@rtoradar.com.au, with a note that email changes require confirmation, and RTO Name RTO Radar Demo. Change Password and Update Profile are at the bottom, with an arrow pointing down at Update Profile." loading="lazy"><figcaption>Update your details, then select Update Profile.</figcaption></figure>' +
      '<div class="callout note"><b>Note</b><span>Only Admins whose role includes the <b>Brand Customisation</b> permission can change the <b>RTO Name</b>. It changes the name for everyone in your RTO.</span></div>' +
      '<h2 id="password">Change your password</h2>' +
      '<ol class="steps-list">' +
        '<li>Under <b>Profile Information</b>, select <b>Change Password</b>.</li>' +
        '<li>Enter your <b>Current Password</b>, then your <b>New Password</b> twice, under <b>New Password</b> and <b>Confirm New Password</b>. Then select <b>Update Password</b>.' +
          '<figure class="shot" data-marks="90.3,85,arrow-down,small"><img src="assets/img/profile-password.png" alt="Change Password: update your account password for security. Current Password, New Password and Confirm New Password are filled in, hidden as dots. An arrow points down at Update Password." loading="lazy"><figcaption>Enter your current and new password, then select Update Password.</figcaption></figure></li>' +
      '</ol>',

    'profile-notifications':
      '<p class="lead">Choose which emails RTO Radar sends you on the <b>Email Notifications</b> tab of your profile. Turn a switch off to stop receiving that email.</p>' +
      '<div class="callout tip"><b>Tip</b><span>Your choices here override everything else. For example, if you turn off <b>Feedback and complaints notifications</b>, you won’t be emailed when an Admin assigns you a Complaints &amp; Suggestions submission.</span></div>' +
      '<h2 id="recurring">Recurring reminders</h2>' +
      '<p>These are only sent when your RTO has turned them on.</p>' +
      '<table><thead><tr><th>Email</th><th>What it’s for</th></tr></thead><tbody>' +
        '<tr><td>Monthly continuous improvement report</td><td>One email each month listing every CI item you’re responsible for, grouped into overdue, due soon and open.</td></tr>' +
        '<tr><td>Continuous improvement due date reminders</td><td>Reminders as your CI items approach their due date, and while they’re overdue.</td></tr>' +
        '<tr><td>Document review reminders</td><td>Reminders when a QMS document you own or review is approaching its review due date.</td></tr>' +
        '<tr><td>Evidence map renewal reminders</td><td>Reminders ahead of the 12-month renewal date of an approved evidence map you own or manage.</td></tr>' +
        '<tr><td>Workforce document expiry reminders</td><td>Reminders when your own documents, or those of staff you manage, are approaching expiry.</td></tr>' +
        '<tr><td>Monthly risk register report <i>(required)</i></td><td>Sent to your RTO’s Escalation Manager.</td></tr>' +
      '</tbody></table>' +
      '<h2 id="activity">Activity notifications</h2>' +
      '<table><thead><tr><th>Email</th><th>When it’s sent</th></tr></thead><tbody>' +
        '<tr><td>Continuous improvement assignments</td><td>When a CI item is assigned to you as the responsible person.</td></tr>' +
        '<tr><td>Professional development assignments</td><td>When you’re assigned to a PD session, with a calendar invitation.</td></tr>' +
        '<tr><td>Document reviewer assignments</td><td>When you’re nominated as the reviewer of a QMS document.</td></tr>' +
        '<tr><td>Document verification outcomes</td><td>When one of your uploaded documents is rejected or needs replacing.</td></tr>' +
        '<tr><td>Feedback and complaints notifications</td><td>When a feedback or complaint submission is assigned to you.</td></tr>' +
        '<tr><td>Calendar event invitations</td><td>When you’re added to an event, with a calendar invitation.</td></tr>' +
        '<tr><td>RTO Radar platform updates</td><td>Occasional emails about new features and improvements.</td></tr>' +
        '<tr><td>New high risk alerts <i>(required)</i></td><td>Sent straight away to the Escalation Manager when a new high or extreme risk is recorded.</td></tr>' +
      '</tbody></table>' +
      '<div class="callout note"><b>Note</b><span>Emails marked <b>Required</b> can’t be turned off. Your choices apply to the current RTO only: if you belong to more than one RTO, set them separately for each one.</span></div>',

    // ---- Workforce Management ----
    'wf-overview':
      '<p class="lead">Workforce Management is where you look after your staff: their profiles and documents, the courses and units they deliver, their professional development, and whether they’re ready to deliver.</p>' +
      '<h2 id="open">Open Workforce Management</h2>' +
      '<p>Select <b>Workforce Management</b> on your navigation bar (circled). The page opens on the <b>Workforce</b> tab. Around the page you’ll see:</p>' +
      '<figure class="shot" data-marks="1,38.6,11.2,3.8,oval,#; 78.3,17.4,7,4.4,oval,#1; 88,17.4,8.4,4.4,oval,above,#2; 86.6,32.8,10.6,5,oval,#3"><img src="assets/img/wf-landing.png" alt="Workforce Management, circled on the navigation bar, open on the Workforce tab beside Workforce Dashboard, Teams, Document Checklist and Search. Export is circled as 1 and a greyed-out Assign Training button as 2 at the top right, with User Management circled as 3 below them. The Workforce list has a search box and Trainers (3), Admin (9) and All (12), listing Ken Lombardo, John Doe and Staff Demo. On the right: Select a Trainer, choose a trainer from the list to view their profile and details." loading="lazy"><figcaption>Export (1), Assign Training (2) and User Management (3).</figcaption></figure>' +
      '<ol>' +
        '<li><b>Export</b>, which downloads workforce reports. See <a href="article.html?id=wf-export">Export workforce reports</a>.</li>' +
        '<li><b>Assign Training</b>, which assigns courses and units to the staff member you’re viewing. See <a href="article.html?id=wf-assign-units">Assign courses and units to a trainer</a>.</li>' +
        '<li><b>User Management</b>, which opens User Management, where you invite staff and manage their roles and teams. See <a href="article.html?id=users-overview">The User Management page</a>.</li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Assign Training is greyed out until you select a staff member on the Workforce tab, because it assigns training to the person you’re viewing.</span></div>' +
      '<h2 id="tabs">The five tabs</h2>' +
      '<p>Workforce Management has five tabs. Select a tab below to see what each one is for.</p>' +
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
          '<figure class="shot" data-marks="19,33.4,5.4,4,oval,above,#1; 20.2,55.8,22.4,6.4,oval,right,#2"><img src="assets/img/wf-landing.png" alt="Workforce Management on the Workforce tab, circled as marker 1. The Workforce list has a search box and three options, Trainers (3), Admin (9) and All (12), which are circled as marker 2. Trainers is selected, listing Ken Lombardo, John Doe and Staff Demo. On the right, Select a Trainer: choose a trainer from the list to view their profile and details." loading="lazy"><figcaption>On the Workforce tab (1), choose Trainers, Admin or All (2).</figcaption></figure></li>' +
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
      '<div class="callout note"><b>Note</b><span>An Admin with the right permissions and teams can manage every staff member’s documents in Workforce Management, including their own. Staff can only view their own documents, in <b>My Documents</b>. Depending on their permissions, they may also be able to view QMS documents in Document Management, or Workforce documents. See <a href="feature.html?m=workforce#faq">the Workforce Management FAQ</a>.</span></div>' +
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
          '<figure class="shot" data-marks="78.8,93.3,arrow-down,small; 85.8,93.3,arrow-down,small"><img src="assets/img/wf-doc-verify.png" alt="Action Required for a webinar certificate: the PDF shown on the page with a Download button, a certificate of participation presented to Staff Demo, then the Document Description, Document Details with issue and completion dates of 17/03/2026, a Verification Notes box, and Reject, Approve and Delete buttons. Arrows point down at Reject and Approve." loading="lazy"><figcaption>A Pending document opened for verification.</figcaption></figure>' +
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
          '<figure class="shot" data-marks="35.1,90.3,arrow-left"><img src="assets/img/wf-landing.png" alt="The Workforce tab in Workforce Management, listing three trainers: Ken Lombardo, John Doe and Staff Demo. An arrow points left at Staff Demo." loading="lazy"><figcaption>Select the trainer, such as Staff Demo here.</figcaption></figure></li>' +
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
      '<div class="callout tip"><b>Tip</b><span>Assign units before you generate the evidence map. The map is built from the units assigned here.</span></div>' +
      '<h2 id="trainer-view">What the trainer sees</h2>' +
      '<p>In the Trainer/Assessor portal, <b>My Courses</b> lists the courses assigned to them, with each course’s units, team, status and the date it was assigned. They can search and filter by status. Selecting <b>Manage Course</b> opens the course’s <b>Assigned Units</b>.</p>' +
      '<figure class="shot"><img src="assets/img/wf-trainer-courses.png" alt="Staff Demo’s assigned courses: CHC22015 Certificate II in Community Services, 2 of 2 units, Community and Health, Assigned, 06/10/2026; CPC50220 Diploma of Building and Construction (Building), Construction, Assigned, 06/10/2026; BSB50120 Diploma of Business, 3 of 3 units, Business Faculty, In Progress, 08/10/2026; and CHC50121 Diploma of Early Childhood Education and Care, 2 of 2 units, Community and Health, In Progress, 16/03/2026. Each has a Manage Course button." loading="lazy"><figcaption>A trainer’s assigned courses, with their status.</figcaption></figure>' +
      '<p><b>Assigned Units</b> shows each unit with its evidence map, completed and scheduled unit validations, validation due date and priority, the date it was assigned and its status. From here they can:</p>' +
      '<ul>' +
        '<li>Select <b>Create Map</b> or <b>Edit Map</b> to work on the unit’s evidence map. A map that needs changes shows <b>Needs Revision</b>.</li>' +
        '<li>View <svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> or download <svg class="ui-icon" viewBox="0 0 24 24" aria-label="download" role="img"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg> a completed validation.</li>' +
        '<li>Select <b>+</b> under <b>Unit Validations</b> to start a scheduled validation.</li>' +
      '</ul>' +
      '<figure class="shot"><img src="assets/img/wf-trainer-units.png" alt="Assigned Units, with a search box and an All Maps filter. BSBTWK502 Manage team effectiveness has Create Map, a + button under Unit Validations, a validation due 05/11/2026 with Low priority, assigned 08/10/2026 and Assigned. CHCECE046 Implement strategies for the inclusion of all children has Edit Map marked Needs Revision, a completed validation from 26/10/2026 with view and download buttons, Unit Validations Completed, assigned 16/03/2026 and In Progress." loading="lazy"><figcaption>A trainer’s assigned units, with their evidence maps and validations.</figcaption></figure>' +
      '<p>See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a>.</p>',

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
    // ---- Users, Roles & Teams ----
    'users-overview':
      '<p class="lead">User Management is where you add your staff, decide what each person can do, and organise them into teams. A person’s <b>role</b> sets what they can do. Their <b>team</b> sets whose records they can do it to.</p>' +
      '<h2 id="open">Open User Management</h2>' +
      '<p>Go to <b>Settings</b> › <b>User Management</b>.</p>' +
      '<figure class="shot" data-marks="0.7,91.7,5.5,5.2,oval,right,#1; 43.2,50.4,8.7,4.8,oval,above,#2"><img src="assets/img/users-open.png" alt="Organisation Settings for RTO Radar Demo, signed in as admindemo@rtoradar.com.au, with the User Management tab open on Staff. Settings in the navigation bar is circled as marker 1, and the User Management tab as marker 2. Below are the Staff, User Roles and Teams Configuration tabs." loading="lazy"><figcaption>Select Settings (1), then User Management (2).</figcaption></figure>' +
      '<h2 id="tabs">The three tabs</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Staff</h4><p>Everyone in your organisation, with their role, team and team role. Add, invite and manage people here. See <a href="article.html?id=users-invite">Add a user</a> and <a href="article.html?id=users-manage">Find and manage staff</a>.</p></li>' +
        '<li><h4>User Roles</h4><p>Your organisation’s roles and the role templates to start from. See <a href="article.html?id=users-roles">Organisation roles and role templates</a>.</p></li>' +
        '<li><h4>Teams Configuration</h4><p>Your teams, their parent teams and members, and the Compliance Governance Chart. See <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</p></li>' +
      '</ol>' +
      '<h2 id="together">How roles and teams work together</h2>' +
      '<p>Keep roles few and based on the job, and let teams separate the work. Two heads of faculty can share one role and sit in different teams. Each then manages only their own faculty’s courses, TAS, trainers and validations. See <a href="article.html?id=users-plan-roles">Plan roles and permissions for your RTO</a>.</p>' +
      '<div class="callout note"><b>Note</b><span>Only people whose role includes the <b>User Management</b> permission can open this page, usually Administrators.</span></div>',

    'users-invite':
      '<p class="lead">Add each staff member with their role and team. Invite people who need to sign in, or add them as a silent user to track their compliance without giving them access.</p>' +
      '<h2 id="add">Add a user</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Staff</b> tab, select <b>Add New User</b>.' +
          '<figure class="shot" data-marks="1.9,74.5,12.5,17.9,oval,#"><img src="assets/img/users-add-button.png" alt="User Management on the Staff tab, beside User Roles and Teams Configuration. The Add New User button is circled." loading="lazy"><figcaption>Select Add New User (circled).</figcaption></figure></li>' +
        '<li>Enter their <b>First Name</b>, <b>Last Name</b> and <b>Email</b>.</li>' +
        '<li>Choose their <b>User Role</b>. It defaults to Trainer/Assessor.</li>' +
        '<li>Choose their <b>Team</b>. Leave it as <b>System Default (no team)</b> to assign them later.' +
          '<figure class="shot shot-small" data-marks="59.4,89.3,29.5,5.4,oval,#"><img src="assets/img/users-add-form.png" alt="Create New User filled in for Design Manager: first name Design, last name Manager, email designmanager@rtoradar.com.au, user role Head of Faculty and team Learning Design. Silent user is off, and Send Invitation is circled." loading="lazy"><figcaption>Design Manager, invited as a Head of Faculty in Learning Design. Select Send Invitation (circled).</figcaption></figure></li>' +
        '<li>Select <b>Send Invitation</b>. They receive an email to set up their sign-in.</li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Using aXcelerate? You can import your trainers from it instead, and invite them or add them silently. See <a href="article.html?id=connect-axcelerate#import-trainers">Import Trainers</a>.</span></div>' +
      '<h2 id="silent">Add a silent user</h2>' +
      '<p>A silent user has a profile but can’t sign in and isn’t emailed. Use it for staff whose credentials and compliance you track but who don’t use RTO Radar, or to set someone up before inviting them.</p>' +
      '<ol class="steps-list">' +
        '<li>Fill in the form as above, then turn on <b>Silent user (no login access)</b>.' +
          '<figure class="shot shot-small" data-marks="80.4,68.6,12.7,4.5,oval,#; 60.6,90.8,30.2,4.8,oval,#"><img src="assets/img/users-add-silent.png" alt="Create New User for New Starter Demo, newstarter@rtoradar.com.au, role Trainer/Assessor, team left as System Default. Silent user (no login access) is turned on and circled, and a message says they’ll be created for compliance tracking only, won’t receive an invitation email and won’t be able to log in. Create Profile is circled." loading="lazy"><figcaption>New Starter Demo, added as a silent user. Turn on Silent user, then select Create Profile (both circled).</figcaption></figure></li>' +
        '<li>Select <b>Create Profile</b>. They show as <b>Compliance Only</b> on the Staff tab.</li>' +
      '</ol>' +
      '<p>Ready to give them access? Select <b>⋮</b> › <b>Send Invitation</b> on their row. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</p>',

    'users-manage':
      '<p class="lead">The Staff tab lists everyone in your organisation. Find people by name, email or role, and change their role or team.</p>' +
      '<figure class="shot"><img src="assets/img/users-staff-list.png" alt="The Staff tab, page 2 of 2, 16 records. Each person shows their name, a Compliance Only tag for silent users, email, user role, team name, team role and when they were created. Quality Assurance Manager is a TAS Reviewer and Compliance Officer an Administrator, both Team Members in Compliance and Validation. Compliance Manager is Team Manager of both Compliance and Validation and System Default. CEO Demo is Team Manager of the Executive Team. Admin Demo and Governance Lead are Administrators and Team Members in System Default." loading="lazy"><figcaption>The Staff tab. Silent users are tagged Compliance Only.</figcaption></figure>' +
      '<p>Someone in more than one team shows each team, with their role in it, such as the Compliance Manager, who manages both Compliance &amp; Validation and System Default.</p>' +
      '<h2 id="find">Find staff</h2>' +
      '<p>Search by name, email or role, or filter the list by role.</p>' +
      '<figure class="shot" data-marks="2,3.5,79.5,22.5,zone,#1; 82.3,3.5,15.5,22.5,zone,#2"><img src="assets/img/users-staff-search.png" alt="The Staff tab with Design typed in the search box, outlined as 1, and the role filter set to Head of Faculty, outlined as 2. One person matches: Design Manager, marked Pending, designmanager@rtoradar.com.au, Head of Faculty, Team Manager of Learning Design." loading="lazy"><figcaption>Searching for “Design” (1) among Heads of Faculty (2).</figcaption></figure>' +
      '<p>The filter offers <b>All Users</b>, <b>Admin Roles</b> and <b>Trainer / Assessor Roles</b>, then each of your organisation’s roles. Someone marked <b>Pending</b> has been invited but hasn’t yet accepted.</p>' +
      '<h2 id="actions">Staff actions</h2>' +
      '<ol class="steps-list">' +
        '<li>Scroll the list to the right, using the scrollbar below it, to reach the <b>Actions</b> column.</li>' +
        '<li>Select <b>⋮</b> on the person’s row.' +
          '<figure class="shot" data-marks="6.2,87.3,89.8,8.8,oval,#; 62,80.5,arrow-right,small,#1; 91.6,72,2.4,6.5,oval,right,#2"><img src="assets/img/users-staff-menu.png" alt="Three rows of the Staff tab: Staff Demo, IT Faculty Manager and Design Manager. The scrollbar below the list is circled, with an arrow, 1, pointing right. The ⋮ on Design Manager’s row is circled as 2, and its menu is open: View Details, Assign Role, Assign Team, Reset Password, marked with an asterisk, and Delete User." loading="lazy"><figcaption>Scroll right (1), then select ⋮ on the row (2). *Depending on the account’s status, this can say <span style="color:#ff715b">Reset Password</span>, <span style="color:#16507e">Send Invitation</span> or <span style="color:#1e5582">Resend Invitation</span>.</figcaption></figure></li>' +
      '</ol>' +
      '<p>The menu has these actions:</p>' +
      '<ol class="ov-list">' +
        '<li><h4>View Details</h4><p>Their name, email, role, organisation, account type and every permission their role gives them. The account type is <b>Active User</b> for someone who can sign in, or <b>Compliance Only (No Login)</b> for a silent user.</p>' +
          '<figure class="shot shot-medium"><img src="assets/img/users-staff-details.png" alt="Staff Member Details for Staff Demo: first name Staff, last name Demo, email staffdemo@rtoradar.com.au, user role Trainer/Assessor, organisation RTO Radar Demo, account type Active User, created 12 months ago." loading="lazy"><figcaption>Staff Demo’s details. Their permissions are listed further down.</figcaption></figure></li>' +
        '<li><h4>Assign Role</h4><p>Change their role. Their permissions change straight away.</p>' +
          '<figure class="shot shot-small" data-marks="5.5,74,89,8,oval,#; 69.8,88,24.4,7.8,oval,#"><img src="assets/img/users-assign-role.png" alt="Assign User Role for Staff Demo, staffdemo@rtoradar.com.au. The current role is Trainer/Assessor, and Change to is set to Training Coordinator, circled. Assign Role is circled." loading="lazy"><figcaption>Choose the new role, then select Assign Role (both circled).</figcaption></figure></li>' +
        '<li><h4>Assign Team</h4><p>Tick each team they belong to, and choose whether they’re a <b>Team Member</b> or <b>Team Manager</b> in it. Changes apply straight away.</p>' +
          '<figure class="shot shot-small" data-marks="5.5,55,87,15,zone,#"><img src="assets/img/users-assign-team.png" alt="Assign User to Teams for Staff Demo. Each team has a tick box and a role. Business Faculty and Community and Health are ticked as Team Member, and are outlined. A note says to tick a team, then pick the role, and that changes apply instantly." loading="lazy"><figcaption>Tick each team and choose their role in it. Changes apply straight away.</figcaption></figure></li>' +
        '<li><h4><img src="assets/img/users-tag-reset.png" alt="Reset Password" style="height:1.5em;width:auto;vertical-align:middle;display:inline;margin:0 2px;border-radius:6px">, <img src="assets/img/users-tag-send.png" alt="Send Invitation" style="height:1.5em;width:auto;vertical-align:middle;display:inline;margin:0 2px;border-radius:6px"> or <img src="assets/img/users-tag-resend.png" alt="Resend Invitation" style="height:1.5em;width:auto;vertical-align:middle;display:inline;margin:0 2px;border-radius:6px"></h4><p>For someone who can sign in, <b>Reset Password</b> emails them a single-use link to set a new password. Enter the reason, which is recorded in the security audit log, then select <b>Send Reset Email</b>. Their current sessions stay active.</p>' +
          '<figure class="shot shot-small" data-marks="66.8,90,29.5,7.6,oval,#"><img src="assets/img/users-reset-password.png" alt="Reset User Password for Staff Demo. The reason for the password reset is User forgot password, which will be recorded in the security audit log. A note says the user will receive an email with a secure link and their current sessions will remain active. Send Reset Email is circled." loading="lazy"><figcaption>Enter the reason, then select Send Reset Email (circled).</figcaption></figure>' +
          '<p>The link can only be used once. If they see an “expired” message, ask them to try signing in with their new password before you send another.</p>' +
          '<p>For a silent user, <b>Send Invitation</b> appears instead. For someone invited who hasn’t yet accepted, marked <b>Pending</b>, it’s <b>Resend Invitation</b>.</p>' +
          '<div class="callout note"><b>Note</b><span>To change your own password, use your profile instead. See <a href="article.html?id=profile-open#password">Change your password</a>.</span></div></li>' +
        '<li><h4>Delete User</h4><p>Deleting someone can’t be undone. First move their work to other staff, so nothing is left without an owner.</p>' +
          '<ol class="steps-list">' +
            '<li>Select <b>Reassign Duties</b>. <b>Delete</b> stays unavailable until their work is reassigned.' +
              '<figure class="shot shot-small" data-marks="5,62.5,90.5,9,oval,#"><img src="assets/img/users-delete.png" alt="Delete Staff Member for Staff Demo, Trainer/Assessor, with a warning that it cannot be undone. Reassign Duties is circled, with a note that reassignments must be reviewed and confirmed before deletion. Delete is greyed out." loading="lazy"><figcaption>Select Reassign Duties (circled).</figcaption></figure></li>' +
            '<li>In <b>Data Migration</b>, choose who takes over their work. Use <b>Reassign All Items</b> to give everything to one person, or reassign each item on its tab: improvement items, units, courses, risks, files, industry evidence, validation and consultation schedules, and feedback actions.' +
              '<figure class="shot" data-marks="2.4,21.5,49.8,6.5,zone,#; 54.5,24.8,#1; 10,32.3,15.5,4,underline,#2; 85.4,49,9.5,10,oval,above,#3"><img src="assets/img/users-delete-migrate.png" alt="Data Migration for Staff Demo. Reassign All Items, outlined as 1, has a person, a role filter and Apply to All (40 items). Tabs, underlined as 2, show CI (14), Units (14), Courses (5), Risk (0), Files (0), Industry Evidence (0), Val Sched (3), Consult Sched (3) and Feedback Actions (1). The CI tab lists overdue improvement items, each with a Reassign To person, the first circled as 3. A warning says items not reassigned will have their owner set to Unassigned or be deleted. Save Reassignments (7)." loading="lazy"><figcaption>Reassign everything at once (1), or each item on its tab (2) using Reassign To (3).</figcaption></figure>' +
              '<div class="callout warn"><b>Important</b><span>Anything you don’t reassign has its owner set to Unassigned, or is deleted. Check every tab before you save.</span></div></li>' +
            '<li>Select <b>Save Reassignments</b>, then <b>Delete</b>.</li>' +
          '</ol></li>' +
      '</ol>' +
      '<h2 id="bulk">Assign several people to a team</h2>' +
      '<ol class="steps-list">' +
        '<li>Tick the box before each person, or the box in the header to select everyone listed. A bar shows how many are selected. Select <b>Assign to Team</b>.' +
          '<figure class="shot" data-marks="3.1,46.5,2.5,53,oval,#1; 84.4,17.8,13,8.4,oval,above,#2"><img src="assets/img/users-bulk-select.png" alt="The Staff tab searched for Trainer, with Trainer Three, Trainer Two and Trainer One ticked, circled together as 1. A bar reads 3 staff members selected, with Clear and Assign to Team, circled as 2." loading="lazy"><figcaption>Tick each person (1), then select Assign to Team (2).</figcaption></figure></li>' +
        '<li>Choose the <b>Team</b> and their <b>Role on this team</b>.</li>' +
        '<li>Choose the <b>Behaviour</b>:' +
          '<ul>' +
            '<li><b>Add to team</b> keeps each person’s other team memberships.</li>' +
            '<li><b>Replace memberships</b> removes them from their other teams first.</li>' +
          '</ul>' +
          '<figure class="shot shot-small" data-marks="65.5,89.4,29.5,7.2,oval,#"><img src="assets/img/users-bulk-assign.png" alt="Assign to Team, for 3 people in one step. Team is IT Faculty, the role on this team is Team Member, and Behaviour is set to Add to team, keeping each person’s other team memberships, rather than Replace memberships. Assign 3 people is circled." loading="lazy"><figcaption>Adding three trainers to the IT Faculty as Team Members, keeping their other teams. Select Assign 3 people (circled).</figcaption></figure></li>' +
        '<li>Select <b>Assign</b>. The button shows how many people you selected, such as <b>Assign 3 people</b>.</li>' +
      '</ol>',

    'users-roles':
      '<p class="lead">A role is a set of permissions: what someone can view, create, edit and delete in each feature. Your organisation’s roles are on the <b>User Roles</b> tab, with templates to start new ones from. See <a href="article.html?id=users-permissions">What each permission covers</a>.</p>' +
      '<h2 id="open">Open User Roles</h2>' +
      '<p>Go to <b>Settings</b> › <b>User Management</b>, then select the <b>User Roles</b> tab.</p>' +
      '<figure class="shot" data-marks="30.1,37.6,13.2,8.8,oval,above,#1; 21.2,85.5,18,8.8,oval,right,#2"><img src="assets/img/users-roles-open.png" alt="Organisation Settings with the User Management tab, circled as 1, and below it the User Roles tab, circled as 2, between Staff and Teams Configuration." loading="lazy"><figcaption>Select User Management (1), then User Roles (2).</figcaption></figure>' +
      '<h2 id="org">Organisation roles</h2>' +
      '<p>Each role shows how many users have it and whether it’s active.</p>' +
      '<figure class="shot"><img src="assets/img/users-roles-list.png" alt="Organisation Roles, each with its description, number of users and status: Administrator 5, Compliance Officer 0, Head of Faculty 2, Quality Auditor 1, Record Keeper 1, TAS Reviewer 1, Trainer/Assessor 5 and Training Coordinator 1, all Active." loading="lazy"><figcaption>RTO Radar Demo’s roles, with how many people have each.</figcaption></figure>' +
      '<p>Select <b>⋮</b> on a role to <b>Edit</b> its permissions or <b>Delete</b> it. A role can’t be deleted while people have it.</p>' +
      '<figure class="shot" data-marks="93.4,18.5,2.6,17,oval,#1; 85.5,44,10.8,51,zone,#"><img src="assets/img/users-role-menu.png" alt="The ⋮ on the Head of Faculty role, circled as 1, with its menu open: Edit, and Delete greyed out because two people have the role. The menu is outlined." loading="lazy"><figcaption>Head of Faculty has 2 users, so Delete is greyed out.</figcaption></figure>' +
      '<h2 id="templates">Role templates</h2>' +
      '<p>Templates are ready-made roles for common jobs in an RTO. Start from the closest one, then remove the permissions the job doesn’t need.</p>' +
      '<figure class="shot"><img src="assets/img/users-role-templates.png" alt="Role Templates: Administrator, Compliance Officer, Quality Auditor, Record Keeper, Staff, TAS Builder, TAS Reviewer, Trainer/Assessor and Training Coordinator, each with a short description and a Template tag." loading="lazy"><figcaption>The nine role templates.</figcaption></figure>' +
      '<ol class="steps-list">' +
        '<li>Select <b>From Template</b>, then the template.' +
          '<figure class="shot" data-marks="71.8,32.3,15.8,7.6,oval,above,#1; 69.3,40.8,18.3,56.5,zone,#"><img src="assets/img/users-from-template.png" alt="The User Roles tab with From Template, circled as 1, open to list the templates, outlined: Administrator, Compliance Officer, Quality Auditor, Record Keeper, Staff, TAS Builder, TAS Reviewer, Trainer/Assessor and Training Coordinator." loading="lazy"><figcaption>Select From Template (1), then the template.</figcaption></figure></li>' +
        '<li><b>Create Role from Template</b> opens with the template’s name, description and permissions filled in. Change the name or description if you like.' +
          '<figure class="shot shot-medium"><img src="assets/img/users-template-name.png" alt="Create Role from TAS Reviewer Template, to customise the template permissions for your organisation. Role Name is TAS Reviewer, and the description reads Full administrator access with TAS Builder and Review permissions, excluding Settings." loading="lazy"><figcaption>A role being created from the TAS Reviewer template.</figcaption></figure></li>' +
        '<li>Check its permissions, and untick anything the job doesn’t need. For what each one allows, see <a href="article.html?id=users-permissions">What each permission covers</a>.' +
          '<div class="callout tip"><b>Tip</b><span>The <b>TAS Reviewer</b> template includes <b>TAS Builder</b> as well as <b>TAS Builder Review</b>. Untick TAS Builder’s Create and Edit so reviewers can’t approve a TAS they built themselves.</span></div></li>' +
        '<li>Select <b>Activate Role</b>. Its permissions take effect once you assign it to people.' +
          '<figure class="shot shot-medium" data-marks="81,54.5,16.5,30,oval,#"><img src="assets/img/users-template-activate.png" alt="A note that permissions defined here only take effect once this role is assigned to users, with Cancel and Activate Role. Activate Role is circled." loading="lazy"><figcaption>Select Activate Role (circled).</figcaption></figure></li>' +
      '</ol>',

    'users-permissions':
      '<p class="lead">Each permission can allow <b>View</b>, <b>Create</b>, <b>Edit</b> and <b>Delete</b>. Where an action doesn’t apply, the form shows a dash. The <b>Trainer / Assessor</b> set offers only the permissions marked in the last column. What someone can reach is also limited by their team. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
      '<h3>Core Features</h3>' +
      '<table><thead><tr><th>Permission</th><th>What it covers</th><th>Actions</th><th>Trainer set</th></tr></thead><tbody>' +
        '<tr><td>Dashboard</td><td>The main dashboard and its widgets</td><td>View</td><td>Yes</td></tr>' +
        '<tr><td>QMS Documents</td><td>Your quality management system documents: upload, map to standards, new versions and archive</td><td>View, Create, Edit, Delete</td><td>Yes, without Delete</td></tr>' +
        '<tr><td>Program Management</td><td>Courses and programs, their units, risk assessments and validations</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>My Courses</td><td>The person’s own course and unit assignments, and their unit evidence</td><td>View, Create, Edit</td><td>Trainer set only</td></tr>' +
        '<tr><td>Continuous Improvement</td><td>The Continuous Improvement Register and its items</td><td>View, Create, Edit, Delete</td><td>Yes</td></tr>' +
        '<tr><td>Events</td><td>The organisation calendar and scheduling events</td><td>View, Create, Edit, Delete</td><td>Yes</td></tr>' +
        '<tr><td>TAS Builder</td><td>Building and managing Master and Cohort TAS</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>TAS Builder Review</td><td>Reviewing, approving or declining TAS submissions</td><td>View, Edit, Delete</td><td>No</td></tr>' +
      '</tbody></table>' +
      '<h3>Compliance &amp; Quality</h3>' +
      '<table><thead><tr><th>Permission</th><th>What it covers</th><th>Actions</th><th>Trainer set</th></tr></thead><tbody>' +
        '<tr><td>Risk Assessment</td><td>The risk register and risk assessments</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Validation</td><td>Assessment validation across your programs</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Staff Validation</td><td>The unit validations assigned to the person</td><td>View, Create</td><td>Yes</td></tr>' +
        '<tr><td>Industry Consultation</td><td>Industry consultation records</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Complaints &amp; Suggestions</td><td>Feedback, complaint and suggestion forms, and their submissions</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Lead Validator</td><td>Any user’s unit validations, whoever started them</td><td>View, Edit</td><td>No</td></tr>' +
      '</tbody></table>' +
      '<h3>Workforce Management</h3>' +
      '<table><thead><tr><th>Permission</th><th>What it covers</th><th>Actions</th><th>Trainer set</th></tr></thead><tbody>' +
        '<tr><td>Workforce</td><td>Staff profiles in Workforce Management</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Unit Assignments</td><td>Assigning courses and units to staff</td><td>View, Create, Delete</td><td>No</td></tr>' +
        '<tr><td>Evidence Verification</td><td>Verifying the evidence staff submit, such as their credentials</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Staff Documents</td><td>Other people’s documents, on the Documents tab of a staff profile</td><td>View, Create, Edit, Delete</td><td>Yes</td></tr>' +
        '<tr><td>My Documents</td><td>The person’s own documents page only. Off unless ticked.</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>PD Calendar</td><td>The professional development calendar and training</td><td>View, Create, Edit, Delete</td><td>Yes</td></tr>' +
      '</tbody></table>' +
      '<h3>Settings</h3>' +
      '<table><thead><tr><th>Permission</th><th>What it covers</th><th>Actions</th><th>Trainer set</th></tr></thead><tbody>' +
        '<tr><td>Settings Tab</td><td>Opening the Settings area</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>User Management</td><td>Inviting, editing and removing users</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Team Coordination</td><td>Creating and managing teams and their members. Needs User Management.</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Integrations</td><td>External integrations, such as aXcelerate</td><td>View, Edit</td><td>No</td></tr>' +
        '<tr><td>Security</td><td>Multi-factor authentication and security settings</td><td>View, Edit</td><td>No</td></tr>' +
        '<tr><td>User Roles</td><td>Creating and editing roles</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
        '<tr><td>Brand Customisation</td><td>Uploading and managing your organisation’s logos</td><td>View, Create, Edit, Delete</td><td>No</td></tr>' +
      '</tbody></table>' +
      '<div class="callout warn"><b>Important</b><span>Anyone with the <b>User Roles</b> permission in Settings can change any role’s permissions, including their own. Keep it, with User Management and Security, to one or two Administrators.</span></div>',

    'users-custom-role':
      '<p class="lead">Build a role from scratch when no template fits. For example, a Head of Faculty who manages their faculty’s courses, TAS and trainers, and also teaches.</p>' +
      '<h2 id="create">Creating a role</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>User Roles</b> tab, select <b>New Role</b>.' +
          '<figure class="shot" data-marks="22.2,43.7,15.1,13.6,oval,#1; 88.8,72,8.9,15.8,oval,above,#2"><img src="assets/img/users-roles-new.png" alt="User Management on the User Roles tab, circled as marker 1. Under User Roles, From Template and New Role buttons sit at the right, and New Role is circled as marker 2." loading="lazy"><figcaption>Select the User Roles tab (1), then New Role (2).</figcaption></figure></li>' +
        '<li>Enter the <b>Role Name</b> and a <b>Description</b>.' +
          '<figure class="shot"><img src="assets/img/users-role-name.png" alt="Create New Role, with Role Name Head of Faculty and the description Manages a faculty’s courses, TAS, trainers and validations." loading="lazy"><figcaption>The name and description of a Head of Faculty role.</figcaption></figure></li>' +
        '<li>Tick <b>User delivers training</b> if people in this role teach. They then count as trainers in Workforce Management and delivery readiness, whatever their permissions.' +
          '<figure class="shot" data-marks="5.5,29.4,1.8,13.8,oval,#"><img src="assets/img/users-role-trains.png" alt="User delivers training, ticked and circled: always list users on this role as a Trainer / Assessor for workforce and delivery readiness tracking, regardless of their permission set." loading="lazy"><figcaption>User delivers training, ticked (circled).</figcaption></figure></li>' +
        '<li>Choose the <b>Base Permission Set</b>:' +
          '<ul>' +
            '<li><b>Trainer / Assessor Permissions</b> lists only the features trainers use, such as My Courses, Staff Validation and PD Calendar.</li>' +
            '<li><b>Admin Permissions</b> lists every feature, including Program Management, TAS Builder, Risk Assessment, Workforce and Settings.</li>' +
          '</ul>' +
          '<figure class="shot" data-marks="50.3,30.6,46.3,59.6,zone,#"><img src="assets/img/users-role-base.png" alt="Base Permission Set, with Trainer / Assessor Permissions and Admin Permissions. Admin Permissions is selected and outlined." loading="lazy"><figcaption>Admin Permissions selected (outlined).</figcaption></figure></li>' +
        '<li>Tick what the role can <b>View</b>, <b>Create</b>, <b>Edit</b> and <b>Delete</b> in each feature. A dash means the action doesn’t apply. For the Head of Faculty:' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">A</span>Core Features</h4><p>View the dashboard and QMS documents. View, create and edit courses in Program Management, improvement items, events and TAS. <b>TAS Builder Review</b> stays off, so they can’t approve their own TAS.</p>' +
              '<figure class="shot"><img src="assets/img/users-role-core.png" alt="Core Features permissions for Head of Faculty: Dashboard View; QMS Documents View; Program Management, Continuous Improvement, Events and TAS Builder View, Create and Edit; TAS Builder Review unticked. No Delete ticks." loading="lazy"><figcaption>Core Features.</figcaption></figure></div>' +
            '<div><h4><span class="sn">B</span>Compliance &amp; Quality</h4><p>View, create and edit validations and industry consultations, and their own assigned validations. <b>Lead Validator</b> and Risk Assessment stay off.</p>' +
              '<figure class="shot"><img src="assets/img/users-role-compliance.png" alt="Compliance and Quality permissions for Head of Faculty: Validation and Industry Consultation View, Create and Edit; Staff Validation View and Create; Complaints and Suggestions View and Create; Risk Assessment and Lead Validator unticked." loading="lazy"><figcaption>Compliance &amp; Quality.</figcaption></figure><div class="callout tip"><b>Tip</b><span><b>Complaints &amp; Suggestions</b> is view and create, so they can run feedback surveys for their own courses. Form submissions are only visible to the form’s team, so put each course feedback form in its faculty’s team, and keep the complaints and appeals form in Compliance &amp; Validation or Student Services. Complaints are then handled independently of the faculty they may be about, and anything the faculty needs to fix reaches them as an improvement item.</span></div></div>' +
            '<div><h4><span class="sn">C</span>Workforce Management</h4><p>View staff profiles, other staff’s documents and evidence, and assign units. Full access to their own documents and the PD calendar.</p>' +
              '<figure class="shot"><img src="assets/img/users-role-workforce.png" alt="Workforce Management permissions for Head of Faculty: Workforce, Evidence Verification and Staff Documents View; Unit Assignments View and Create; My Documents View, Create, Edit and Delete; PD Calendar View, Create and Edit." loading="lazy"><figcaption>Workforce Management.</figcaption></figure></div>' +
            '<div><h4><span class="sn">D</span>Settings</h4><p>Leave every Settings permission off. Only Administrators should manage users, roles, teams and security.</p></div>' +
          '</div></li>' +
        '<li>Select <b>Activate Role</b>. The permissions take effect once you assign the role to people from the <b>Staff</b> tab.' +
          '<figure class="shot" data-marks="81.2,57.8,15,28.3,oval,#"><img src="assets/img/users-role-activate.png" alt="A note that permissions defined here only take effect once the role is assigned to users, with Cancel and Activate Role. Activate Role is circled." loading="lazy"><figcaption>Select Activate Role (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<p>For what each permission covers, see <a href="article.html?id=users-permissions">What each permission covers</a>. For what people with the role see, see <a href="article.html?id=users-portal-custom">What each role sees</a>.</p>',

    'users-portal-custom':
      '<p class="lead">What someone sees in RTO Radar depends on their role. Its permissions decide which areas appear in their navigation and what they can do there, and their team decides whose records they see.</p>' +
      '<h2 id="custom">Custom role portal</h2>' +
      '<p>People with a custom role see a portal shaped by its permissions. For example, the IT Faculty Manager, a Head of Faculty, sees only what the role allows:</p>' +
      '<ul>' +
        '<li><b>Their navigation</b> (1) has no Risk Assessment or Settings, and adds <b>My Documents</b>.</li>' +
        '<li><b>Document Management</b> is view only. <b>Manage Frameworks</b> and <b>Upload Document</b> (2) are greyed out, and say the action requires an admin.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="0.6,11.5,15.4,34.5,zone,#; 17.6,13.5,#1; 72,12.4,24.7,5.6,zone,#; 73.8,7.6,#2"><img src="assets/img/users-hof-qms.png" alt="Document Management as the IT Faculty Manager sees it, labelled Head of Faculty, Organisation View. The navigation, outlined as 1, lists Dashboard, Document Management, Program Management, My Documents, Continuous Improvement, Workforce Management, Complaints and Suggestions, and Events, with no Risk Assessment or Settings. Manage Frameworks and Upload Document, outlined as 2, are greyed out, with the message This action requires an admin. Export is available, and the document repository shows 27 documents." loading="lazy"><figcaption>The IT Faculty Manager’s navigation (1), and the admin-only buttons greyed out (2).</figcaption></figure>' +
      '<p>Because the role has <b>User delivers training</b> ticked, the IT Faculty Manager is listed with the trainers in Workforce Management, beside Staff Demo, who reports to them.</p>' +
      '<figure class="shot shot-small"><img src="assets/img/users-hof-workforce.png" alt="Workforce, on the Trainers (2) tab: Staff Demo and IT Faculty Manager. Admin shows 0 and All shows 2." loading="lazy"><figcaption>The IT Faculty Manager counts as a trainer, as well as managing the IT Faculty.</figcaption></figure>' +
      '<h2 id="trainer">Trainer / Assessor portal</h2>' +
      '<p>The Trainer/Assessor role uses the staff level permission set, so a trainer’s portal is much simpler. Staff Demo, a Trainer/Assessor in the IT Faculty, sees only <b>Dashboard</b>, <b>My Courses</b>, <b>My Documents</b>, <b>Events</b> and <b>Continuous Improvement</b> (1). <b>My Assigned Courses</b> lists the courses assigned to them, and <b>Manage Course</b> (2) opens one.</p>' +
      '<figure class="shot" data-marks="0.5,12,15.5,22.5,zone,#; 17.2,13.8,#1; 84.2,69.1,9.7,4,oval,right,#2"><img src="assets/img/users-trainer-courses.png" alt="The Trainer/Assessor portal for Staff Demo, staffdemo@rtoradar.com.au. The navigation, outlined as 1, lists Dashboard, My Courses, My Documents, Events and Continuous Improvement. My Assigned Courses shows 2 courses assigned and 4 active units: 52867WA Advanced Diploma of Industrial Data Communication, Networking and IT, and ICT50220 Diploma of Information Technology, both in the IT Faculty and Assigned. Manage Course on ICT50220 is circled as 2." loading="lazy"><figcaption>Staff Demo’s navigation (1) and their assigned courses. Select Manage Course (2).</figcaption></figure>' +
      '<p>The course opens on <b>Assigned Units</b>, where they create an evidence map for each unit and see the validations scheduled for it, with their due date and priority.</p>' +
      '<figure class="shot" data-marks="39.9,46.6,8,3.9,oval,#"><img src="assets/img/users-trainer-units.png" alt="Diploma of Information Technology, ICT50220, with 4 units assigned to Staff Demo. ICTAII501 Automate work tasks using machine learning has a validation due 15/11/2026, Medium priority, and is In Progress. ICTIOT503 Design and test IoT devices and networks has a validation due 20/11/2026, Low priority, and is Assigned. ICTOPN511 and ICTWEB519 are Assigned with no validations yet. Each has Create Map under Evidence Map, the first circled." loading="lazy"><figcaption>Staff Demo’s units in ICT50220, with two validations scheduled.</figcaption></figure>',

    'users-plan-roles':
      '<p class="lead">Plan your roles and teams before you add your staff. Give each person only what their job needs, and keep the people who build something separate from those who approve it.</p>' +
      '<h2 id="roles-teams">Roles set what, teams set whose</h2>' +
      '<p>A role decides what someone can do in each feature. Their team decides whose records they can do it to. Keep roles few and based on the job, and let teams separate the work. Two heads of faculty can share the Head of Faculty role and sit in different teams, so each manages only their own faculty. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
      '<h2 id="principles">Principles</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Give only what the job needs</h4><p>Start from the closest template and untick what the job doesn’t need, rather than adding to a broad role. Keep <b>Delete</b> rare: your records are your audit evidence. See <a href="article.html?id=users-roles#templates">Role templates</a>.</p></li>' +
        '<li><h4>Keep building separate from approving</h4><p>Give <b>TAS Builder</b> and <b>TAS Builder Review</b> to different people, so no one approves a TAS they wrote. The TAS Reviewer template includes TAS Builder, so untick its Create and Edit. Give <b>Lead Validator</b> to your validation lead only, so trainers can’t edit validations of their own assessment work.</p></li>' +
        '<li><h4>Handle complaints independently</h4><p>Complaints and appeals must be handled fairly and confidentially, and are often about a trainer or course. Keep the complaints and appeals form in Compliance &amp; Validation or Student Services &amp; Administration, and give each faculty only its own course feedback forms.</p></li>' +
        '<li><h4>Have credentials checked by someone else</h4><p>Give <b>Evidence Verification</b> to compliance staff, so a trainer’s credentials and currency are approved by someone outside their faculty. Faculty managers can still view their trainers’ documents with <b>Staff Documents</b>.</p></li>' +
        '<li><h4>Keep Settings with one or two people</h4><p><b>User Management</b>, <b>User Roles</b>, <b>Security</b> and <b>Team Coordination</b> control who can do what. Anyone with User Roles can change any role, including their own, so keep these with one or two Administrators.</p></li>' +
        '<li><h4>Give silent users their real role</h4><p>A silent user can’t sign in, but if you invite them later, they get their role straight away. Give them the role their job needs, not Administrator.</p></li>' +
        '<li><h4>Give auditors view-only, temporary access</h4><p>Use the <b>Quality Auditor</b> role, which is view only, for internal reviewers and external auditors, and delete their account after the audit.</p></li>' +
      '</ol>' +
      '<h2 id="setup">A suggested setup</h2>' +
      '<p>This is the setup used throughout these guides. Adjust it to the size and structure of your RTO.</p>' +
      '<table><thead><tr><th>Role</th><th>Starts from</th><th>Typical people</th><th>Key permissions</th><th>Team</th></tr></thead><tbody>' +
        '<tr><td>Administrator</td><td>Administrator template</td><td>CEO, Compliance Manager</td><td>Everything, including Settings</td><td>Executive Team, Compliance &amp; Validation, System Default</td></tr>' +
        '<tr><td>Compliance Officer</td><td>Compliance Officer template</td><td>Compliance Officer</td><td>QMS documents, Risk Assessment, Continuous Improvement, Complaints &amp; Suggestions, Validation, Lead Validator, Evidence Verification. No Settings.</td><td>Compliance &amp; Validation</td></tr>' +
        '<tr><td>TAS Reviewer</td><td>TAS Reviewer template, with TAS Builder unticked</td><td>Quality Assurance Manager</td><td>TAS Builder Review, QMS documents (view)</td><td>Compliance &amp; Validation</td></tr>' +
        '<tr><td>Head of Faculty</td><td>New role, Admin Permissions, delivers training</td><td>Design Manager, IT Faculty Manager</td><td>Program Management, TAS Builder, Validation, Industry Consultation, Unit Assignments, course feedback forms. No Delete or Settings.</td><td>Their faculty, as Team Manager</td></tr>' +
        '<tr><td>Training Coordinator</td><td>Training Coordinator template</td><td>Training Coordinator</td><td>Workforce, unit assignments and course delivery</td><td>Their faculty</td></tr>' +
        '<tr><td>Trainer/Assessor</td><td>Trainer/Assessor template</td><td>Trainers</td><td>My Courses, Staff Validation, My Documents, PD Calendar</td><td>Their faculty</td></tr>' +
        '<tr><td>Record Keeper</td><td>Record Keeper template</td><td>Student Services Coordinator</td><td>QMS documents, Complaints &amp; Suggestions</td><td>Student Services &amp; Administration</td></tr>' +
        '<tr><td>Quality Auditor</td><td>Quality Auditor template</td><td>Internal or external auditors</td><td>View only</td><td>System Default, for the audit only</td></tr>' +
      '</tbody></table>' +
      '<p>For what each permission allows, see <a href="article.html?id=users-permissions">What each permission covers</a>. To build a role that no template fits, see <a href="article.html?id=users-custom-role">Create a custom role</a>.</p>' +
      '<h2 id="review">Review it regularly</h2>' +
      '<ul>' +
        '<li>Check the <b>Users</b> count on each role. Look for people who are Administrators but don’t need to be. See <a href="article.html?id=users-roles#org">Organisation roles</a>.</li>' +
        '<li>Check that each person is in the right team and that every team has a manager. See <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</li>' +
        '<li>When someone leaves, reassign their work and delete them. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</li>' +
      '</ul>',

    'users-governance':
      '<p class="lead">The chart decides what each person can see and work on in RTO Radar. Where someone sits in it controls which people, courses, TAS and submissions they can reach. It’s a compliance-focused chart, not an organisational chart.</p>' +
      '<h2 id="system-default">System Default</h2>' +
      '<p><b>System Default</b> sits at the top of the chart and oversees everything in your RTO. Its manager is usually your RTO’s Compliance Manager, who is often also the Escalation Manager.</p>' +
      '<p>Anything not assigned to a team when it’s created goes into System Default, such as a new member, course, TAS or form. Everyone in the organisation can see it until it’s assigned to a team.</p>' +
      '<figure class="shot"><img src="assets/img/wf-gov-default.png" alt="The top of the compliance governance chart. System Default, with the Compliance Manager at the top. Beneath them are Governance Lead, Admin Demo and Quality Assurance Manager, and the Design Manager, who heads the Learning Design team." loading="lazy"><figcaption>System Default, with the Compliance Manager at the top.</figcaption></figure>' +
      '<h2 id="visibility">How teams limit what people see</h2>' +
      '<p>Create a team for each area whose records should stay within it. People see the documents, courses, TAS, staff, forms and improvement items of their own team, not those of teams on other branches of the chart. For example:</p>' +
      '<figure class="shot" data-marks="68.4,18.9,16.4,4.7,oval,#A; 3,18.9,16.4,4.7,oval,right,#B"><img src="assets/img/wf-gov-teams.png" alt="Part of the compliance governance chart. Beneath the Executive Team are Learning Design, managed by Design Manager, circled as B, with three teams beneath it: Business Faculty with Member Demo 1, Hospitality Faculty with Member Demo 2, and IT Faculty, managed by IT Faculty Manager, with Staff Demo; Compliance and Validation, managed by Compliance Manager, circled as A, with Compliance Officer and Compliance Specialist; and Student Services and Administration." loading="lazy"><figcaption>Compliance &amp; Validation (A) and Learning Design (B), each with its own manager and members.</figcaption></figure>' +
      '<div class="sub-steps">' +
        '<div><h4><span class="sn">A</span>Compliance &amp; Validation</h4><p>Compliance documents belong to the Compliance &amp; Validation team, so only its manager, the Compliance Manager, and its members, the Compliance Officer and Compliance Specialist, can see them.</p></div>' +
        '<div><h4><span class="sn">B</span>Learning Design</h4><p>This team manages the training and courses assigned to it, but can’t see administrative documents or the workforce of other teams. Beneath it, the <b>Business Faculty</b>, <b>Hospitality Faculty</b> and <b>IT Faculty</b> teams each see only their own courses, TAS, workforce, forms and improvement items. A Business Faculty trainer never sees a Hospitality Faculty course.</p></div>' +
      '</div>' +
      '<h2 id="managers">Managers and their members</h2>' +
      '<p>A team’s members report to its manager. The manager can assign them work and review how they’re tracking, such as their delivery readiness, evidence maps and improvement items. A team without a manager reports to the manager of the team above it.</p>' +
      '<div class="sub-steps">' +
        '<div><h4><span class="sn">1</span>A team sees its own work</h4><p>A team’s manager can see the members of their team and the manager they report to, and can assign work to their members. Teams on other branches stay out of view.</p></div>' +
        '<div><h4><span class="sn">2</span>System Default sees everything</h4><p>Anyone in <b>System Default</b> bypasses teams: they can see everyone in the organisation and every team’s work.</p></div>' +
        '<div><h4><span class="sn">3</span>System Default work is shared</h4><p>Anything in System Default is unassigned, so every team can see and use it until it’s assigned to a team.</p></div>' +
      '</div>' +
      '<h2 id="example">An example</h2>' +
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
      '<h2 id="elsewhere">Where else this applies</h2>' +
      '<ul>' +
        '<li><b>Workforce Management</b>: a manager sees only their own members and the manager they report to. Someone in System Default sees everyone in the organisation.</li>' +
        '<li><b>Continuous Improvement</b>: improvement items can only be assigned to people you can see.</li>' +
        '<li><b>Complaints &amp; Suggestions</b>: a form submitted to a team can only be viewed by that team’s managers and members with the right permissions.</li>' +
      '</ul>' +
      '<p>This keeps each team’s work to itself. The Business Faculty doesn’t receive the IT Faculty’s courses, TAS, improvement items or complaints.</p>' +
      '<div class="callout tip"><b>Tip</b><span>Can’t find someone or something? Check the compliance governance chart to see whether it belongs to your team. If you need to oversee the whole organisation, ask an Admin to add you to <b>System Default</b> in <b>Settings</b> › <b>User Management</b>.</span></div>',

    'users-teams':
      '<p class="lead">Teams decide whose records each person can see. Create a team for each area whose work should stay within it, and nest teams under a parent.</p>' +
      '<h2 id="settings">Team settings</h2>' +
      '<p>Go to <b>Settings</b> › <b>User Management</b> › <b>Teams Configuration</b>. Each team shows its parent team, members and colour.</p>' +
      '<figure class="shot" data-marks="0.7,91.4,5.5,5.1,oval,right,#1; 43.3,50.4,8.7,4.8,oval,above,#2; 50.4,87.9,12.5,4.8,oval,right,#3"><img src="assets/img/users-teams-open.png" alt="Organisation Settings for RTO Radar Demo, signed in as admindemo@rtoradar.com.au. Settings in the navigation bar is circled as marker 1, the User Management tab as marker 2, and the Teams Configuration tab as marker 3." loading="lazy"><figcaption>Select Settings (1), User Management (2), then Teams Configuration (3).</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/users-team-list.png" alt="Team settings for RTO Radar Demo, with Create New Team. The Executive Team, described as leadership and governance, has Compliance and Validation, Learning Design and Student Services and Administration as sub-teams. Learning Design has the Business, Community and Health, Hospitality and IT faculties. System Default, the default team, has 5 members. Each team shows its members, its colour, Add Staff, a pencil to edit and a bin to delete." loading="lazy"><figcaption>Every team, with its sub-teams indented beneath it.</figcaption></figure>' +
      '<h2 id="create">Create a team</h2>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Create New Team</b>. The new team’s settings open.' +
          '<figure class="shot" data-marks="10.9,14.6,#1; 12.6,49,#2; 17,71.8,#3; 11.8,85.7,#4; 62.8,13.6,#5; 96.4,8.8,arrow-up,small,#6"><img src="assets/img/users-team-create.png" alt="Creating a new team, with a reminder to assign items such as programs or feedback submissions to it, and Cancel and Save. Numbers mark the team name, IT Faculty, as 1; Team Manager, IT Faculty Manager, as 2; Parent team, Learning Design, as 3; Team Colour, with a preview of the IT Faculty label, as 4; and Team Members, where Staff Demo is ticked as a Team Member, as 5. Save is 6." loading="lazy"><figcaption>Creating the IT Faculty.</figcaption></figure></li>' +
        '<li>Enter the <b>Team name</b> (1) and an optional <b>Description</b>.</li>' +
        '<li>Choose the <b>Team Manager</b> (2). Their team’s members report to them. They can view and assign items tagged to the team, see every member and item across the team and its sub-teams, and receive email notifications when their team’s staff files are about to expire.</li>' +
        '<li>Choose the <b>Parent team</b> (3), if it sits under another team.</li>' +
        '<li>Choose the <b>Team Colour</b> (4). The team’s label and its people cards on the chart take this colour.</li>' +
        '<li>Under <b>Team Members</b> (5), tick each person, and choose whether they’re a <b>Member</b> or a <b>Manager</b> of the team. Members see only the items tagged to their team, on top of what their user role allows.</li>' +
        '<li>Select <b>Save</b> (6). Then assign items to the team, such as its programs and feedback forms. On the chart, the manager’s card sits under the team’s name, with its members beneath.' +
          '<figure class="shot shot-narrow"><img src="assets/img/users-team-tree.png" alt="The IT Faculty on the Compliance Governance Chart. IT Faculty Manager, Head of Faculty, sits under the team name as its manager, and a line leads down to Staff Demo, Trainer/Assessor, who reports to them." loading="lazy"><figcaption>IT Faculty Manager manages the IT Faculty, and Staff Demo reports to them.</figcaption></figure>' +
        '</li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Someone can belong to more than one team: tick them in each team’s members. On the chart, a dotted line links them to their second team. For example, a trainer who teaches business units in both the Business Faculty and the IT Faculty can belong to both, so each faculty’s manager can assign them units and track their credentials.</span></div>' +
      '<h2 id="members">Team actions</h2>' +
      '<p>Each team in the list has <b>Add Staff</b>, a pencil <svg class="ui-icon" viewBox="0 0 24 24" aria-label="pencil" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> to edit it and a bin <svg class="ui-icon bin" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to delete it.</p>' +
      '<figure class="shot" data-marks="84.2,30,#1; 89.4,30,#2; 93.6,30,#3"><img src="assets/img/users-team-row.png" alt="The IT Faculty row in team settings, a sub-team of Learning Design with 1 member. Numbers mark Add Staff as 1, the pencil as 2 and the bin as 3." loading="lazy"><figcaption>Add Staff (1), edit (2) and delete (3).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>Add staff to a team</h4><p>Select <b>Add Staff</b> on the team. Search for each person by name or email, tick them, then select <b>Review changes</b>.</p>' +
          '<figure class="shot shot-small" data-marks="80.1,89,arrow-down,small"><img src="assets/img/users-team-staff.png" alt="Manage staff in IT Faculty, with Trainer One, Trainer Three and Trainer Two ticked and Training Coordinator not ticked. Each shows the team they are in now. A note says new users to teams are added as Team Member, and users without teams are automatically allocated to the System Default team. 3 people added, with an arrow pointing down at Review changes." loading="lazy"><figcaption>Three trainers ticked. Select Review changes.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>People are added as a <b>Team Member</b>. Anyone not in a team is automatically in <b>System Default</b>.</span></div>' +
          '<p><b>Preview visibility changes</b> shows what each person will be able to see. Nothing is saved yet. Select <b>Confirm and save</b>, or <b>Back to editing</b> to change your selection.</p>' +
          '<figure class="shot shot-medium" data-marks="85.8,87,arrow-down,small"><img src="assets/img/users-team-preview.png" alt="Preview visibility changes: nothing has been saved yet. Trainer One, Trainer Three and Trainer Two have each been added to the IT Faculty, with no change to what they can see. A note says counts are based on team rules only and role permissions still apply. An arrow points down at Confirm and save, beside Back to editing." loading="lazy"><figcaption>Check the changes, then select Confirm and save.</figcaption></figure>' +
          '<p>The counts are based on team rules only. Role permissions still apply, so some areas may stay hidden.</p></li>' +
        '<li><h4>Edit a team</h4><p>Select the pencil <svg class="ui-icon" viewBox="0 0 24 24" aria-label="pencil" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg>. Change its name, description or parent team, then select <b>Save</b>, or <b>Discard</b> to cancel.</p>' +
          '<figure class="shot" data-marks="89.1,44.1,3.5,13,oval,#"><img src="assets/img/users-team-edit.png" alt="The IT Faculty being edited: its name, the description Diploma and certificate courses in information technology and cyber security, and parent team Learning Design, with 2 members. Save is circled, beside Discard." loading="lazy"><figcaption>Editing the IT Faculty. Select Save (circled).</figcaption></figure></li>' +
        '<li><h4>Delete a team</h4><p>Select the bin <svg class="ui-icon bin" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>. The window shows what will change before anything is deleted:</p>' +
          '<ul>' +
            '<li>Items assigned to the team move to <b>System Default</b>.</li>' +
            '<li>Its members snap to the deleted team’s parent team, so they stay in the right place in your structure.</li>' +
            '<li>People above the team, such as its parent team’s manager, stay in their teams but see fewer people.</li>' +
          '</ul>' +
          '<p>Type the team’s name to confirm, then select <b>Delete team</b>.</p>' +
          '<figure class="shot shot-medium" data-marks="91.4,90.5,arrow-down,small"><img src="assets/img/users-team-delete.png" alt="Delete team, about to delete the IT Faculty, with the warning that this cannot be undone and items will no longer belong to the team. Its assigned items will move to System Default; none are tagged to it. Under visibility changes, CEO Demo and Design Manager stay in the same teams but see 2 fewer people, and Staff Demo and IT Faculty Manager will be moved from IT Faculty to System Default, seeing 15 and 14 more items. IT Faculty is typed to confirm, and an arrow points down at Delete team." loading="lazy"><figcaption>Deleting the IT Faculty. Type its name, then select Delete team.</figcaption></figure>' +
          '<div class="callout warn"><b>Important</b><span>Deleting a team can’t be undone. Its members move up to the parent team, so check they’re in the right teams straight away.</span></div></li>' +
      '</ol>' +
      '<h2 id="next">After you create a team</h2>' +
      '<p>A new team is empty. Give it people and work, so its members see what they need, and its manager can oversee it:</p>' +
      '<table><thead><tr><th>Give the team</th><th>How</th></tr></thead><tbody>' +
        '<tr><td>Members</td><td>Select <b>Add Staff</b> on the team, and tick the people who belong to it. See <a href="#members">Team actions</a>.</td></tr>' +
        '<tr><td>Programs</td><td>Assign its courses to the team, one or several at a time. See <a href="article.html?id=prog-overview#bulk">Assign courses to a team</a>.</td></tr>' +
        '<tr><td>Complaints &amp; Suggestions forms</td><td>Choose the team that owns a form when you create it. Its submissions go to that team. See <a href="article.html?id=fb-create-form&find=team">Choose a form’s team</a>.</td></tr>' +
        '<tr><td>Improvement items</td><td>Choose one of the team’s members as the person responsible when you add an item. The register can then be filtered by the team. See <a href="article.html?id=cir-add-item&find=person">Choose the person responsible</a>.</td></tr>' +
      '</tbody></table>' +
      '<p>The team then appears on the compliance governance chart, under its parent team. Admins choose where teams show across RTO Radar, such as team badges and the org chart. See <a href="article.html?id=cust-dashboard-widgets#teams">Teams settings</a>.</p>' +
      '<h2 id="chart">The Compliance Governance Chart</h2>' +
      '<p>The chart shows every team with its manager and members, in each team’s colour. A dotted line shows someone who belongs to a second team. To open it, select <b>View Compliance Chart</b> on the <b>Teams Configuration</b> tab.</p>' +
      '<figure class="shot" data-marks="10.6,74.8,arrow-up,small"><img src="assets/img/users-chart-button.png" alt="The Teams Configuration tab, explaining that moving user profiles into teams changes their scope of visibility. A note says all users can view every area of RTO Radar by default if they have the permissions, that the System Default team keeps the broadest visibility, suiting compliance managers and RTO admins, and that role-based permissions are set in User Roles, separately from teams. An arrow points up at View Compliance Chart." loading="lazy"><figcaption>Select View Compliance Chart.</figcaption></figure>' +
      '<p>Zoom in or out, fit the chart to the screen, or export it.</p>' +
      '<figure class="shot" data-marks="25.5,11.2,16.3,10.7,zone,#; 44,16.5,#1; 34.3,42.7,16.2,10.6,zone,#; 52.8,48,#2"><img src="assets/img/users-gov-chart.png" alt="The Compliance Governance Chart for RTO Radar Demo. At the top, System Default, outlined as 1, is managed by the Compliance Manager, with New Starter Demo, Quality Auditor and Admin Demo beneath. Below, the Executive Team, outlined as 2, is managed by CEO Demo, with Compliance and Validation under the Compliance Manager, Student Services and Administration under the Student Services Coordinator, and Learning Design under Design Manager. Learning Design has the IT Faculty, managed by IT Faculty Manager with Staff Demo, the Business Faculty with Trainer One, the Community and Health Faculty, managed by the Training Coordinator with Trainer Three, and the Hospitality Faculty with Trainer Two." loading="lazy"><figcaption>System Default, managed by the Compliance Manager (1), and the Executive Team, managed by the CEO (2).</figcaption></figure>' +
      '<h3>Why it’s a compliance governance chart</h3>' +
      '<p>The chart has two managers at the top, and they oversee different things:</p>' +
      '<ul>' +
        '<li><b>The CEO</b> manages the <b>Executive Team</b>. They’re concerned with how Learning Design, Compliance &amp; Validation and Student Services &amp; Administration are performing.</li>' +
        '<li><b>The Compliance Manager</b> manages <b>System Default</b>, as well as Compliance &amp; Validation. Everyone in System Default sees every team, so everything passes through the Compliance Manager: auditors, new staff not yet in a team, the members of each faculty, and how compliance flows through the RTO.</li>' +
      '</ul>' +
      '<p>The Compliance Manager is also the manager of <b>Compliance &amp; Validation</b>, even though System Default already lets them see everything. Managing that team puts them in the reporting line: the Quality Assurance Manager and Compliance Officer report to them directly, and they report to the CEO through the Executive Team. Without it, the CEO couldn’t assign them improvement items or other actions, because they’d sit outside the Executive Team’s branch.</p>' +
      '<p>That’s why it’s a compliance governance chart rather than an organisational chart: it’s built so the person accountable for compliance can see it all.</p>' +
      '<p>For what each person can see, see <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>',

    // ---- Events ----
    'ev-overview':
      '<p class="lead">Events brings every compliance date in your RTO into one place: improvement item due dates, scheduled industry consultations and unit validations, document reviews, professional development and your own events.</p>' +
      '<h2 id="open">Open Events</h2>' +
      '<p>Select <b>Events</b> on your navigation bar.</p>' +
      '<figure class="shot" data-marks="1.2,42.2,4.8,3.2,oval,right,#"><img src="assets/img/ev-open.png" alt="The Events page for RTO Radar Demo on the Calendar tab, showing November 2026 with events on several days and a colour key along the bottom. Events in the navigation bar is circled." loading="lazy"><figcaption>Select Events (circled).</figcaption></figure>' +
      '<h2 id="tabs">The three tabs</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Calendar</h4><p>A month view of everything due, colour-coded by type. Filter it, add your own events and export them. See <a href="article.html?id=ev-calendar">Use the calendar</a>.</p></li>' +
        '<li><h4>Schedule</h4><p>Quick actions to schedule and record industry consultations, and to schedule unit validations. See <a href="article.html?id=ev-consultation">Schedule an industry consultation</a> and <a href="article.html?id=ev-validation">Schedule a unit validation</a>.</p></li>' +
        '<li><h4>Professional Development</h4><p>Your PD sessions, the PD catalogue and your expressions of interest. See <a href="feature.html?m=pd">Professional Development</a>.</p></li>' +
      '</ol>' +
      '<h2 id="sources">Where events come from</h2>' +
      '<p>Most events appear on their own, from work recorded elsewhere in RTO Radar:</p>' +
      '<ul>' +
        '<li><b>Improvement items</b> show on their due date, labelled by source, such as CIR Validation, CIR Risk Register, CIR TAS Builder, CIR Assessment Judgement, CIR Industry Consultation, CIR Workforce Document, CIR QMS Review and CIR Ad Hoc. See <a href="feature.html?m=cir">Continuous Improvement</a>.</li>' +
        '<li><b>Scheduled consultations and validations</b> show on their scheduled date.</li>' +
        '<li><b>QMS document review dates</b> show when each document is due for review. See <a href="feature.html?m=qms">Document Management</a>.</li>' +
        '<li><b>Your own events</b>, such as staff meetings, show for the roles and people you choose. See <a href="article.html?id=ev-add-event">Add an event</a>.</li>' +
      '</ul>' +
      '<p>What you see depends on your role and team. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>',

    'ev-calendar':
      '<p class="lead">The calendar shows a month at a time. Each day with events shows how many there are and a coloured dot for each type.</p>' +
      '<figure class="shot"><img src="assets/img/ev-calendar.png" alt="The Calendar tab for November 2026. Days with events show how many there are and a coloured dot for each type, such as 6 events on 25 November. The colour key along the bottom lists Consultation, CIR Industry Consultation, CIR Assessment Judgement, CIR Risk Register, CIR TAS Builder and CIR Validation." loading="lazy"><figcaption>November 2026, with each day’s event count and the colour key below.</figcaption></figure>' +
      '<h2 id="navigate">Move between months</h2>' +
      '<p>Use the arrows either side, or choose the month and year. Select <b>Today</b> to return to the current month.</p>' +
      '<h2 id="filter">Filter and search</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Filters</h4><p>Show only some event types or sources.</p></li>' +
        '<li><h4>Assigned To</h4><p>Show only the events assigned to particular people.</p></li>' +
        '<li><h4>Team</h4><p>Show only one team’s events.</p></li>' +
        '<li><h4>Search events</h4><p>Find an event by its title or description.</p></li>' +
      '</ol>' +
      '<figure class="shot" data-marks="6.1,7,#1; 17.2,7,#2; 29.1,7,#3; 56.7,7,#4"><img src="assets/img/ev-filter.png" alt="The calendar filtered to CIR Validation items assigned to the Training Manager. Filters (1), Assigned To (2) and Team (3) each show 1 active filter, beside Search events (4). The active filters appear as tags, CIR Validation and Training Manager, with Clear all. Only 25 November has events, and Filtered Events in November 2026 lists the 2 matching events with their date, type, status, priority and who they are assigned to." loading="lazy"><figcaption>Filters (1), Assigned To (2), Team (3) and Search (4). The calendar shows only CIR Validation items assigned to the Training Manager.</figcaption></figure>' +
      '<p>Each active filter shows as a tag below the toolbar. Select a tag’s ×, or <b>Clear all</b>, to remove filters. While a filter is on, <b>Filtered Events</b> below the calendar lists every matching event that month, with its date, type, status, priority and who it’s assigned to.</p>' +
      '<h2 id="key">The colour key</h2>' +
      '<p>The key below the calendar lists the event types shown that month, each with its colour. Select the <b>i</b> beside a type to see what it is.</p>' +
      '<figure class="shot"><img src="assets/img/ev-key.png" alt="The colour key: Consultation, CIR Industry Consultation, CIR Assessment Judgement, CIR Risk Register, CIR TAS Builder and CIR Validation, each with its colour and an information icon. The icon beside CIR Risk Register is selected, showing: Action items from the Continuous Improvement Register sourced from risk register activities." loading="lazy"><figcaption>Selecting the i beside CIR Risk Register explains what it shows.</figcaption></figure>' +
      '<h2 id="day">See a day’s events</h2>' +
      '<p>Select a day to list its events. Each shows its title, type, status, the person responsible and a short description.</p>' +
      '<figure class="shot" data-marks="42.9,72.5,14.1,10,zone,#; 39.6,77.5,#1; 43.2,17.4,25.2,55,zone,#; 70.7,22,#2"><img src="assets/img/ev-day.png" alt="The calendar with 25 November selected, outlined as 1. Its 6 events are listed in a panel, outlined as 2: a CHCECE046 Validation V4 improvement item, tagged CIR Validation and Open, assigned to Admin Demo, with its description of an assessment conditions issue, the risk, the consequence and the recommended action." loading="lazy"><figcaption>Select a day (1) to list its events (2). Scroll the list to see them all.</figcaption></figure>' +
      '<p>Select an improvement item to open its details: the action, description, due date, source, status, priority, person responsible, when it was created and any notes.</p>' +
      '<figure class="shot shot-small"><img src="assets/img/ev-item.png" alt="CIR Validation Action Item Details: action item CHCECE046 Validation V4, with a description of the assessment conditions issue, its risk, consequence and recommended action. Due 25 November 2026, source CIR Validation, status open, priority Medium, person responsible Admin Demo, created on 26 October 2026." loading="lazy"><figcaption>An improvement item raised from a unit validation.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>To change an improvement item, open it in the <a href="feature.html?m=cir">Continuous Improvement Register</a>. The calendar shows it, but it’s managed there.</span></div>',

    'ev-add-event':
      '<p class="lead">Add your own events, such as staff meetings, moderation sessions or compliance deadlines, and choose who sees them.</p>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Calendar</b> tab (1), select <b>Add Event</b> (2).' +
          '<figure class="shot" data-marks="14.6,43.5,6.6,10.5,oval,#1; 79.6,87.9,8.1,10,oval,above,#2"><img src="assets/img/ev-add-open.png" alt="The Events page on the Calendar tab, showing November 2026, with Filters, Assigned To, Team and Search events. The Calendar tab is circled as 1, and Add Event, at the right beside Export Events, as 2." loading="lazy"><figcaption>On the Calendar tab (1), select Add Event (2).</figcaption></figure></li>' +
        '<li>Enter the <b>Title</b> and an optional <b>Description</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/ev-add-title.png" alt="Add Event, to create a custom event visible to selected roles and staff members, with the title Validation Moderation Meeting and the description Review this cycle’s unit validation outcomes and agree moderation actions with each faculty." loading="lazy"><figcaption>A validation moderation meeting.</figcaption></figure></li>' +
        '<li>Choose the <b>Date</b>, <b>Time</b>, <b>Duration</b> and <b>Timezone</b>. To repeat it, choose how often under <b>Recurring Event</b>. The event is assigned to your team.' +
          '<figure class="shot shot-medium"><img src="assets/img/ev-add-date.png" alt="The event’s team, Executive Team, greyed out because the event is assigned to your team. The date is 20/11/2026, the time 10:00 AM and the duration 1 hour, with no recurrence and the timezone AEST Melbourne/Sydney." loading="lazy"><figcaption>20 November 2026 at 10:00 am, for an hour.</figcaption></figure></li>' +
        '<li>To remind people, choose a <b>Reminder</b>, and tick <b>Email notification</b> to send it by email too.' +
          '<figure class="shot shot-medium"><img src="assets/img/ev-add-reminder.png" alt="Reminder set to 1 day before, with Email notification ticked." loading="lazy"><figcaption>A reminder the day before, also sent by email.</figcaption></figure></li>' +
        '<li>Under <b>Visibility</b>, choose who can see the event: select <b>Roles</b>, tick <b>Individual staff members</b>, or both. Then select <b>Create Event</b>.' +
          '<figure class="shot shot-medium" data-marks="83.7,87.2,arrow-down,small"><img src="assets/img/ev-add-visibility.png" alt="Visibility, to choose who can see the event on their calendar. Roles is set to Head of Faculty and Trainer/Assessor, and under Individual staff members the Compliance Manager is ticked. An arrow points down at Create Event." loading="lazy"><figcaption>Visible to heads of faculty, trainers and the Compliance Manager. Select Create Event.</figcaption></figure></li>' +
      '</ol>' +
      '<p>The event appears on the calendar of everyone you chose, and an <b>.ics</b> calendar file downloads. Open it to add the event to your own calendar, such as Outlook or Google Calendar.</p>',

    'ev-export':
      '<p class="lead">Export events to a spreadsheet, or download them as a calendar file to add to your own calendar.</p>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Calendar</b> tab (1), select <b>Export Events</b> (2).' +
          '<figure class="shot" data-marks="14.6,43.5,6.6,10.5,oval,#1; 88.4,87.9,9.8,10,oval,above,#2"><img src="assets/img/ev-add-open.png" alt="The Events page on the Calendar tab, showing November 2026. The Calendar tab is circled as 1, and Export Events, at the right beside Add Event, as 2." loading="lazy"><figcaption>On the Calendar tab (1), select Export Events (2).</figcaption></figure></li>' +
        '<li>Choose the date range: the <b>Current month</b>, <b>All time</b> or a <b>Custom range</b>. Select <b>Next</b>.' +
          '<figure class="shot shot-medium" data-marks="88.3,89.7,arrow-down,small"><img src="assets/img/ev-export-1.png" alt="Export Events, step 1 of 3, Select Date Range, with Current month, November 2026, selected, and All time and Custom range below. An arrow points down at Next." loading="lazy"><figcaption>Exporting the current month.</figcaption></figure></li>' +
        '<li>Everything is included to start with. Untick anything to leave out, by <b>Event type</b> (consultations, improvement items and custom events), <b>CI source</b> or <b>Assigned to</b>. Select <b>Next</b>.' +
          '<figure class="shot shot-medium" data-marks="88.9,92.4,arrow-down,small"><img src="assets/img/ev-export-2.png" alt="Export Events, step 2 of 3, Apply Filters. Under Event Type, Consultation, CI Register Item and Custom Event are ticked. Under CI Source, CIR Industry Consultation, CIR Assessment Judgement, CIR Risk Register, CIR TAS Builder and CIR Validation are ticked. Assigned To has a staff search, with Admin Demo ticked. An arrow points down at Next." loading="lazy"><figcaption>Untick anything to leave out of the export.</figcaption></figure></li>' +
        '<li>Check how many events of each type are included, then select <b>Export CSV</b> (1) for a spreadsheet, or <b>Download Calendar</b> (2) for an <b>.ics</b> file to open in your own calendar.' +
          '<figure class="shot shot-medium" data-marks="53.7,90.6,arrow-down,small,#1; 80.8,90.6,arrow-down,small,#2"><img src="assets/img/ev-export-3.png" alt="Export Events, step 3 of 3, Preview and Download. Events in selection for November 2026: CIR TAS Builder 9, CIR Validation 5, Custom Event 2, CIR Risk Register 1, CIR Assessment Judgement 1 and CIR Industry Consultation 1, 19 in total. Arrows point down at Export CSV, 1, and Download Calendar, 2." loading="lazy"><figcaption>19 events in November 2026. Select Export CSV (1) or Download Calendar (2).</figcaption></figure></li>' +
      '</ol>',

    'ev-consultation':
      '<p class="lead">Plan industry consultations for your programs, based on each program’s risk, and keep track of what’s due and what’s overdue.</p>' +
      '<h2 id="schedule">Schedule a consultation</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Events</b> (1) › <b>Schedule</b> (2). Under <b>Consultations</b>, select <b>Add</b> (3) beside <b>Add New</b>.' +
          '<figure class="shot" data-marks="1.6,85.4,3.7,6.5,oval,right,#1; 54.9,49.5,4.2,6.6,oval,#2"><img src="assets/img/ev-schedule-open.png" alt="The Events page for RTO Radar Demo, with Events in the navigation bar circled as 1 and the Schedule tab circled as 2. Quick Actions begins below, with Consultations." loading="lazy"><figcaption>Select Events (1), then the Schedule tab (2).</figcaption></figure>' +
          '<figure class="shot" data-marks="89.4,42.9,7.4,9.6,oval,#3"><img src="assets/img/ev-consult-actions.png" alt="Consultations, to manage industry consultations and record outcomes: View Scheduled Consultations with Open, Add New with Add, Record Evidence with Record, and View Evidence with View. Add, beside Add New, is circled as 3." loading="lazy"><figcaption>Select Add (3) beside Add New.</figcaption></figure></li>' +
        '<li>Tick the <b>Program(s)</b> it covers. Search by code or title.' +
          '<figure class="shot shot-small" data-marks="10.5,70.5,4.3,3.6,oval,#"><img src="assets/img/ev-ic-form-programs.png" alt="Program(s), with a search box and the list of programs, each with its team. BSB50120 Diploma of Business, in the Business Faculty, is ticked and circled, and 1 program is selected." loading="lazy"><figcaption>BSB50120 Diploma of Business, ticked (circled).</figcaption></figure></li>' +
        '<li>Choose the <b>Scheduled Date</b> and the <b>Assigned Personnel</b>, and enter the <b>Subject Matter Expert</b>: their name, organisation, role and email, or <b>Select Existing Contact</b>. Enter “Not yet identified” if you don’t know yet.' +
          '<figure class="shot shot-small"><img src="assets/img/ev-ic-form-people.png" alt="Scheduled Date 10/12/2026 and Assigned Personnel Design Manager. The subject matter expert is Business Industry Expert, from Business Chamber, role Engagement Lead, email businessexpert@rtoradar.com.au, with a Select Existing Contact button." loading="lazy"><figcaption>Scheduled for 10 December 2026, assigned to the Design Manager.</figcaption></figure></li>' +
        '<li>Set the <b>Priority</b>, <b>Type</b> and <b>Estimated Hours</b>. Optionally choose a <b>Feedback Form</b> to send to the industry representative, and add <b>Notes</b> on what to cover. Then select <b>Schedule</b>.' +
          '<figure class="shot shot-small" data-marks="78.7,88.8,arrow-down,small"><img src="assets/img/ev-ic-form-details.png" alt="Priority Medium, Type Periodic Review, Estimated Hours 2, and the Industry Feedback form selected, with its public link. The notes ask to confirm the BSB50120 electives and assessment tasks reflect current business practice, including digital marketing, financial reporting and workplace health and safety obligations, and to check the workplace project brief and simulated business documents are still realistic. An arrow points down at Schedule." loading="lazy"><figcaption>The feedback form and what the consultation should cover. Select Schedule.</figcaption></figure>' +
          '<p>The consultation appears in the scheduler and on the calendar.</p></li>' +
      '</ol>' +
      '<h2 id="open">View scheduled consultations</h2>' +
      '<p>On the <b>Schedule</b> tab, under <b>Consultations</b>, select <b>Open</b> beside <b>View Scheduled Consultations</b>.</p>' +
      '<figure class="shot" data-marks="91.8,24.6,5,9.3,oval,#"><img src="assets/img/ev-consult-actions.png" alt="Consultations, with View Scheduled Consultations, Add New, Record Evidence and View Evidence. Open, beside View Scheduled Consultations, is circled." loading="lazy"><figcaption>Select Open (circled) beside View Scheduled Consultations.</figcaption></figure>' +
      '<p>The Industry Consultation Scheduler lists every consultation with its due date, priority, assigned person, programs, teams, status and when each program was last consulted. Overdue consultations are highlighted. Search, filter, select <b>Export</b>, or select <b>Schedule</b> to schedule another.</p>' +
      '<figure class="shot" data-marks="1.4,88.3,96.9,8.4,zone,#"><img src="assets/img/ev-ic-scheduled.png" alt="The Industry Consultation Scheduler on Scheduled, with 7 consultations listed by due date, priority, assigned personnel, program, teams, status, last consulted and evidence, each with a ⋮ menu. One, from April 2026, is Overdue, two are Completed, each with evidence, and four are Scheduled. The newly scheduled consultation, for BSB50120 Diploma of Business on 10 Dec 2026, assigned to the Design Manager and never consulted before, is outlined at the bottom." loading="lazy"><figcaption>The new BSB50120 consultation (outlined) at the bottom of the scheduler.</figcaption></figure>' +
      '<h2 id="complete">Mark a consultation complete</h2>' +
      '<ol class="steps-list">' +
        '<li>In the scheduler, select <b>⋮</b> (1) › <b>Mark Complete</b> (2) on the consultation.' +
          '<figure class="shot" data-marks="94.6,13,1.8,17,oval,#1; 87.4,59,8.4,16,oval,#2"><img src="assets/img/ev-ic-row-menu.png" alt="The new BSB50120 Diploma of Business consultation, due 10 Dec 2026, Medium priority, assigned to the Design Manager, in the Business Faculty and Scheduled. Its ⋮ is circled as 1, and Mark Complete in the open menu, between Edit and Delete, as 2." loading="lazy"><figcaption>Select ⋮ (1), then Mark Complete (2).</figcaption></figure></li>' +
        '<li>Choose the <b>Completion Method</b> and the <b>Completion Date</b>:' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">A</span>Set Date</h4><p>Marks the consultation complete against its schedule in the scheduler, on the date you choose.</p>' +
              '<figure class="shot shot-medium" data-marks="3.3,26.4,11.5,19.5,oval,#"><img src="assets/img/ev-ic-setdate.png" alt="Completion Method with Set Date selected and circled, beside Link to Recorded Evidence and Link Feedback, and a Completion Date of 10/12/2026." loading="lazy"><figcaption>Set Date (circled), with the completion date.</figcaption></figure></div>' +
            '<div><h4><span class="sn">B</span>Link to Recorded Evidence</h4><p>Links the consultation to evidence already recorded for the course. It’s only available once evidence has been recorded against that course. Choose the evidence record from the list. See <a href="article.html?id=ev-consultation-history">View and manage consultation evidence</a>.</p>' +
              '<figure class="shot shot-medium" data-marks="16.4,26.6,28.1,20.2,oval,#"><img src="assets/img/ev-ic-linkevidence.png" alt="Completion Method with Link to Recorded Evidence selected and circled. Below, the recorded evidence chosen is dated 04 Nov 2026, a periodic review with no subject matter expert selected." loading="lazy"><figcaption>Link to Recorded Evidence (circled), with the evidence record to link.</figcaption></figure></div>' +
            '<div><h4><span class="sn">C</span>Link Feedback</h4><p>Attaches feedback form submissions as evidence. Select <b>Link Feedback</b> (1), choose the form, tick its submissions, then select <b>Add selected</b> (2).</p>' +
              '<figure class="shot shot-medium" data-marks="47.3,10.5,17.5,7.8,oval,above,#1; 76.9,53.3,19.2,5.7,oval,above,#2"><img src="assets/img/ev-ic-linkfeedback.png" alt="Completion Method with Link Feedback selected, circled as 1. Under Search Feedback Forms and Submissions, the Industry Feedback form’s submissions are shown, with FS-0006 ticked, and Add 1 selected is circled as 2." loading="lazy"><figcaption>Select Link Feedback (1), tick the submissions, then Add selected (2).</figcaption></figure></div>' +
          '</div></li>' +
        '<li>Add any <b>Completion notes</b>. They’re kept with the notes from when the consultation was scheduled. Then select <b>Complete</b>.' +
          '<figure class="shot shot-medium" data-marks="89.6,78,arrow-down,small"><img src="assets/img/ev-ic-complete.png" alt="The notes from when this consultation was scheduled, asking to confirm the BSB50120 electives and assessment tasks reflect current business practice and to check the workplace project brief and simulated business documents. The completion notes read: Consulted with the Business Chamber. Electives confirmed as current; add a cyber security awareness task to the workplace project. Feedback form attached. They are added to the scheduling notes, and an arrow points down at Complete." loading="lazy"><figcaption>The scheduling notes are kept. Add any completion notes, then select Complete.</figcaption></figure>' +
          '<p>The consultation is marked complete, and the program’s last consultation date is updated.</p></li>' +
      '</ol>' +
      '<h2 id="coverage">Coverage and recommendations</h2>' +
      '<p>In the scheduler, select <b>Coverage</b> to see how many programs have been consulted, how many never have, how many need attention and how many are scheduled.</p>' +
      '<figure class="shot" data-marks="87.4,5.9,4.4,5.4,oval,#"><img src="assets/img/ev-ic-cov-cards.png" alt="The Industry Consultation Scheduler on Coverage, which is circled. The summary cards show 4 of 15 programs consulted, 11 never consulted, 0 needing attention and 5 scheduled. A note explains risk-based industry consultation: high-risk programs every 6 months, medium risk every 12 to 18 months and low risk every 24 months, with programs never consulted prioritised." loading="lazy"><figcaption>Select Coverage (circled).</figcaption></figure>' +
      '<p>How often each program needs consulting depends on its risk: every 6 months for high-risk programs, every 12 to 18 months for medium-risk and every 24 months for low-risk. Programs that have never been consulted should come first.</p>' +
      '<ol class="ov-list">' +
        '<li><h4>Programs</h4><p>Each program’s units, risk score, last consultation and next due date, and its status: <b>Completed</b> once it’s been consulted, <b>Scheduled</b> when a consultation is booked, or its risk level, such as <b>High</b>, when one is due. Select <b>›</b> on a program to see the recommendations for that program.</p>' +
          '<figure class="shot" data-marks="1.7,3.3,7.7,4.9,oval,#"><img src="assets/img/ev-ic-cov-programs.png" alt="Program Consultation Coverage. BSB50120 Diploma of Business, 12 units, risk 6.2, last consulted 04 Nov 2026, next due 04 Nov 2027, Completed. SIT50422 Diploma of Hospitality Management, 28 units, risk 5.4, never consulted, next due 30 Nov 2026, Scheduled. CHC50121 Diploma of Early Childhood Education and Care, 28 units, risk 7.8, last consulted 27 Oct 2026, next due 27 Apr 2027, Completed. CHC30121 Certificate III in Early Childhood Education and Care, 17 units, risk 7.4, never consulted, High. ICT50220 Diploma of Information Technology, 20 units, risk 5.1, never consulted, Medium. Each has a › to open its recommendations." loading="lazy"><figcaption>The Programs tab (circled). A high-risk program is consulted every 6 months, so CHC50121’s next consultation is due in April.</figcaption></figure></li>' +
        '<li><h4>Recommendations</h4><p>Programs suggested for consultation across all your programs, with the type, risk score, when they were last consulted, the reason and a priority. Select <b>Generate Recommendations</b> to refresh them, and <b>Schedule</b> to book one.</p>' +
          '<figure class="shot" data-marks="10.3,3.6,10.3,4.9,oval,#; 89.2,43.1,3.1,0.1,underline,#"><img src="assets/img/ev-ic-cov-recs.png" alt="Consultation Recommendations. CHC30121, never consulted, risk 74 of 100, High priority. CPC30220 Certificate III in Carpentry, overdue, risk 78 of 100, last consulted 12 Mar 2026, a high-risk program last consulted over 6 months ago, High priority. ICT50220, never consulted, risk 51 of 100, Medium. SIS30321 Certificate III in Fitness and BSB20120 Certificate II in Workplace Skills, never consulted, Low. Each has Schedule and a snooze icon." loading="lazy"><figcaption>The Recommendations tab (circled), with the most urgent at the top. Select Schedule (underlined) on a program to book its consultation.</figcaption></figure></li>' +
      '</ol>' +
      '<p>When it’s done, record the evidence. See <a href="article.html?id=ev-record-consultation">Record industry consultation evidence</a>.</p>',

    'ev-record-consultation':
      '<p class="lead">Record each industry consultation as evidence of industry engagement, with the feedback received and any improvements it leads to.</p>' +
      '<h2 id="ways">Two ways to record a consultation</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>New Consultation</h4><p>For a past consultation that wasn’t scheduled. If it did have a schedule, mark that schedule complete afterwards and link it to this evidence. See <a href="article.html?id=ev-consultation#complete">Mark a consultation complete</a>.</p></li>' +
        '<li><h4>From Scheduled Consultations</h4><p>Records the evidence against a scheduled consultation and marks that schedule complete, in one step.</p></li>' +
      '</ol>' +
      '<h2 id="steps">Record a consultation</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Schedule</b> tab, under <b>Consultations</b>, select <b>Record</b>.' +
          '<figure class="shot" data-marks="88.7,63,7.8,7.7,oval,#"><img src="assets/img/ev-rec-actions.png" alt="Consultations, with View Scheduled Consultations, Add New, Record Evidence and View Evidence. Record, beside Record Evidence, is circled." loading="lazy"><figcaption>Select Record (circled) beside Record Evidence.</figcaption></figure></li>' +
        '<li>Choose how to record it:' +
          '<div class="sub-steps">' +
            '<div><h4><span class="sn">A</span>New Consultation</h4><p>Select <b>New Consultation</b> to record a consultation that isn’t in the scheduler.</p>' +
              '<figure class="shot" data-marks="2.2,65.9,95.9,28.5,zone,#"><img src="assets/img/ev-rec-new.png" alt="Record Evidence, to record a new consultation or select from your scheduled consultations. New Consultation, to record evidence for a consultation not in the scheduler, is outlined." loading="lazy"><figcaption>New Consultation (outlined).</figcaption></figure></div>' +
            '<div><h4><span class="sn">B</span>From Scheduled Consultations</h4><p>Select <b>Record Evidence</b> beside the scheduled consultation. Its programs, date and subject matter expert are filled in, and the schedule is marked complete when you save.</p>' +
              '<figure class="shot" data-marks="80.8,45,12.6,24,oval,#"><img src="assets/img/ev-rec-scheduled.png" alt="A scheduled consultation for CHC22015 Certificate II in Community Services, due 04 Nov 2026, Medium priority, assigned to the Training Manager, with the Community Services Expert as subject matter expert, status Scheduled. Record Evidence is circled." loading="lazy"><figcaption>Select Record Evidence (circled) beside the scheduled consultation.</figcaption></figure>' +
              '<figure class="shot shot-medium"><img src="assets/img/ev-rec-linked.png" alt="Record Evidence from Scheduled Consultation for CHC22015, with CHC22015 Certificate II in Community Services under Linked Programs." loading="lazy"><figcaption>The scheduled consultation’s program is already linked.</figcaption></figure></div>' +
          '</div></li>' +
        '<li>For a new consultation, select the programs it relates to, or leave them blank to record an organisation-wide consultation.' +
          '<figure class="shot shot-medium" data-marks="4.9,79.5,2.1,3.6,oval,#"><img src="assets/img/prog-ic-programs.png" alt="Industry Consultation, to document industry engagement for this course. Under Program Selection, with a search box, CHC22015 Certificate II in Community Services is ticked, with its tick box circled, and shown as a chip below the list. BSB50120 Diploma of Business, in System Default and in Business Faculty, is not ticked." loading="lazy"><figcaption>Tick the programs the consultation relates to (circled).</figcaption></figure>' +
        '</li>' +
        '<li>Enter the <b>Consultation Date</b> and <b>Method</b>, and the industry representative’s details.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-details.png" alt="Consultation Details: Consultation Date 27/10/2026 and Consultation Method Video conference." loading="lazy"><figcaption>The consultation date and method.</figcaption></figure>' +
          '<figure class="shot shot-medium" data-marks="75.4,4.6,23.8,11.4,oval,#"><img src="assets/img/prog-ic-rep.png" alt="Q1: Industry Representative Details, with a Select Existing Contact button, which is circled. Representative Name Community Services Expert, Organisation RTO Radar, Role or Position Subject Expert, and Email communityservicesexpert@rtoradar.com." loading="lazy"><figcaption>The industry representative’s details. Use Select Existing Contact (circled) to choose someone you’ve recorded before.</figcaption></figure>' +
        '</li>' +
        '<li>Tick the <b>Topics Discussed</b>, and add any others.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-topics.png" alt="Q2: Topics Discussed. Ticked: training content relevance to current industry practices, assessment methods and industry standards, equipment and technology requirements, emerging skills and knowledge requirements, workplace health and safety considerations, and employment pathways and job roles. Industry licensing or regulatory requirements is not ticked. Other Topics: work placement availability and supervision; digital literacy for client records." loading="lazy"><figcaption>The topics covered in the consultation.</figcaption></figure>' +
        '</li>' +
        '<li>Under <b>Key Feedback Received</b>, summarise the insights, suggestions and gaps identified.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-ic-feedback.png" alt="Q3: Key Feedback Received, to document the main insights, suggestions and outcomes from the consultation. The feedback covers relevant core content, digital client records and case notes, de-escalation and boundary-setting in role-plays, working alone and home-visit safety, pathways to further study, and an offer to host two placement students per term." loading="lazy"><figcaption>The key feedback from the consultation.</figcaption></figure>' +
        '</li>' +
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
      '</ol>' +
      '<p>You can also record a consultation from a course. See <a href="article.html?id=prog-industry-consultation">Record an industry consultation</a>.</p>',

    'ev-consultation-history':
      '<p class="lead">Every recorded consultation is kept in the consultation evidence history, ready for audit.</p>' +
      '<h2 id="open">Open the evidence history</h2>' +
      '<p>On the <b>Schedule</b> tab, under <b>Consultations</b>, select <b>View</b> beside <b>View Evidence</b>.</p>' +
      '<figure class="shot" data-marks="90.2,82.5,6.6,7,oval,#"><img src="assets/img/ev-hist-open.png" alt="Consultations, with View Scheduled Consultations, Add New, Record Evidence and View Evidence. View, beside View Evidence, is circled." loading="lazy"><figcaption>Select View (circled) beside View Evidence.</figcaption></figure>' +
      '<p>Each record shows its date, method, representative, programs, teams and topics. Search by representative or program, or filter the list.</p>' +
      '<figure class="shot" data-marks="73.3,57,#1; 75.3,73.5,#2; 86.5,57,#3; 91.1,57,#4; 95.5,57,#5"><img src="assets/img/ev-hist-list.png" alt="Consultation Evidence History, showing 4 records. A consultation on 27 Oct 2026 by video conference with the Community Services Expert from RTO Radar, for CHC22015 Certificate II in Community Services, in Community and Health, with seven topics discussed. Its icons are numbered: view 1, edit 2, download 3, action items 4, with a badge showing 3, and delete 5." loading="lazy"><figcaption>View (1), edit (2), download (3), action items (4) and delete (5).</figcaption></figure>' +
      '<h2 id="actions">Record actions</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>View</h4><p>Opens the full record: the representative, programs, topics, key feedback with any linked feedback submissions, the attachment and the action items.</p>' +
          '<figure class="shot shot-medium" data-marks="84.2,6.5,9.6,4,oval,#"><img src="assets/img/ev-hist-view.png" alt="Consultation Details, with an Edit button at the top right, which is circled. The record is for 27 October 2026, by video conference with the Community Services Expert, Subject Expert at RTO Radar, for CHC22015 Certificate II in Community Services. Topics discussed are listed, followed by the key feedback, with linked feedback evidence FS-0010 from Training Delivery." loading="lazy"><figcaption>The full consultation record. Select Edit (circled) to change it.</figcaption></figure></li>' +
        '<li><h4>Edit</h4><p>Select the pencil, or <b>Edit</b> in the full record. Change the date, method, representative, topics or key feedback, then select <b>Save Changes</b>. Linked programs and attachments aren’t changed here.</p>' +
          '<figure class="shot shot-medium" data-marks="87.3,92.6,arrow-down,small"><img src="assets/img/ev-hist-edit.png" alt="Edit Consultation Details, noting that linked programs and attachments are not changed here. The date, method, representative name, organisation, role and email are filled in, six topics are ticked, other topics are added, and Key Feedback has formatting options. An arrow points down at Save Changes." loading="lazy"><figcaption>Edit the record, then select Save Changes.</figcaption></figure></li>' +
        '<li><h4>Download</h4><p>Downloads the record, with its attachment, for your audit evidence.</p></li>' +
        '<li><h4>Action items</h4><p>Shows the improvement items raised from the consultation, with who’s responsible, the due date, priority and status. Edit or delete each, or select <b>Add Action Item</b>. They’re tracked in the <a href="feature.html?m=cir">Continuous Improvement Register</a>.</p>' +
          '<figure class="shot" data-marks="2.6,87.4,7.2,7.6,oval,#"><img src="assets/img/ev-hist-actions.png" alt="Action Items (3): add a simulated client record-keeping task to the assessment, assigned to the Training Manager, due 31 Jan 2027, Medium, open; add working-alone and home-visit safety scenarios to WHS materials, Staff Demo, 28 Feb 2027, Medium, open; and publish pathway information in course marketing and pre-enrolment info, Student Services Coordinator, 15 Dec 2026, Low, open. Each has edit and delete icons, and Add Action Item is circled." loading="lazy"><figcaption>The consultation’s action items. Select Add Action Item (circled) to add another.</figcaption></figure></li>' +
        '<li><h4>Delete</h4><p>Deletes the record. Any improvement items raised from it are set to <b>Removed</b>. They stay in the Continuous Improvement Register for audit, marked as removed. Deleting can’t be undone, so only delete a record entered by mistake.</p>' +
          '<figure class="shot shot-medium" data-marks="80.4,83.4,arrow-down,small"><img src="assets/img/ev-hist-delete.png" alt="Delete Consultation Record, asking whether to delete this consultation with the Community Services Expert from RTO Radar. 3 linked CIR items will be set to Removed status and remain visible in the CI Register for audit purposes. This action cannot be undone. An arrow points down at Delete Consultation, beside Cancel." loading="lazy"><figcaption>Its 3 linked improvement items will be set to Removed. Select Delete Consultation.</figcaption></figure></li>' +
      '</ol>',

    'ev-validation':
      '<p class="lead">Plan unit validations across your programs, focusing on the units that carry the most risk.</p>' +
      '<h2 id="open">Open the Validation Scheduler</h2>' +
      '<p>Go to <b>Events</b> (1) › <b>Schedule</b> (2). Under <b>Unit Validation</b>, select <b>Schedule</b> (3) beside <b>Schedule Validation</b>.</p>' +
      '<figure class="shot" data-marks="1.6,85.4,3.7,6.5,oval,right,#1; 54.9,49.5,4.2,6.6,oval,#2"><img src="assets/img/ev-schedule-open.png" alt="The Events page for RTO Radar Demo, with Events in the navigation bar circled as 1 and the Schedule tab circled as 2." loading="lazy"><figcaption>Select Events (1), then the Schedule tab (2).</figcaption></figure>' +
      '<figure class="shot" data-marks="87.9,58.8,8.1,18.6,oval,#3"><img src="assets/img/ev-val-card.png" alt="Unit Validation, to schedule unit validations to ensure assessment quality, with Schedule Validation and its Schedule button, circled as 3." loading="lazy"><figcaption>Select Schedule (3) beside Schedule Validation.</figcaption></figure>' +
      '<h2 id="scheduled">Scheduled validations</h2>' +
      '<p>The <b>Scheduled</b> view lists each validation with its unit, team, program, status, validator, due date, when it was last validated and its priority. A validation can be <b>Scheduled</b>, <b>In progress</b>, <b>Completed</b>, <b>Overdue</b> or <b>Cancelled</b>. A validation in progress shows its version under the validator, and overdue validations are highlighted. Search, filter, or select <b>Export</b>.</p>' +
      '<figure class="shot"><img src="assets/img/ev-val-scheduled.png" alt="The Validation Scheduler on Scheduled, with 24 validations. CHCECE046 in CHC50121, Completed by the Compliance Officer, last validated 26 Oct 2026. CHCECE042 in CHC50121, In progress, Version 2, validated by the Design Manager, due 20 Nov 2026. CHCECE055 in CHC30121, Overdue since 30 Oct 2026, validator Training Coordinator, High priority, highlighted. SITXCCS015 in SIT50422, Scheduled for 27 Nov 2026 with the Design Manager. BSBLDR523 in BSB50120, Scheduled for 10 Dec 2026 with the Compliance Officer, last validated 14 Nov 2024. ICTSAS527 in ICT50220, Scheduled for 22 Jan 2027 with the IT Faculty Manager, High priority. BSBCRT511 in BSB50120, Cancelled." loading="lazy"><figcaption>Validations at each status, with the overdue one highlighted.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Choose a validator who didn’t deliver or assess the unit, so the validation is independent.</span></div>' +
      '<h2 id="coverage">Coverage and recommendations</h2>' +
      '<p>In the Validation Scheduler, select <b>Coverage</b> to see your average validation coverage, overdue validations, high-risk units and how many are scheduled.</p>' +
      '<figure class="shot" data-marks="77.5,8.8,4.3,4.6,oval,#"><img src="assets/img/ev-val-coverage.png" alt="The Validation Scheduler on Coverage, which is circled, beside Scheduled (24). The summary cards show 42% average coverage, 1 overdue validation, 12 high-risk units and 18 scheduled. A note explains risk-based validation sampling: all high-risk units, a 30% sample of medium-risk units and 10% of low-risk units, and always validate units never validated or overdue." loading="lazy"><figcaption>Select Coverage (circled).</figcaption></figure>' +
      '<p>Not every unit needs validating in each cycle. Validate all high-risk units, a 30% sample of medium-risk units and 10% of low-risk units, and always validate units that have never been validated or are overdue.</p>' +
      '<ol class="ov-list">' +
        '<li><h4>Programs</h4><p>Each program’s units, high-risk units, how many are validated and overdue, its coverage and its risk status, with high-risk programs first. Select <b>Schedule</b> to book a validation for a program, or <b>›</b> to see the recommendations for that program.</p>' +
          '<figure class="shot" data-marks="1.8,3.4,9.1,4.8,oval,#"><img src="assets/img/ev-val-cov-programs.png" alt="Program Validation Coverage on the Programs tab, which is circled. CHC30121 Certificate III in Early Childhood Education and Care: 17 units, 5 high risk, 6 of 17 validated, 1 overdue, 35% coverage, High. CHC50121 Diploma of Early Childhood Education and Care: 28 units, 4 high risk, 12 of 28 validated, 43%, High. ICT50220 Diploma of Information Technology: 20 units, 3 high risk, 5 of 20 validated, 25%, High. BSB50120 Diploma of Business: 12 units, 1 high risk, 6 of 12 validated, 50%, Medium. SIT50422 Diploma of Hospitality Management: 28 units, 2 high risk, 9 of 28 validated, 32%, Medium. Each has Schedule and a ›." loading="lazy"><figcaption>The Programs tab (circled), with high-risk programs first.</figcaption></figure></li>' +
        '<li><h4>Recommendations</h4><p>Units recommended for validation across all your programs, based on risk score, validation history and sampling requirements, with high-risk units first. Each shows the reason, such as <b>Overdue</b> or <b>Never validated</b>, and a priority. Select <b>Schedule</b> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="calendar" role="img"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/></svg> to book it, or the clock <svg class="ui-icon" viewBox="0 0 24 24" aria-label="clock" role="img"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3 2"/></svg> to defer the recommendation for now. Select <b>Generate Recommendations</b> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="trend" role="img"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg> to refresh the list.</p>' +
          '<figure class="shot" data-marks="12.4,3.6,12.8,4.9,oval,#"><img src="assets/img/ev-val-cov-recs.png" alt="Validation Recommendations on the Recommendations tab, which is circled. CHCECE055 in CHC30121, risk 78, last validated 30 Oct 2026, Overdue, High. CHCECE054 in CHC30121, risk 72, never validated, High. ICTSAS527 in ICT50220, risk 64, never validated, High. CHCPRT001 in CHC50121, risk 61, last validated 12 Aug 2024, Overdue, High. SITXFSA005 in SIT50422, risk 48, never validated, Medium. Each has Schedule and a clock to defer it." loading="lazy"><figcaption>The Recommendations tab (circled), with high-risk units first.</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="schedule">Schedule a validation</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Events</b> (1) › <b>Schedule</b> (2), and select <b>Schedule</b> (3) beside <b>Schedule Validation</b>. This opens the Validation Scheduler, where you select <b>Schedule</b> (4) at the top right.' +
          '<figure class="shot" data-marks="1.3,48.2,4.6,2.6,oval,right,#1; 57,2.8,4.3,2.4,oval,right,#2; 84,85,7.7,4.2,oval,#3"><img src="assets/img/ev-val-open.png" alt="The Events page on the Schedule tab, showing Quick Actions. Events in the navigation bar is circled as 1, the Schedule tab as 2, and Schedule beside Schedule Validation, under Unit Validation, as 3." loading="lazy"><figcaption>Select Events (1), the Schedule tab (2), then Schedule (3) beside Schedule Validation.</figcaption></figure>' +
          '<figure class="shot" data-marks="91.9,30,6.8,34,oval,#4"><img src="assets/img/ev-val-header.png" alt="The Validation Scheduler header, with Scheduled (24), Coverage and Export. Schedule, at the top right, is circled as 4." loading="lazy"><figcaption>In the Validation Scheduler, select Schedule (4).</figcaption></figure></li>' +
        '<li>Choose the <b>Program</b>, then the <b>Unit</b>.</li>' +
        '<li>Choose the <b>Scheduled Date</b> and the <b>Assigned Validator</b>.</li>' +
        '<li>Set the <b>Priority Level</b>, and add <b>Notes</b> for the validator, such as what to check and which assessments to sample.' +
          '<figure class="shot shot-medium" data-marks="74.6,92,22.4,5.4,oval,#"><img src="assets/img/ev-val-form.png" alt="Schedule Validation for BSB50120 Diploma of Business, in the Business Faculty, and the unit BSBFIN501 Manage budgets and financial plans. The scheduled date is 20/11/2026, the assigned validator is Staff Demo and the priority is Medium. The notes read: Annual validation for the 2027 intake. Check the budget project and marking guide cover all performance and knowledge evidence. Sample 5 completed assessments: 2 satisfactory, 2 not yet satisfactory and 1 resubmission. The Schedule Validation button is circled." loading="lazy"><figcaption>A validation for BSBFIN501, with notes for the validator. Select Schedule Validation (circled).</figcaption></figure></li>' +
        '<li>Select <b>Schedule Validation</b>. It appears in the scheduler, on the calendar and in the validator’s courses.</li>' +
      '</ol>' +
      '<p>You can also schedule a validation from a course. See <a href="article.html?id=prog-schedule-validation">Schedule, start or continue a unit validation</a>.</p>',

    'pd-overview':
      '<p class="lead">Professional development (PD) keeps your staff’s skills and industry knowledge current. In RTO Radar, Admins set up PD sessions and assign them, staff enrol in and complete PD with evidence, and Admins approve that evidence so it can be used in evidence maps.</p>' +
      '<h2 id="where">Where PD appears</h2>' +
      '<ul>' +
        '<li><b>Settings</b> › <b>Professional Development</b>: where Admins choose PD settings and add providers and sessions. See <a href="article.html?id=pd-configure">Set up Professional Development</a>.</li>' +
        '<li><b>Workforce Management</b> › <b>PD Calendar</b>: each staff member’s PD. Admins assign PD here, and mark their own PD complete. See <a href="article.html?id=pd-assign">Assign PD to a staff member</a>.</li>' +
        '<li><b>Events</b> › <b>Professional Development</b>: where staff see their PD, browse the catalogue, enrol, request approval for paid PD and complete PD. See <a href="article.html?id=pd-enrol">Find and enrol in PD</a>.</li>' +
        '<li><b>My Documents</b> and the <b>Documents</b> tab: where PD evidence is kept, and where Admins approve it. See <a href="article.html?id=pd-complete#approve">Approve PD evidence</a>.</li>' +
      '</ul>' +
      '<h2 id="flow">How PD flows through RTO Radar</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>Set up</h4><p>An Admin chooses the PD settings, adds the providers who deliver PD, then schedules PD sessions. See <a href="article.html?id=pd-configure">Set up Professional Development</a>.</p></li>' +
        '<li><h4>Assign or enrol</h4><p>An Admin assigns a session to a staff member, or staff enrol themselves from the catalogue. See <a href="article.html?id=pd-assign">Assign PD to a staff member</a> and <a href="article.html?id=pd-enrol">Find and enrol in PD</a>.</p></li>' +
        '<li><h4>Request approval for paid PD</h4><p>If your RTO uses approvals, staff send an expression of interest (EOI) request before enrolling in a paid session. See <a href="article.html?id=pd-eoi">Request approval for paid PD</a>.</p></li>' +
        '<li><h4>Complete</h4><p>After the session, staff mark it complete, describe what they learnt and attach evidence, such as a certificate. See <a href="article.html?id=pd-complete">Complete PD and attach evidence</a>.</p></li>' +
        '<li><h4>Approve the evidence</h4><p>An Admin approves the evidence. Approved documents can then be used in the staff member’s evidence maps. See <a href="article.html?id=pd-complete#approve">Approve PD evidence</a>.</p></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Only approved documents can be used as evidence in an evidence map. See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a>.</span></div>',

    'pd-configure':
      '<p class="lead">Before PD can be assigned or enrolled in, an Admin sets it up in <b>Settings</b> › <b>Professional Development</b>: the <b>settings</b> that decide how PD works at your RTO, the <b>providers</b> who deliver PD, and the <b>sessions</b> themselves.</p>' +
      '<h2 id="settings">Choose your PD settings</h2>' +
      '<p>Go to <b>Settings</b> › <b>Professional Development</b>. The <b>Settings</b> tab opens first.</p>' +
      '<figure class="shot" data-marks="0.9,89.4,6.8,6.8,oval,right,#1; 61,48,14.2,7.2,oval,above,#2"><img src="assets/img/pd-settings-open.png" alt="Organisation Settings, with Settings on the navigation bar circled as 1 and the Professional Development tab, beside Integrations, User Management, Security and Customisation, circled as 2. Professional Development is open on its Settings tab, beside Sessions and Providers." loading="lazy"><figcaption>Select Settings (1), then Professional Development (2).</figcaption></figure>' +
      '<figure class="shot" data-marks="14.5,7.4,8.2,3.2,oval,#; 25.5,14.8,#1; 24.5,28.7,#2; 26.5,47,#3; 28,65.3,#4; 18.5,85.6,#5"><img src="assets/img/pd-settings.png" alt="Professional Development settings on the Settings tab, which is circled, beside the Sessions and Providers tabs. 1: PD Calendar Module, with Enable PD Calendar on. 2: Catalogue Visibility, with Show Global Catalogue and Show Organisation Catalogue both on. 3: Paid PD Configuration, with Show Paid PD Items on and Require Approval for Paid PD off. 4: Evidence Requirements, with Require Completion Evidence on and the allowed evidence types certificate, receipt, screenshot, reflection and other. 5: Default Tags SRTO 2025, Assessment, Training Delivery, Industry Currency and Compliance, with a box to add a new tag." loading="lazy"><figcaption>The Settings tab (circled), with its five groups of PD settings (1–5).</figcaption></figure>' +
      '<ol class="ov-list">' +
        '<li><h4>PD Calendar Module</h4><p>Turn on <b>Enable PD Calendar</b> so staff can browse and enrol in PD in <b>Events</b> › <b>Professional Development</b>. While it’s off, staff can’t find or enrol in PD.</p></li>' +
        '<li><h4>Catalogue Visibility</h4><p>Choose which PD staff see in <b>Browse Catalogue</b>: the <b>Global Catalogue</b>, platform-wide PD from global providers, and the <b>Organisation Catalogue</b>, the sessions your RTO adds below. See <a href="article.html?id=pd-enrol">Find and enrol in PD</a>.</p></li>' +
        '<li><h4>Paid PD Configuration</h4><p><b>Show Paid PD Items</b> lets staff see paid sessions in the catalogue. Turn on <b>Require Approval for Paid PD</b> if staff must send an EOI request before registering for paid PD. See <a href="article.html?id=pd-eoi">Request approval for paid PD</a>.</p></li>' +
        '<li><h4>Evidence Requirements</h4><p>Turn on <b>Require Completion Evidence</b> if staff must attach evidence to mark PD complete. <b>Allowed Evidence Types</b> lists the types staff can attach: certificate, receipt, screenshot, reflection and other. See <a href="article.html?id=pd-complete">Complete PD and attach evidence</a>.</p></li>' +
        '<li><h4>Default Tags</h4><p>The tags offered for PD sessions, which help staff find them. Type a tag and select <b>+</b> to add it, or select <b>×</b> on a tag to remove it. Tags that match the Standards, such as SRTO 2025 or Industry Currency, make PD easier to find for evidence.</p></li>' +
      '</ol>' +
      '<div class="callout tip"><b>Tip</b><span>Keep <b>Require Completion Evidence</b> on. Only approved evidence can be used in an evidence map, so PD completed without evidence can’t support a trainer’s currency.</span></div>' +
      '<h2 id="provider">Add a provider</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> (1) › <b>Professional Development</b> (2), open the <b>Providers</b> tab (3) and select <b>Add Provider</b> (4).' +
          '<figure class="shot" data-marks="0.9,90.2,6.8,6.9,oval,right,#1; 61,48.6,14.2,7.3,oval,above,#2; 79,87,6.8,6.2,oval,right,#3"><img src="assets/img/pd-providers-open.png" alt="Organisation Settings, with Settings on the navigation bar circled as 1, the Professional Development tab circled as 2, and the Providers tab of Professional Development, beside Settings and Sessions, circled as 3." loading="lazy"><figcaption>Select Settings (1), Professional Development (2), then the Providers tab (3).</figcaption></figure>' +
          '<figure class="shot" data-marks="82.9,29.2,13.6,7.8,oval,#4"><img src="assets/img/pd-providers.png" alt="PD Providers, listing each provider with its scope, website and actions. RTO Logic, Velg Training and VETQI Learning Hub are Global, each with a switch and a view icon. RTO Radar is Organisation, with a view icon and a menu. Add Provider, at the top right, is circled as 4." loading="lazy"><figcaption>On the Providers tab, select Add Provider (4).</figcaption></figure></li>' +
        '<li>Enter the <b>Provider Name</b>, and optionally a <b>Description</b> and the provider’s <b>Website URL</b>. Then select <b>Add Provider</b>.' +
          '<figure class="shot shot-small" data-marks="72.6,87,23.6,9.4,oval,#"><img src="assets/img/pd-provider-add.png" alt="Add Provider, to add a new professional development provider. The Provider Name is VET Practice Network. The description reads: Professional development for VET trainers and assessors, covering the Standards for RTOs 2025, assessment design and validation, and strategies for maintaining industry currency. Workshops are delivered online and face to face. The Website URL is https://www.vetpracticenetwork.com.au. The Add Provider button is circled." loading="lazy"><figcaption>A provider with a description and website. Select Add Provider (circled).</figcaption></figure></li>' +
        '<li>The provider appears in the list with the scope <b>Organisation</b>. You can now choose it when you add a session.' +
          '<figure class="shot" data-marks="4,83.4,92.2,10,zone,#"><img src="assets/img/pd-providers-added.png" alt="PD Providers, now listing VET Practice Network, outlined, below RTO Radar. Its scope is Organisation, with Visit, a view icon and a menu." loading="lazy"><figcaption>VET Practice Network, added as an Organisation provider (outlined).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Providers marked <b>Global</b>, and their sessions, are set up by the RTO Radar team for all RTOs, and appear in the Global Catalogue. Providers you add are marked <b>Organisation</b> and are only for your RTO. If you don’t want your organisation and its members to see a global provider’s PD, turn off its switch under <b>Actions</b>.</span></div>' +
      '<h2 id="manage">View, edit or delete a provider</h2>' +
      '<p>On the <b>Providers</b> tab, under <b>Actions</b>, select:</p>' +
      '<ol>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> to view the provider’s details.</li>' +
        '<li><b>⋯</b> on a provider you added, then <b>Edit</b> to change its details, or <b>Delete</b> to remove it.</li>' +
      '</ol>' +
      '<figure class="shot" data-marks="85.4,26.6,#1; 95.6,26.6,#2"><img src="assets/img/pd-provider-menu.png" alt="VET Practice Network on the Providers tab, an Organisation provider, with the view icon marked 1 and the ⋯ menu marked 2, open on Edit and Delete." loading="lazy"><figcaption>View (1), and the ⋯ menu (2) with Edit and Delete.</figcaption></figure>' +
      '<h2 id="session">Add a PD session</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> (1) › <b>Professional Development</b> (2), open the <b>Sessions</b> tab (3) and select <b>Add Session</b> (4).' +
          '<figure class="shot" data-marks="0.9,91.4,6.8,7.6,oval,right,#1; 61,49.6,14.2,7.4,oval,above,#2; 55.9,88.6,6.6,7.4,oval,right,#3"><img src="assets/img/pd-sessions-open.png" alt="Organisation Settings, with Settings on the navigation bar circled as 1, the Professional Development tab circled as 2, and the Sessions tab of Professional Development, between Settings and Providers, circled as 3." loading="lazy"><figcaption>Select Settings (1), Professional Development (2), then the Sessions tab (3).</figcaption></figure>' +
          '<figure class="shot" data-marks="85,16.4,13.4,5.4,oval,#4"><img src="assets/img/pd-sessions.png" alt="The Sessions tab: schedule PD sessions for staff to enrol in. A search box and filters for status, delivery, cost, source and provider sit above the list of sessions, each with its date and time, delivery, cost, status and source. Most are Global sessions from RTO Logic, Velg Training and VETQI Learning Hub, free or paid, with view and open icons. RTO Radar Review, from RTO Radar, is a Tenant session with view, open, edit and delete icons. Add Session, at the top right, is circled as 4." loading="lazy"><figcaption>On the Sessions tab, select Add Session (4).</figcaption></figure></li>' +
        '<li>In <b>Schedule Session</b>, enter the <b>Title</b>, which is required. Choose the <b>Provider</b> you added (circled), and add a <b>Description</b> of what the session covers.' +
          '<figure class="shot shot-medium" data-marks="51.3,40.2,45,12.6,oval,#"><img src="assets/img/pd-session-details.png" alt="Schedule Session. The title is Assessment validation under the Standards for RTOs 2025, and the provider, circled, is VET Practice Network. The description reads: A practical workshop for trainers and assessors on planning and conducting assessment validation under the Standards for RTOs 2025. Covers risk-based sampling, reviewing assessment tools against unit requirements, checking assessment judgements, and recording outcomes and improvement actions. Participants receive a certificate of attendance." loading="lazy"><figcaption>The title, provider (circled) and description.</figcaption></figure></li>' +
        '<li>Choose the <b>Start Date/Time</b>, which is required, and enter the <b>Duration (hours)</b>. The end time is shown below it. Then choose the <b>Delivery Mode</b>, such as Online or Face to Face, and the <b>Cost Type</b>. For a paid session, enter the <b>Estimated Cost ($)</b>.' +
          '<figure class="shot shot-medium"><img src="assets/img/pd-session-when.png" alt="Start Date/Time 26/11/2026 10:00 AM, Duration 3 hours, ending at 1:00 PM. Delivery Mode is Online, Cost Type is Paid, and the Estimated Cost is 195 dollars." loading="lazy"><figcaption>A 3-hour online session on 26 November 2026, costing $195.</figcaption></figure></li>' +
        '<li>Enter the <b>Registration URL</b>, the page where staff register for the session. Under <b>Tags</b>, type a tag and select <b>Add</b> (arrow). Tags help staff find the session. Then select <b>Create Session</b> (circled).' +
          '<figure class="shot shot-medium" data-marks="86.8,50.1,arrow-right,small; 76.2,77.6,20.6,16.4,oval,#"><img src="assets/img/pd-session-tags.png" alt="The Registration URL is https://www.vetpracticenetwork.com.au/events/assessment-validation-2027. The tags SRTO 2025 and Assessment are added, and Compliance is typed in the Tags box beside Add, with an arrow pointing at Add. The Create Session button is circled." loading="lazy"><figcaption>Select Add (arrow) for each tag, then Create Session (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<p>The session appears on the <b>Sessions</b> tab as <b>Upcoming</b>, with the source <b>Tenant</b>, meaning it belongs to your RTO. It can now be assigned to staff. See <a href="article.html?id=pd-assign">Assign PD to a staff member</a>.</p>' +
      '<h2 id="manage-sessions">View, edit or delete a session</h2>' +
      '<p>On the <b>Sessions</b> tab, under <b>Action</b>, select:</p>' +
      '<ul>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="eye" role="img"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"/></svg> to view the session’s details.</li>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="open link" role="img"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg> to open its registration link.</li>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="pencil" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> to edit it.</li>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="bin" role="img"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg> to delete it.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="86.4,27,13,46,oval,#"><img src="assets/img/pd-session-actions.png" alt="Assessment validation under the Standards for RTOs 2025, from VET Practice Network, on 26 Nov 2026 10:00 am to 1:00 pm (GMT+11), Online, 195 dollars, Upcoming and Tenant. Its view, open link, edit and delete icons are circled." loading="lazy"><figcaption>The new session, with its actions circled.</figcaption></figure>' +
      '<p>You can edit or delete only your RTO’s own sessions. <b>Global</b> sessions, set up by the RTO Radar team, can only be viewed and opened.</p>',

    'pd-assign':
      '<p class="lead">Assign a PD session to a staff member from their <b>PD Calendar</b> in Workforce Management. It then appears in their PD in Events, with any notes you add.</p>' +
      '<h2 id="assign">Assign a PD session</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> (1) › <b>Workforce</b> (2), and select the staff member (3).' +
          '<figure class="shot" data-marks="1,38.6,11.2,3.8,oval,right,#1; 19,33.4,5.4,4,oval,above,#2; 35.1,90.3,arrow-left,#3"><img src="assets/img/wf-landing.png" alt="Workforce Management, circled as 1 on the navigation bar, with the Workforce tab circled as 2. The Workforce list shows three trainers, Ken Lombardo, John Doe and Staff Demo, with an arrow, marked 3, pointing left at Staff Demo." loading="lazy"><figcaption>Select Workforce Management (1), the Workforce tab (2), then the staff member (3), such as Staff Demo here.</figcaption></figure></li>' +
        '<li>Open the <b>PD Calendar</b> tab (1) and select <b>Assign PD</b> (2).' +
          '<figure class="shot" data-marks="14.4,22.4,5.4,3.4,oval,right,#1; 90.3,31.2,8.4,5.2,oval,above,#2"><img src="assets/img/wf-pd-open.png" alt="Staff Demo’s profile in Workforce Management, with the PD Calendar tab circled as 1. Professional Development shows 5 total PD, 1 completed, 4 pending and 2 overdue, and a list of sessions. The Assign PD button at the top right is circled as 2." loading="lazy"><figcaption>Open the PD Calendar tab (1), then select Assign PD (2).</figcaption></figure></li>' +
        '<li>Under <b>Session</b>, find the session. Search by title, provider or location, and narrow the list with the <b>Mode</b> and <b>Cost</b> filters. Tick <b>Include past events</b> to see sessions that have already run.' +
          '<figure class="shot shot-medium" data-marks="8.9,36.2,#1; 19.6,57.9,#2; 23.2,73.7,#3; 91.7,91.2,arrow-down,small"><img src="assets/img/pd-assign-form.png" alt="Assign Professional Development, assigning a PD session to Staff Demo, with 3 sessions listed. Assessment validation under the Standards for RTOs 2025, on 26 Nov 2026 at 10:00 am, Online, 195 dollars, from VET Practice Network, is selected, its radio button marked 1. Below the list: Due 26 Nov 2026 at 10:00 am. Requirement Type, marked 2, is Recommended. Admin Notes, marked 3, read: Supports your role as an assessment validator. Attach your certificate of attendance when you complete it, so it can be approved and used in your evidence map. An arrow points down at Assign PD." loading="lazy"><figcaption>The session (1), requirement type (2) and admin notes (3). Then select Assign PD.</figcaption></figure></li>' +
        '<li>Select the session’s radio button (1). Each session shows its date, mode, cost and provider, and its due date is shown below the list.</li>' +
        '<li>Choose the <b>Requirement Type</b> (2): Optional, Recommended or Mandatory. Optionally, add <b>Admin Notes</b> (3), such as why the session is needed.' +
          '<div class="callout note"><b>Note</b><span>Mandatory PD is flagged as overdue if it isn’t completed by its due date.</span></div></li>' +
        '<li>Select <b>Assign PD</b>.</li>' +
      '</ol>' +
      '<h2 id="calendar">View and manage assigned PD</h2>' +
      '<p>The session now appears on the staff member’s PD Calendar, marked <b>Admin assigned</b>, with your notes, its requirement type, due date and status. Under <b>Actions</b>, select:</p>' +
      '<ul>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="open link" role="img"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg> to open the session’s registration page.</li>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="tick" role="img"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM8 12l3 3 5-6"/></svg> to mark it complete. Then fill in the event description and evidence. See <a href="article.html?id=pd-complete#complete-details">Complete PD in Events</a>, from step 3.</li>' +
        '<li><svg class="ui-icon" viewBox="0 0 24 24" aria-label="cross" role="img"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6"/></svg> to remove the PD assignment.</li>' +
      '</ul>' +
      '<figure class="shot"><img src="assets/img/pd-assigned-row.png" alt="On Staff Demo’s PD Calendar: Assessment validation under the Standards for RTOs 2025, Admin assigned, with the note: Supports your role as an assessment validator. Attach your certificate of attendance when you complete it, so it can be approved and used in your evidence map. It runs 26 Nov 2026 10:00 am to 1:00 pm (GMT+11), is Recommended, due 26 Nov 2026 and Planned, with open link, tick and cross icons under Actions." loading="lazy"><figcaption>The assigned session, with your note and its actions.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Staff see PD you assign in <b>Events</b> › <b>Professional Development</b>, with your notes and a <b>Register</b> button that opens the session’s registration page. See <a href="article.html?id=pd-enrol#view">View enrolled PDs and register</a>.</span></div>',

    'pd-enrol':
      '<p class="lead">Staff find their PD in <b>Events</b>, in the Trainer/Assessor portal. You can browse the catalogue of sessions available to your RTO, enrol yourself, and see all the PD you’re enrolled in or assigned.</p>' +
      '<h2 id="enrol">Enrol in a PD session</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, go to <b>Events</b> (1) › <b>Professional Development</b> (2), and select <b>Browse Catalogue</b> (3).' +
          '<figure class="shot" data-marks="0.7,47.9,5.2,5.6,oval,right,#1; 70.8,45.4,12,7,oval,right,#2; 26.7,79.4,6.6,5,oval,#; 30,90.6,#3"><img src="assets/img/pd-staff-events.png" alt="Events in the Trainer/Assessor Portal, with Events circled on the navigation bar as 1, the Professional Development tab circled as 2, and the Browse Catalogue tab, between My PD and EOI Requests, circled as 3." loading="lazy"><figcaption>Select Events (1), the Professional Development tab (2), then Browse Catalogue (3).</figcaption></figure></li>' +
        '<li>Search for a session (1), or select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="filter" role="img"><path d="M3 4h18l-7 8.5V19l-4 2v-8.5z"/></svg> <b>Filters</b> to narrow the list, for example by date, delivery mode or provider. Tick <b>Include past events</b> to see sessions that have already run. Then select <b>Enrol</b> (2) on the session. It’s added to your PD.' +
          '<figure class="shot" data-marks="2.2,17.6,36.8,4.8,oval,#; 32,19.9,#1; 91.2,60.6,4.8,4.4,oval,#2"><img src="assets/img/pd-catalogue-enrol.png" alt="Browse Catalogue with Velg typed in the search box, circled as 1, beside Filters and Include past events. It shows 4 of 4 sessions from Velg Training as cards, each with its format, tags and price. Two show Enrolled, and VET Workforce Week: The FUNdamentals for Creating Engaging Face-to-Face Training, $67, has its Enrol button circled as 2." loading="lazy"><figcaption>Search the catalogue (1), then select Enrol (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Enrolling adds the session to your PD in RTO Radar, so it’s tracked across the platform, such as on your PD Calendar and in your evidence. It doesn’t register you with the provider. To do that, select <b>Register</b> on the session in <b>My PD</b>. See <a href="#view">View enrolled PDs and register</a>.</span></div></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>If your RTO uses approvals for paid PD, a paid session shows <b>Request EOI</b> instead of <b>Enrol</b>. See <a href="article.html?id=pd-eoi">Request approval for paid PD</a>.</span></div>' +
      '<h2 id="view">View enrolled PDs and register</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, select <b>Events</b> (1) on the navigation bar, then open the <b>Professional Development</b> tab (2). <b>My PD</b> (3) opens first.' +
          '<figure class="shot" data-marks="0.7,47.9,5.2,5.6,oval,right,#1; 70.8,45.4,12,7,oval,right,#2; 22.3,79.4,2.8,5,oval,#; 23.7,90.6,#3"><img src="assets/img/pd-staff-events.png" alt="Events in the Trainer/Assessor Portal, with Events circled on the navigation bar as 1 and the Professional Development tab, beside Calendar, circled as 2. Professional Development is open on My PD, circled as 3, beside Browse Catalogue and EOI Requests." loading="lazy"><figcaption>Select Events (1), then the Professional Development tab (2). My PD (3) opens first.</figcaption></figure></li>' +
        '<li><b>My PD</b> lists your PD, with its status and requirement type, such as Interested and Recommended. PD assigned by an Admin shows here too, with any notes they added (1) and a <b>Register</b> button (2) that opens the session’s registration page.' +
          '<figure class="shot" data-marks="2.4,46,81,10.6,zone,#1; 76.6,27.8,9.6,8.4,oval,above,#2"><img src="assets/img/pd-staff-mypd.png" alt="My PD, listing Assessment validation under the Standards for RTOs 2025, tagged Interested and Recommended, with its description. The Admin’s note, outlined as 1, reads: Supports your role as an assessment validator. Attach your certificate of attendance when you complete it, so it can be approved and used in your evidence map. It runs 26 Nov 2026 at 10:00 am (GMT+11) and is due 26 Nov 2026. Register is circled as 2, beside Complete. Below is VET Workforce Week: AI for Trainers, Planned and Recommended." loading="lazy"><figcaption>An assigned session, with the Admin’s note (1) and Register (2).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span><b>Register</b> opens the provider’s website, where you register for the session itself. Enrolling in RTO Radar is different: it adds the session to your PD so RTO Radar can track it. See <a href="feature.html?m=pd#faq">the Professional Development FAQ</a>.</span></div></li>' +
      '</ol>' +
      '<p>Once you’ve done the session, mark it complete. See <a href="article.html?id=pd-complete">Complete PD and attach evidence</a>.</p>',

    'pd-eoi':
      '<p class="lead">Some RTOs ask staff to get approval before enrolling in paid PD. You do this with an expression of interest (EOI) request, which goes to the approver you choose. You send and track requests in <b>Events</b>, in the Trainer/Assessor portal.</p>' +
      '<div class="callout note"><b>Note</b><span>EOI requests are needed only when an Admin turns on <b>Require Approval for Paid PD</b>. If it’s off, paid sessions show <b>Enrol</b> like any other. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</span></div>' +
      '<h2 id="request">Request approval</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, go to <b>Events</b> (1) › <b>Professional Development</b> (2), and select <b>Browse Catalogue</b> (3).' +
          '<figure class="shot" data-marks="0.7,47.9,5.2,5.6,oval,right,#1; 70.8,45.4,12,7,oval,right,#2; 26.7,79.4,6.6,5,oval,#; 30,90.6,#3"><img src="assets/img/pd-staff-events.png" alt="Events in the Trainer/Assessor Portal, with Events circled on the navigation bar as 1, the Professional Development tab circled as 2, and the Browse Catalogue tab, between My PD and EOI Requests, circled as 3." loading="lazy"><figcaption>Select Events (1), the Professional Development tab (2), then Browse Catalogue (3).</figcaption></figure></li>' +
        '<li>Find the paid session and select <b>Request EOI</b> (circled). Paid sessions show their price, such as $59.' +
          '<figure class="shot" data-marks="20.6,88.6,10.8,5.4,oval,#"><img src="assets/img/pd-catalogue-eoi.png" alt="Browse Catalogue, showing sessions 13 to 20 of 20 as cards, with a search box, Filters and Include past events ticked. Free sessions show Enrol, and sessions already enrolled show Enrolled. Focus Week: AI - Designing Assessment Tasks that Support Authentic AI Use, by Velg Training, 22 July 2026, costs $59, and its Request EOI button is circled." loading="lazy"><figcaption>A paid session, with Request EOI (circled).</figcaption></figure></li>' +
        '<li>In <b>EOI Request</b>, choose who should approve it under <b>Select Approver</b>. Optionally, add <b>Approving Notes</b> explaining why you need the PD. Then select <b>Submit EOI Request</b> (circled).' +
          '<figure class="shot shot-small" data-marks="59.2,88.4,35.6,7.8,oval,#"><img src="assets/img/pd-eoi-form.png" alt="EOI Request: submit an expression of interest for approval before enrolling in this paid session. The session is Focus Week: AI - Designing Assessment Tasks that Support Authentic AI Use, by Velg Training, $59. The approver is Admin Demo. The approving notes read: This masterclass will help me redesign our BSB50120 assessment tasks for AI use, an action from our last validation. The Submit EOI Request button is circled." loading="lazy"><figcaption>The approver and your notes. Select Submit EOI Request (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<h2 id="track">Track PD requests</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, go to <b>Events</b> (1) › <b>Professional Development</b> (2), and select <b>EOI Requests</b> (3).' +
          '<figure class="shot" data-marks="0.7,47.9,5.2,5.6,oval,right,#1; 70.8,45.4,12,7,oval,right,#2; 35,79.4,5.8,5,oval,#; 37.9,90.6,#3"><img src="assets/img/pd-staff-events.png" alt="Events in the Trainer/Assessor Portal, with Events circled on the navigation bar as 1, the Professional Development tab circled as 2, and the EOI Requests tab, beside My PD and Browse Catalogue, circled as 3." loading="lazy"><figcaption>Select Events (1), the Professional Development tab (2), then EOI Requests (3).</figcaption></figure></li>' +
        '<li><b>EOI Requests</b> lists your requests, with who submitted them, the approver, the date and the status: <b>Pending</b>, <b>Approved</b> or <b>Declined</b>. A pending request shows <b>Awaiting approval</b>.' +
          '<figure class="shot" data-marks="80.4,80.6,7.2,9.2,oval,#"><img src="assets/img/pd-eoi-list.png" alt="The EOI Requests tab, listing three requests submitted by Staff Demo on 04 Nov 2026, each with Admin Demo as approver and a View button. VET Workforce Week: The FUNdamentals is Approved, Focus Week - Revised Standards is Declined, and Focus Week: AI - Designing Assessment Tasks is Pending, Awaiting approval. Its View button is circled." loading="lazy"><figcaption>Requests that are approved, declined and pending. Select View (circled) to see a request’s details.</figcaption></figure></li>' +
        '<li>Select <b>View</b> on a request to see its details, including the session, its cost, your approving notes and its status. The approver reviews the details, then selects <b>Decline</b> or <b>Approve</b> (circled).' +
          '<figure class="shot shot-medium" data-marks="65.6,90.6,31.6,6.6,oval,#"><img src="assets/img/pd-eoi-details.png" alt="EOI Request Details: review all session details before approving or declining. Submitted by Staff Demo on 04 Nov 2026, with Admin Demo as approver. The session is Focus Week: AI - Designing Assessment Tasks that Support Authentic AI Use, from Velg Training, with its description, on 22 July 2026 from 1:00 am to 2:00 am (GMT+10), Online, 1 hour, $59, and its registration link. The approving notes read: This masterclass will help me redesign our BSB50120 assessment tasks for AI use, an action from our last validation. Status is Pending. Decline and Approve are circled." loading="lazy"><figcaption>The request’s details, with Decline and Approve (circled).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Only Admins with permission to create or edit PD can approve or decline an EOI request.</span></div></li>' +
        '<li>Once your request is approved, go back to <b>Browse Catalogue</b> and select <b>Enrol</b> on the session.' +
          '<figure class="shot" data-marks="26.2,89.4,4.8,5.2,oval,#"><img src="assets/img/pd-catalogue-approved.png" alt="Browse Catalogue, showing sessions 13 to 20 of 20 as cards. Focus Week: AI - Designing Assessment Tasks that Support Authentic AI Use, by Velg Training, $59, now shows Enrol, circled, in place of Request EOI. Other sessions show Enrol or Enrolled." loading="lazy"><figcaption>The approved paid session now shows Enrol (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Once you’ve enrolled, register for the session with the provider. See <a href="article.html?id=pd-enrol#view">View enrolled PDs and register</a>.</p>',

    'pd-complete':
      '<p class="lead">After a PD session, mark it complete, describe what you learnt and attach your evidence, such as a certificate. Your evidence is then kept in your documents, ready for an Admin to approve. Staff complete PD and upload evidence in the Trainer/Assessor portal.</p>' +
      '<h2 id="staff">Complete PD in Events</h2>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, go to <b>Events</b> (1) › <b>Professional Development</b> (2). <b>My PD</b> (3) opens first.' +
          '<figure class="shot" data-marks="0.7,47.9,5.2,5.6,oval,right,#1; 70.8,45.4,12,7,oval,right,#2; 22.3,79.4,2.8,5,oval,#; 23.7,90.6,#3"><img src="assets/img/pd-staff-events.png" alt="Events in the Trainer/Assessor Portal, with Events circled on the navigation bar as 1, the Professional Development tab circled as 2, and My PD, beside Browse Catalogue and EOI Requests, circled as 3." loading="lazy"><figcaption>Select Events (1), then the Professional Development tab (2). My PD (3) opens first.</figcaption></figure></li>' +
        '<li>Once the session has run, select <b>Complete</b> on it (circled).' +
          '<figure class="shot" data-marks="86.4,72.8,9.8,6.6,oval,#"><img src="assets/img/pd-mypd-complete.png" alt="My PD, listing three sessions, each with Register and Complete buttons: Focus Week: AI - Designing Assessment Tasks that Support Authentic AI Use, Planned; VET Workforce Week: The FUNdamentals for Creating Engaging Face-to-Face Training, Interested; and Assessment validation under the Standards for RTOs 2025, Interested and Recommended, with the Admin’s note, 26 Nov 2026 at 10:00 am and due 26 Nov 2026. Its Complete button is circled." loading="lazy"><figcaption>Select Complete (circled) on the session.</figcaption></figure></li>' +
        '<li id="complete-details">Under <b>Event Description</b>, describe the outcome or key takeaways. This also serves as your reflection on the session.' +
          '<figure class="shot"><img src="assets/img/pd-complete-description.png" alt="Complete PD Session for Assessment validation under the Standards for RTOs 2025. The Event Description reads: Completed a 3-hour online workshop on assessment validation under the Standards for RTOs 2025. My key takeaways were how to use risk-based sampling to choose units for validation, review assessment tools against unit requirements, and check that assessment judgements are consistent. I will apply this when validating BSB50120 Diploma of Business units with the Business Faculty." loading="lazy"><figcaption>An event description with the key takeaways.</figcaption></figure></li>' +
        '<li>Under <b>Attach Evidence</b>, select <b>Add file</b> (circled).' +
          '<figure class="shot" data-marks="89.9,10,8.6,46,oval,#"><img src="assets/img/pd-complete-addfile.png" alt="Attach Evidence, marked Required, with no files attached yet. Click Add file to upload evidence. The Add file button is circled." loading="lazy"><figcaption>Select Add file (circled).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Evidence shows as <b>Required</b> when an Admin has turned on <b>Require Completion Evidence</b> in the PD settings. Otherwise it’s optional. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</span></div></li>' +
        '<li>Choose the document type, such as <b>Certificate</b>, and your file. To name the document yourself, choose <b>Other</b> and type a name. Write a detailed description of the file, and set the <b>Issue Date</b>. Then select <b>Complete PD</b>.' +
          '<figure class="shot" data-marks="93.5,91.6,arrow-down,small"><img src="assets/img/pd-complete-evidence.png" alt="Attach Evidence with a Certificate attached: Certificate_of_Attendance_Assessment_Validation_2026.pdf. The file description reads: Certificate of Attendance – Assessment validation under the Standards for RTOs 2025, VET Practice Network. Completed 26 November 2026, 3 hours, online. Topics covered include: planning validation with risk-based sampling; reviewing assessment tools against unit requirements, including performance evidence, knowledge evidence and assessment conditions; checking the consistency of assessment judgements; recording validation outcomes and improvement actions. Strengthened my ability to plan and conduct assessment validation for BSB50120 Diploma of Business units, including BSBFIN501 Manage budgets and financial plans, in line with the Standards for RTOs 2025. The Issue Date is 26/11/2026. An arrow points down at Complete PD." loading="lazy"><figcaption>A certificate with a detailed description. Then select Complete PD.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Each file’s description combines the Event Description with its own description. RTO Radar’s AI reads the descriptions, not the files, so describe what the PD covered and how it supports your delivery. See <a href="#description">Write a good description</a>.</span></div></li>' +
        '<li>Trainers and assessors find their attached files in <b>My Documents</b>. Each stays <b>Pending</b> (circled) until an Admin approves it.' +
          '<figure class="shot" data-marks="57.4,81.4,7,11.6,oval,#"><img src="assets/img/pd-mydocs-pending.png" alt="My Documents, showing 16 of 16 documents, with Category and Status filters and an Upload Document button. Assessment validation under the Standards for RTOs 2025 - Certificate is listed with the status Pending, circled, and expiry Not Applicable." loading="lazy"><figcaption>The certificate in My Documents, Pending approval (circled).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span><b>My Documents</b> is part of the Trainer/Assessor portal. Admins see a staff member’s documents in <b>Workforce Management</b> › <b>Workforce</b> › the staff member’s profile › <b>Documents</b>. See <a href="#approve">Approve PD evidence</a>.</span></div></li>' +
      '</ol>' +
      '<h2 id="description">Write a good description</h2>' +
      '<p>When an evidence map is created, RTO Radar’s AI writes your vocational competency and industry currency statements from your documents. To protect your personal information, the AI reads only the description, not the file itself, so the more detail you give, the stronger your evidence.</p>' +
      '<p>Describe what the PD covered and how it improves your delivery. For a qualification, list the units it covers, with their codes and titles.</p>' +
      '<div class="demo demo-text"><span class="demo-label">Example description</span>' +
        '<p>This workshop on digital learning tools has equipped me with skills to integrate technology effectively into my classroom instruction.</p>' +
        '<p>Units completed include:<br>CHCCOM005 Communicate and work in health or community services</p>' +
        '<p>Developed communication skills, awareness of diversity, safe work practices and introductory client support skills.</p>' +
      '</div>' +
      '<p>For more, see <a href="article.html?id=wf-description">Write a good document description</a>.</p>' +
      '<h2 id="upload">Upload PD evidence directly</h2>' +
      '<p>Already have evidence of PD you’ve done, such as a certificate from an outside course? Upload it straight to <b>My Documents</b> in the Trainer/Assessor portal, as Professional Development.</p>' +
      '<ol class="steps-list">' +
        '<li>In the Trainer/Assessor portal, go to <b>My Documents</b> (1) and select <b>Upload Document</b> (2).' +
          '<figure class="shot" data-marks="1,24.4,9.4,4.6,oval,right,#1; 81.4,68.4,13.2,5.8,oval,#2"><img src="assets/img/pd-mydocs.png" alt="My Documents in the Trainer/Assessor Portal, circled as 1 on the navigation bar. Cards show 16 total documents, 14 verified, 1 pending review and 1 rejected, above the My Documents and My Document Checklist tabs and the Document Categories Guide. Upload Document is circled as 2." loading="lazy"><figcaption>Select My Documents (1), then Upload Document (2).</figcaption></figure></li>' +
        '<li>Select your file (1). Under <b>Category</b>, choose <b>Professional Development</b> (2).' +
          '<figure class="shot" data-marks="24.6,56.6,47,11,oval,#1; 2,84.6,15.6,11.4,oval,right,#2"><img src="assets/img/pd-upload-file.png" alt="Upload Professional Development: upload PD certificates, workshop completions and training records. The selected file, Staff_Demo_Webinar_Certificate_The_Widened_RTO_Legislation_Lens_17_Mar_2026.pdf, is circled as 1, and the Category, Professional Development, as 2." loading="lazy"><figcaption>The file (1) and the Professional Development category (2).</figcaption></figure></li>' +
        '<li>Enter the <b>Document Name</b>, then write a detailed <b>Description</b>. RTO Radar’s AI reads the description, not the file, to write your evidence statements. See <a href="#description">Write a good description</a>.' +
          '<figure class="shot"><img src="assets/img/pd-upload-details.png" alt="The Document Name is The Widened RTO Legislation Lens - Webinar Certificate. The description, 1,043 of 5,000 characters, reads: Attending the webinar The Widened RTO Legislation Lens supported my professional development as a trainer and assessor by strengthening my understanding of the legislative and regulatory environment governing Registered Training Organisations (RTOs). The session provided valuable insights into current compliance expectations, the responsibilities of trainers and assessors, and the importance of aligning training and assessment practices with national standards and regulatory requirements. This knowledge assists me in ensuring that my training delivery, assessment decisions, and documentation meet quality assurance expectations and support continuous improvement within the RTO framework. The webinar also highlighted practical approaches to maintaining compliance while promoting effective, evidence-based training practices. As a result, it has enhanced my ability to contribute to quality training outcomes, uphold professional standards, and remain informed about legislative updates that affect my training and assessment practice." loading="lazy"><figcaption>A document name and a detailed description.</figcaption></figure></li>' +
        '<li>Pick the <b>Completion/Issue Date</b>. Set the <b>Document Expiry</b> if it has one, or tick <b>This document does not expire</b>. Then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="91.5,80,arrow-down,small"><img src="assets/img/pd-upload-date.png" alt="The Completion/Issue Date is 17/03/2026. Document Expiry is empty, with This document does not expire ticked. An arrow points down at Upload Document." loading="lazy"><figcaption>The completion date, with no expiry. Then select Upload Document.</figcaption></figure></li>' +
        '<li>Find your document in <b>My Documents</b>. It shows as <b>Pending</b> (circled), which means it’s awaiting approval by an Admin.' +
          '<figure class="shot" data-marks="57.4,71,7,8.4,oval,#"><img src="assets/img/pd-mydocs-uploaded.png" alt="My Documents, showing 16 of 16 documents. Implement AI Ethically in VET Settings - Certificate is Approved, The Widened RTO Legislation Lens - Webinar Certificate is Pending, circled, and Working With Children Check (WWCC) - Victoria is Approved, expiring 29/03/2026." loading="lazy"><figcaption>The uploaded certificate, Pending approval (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Uploaded documents stay Pending until an Admin approves them. Only approved documents can be used as evidence of vocational competency and industry currency in an evidence map. See <a href="#approve">Approve PD evidence</a>.</span></div>' +
      '<h2 id="approve">Approve PD evidence</h2>' +
      '<p>Evidence attached to PD stays Pending until an Admin approves it. Approving it confirms it’s the right document, that it hasn’t expired, and that its description is detailed enough to use as evidence.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> › <b>Workforce</b>, select the staff member, then open the <b>Documents</b> tab. On the Pending PD document’s row, select the tick.' +
          '<figure class="shot" data-marks="92.1,78.7,2.7,7.1,oval,#"><img src="assets/img/wf-doc-details.png" alt="The Documents tab of the Staff Demo profile, listing three documents. On the row of a Pending Professional Development certificate, the tick under Actions is circled." loading="lazy"><figcaption>Select the tick on the Pending document.</figcaption></figure></li>' +
        '<li>Check the document against its description. Add any <b>Verification Notes</b>, then select <svg class="ui-icon" viewBox="0 0 24 24" aria-label="tick" role="img"><path d="M5 12l5 5 9-10"/></svg> <b>Approve</b>, or <svg class="ui-icon" viewBox="0 0 24 24" aria-label="cross" role="img"><path d="M6 6l12 12M18 6L6 18"/></svg> <b>Reject</b> to send it back.' +
          '<figure class="shot" data-marks="78.7,93.2,arrow-down,small; 85.8,93.2,arrow-down,small"><img src="assets/img/wf-doc-verify.png" alt="A Pending PD certificate opened for verification, with the document, its description, its details and a Verification Notes box. Arrows point at the Reject and Approve buttons." loading="lazy"><figcaption>Check the document, then select Approve or Reject.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Only approved documents can be used in an evidence map. Pending documents also appear under <b>Admin Action</b> on the Workforce Dashboard. See <a href="article.html?id=wf-documents">Upload and manage staff documents</a>.</span></div>',

    'pd-export':
      '<p class="lead">Download PD records for one staff member, or for your whole workforce.</p>' +
      '<h2 id="one">One staff member’s PD</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b> (1) › <b>Workforce</b> (2), and select the staff member (3).' +
          '<figure class="shot" data-marks="1,38.6,11.2,3.8,oval,right,#1; 19,33.4,5.4,4,oval,above,#2; 35.1,90.3,arrow-left,#3"><img src="assets/img/wf-landing.png" alt="Workforce Management, circled as 1 on the navigation bar, with the Workforce tab circled as 2. The Workforce list shows three trainers, Ken Lombardo, John Doe and Staff Demo, with an arrow, marked 3, pointing left at Staff Demo." loading="lazy"><figcaption>Select Workforce Management (1), the Workforce tab (2), then the staff member (3), such as Staff Demo here.</figcaption></figure></li>' +
        '<li>Open their <b>PD Calendar</b> tab (1) and select <b>Export CSV</b> (2).' +
          '<figure class="shot" data-marks="15.6,11.6,5.2,2.4,oval,right,#1; 81.4,19.4,8,3.2,oval,#2"><img src="assets/img/pd-calendar-export.png" alt="Staff Demo’s PD Calendar tab, circled as 1, showing 8 total PD, 2 completed, 6 pending and 3 overdue, and the list of sessions with their date, requirement, due date, status and actions. Export CSV, beside Assign PD at the top right, is circled as 2." loading="lazy"><figcaption>Open the PD Calendar tab (1), then select Export CSV (2).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Staff can download their own PD the same way, with <b>Export CSV</b> on <b>My PD</b> in Events.</p>' +
      '<h2 id="all">Your whole workforce</h2>' +
      '<p>Go to <b>Workforce Management</b> (1), select <b>Export</b> (2) at the top, then <b>Workforce PD Log</b> (3).</p>' +
      '<figure class="shot" data-marks="1,40,11,4.2,oval,right,#1; 76.8,18,7.8,4.6,oval,#2; 71.6,25.2,7.6,3.8,oval,#3"><img src="assets/img/wf-export-pdlog.png" alt="Workforce Management, circled as 1 on the navigation bar, with the Export list open: Workforce PD Log, Evidence Map, Complete Delivery Assignment, Document Checklist Status and Workforce Document Report. Export is circled as 2 and Workforce PD Log as 3." loading="lazy"><figcaption>Select Workforce Management (1), Export (2), then Workforce PD Log (3).</figcaption></figure>',

    'prog-overview':
      '<p class="lead">Program Management is where your courses and units live. You add courses from training.gov.au, assess each course’s risk, validate its units, and build its Training and Assessment Strategy (TAS).</p>' +
      '<h2 id="open">Open Program Management</h2>' +
      '<p>Select <b>Program Management</b> on your navigation bar.</p>' +
      '<figure class="shot" data-marks="0.6,42.4,15,7.2,oval,#"><img src="assets/img/prog-open.png" alt="Program Management, with Schedule, View Archived and Add Course buttons at the top right and summary cards for Total Programs, Accredited Programs, Units Managed, Risk Assessed and Pending Risk Assessment. Program Management on the navigation bar is circled." loading="lazy"><figcaption>Select Program Management (circled).</figcaption></figure>' +
      '<p>Along the top of the page are three buttons:</p>' +
      '<ul>' +
        '<li><b>Schedule</b> opens your validation schedule and the industry consultation scheduler from <a href="feature.html?m=events">Events</a>.</li>' +
        '<li><b>View Archived</b> shows archived courses and validations. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</li>' +
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
            '<div><h4><span class="sn">2.1</span>View Details</h4><p>Shows the course’s details: its title, code, accreditation, level, team and when it was created. Select the pencil <svg class="ui-icon" viewBox="0 0 24 24" aria-label="pencil" role="img"><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/></svg> beside the title or team to rename the course or move it to another team. Under <b>Program Risk Summary</b> are its risk level, risk score, validation frequency and the risk factors selected.</p>' +
              '<figure class="shot shot-medium"><img src="assets/img/prog-details.png" alt="Program Details for CPC30220 Certificate III in Carpentry: TGA Accredited, a Qualification, created 2 months ago, in the Construction team, with pencils to edit the title and team. The Program Risk Summary shows a High risk level, a risk score of 7.8 out of 10, a validation frequency of every 36 months, and the selected risk factor Face-to-face delivery mode." loading="lazy"><figcaption>A course’s details and risk summary.</figcaption></figure></div>' +
            '<div><h4><span class="sn">2.2</span>Risk Assessment</h4><p>Complete the risk assessment for a course marked <b>Risk Assessment Pending</b>, or change one that needs amending. See <a href="article.html?id=prog-add-course#risk">Course Risk Assessment</a>.</p></div>' +
            '<div><h4><span class="sn">2.3</span>Archive</h4><p>Archives the course. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</p><p>There’s no delete option here. To prevent accidental deletion of a course that may have unit validations and other evidence recorded against it, a course can only be deleted once it’s archived, from <b>View Archived</b>.</p></div>' +
          '</div></li>' +
        '<li id="bulk"><h4>Assign courses to a team</h4><p>Select one or more courses to assign them to a team or archive them. Tick the box before each course’s program code, or the box in the header to select every course. A bar shows how many programs are selected:</p>' +
          '<ul>' +
            '<li><b>Assign Team</b> moves the selected courses to a team.</li>' +
            '<li><b>Archive Selected</b> archives them. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</li>' +
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
      '<div class="callout tip"><b>Tip</b><span>Using aXcelerate? You can import your courses and their units from it instead. See <a href="article.html?id=connect-axcelerate#import-courses">Import Courses</a>.</span></div>',

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
      '<div class="callout note"><b>Note</b><span>Admins can change how risk scores map to validation frequencies. See <a href="article.html?id=cust-frequency-bands">Set validation frequency and escalation</a>.</span></div>',

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
      '<p>A version with uploaded evidence has a <b>Download</b> <svg class="ui-icon" viewBox="0 0 24 24" aria-label="download" role="img"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg> button for its validation report, along with any completion notes. <b>Shared with programs</b> shows how many programs the validation covers. To archive a version, select the archive icon <svg class="ui-icon" viewBox="0 0 24 24" aria-label="archive" role="img"><path d="M3 5h18v4H3zM5 9v10h14V9M10 13h4"/></svg>. Find archived validations under <b>View Archived</b> at the top of the Program Management page. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</p>' +
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
      '<h2 id="history">Post validation history</h2>' +
      '<p>To see past assessment judgements for a unit, select <b>⋮</b> (1) › <b>Post Validation History</b> (2).</p>' +
      '<figure class="shot" data-marks="94.6,5.3,3.9,10.2,oval,above,#1; 79.4,41.6,19.6,8.7,oval,#2"><img src="assets/img/prog-aj-menu.png" alt="The unit CHCECE041 with its ⋮ menu open: Complete Validation, Unit Validation History, Assessment Judgement, Post Validation History, Edit Unit Details and Delete Unit. The ⋮ button is circled as marker 1, and Post Validation History as marker 2." loading="lazy"><figcaption>Select the ⋮ (1), then Post Validation History (2).</figcaption></figure>' +
      '<p><b>Assessment Judgement History</b> lists each version, newest first, with its status, such as <b>Declared</b>. Each shows the validation date, validator and their role, delivery mode, assessment period, the assessment tools reviewed and how many submissions were reviewed. Select <b>Evidence</b> to download what was uploaded.</p>' +
      '<figure class="shot shot-medium" data-marks="77.6,34.3,15.4,7.6,oval,#"><img src="assets/img/prog-aj-history.png" alt="Assessment Judgement History for CHCECE041 Maintain a safe and healthy environment for children. Version 1, Declared: validation date 26 Oct 2026, validator Admin Demo, an Internal Validator, blended delivery, assessment period 01 Jan 2026 to 30 Sep 2026. The tools reviewed were knowledge questions, practical observation tools, projects or case studies, marking guides and benchmarks, and third party reports, with 20 submissions reviewed. Recorded 04 Nov 2026 at 13:32. Evidence, at the top right, is circled." loading="lazy"><figcaption>A declared assessment judgement. Select Evidence (circled) to download its evidence.</figcaption></figure>',

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
      '<div class="callout warn"><b>Important</b><span>Treat your Master TAS as a first draft, not a finished document. RTO Radar lays down your boilerplate and the training.gov.au details for you, but every section still needs to be reviewed and tailored to how your RTO delivers and assesses this qualification before it’s submitted for approval.</span></div>' +
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
      '<h2 id="new-version">Change a TAS after a decision</h2>' +
      '<p>Approved and rejected TAS are read-only. To change one, create a new version: a draft of the next version, such as draft v2. Make your changes, then submit it for review again.</p>' +
      '<ol class="steps-list">' +
        '<li>On the <b>TAS Builder</b> tab, open the TAS from the <b>Master TAS</b> or <b>Cohort TAS</b> tab. Its status shows whether it was approved or rejected.' +
          '<figure class="shot" data-marks="2.1,85.2,96.3,14.4,zone,#"><img src="assets/img/tas-list-rejected.png" alt="The TAS Builder on the Master TAS tab, beside Cohort TAS, Submissions and Submission Management. CPC30220 Certificate III in Carpentry, in the Construction team, version 1, is marked Rejected, updated 29/10/2026, and is outlined." loading="lazy"><figcaption>A rejected Master TAS (outlined).</figcaption></figure></li>' +
        '<li>For a rejected TAS, read the reviewer’s comment, then select <b>Create New Version</b>.' +
          '<figure class="shot" data-marks="7.9,72.8,62.6,0.3,underline,#; 73.2,71.5,#1; 20.5,42.4,13.5,7.9,oval,right,#2"><img src="assets/img/tas-rejected.png" alt="The Master TAS for CPC30220 Certificate III in Carpentry, Construction team, marked Rejected, rejected v1, with Export and Create New Version. A message says the TAS was rejected: review the comments, make changes and submit again. The reviewer comment, underlined as 1, reads: Elective units show 6 selected, but the packaging rules require 3. Remove the extra electives and resubmit. Rejected on 28/10/2026. A note says the TAS is read-only and to create a new version. Create New Version is circled as 2." loading="lazy"><figcaption>Read the reviewer’s comment (1), then select Create New Version (2).</figcaption></figure></li>' +
        '<li>The new version opens as a draft, such as <b>draft v2</b>. Make the changes, then select <b>Submit for Review</b>. See <a href="#submit">Submit a TAS for review</a>.' +
          '<figure class="shot" data-marks="4.4,77.8,5.4,10.3,oval,#1; 32.2,75.6,13,14.6,oval,#2"><img src="assets/img/tas-draft-v2.png" alt="The Master TAS for CPC30220 Certificate III in Carpentry, now Draft, draft v2, with Refresh from TGA, Export, Submit for Review and Save. Draft v2 is circled as 1, and Submit for Review as 2." loading="lazy"><figcaption>The new draft v2 (1). When it’s ready, select Submit for Review (2).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Previous versions, and their reviews, stay in <b>Submissions</b> for audit.</p>' +
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

    'cust-overview':
      '<p class="lead">Organisation settings apply to everyone in your RTO. Only Admins can change them.</p>' +
      '<p>Select <b>Settings</b> (circled) in the navigation bar.</p>' +
      '<figure class="shot shot-tiny" data-marks="3.4,91.9,93.2,6.8,oval,#"><img src="assets/img/settings-nav.png" alt="The navigation bar under RTO Admin, Organisation Management: Dashboard, Document Management, Program Management, Continuous Improvement, Workforce Management, Risk Assessment, Complaints &amp; Suggestions, Events and Settings, which is circled." loading="lazy"><figcaption>Select Settings (circled).</figcaption></figure>' +
      '<p><b>Organisation Settings</b> opens, with five tabs (outlined). <b>Customisation</b> has six tabs of its own.</p>' +
      '<figure class="shot" data-marks="16.8,74.6,66.4,16,zone,#"><img src="assets/img/settings-tabs.png" alt="Organisation Settings: configure your organisation’s settings and integrations, with the tabs Integrations, User Management, Security, Professional Development and Customisation outlined." loading="lazy"><figcaption>The five Organisation Settings tabs (outlined).</figcaption></figure>' +
      '<table><thead><tr><th>Tab</th><th>What you set</th></tr></thead><tbody>' +
        '<tr><td>Integrations</td><td>Connect aXcelerate to import courses, units and staff. See <a href="article.html?id=connect-axcelerate">aXcelerate integration</a>.</td></tr>' +
        '<tr><td>User Management</td><td>Invitations, roles and teams. See <a href="feature.html?m=users">Users, Roles &amp; Teams</a>.</td></tr>' +
        '<tr><td>Security</td><td>MFA for the whole organisation. See <a href="article.html?id=mfa-set-organisation">Set up MFA for your organisation</a>.</td></tr>' +
        '<tr><td>Professional Development</td><td>PD settings. See <a href="article.html?id=pd-configure">Set up Professional Development</a>.</td></tr>' +
        '<tr><td>Customisation › Risk</td><td>Course and unit risk scoring, validation frequency, risk categories and register versioning.</td></tr>' +
        '<tr><td>Customisation › QMS</td><td>Compliance health weighting and document types.</td></tr>' +
        '<tr><td>Customisation › Dashboard</td><td>The dashboard widgets everyone sees, and where teams show.</td></tr>' +
        '<tr><td>Customisation › CIR</td><td>Custom CI registers, importing items, sources and reminders.</td></tr>' +
        '<tr><td>Customisation › TAS Templates</td><td>TAS boilerplate wording, unit table columns and default standards.</td></tr>' +
        '<tr><td>Customisation › Branding</td><td>Your logo on exports and in the navigation bar.</td></tr>' +
      '</tbody></table>',

    'cust-course-risk-weights':
      '<p class="lead">Set the points used to score course and unit risk. They’re your RTO’s defaults for every program, and the course score sets how often its units are validated.</p>' +
      '<p>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>Risk</b> (3) › <b>Calculation</b> (4). Change any value, then save at the bottom of the page.</p>' +
      '<figure class="shot" data-marks="0.6,79,15.2,6.8,oval,right,#1; 72.9,42.2,9.2,7.6,oval,above,#2; 21.4,75.4,12.4,7.6,oval,right,#3; 21.4,87.8,24.6,7.6,oval,right,#4"><img src="assets/img/cust-risk-calc.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on Risk, circled as 3, beside QMS, Dashboard, CIR, TAS Templates and Branding. Under Risk, Calculation is circled as 4, beside Frequency and Risk Register." loading="lazy"><figcaption>Settings (1), Customisation (2), Risk (3), then Calculation (4).</figcaption></figure>' +
      '<h2 id="course">Course risk score</h2>' +
      '<p>A course scores points for its completion rate and enrolment volume over the past 12 months, its delivery mode, how much RPL is used, and how much assessment is unsupervised. Change the points for any option.</p>' +
      '<p>The completion rate and enrolment volume are scored in bands, and you can change the bands too. Edit a band’s range and score, select <b>Add band</b> (circled) to add one, or the bin to remove one.</p>' +
      '<figure class="shot" data-marks="1.6,37.1,10.6,4.4,oval,right,#"><img src="assets/img/cust-risk-course.png" alt="Course Risk Assessment - Risk Score: set the organisation-wide weights and bands used to score course risk and recommend validation frequency, which apply to every program as the default. Numeric bands: course completion rate over the past 12 months, 75 to 100% scores 0, 50 to 74% scores 1 and 0 to 49% scores 2; student enrolment volume over the past 12 months, 0 to 100 students scores 0, 101 to 200 scores 1 and 201 or more scores 2. Each band has a bin, and Add band under the completion rate is circled. Scored choices: delivery mode, Face-to-face 0, Blended 1 and Online only 2; RPL, None 0, Minimal 0, Moderate 1 and Extensive 2; unsupervised assessments, None 0, Some 1 and Extensive 2." loading="lazy"><figcaption>The default course risk points. Add band (circled) adds a band.</figcaption></figure>' +
      '<p><b>Risk triggers</b> add points when a program is flagged with them. Most add 1 point. Offshore delivery and compliance history concerns add 2. Set a trigger to 0 to turn it off.</p>' +
      '<figure class="shot shot-medium"><img src="assets/img/cust-risk-triggers.png" alt="Yes/No triggers. Risk triggers (yes/no factors): points added when a program flags the trigger; set to 0 to disable a factor. Delivery below nominal hours / volume of learning, 1; Structured work placement or employer-based assessment, 1; New or recently updated assessment tools, 1; Course is new to the RTO or assigned to new assessors, 1; Delivery to international (CRICOS) students, 1; Offshore delivery (ESOS / ASQA scrutiny), 2; Government funded delivery, 1; Apprenticeship or traineeship pathway, 1; Compliance history concerns, 2." loading="lazy"><figcaption>The default points for each risk trigger.</figcaption></figure>' +
      '<h2 id="unit">Unit risk score</h2>' +
      '<p>Each unit scores points for its <b>Physical risk</b> and <b>Sensitive content</b>. They feed into the unit’s total risk score and recommended validation frequency.</p>' +
      '<figure class="shot"><img src="assets/img/cust-risk-unit.png" alt="Unit risk assessment - risk score: points awarded for each level of the per-unit risk factors, which feed into the unit’s total risk score and recommended validation frequency. Physical risk, the risk of physical harm or trauma during delivery or assessment of the unit, and Sensitive content, exposure to sensitive, distressing or potentially triggering content within the unit, each score None 0, Low 1, Medium 2 and High 3." loading="lazy"><figcaption>The default unit risk points.</figcaption></figure>' +
      '<h2 id="save">Save and apply</h2>' +
      '<ol class="steps-list">' +
        '<li>Optionally, explain the change under <b>Rationale</b> (1). It’s kept as an audit trail.</li>' +
        '<li>Select <b>Save baseline</b> (2). It applies to new assessments, and to assessments when they’re next saved.' +
          '<figure class="shot" data-marks="1.6,21.5,58.6,36,zone,#1; 85,68.5,13.4,21,oval,above,#2"><img src="assets/img/cust-risk-save.png" alt="Rationale (optional), outlined as 1, reading Increased weighting for offshore delivery after ASQA guidance. Below are Reset to defaults, Discard changes, and Save baseline, circled as 2." loading="lazy"><figcaption>A rationale (1), then Save baseline (2).</figcaption></figure></li>' +
        '<li>To update every program now, select <b>Recalculate all program risk scores</b> (circled). See <a href="feature.html?m=custom&find=What%E2%80%99s%20the%20difference%20between%20Save%20baseline#faq">Save baseline or recalculate?</a>' +
          '<figure class="shot" data-marks="1.8,57.5,24.8,30,oval,#"><img src="assets/img/cust-risk-recalc.png" alt="Apply baseline to existing assessments: saving the baseline only affects new or re-saved assessments; use this action to recompute every stored program risk score using the current baseline and frequency bands. Recalculate all program risk scores is circled." loading="lazy"><figcaption>Select Recalculate all program risk scores (circled).</figcaption></figure></li>' +
        '<li>Select <b>Recalculate now</b> to confirm. Each program’s inputs, such as its delivery mode and completion rate, are kept. Only its score, risk level and recommended frequency change.' +
          '<figure class="shot shot-small" data-marks="82.3,76,arrow-down,small"><img src="assets/img/cust-risk-recalc-confirm.png" alt="Recalculate program risk scores? This will recompute 26 stored assessments using the current Risk Baseline and Validation Frequency settings. Existing inputs (delivery mode, completion rate, factors) are preserved; only the computed score, risk level, and recommended frequency will change. Cancel, and Recalculate now, with an arrow pointing down at it." loading="lazy"><figcaption>Confirm with Recalculate now (arrow).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Select <b>Reset to defaults</b> to go back to RTO Radar’s values.</p>',

    'cust-frequency-bands':
      '<p class="lead">Set how often units are validated, and how many are sampled, at each level of course risk.</p>' +
      '<p>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>Risk</b> (3) › <b>Frequency</b> (4).</p>' +
      '<figure class="shot" data-marks="0.6,79.4,15.2,6.8,oval,right,#1; 72.9,42.6,9.2,7.6,oval,above,#2; 21.4,75.8,12.4,7.6,oval,right,#3; 45.8,88.2,24.6,7.6,oval,right,#4"><img src="assets/img/cust-freq-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on Risk, circled as 3. Under Risk, Frequency is circled as 4, between Calculation and Risk Register." loading="lazy"><figcaption>Settings (1), Customisation (2), Risk (3), then Frequency (4).</figcaption></figure>' +
      '<p>The bands match the <b>Total Risk Score</b> on the Course Risk Assessment, a blend of the provider and course scores scaled from 1 to 10. The defaults reflect SRTO 2025 best practice and risk-based sampling.</p>' +
      '<ol class="steps-list">' +
        '<li>Change a band’s <b>Validation Frequency</b>, <b>Recommendation Sampling</b> or <b>Priority Label</b>. A changed value is marked <b>Custom</b> (circled), and the <b>Recommended</b> column shows the default.' +
          '<figure class="shot" data-marks="43.6,56.6,7.4,6.4,oval,#"><img src="assets/img/cust-freq-bands.png" alt="Course Risk Assessment - Frequency. Bands are matched against the Total Risk Score on the Course Risk Assessment, a blended Provider and Course score scaled to 1 to 10. A note says your organisation is using custom validation settings, with default values shown for reference. 8 to 10, Very High Risk: 6 months, 100%, High. 6 to 7, High Risk: 6 months, marked Custom and circled, 100%, Medium, with 12mo / 100% / Medium recommended. 4 to 5, Medium Risk: 18 months, 30%, Low. 2 to 3, Low-Medium Risk: 24 months, 20%, Low. 1, Low Risk: 36 months, 10%, Minimal." loading="lazy"><figcaption>High Risk changed to 6 months, marked Custom (circled). The default was 12 months.</figcaption></figure></li>' +
        '<li>Under <b>Override Options</b> (1), choose whether to always include units that have never been validated, and units that are overdue, whatever the sampling.</li>' +
        '<li>Under <b>Priority Escalation Settings</b> (2), choose when units move up a priority. A unit escalates when its risk score <b>or</b> days overdue reaches the threshold: by default, Urgent at 80+ or 1 year, High at 60+ or 6 months, and Medium at 40+ or 90 days.</li>' +
        '<li>Select <b>Save frequency</b> (3).' +
          '<figure class="shot" data-marks="2.4,0.4,95.6,19.8,zone,#1; 2.4,23.6,95.6,54.4,zone,#2; 84.3,83.4,13.8,7,oval,above,#3"><img src="assets/img/cust-freq-escalation.png" alt="Override Options, outlined as 1: always include units that have never been validated, and always include units that are overdue for validation, both ticked. Priority Escalation Settings, outlined as 2: units escalate to a priority level if their risk score or days overdue meets the threshold. Urgent at 80+ or 1 year, High at 60+ or 6 months, Medium at 40+ or 90 days, and Low below the Medium thresholds automatically. Reset to defaults, Discard changes, and Save frequency, circled as 3. A note says changes apply to new validation recommendations, and existing scheduled validations aren’t automatically updated." loading="lazy"><figcaption>Override Options (1), Priority Escalation Settings (2), then Save frequency (3).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>Changes apply to new validation recommendations. Validations already scheduled aren’t updated.</span></div>',

    'cust-risk-categories':
      '<p class="lead">Choose whether the risk register is saved as named versions, and set up the categories risks are grouped into.</p>' +
      '<p>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>Risk</b> (3) › <b>Risk Register</b> (4).</p>' +
      '<figure class="shot" data-marks="0.6,78.9,15.2,7,oval,right,#1; 72.9,42.2,9.2,7.6,oval,above,#2; 21.4,75.4,12.4,7.6,oval,right,#3; 70.1,88.2,24.8,7.6,oval,#4"><img src="assets/img/cust-riskreg-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on Risk, circled as 3. Under Risk, Risk Register is circled as 4, beside Calculation and Frequency." loading="lazy"><figcaption>Settings (1), Customisation (2), Risk (3), then Risk Register (4).</figcaption></figure>' +
      '<h2 id="versions">Register versioning</h2>' +
      '<p>Every time the risk register is saved, RTO Radar keeps a <b>revision</b>. A <b>version</b> is a revision you’ve finalised as a named, permanent copy, such as the register your governance meeting approved.</p>' +
      '<ul>' +
        '<li><b>Enable risk register versioning</b> (1): finalise saved revisions into named versions. When it’s off, the register keeps its Revision History only, and the Versions tab is hidden.</li>' +
        '<li><b>Create a version automatically for every revision</b> (2): each save also publishes a version. Turn it off to choose which revisions to finalise. You can only turn it on when versioning is on.</li>' +
      '</ul>' +
      '<p>Select <b>Save changes</b> (arrow). See <a href="article.html?id=risk-versions">Risk register revisions and versions</a>.</p>' +
      '<figure class="shot" data-marks="92.2,26.2,5.2,8.2,oval,#1; 92.2,56.2,5.2,8.2,oval,#2; 91.8,85.2,arrow-down,tiny"><img src="assets/img/cust-riskreg-versions.png" alt="Risk Register Versions: control whether your organisation finalises the risk register into named versions, and whether those versions are created automatically. Enable risk register versioning, switched on and circled as 1: a version is a finalised, named snapshot taken from a saved revision; when this is off, the Risk Register keeps its Revision History only and the Versions sub tab is hidden. Create a version automatically for every revision, switched on and circled as 2: when on, saving the risk register also publishes a matching version; turn this off to make versioning a manual process, where you choose the revision to finalise. Discard changes, and Save changes, with an arrow pointing down at it." loading="lazy"><figcaption>Both switches on (1, 2). Select Save changes (arrow).</figcaption></figure>' +
      '<h2 id="categories">Risk categories</h2>' +
      '<p>Each category shows how many risks and treatment plans use it (1). Select <b>Edit</b> (2) to change its name, subtitle or example.</p>' +
      '<figure class="shot" data-marks="67.4,24,12.6,6.4,zone,#; 65.2,27.2,#1; 80.4,23.6,7.4,5.8,oval,above,#2"><img src="assets/img/cust-riskcat-list.png" alt="Configure Risk Categories: review the categories used by your Risk Register, adjust their names and subtitles, add your own, and archive any you no longer use; archiving is only available for categories with no risks and no treatment plans. A search box and Filters, showing 11 of 12 categories. Strategic Risk, Default, with 3 risks and 3 treatment plans outlined as 1, and Edit circled as 2. Financial Risk, Operational and Educational Risk, and ICT and Cyber-Security Risk follow, each Default with its risks, treatment plans, a description and an example. Archive is unavailable on each, as they have risks." loading="lazy"><figcaption>Risks and treatment plans in each category (1), and Edit (2).</figcaption></figure>' +
      '<h3 id="add-category">Add a category</h3>' +
      '<ol class="steps-list">' +
        '<li>Below the list, select <b>Add custom category</b> (circled).' +
          '<figure class="shot" data-marks="1.6,46,17.6,22.8,oval,right,#"><img src="assets/img/cust-riskcat-add.png" alt="Page 1 of 2, 11 records, with Rows per page, Previous and Next. Add custom category is circled, above Archived categories (1)." loading="lazy"><figcaption>Select Add custom category (circled).</figcaption></figure></li>' +
        '<li>Enter its <b>Category name</b>, a <b>Subtitle</b> describing what it covers, and optionally an <b>Example</b>. Then select <b>Add category</b> (circled).' +
          '<figure class="shot" data-marks="1.2,87,13.6,11.4,oval,right,#"><img src="assets/img/cust-riskcat-form.png" alt="New custom category: Category name Third Party Delivery Risk; Subtitle: Training or assessment delivered by a third party doesn’t meet the Standards; Example: A partner’s trainers lack current industry experience. Add category is circled." loading="lazy"><figcaption>A new category for third-party delivery. Select Add category (circled).</figcaption></figure></li>' +
        '<li>The category is added to the list, marked <b>Custom</b> (1). Select <b>Save changes</b> (2).' +
          '<figure class="shot" data-marks="2,39.6,96,18.2,zone,#1; 85,85.4,13.4,6.2,oval,above,#2"><img src="assets/img/cust-riskcat-added.png" alt="Configure Risk Categories, showing 12 of 13 categories, on page 2: Governance Risk, Default, with 3 risks, and Third Party Delivery Risk, Custom, with 0 risks and 0 treatment plans, its subtitle and example, and Edit, Archive and a bin, outlined as 1. Below are Add custom category, Archived categories (1), Discard changes, and Save changes, circled as 2." loading="lazy"><figcaption>Third Party Delivery Risk added as a Custom category (1). Select Save changes (2).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Custom categories can also be deleted with the bin.</p>' +
      '<h3 id="archive">Archive or restore a category</h3>' +
      '<p>Archive a category you no longer use to hide it from the risk register. You can only archive a category with no risks or treatment plans.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Archive</b> (circled) on the category.' +
          '<figure class="shot" data-marks="89.2,11,10,28.6,oval,#"><img src="assets/img/cust-riskcat-archive.png" alt="Political Risk, Default: funding cuts from government policy changes, with 0 risks and 0 treatment plans, and Edit and Archive, which is circled." loading="lazy"><figcaption>Political Risk has no risks or treatment plans, so it can be archived. Select Archive (circled).</figcaption></figure></li>' +
        '<li>Answer why you want to archive it, and the actions that led to the decision. Your answers are kept permanently, and included in risk register exports and the audit trail. Then select <b>Archive category</b> (circled).' +
          '<figure class="shot shot-medium" data-marks="71.6,87,25.6,9.4,oval,#"><img src="assets/img/cust-riskcat-archive-confirm.png" alt="Archive this risk category? Political Risk will be hidden from the Risk Register, so no new risks can be added to it; your answers are recorded permanently against your RTO and included in the risk register exports and audit trail. 1. Why do you want to archive this risk category, Political Risk? A recent risk review determined the category is no longer relevant to current operations. 2. Please detail the actions taken that resulted in the decision to archive the category: the risk register was reviewed to confirm no active risks or treatment plans were associated with Political Risk, existing categories were reviewed for overlap, and future political or government related risks could be classified under Strategic or External Risk, so the category was approved for archiving. Cancel, and Archive category, which is circled." loading="lazy"><figcaption>Both questions answered. Select Archive category (circled).</figcaption></figure></li>' +
        '<li>The category moves to <b>Archived categories</b> (underlined), with when it was archived, who archived it, and your answers (1). Select <b>Restore</b> (2) to bring it back.' +
          '<figure class="shot" data-marks="4.2,14.6,12.6,3.2,underline,#; 3,38.8,64,33.4,zone,#1; 87.5,21,9.4,6.6,oval,#2"><img src="assets/img/cust-riskcat-archived.png" alt="Archived categories (1), underlined, open on Political Risk, Default and Archived, with 0 risks and 0 treatment plans: funding cuts from government policy changes. Date archived 01/09/2026, 3:38 PM, by Admin Demo, admindemo@rtoradar.com.au, RTO Admin, outlined as 1. Why do you want to archive this risk category, Political Risk? A recent risk review determined the category is no longer relevant to current operations. Please detail the actions taken that resulted in the decision to archive the category: the risk register was reviewed to confirm no active risks or treatment plans were associated with Political Risk, and future political or government-related risks could be classified under Strategic or External Risk. Edit, and Restore, circled as 2." loading="lazy"><figcaption>An archived category, with its archive record (1). Select Restore (2) to bring it back.</figcaption></figure></li>' +
      '</ol>',

    'cust-compliance-health':
      '<p class="lead">Set how much each part of the compliance health score counts. The score shows on the QMS dashboard.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>QMS</b> (3) › <b>Compliance Health</b> (4).' +
          '<figure class="shot" data-marks="0.3,79.6,12.8,8.4,oval,right,#1; 68.9,42.6,7.9,8.4,oval,above,#2; 36.2,76.4,10.6,8.6,oval,above,#3; 26.1,89,30.9,8.6,oval,right,#4"><img src="assets/img/cust-qms-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on QMS, circled as 3. Under QMS, Compliance Health is circled as 4, beside Document Types." loading="lazy"><figcaption>Settings (1), Customisation (2), QMS (3), then Compliance Health (4).</figcaption></figure></li>' +
        '<li>Drag the sliders. The weights must add up to 100%, shown as the <b>Total</b>. A changed weight is marked <b>Custom</b>, with its default beside it. The defaults are <b>Standards Coverage</b> 50%, how well your documents cover the standards; <b>Review Timeliness</b> 30%, whether documents are reviewed on schedule; and <b>Document Freshness</b> 20%, the age and currency of documents.</li>' +
        '<li>Select <b>Save Weights</b> (arrow).' +
          '<figure class="shot" data-marks="91.6,89.4,arrow-down,small"><img src="assets/img/cust-qms-health.png" alt="Compliance Health Weighting: configure how the compliance health score is calculated; weights must sum to 100%. Standards Coverage, how well your documents cover required standards, 40%, marked Custom, with Default: 50%. Review Timeliness, whether documents are reviewed on schedule, 40%, Custom, default 30%. Document Freshness, age and currency of your documents, 20%, default 20%. Total 100%. Discard Changes, Reset to Defaults, and Save Weights, with an arrow pointing down at it." loading="lazy"><figcaption>Standards Coverage and Review Timeliness changed, each marked Custom. Select Save Weights (arrow).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Select <b>Discard Changes</b> to undo changes you haven’t saved, or <b>Reset to Defaults</b> to go back to 50, 30 and 20. See <a href="article.html?id=qms-health">compliance health</a>.</p>',

    'cust-document-types':
      '<p class="lead">Document types sort documents in the Document Management System. RTO Radar has ten built-in types, such as Policy, Procedure and TAS. Add your own for anything else.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>QMS</b> (3) › <b>Document Types</b> (4).' +
          '<figure class="shot" data-marks="0.3,76.8,12.8,8.2,oval,right,#1; 68.9,41.2,7.9,8.2,oval,above,#2; 36.2,73.8,10.6,8.4,oval,above,#3; 56.5,85.8,31,8.4,oval,#4"><img src="assets/img/cust-doctypes-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on QMS, circled as 3. Under QMS, Document Types is circled as 4, beside Compliance Health." loading="lazy"><figcaption>Settings (1), Customisation (2), QMS (3), then Document Types (4).</figcaption></figure></li>' +
        '<li>Enter the <b>Document type name</b>, such as Audit Report, and optionally a <b>Description</b> of when to use it. Then select <b>Add document type</b> (circled).' +
          '<figure class="shot" data-marks="3.1,73.6,16,17.6,oval,right,#"><img src="assets/img/cust-doctypes-add.png" alt="Document Types: every document type available in the Document Management System; create your own types, edit or archive them, and drag the list into the order you want it to appear in for uploads, type changes and filters. Custom types are shared with any RTOs linked to this one, and renaming a type updates every document already using it. Document type name Audit Report, Description: Internal and external audit reports, and their findings. Add document type is circled." loading="lazy"><figcaption>A new Audit Report type. Select Add document type (circled).</figcaption></figure></li>' +
        '<li>Drag each type by its handle (1) into the order you want. It’s the order used for uploads, type changes and filters. Your own types show <b>Edit</b>, <b>Archive</b> and the bin (2). Built-in types can only be reordered.' +
          '<figure class="shot" data-marks="0.6,55.4,3.6,6.8,oval,above,#1; 82.6,55.6,17.2,9.8,oval,above,#2"><img src="assets/img/cust-doctypes-list.png" alt="The document type list, with each type’s drag handle, description, how many documents use it, status and actions: Policy, built-in, 2 documents; Procedure, built-in, 1 document; Form, built-in; Audit Report, Internal and external audit reports, and their findings, 0 documents, Active, with its drag handle circled as 1 and Edit, Archive and a bin circled as 2; Template and Training Package, built-in. Built-in types show Reorder only." loading="lazy"><figcaption>Audit Report dragged below Form by its handle (1), with Edit, Archive and the bin (2).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Renaming a type updates every document already using it, and your types are shared with any RTOs linked to yours.</p>',

    'cust-dashboard-widgets':
      '<p class="lead">Choose the dashboard widgets everyone in your RTO sees, and where teams appear across RTO Radar.</p>' +
      '<h2 id="widgets">Dashboard widgets</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>Dashboard</b> (3) › <b>Admin Dashboard</b> (4).' +
          '<figure class="shot" data-marks="0.3,78.6,12.8,8.4,oval,right,#1; 68.9,42,7.9,8.4,oval,above,#2; 46.4,75.6,10.4,8.6,oval,above,#3; 26.1,88,30.9,8.6,oval,right,#4"><img src="assets/img/cust-dash-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on Dashboard, circled as 3. Under Dashboard, Admin Dashboard is circled as 4, beside Teams." loading="lazy"><figcaption>Settings (1), Customisation (2), Dashboard (3), then Admin Dashboard (4).</figcaption></figure></li>' +
        '<li>Tick the widgets to show, and untick any to hide, such as Workforce Table (1). Drag a widget by its handle, or use its arrows (2), to change the order.' +
          '<figure class="shot" data-marks="4.6,53.6,3.8,4.4,oval,above,#1; 94,52,3,7.4,oval,above,#2; 23.4,90.8,arrow-down,tiny"><img src="assets/img/cust-dash-widgets.png" alt="Admin Dashboard: choose which widgets appear on the dashboard and in what order; changes apply to every user in this organisation. Risk Matrix Dashboard, Continuous Improvement and Workforce Statistics are ticked. Workforce Table, a searchable table of all organisation users, is unticked, circled as 1, with its up and down arrows circled as 2. QMS Overview and Upcoming Events are ticked. Each widget has a drag handle. Reset to Default, and Save Changes, with an arrow pointing down at it." loading="lazy"><figcaption>Workforce Table hidden (1), with its arrows to move it (2). Select Save Changes (arrow).</figcaption></figure></li>' +
        '<li>Select <b>Save Changes</b> (arrow). Select <b>Reset to Default</b> to go back to the default widgets and order.</li>' +
      '</ol>' +
      '<p>See <a href="article.html?id=dash-tour">The dashboard</a>.</p>' +
      '<h2 id="teams">Teams</h2>' +
      '<p>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>Dashboard</b> (3) › <b>Teams</b> (4).</p>' +
      '<figure class="shot" data-marks="0.3,78.4,12.8,8.4,oval,right,#1; 69,42,7.9,8.4,oval,above,#2; 46.5,75.4,10.4,8.6,oval,above,#3; 56.7,87.6,31,8.6,oval,#4"><img src="assets/img/cust-dash-teams.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on Dashboard, circled as 3. Under Dashboard, Teams is circled as 4, beside Admin Dashboard." loading="lazy"><figcaption>Settings (1), Customisation (2), Dashboard (3), then Teams (4).</figcaption></figure>' +
      '<p>Turn each of these on or off for everyone:</p>' +
      '<table><thead><tr><th>Switch</th><th>When it’s on</th></tr></thead><tbody>' +
        '<tr><td>Org chart on Workforce Teams page</td><td>The Workforce Teams page shows the organisation chart.</td></tr>' +
        '<tr><td>Team colour badges across the app</td><td>Records tagged to a team show its coloured badge.</td></tr>' +
        '<tr><td>Team filter in CI Register</td><td>The register has a team filter.</td></tr>' +
        '<tr><td>Team columns in TAS tables</td><td>The Available TAS and Available Programs lists in the TAS Builder show a Team column.</td></tr>' +
        '<tr><td>Team members in org chart</td><td>The org chart shows each member, not just teams.</td></tr>' +
        '<tr><td>Org chart shows entire organisation</td><td>Everyone sees the whole chart. When it’s off, staff see only their own chain of command. Admins and System Default members always see the whole chart.</td></tr>' +
      '</tbody></table>',

    'cust-cir-settings':
      '<p class="lead">Set up the Continuous Improvement Register to suit your RTO: create custom CI registers, import existing items, manage sources and choose reminders.</p>' +
      '<p>Go to <b>Settings</b> (1) › <b>Customisation</b> (2) › <b>CIR</b> (3). It has four tabs: <b>Import</b>, <b>Sources</b>, <b>Custom Items</b> and <b>Reminders</b>.</p>' +
      '<figure class="shot" data-marks="0.3,89,12.8,9.4,oval,right,#1; 69,47.4,7.9,9.4,oval,above,#2; 56.6,85.2,10.6,9.6,oval,above,#3"><img src="assets/img/cust-cir-open.png" alt="Settings in the navigation, circled as 1. Organisation Settings on the Customisation tab, circled as 2, open on CIR, circled as 3, beside Risk, QMS, Dashboard, TAS Templates and Branding." loading="lazy"><figcaption>Settings (1), Customisation (2), then CIR (3).</figcaption></figure>' +
      '<h2 id="custom">Create a custom CI register</h2>' +
      '<p>A custom CI register adds your own fields to improvement items. For example, an <b>Audit Finding</b> register, with fields for the type of audit, the standard and how serious the finding is. Each custom register appears under <b>Add Item</b> in the register.</p>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Custom Items</b> tab (1), select <b>Create Item</b> (2), or <b>Edit</b> beside an existing one.' +
          '<figure class="shot" data-marks="49.8,5,24.2,13.6,oval,right,#1; 86.4,27.4,12,17,oval,#2"><img src="assets/img/cust-cir-customitems.png" alt="The Custom Items tab, circled as 1, beside Import, Sources and Reminders. Create Custom CIR Item: create custom item templates for different types of continuous improvement register items, with Create Item circled as 2. External CI Register, with 10 fields: Person Responsible, Due Date, Title, Description, Priority, Status, Source, Tags, Attachment and Supervisor Comments, with Edit and a bin." loading="lazy"><figcaption>On the Custom Items tab (1), select Create Item (2).</figcaption></figure></li>' +
        '<li>Enter the <b>Item Name</b>, such as Audit Finding. It’s the name shown under <b>Add Item</b>. Select <b>Add Field</b> (circled) to add your own fields (step 4). To change the fields every item has, select <b>Default Fields (9)</b> (step 3).' +
          '<figure class="shot" data-marks="1.6,66.4,10.6,11.4,oval,right,#"><img src="assets/img/cust-cir-newtype.png" alt="New CIR Item Type, with the Item Name Audit Finding. Under Fields, Default Fields (9), then Add Field, which is circled, and Cancel and Save." loading="lazy"><figcaption>Audit Finding entered. Add Field (circled) adds your own fields.</figcaption></figure></li>' +
        '<li>Optionally, select <b>Default Fields (9)</b> to change the fields every item in this register has. You can rename a field, change its type, make it required, and add or remove options. For example, add <b>External Audit</b> (circled) as a <b>Source</b> option. Sources you’ve added on the Sources tab, such as Internal Review, are already listed.' +
          '<figure class="shot shot-medium" data-marks="3.6,86.8,93,6.4,oval,#"><img src="assets/img/cust-cir-defaultfields.png" alt="The Source default field, Single Choice and Required, with its options: Ad Hoc, Audit, Complaint, Evidence Map, Feedback, Industry Consultation, Internal Review, Post Assessment Validation, Risk Register, TAS Builder and Validation, each with a cross to remove it, and the new option External Audit, circled, above Add Option." loading="lazy"><figcaption>External Audit added as a Source option (circled).</figcaption></figure></li>' +
        '<li>Under <b>Custom Fields</b>, select <b>Add Field</b> (1) for each field you need. Enter its <b>Field label</b>, choose its type (2), and tick <b>Required</b> (3) if it must be filled in. For <b>Single Choice</b> and <b>Multiple Choice</b>, select <b>Add Option</b> for each choice. The types are Short Text, Long Text, Rich Text, Single Choice, Multiple Choice, Date, Custom Tags, Staff Select and Attachment. Use the arrows to reorder fields, and the bin to remove one.' +
          '<figure class="shot" data-marks="1.8,87.6,10,4.4,oval,right,#1; 72.6,33.8,14.4,4.8,oval,#2; 87.2,34.6,6.6,3.2,oval,above,#3; 93.9,93.6,arrow-down,tiny"><img src="assets/img/cust-cir-customfields.png" alt="Custom Fields for Audit Finding: Audit Type, Single Choice, Required, with the options Internal audit, ASQA audit, Funding body audit and Third-party audit; Standard, Short Text, Required, with its type circled as 2 and Required as 3; Finding Rating, Single Choice, Required, with the options Observation, Minor non-compliance and Major non-compliance; Auditor, Short Text; Date Rectified, Date; and Rectification Evidence, Attachment. Each has reorder arrows and a bin. Add Field is circled as 1, and an arrow points down at Save." loading="lazy"><figcaption>Six custom fields for Audit Finding. Add Field (1), a field’s type (2) and Required (3). Then select Save (arrow).</figcaption></figure></li>' +
        '<li>Select <b>Save</b> (arrow).</li>' +
      '</ol>' +
      '<p>Your custom register then appears under <b>Add Item</b> in the register. To add items to it, see <a href="article.html?id=cir-add-item#add">Add an item</a>.</p>' +
      '<h2 id="import">Import items</h2>' +
      '<p>Bulk import improvement items on the <b>Import</b> tab, as default items or into a custom CI register. See <a href="article.html?id=cir-add-item#import">Bulk import items</a>.</p>' +
      '<h2 id="sources">Sources</h2>' +
      '<p>On the <b>Sources</b> tab (1), enter a <b>Source label</b> (2), such as Internal Review, and select <b>Add</b> (arrow). Your sources appear alongside the <b>System</b> sources RTO Radar sets automatically, which can’t be deleted. See <a href="article.html?id=cir-sources">Where improvement items come from</a>.</p>' +
      '<figure class="shot" data-marks="26,1.8,24.2,6,oval,right,#1; 4.4,23.8,81.8,6.6,oval,#2; 93.2,24.6,arrow-down,small"><img src="assets/img/cust-cir-sources.png" alt="The Sources tab, circled as 1, beside Import, Custom Items and Reminders. Continuous Improvement Sources: manage the source categories available in the CIR; system sources cannot be deleted. Internal Review is typed in the source label box, circled as 2, with an arrow pointing down at Add. Below, a search box and the System sources: Ad Hoc, Audit, Complaint, Evidence Map, Feedback, Industry Consultation, Post Assessment Validation, Risk Register and TAS Builder, each with its code and a System badge." loading="lazy"><figcaption>On the Sources tab (1), type a source label (2), then select Add (arrow).</figcaption></figure>' +
      '<h2 id="reminders">Reminders</h2>' +
      '<p>On the <b>Reminders</b> tab, turn on <b>Send due date reminders</b> (1) to email the person responsible for each item, including items of custom types. Items with no due date or person responsible, and completed or removed items, are skipped.</p>' +
      '<ol class="steps-list">' +
        '<li>Under <b>Reminder lead times</b> (2), tick when to send them: 30, 14, 7, 3 or 1 days before, or on the due date. Each person gets one email a day covering all their items.</li>' +
        '<li>Turn on <b>Keep reminding while overdue</b> (3) to send a weekly reminder while an item is overdue and open.</li>' +
        '<li>Select <b>Save settings</b> (arrow).' +
          '<figure class="shot" data-marks="91.8,25,4.6,5.8,oval,#1; 3.4,46.6,74,10.8,zone,#; 1.6,51.8,#2; 91.8,66.4,4.6,5.8,oval,#3; 83.4,89.6,arrow-right,small"><img src="assets/img/cust-cir-reminders.png" alt="The Reminders tab, Due date reminders: email reminders for every item in the Continuous Improvement Register, including items created from custom item types. Send due date reminders is on, circled as 1; reminders go to the person responsible for each item, and items with no due date, no person responsible, or a status of Completed or Removed are skipped. Reminder lead times, outlined as 2: 14 days before, 3 days before and On the due date are ticked; one email per person per day covers all of their items. Keep reminding while overdue is on, circled as 3, sending a weekly reminder while an item stays overdue and open. Reminders are sent each morning, and staff can turn them off on their profile page. Not saved yet, with an arrow pointing at Save settings." loading="lazy"><figcaption>Reminders on (1), sent 14 and 3 days before and on the due date (2), and weekly while overdue (3). Select Save settings (arrow).</figcaption></figure></li>' +
      '</ol>' +
      '<p>Reminders are sent each morning. Staff can turn them off for themselves. See <a href="article.html?id=profile-notifications">Choose your email notifications</a>.</p>',

    'cust-branding':
      '<p class="lead">Make RTO Radar your own. Your export logo appears on PDF and Word exports in place of the RTO Radar logo, and your sidebar icon replaces the default icon in the navigation for everyone in your RTO.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>Customisation</b> › <b>Branding</b>.' +
          '<figure class="shot" data-marks="0.2,52.6,11,8,oval,right,#1; 77.6,0.2,13.4,6,oval,right,#2; 85,22.2,13.6,6.6,oval,right,#3; 91.9,22,arrow-down; 65.6,60.6,arrow-left,#4"><img src="assets/img/gs-org-branding.png" alt="The Branding page in Settings. Marker 1 circles Settings in the navigation, marker 2 the Customisation tab along the top, and marker 3 the Branding tab under Customisation, with an arrow pointing down at it. Marker 4 is an arrow pointing left at Click to upload under Export Logo. The page shows two upload areas, Export Logo and Sidebar Icon, each with Click to upload." loading="lazy"><figcaption>Select Settings (1), then the Customisation tab (2), then Branding (3), then Click to upload (4).</figcaption></figure></li>' +
        '<li>Under <b>Export Logo</b>, select <b>Click to upload</b> (4) to upload your logo. Under <b>Sidebar Icon</b>, select <b>Click to upload</b> to upload your icon.</li>' +
      '</ol>',

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
      '<p>Combined versions of some sections, such as Target Cohort Profile and Delivery Methodology, used by some exports and older TAS layouts. Keep them consistent with the individual sections. Open one to edit it.</p>' +
      '<figure class="shot"><img src="assets/img/tas-bp-legacy.png" alt="Legacy aggregate sections, used by some exports and older TAS layouts, with 5. Target Cohort Profile (aggregate) open for editing, with formatting options. It reads: Learner Cohort Profile (Generic Example - Alter to suit course and specific cohort). The target group for this qualification comprises adults aged between 18 and 45 years who are seeking to establish or advance a career in their chosen industry, followed by Interests, Motivations, and Objectives; Career Outcomes and Vocational Pathways; and Prior Educational Attainment and Industry Experience. Below are 6. Delivery Methodology, 7. Assessment Framework, 9. Support Services, 9.x Reasonable Adjustment, and 10. Credit Transfer and RPL, each an aggregate section." loading="lazy"><figcaption>The Target Cohort Profile aggregate, open for editing.</figcaption></figure>' +
      '<h2 id="custom">Custom boilerplate sections</h2>' +
      '<p>Add your own section to every new TAS created in your RTO. Custom sections appear under H. Additional Sections. Existing TAS documents aren’t changed.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Add Custom Section</b> (circled).' +
          '<figure class="shot" data-marks="2,66.9,15.4,16.7,oval,#"><img src="assets/img/tas-bp-custom.png" alt="Custom Boilerplate Sections, with no custom sections yet and an Add Custom Section button, which is circled." loading="lazy"><figcaption>Select Add Custom Section (circled).</figcaption></figure></li>' +
        '<li>Enter the <b>Section title</b>, and write the section’s wording. Use <b>[INSERT RTO NAME]</b> where your organisation’s name should go. Leave the section <b>Active</b> to include it in new TAS documents. The bin removes it.' +
          '<figure class="shot"><img src="assets/img/tas-bp-custom-new.png" alt="Custom Boilerplate Sections: create your own sections that will be added to every new TAS created in this RTO; existing TAS documents are unaffected, and the placeholder [INSERT RTO NAME] is replaced with your organisation name. A new section, Work Health and Safety, Unsaved. Section title Work Health and Safety. The wording: [INSERT RTO NAME] is committed to the health and safety of learners, staff and visitors. All training and assessment is conducted in line with the Work Health and Safety Act 2011 and the [INSERT RTO NAME] WHS Policy. Learners complete a WHS induction before any practical activity. Active, switched on, and a bin." loading="lazy"><figcaption>A Work Health and Safety section, set to Active.</figcaption></figure></li>' +
        '<li>Select <b>Save All Templates</b>. The section is marked <b>Unsaved</b> until you do.</li>' +
      '</ol>' +
      '<h2 id="units">TAS Unit Table</h2>' +
      '<p>Choose the optional columns in the TAS units table and in PDF and Word exports: <b>Delivery Hours</b>, <b>Structured and Unstructured Hours</b>, and <b>Supervised and Unsupervised Hours</b>. Each appears alongside Nominal Hours. Turn on a switch to add its columns. When a column is on, its label changes to <b>Disable</b>.</p>' +
      '<figure class="shot" data-marks="1.8,36.4,4.6,8.4,oval,#"><img src="assets/img/tas-unit-table.png" alt="TAS Unit Table: choose which optional columns appear in the TAS units table and in PDF and Word exports. The Delivery Hours switch is on and circled, labelled Disable Delivery Hours column: shows a Delivery Hours column alongside Nominal Hours. Enable Structured and Unstructured Hours columns, and Enable Supervised and Unsupervised Hours columns, are off." loading="lazy"><figcaption>Delivery Hours turned on (circled). Its label changes to Disable, to turn it off again.</figcaption></figure>' +
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

    'faq-users':
      '<section class="gs-faq">' +
        '<details><summary>What’s a silent user, and when should I use one?</summary><div class="prose">' +
          '<p>A silent user has a profile but can’t sign in and isn’t emailed. Use one for staff whose credentials and compliance you track but who don’t use RTO Radar, or to set someone up before inviting them. Silent users are tagged <b>Compliance Only</b> on the Staff tab. See <a href="article.html?id=users-invite#silent">Add a silent user</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I give a silent user access later?</summary><div class="prose">' +
          '<p>On the <b>Staff</b> tab, open their staff actions and select <b>Send Invitation</b>. They receive an email to set up their sign-in. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</p>' +
        '</div></details>' +
        '<details><summary>Someone didn’t get their invitation. What do I do?</summary><div class="prose">' +
          '<p>While they’re marked <b>Pending</b>, open their staff actions and select <b>Resend Invitation</b>. Ask them to check their junk or spam folder too. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</p>' +
        '</div></details>' +
        '<details><summary>A user says their password reset link has expired. What now?</summary><div class="prose">' +
          '<p>A reset link can only be used once. Ask them to try signing in with their new password first. If that doesn’t work, send another with <b>Reset Password</b>. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</p>' +
        '</div></details>' +
        '<details><summary>What happens to someone’s work when I delete them?</summary><div class="prose">' +
          '<p>Before you delete someone, reassign their duties and data to other staff. Anything you don’t reassign has its owner set to Unassigned, or is deleted. Deleting a user can’t be undone, so check every tab before you save. See <a href="article.html?id=users-manage#actions">Staff actions</a>.</p>' +
        '</div></details>' +
        '<details><summary>Who can open User Management?</summary><div class="prose">' +
          '<p>Only people whose role includes the <b>User Management</b> permission, usually Administrators. See <a href="article.html?id=users-overview">The User Management page</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I delete a role?</summary><div class="prose">' +
          '<p>A role can’t be deleted while people have it. Give them another role first, then delete it. See <a href="article.html?id=users-roles#org">Organisation roles</a>.</p>' +
        '</div></details>' +
        '<details><summary>Should I build a role from scratch or from a template?</summary><div class="prose">' +
          '<p>Start from the closest of the nine role templates, then remove the permissions the job doesn’t need. It’s quicker and less likely to miss something. See <a href="article.html?id=users-roles#templates">Role templates</a> and <a href="article.html?id=users-custom-role">Create a custom role</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I stop a TAS reviewer approving a TAS they built?</summary><div class="prose">' +
          '<p>The TAS Reviewer template includes TAS Builder as well as TAS Builder Review. Untick TAS Builder’s <b>Create</b> and <b>Edit</b> in the role, so reviewers can review but not build. See <a href="article.html?id=users-roles#templates">Role templates</a>.</p>' +
        '</div></details>' +
        '<details><summary>Who should hold the User Roles permission?</summary><div class="prose">' +
          '<p>Only one or two Administrators. Anyone with the User Roles permission in Settings can change any role’s permissions, including their own. Keep User Management and Security to the same people. See <a href="article.html?id=users-permissions">What each permission covers</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between roles and teams?</summary><div class="prose">' +
          '<p>Roles set <b>what</b> someone can do: which features they can view, create, edit and delete. Teams set <b>whose</b> work they can see. See <a href="article.html?id=users-plan-roles#roles-teams">Roles set what, teams set whose</a>.</p>' +
        '</div></details>' +
        '<details><summary>What is System Default?</summary><div class="prose">' +
          '<p>System Default sits at the top of the compliance governance chart and oversees everything in your RTO. Anything not assigned to a team, such as a new member, course, TAS or form, goes into System Default, and everyone can see it until it’s assigned. Anyone in System Default can see everyone and every team’s work. See <a href="article.html?id=users-governance#system-default">System Default</a>.</p>' +
        '</div></details>' +
        '<details><summary>I can’t find a person, program or item. Why?</summary><div class="prose">' +
          '<p>If a staff member, program or improvement item seems to be missing, it probably belongs to a team you’re not in. You only see your own teams’ people and work. Check the compliance governance chart to see which team it belongs to. If you need to oversee the whole organisation, ask an Admin to add you to System Default in <b>Settings</b> › <b>User Management</b>. See <a href="article.html?id=users-governance#visibility">How teams limit what people see</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can someone belong to more than one team?</summary><div class="prose">' +
          '<p>Yes. Tick them in each team’s members. On the chart, a dotted line links them to their second team. For example, a trainer who teaches in both the Business Faculty and the IT Faculty can belong to both. See <a href="article.html?id=users-teams#create">Create a team</a>.</p>' +
        '</div></details>' +
        '<details><summary>What happens to someone who isn’t in any team?</summary><div class="prose">' +
          '<p>They’re automatically in System Default, so they can see everyone in the organisation and every team’s work. Add them to the right team to limit what they see. See <a href="article.html?id=users-teams#members">Team actions</a>.</p>' +
        '</div></details>' +
        '<details><summary>What happens to a team’s members when the team is deleted?</summary><div class="prose">' +
          '<p>They snap to the parent of the deleted team, so they still sit in the right place in your structure and the compliance governance chart. Deleting a team can’t be undone, so check its members’ teams straight afterwards. See <a href="article.html?id=users-teams#members">Team actions</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-risk':
      '<section class="gs-faq">' +
        '<details><summary>Why should I save the register if nothing has changed?</summary><div class="prose">' +
          '<p>Saving after a review records that the review took place and resets the <b>Next Review</b> date, even if no risks changed. It also adds a version to the register’s history. See <a href="article.html?id=risk-overview#save">Save Risk Register</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I change a risk from the Risk Factors panel?</summary><div class="prose">' +
          '<p>No. The Risk Factors panel is read-only. To change a risk, select <b>Edit Comprehensive Assessment</b>. See <a href="article.html?id=risk-factors">Browse your risk factors</a>.</p>' +
        '</div></details>' +
        '<details><summary>Do I need a treatment plan for every risk?</summary><div class="prose">' +
          '<p>No. A treatment plan is strongly recommended for medium, high and extreme risks, and optional for low risks. The button tells you which applies: <b>Treatment Plan Strongly Recommended</b> or <b>Add Optional Treatment Plan</b>. See <a href="article.html?id=risk-treatment#when">When you need one</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I see Existing Controls or the treatment plan?</summary><div class="prose">' +
          '<p>They only appear after you select <b>Add Risk Factor</b>. Add the risk first, then fill in its existing controls and treatment plan. See <a href="article.html?id=risk-add-score#treatment">Add existing controls and a treatment plan</a>.</p>' +
        '</div></details>' +
        '<details><summary>What happens to a treatment plan when I complete the assessment?</summary><div class="prose">' +
          '<p>The responsible person gets an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register</a>, with the proposed treatment. Until you complete the assessment, these items are queued, and the bar along the bottom shows how many. See <a href="article.html?id=risk-treatment#cir">From treatment plan to improvement item</a>.</p>' +
        '</div></details>' +
        '<details><summary>How does our risk score affect validation?</summary><div class="prose">' +
          '<p>Your organisational risk score sets the baseline validation frequency for every course. Each course’s and unit’s own risk then adds to it. Admins can change the frequency bands in <b>Settings</b> › <b>Risk</b>. See <a href="article.html?id=risk-provider-factors">Risk scores and validation frequency</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I use our own risk categories?</summary><div class="prose">' +
          '<p>Yes. An Admin can set up categories that fit your RTO in Customisation. See <a href="article.html?id=cust-risk-categories">Configure risk categories and register versioning</a>.</p>' +
        '</div></details>' +
        '<details><summary>We changed our Escalation Manager. What should we do?</summary><div class="prose">' +
          '<p>Send the new Escalation Manager a risk report straight away with <b>Email Escalation Manager</b>, so they start with the full picture. See <a href="article.html?id=risk-escalation-manager#change">Changing your Escalation Manager</a> and <a href="article.html?id=risk-escalation#email">Email your Escalation Manager now</a>.</p>' +
        '</div></details>' +
        '<details><summary>The risk report went to the wrong email address. What now?</summary><div class="prose">' +
          '<p>Correct the Escalation Manager’s email in <b>Update RTO Profile</b>, then send the report again. If you notice before sending, select <b>Cancel</b> first. See <a href="article.html?id=risk-escalation#email">Email your Escalation Manager now</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-feedback':
      '<section class="gs-faq">' +
        '<details><summary>Which team can I put a form in?</summary><div class="prose">' +
          '<p>Provided you have the right permissions, it depends on where you are:</p>' +
          '<ul>' +
            '<li><b>In System Default:</b> create it in any team, so only that team’s members can see it, or in System Default, so everyone can see it.</li>' +
            '<li><b>In a team:</b> create it in your team, or in System Default. If you’re in more than one team, you can choose any of them.</li>' +
          '</ul>' +
          '<p>The form’s team decides who sees its submissions. See <a href="article.html?id=fb-plan#choose">Which teams you can choose</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between the Responsible person and Assigned To?</summary><div class="prose">' +
          '<p>The form’s <b>Responsible person</b>, chosen when the form is created, is emailed about every submission and looks after them by default. <b>Assigned To</b>, on a single submission, makes someone else its owner. They look into it and can give its action items to others. See <a href="article.html?id=fb-create-form">Create and build a form</a> and <a href="article.html?id=fb-submissions#respond">Respond to a submission</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do submissions get their category?</summary><div class="prose">' +
          '<p>From the form’s category question, such as “What is your feedback mainly about?”. The answer shows in the <b>Category</b> column on the Submissions tab, so you can sort and filter by it. See <a href="article.html?id=fb-submissions#list">Find a submission</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Share Form and Get Embed Code?</summary><div class="prose">' +
          '<p><b>Share Form</b> gives you the form’s public link to send to people, for example by email. <b>Get Embed Code</b> gives you the code to place the form on your website, plus the same direct link. See <a href="article.html?id=fb-embed">Share or embed a form on your website</a>.</p>' +
        '</div></details>' +
        '<details><summary>Does someone need an RTO Radar account to fill in a form?</summary><div class="prose">' +
          '<p>No. Anyone can fill in a form from its public link or from your website, such as students, employers and industry representatives. See <a href="article.html?id=fb-embed">Share or embed a form on your website</a>.</p>' +
        '</div></details>' +
        '<details><summary>Should I deactivate or delete a form I no longer use?</summary><div class="prose">' +
          '<p>Deactivate it. It stops taking new submissions, but the form and its submissions stay on record. See <a href="article.html?id=fb-manage-forms">Manage your forms</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can people stay anonymous?</summary><div class="prose">' +
          '<p>Yes. Set the form’s <b>Contact Information</b> to <b>Anonymous Only</b>, so no contact details are collected, or <b>Optional</b>, so people can choose. <b>Required</b> asks everyone for their contact details. See <a href="article.html?id=fb-create-form#steps">Create a form</a>.</p>' +
        '</div></details>' +
        '<details><summary>Who can see a form’s submissions?</summary><div class="prose">' +
          '<p>Only the owning team’s managers and members whose role includes Complaints &amp; Suggestions. A form in System Default is visible to everyone with that permission. See <a href="article.html?id=fb-plan">Plan your forms: teams, access and uses</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can one submission have several action items for different people?</summary><div class="prose">' +
          '<p>Yes. The submission’s owner can add an action item for each task, each with its own Person Responsible. For example, one for the Training Coordinator to update a workbook, and another for the Compliance Officer to check other resources. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why is there a Draft action item on a form submission?</summary><div class="prose">' +
          '<p>When the submitter answers <b>What could we improve?</b>, RTO Radar turns their answer into a suggested action item, marked <b>Draft</b>. It’s only a suggestion: nothing goes to the Continuous Improvement Register until you act on it.</p>' +
          '<ul>' +
            '<li>To act on it, send it to the person responsible. It becomes an improvement item.</li>' +
            '<li>To change it first, edit it, such as giving it a clearer title, a person responsible and a due date.</li>' +
            '<li>If no action is needed, remove it.</li>' +
          '</ul>' +
          '<p>You can also add your own action items. See <a href="article.html?id=fb-to-cir">Turn a submission into an improvement item</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-pd':
      '<section class="gs-faq">' +
        '<details><summary>How does PD get into My PD?</summary><div class="prose">' +
          '<p>If an Admin with the right permissions assigns a PD session to a staff member in Workforce Management, the staff member is enrolled automatically, and the session appears in their <b>My PD</b>. See <a href="article.html?id=pd-assign">Assign PD to a staff member</a>.</p>' +
          '<p>Otherwise, staff can enrol themselves from <b>Browse Catalogue</b>. For a paid session, they might need to send an EOI request for approval first. See <a href="article.html?id=pd-enrol">Find and enrol in PD</a> and <a href="article.html?id=pd-eoi">Request approval for paid PD</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Register and Enrol?</summary><div class="prose">' +
          '<p><b>Register</b> opens the provider’s website, where you actually register for the session, such as booking a place or paying.</p>' +
          '<p><b>Enrol</b> adds the session to your PD in RTO Radar, so the platform tracks it across the system: on your PD Calendar, in reports and exports, and as evidence once you complete it. Enrolling doesn’t register you with the provider.</p>' +
          '<p>For most sessions, do both: enrol in RTO Radar, then select <b>Register</b> in <b>My PD</b> to book with the provider. See <a href="article.html?id=pd-enrol">Find and enrol in PD</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I write a good description for my PD evidence?</summary><div class="prose">' +
          '<p>When an evidence map is created, RTO Radar’s AI writes your vocational competency and industry currency statements from your documents. To protect your personal information, it reads only the description, not the file itself, so the more detail you give, the stronger your evidence.</p>' +
          '<p>Include what the document is, who delivered it, when and for how long, the topics or units it covered, and how it improves your delivery. For a qualification, list the units with their codes and titles.</p>' +
          '<p>See <a href="article.html?id=pd-complete#description">Write a good description</a>, and <a href="article.html?id=wf-description">Write a good document description</a> for more examples.</p>' +
        '</div></details>' +
        '<details><summary>Can I stop my staff seeing PD from a global provider?</summary><div class="prose">' +
          '<p>Yes. Global providers and their sessions are set up by the RTO Radar team. If you don’t want your organisation and its members to see a global provider’s PD, go to <b>Settings</b> › <b>Professional Development</b> › <b>Providers</b> and turn off the provider’s switch under <b>Actions</b>.</p>' +
          '<p>To hide all global PD at once, turn off <b>Show Global Catalogue</b> on the <b>Settings</b> tab. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t staff see the PD calendar or catalogue?</summary><div class="prose">' +
          '<p><b>Enable PD Calendar</b> may be turned off. An Admin can turn it on in <b>Settings</b> › <b>Professional Development</b> › <b>Settings</b>, under <b>PD Calendar Module</b>. While it’s off, staff can’t browse or enrol in PD. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t staff see paid sessions?</summary><div class="prose">' +
          '<p><b>Show Paid PD Items</b> may be turned off. An Admin can turn it on in <b>Settings</b> › <b>Professional Development</b> › <b>Settings</b>, under <b>Paid PD Configuration</b>. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Global and Organisation providers and sessions?</summary><div class="prose">' +
          '<p><b>Global</b> providers and their sessions are set up by the RTO Radar team for all RTOs. You can view and open them, but not edit or delete them. To hide a global provider’s PD from your staff, turn off its switch under <b>Actions</b> on the <b>Providers</b> tab.</p>' +
          '<p>Providers and sessions you add are your RTO’s own: providers are marked <b>Organisation</b>, and sessions <b>Tenant</b>. You can view, edit or delete them. See <a href="article.html?id=pd-configure#manage">View, edit or delete a provider</a> and <a href="article.html?id=pd-configure#manage-sessions">View, edit or delete a session</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I remove PD I assigned to someone?</summary><div class="prose">' +
          '<p>On their <b>PD Calendar</b> in Workforce Management, select the cross <svg class="ui-icon" viewBox="0 0 24 24" aria-label="cross" role="img"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6"/></svg> under <b>Actions</b> on the session’s row. See <a href="article.html?id=pd-assign#calendar">View and manage assigned PD</a>.</p>' +
        '</div></details>' +
        '<details><summary>What happens after my EOI is approved?</summary><div class="prose">' +
          '<p>The session shows <b>Enrol</b> instead of <b>Request EOI</b> in <b>Browse Catalogue</b>. Select <b>Enrol</b> to add it to your PD, then <b>Register</b> on it in <b>My PD</b> to book with the provider. See <a href="article.html?id=pd-eoi#track">Track PD requests</a> and <a href="article.html?id=pd-enrol#view">View enrolled PDs and register</a>.</p>' +
        '</div></details>' +
        '<details><summary>Do I have to attach evidence to complete PD?</summary><div class="prose">' +
          '<p>Only if an Admin has turned on <b>Require Completion Evidence</b> in the PD settings. Attach Evidence then shows as <b>Required</b>, and you need at least one file to complete the PD. Otherwise it’s optional. See <a href="article.html?id=pd-complete#staff">Complete PD in Events</a>.</p>' +
        '</div></details>' +
        '<details><summary>Which file types can I attach as evidence?</summary><div class="prose">' +
          '<p>The <b>Allowed Evidence Types</b> an Admin has set in the PD settings, such as certificate, receipt, screenshot, reflection or other. Choose <b>Other</b> to name the document yourself. See <a href="article.html?id=pd-configure#settings">Choose your PD settings</a>.</p>' +
        '</div></details>' +
        '<details><summary>I did PD outside RTO Radar. How do I add it?</summary><div class="prose">' +
          '<p>Upload the evidence, such as a certificate, straight to <b>My Documents</b> in the Trainer/Assessor portal, with the category <b>Professional Development</b> and a detailed description. See <a href="article.html?id=pd-complete#upload">Upload PD evidence directly</a>.</p>' +
        '</div></details>' +
        '<details><summary>When can my PD evidence be used in an evidence map?</summary><div class="prose">' +
          '<p>Only once an Admin approves it. Until then, it shows as <b>Pending</b> in <b>My Documents</b>. See <a href="article.html?id=pd-complete#approve">Approve PD evidence</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-custom':
      '<section class="gs-faq">' +
        '<details><summary>Who can change these settings?</summary><div class="prose">' +
          '<p>Only Admins. Organisation settings apply to everyone in your RTO. See <a href="article.html?id=cust-overview">Organisation settings</a>.</p>' +
        '</div></details>' +
        '<details><summary>Do changes affect records we already have?</summary><div class="prose">' +
          '<p>It depends on the setting:</p>' +
          '<ul>' +
            '<li><b>Validation frequency</b>: applies to new validation recommendations. Validations already scheduled aren’t changed.</li>' +
            '<li><b>Course and unit risk scoring</b>: applies to new assessments, and to existing ones when they’re next saved, unless you select <b>Recalculate all program risk scores</b>.</li>' +
            '<li><b>TAS templates and custom sections</b>: apply to new TAS documents only.</li>' +
            '<li><b>Document type names</b>: renaming a type updates every document already using it.</li>' +
          '</ul>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Save baseline and Recalculate all program risk scores?</summary><div class="prose">' +
          '<p><b>Save baseline</b> stores your new points and bands. A program only uses them when its course risk assessment is new, or the next time it’s saved. Until then, it keeps its current score.</p>' +
          '<p><b>Recalculate all program risk scores</b> applies the current baseline and validation frequency bands to every stored assessment straight away. Each program’s inputs, such as its delivery mode and completion rate, are kept. Only its score, risk level and recommended frequency change.</p>' +
          '<p>Save the baseline first. Then recalculate if every program should reflect the change now, for example before an audit. See <a href="article.html?id=cust-course-risk-weights#save">Save and apply</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between a revision and a version of the risk register?</summary><div class="prose">' +
          '<p>Every time the risk register is saved, RTO Radar keeps a <b>revision</b>. A <b>version</b> is a revision you’ve finalised as a named, permanent copy, such as the register your governance meeting approved. Versions are only available when versioning is turned on. See <a href="article.html?id=cust-risk-categories#versions">Register versioning</a> and <a href="article.html?id=risk-versions">Risk register revisions and versions</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I delete a built-in document type?</summary><div class="prose">' +
          '<p>No. Built-in types, such as Policy and Procedure, can only be reordered. You can edit, archive or delete the types you’ve added. See <a href="article.html?id=cust-document-types">Manage document types</a>.</p>' +
        '</div></details>' +
        '<details><summary>Does renaming a document type change existing documents?</summary><div class="prose">' +
          '<p>Yes. Every document using that type is updated to the new name. Your document types are also shared with any RTOs linked to yours.</p>' +
        '</div></details>' +
        '<details><summary>Will a new custom boilerplate section appear in TAS documents we already have?</summary><div class="prose">' +
          '<p>No. Custom sections are only added to new TAS documents created after you save them. See <a href="article.html?id=cust-tas-templates#custom">Custom boilerplate sections</a>.</p>' +
        '</div></details>' +
        '<details><summary>A staff member lost their phone. How do they sign in?</summary><div class="prose">' +
          '<p>Go to <b>Settings</b> › <b>Security</b>. Under <b>User MFA Status</b>, select <b>Reset</b> beside them. They can then set up MFA again on their new phone the next time they sign in. See <a href="article.html?id=mfa-set-organisation#reset">Reset MFA</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-cir':
      '<section class="gs-faq">' +
        '<details><summary>How do I see only one team’s items, or items from one source?</summary><div class="prose">' +
          '<p>Choose a team in the team list above the register. To narrow it further, select <b>Filters</b> and choose a <b>Source</b> or <b>Status</b>, or select <b>Person Responsible</b> and tick the people whose items you want. See <a href="article.html?id=cir-overview#find">Find an item</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can we add our own sources?</summary><div class="prose">' +
          '<p>Yes. Admins add them in <b>Settings</b> › <b>Customisation</b> › <b>CIR</b> › <b>Sources</b>. They appear alongside the sources RTO Radar sets automatically, which can’t be deleted. See <a href="article.html?id=cust-cir-settings#sources">Sources</a>.</p>' +
        '</div></details>' +
        '<details><summary>Is the person responsible told about a new item?</summary><div class="prose">' +
          '<p>Yes. They’re emailed when the item is created. They can turn these emails off on the <b>Email Notifications</b> tab of their profile. See <a href="article.html?id=profile-notifications">Choose your email notifications</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Add Item (Default) and a custom CI register?</summary><div class="prose">' +
          '<p><b>Add Item (Default)</b> uses the standard fields every item has, such as Person Responsible, Due Date and Priority. A custom CI register adds your RTO’s own fields too, such as Audit Type and Finding Rating for an Audit Finding register. Admins set custom registers up in Customisation. See <a href="article.html?id=cust-cir-settings#custom">Create a custom CI register</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I bring in our existing CI register from a spreadsheet?</summary><div class="prose">' +
          '<p>Yes. Admins can bulk import a CSV or Excel file, as default items or into a custom CI register. Download the template, paste in your items, then upload and review them before importing. See <a href="article.html?id=cir-add-item#import">Bulk import items</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I stop CIR reminder emails?</summary><div class="prose">' +
          '<p>Turn off the continuous improvement reminders on the <b>Email Notifications</b> tab of your profile. See <a href="article.html?id=profile-notifications">Choose your email notifications</a>. Admins choose when reminders are sent for everyone. See <a href="article.html?id=cust-cir-settings#reminders">Reminders</a>.</p>' +
        '</div></details>' +
      '</section>',

    'faq-events':
      '<section class="gs-faq">' +
        '<details><summary>I held a scheduled consultation. How do I record it?</summary><div class="prose">' +
          '<p>On the <b>Schedule</b> tab, select <b>Record</b>, then <b>Record Evidence</b> beside the scheduled consultation. Its programs, date and subject matter expert are filled in, and saving marks the schedule complete. You don’t need to mark it complete separately.</p>' +
        '</div></details>' +
        '<details><summary>How do I record a consultation that was never scheduled?</summary><div class="prose">' +
          '<p>On the <b>Schedule</b> tab, select <b>Record</b>, then <b>New Consultation</b>. Use this for past consultations, such as a phone call or site visit with an employer, so the evidence is kept for audit.</p>' +
        '</div></details>' +
        '<details><summary>I recorded a new consultation in Record, but it had a schedule. What now?</summary><div class="prose">' +
          '<p>Mark the schedule complete and choose <b>Link to Recorded Evidence</b>, then the evidence you recorded. The schedule is closed and linked to that evidence, so it isn’t counted twice. Link to Recorded Evidence is only available once evidence has been recorded for that course. See <a href="article.html?id=ev-consultation#complete">Mark a consultation complete</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I mark a consultation complete without recording evidence?</summary><div class="prose">' +
          '<p>Yes. Choose <b>Set Date</b> to mark it complete on a date, or <b>Link Feedback</b> to attach feedback form submissions as evidence. For audit, record full evidence wherever you can, so the representative, topics and feedback are kept.</p>' +
        '</div></details>' +
        '<details><summary>Where do I find recorded consultations for an audit?</summary><div class="prose">' +
          '<p>On the <b>Schedule</b> tab, select <b>View</b> beside <b>View Evidence</b>. Every recorded consultation is listed, with its representative, programs, topics and action items, and you can download each record. See <a href="article.html?id=ev-consultation-history">View and manage consultation evidence</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I select Link to Recorded Evidence?</summary><div class="prose">' +
          '<p>It’s only available once evidence has been recorded against that course. Record the consultation first, then mark the schedule complete and link it. See <a href="article.html?id=ev-record-consultation">Record industry consultation evidence</a> and <a href="article.html?id=ev-consultation#complete">Mark a consultation complete</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I add an event to Outlook or Google Calendar?</summary><div class="prose">' +
          '<p>When you create an event, an .ics calendar file downloads. Open it to add the event to your own calendar. To add several events at once, select <b>Export Events</b>, then <b>Download Calendar</b>. See <a href="article.html?id=ev-add-event">Add an event</a> and <a href="article.html?id=ev-export">Export events</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I remind people about an event?</summary><div class="prose">' +
          '<p>When you create the event, choose a <b>Reminder</b>, and tick <b>Email notification</b> to send it by email too. See <a href="article.html?id=ev-add-event">Add an event</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I see only one team’s or one person’s events?</summary><div class="prose">' +
          '<p>On the calendar, use the <b>Team</b> filter to show one team’s events, or <b>Assigned To</b> to show the events assigned to particular people. See <a href="article.html?id=ev-calendar">Use the calendar</a>.</p>' +
        '</div></details>' +
      '</section>',

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
          '<p>When you restore the course, it returns to the list with all of them. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I delete a course?</summary><div class="prose">' +
          '<p>Archive it first, then delete it from the archive:</p>' +
          '<ol>' +
            '<li>On the <b>Courses</b> tab, select <b>⋮</b> › <b>Archive</b> on the course’s row.</li>' +
            '<li>Select <b>View Archived</b>.</li>' +
            '<li>On <b>Archived Courses</b>, tick the course and select <b>Delete selected</b>.</li>' +
          '</ol>' +
          '<p>Deleting is kept under archive to prevent accidental deletion of a course that may have unit validations and other evidence recorded against it. Delete a course only if you’re sure you no longer need it or its records. See <a href="article.html?id=prog-archive">Archive and restore courses and unit validations</a>.</p>' +
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
        '<details><summary>Why does Refresh from TGA fail for my program?</summary><div class="prose">' +
          '<p><b>Refresh from TGA</b> only works for qualifications accredited on training.gov.au. If the TAS is for a custom program, there’s nothing on training.gov.au to import, so the refresh fails, even when the program’s units are themselves on training.gov.au.</p>' +
          '<p>This often happens when an RTO delivers a single unit, rather than a full qualification. In that case, the unit is added to a custom program so it can be managed in RTO Radar. Its TAS can’t be refreshed from training.gov.au, so complete those sections yourself.</p>' +
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
        '<details><summary>Should I upload a new document or a new version?</summary><div class="prose">' +
          '<p>If the document already exists, upload a new version. It keeps its number, mapping and history, and every earlier version stays on record. See <a href="article.html?id=qms-new-version">Upload a new version and read version history</a>.</p>' +
        '</div></details>' +
        '<details><summary>What version number should I use?</summary><div class="prose">' +
          '<p>The new version moves on from the current one, for example from v1.0 to v2.0. You can edit it, so for minor changes or additions you could use v1.1 instead. See <a href="article.html?id=qms-new-version#upload">Upload a new version</a>.</p>' +
        '</div></details>' +
        '<details><summary>Do I have to enter a document number?</summary><div class="prose">' +
          '<p>No. Enter your own, such as POL-001, or leave it blank and RTO Radar generates one, such as DOC-20260404-…. See <a href="article.html?id=upload-and-map-a-document#steps">Upload a document</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can one document evidence several standards?</summary><div class="prose">' +
          '<p>Yes. Map it to every standard it evidences rather than uploading copies, so a new version updates every standard at once. See <a href="article.html?id=upload-and-map-a-document#steps">Upload a document</a>.</p>' +
        '</div></details>' +
        '<details><summary>The document type I need isn’t listed. What do I do?</summary><div class="prose">' +
          '<p>Ask an Admin to add it in <b>Settings</b> › <b>Customisation</b>. See <a href="article.html?id=cust-document-types">Manage document types</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between Status and Compliance Status?</summary><div class="prose">' +
          '<p>Every document has both. Its <b>Status</b> shows where it is in your approval process. Its <b>Compliance Status</b> shows whether it meets the standards it’s mapped to. See <a href="article.html?id=upload-and-map-a-document#status">Document status and compliance</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why won’t my Word document open in the viewer?</summary><div class="prose">' +
          '<p>Only PDFs open in the viewer. To open a Word document or any other file, select <b>⋮</b> › <b>Download</b> on its row, then open it on your computer. See <a href="article.html?id=qms-edit-download-delete#open">Open a document</a>.</p>' +
        '</div></details>' +
        '<details><summary>Should I archive or delete an old document?</summary><div class="prose">' +
          '<p>Both remove the document from your coverage on the Compliance Dashboard. Archive it when you need to keep it as a record for audits, such as a policy that’s no longer in use. Archived documents stay in RTO Radar, and the audit trail export lists them on a separate <b>Archived Documents</b> sheet. Delete a document only when you don’t need any record of it.</p>' +
          '<p>See <a href="article.html?id=qms-edit-download-delete#archive">Archive a document</a>.</p>' +
        '</div></details>' +
        '<details><summary>Who changed this document, and who approved it?</summary><div class="prose">' +
          '<p>Open its version history. It shows who changed each version, when and why, and who approved it. See <a href="article.html?id=qms-new-version#history">Read the version history</a>.</p>' +
        '</div></details>' +
        '<details><summary>Our standards aren’t listed. What can we do?</summary><div class="prose">' +
          '<p>Working to standards that aren’t listed, such as state registration standards? Set them up as a custom framework, and they’ll appear when you map documents. See <a href="article.html?id=qms-custom-framework">Create a custom framework</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I hide a framework without deleting it?</summary><div class="prose">' +
          '<p>Turn it off in <b>Manage Frameworks</b>. Only frameworks that are turned on appear when you map documents and on the Compliance Dashboard. See <a href="article.html?id=qms-frameworks#manage">Manage your frameworks</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I edit a predefined framework, such as the Standards for RTOs 2025?</summary><div class="prose">' +
          '<p>No. Predefined frameworks can only be viewed. To work to your own structure, create a custom framework. See <a href="article.html?id=qms-frameworks#manage">Manage your frameworks</a> and <a href="article.html?id=qms-custom-framework">Create a custom framework</a>.</p>' +
        '</div></details>' +
        '<details><summary>How do I fill a missing standard?</summary><div class="prose">' +
          '<p>Upload a document that evidences it, or edit an existing document and map it to that standard. The Compliance Dashboard lists the standards that still have no documents under <b>Missing Standards</b>. See <a href="article.html?id=qms-compliance-dashboard#parts">What’s on the dashboard</a>.</p>' +
        '</div></details>' +
        '<details><summary>How is Policy Compliance Health calculated?</summary><div class="prose">' +
          '<p>It combines three weighted measures: standards coverage, review timeliness and document freshness. By default they count for 50%, 30% and 20%. Admins can change the weights in <b>Customisation</b>, as long as they add up to 100%. See <a href="article.html?id=qms-health">How Policy Compliance Health is calculated</a> and <a href="article.html?id=cust-compliance-health">Set compliance health weighting</a>.</p>' +
        '</div></details>' +
        '<details><summary>What do I give an auditor?</summary><div class="prose">' +
          '<p>Use <b>Export</b> on the Document Management page:</p>' +
          '<ul>' +
            '<li><b>Export Audit Trail (Excel)</b> lists every document, with filters on every column, and archived documents on a separate <b>Archived Documents</b> sheet.</li>' +
            '<li><b>Export All Documents (ZIP)</b> downloads every document file.</li>' +
          '</ul>' +
          '<p>See <a href="article.html?id=qms-export">Export the audit trail and documents</a>.</p>' +
        '</div></details>' +
        '<details><summary>Who can see QMS documents?</summary><div class="prose">' +
          '<p>People whose role includes the <b>QMS Documents</b> permission, usually Admins and compliance staff. Trainers and assessors can’t see QMS documents unless their role allows it. Teams also limit what people see: documents assigned to a team are only visible to that team, its manager and System Default. See <a href="article.html?id=users-permissions">What each permission covers</a> and <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
        '</div></details>' +
      '</section>',

    // Workforce Management FAQs, shown on the module page under its guides
    'faq-workforce':
      '<section class="gs-faq">' +
        '<details><summary>Who can manage staff documents?</summary><div class="prose">' +
          '<p>An Admin who holds the right permissions and teams can manage each staff member’s documents from <b>Workforce Management</b> › <b>Workforce</b> › the staff member’s profile › <b>Documents</b>, including their own. Teams limit whose profiles they can see. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
          '<p>Staff can only view their own documents, in <b>My Documents</b>. Depending on the permissions of their role, they may also be able to view QMS documents in Document Management, or Workforce documents. See <a href="article.html?id=users-permissions">What each permission covers</a>.</p>' +
        '</div></details>' +
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
          '<p>Check the compliance governance chart on the <b>Teams</b> tab to see where the person sits. If they should be in your team, ask an Admin to move them in <b>Settings</b> › <b>User Management</b>. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a>.</p>' +
        '</div></details>' +
        '<details><summary>What’s the difference between a checklist item’s review frequency and document expiry?</summary><div class="prose">' +
          '<p>They answer two different questions:</p>' +
          '<ul>' +
            '<li><b>Review frequency</b> is how often you review whether the checklist item itself is still a requirement for the role. Requirements change over time. For example, a Trainer/Assessor checklist item for the Certificate IV in Training and Assessment once asked for TAE40116; when it was superseded by TAE40122, the item needed updating to the current qualification. A yearly review catches changes like this, so the documents staff must provide stay up to date.</li>' +
            '<li><b>Document expiry</b> is for checklist items whose documents have an expiry date of their own, such as a Working With Children Check. When a trainer uploads one that expires in two months, RTO Radar tracks that date so it can be renewed on time.</li>' +
          '</ul>' +
          '<p>In short, review frequency is about the requirement; document expiry is about each staff member’s document. See <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</p>' +
        '</div></details>' +
        '<details><summary>Where do I add a new staff member?</summary><div class="prose">' +
          '<p>In <b>Settings</b> › <b>User Management</b> › <b>Staff</b>, not in Workforce Management. That’s also where you set their role and team: roles on the <b>User Roles</b> tab, and teams on the <b>Teams Configuration</b> tab. You can open User Management from the button at the top right of Workforce Management. See <a href="article.html?id=users-invite">Add a user</a>, <a href="article.html?id=users-roles">Organisation roles and role templates</a> and <a href="article.html?id=users-teams">Create teams and set parent teams</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I assign a unit to a trainer?</summary><div class="prose">' +
          '<p>You can only assign units from courses already assigned to that trainer. Assign the course first on <b>Course Assignments</b>, then its units on <b>Unit Assignments</b>. See <a href="article.html?id=wf-assign-units#units">Assign units</a>.</p>' +
        '</div></details>' +
        '<details><summary>Where do trainers see what’s assigned to them?</summary><div class="prose">' +
          '<p>In the Trainer/Assessor portal, <b>My Courses</b> lists their assigned courses. Selecting <b>Manage Course</b> opens the course’s <b>Assigned Units</b>, where they work on evidence maps and validations. See <a href="article.html?id=wf-assign-units#trainer-view">What the trainer sees</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why isn’t a role listed on the Document Checklist tab?</summary><div class="prose">' +
          '<p>Only roles with staff are listed. Tick <b>Show roles with no assigned personnel</b> to see every role, or select <b>Display all documents</b> to see the documents for all roles together. See <a href="article.html?id=wf-checklist#view">View a role’s checklist</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why doesn’t a document count towards someone’s checklist?</summary><div class="prose">' +
          '<p>It needs to be linked to a checklist item when it’s uploaded. The list only shows required documents of the chosen category for the person’s role, so if nothing is listed, no required documents are set up for that category yet. Once linked, the document counts towards the role’s coverage and shows as provided on their profile. See <a href="article.html?id=wf-documents#upload">Upload a document</a> and <a href="article.html?id=wf-checklist">Set up a document checklist for a role</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why was a document rejected?</summary><div class="prose">' +
          '<p>Usually because its description doesn’t say enough. The description is what RTO Radar’s AI uses to write evidence statements, so Admins can reject a document whose description is too vague. Describe what it is, when it was completed, and the skills, units or practice it shows, then upload it again. See <a href="article.html?id=wf-description">Write a good document description</a>.</p>' +
        '</div></details>' +
        '<details><summary>Does the AI read our documents?</summary><div class="prose">' +
          '<p>No. To protect personal information, the AI reads only each document’s description, never the file itself. That’s why detailed descriptions give stronger evidence statements. See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I rely on the AI-generated statements?</summary><div class="prose">' +
          '<p>Treat them as a starting point, not a final answer. The regulator expects you to stay in the loop, so read both statements, check them against the evidence, apply your own judgement and edit them as needed before you approve the map. See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a>.</p>' +
        '</div></details>' +
        '<details><summary>Should I assign units or create the evidence map first?</summary><div class="prose">' +
          '<p>Assign units first. The evidence map is built from the units assigned to the trainer, so a unit that isn’t assigned won’t be in it. See <a href="article.html?id=wf-assign-units">Assign courses and units to a trainer</a>.</p>' +
        '</div></details>' +
        '<details><summary>What does Needs Revision mean on an evidence map?</summary><div class="prose">' +
          '<p>An Admin reviewed the trainer’s map and rejected it with notes. In the Trainer/Assessor portal, the trainer selects <b>Edit Map</b>, makes the changes and resubmits it, and it then shows <b>Resubmitted</b>. See <a href="article.html?id=wf-evidence-review">Review evidence maps from trainers</a>.</p>' +
        '</div></details>' +
        '<details><summary>Can I save an evidence map and finish it later?</summary><div class="prose">' +
          '<p>Yes. Select <b>Save as Draft</b> instead of <b>Save &amp; Approve</b>. Unfinished maps show on the Workforce Dashboard under <b>Draft Evidence Maps</b>, so they’re easy to come back to. See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a> and <a href="article.html?id=wf-dashboard">The Workforce Dashboard</a>.</p>' +
        '</div></details>' +
        '<details><summary>What does “Trainers Assigned but Unprepared” mean?</summary><div class="prose">' +
          '<p>It counts trainers who have assigned units they aren’t yet ready to deliver. Select the card on the Workforce Dashboard to see who they are, then check their evidence maps and documents. See <a href="article.html?id=wf-dashboard">The Workforce Dashboard</a>.</p>' +
        '</div></details>' +
        '<details><summary>When is PD flagged as overdue?</summary><div class="prose">' +
          '<p>When PD assigned as <b>Mandatory</b> isn’t completed by its due date. Optional and Recommended PD isn’t flagged. See <a href="article.html?id=wf-pd">Track and assign professional development</a>.</p>' +
        '</div></details>' +
        '<details><summary>Why can’t I select Generate with AI on an evidence map?</summary><div class="prose">' +
          '<p><b>Generate with AI</b> isn’t available while there’s text in either statement box. This stops the AI from overwriting what’s already been written, so nothing is lost.</p>' +
          '<p>To generate new statements, copy anything you want to keep, then clear both boxes and select <b>Generate with AI</b>. Each map in a trainer’s matrix works the same way. See <a href="article.html?id=wf-evidence-map">Create an evidence map for a trainer</a>.</p>' +
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
      '<div class="callout tip"><b>Tip</b><span>The sessions you can assign are set up in <b>Settings</b> › <b>Professional Development</b>. See <a href="article.html?id=pd-configure">Set up Professional Development</a>.</span></div>',

    'wf-dashboard':
      '<p class="lead">The <b>Workforce Dashboard</b> shows how ready your trainers are to deliver, across your whole RTO, and what needs your attention.</p>' +
      '<p>To open it, go to <b>Workforce Management</b> (1) and select the <b>Workforce Dashboard</b> tab (2).</p>' +
      '<figure class="shot" data-marks="0.4,47.2,14.4,6.4,oval,right,#1; 22.8,89.8,9.8,6.2,oval,above,#2"><img src="assets/img/wf-dash-open.png" alt="Workforce Management with Workforce Management circled in the navigation bar as marker 1 and the Workforce Dashboard tab circled as marker 2. The page shows the Show archived units tick box and four summary cards: Trainers Assigned but Unprepared 3, PD Records Awaiting Approval 1, Draft Evidence Maps 3 and Evidence Maps over 2 Years Old 0." loading="lazy"><figcaption>Select Workforce Management (1), then the Workforce Dashboard tab (2).</figcaption></figure>' +
      '<h2 id="sections">What’s on the dashboard</h2>' +
      '<ol class="ov-list">' +
        '<li><h4>The summary cards</h4><p>Four summary cards along the top show workforce measures. Select a card to see the items behind it.</p>' +
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
      '<p>The chart decides what each person can see and work on in RTO Radar. See <a href="article.html?id=users-governance">Understanding the compliance governance chart</a> in Users, Roles &amp; Teams.</p>' +
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
      '<div class="callout tip"><b>Tip</b><span>When staff upload a document, they can link it to a checklist item. It then counts towards the role’s coverage and shows as provided on their profile.</span></div>' +
      '<h2 id="staff-view">What trainers and assessors see</h2>' +
      '<p>Trainers and assessors see their role’s checklist in <b>My Documents</b> › <b>My Document Checklist</b> (circled). It shows how many of the required documents they’ve provided, grouped by category, such as Qualifications, Licences and General. Each item is:</p>' +
      '<ul>' +
        '<li><b>Missing</b>: no document has been linked to it yet.</li>' +
        '<li><b>Provided</b>: a document is linked, shown under <b>Matched by</b>.</li>' +
        '<li><b>Expired</b>: the linked document has passed its expiry date and needs replacing.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="10.6,1.2,13,5,oval,#"><img src="assets/img/wf-checklist-staff.png" alt="My Document Checklist, circled, beside My Documents, showing the Trainer/Assessor Requirement Checklist with 2 of 6 provided. Qualifications, 1 of 3: Certificate IV in Training and Assessment Transcript, Missing; Trainer and Assessor Qualification - TAE40122, Missing; and Vocational Qualification / Relevant Trade Certificate, Provided, matched by 01_Vocational_Competency_Profile. Licences, 1 of 2: First Aid Certificate, Missing; and Working With Children Check, Expired, matched by Working With Children Check (WWCC) - Victoria. General, 0 of 1: Trainer CV/ Resume, Missing." loading="lazy"><figcaption>A trainer’s checklist, with 2 of 6 documents provided.</figcaption></figure>',

    'wf-export':
      '<p class="lead">Workforce Management can export five reports, for audits, governance meetings or your own records.</p>' +
      '<h2 id="steps">Export a report</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b>.</li>' +
        '<li>Select <b>Export</b> at the top right of the page.' +
          '<figure class="shot" data-marks="78.3,17.4,7,4.4,oval,#"><img src="assets/img/wf-landing.png" alt="The top of Workforce Management, with the Export button circled beside Assign Training at the top right." loading="lazy"><figcaption>Select Export at the top right of Workforce Management.</figcaption></figure></li>' +
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
        '<li><b>Version History</b>: every saved revision of your risk register, any versions you’ve finalised, and how your risks have changed over time. See <a href="article.html?id=risk-versions">Risk register revisions and versions</a>.</li>' +
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
        '<li id="escalation">Nominate an <b>Escalation Manager</b>, then select <b>Save &amp; Exit</b>.' +
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
      '<div class="callout note"><b>Note</b><span>Admins can change the bands in <b>Settings</b> › <b>Customisation</b> › <b>Risk</b>. See <a href="article.html?id=cust-frequency-bands">Set validation frequency and escalation</a>.</span></div>' +
      '<p>For the factors that add to a course’s risk, see <a href="article.html?id=prog-course-risk#factors">Course-specific risk factors</a> in Program Management.</p>',

    'risk-escalation-manager':
      '<p class="lead">The Escalation Manager is the one person who keeps watch over your RTO’s organisational risks. Whatever happens on your risk register, they hear about it, so serious risks reach someone with the authority to act.</p>' +
      '<h2 id="who">Who to choose</h2>' +
      '<p>Choose a senior manager or board member: someone who can make decisions about resources, priorities and policy when a serious risk comes up. Your RTO has one Escalation Manager at a time.</p>' +
      '<p>You nominate them by name and email in <a href="article.html?id=risk-rto-profile&find=escalation">Update RTO Profile</a>, and their details show on the Risk Register Overview.</p>' +
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
      '<h2 id="change">Changing your Escalation Manager</h2>' +
      '<p>Update their name and email in <a href="article.html?id=risk-rto-profile&find=escalation">Update RTO Profile</a> and save. From then on, all risk emails go to the new person. Each revision in Version History records who the Escalation Manager was when it was saved, so you can show who had oversight at any point.</p>' +
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
      '<div class="callout tip"><b>Tip</b><span>Need the register as it was on an earlier date? Export that revision or version from Version History. See <a href="article.html?id=risk-versions">Risk register revisions and versions</a>.</span></div>',

    'risk-versions':
      '<p class="lead">Every time your risk register is saved, RTO Radar keeps a revision of it. If your RTO uses versioning, you can also finalise revisions as versions: named, permanent copies, such as the register your governance meeting approved. Version History lets you see how your risks have changed, look at the register as it was, and export it.</p>' +
      '<div class="callout note"><b>Note</b><span>Revisions are always kept. Versions are only available when an Admin turns on <b>Enable risk register versioning</b> in <b>Settings</b> › <b>Customisation</b> › <b>Risk</b> › <b>Risk Register</b>. Every save also becomes a version only when <b>Create a version automatically for every revision</b> is on too. See <a href="article.html?id=cust-risk-categories#versions">Register versioning</a>.</span></div>' +
      '<h2 id="created">When revisions are saved</h2>' +
      '<p>A new revision is saved when you:</p>' +
      '<ul>' +
        '<li>complete a comprehensive risk assessment</li>' +
        '<li>select <b>Save Risk Register</b> at the top right of Risk Assessment.</li>' +
      '</ul>' +
      '<p>Each revision records why it was saved, for example “Completed comprehensive risk assessment” or “Manually saved risk register”.</p>' +
      '<h2 id="open">Open Version History</h2>' +
      '<p>Go to <b>Risk Assessment</b> (1) and select the <b>Version History</b> tab (2).</p>' +
      '<figure class="shot" data-marks="0.5,62.1,14.5,6.4,oval,right,#1; 48.9,46.6,16.2,6.6,oval,above,#2"><img src="assets/img/risk-versions-tab.png" alt="Risk Assessment, circled as marker 1 in the navigation bar, with the Version History tab selected and circled as marker 2. Below, Risk Register Versions explains that versions are created automatically when a risk register is saved, with an Export all button, and Risk trend over time with a Show button." loading="lazy"><figcaption>Go to Risk Assessment (1), then select the Version History tab (2).</figcaption></figure>' +
      '<p>When versioning is turned on, Version History has two tabs: <b>Versions</b> and <b>Revisions</b>. When it’s off, it lists revisions only.</p>' +
      '<h2 id="trend">Risk trend over time</h2>' +
      '<p>At the top of the Version History tab, <b>Risk trend over time</b> charts the total number of risks over time, split into Extreme, High, Medium and Low.</p>' +
      '<ul>' +
        '<li>Choose a period: <b>All time</b>, <b>Last 30 days</b>, <b>Last 6 months</b>, <b>Last 12 months</b> or a <b>Custom date range</b>.</li>' +
        '<li>Select <b>Show</b> to open the chart, and <b>Hide</b> to fold it away.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium"><img src="assets/img/risk-versions-trend.png" alt="Risk trend over time, open, with period buttons: All time, which is selected, Last 30 days, Last 6 months, Last 12 months and Custom date range. The chart shows the total number of risks across 65 versions, split into Extreme, High, Medium and Low." loading="lazy"><figcaption>The risk trend over time, for all time.</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>A shrinking band of High and Extreme risks is good evidence for an auditor that your treatment plans are working.</span></div>' +
      '<h2 id="list">The revision list</h2>' +
      '<p>On the <b>Revisions</b> tab, below the chart, every revision is listed with the newest first. Use <b>Sort</b> to change the order, and filter by <b>Created Date</b> or <b>Review Date</b>. Each revision shows:</p>' +
      '<ul>' +
        '<li>its revision number and risk score, with <b>Active</b> on the current revision</li>' +
        '<li>when it was created and who saved it</li>' +
        '<li>how often the register is reviewed and when the next review is due</li>' +
        '<li>how many risks it holds, across how many categories</li>' +
        '<li>the Escalation Manager at the time</li>' +
        '<li>how it was saved.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium" data-marks="4.2,70.2,20.6,3.4,oval,right,#1; 85.6,70.4,10.6,6.4,oval,#2"><img src="assets/img/risk-revisions-list.png" alt="The Revisions tab of Version History: Risk Register Revisions, view and manage previous revisions of your risk register, created automatically when it’s saved, with Export all. Risk trend over time charts the total number of risks across revisions 2 to 68, split into Extreme, High, Medium and Low. Sort by Created Date, and filter by Created Date or Review Date. Revision 68, Active, circled as 1, created 27/10/2026, 3:02 pm, for RTO Radar Demo, with a risk score of 5.0/10, circled as 2. Reviewed every 12 months, next review 27 Oct 2027, saved by Admin Demo, 27 risks across 11 categories, escalation manager Admin Demo, saved after completing the comprehensive risk assessment. Export Revision, and Current Revision." loading="lazy"><figcaption>Revision 68, the current revision (1), with its risk score (2).</figcaption></figure>' +
      '<h2 id="view">View an earlier revision</h2>' +
      '<ol class="steps-list">' +
        '<li>On the <b>Revisions</b> tab, select <b>Load Revision</b> (circled) on the revision you want to see.' +
          '<figure class="shot shot-medium" data-marks="77.3,40.4,18.4,7,oval,#"><img src="assets/img/risk-revisions-load.png" alt="Revision 67, created 26/10/2026, 11:32 am, with a risk score of 8.0/10, 26 risks across 11 categories, saved after completing the comprehensive risk assessment, with Export Revision and Load Revision, which is circled. Revision 66, created 22/10/2026, 2:18 pm, with a risk score of 6.0/10, below." loading="lazy"><figcaption>Select Load Revision (circled).</figcaption></figure></li>' +
        '<li>The Overview shows the register as it was then. A banner reads <b>Viewing Historical Version</b> with the date it was created, and the version number appears next to the page title.</li>' +
        '<li>Look through its risk score, validation frequency, Escalation Manager and risk factors. You can still email it, schedule emails and export it to Excel.</li>' +
        '<li>Select <b>Return to Current Version</b> when you’re done.' +
          '<figure class="shot" data-marks="59,17.3,11.4,3.8,oval,#"><img src="assets/img/risk-versions-loaded.png" alt="Version 24 loaded, with a Version 24 label beside the Risk Register Overview title and a banner reading Viewing Historical Version 24, created on 8 Apr 2026, a read-only snapshot of your risk register. Its Return to Current Version button is circled. The Overview shows that version’s risk score of 6.8 out of 10, validation frequency of 6 months and 25 risks identified. Under Actions, Update RTO Profile and Edit Comprehensive Assessment are greyed out with a note to return to the current version to edit, while Email Escalation Manager and Schedule Email are available. A message confirms the version was loaded." loading="lazy"><figcaption>Select Return to Current Version (circled) when you’re done.</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>An earlier revision is a read-only snapshot. Update RTO Profile and Edit Comprehensive Assessment are unavailable until you return to the current revision.</span></div>' +
      '<h2 id="finalise">Finalise a version</h2>' +
      '<p>When versioning is turned on, finalise a revision as a version once it’s been reviewed, so there’s a permanent copy of the register as approved.</p>' +
      '<ol class="steps-list">' +
        '<li>In Version History, select the <b>Versions</b> tab (1). Until you finalise one, it shows <b>No version finalised yet</b>. If you’ve just turned on versioning, select <b>Backfill versions from revisions</b> to turn your saved revisions into versions in one go.' +
          '<figure class="shot" data-marks="23.6,25.8,14.6,5,oval,#1; 63.8,51.4,10.4,5.4,oval,right,#2"><img src="assets/img/risk-versions-versions.png" alt="Risk Register Overview, on Version History, with the Versions tab circled as 1 beside Revisions. Versions: finalise the risk register by creating a new version from existing saved revisions; deleting a version does not delete the original revision. Current working revision: Revision 68. Versions are created automatically every time the risk register is saved. A warning says no version has been finalised yet. Below are Backfill versions from revisions (64), Create version, Export all and Delete versions. The Create version button in the warning is circled as 2. No versions yet." loading="lazy"><figcaption>The Versions tab (1) and Create version (2).</figcaption></figure></li>' +
        '<li>Select <b>Create version</b> (2). In the dialog, choose the revision you’ve reviewed (1). The newest is selected. Search or page through the list for an earlier one.</li>' +
        '<li>Check the <b>Version number</b>, and enter a <b>Title</b> and <b>Description</b> (2), such as when it was approved and any notes for auditors. Its review period and next review date are carried from the revision. Select <b>Create version</b> (3).' +
          '<figure class="shot shot-medium" data-marks="4.2,25.6,88.8,10.8,zone,#1; 2,60.8,92,23,zone,#2; 80.8,92.6,16.6,5.8,oval,above,#3"><img src="assets/img/risk-versions-create.png" alt="Create version: elect one revision as a completed version; the version is a saved copy, so editing or deleting it never changes the revision it came from. Select the completed revision, with a search box: Revision 68, 27 risks, score 5, saved 27/10/2026, 3:02 PM by Admin Demo, next review 27 Oct 2027, selected and outlined as 1; Revision 67 and Revision 66 below, page 1 of 7. Version number 1, Title 2026 Risk Register - governance approved, and Description: Annual risk register review, approved at the governance meeting on 30/10/2026. Adds the new Third Party Delivery Risk category for partner-delivered training. These are outlined as 2. Carried from Revision 68: review period 12 months, next review 27 Oct 2027. Cancel, and Create version, circled as 3." loading="lazy"><figcaption>Revision 68 selected (1), its version details (2), then Create version (3).</figcaption></figure></li>' +
        '<li>The version appears on the Versions tab (1), marked <b>Manual</b>, with the revision it came from (2) and your description. Use the buttons (3) to export, edit or delete it.' +
          '<figure class="shot shot-medium" data-marks="5.2,58.9,60,3.6,oval,right,#1; 8.2,76.2,16,4.4,oval,#2; 78,90.6,17.4,5.8,oval,#3"><img src="assets/img/risk-versions-created.png" alt="The Versions tab: current working revision Revision 68, and versions are created automatically every time the risk register is saved. Risk trend over time says at least two versions are needed to show a trend. Search versions, Backfill versions from revisions (63), Create version, Export all and Delete versions. Version 1, 2026 Risk Register - governance approved, Manual, circled as 1: version saved 09/11/2026, 6:27 am, risk score 5.0/10, reviewed every 12 months, next review 27 Oct 2027, saved by Admin Demo, 27 risks across 11 categories, escalation manager Admin Demo. From revision 68, created 27/10/2026, 3:02 pm, circled as 2. The description: Annual risk register review, approved at the governance meeting on 30/10/2026. Adds the new Third Party Delivery Risk category for partner-delivered training. Export, edit and delete buttons, circled as 3." loading="lazy"><figcaption>Version 1 (1), from Revision 68 (2), with export, edit and delete (3).</figcaption></figure></li>' +
      '</ol>' +
      '<p>If <b>Create a version automatically for every revision</b> is on, every save also creates a version.</p>' +
      '<p>To remove versions, select <b>Delete versions</b>. The revisions they came from are kept. Once there are at least two versions, <b>Risk trend over time</b> on the Versions tab charts how your risks have changed between them.</p>' +
      '<h2 id="export">Export</h2>' +
      '<ul>' +
        '<li><b>Export Revision</b> (1) on a revision downloads that revision’s register. On the Versions tab, use the export button on a version.</li>' +
        '<li><b>Export all</b> (2) at the top of the list downloads every revision.</li>' +
      '</ul>' +
      '<figure class="shot shot-medium" data-marks="58.2,93.8,19.4,5,oval,above,#1; 81.8,8.8,15.8,5.4,oval,#2"><img src="assets/img/risk-revisions-list.png" alt="The Revisions tab, with Export all at the top circled as 2, and Export Revision on Revision 68 circled as 1." loading="lazy"><figcaption>Export Revision (1) downloads one revision. Export all (2) downloads every revision.</figcaption></figure>' +
      '<p>See <a href="article.html?id=risk-export">Export the risk register to Excel</a> for what’s in an export.</p>',
    'gs-welcome':
      '<p class="lead">This guide follows your RTO Radar onboarding session. Nine short steps take you from a new account to a dashboard filling up with your RTO’s work. Each step builds on the one before, so work through them in order.</p>' +

      '<h2>Moving through the guide</h2>' +
      '<p>Each step of this guide has its own page. There are two ways to move between them.</p>' +
      '<ol class="ov-list">' +
      '<li><h4>Previous and Next</h4>' +
      '<p>At the bottom of every page there are two buttons like these. <b>Next</b> takes you to the following step, and <b>Previous</b> takes you back one. The button tells you which step you’ll go to.</p>' +
      '<div class="demo" aria-hidden="true"><span class="demo-label">Example</span>' +
        '<div class="pager"><a><small>← Previous</small><b>How to Use This Guide</b></a><a class="next"><small>Next →</small><b>Set Up Your Organisation</b></a></div>' +
      '</div></li>' +
      '<li><h4>The step list</h4>' +
      '<p>The step list shows every step in the guide, with the one you’re on highlighted in blue. Select any step to jump straight to it.</p>' +
      '<ul>' +
        '<li><b>On a computer</b>, it runs down the left-hand side of the page, beside what you’re reading now.</li>' +
        '<li><b>On a phone or tablet</b>, open it from the step button at the top of the page.</li>' +
      '</ul>' +
      '<div class="demo demo-steps" aria-hidden="true"><span class="demo-label">Example</span>' +
        '<ol class="demo-nav">' +
          '<li><a><span class="n">i</span><span>How to Use This Guide</span></a></li>' +
          '<li><a class="on"><span class="n">1</span><span>Set Up Your Organisation</span></a></li>' +
          '<li><a><span class="n">2</span><span>Set Up Your Organisational Risks</span></a></li>' +
          '<li><a><span class="n">3</span><span>Visit the Continuous Improvement Register</span></a></li>' +
        '</ol>' +
      '</div></li>' +
      '<li><h4>Notes, tips and warnings</h4>' +
      '<p>Read these as you go. Each has its own colour and icon:</p>' +
      '<div class="callout note"><b>Note</b><span>Explains how something works.</span></div>' +
      '<div class="callout tip"><b>Tip</b><span>Points you to a shortcut or more detail.</span></div>' +
      '<div class="callout warn"><b>Warning</b><span>Flags something to take care with, such as a setting only Admins can change.</span></div></li>' +
      '<li><h4>Frequently asked questions</h4>' +
      '<p>The last page answers common questions, such as how risk scores are worked out and when to use a silent user. Select a question to open its answer, like this one:</p>' +
      '<section class="gs-faq demo-faq"><details><summary>Where can I find the answers to common questions?</summary><div class="prose"><p>On the last page of this guide, <b>Frequently asked questions</b>. Select it in the step list, or keep selecting <b>Next</b> until you reach it.</p></div></details></section></li>' +
      '</ol>' +

      '<h2>The RTO Radar screen</h2>' +
      '<p>Every screen in RTO Radar has two parts:</p>' +
      '<ul>' +
        '<li><b>The navigation bar (1)</b> on the left lists every part of RTO Radar, from Dashboard and Document Management through to Risk Assessment, Events and Settings. Select one to open it. The navigation bar stays in place wherever you go.</li>' +
        '<li><b>The content area (2)</b> on the right shows whatever you’ve opened, and changes as you move around.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="0.3,9,15.5,90.5,zone,#1; 17.2,6.4,81.6,93.2,zone,#2"><img src="assets/img/gs-welcome-dashboard.png" alt="RTO Radar after signing in. Marker 1 points to the navigation bar on the left, listing Dashboard, Document Management, Program Management, Continuous Improvement, Workforce Management, Risk Assessment, Complaints and Suggestions, Events and Settings. Marker 2 points to the content area on the right, showing the Admin Dashboard: a Risk Register Overview with 1 missing treatment, 1 responsibility gap and 12 overdue or missing dates, a Risk Level Breakdown bar chart and a Treatment Status Overview pie chart." loading="lazy"><figcaption>The navigation bar (1) and the content area (2), showing your dashboard.</figcaption></figure>' +
      '<p>When you sign in, the content area opens on your <b>dashboard</b>. It brings forward everything across RTO Radar that needs your immediate attention, from risks and improvement items to documents, staff and upcoming events.</p>' +
      '<p>If you’re new to RTO Radar, your dashboard will be mostly empty. That’s expected: it fills up as you work through this guide. Your organisational risks, improvement items, documents, courses and trainer each appear on it as you add them, and the last step shows you how to tailor it.</p>',
    'mfa-set-organisation':
      '<p class="lead">Two-factor authentication (MFA) adds a second step when someone signs in: a code from an authenticator app on their phone. Admins turn it on for the whole organisation and choose how strictly it’s enforced. Each person sets up their own.</p>' +
      '<h2 id="set">Turn on MFA</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>Security</b> (1). Under <b>Organisation MFA Settings</b>, turn on the switch (2). It shows <b>Disabled</b> while MFA is off for your organisation.' +
          '<figure class="shot" data-marks="43.3,53.6,8.3,8.6,oval,above,#1; 84.6,78.4,9.4,8.6,oval,above,#2"><img src="assets/img/mfa-security.png" alt="Organisation Settings on the Security tab, circled as 1. Organisation MFA Settings: configure two-factor authentication for your organisation, with its switch set to Disabled, circled as 2." loading="lazy"><figcaption>Open Security (1), then turn on Organisation MFA Settings (2).</figcaption></figure></li>' +
        '<li>Choose the <b>Enforcement Level</b> (circled):' +
          '<ul>' +
            '<li><b>Optional</b>: users can turn on MFA if they choose.</li>' +
            '<li><b>Recommended</b>: users are prompted to set up MFA each time they sign in, until they’re enrolled.</li>' +
            '<li><b>Required</b>: users must set up MFA before they can continue.</li>' +
          '</ul>' +
          '<figure class="shot" data-marks="1.8,57.6,47.6,18.6,oval,#"><img src="assets/img/mfa-level.png" alt="Organisation MFA Settings, Enabled, with the Enforcement Level set to Recommended - Prompt on login, circled: users will be prompted to set up MFA on each login until enrolled." loading="lazy"><figcaption>MFA turned on, with the Enforcement Level set to Recommended (circled).</figcaption></figure></li>' +
      '</ol>' +
      '<div class="callout note"><b>Note</b><span>The level applies to everyone in your RTO.</span></div>' +
      '<h2 id="users">What users see</h2>' +
      '<p>When MFA is Recommended or Required, people who aren’t enrolled see <b>Set Up Two-Factor Authentication</b> when they sign in. They need an authenticator app, such as Google Authenticator, Microsoft Authenticator or Authy. They select <b>Get Started</b> (arrow) to set it up. When MFA is Recommended, they can select <b>Set up later</b> to skip it for now. When it’s Required, there’s no <b>Set up later</b>.</p>' +
      '<figure class="shot shot-small" data-marks="49.6,69.3,arrow-down,tiny"><img src="assets/img/mfa-prompt.png" alt="RTO Radar, Set Up Two-Factor Authentication: add an extra layer of security to your account, for Admin Demo, admindemo@rtoradar.com.au. What you’ll need: an authenticator app like Google Authenticator, Microsoft Authenticator, or Authy. An arrow points down at Get Started, above Set up later and Sign out and return to login." loading="lazy"><figcaption>The prompt at sign-in. Select Get Started (arrow).</figcaption></figure>' +
      '<div class="callout tip"><b>Tip</b><span>Each person can also set up MFA, and manage their trusted devices, on the <b>MFA</b> tab of their profile. See <a href="article.html?id=profile-open">Your profile</a>.</span></div>' +
      '<h2 id="reset">Reset MFA</h2>' +
      '<p>If someone loses or replaces their phone, reset their MFA so they can set it up again.</p>' +
      '<ol class="steps-list">' +
        '<li>Under <b>User MFA Status</b>, below the MFA settings, find the person, or search for them. The list shows how many people have MFA enabled (1), and whether each is <b>Enrolled</b> or <b>Not Enrolled</b>, with when they enrolled and last verified.</li>' +
        '<li>Select <b>Reset</b> beside them (circled).' +
          '<figure class="shot" data-marks="1.4,8.9,17.6,4.6,oval,right,#1; 91,86.9,5.4,5.4,oval,#"><img src="assets/img/mfa-status.png" alt="User MFA Status: 2 of 5 users have MFA enabled, circled as 1, with Refresh and a search box. Design Manager, IT Faculty Manager and Staff Demo are Not Enrolled. Compliance Manager is Enrolled, enrolled 28 Sep 2026 and last verified Oct 29, 2026 4:43 PM, and Admin Demo is Enrolled, enrolled 28 Sep 2026 and last verified Nov 5, 2026 4:06 PM. Each enrolled user has Reset under Actions; Admin Demo’s is circled." loading="lazy"><figcaption>2 of 5 users enrolled (1). Select Reset (circled) to reset someone’s MFA.</figcaption></figure></li>' +
      '</ol>',
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
    'gs-organisation':
      '<h2>Set Up Your Organisation</h2>' +
      '<p>Your RTO profile is the baseline for your risk score, so start here: confirm your details, choose your risk factors and add your logo.</p>' +
      '<ol class="steps-list">' +
        '<li>On your navigation bar, go to <b>Risk Assessment</b>.' +
          '<figure class="shot" data-marks="0.2,32.3,11.4,6.9,oval,#"><img src="assets/img/gs-welcome-dashboard.png" alt="The RTO Radar dashboard, with Risk Assessment circled in the navigation bar on the left." loading="lazy"><figcaption>Select Risk Assessment in the navigation bar.</figcaption></figure>' +
          '<p>Your RTO profile lives under Risk Assessment because it’s where your risk score starts: your enrolments and basic provider risk factors set the baseline for your organisational risk, and for how often every course is validated.</p></li>' +
        '<li>Under <b>Actions</b>, select <b>Update RTO Profile</b>.' +
          '<figure class="shot" data-marks="63.6,57.2,36,10.4,oval,#"><img src="assets/img/gs-org-step1.png" alt="The Risk Assessment page, with the Update RTO Profile button circled, the first button in the Actions panel." loading="lazy"><figcaption>Select Update RTO Profile under Actions.</figcaption></figure></li>' +
        '<li>Check your RTO name and code, enter your RTO’s <b>Approximate Annual Enrolments</b>, and choose your <b>Basic Provider Risk Factors</b>. Together, your enrolments and risk factors feed into your organisational risk score.' +
          '<figure class="shot shot-medium"><img src="assets/img/gs-org-details.png" alt="The top of the Update RTO Profile form. RTO Information shows the RTO name and code and Approximate Annual Enrolments of 200. Basic Provider Risk Factors lists checkboxes such as CRICOS registered, government funding received, compliance issues identified within the past 3 years and high assessor turnover." loading="lazy"><figcaption>Your RTO information and basic provider risk factors.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Not sure which risk factors apply? Choose what you know now. You can change them later from Update RTO Profile.</span></div></li>' +
        '<li>Nominate an <b>Escalation Manager</b>, then select <b>Save &amp; Exit</b>.' +
          '<div class="callout note"><b>Note</b><span>Your Escalation Manager keeps watch over your organisational risks. RTO Radar notifies them whenever a risk is added to or removed from your register, at any risk level, so nothing changes without them knowing. Choose a senior manager or board member.</span></div>' +
          '<figure class="shot" data-marks="91.7,87,arrow-down,small"><img src="assets/img/gs-org-escalation.png" alt="The Escalation Manager section of the Update RTO Profile form, with Name and Email fields filled in as Admin Demo and admindemo@rtoradar.com.au, and a note that the Escalation Manager also serves as the default manager for the System Default team. Below it, the save bar shows Save Status: Not saved, with Edit Comprehensive Assessment and Save and Exit buttons. An arrow points down at the Save and Exit button." loading="lazy"><figcaption>Enter your Escalation Manager’s name and email, then select Save &amp; Exit.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Risk Register Overview</h2>' +
      '<p>Your risk score, validation frequency, risks identified, Escalation Manager and basic risk factors.</p>' +
      '<figure class="shot shot-medium"><img src="assets/img/gs-risk-overview.png" alt="The Risk Assessment overview for an RTO, showing a risk score of 6.0 out of 10, a validation frequency of 6 months, 27 risks identified, the Escalation Manager, an Actions panel and five active basic provider risk factors." loading="lazy"><figcaption>The Risk Register overview after saving your RTO profile.</figcaption></figure>' +
      '<h2>Branding</h2>' +
      '<p>Make RTO Radar your own. Your export logo appears on PDF and Word exports in place of the RTO Radar logo, and your sidebar icon replaces the default icon in the navigation for everyone in your RTO.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>Customisation</b> › <b>Branding</b>.' +
          '<figure class="shot" data-marks="0.2,52.6,11,8,oval,right,#1; 77.6,0.2,13.4,6,oval,right,#2; 85,22.2,13.6,6.6,oval,right,#3; 91.9,22,arrow-down; 65.6,60.6,arrow-left,#4"><img src="assets/img/gs-org-branding.png" alt="The Branding page in Settings. Marker 1 circles Settings in the navigation, marker 2 the Customisation tab along the top, and marker 3 the Branding tab under Customisation, with an arrow pointing down at it. Marker 4 is an arrow pointing left at Click to upload under Export Logo. The page shows two upload areas, Export Logo and Sidebar Icon, each with Click to upload." loading="lazy"><figcaption>Select Settings (1), then the Customisation tab (2), then Branding (3), then Click to upload (4).</figcaption></figure></li>' +
        '<li>Import your organisation’s logo by selecting <b>Click to upload</b>.</li>' +
      '</ol>',
    'gs-risks':
      '<p>Your organisational risk score combines your basic profile from the previous step with your comprehensive risk factors. It sets the baseline validation frequency for all your courses, and a course’s own risk factors can shorten it further.</p>' +
      '<h2>Set Up Your Organisational Risks</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Begin Comprehensive Assessment</b>.' +
          '<figure class="shot" data-marks="0.4,47.3,15.6,7.8,oval,#1; 63.6,65.6,36,10.4,oval,#2"><img src="assets/img/gs-org-step1.png" alt="RTO Radar with Risk Assessment selected in the navigation, showing the Actions panel. Marker 1 circles Risk Assessment in the navigation, and marker 2 the second button in Actions, which reads Edit Comprehensive Assessment here and Begin Comprehensive Assessment before an assessment has been started." loading="lazy"><figcaption>Select Risk Assessment (1), then Begin Comprehensive Assessment (2). Once you’ve started an assessment, this button reads Edit Comprehensive Assessment.</figcaption></figure></li>' +
        '<li>You’ll be greeted by the <b>Risk Heatmap</b>.' +
          '<figure class="shot"><img src="assets/img/gs-risk-heatmap-grid.png" alt="The Risk Heatmap: a five by five grid with likelihood across the top, from Rare to Almost Certain, and consequence down the side, from Insignificant to Catastrophic. Each square is coloured Low, Medium, High or Extreme and shows how many risks fall in it." loading="lazy"><figcaption>The Risk Heatmap.</figcaption></figure>' +
          '<p>The Risk Heatmap shows all your organisational risks at a glance, placed by how likely each one is and how serious it would be. The further towards the top right a risk sits, the more urgently it needs attention.</p></li>' +
        '<li>Scroll down to <b>Risk Assessment by Category</b>.</li>' +
        '<li>Choose the category where you want to enter your first risk, then select <b>Add Additional Risk</b>.' +
          '<figure class="shot" data-marks="5.6,21.8,10.4,6.2,oval,right,#1; 55.4,30,15.4,4.4,oval,right,#2"><img src="assets/img/gs-risk-categories.png" alt="Risk Assessment by Category in the comprehensive assessment. On the left is the list of 12 risk categories with how many risks each has; Financial Risk is selected and shows 0 risks identified, an example, and an Add Additional Risk button. Marker 1 circles the Financial Risk category, and marker 2 the Add Additional Risk button. A bar along the bottom shows the save status and a Complete Risk Assessment button." loading="lazy"><figcaption>Choose a category such as Financial Risk (1), then select Add Additional Risk (2).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Want risk categories that fit your RTO? See how to set them up in <a href="feature.html?m=custom">Customisation</a>.</span></div></li>' +
        '<li>Enter the risk title, description, likelihood and consequence, then select <b>Add Risk Factor</b>.' +
          '<figure class="shot shot-medium" data-marks="2.9,86.9,26.9,9.3,oval,#"><img src="assets/img/gs-risk-add-factor.png" alt="The Add New Risk Factor form, filled in with an example: the risk title Cash-flow pressure from delayed student payments, a description, likelihood 3 - Possible and consequence 3 - Moderate. The Add Risk Factor button is circled." loading="lazy"><figcaption>Enter the risk details, then select Add Risk Factor.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Add Treatment Plan</h2>' +
      '<p>For risks rated medium or higher, we recommend adding Existing Controls and a Treatment Plan.</p>' +
      '<ol class="steps-list" start="6" style="counter-reset: s 5">' +
        '<li>Add your <b>Existing Controls</b>: what you already do to manage this risk.' +
          '<div class="callout note"><b>Note</b><span>Existing Controls and the treatment plan only appear after you select Add Risk Factor.</span></div></li>' +
        '<li>Select <b>Treatment Plan Strongly Recommended</b>.' +
          '<figure class="shot shot-medium" data-marks="2.1,81.2,58.2,6.7,oval,#; 30,81.2,arrow-down,tiny"><img src="assets/img/gs-risk-controls.png" alt="A saved risk, Cash-flow pressure from delayed student payments, rated Medium Risk with a score of 9 and marked Escalation Required, with its Existing Controls filled in. A small arrow leads from the last existing control, management review of outstanding debts, down to the Treatment Plan Strongly Recommended button, which is circled." loading="lazy"><figcaption>Select Treatment Plan Strongly Recommended.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>This button’s wording depends on the risk’s score. For medium, high and extreme risks it reads Treatment Plan Strongly Recommended. For low risks a treatment plan is optional, so it reads Add Optional Treatment Plan instead.</span></div></li>' +
        '<li>Enter a title, description and proposed treatment, nominate the person responsible, and set a due date and status.' +
          '<div class="callout note"><b>Note</b><span>The responsible person gets an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register (CIR)</a> with the proposed treatment.</span></div>' +
          '<figure class="shot"><img src="assets/img/gs-risk-treatment.png" alt="A treatment plan being added to a risk: title Monthly Cash-Flow Monitoring, a description, a proposed treatment, responsible person Compliance Manager, due date 30/10/2026 and status Not started. A bar along the bottom shows the save status, 1 item queued for CI Register and a Complete Risk Assessment button." loading="lazy"><figcaption>Fill in the treatment plan. Use the calendar icon to pick a due date.</figcaption></figure></li>' +
        '<li>Repeat steps 4 to 8 to add more risks, then select <b>Complete Risk Assessment</b>.' +
          '<figure class="shot" data-marks="8.4,54.2,17.6,10,oval,#1; 49,16.4,arrow-down,#2; 88.1,92.6,arrow-down,#3"><img src="assets/img/gs-risk-repeat.png" alt="Risk Assessment by Category with a second category selected. Marker 1 circles ICT and Cyber-Security Risk in the category list, and marker 2 is an arrow pointing down at its content on the right: its description, an example, and a risk being entered, Staff Awareness of Cyber Risks, rated Medium Risk with a score of 9. Marker 3 is an arrow pointing down at the Complete Risk Assessment button in the save bar along the bottom, which shows 2 items queued for CI Register." loading="lazy"><figcaption>Choose another category (1), add its risks the same way (2), then select Complete Risk Assessment (3).</figcaption></figure></li>' +
        '<li>Review your changes, then select <b>Complete Risk Assessment</b>.' +
          '<figure class="shot" data-marks="60.9,89.4,23.5,7.4,oval,#"><img src="assets/img/gs-risk-review.png" alt="The review shown before completing the assessment, headed New Risks Added (2). It lists both new risks with their category, likelihood and consequence, and treatment plan: Cash-flow pressure from delayed student payments, rated Medium with a score of 9, and Staff Awareness of Cyber Risks, rated Low with a score of 4. The Complete Risk Assessment button, between Discard and Exit and Cancel, is circled." loading="lazy"><figcaption>Review the new risks and their treatment plans, then select Complete Risk Assessment.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can add more risks later from Risk Assessment › Actions › Edit Comprehensive Assessment.</span></div></li>' +
        '<li>Check that your <b>Escalation Manager</b> has received an email about the risks you’ve added.' +
          '<div class="callout tip"><b>Tip</b><span>No email? Check that the right person is nominated in Update RTO Profile, that their email address is entered correctly, and their junk folder.</span></div></li>' +
      '</ol>' +
      '<h2>Risk Heatmap</h2>' +
      '<ol class="steps-list" start="12" style="counter-reset: s 11">' +
        '<li>Check the updated <b>Risk Heatmap</b>.' +
          '<figure class="shot"><img src="assets/img/gs-risk-heatmap-updated.png" alt="The Risk Heatmap after completing the assessment, with the number of risks in each square. The pointer is over the Possible and Moderate square, which shows 4 risks, likelihood 3 times consequence 3 for a score of 9, and lists the risks in it, each marked Medium Risk." loading="lazy"><figcaption>Hover over a square to see the risks in it and how they were scored.</figcaption></figure></li>' +
      '</ol>',
    'gs-cir':
      '<p>The Continuous Improvement Register (CIR) is one list of every improvement action in your RTO. Risk treatments, feedback, validation findings and audit outcomes all land here, each with a person responsible, a due date and a priority, so nothing slips through and you have a record of continuous improvement ready for audit.</p>' +
      '<ol class="steps-list">' +
        '<li>From your navigation bar, go to <b>Continuous Improvement</b>.' +
          '<figure class="shot" data-marks="0.1,21.9,11.8,5.4,oval,#"><img src="assets/img/gs-cir-nav.png" alt="The Continuous Improvement Register, with Continuous Improvement circled in the navigation bar on the left. The Item List shows 10 improvement items with their item number, who created them, status, source, person responsible, assigned date, description, tags, due date and priority." loading="lazy"><figcaption>Select Continuous Improvement in the navigation bar.</figcaption></figure></li>' +
        '<li>Find the item created from your treatment plan. Its source is <b>Risk Register</b>, and it shows the person responsible, due date and priority. Select the eye icon in the <b>Actions</b> column to open it.' +
          '<figure class="shot" data-marks="23.9,57.4,6.9,9.6,underline,#; 93.4,54.6,5.6,14.6,oval,#"><img src="assets/img/gs-cir-list.png" alt="The Continuous Improvement item list, showing two items with Risk Register as their source. Each row shows the item number, who created it, status, person responsible, assigned date, description, tags, due date and priority. Risk Register is underlined on the first item, and its eye icon is circled." loading="lazy"><figcaption>Items created from treatment plans show Risk Register as their source. Select the eye icon to open one.</figcaption></figure></li>' +
        '<li>Review the item. It carries over everything from the risk: its title, category and description, its risk level and score, your existing controls, and the proposed treatment from your treatment plan, along with who’s responsible and when it’s due. From here you can edit, verify or complete the item.' +
          '<figure class="shot shot-small"><img src="assets/img/gs-cir-item.png" alt="An improvement item opened in full. It shows the title, source, person responsible, dates, tags and the original risk score, notes carried over from the risk (category, description, level, existing controls, likelihood and consequence), and the proposed treatment. Buttons along the bottom are Delete Item, Complete Item, Verify, More info and Edit Item." loading="lazy"><figcaption>An improvement item created from a risk treatment plan.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The person responsible gets this exact item too.</span></div></li>' +
      '</ol>',
    'gs-documents':
      '<p>RTO Radar is also your quality management system (QMS). Your policies, procedures and other compliance documents live in one repository, each with an owner, a reviewer and review reminders, and each mapped to the standards it evidences. The Compliance Dashboard then shows how well your documents cover your frameworks.</p>' +
      '<h2>Upload Document</h2>' +
      '<ol class="steps-list">' +
        '<li>From your navigation bar, go to <b>Document Management</b>, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="0.2,15.1,12.8,5,oval,#1; 78.2,10.7,10.6,5.6,oval,right,#2"><img src="assets/img/gs-doc-upload.png" alt="Document Management (QMS), showing totals for documents, approved, review due and drafts, and the Document Repository. Marker 1 circles Document Management in the navigation bar, and marker 2 circles the Upload Document button at the top right." loading="lazy"><figcaption>Select Document Management (1), then Upload Document (2).</figcaption></figure></li>' +
        '<li>Choose <b>File upload</b>, then select <b>Choose File</b> and pick a file from your computer.' +
          '<figure class="shot" data-marks="49.2,80.4,arrow-down"><img src="assets/img/gs-doc-file.png" alt="The Upload Document form, with Source set to File upload and a Link option beside it. An arrow points down at the Choose File button under Document File." loading="lazy"><figcaption>Select Choose File to add a document from your computer.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Is the document stored online? Choose <b>Link</b> instead and paste its web address.</span></div></li>' +
        '<li>Fill in the document details.' +
          '<figure class="shot shot-medium"><img src="assets/img/gs-doc-details.png" alt="The document details section of the Upload Document form, filled in for an enrolment and admissions policy: document number (left blank to auto-generate), initial version 1.0, document title, document type Policy, category, description, tags, a review frequency of 12 months, a review due date, and the document owner." loading="lazy"><figcaption>Document details, including the review frequency and document owner.</figcaption></figure></li>' +
        '<li>Nominate a document reviewer and set up email reminders for reviews. Along with the reminders, the reviewer is given a Continuous Improvement item to work on.' +
          '<figure class="shot"><img src="assets/img/gs-doc-reviewer.png" alt="The Document Reviewer and Email Reminders section of the form. Claire Smith, an Administrator, is chosen as reviewer, and reminders can be sent 1 day, 3 days, 5 days, 7 days, 14 days or 1 month before the review due date, with 14 days ticked." loading="lazy"><figcaption>Choose a reviewer and when they’re reminded before the review is due.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The reviewer is emailed as the document’s review due date approaches, at each reminder you tick. The reviewer can be different from the document’s owner.</span></div></li>' +
        '<li>Map the document to the compliance frameworks set for your RTO.' +
          '<figure class="shot"><img src="assets/img/gs-doc-mapping.png" alt="Compliance Framework Mapping for Demo RTO, with 5 standards selected. Under the Standards for RTOs 2025, standards such as 1.6, 1.7, 2.1 and 2.2 are ticked, each with its description, and there is a search box for finding standards." loading="lazy"><figcaption>Tick each standard the document provides evidence for.</figcaption></figure></li>' +
        '<li>Set the document’s status and compliance status, add any notes, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="86.4,86.3,arrow-down,small"><img src="assets/img/gs-doc-status.png" alt="The Document Status section, with Status set to Approved, Compliance Status set to Compliant, and an empty notes box. An arrow points down at the Upload Document button." loading="lazy"><figcaption>Set the statuses, then select Upload Document.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>Until a document is approved and compliant, Admins can upload newer versions of it to make corrections.</span></div></li>' +
        '<li>Repeat steps 1 to 6 to add your RTO’s initial documents.</li>' +
        '<li>Find your documents in the <b>Document Repository</b>.' +
          '<figure class="shot"><img src="assets/img/gs-doc-repository.png" alt="The Document Repository, listing three documents with their document number, title and category, type, compliance status, review date, reviewer and the SRTO 2025 standards each is mapped to, such as 2.1 and 4.1." loading="lazy"><figcaption>Each document shows its compliance status, next review date, reviewer and the standards it’s mapped to.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Compliance Dashboard</h2>' +
      '<p>The Compliance Dashboard shows how well your documents cover each framework, using the standards you mapped them to. As you upload and map more documents, it fills in.</p>' +
      '<p>To open it, go to <b>Document Management</b> and select the <b>Compliance Dashboard</b> tab.</p>' +
      '<figure class="shot" data-marks="21.2,43.2,9.8,6.6,oval,#"><img src="assets/img/gs-cd-tab.png" alt="Document Management (QMS), showing totals for documents, approved, review due and drafts, and the Document Repository. The Compliance Dashboard tab, beside Documents, is circled." loading="lazy"><figcaption>Select the Compliance Dashboard tab in Document Management.</figcaption></figure>' +
      '<p><b>Standards coverage</b> shows how many standards have at least one mapped document. <b>Policy Compliance Health</b> is a score out of 100 that combines standards coverage, review timeliness and document freshness.</p>' +
      '<figure class="shot"><img src="assets/img/gs-cd-coverage.png" alt="The top of the Compliance Dashboard for the Standards for RTOs 2025: 23 total standards, 9 covered and 14 missing. A Standards Coverage chart shows 39 percent coverage, and a Policy Compliance Health gauge shows 52, rated Fair, on a scale of 0 to 39, 40 to 69 and 70 to 100." loading="lazy"><figcaption>Standards coverage and Policy Compliance Health.</figcaption></figure>' +
      '<p><b>Upcoming reviews</b> shows documents that are overdue, or due for review in the next 30 or 90 days.</p>' +
      '<figure class="shot"><img src="assets/img/gs-cd-reviews.png" alt="Upcoming Reviews for the next 90 days, on a timeline: 1 overdue, 1 due in 30 days and 1 due in 90 days." loading="lazy"><figcaption>Documents overdue or due for review soon.</figcaption></figure>' +
      '<p><b>Quality area coverage</b> shows how well each quality area of the framework is documented, and lists the standards that still have no documents mapped to them.</p>' +
      '<div class="shot-pair"><figure class="shot"><img src="assets/img/gs-cd-missing.png" alt="Missing Standards (14), listing standards such as 1.5, 1.6, 1.7, 2.1, 2.2 and 2.3, each with no documentation found." loading="lazy"><figcaption>Standards that still need a document.</figcaption></figure>' +
      '<figure class="shot"><img src="assets/img/gs-cd-quality.png" alt="Quality Area Coverage as a bar chart: Quality Area 1 is about 63 percent covered and Quality Area 4 is fully covered, while Quality Areas 2 and 3 have no coverage yet. Colours show 80 percent and above, 60 to 79, 40 to 59 and under 40." loading="lazy"><figcaption>Coverage for each quality area.</figcaption></figure></div>',
    'gs-programs':
      '<p>Program Management is where your courses and units live. It’s connected to training.gov.au, so you can search for nationally recognised courses and units and add them in a few clicks, and each course gets a risk assessment that recommends how often it’s validated.</p>' +
      '<h2>Add a Course</h2>' +
      '<ol class="steps-list">' +
        '<li>From your navigation bar, go to <b>Program Management</b>, then select <b>Add Course</b>.' +
          '<figure class="shot" data-marks="0.6,39.1,17,6.3,oval,right,#1; 86.5,10.8,9.7,8.1,oval,above,#2"><img src="assets/img/gs-prog-add.png" alt="Program Management, with Schedule, View Archived and Add Course buttons, summary cards for total programs, accredited programs, units managed, risk assessed and pending risk assessment, and the Courses and TAS Builder tabs. Marker 1 circles Program Management in the navigation bar, and marker 2 circles the Add Course button at the top right." loading="lazy"><figcaption>Select Program Management (1), then Add Course (2).</figcaption></figure></li>' +
        '<li>Choose <b>TGA Accredited Courses</b>, or enter a custom program.' +
          '<div class="callout note"><b>Note</b><span>Custom programs aren’t TGA-accredited qualifications. You’ll need to add their units or modules yourself and make sure they meet the relevant industry standards.</span></div></li>' +
        '<li>Under TGA Accredited Courses, search by course code, title or keyword, then select <b>Search TGA</b>.' +
          '<figure class="shot" data-marks="19.6,37.4,17.8,4.2,underline,#1; 18.6,70.6,arrow-left,tiny,#2; 79.2,66,12.1,9.2,oval,right,#3"><img src="assets/img/gs-prog-search.png" alt="Add Courses and Programs, on the TGA Accredited Courses tab. Marker 1 underlines TGA Accredited Courses, marker 2 is an arrow pointing left at the course code BSB50120 entered in the search box, and marker 3 circles the Search TGA button. Hints below say you can search by national code, course title or keywords, and that results come directly from training.gov.au." loading="lazy"><figcaption>On TGA Accredited Courses (1), enter a course code (2), then select Search TGA (3).</figcaption></figure></li>' +
        '<li>Find your course in the search results and select <b>Add Course</b>.' +
          '<figure class="shot" data-marks="73.5,82.6,15.2,6.2,oval,#"><img src="assets/img/gs-prog-results.png" alt="Search results for BSB50120, showing 1 of 1 results: BSB50120 Diploma of Business, marked Qualification and Current. Its Add Course button is circled." loading="lazy"><figcaption>Select Add Course beside your course.</figcaption></figure></li>' +
        '<li>Under <b>Course-Specific Risk Factors</b>, answer each question. They’re all required.' +
          '<figure class="shot shot-medium"><img src="assets/img/prog-risk-factors.png" alt="Course-Specific Risk Factors: Primary Delivery Mode set to Blended (+1 point), Use of Recognition of Prior Learning set to Minimal use (0 points), Use of unsupervised assessments set to Extensive use (+2 points), a student enrolment volume of 180, where 101 to 200 adds 1 point, and a course completion rate of 72%, where 50% to 74% adds 1 point." loading="lazy"><figcaption>The required course-specific risk factors.</figcaption></figure></li>' +
        '<li>Under <b>Additional Risk Factors</b>, tick any that apply to the course. They’re optional.' +
          '<figure class="shot"><img src="assets/img/prog-risk-additional.png" alt="Additional Risk Factors, each a tick box with the points it adds. Structured work placement or employer-based assessment included (+1 point) and Delivery to international (CRICOS) students (+1 point) are ticked. Others include delivery below nominal hours, new or recently updated assessment tools, a course new to the RTO, offshore delivery (+2 points), government funding contracts, apprenticeships or traineeships, and a history of complaints, validation issues or non-compliance (+2 points)." loading="lazy"><figcaption>Tick any additional risk factors that apply.</figcaption></figure></li>' +
        '<li>Review the course risk assessment result and the recommended validation frequency, then select <b>Complete Course Assessment</b>.' +
          '<figure class="shot" data-marks="61.3,86.5,35.2,8.1,oval,#"><img src="assets/img/gs-prog-result.png" alt="The Course Risk Assessment Result: provider risk 3.6 out of 6, course risk 7 out of 24, and a total risk score of 5.2 out of 10, rated Medium Risk. The recommended validation frequency is every 18 months, based on combined provider and course-specific risk factors. The Complete Course Assessment button is circled." loading="lazy"><figcaption>Your course’s risk score and recommended validation frequency.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can change how risk scores map to validation frequencies in <a href="feature.html?m=custom">Customisation</a>.</span></div></li>' +
        '<li>Find your course in <b>Program Management</b>.' +
          '<figure class="shot"><img src="assets/img/gs-courses-list.png" alt="The Courses list in Program Management, showing three courses with their program code, title, team, number of units, a Manage button for units, risk status from Low to High, and when each was created." loading="lazy"><figcaption>Each course shows its team, number of units and risk status.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Manage Course Units</h2>' +
      '<ol class="steps-list">' +
        '<li>In <b>Program Management</b>, on the <b>Courses</b> tab, select <b>Manage</b> next to your course.' +
          '<figure class="shot" data-marks="0.6,39.1,15.1,6.4,oval,right,#1; 20.3,4.8,4.2,6.4,oval,#2; 62,60.2,6.3,7.4,oval,above,#3"><img src="assets/img/gs-prog-manage.png" alt="Program Management on the Courses tab, listing BSB50120 Diploma of Business in the Business Faculty with 0 units and a Medium risk status, and CHC50121 Diploma of Early Childhood Education and Care with 26 units. Marker 1 circles Program Management in the navigation bar, marker 2 the Courses tab, and marker 3 the Manage button for the Diploma of Business." loading="lazy"><figcaption>Select Program Management (1), the Courses tab (2), then Manage next to your course (3).</figcaption></figure></li>' +
        '<li>Select <b>Add Unit</b>. Under <b>Search TGA units</b>, select <b>Search [course code]’s Units</b> to load all the units in your course, or enter a unit code to find one.' +
          '<figure class="shot" data-marks="86.9,4.2,9.9,11.6,oval,#1; 8.1,42,15.6,5.4,underline,#2; 66.4,52,28.3,12.7,oval,above,#3"><img src="assets/img/gs-prog-add-unit.png" alt="The Add Unit panel for BSB50120. Marker 1 circles the Add Unit button at the top right, marker 2 underlines Search TGA units, and marker 3 circles the Search BSB50120’s Units button beside the search box. A Create custom unit option sits above, and a hint says to enter a unit code or select the button to load all BSB50120 units." loading="lazy"><figcaption>Select Add Unit (1), then under Search TGA units (2), select Search [course code]’s Units (3).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Unit not on training.gov.au? Choose <b>Create custom unit</b> instead.</span></div></li>' +
        '<li>Filter and select from core or elective units, or from unit groups.</li>' +
        '<li>When you’re happy with your units, select <b>Add Selected</b>. The button shows how many units you’ve chosen.' +
          '<figure class="shot" data-marks="8.7,25.8,3.4,6.6,oval,#1; 18.6,9,15.6,7.4,oval,right,#2"><img src="assets/img/gs-prog-select-units.png" alt="The unit list for the course, showing 12 of 12 units selected: 5 core and 7 elective. Units are grouped under Core Units and Group A, Business Operations, each with a ticked box, its code, Core or Elective, and Current. Filters for status, type and group sit at the top. Marker 1 circles the ticked box beside the first core unit, and marker 2 circles the Add Selected (12) button." loading="lazy"><figcaption>Tick the units you want (1), then select Add Selected (2).</figcaption></figure></li>' +
        '<li>Scroll down to find your units under <b>Course Units</b>.</li>' +
        '<li>Configure each unit: any physical risks or sensitive content involved, and its completion rate. These give the unit its own validation frequency.' +
          '<figure class="shot"><img src="assets/img/gs-course-units-v2.png" alt="Course Units (12), with search, sort, order and units per page, showing 10 of 12 units. Each unit shows its code and title, its recommended validation frequency, such as every 24 or 18 months, Validation not scheduled, Validate Now and Schedule buttons, and settings for unit type, physical risk, sensitive content and completion rate. BSBCRT412 has a completion rate of 80, set for this unit, with a Use course rate link." loading="lazy"><figcaption>Each unit’s settings give it its own recommended validation frequency.</figcaption></figure></li>' +
        '<li>Select <b>Save Changes</b> at the top of the page.' +
          '<figure class="shot" data-marks="82.6,18.4,12.6,8.6,oval,#"><img src="assets/img/gs-prog-save.png" alt="Manage Course Units for BSB50120 Diploma of Business, marked Unsaved Changes. The Save Changes button at the top right is circled. Below, the added units are marked Added in the unit list." loading="lazy"><figcaption>Select Save Changes. Until you do, the page shows Unsaved Changes.</figcaption></figure></li>' +
      '</ol>',
    'gs-workforce':
      '<p>Add your trainer as a <b>silent user</b> first. A silent user has a profile but can’t sign in and isn’t emailed an invitation, so you can set up their courses, units and documents before they ever see RTO Radar. Most RTOs add their trainers this way, then invite them once everything’s ready.</p>' +
      '<ol class="steps-list">' +
        '<li>On your navigation bar, go to <b>Settings</b> › <b>User Management</b> › <b>Staff</b>, then select <b>Add New User</b>.' +
          '<figure class="shot" data-marks="0.5,80.4,8.2,6.2,oval,right,#1; 39.2,43.2,14.6,7.6,oval,above,#2; 35.1,77.3,7.7,5.8,oval,right,#3; 28.6,87.6,13.8,10.8,oval,right,#4"><img src="assets/img/gs-trainer-add.png" alt="Organisation Settings on the User Management tab. Marker 1 circles Settings in the navigation bar, marker 2 the User Management tab, marker 3 the Staff tab, and marker 4 the Add New User button." loading="lazy"><figcaption>Select Settings (1), User Management (2) and Staff (3), then Add New User (4).</figcaption></figure></li>' +
        '<li>Choose a trainer who will deliver a course you’ve added to RTO Radar. You’ll assign that course to them in the next step.</li>' +
        '<li>Enter their name and email, select the <b>Trainer/Assessor</b> role, leave the team as <b>System Default</b>, and turn on <b>Silent user</b>.' +
          '<figure class="shot shot-small" data-marks="78.9,68.2,14.7,4.7,oval,#; 60.1,90.2,36.8,6.3,oval,#"><img src="assets/img/gs-trainer-silent.png" alt="The Create New User form, filled in with a first and last name, an email address, the Trainer/Assessor role and the team left as System Default (no team). The Silent user (no login access) switch is turned on and circled, and a note says the user will be created for compliance tracking only and won’t receive an invitation email or be able to log in. The Create Profile button is circled." loading="lazy"><figcaption>Turn on Silent user, then select Create Profile.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>For more on roles, permissions and teams, see <a href="feature.html?m=users">Users, Roles &amp; Teams</a> in Features.</span></div></li>' +
        '<li>Select <b>Create Profile</b>. Their profile is created without sending an invitation.' +
          '<div class="callout note"><b>Note</b><span>When they’re ready to sign in, you can send them an invitation. See <a href="feature.html?m=getting-started&amp;s=faq">the FAQs</a> for the difference between silent and regular users, and how to convert one to the other.</span></div></li>' +
      '</ol>',
    'gs-dashboard':
      '<p>Your dashboard is a live snapshot of your whole RTO. Risk, improvement items, workforce readiness, documents and upcoming events each have their own widget, and each one brings forward only the items that need your immediate attention. No digging through every module: what’s overdue, due soon or at risk is right in front of you.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Dashboard</b> in the navigation bar.' +
          '<figure class="shot" data-marks="0.3,13.6,7.3,3.9,oval,#"><img src="assets/img/gs-welcome-dashboard.png" alt="The Admin Dashboard, with Dashboard circled in the navigation bar. It shows a Risk Register Overview with missing treatments, responsibility gaps and overdue or missing dates, a Risk Level Breakdown bar chart and a Treatment Status Overview pie chart." loading="lazy"><figcaption>Select Dashboard in the navigation bar.</figcaption></figure></li>' +
        '<li>Look over your widgets. Everything you set up in this series, from your organisational risks to your trainer, now shows up here.' +
          '<figure class="shot"><img src="assets/img/gs-dashboard-widgets.png" alt="Further down the dashboard: Admin’s Continuous Improvement Items, with Overdue, Upcoming and All tabs listing items with their due dates and priority; Workforce, with pending admin actions such as documents pending verification and overdue PD, and a Delivery Readiness chart for each trainer; and a QMS Overview with total, approved, review due and draft documents." loading="lazy"><figcaption>Improvement items, workforce readiness and your QMS documents, each in its own widget.</figcaption></figure></li>' +
        '<li>Make it yours: select the gear icon at the top right. In <b>Customise Dashboard</b>, turn widgets on or off to show only what matters to you, use the arrows to reorder them, then select <b>Save</b>.' +
          '<figure class="shot" data-marks="92.55,13.65,3.45,6,oval,#; 93.3,30.5,arrow-down,small; 88.2,87.85,4.9,6.1,oval,#"><img src="assets/img/gs-dashboard-customise.png" alt="The Admin Dashboard with the Customise Dashboard menu open on top of it. The gear icon at the top right is circled, and an arrow points from it down to the menu, which lists widgets such as Risk Matrix Dashboard, Continuous Improvement, Workforce Statistics, Workforce Table and QMS Overview, each with a tick box and arrows to reorder it. The Save button at the bottom of the menu is circled." loading="lazy"><figcaption>Select the gear icon to open Customise Dashboard, choose your widgets, then select Save.</figcaption></figure></li>' +
        '<li>Use the filter on any widget to narrow down the items it shows.' +
          '<figure class="shot" data-marks="67,21.9,8.5,5.8,oval,#; 3.3,48.7,7.1,4.5,underline,#; 3.3,61.4,7.1,4.5,underline,#"><img src="assets/img/gs-dashboard-filter.png" alt="The Matrix Risks Identified widget, filtered by Category to Financial Risk, which is circled. The two remaining risks, Reliance on State Funding rated High and a cash-flow risk rated Medium, both have their Financial Risk category underlined." loading="lazy"><figcaption>Filtering by Financial Risk shows only the risks in that category.</figcaption></figure></li>' +
      '</ol>' +
      '<p>That’s the foundations in place. As your team adds documents, risks and evidence, your dashboard keeps watch, surfacing whatever needs action next.</p>',
    'gs-training':
      '<p>Give your new trainer the courses and units they’ll deliver, set out the documents trainers need to provide, and see how it all comes together on their profile.</p>' +
      '<h2>Assign Training</h2>' +
      '<ol class="steps-list">' +
        '<li>On your navigation bar, go to <b>Workforce Management</b>.' +
          '<figure class="shot" data-marks="0.1,29.6,12.7,4.4,oval,#"><img src="assets/img/gs-training-nav.png" alt="Workforce Management, with Workforce Management circled in the navigation bar. The page shows the total workforce, RTO staff and admin actions, and the Workforce tab lists three trainers: Ken Lombardo, John Doe and Staff Demo." loading="lazy"><figcaption>Select Workforce Management in the navigation bar.</figcaption></figure></li>' +
        '<li>On the <b>Workforce</b> tab, select the trainer you just added to open their profile.' +
          '<figure class="shot" data-marks="34.8,91.3,arrow-left"><img src="assets/img/gs-training-nav.png" alt="The Workforce tab in Workforce Management, listing three trainers: Ken Lombardo, John Doe and Staff Demo. An arrow points left at Staff Demo." loading="lazy"><figcaption>Select your new trainer, such as Staff Demo here.</figcaption></figure></li>' +
        '<li>Select <b>Assign Training</b> at the top right of the page.' +
          '<figure class="shot" data-marks="81,15.2,14.3,8.1,oval,#"><img src="assets/img/gs-training-assign.png" alt="Workforce Management, now viewing Staff Demo, with Profile, Documents, Units and PD Calendar tabs. The Assign Training button at the top right is circled." loading="lazy"><figcaption>Select Assign Training while viewing the trainer.</figcaption></figure></li>' +
        '<li>Under <b>Course Assignments</b>, search for and tick their courses, scroll down, then select <b>Assign Courses</b>. The button shows how many you’ve chosen.' +
          '<figure class="shot" data-marks="29.5,17.1,11.5,3.7,oval,#1; 55,30.4,4.8,3.2,underline,right,#2; 53.4,56.9,1.9,3.6,oval,#3; 86.3,1.6,1.9,39.2,oval,#; 89.6,64,arrow-down,#4; 52,75.2,33.6,6.5,oval,#5"><img src="assets/img/gs-training-courses.png" alt="Manage Assignments for Staff Demo, on step 1, Course Assignments. Current course assignments are listed on the left. On the right, under Assign New Courses, the search box contains BSB50120 and the Diploma of Business is ticked. Marker 1 circles the Course Assignments tab, marker 2 underlines the course code in the search box, marker 3 circles the tick box before the course, marker 4 circles the scroll bar, with an arrow beside it showing to scroll down, and marker 5 circles the Assign 1 Course(s) button." loading="lazy"><figcaption>On Course Assignments (1), search by course code (2), tick the course (3), scroll down (4), then select Assign Courses (5).</figcaption></figure></li>' +
        '<li>Under <b>Unit Assignments</b>, search for and tick the units they’ll deliver, scroll down, then select <b>Assign Units</b>. The button shows how many you’ve chosen.' +
          '<figure class="shot" data-marks="59,1,9.2,3.6,oval,#1; 50.5,21.2,2.4,2.9,underline,right,#2; 49,47.5,1.7,3,oval,#3; 81.3,9.5,1.9,42.4,oval,#; 85.4,58,arrow-down,#4; 47.6,81.3,33,6.4,oval,#5"><img src="assets/img/gs-training-units.png" alt="Manage Assignments for Staff Demo, on step 2, Unit Assignments. The Current Unit Assignments list on the left is empty. On the right, under Assign New Units, the search box contains BSB and units such as Manage business resources and Articulate, present and debate ideas are ticked, each showing the course it comes from. Marker 1 circles the Unit Assignments tab, marker 2 underlines the search term, marker 3 circles the tick box before the first unit, marker 4 circles the page scroll bar, with an arrow showing to scroll down, and marker 5 circles the Assign 5 Unit(s) button." loading="lazy"><figcaption>On Unit Assignments (1), search by unit code (2), tick the units (3), scroll down (4), then select Assign Units (5).</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can only assign units from courses already assigned to this trainer.</span></div></li>' +
        '<li>From their staff profile, open the <b>Units</b> tab to check the units assigned to them.' +
          '<figure class="shot" data-marks="11.1,26.2,3.75,6.3,oval,#"><img src="assets/img/gs-staff-units.png" alt="The Units tab of a staff profile, with the Units tab circled, headed Units Delivered: 11. Each row shows the unit code and title, its course, team, unit status of Assigned, an evidence map icon, the assigned date, and the completed date, which reads No map provided." loading="lazy"><figcaption>The Units tab lists every unit assigned to the trainer, with its course, status and evidence map.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Create a Document Checklist</h2>' +
      '<ol class="steps-list">' +
        '<li>In <b>Workforce Management</b>, go to the <b>Document Checklist</b> tab.' +
          '<figure class="shot" data-marks="34.6,39.4,15.6,7.6,oval,above,#1; 63.8,73.8,13.4,8.6,oval,#2"><img src="assets/img/gs-checklist-role.png" alt="The Document Checklist tab in Workforce Management, asking you to select a role. Roles shown are Administrator and Trainer/Assessor, with a Display all documents option. Marker 1 circles the Document Checklist tab, and marker 2 circles the Trainer/Assessor role." loading="lazy"><figcaption>Open Document Checklist (1), then choose the Trainer/Assessor role (2).</figcaption></figure></li>' +
        '<li>Select the <b>Trainer/Assessor</b> role.</li>' +
        '<li>Select <b>Add Document Type</b> and add each document trainers need, such as a Working With Children Check or White Card.' +
          '<figure class="shot" data-marks="82.6,65.2,13.6,9.2,oval,#"><img src="assets/img/gs-checklist-add.png" alt="The document checklist for the Trainer/Assessor role. Document Expiry Health shows 10 current documents and 1 expired, and Role coverage shows how many trainers have submitted each required document. The table lists White Card and Working With Children Check with how many have been received. The Add document type button is circled." loading="lazy"><figcaption>Select Add document type to add each document trainers need.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Staff Documents</h2>' +
      '<p>Your trainer is a silent user, so you upload their documents for them.</p>' +
      '<p>Would you rather the trainer upload their own documents? Send them an invitation to RTO Radar. Once they sign in, they can upload documents from their checklist and send them for review, see their assigned courses and units, and use AI to map their evidence against those units.</p>' +
      '<p>To upload a document for them, open their staff profile, then:</p>' +
      '<ol class="steps-list">' +
        '<li>Select the <b>Documents</b> tab.</li>' +
        '<li>Select <b>Upload Document</b>, then add each document on their checklist.' +
          '<figure class="shot" data-marks="6.5,22.2,6.6,7.8,oval,#1; 84,37.6,11.1,9.1,oval,above,#2"><img src="assets/img/gs-staff-docs.png" alt="The Documents tab of the Staff Demo profile, listing 11 documents with their category, document checklist item, status and expiry, such as a Working With Children Check marked Approved. Marker 1 circles the Documents tab, and marker 2 circles the Upload Document button." loading="lazy"><figcaption>Open the Documents tab (1), then select Upload Document (2).</figcaption></figure></li>' +
        '<li>Select the file box and choose the document from your computer.' +
          '<figure class="shot" data-marks="51,72,arrow-down,small"><img src="assets/img/gs-staff-file.png" alt="The Upload Qualifications window, for uploading certificates, diplomas, degrees and other formal qualifications. An arrow points down at the Select File box, which shows a chosen file, Diploma of Community Services.docx." loading="lazy"><figcaption>Select the file box to choose a document.</figcaption></figure></li>' +
        '<li>Choose the document’s <b>Category</b>, then under <b>Requirement checklist (optional)</b>, choose the checklist item it meets, such as <i>Vocational Qualification / Relevant Trade Certificate · Trainer/Assessor</i>. Linking it means the document counts towards the trainer’s document checklist.' +
          '<div class="callout note"><b>Note</b><span>The list only shows required documents of the chosen category for the trainer’s role, such as those in the checklist you created above.</span></div></li>' +
        '<li>Write a detailed <b>Description</b>. This is the most important field in the form.' +
          '<p>When you later create the trainer’s evidence map, RTO Radar’s AI reads each document’s description to write evidence statements for their vocational competency and industry currency. To protect personal information, the AI reads <b>only the description</b>, not the file itself, so the more detail you give, the stronger the evidence it can write.</p>' +
          '<p>Describe how the document supports the trainer’s competency or currency, including:</p>' +
          '<ul>' +
            '<li>the skills or knowledge it demonstrates</li>' +
            '<li>for a qualification, the units it covers, with their codes and titles</li>' +
            '<li>how it connects to the units they deliver</li>' +
            '<li>any systems or processes they manage</li>' +
            '<li>how it reflects current industry practice.</li>' +
          '</ul>' +
          '<div class="demo demo-text"><span class="demo-label">Example description</span>' +
            '<p>Certificate II in Community Services, completed on 18 November 2025.</p>' +
            '<p>Units completed include:<br>CHCCOM005 Communicate and work in health or community services<br>CHCDIV001 Work with diverse people<br>HLTWHS001 Participate in workplace health and safety<br>CHCCCS015 Provide individualised support<br>CHCVOL002 Lead volunteer teams</p>' +
            '<p>Developed communication skills, awareness of diversity, safe work practices and introductory client support skills.</p>' +
          '</div>' +
          '<div class="callout note"><b>Note</b><span>Learn how descriptions become evidence statements in <a href="feature.html?m=workforce">Workforce Management</a>, under evidence maps.</span></div></li>' +
        '<li>Fill in the remaining details, then select <b>Upload Document</b>. If you linked a checklist item, the document’s expiry follows that item.' +
          '<figure class="shot" data-marks="40,43.4,arrow-down,small; 83.5,94,13.1,3.8,oval,#"><img src="assets/img/wf-upload-form.png" alt="The upload form for a qualification: category Qualifications, Requirement checklist set to Vocational Qualification / Relevant Trade Certificate for the Trainer/Assessor role, document name Staff_Demo_Qualification_CHC52015, course code CHC52015, course name Diploma of Community Services, a description beginning Completed on 14 June 2026 and listing the units completed, a completion date of 14/06/2026, and a note that this requirement does not expire. An arrow points down at the Description field, and the Upload Document button is circled." loading="lazy"><figcaption>Fill in the details, then select Upload Document.</figcaption></figure></li>' +
        '<li>Find the document you uploaded on the <b>Documents</b> tab.</li>' +
        '<li>Open the <b>Profile</b> tab to see how it all comes together: their role and team, delivery competency, most recent credentials and evidence map, document checklist and upcoming document expiry.' +
          '<figure class="shot" data-marks="3.4,12.3,4.7,4.2,oval,#"><img src="assets/img/gs-staff-profile.png" alt="The Profile tab of the Staff Demo profile, circled. It shows their role, last login, team and manager; a delivery competency chart of 16 units assigned; their most recently issued credentials, including the Diploma of Community Services and an expired Working With Children Check; their most recent evidence map; their document checklist with 1 of 2 provided; and upcoming staff document expiry." loading="lazy"><figcaption>A trainer’s profile brings together their units, credentials, evidence map, checklist and document expiry.</figcaption></figure></li>' +
      '</ol>'
  };

  // Getting Started steps that share a written guide with their module
  BODIES['gs-connect-axcelerate'] = BODIES['connect-axcelerate'] +
    '<h2 id="import-courses">Import Courses</h2>' +
    '<ol class="steps-list">' +
      '<li>Under <b>aXcelerate Integration</b>, go to <b>Import Courses</b> › <b>Fetch from aXcelerate</b>.' +
        '<figure class="shot" data-marks="44.3,22.3,12.2,12.1,oval,#1; 4.3,69.8,20.3,15.8,oval,right,#2"><img src="assets/img/gs-ax-import-courses.png" alt="The aXcelerate Integration panel on the Import Courses tab. Connection Status shows a green tick and says the integration is configured and ready to use. Marker 1 circles the Import Courses tab, and marker 2 circles the Fetch from aXcelerate button." loading="lazy"><figcaption>Select Import Courses (1), then Fetch from aXcelerate (2).</figcaption></figure></li>' +
      '<li>Filter your programs, or select them one by one by ticking the box before each program code.' +
        '<figure class="shot" data-marks="2.8,6.5,4.2,88,oval,#"><img src="assets/img/gs-ax-select-courses.png" alt="Three courses fetched from aXcelerate, each with a ticked box before its program code: BSB30120 Certificate III in Business, CHC30121 Certificate III in Early Childhood Education and Care, and CHC33021 Certificate III in Individual Support. Each shows how many of its units are selected and is marked New. The ticked boxes are circled." loading="lazy"><figcaption>Tick the box before each course you want to import.</figcaption></figure></li>' +
      '<li>Choose which units to import from each course. Select the arrow before a course’s program code to show its units.' +
        '<figure class="shot" data-marks="10.5,2.8,2.9,4.5,oval,#; 12,15.6,arrow-down,small"><img src="assets/img/gs-ax-select-units.png" alt="CHC30121 Certificate III in Early Childhood Education and Care, expanded to show its units. The arrow before the program code is circled, and an arrow points down from it to the list of 17 units, each with a ticked box, its unit code and title, and an Active status. A Deselect All option sits at the top right." loading="lazy"><figcaption>Expand a course to see its units, then untick any you don’t want to import.</figcaption></figure></li>' +
      '<li>Scroll up to find your <b>Import Summary</b>, then select <b>Import Selected Courses</b>.' +
        '<figure class="shot" data-marks="75.1,86.5,23,10,oval,#"><img src="assets/img/gs-ax-import-summary.png" alt="The Import Summary, listing three courses by code with an editable program title for each and its default title underneath. It shows 3 courses selected and 77 units, and the Import Selected Courses button at the bottom right is circled." loading="lazy"><figcaption>Check or rename the program titles, then select Import Selected Courses.</figcaption></figure></li>' +
      '<li>Find your imported programs in <b>Program Management</b> in your navigation bar.</li>' +
    '</ol>' +
    '<h2 id="import-trainers">Import Trainers</h2>' +
    '<ol class="steps-list">' +
      '<li>Under <b>aXcelerate Integration</b>, go to <b>Import Trainers</b> › <b>Fetch Trainers from aXcelerate</b>.' +
        '<figure class="shot" data-marks="74,23.9,14.5,10.6,oval,#1; 5.1,71.4,29.3,15.7,oval,right,#2"><img src="assets/img/gs-ax-import-trainers.png" alt="The aXcelerate Integration panel on the Import Trainers tab. Connection Status shows a green tick and says the integration is ready to sync trainers. Marker 1 circles the Import Trainers tab, and marker 2 circles the Fetch Trainers from aXcelerate button." loading="lazy"><figcaption>Select Import Trainers (1), then Fetch Trainers from aXcelerate (2).</figcaption></figure></li>' +
      '<li>Filter your trainers, or select them one by one by ticking the box before each contact ID.' +
        '<figure class="shot" data-marks="3.6,7.9,3.9,82,oval,#"><img src="assets/img/gs-ax-select-trainers.png" alt="Three trainers fetched from aXcelerate, each with a ticked box and marked Contact Active. Their contact IDs, names and email addresses are blurred. The ticked boxes are circled." loading="lazy"><figcaption>Tick the box before each trainer you want to import.</figcaption></figure></li>' +
      '<li>Scroll up to find your <b>Import Summary</b>, then select <b>Import &amp; Invite</b>.' +
        '<figure class="shot" data-marks="77.8,39,20,31.6,oval,#"><img src="assets/img/gs-ax-trainer-summary.png" alt="The Import Summary for 3 selected trainers, with Import Silently and Import and Invite buttons. The Import and Invite button is circled. A note says silent import creates profiles without sending sign-in invitations, and that they can be invited later from Staff Management." loading="lazy"><figcaption>Select Import &amp; Invite to send each trainer a sign-in invitation.</figcaption></figure>' +
        '<div class="callout tip"><b>Tip</b><span>Not ready to invite them yet? Choose <b>Import Silently</b> to create their profiles without sending invitations. You can invite them later from User Management. See <a href="feature.html?m=users&find=What%E2%80%99s%20a%20silent%20user#faq">What’s a silent user?</a></span></div></li>' +
      '<li>Find your imported trainers in <b>Workforce Management</b> in your navigation bar.</li>' +
    '</ol>';
  // The Customisation guide is the same as the Getting Started step
  BODIES['connect-axcelerate'] = BODIES['gs-connect-axcelerate'];

  // A module's FAQs (BODIES['faq-<module id>']) sit on its module page, after its guides
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
    ['custom', 'risk', 'Risk scoring weights, bands and categories'],
    ['custom', 'qms', 'Compliance health weighting and document types'],
    ['custom', 'dashboard', 'Which widgets everyone sees'],
    ['custom', 'cir', 'Sources, item templates and reminders'],
    ['custom', 'programs', 'aXcelerate imports, TAS templates and course risk scoring'],
    ['custom', 'users', 'aXcelerate imports staff, and MFA applies to every user'],
    ['custom', 'pd', 'PD calendar, paid PD approval and evidence requirements']
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
    ['How do I import from aXcelerate?', 'connect-axcelerate']
  ];

  window.RH = { ONLY: ['getting-started', 'features', 'configuration'], ROLES: ROLES, MODULES: MODULES, ARTICLES: ARTICLES, ORDER: ORDER, LINKS: LINKS, WORKFLOWS: WORKFLOWS, WF_GROUPS: WF_GROUPS, ROLE_HUBS: ROLE_HUBS, FAQS: FAQS };
})();

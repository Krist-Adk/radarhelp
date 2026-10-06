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
      blurb: 'A 10-step series that takes you from a new account to filling up your dashboard. Work through it in order.',
      // FAQs shown at the end of the page: [question, answer HTML]
      faqs: [
        ['What’s the difference between the person responsible for proposed treatment of risks and the Escalation Manager?',
          '<p>The <b>Escalation Manager</b> is nominated once for your whole RTO, in Update RTO Profile. They track all of your organisational risks and are emailed whenever a risk is rated high.</p>' +
          '<p>The <b>person responsible for the proposed treatment</b> is nominated on each treatment plan. They get an improvement item in the Continuous Improvement Register with the proposed treatment to carry out.</p>'],
        ['How are organisational, course and unit risk scores calculated?',
          '<p>Risk is worked out in three tiers. Each tier builds on the one above it, and each score sets the recommended validation frequency at its level.</p>' +
          '<ul class="formulas">' +
            '<li><b>Organisational risk</b><code>(Basic profile × Comprehensive risks) ÷ 10</code><span>Your basic profile is your RTO profile and basic provider risk factors. Your comprehensive risks come from your comprehensive risk assessment.</span></li>' +
            '<li><b>Course risk</b><code>(Course-specific risks × Organisational risk) ÷ 24</code><span>Course-specific risks come from each course’s risk assessment.</span></li>' +
            '<li><b>Unit risk</b><code>(Course risk × Unit risks) ÷ 10</code><span>Unit risks come from each unit’s settings, such as physical risk, sensitive content and completion rate.</span></li>' +
          '</ul>' +
          '<p>So a change to your organisational risk flows down to every course and unit, and a riskier course or unit is validated more often.</p>'],
        ['When should I use Silent User?',
          '<p>Silent User adds someone to RTO Radar without emailing them an invitation. It’s useful when you want to:</p>' +
          '<ul>' +
            '<li><b>Set up an account before inviting someone</b>: add their documents, courses and units first, so everything’s ready when they first sign in.</li>' +
            '<li><b>Keep compliance records</b> for staff who don’t need to sign in themselves, such as their credentials and document expiry dates.</li>' +
            '<li><b>Test</b> roles, checklists and settings without emailing real people.</li>' +
          '</ul>' +
          '<p>When you’re ready, you can send them the invitation.</p>']
      ],
      updated: '2026-10-05', // shown when the site is opened from disk; on a web server the files' own dates are used

      related: ['qms-frameworks', 'ax-what-imports', 'users-roles', 'mfa-set-organisation', 'prog-course-risk', 'qms-health'] },
    { id: 'dashboard', cat: 'features', name: 'Dashboard',
      blurb: 'The landing page after login. Every widget is a doorway into another module.', cfg: ['cust-dashboard-widgets'] },
    { id: 'qms', cat: 'features', name: 'Document Management (QMS)',
      blurb: 'Manage compliance documents and align them to frameworks and standards. Covers Frameworks, the Document Repository and the Compliance Dashboard.', cfg: ['cust-compliance-health', 'cust-document-types'] },
    { id: 'programs', cat: 'features', name: 'Program Management', ai: true,
      blurb: 'Courses, units, AI-assisted validation and the TAS Builder.', cfg: ['cust-course-risk-weights', 'cust-frequency-bands', 'cust-tas-templates'] },
    { id: 'cir', cat: 'features', name: 'Continuous Improvement Register',
      blurb: 'The central register of improvement items. Most modules feed into it.', cfg: ['cust-cir-settings'] },
    { id: 'workforce', cat: 'features', name: 'Workforce Management', ai: true,
      blurb: 'Staff profiles, documents, unit assignments, evidence maps, the Workforce Dashboard, Teams and Document Checklists.' },
    { id: 'users', cat: 'features', name: 'Users, Roles & Teams',
      blurb: 'Invitations, user roles and team configuration. Used together with Workforce Management.', cfg: ['mfa-set-organisation'] },
    { id: 'risk', cat: 'features', name: 'Risk Assessment',
      blurb: 'Your RTO risk profile, the risk register with Likelihood × Consequence scoring, treatment plans and version history.', cfg: ['cust-risk-categories', 'cust-course-risk-weights'] },
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
    { id: 'troubleshooting', cat: 'troubleshooting', name: 'Troubleshooting',
      blurb: 'Start from what you’re seeing. Each fix points to the guide and setting that resolves it.' }
  ];

  var ALL = ['admin', 'auditor', 'trainer', 'coord'], MGR = ['admin', 'coord'], ADM = ['admin'];

  // [module, id, type, title, roles, minutes]
  var LIST = [
    ['getting-started', 'gs-welcome', 'Overview', 'Welcome to RTO Radar', ADM, 5],
    ['getting-started', 'gs-organisation', 'How-to', 'Set Up Your Organisation', ADM, 10],
    ['getting-started', 'gs-risks', 'How-to', 'Set Up Your Organisational Risks', ADM, 10],
    ['getting-started', 'gs-cir', 'How-to', 'Visit the Continuous Improvement Register', ADM, 5],
    ['getting-started', 'gs-documents', 'How-to', 'Start Adding Your Documents and View Compliance Dashboard', ADM, 10],
    ['getting-started', 'gs-connect-axcelerate', 'How-to', 'Import via aXcelerate (optional)', ADM, 10],
    ['getting-started', 'gs-programs', 'How-to', 'Add Your Programs', ADM, 10],
    ['getting-started', 'gs-workforce', 'How-to', 'Invite a Trainer', ADM, 5],
    ['getting-started', 'gs-training', 'How-to', 'Assign Training', ADM, 10],
    ['getting-started', 'gs-dashboard', 'How-to', 'View Your Dashboard', ADM, 5],

    ['dashboard', 'dash-tour', 'Overview', 'Tour the dashboard', ALL, 4],
    ['dashboard', 'dash-widgets', 'Concept', 'What each widget measures', ALL, 5],
    ['dashboard', 'dash-open-record', 'How-to', 'Open the record behind a widget', ALL, 2],
    ['dashboard', 'dash-reference', 'Reference', 'Dashboard widgets and their source modules', ALL, 3],

    ['qms', 'qms-overview', 'Overview', 'How the QMS is organised', ALL, 4],
    ['qms', 'qms-frameworks', 'Concept', 'Frameworks, areas and standards', ALL, 5],
    ['qms', 'qms-custom-framework', 'How-to', 'Create a custom framework', ADM, 8],
    ['qms', 'upload-and-map-a-document', 'How-to', 'Upload a document and map it to standards', MGR, 5],
    ['qms', 'qms-new-version', 'How-to', 'Upload a new version and read version history', MGR, 4],
    ['qms', 'qms-edit-download-delete', 'How-to', 'Edit, download or delete a document', MGR, 3],
    ['qms', 'qms-compliance-dashboard', 'Concept', 'Read the Compliance Dashboard', ALL, 6],
    ['qms', 'qms-health', 'Concept', 'How Policy Compliance Health is calculated', ALL, 4],

    ['programs', 'prog-overview', 'Overview', 'Programs, courses and units', ALL, 4],
    ['programs', 'prog-add-course', 'How-to', 'Add a course from training.gov.au', MGR, 5],
    ['programs', 'prog-course-risk', 'Concept', 'Course risk factors and recommended validation frequency', MGR, 6],
    ['programs', 'prog-add-units', 'How-to', 'Add TGA units to a course', MGR, 4],
    ['programs', 'prog-validate-unit', 'How-to', 'Validate a unit with AI-assisted evidence', ['admin', 'coord', 'trainer'], 15],
    ['programs', 'prog-validation-phases', 'Concept', 'The four-phase professional validation process', ['admin', 'coord', 'trainer'], 6],
    ['programs', 'prog-assessment-judgement', 'How-to', 'Record an assessment judgement', ['admin', 'coord', 'trainer'], 5],
    ['programs', 'prog-master-tas', 'How-to', 'Build a Master TAS', MGR, 20],
    ['programs', 'prog-cohort-tas', 'How-to', 'Create a Cohort TAS', MGR, 10],

    ['cir', 'cir-overview', 'Overview', 'What the CIR is for', ALL, 3],
    ['cir', 'cir-sources', 'Concept', 'Where improvement items come from', ALL, 4],
    ['cir', 'cir-add-item', 'How-to', 'Add an ad hoc improvement item', ALL, 3],
    ['cir', 'cir-assign-track', 'How-to', 'Assign, prioritise and track an item', MGR, 4],
    ['cir', 'cir-statuses', 'Concept', 'Item statuses: open, in progress, completed, overdue', ALL, 2],
    ['cir', 'cir-export', 'How-to', 'Export CI records for an audit or governance report', ['admin', 'auditor', 'coord'], 3],
    ['cir', 'cir-import', 'How-to', 'Bulk import items from CSV or Excel', ADM, 5],

    ['workforce', 'wf-overview', 'Overview', 'Workforce Management at a glance', ALL, 4],
    ['workforce', 'wf-profile', 'How-to', 'Complete a staff profile', MGR, 5],
    ['workforce', 'wf-documents', 'How-to', 'Upload and verify staff documents', ALL, 5],
    ['workforce', 'wf-assign-units', 'How-to', 'Assign courses and units to a trainer', MGR, 4],
    ['workforce', 'wf-evidence-map', 'How-to', 'Generate an evidence map for competency and currency', MGR, 10],
    ['workforce', 'wf-delivery-readiness', 'Concept', 'Delivery readiness explained', ALL, 4],
    ['workforce', 'wf-admin-actions', 'How-to', 'Work through admin actions', MGR, 4],
    ['workforce', 'wf-checklist', 'How-to', 'Set up a document checklist for a role', MGR, 6],
    ['workforce', 'wf-teams', 'Concept', 'Teams, the org chart and team analytics', ALL, 5],

    ['users', 'users-invite', 'How-to', 'Invite a new user', ADM, 3],
    ['users', 'users-roles', 'Concept', 'Built-in roles and their permissions', ALL, 4],
    ['users', 'users-custom-role', 'How-to', 'Create a custom role', ADM, 5],
    ['users', 'users-teams', 'How-to', 'Create teams and set parent teams', ADM, 5],

    ['risk', 'risk-overview', 'Overview', 'Your RTO risk profile', ALL, 4],
    ['risk', 'risk-rto-profile', 'How-to', 'Complete your RTO profile', ADM, 10],
    ['risk', 'risk-provider-factors', 'Concept', 'Basic provider risk factors', ALL, 4],
    ['risk', 'risk-add-score', 'How-to', 'Add a risk and score it (Likelihood × Consequence)', MGR, 6],
    ['risk', 'risk-treatment', 'How-to', 'Write a treatment plan', MGR, 5],
    ['risk', 'risk-heatmap', 'Concept', 'Read the risk heatmap', ALL, 3],
    ['risk', 'risk-versions', 'How-to', 'Compare and export risk register versions', ['admin', 'auditor', 'coord'], 4],

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

    ['troubleshooting', 'ts-health-wrong', 'Troubleshooting', 'My compliance health score looks wrong', ALL, 3],
    ['troubleshooting', 'ts-axcelerate-incomplete', 'Troubleshooting', 'aXcelerate import didn’t bring everything in', ADM, 3],
    ['troubleshooting', 'ts-not-ready', 'Troubleshooting', 'A trainer shows as not delivery-ready', ALL, 3],
    ['troubleshooting', 'ts-cant-see-module', 'Troubleshooting', 'Someone can’t see a module', ADM, 2],
    ['troubleshooting', 'ts-mfa-locked', 'Troubleshooting', 'A user is locked out by MFA', ADM, 2],
    ['troubleshooting', 'ts-frequency-changed', 'Troubleshooting', 'A course’s validation frequency changed', MGR, 3],
    ['troubleshooting', 'ts-no-reminders', 'Troubleshooting', 'I’m not getting due-date reminders', ALL, 2],
    ['troubleshooting', 'ts-widgets-missing', 'Troubleshooting', 'Dashboard widgets are missing', ALL, 2]
  ];

  // Troubleshooting: which guides fix each symptom
  var FIXES = {
    'ts-health-wrong': ['qms-health', 'cust-compliance-health', 'upload-and-map-a-document'],
    'ts-axcelerate-incomplete': ['ax-what-imports', 'ax-tokens', 'connect-axcelerate'],
    'ts-not-ready': ['wf-delivery-readiness', 'wf-checklist', 'wf-evidence-map'],
    'ts-cant-see-module': ['users-roles', 'users-custom-role'],
    'ts-mfa-locked': ['mfa-levels', 'mfa-user-status'],
    'ts-frequency-changed': ['prog-course-risk', 'cust-frequency-bands', 'risk-provider-factors'],
    'ts-no-reminders': ['cust-cir-settings'],
    'ts-widgets-missing': ['cust-dashboard-widgets']
  };

  // Written guides. Everything else shows as "being written" but keeps all its links.
  var BODIES = {
    'gs-welcome':
      '<p class="lead">RTO Radar is compliance software built for Australian Registered Training Organisations. It brings the work that keeps your RTO compliant with the Standards for RTOs 2025 into one connected platform: risk, validation, policies and procedures, trainer competency, professional development, feedback and continuous improvement.</p>' +

      '<h2>How it fits together</h2>' +
      '<p>RTO Radar runs on a quality cycle. Each part feeds the next:</p>' +
      '<ol class="rr-cycle">' +
        '<li><b>Risk sets the pace</b><span>Your RTO profile produces an organisational risk score, which sets a baseline validation frequency for every course. Each course’s own risk factors can shorten it further.</span></li>' +
        '<li><b>Validation checks quality</b><span>Units are validated through a four-phase process, with AI reading your assessment tools and evidence to point out gaps.</span></li>' +
        '<li><b>Findings become actions</b><span>Validation findings, feedback, complaints, risk treatments and audit outcomes land in one improvement register, each with an owner and a due date.</span></li>' +
        '<li><b>Your people stay ready</b><span>Trainer profiles, evidence maps and professional development close the gaps that findings and expiring documents reveal.</span></li>' +
        '<li><b>Improvements feed back</b><span>Completed actions update your risks, documents and PD plans, and the cycle starts again.</span></li>' +
      '</ol>' +
      '<p>Along the way, every document, version, decision and action is recorded, so you can export audit-ready evidence whenever you need it.</p>' +

      '<h2>Who uses RTO Radar</h2>' +
      '<p>Everyone in your RTO signs in to the same platform, and what they see depends on their role:</p>' +
      '<ul>' +
        '<li><a href="roles.html?r=admin"><b>Admins</b></a> set up the organisation, manage users and own the settings. Compliance managers usually hold this role.</li>' +
        '<li><a href="roles.html?r=coord"><b>Training Coordinators</b></a> manage courses, trainer assignments and delivery.</li>' +
        '<li><a href="roles.html?r=trainer"><b>Trainers and Assessors</b></a> keep their own documents current, take part in validation and enrol in PD.</li>' +
        '<li><a href="roles.html?r=auditor"><b>Quality Auditors</b></a> get read-only access for internal reviews and external audits.</li>' +
      '</ul>' +
      '<p>Admins can also create custom roles with their own permissions.</p>' +

      '<h2>Where AI helps</h2>' +
      '<p>RTO Radar uses AI to take on the slowest parts of compliance work:</p>' +
      '<ul>' +
        '<li><b>Unit validation</b>: reads your assessment tools, mapping documents and student evidence against the unit of competency and points out gaps.</li>' +
        '<li><b>Assessment judgement</b>: summarises findings and turns them into improvement items.</li>' +
        '<li><b>Evidence maps</b>: drafts each trainer’s vocational competency and industry currency from their qualifications, work history and uploaded evidence.</li>' +
      '</ul>' +
      '<div class="callout tip"><b>Tip</b><span>Treat AI output as a strong first draft. Review it before you rely on it as evidence.</span></div>',
    'upload-and-map-a-document':
      '<p>Mapping a document tells RTO Radar which standards it evidences. Mapped documents count towards your coverage on the Compliance Dashboard, and AI-assisted unit validation can read them as evidence.</p>' +
      '<h2 id="steps">Upload and map a document</h2>' +
      '<ol class="steps-list"><li>In RTO Radar, open <b>Document Management</b> and select <b>Document Repository</b>.</li><li>Select <b>Upload Document</b> and choose the file.</li><li>Add a title, document type and owner.</li><li>Under <b>Map to standards</b>, choose a framework, for example <i>Standards for RTOs 2025</i>, then tick each standard this document evidences.</li><li>Select <b>Save as draft</b>, or <b>Send for review</b> to start the approval process.</li></ol>' +
      '<div class="callout tip"><b>Tip</b><span>One document can evidence several standards. Map it to all of them rather than uploading copies, so a new version updates every standard at once.</span></div>' +
      '<div class="callout note"><b>Note</b><span>Need a document type that isn’t listed? Add it in Customisation › QMS › Document Types.</span></div>',
    'wf-assign-units':
      '<p>Assigning units links a trainer to what they will deliver and assess. The evidence map, delivery readiness and the Workforce Dashboard all build on these assignments.</p>' +
      '<h2 id="steps">Assign courses and units</h2>' +
      '<ol class="steps-list"><li>Open <b>Workforce</b>, select the trainer, then the <b>Units</b> tab.</li><li>Select <b>Assign courses</b> and choose the course they will deliver.</li><li>Tick the units they are responsible for, then <b>Save</b>.</li></ol>' +
      '<div class="callout tip"><b>Tip</b><span>Assign units before you generate the evidence map. The map is built from the units assigned here.</span></div>',
    'cir-sources':
      '<p>Improvement items can come from anywhere in RTO Radar. Each item keeps its source, so you can filter the register by where items came from and spot trends.</p>' +
      '<h2 id="sources">Sources</h2>' +
      '<ul><li><b>Feedback forms</b>: complaints, suggestions and conflict of interest submissions.</li><li><b>Risk register treatments</b>: treatment plans from the risk assessment.</li><li><b>Industry consultation</b>.</li><li><b>Audit findings</b>.</li><li><b>Unit validation outcomes</b>: findings from the four-phase validation.</li><li><b>Ad hoc entries</b>: anything added directly to the register.</li></ul>' +
      '<div class="callout note"><b>Note</b><span>Admins can add source categories in Customisation › CIR › Sources. System sources can’t be deleted.</span></div>',
    'qms-health':
      '<p>Policy Compliance Health is a percentage that combines three measures. Your organisation decides how much each one counts.</p>' +
      '<ul><li><b>Standards coverage</b>: how many standards have at least one mapped document.</li><li><b>Review timeliness</b>: how many documents are reviewed by their due date.</li><li><b>Document freshness</b>: how recently documents were updated.</li></ul>' +
      '<p>The three weights must add up to 100%.</p>' +
      '<div class="callout note"><b>Note</b><span>Admins set the weights in Customisation › QMS › Compliance Health Weighting.</span></div>',
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
        '<li>In RTO Radar, open <b>Settings</b> › <b>Integrations</b>.</li>' +
        '<li>Enter your API endpoint, paste both tokens, and connect.</li>' +
      '</ol>' +
      '<div class="callout warn"><b>Permission</b><span>Only Admins can connect integrations. Treat both tokens like passwords.</span></div>',
    'gs-organisation':
      '<h2 class="ghost">Update RTO Profile</h2>' +
      '<p>Your RTO profile is the baseline for your risk score, so start here: confirm your details, choose your risk factors and add your logo.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Update RTO Profile</b>.</li>' +
        '<li>Check your RTO name and code, and enter your RTO’s <b>Approximate Annual Enrolments</b>.</li>' +
        '<li>Choose your RTO’s <b>Basic Provider Risk Factors</b>. Together with your enrolments, these feed into your organisational risk score.' +
          '<div class="callout tip"><b>Tip</b><span>Not sure which risk factors apply? Choose what you know now. You can change them later from Update RTO Profile.</span></div></li>' +
        '<li>Nominate an <b>Escalation Manager</b>.' +
          '<div class="callout note"><b>Note</b><span>This person is notified whenever an organisational risk is rated high.</span></div></li>' +
        '<li>Select <b>Save &amp; Exit</b>.</li>' +
      '</ol>' +
      '<h2>Risk Register Overview</h2>' +
      '<p>Your risk score, validation frequency, risks identified, Escalation Manager and basic risk factors.</p>' +
      '<figure class="shot"><img src="assets/img/gs-risk-overview.png" alt="The Risk Assessment overview for an RTO, showing a risk score of 6.0 out of 10, a validation frequency of 6 months, 27 risks identified, the Escalation Manager, an Actions panel and five active basic provider risk factors." loading="lazy"><figcaption>The Risk Register overview after saving your RTO profile.</figcaption></figure>' +
      '<h2>Branding</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>Customisation</b> › <b>Branding</b>.</li>' +
        '<li>Import your organisation’s logo.</li>' +
      '</ol>',
    'gs-risks':
      '<p>Your organisational risk score combines your basic profile from the previous step with your comprehensive risk factors. It sets the baseline validation frequency for all your courses, and a course’s own risk factors can shorten it further.</p>' +
      '<h2 class="ghost">Begin Comprehensive Assessment</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Begin Comprehensive Assessment</b>.</li>' +
        '<li>Scroll down to <b>Risk Assessment by Category</b>.' +
          '<div class="callout tip"><b>Tip</b><span>To set up risk categories that fit your RTO, go to Settings › Customisation › Risk › Risk Register and scroll down to Configure Risk Categories.</span></div></li>' +
        '<li>Choose the category where you want to enter your first risk.</li>' +
        '<li>Select <b>Add Additional Risk</b>.</li>' +
        '<li>Enter the risk title, description, likelihood and consequence.</li>' +
        '<li>Select <b>Add Risk Factor</b>.</li>' +
      '</ol>' +
      '<h2>Add Treatment Plan</h2>' +
      '<p>For risks rated medium or higher, we recommend adding existing controls and a treatment plan.</p>' +
      '<ol class="steps-list" start="7" style="counter-reset: s 6">' +
        '<li>Select <b>Add Treatment Plan</b>.</li>' +
        '<li>Enter a title, description and proposed treatment, nominate the person responsible, and set a due date and status.' +
          '<div class="callout note"><b>Note</b><span>The responsible person gets an improvement item in the CIR with the proposed treatment.</span></div></li>' +
      '</ol>' +
      '<h2>Risk Heatmap</h2>' +
      '<ol class="steps-list" start="9" style="counter-reset: s 8">' +
        '<li>Check the <b>Risk Heatmap</b> at the top of the page.' +
          '<figure class="shot"><img src="assets/img/gs-risk-heatmap.png" alt="The Risk Heatmap: a five by five grid of likelihood, from Rare to Almost Certain, against consequence, from Insignificant to Catastrophic. Cells are coloured Low, Medium, High or Extreme and show how many risks fall in each. Below it are totals of 22 comprehensive risks, 20 rated medium, high or extreme, and 1 missing treatment plan, with an Export Register button and a Governance and Policy Compliance checklist." loading="lazy"><figcaption>The Risk Heatmap, with your risk totals and governance checklist underneath.</figcaption></figure></li>' +
        '<li>Select <b>Complete Risk Assessment</b>.' +
          '<div class="callout note"><b>Note</b><span>You don’t have to add all your organisational risks now. You can come back any time from Risk Assessment › Actions › Edit Comprehensive Assessment.</span></div></li>' +
        '<li>Check that your <b>Escalation Manager</b> has received an email about the high risks you’ve added.' +
          '<div class="callout tip"><b>Tip</b><span>No email? Check their junk folder, and that the right person is nominated in Update RTO Profile.</span></div></li>' +
      '</ol>',
    'gs-cir':
      '<p>The Continuous Improvement Register (CIR) is one list of every improvement action in your RTO. Risk treatments, feedback, validation findings and audit outcomes all land here, each with a person responsible, a due date and a priority, so nothing slips through and you have a record of continuous improvement ready for audit.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Continuous Improvement</b>.</li>' +
        '<li>Find the item created from your treatment plan. Its source is <b>Risk Register</b>, and it shows the person responsible, due date and priority.' +
          '<figure class="shot"><img src="assets/img/gs-cir-list.png" alt="The Continuous Improvement item list, showing two items with Risk Register as their source. Each row shows the item number, who created it, status, person responsible, assigned date, description, tags, due date and priority." loading="lazy"><figcaption>Items created from treatment plans show Risk Register as their source.</figcaption></figure></li>' +
        '<li>Select the eye icon in the <b>Actions</b> column to open the item.' +
          '<figure class="shot"><img src="assets/img/gs-cir-item.png" alt="An improvement item opened in full. It shows the title, source, person responsible, dates, tags and the original risk score, notes carried over from the risk (category, description, level, existing controls, likelihood and consequence), and the proposed treatment. Buttons along the bottom are Delete Item, Complete Item, Verify, More info and Edit Item." loading="lazy"><figcaption>The item carries over the risk’s details and proposed treatment.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The person responsible gets this exact item too.</span></div></li>' +
      '</ol>',
    'gs-documents':
      '<p>RTO Radar is also your quality management system (QMS). Your policies, procedures and other compliance documents live in one repository, each with an owner, a reviewer and review reminders, and each mapped to the standards it evidences. The Compliance Dashboard then shows how well your documents cover your frameworks.</p>' +
      '<h2>Upload Document</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Document Management</b> › <b>Upload Document</b>.</li>' +
        '<li>Choose <b>File Upload</b> or <b>Link</b>.</li>' +
        '<li>Fill in the document details.</li>' +
        '<li>Nominate a document reviewer and set up email reminders for reviews.</li>' +
        '<li>Map the document to the compliance frameworks set for your RTO.</li>' +
        '<li>Set the compliance status, and add any notes about the document.</li>' +
        '<li>Select <b>Upload Document</b>.</li>' +
        '<li>Find your document in the <b>Document Repository</b>.' +
          '<figure class="shot"><img src="assets/img/gs-doc-repository.png" alt="The Document Repository, listing three documents with their document number, title and category, type, compliance status, review date, reviewer and the SRTO 2025 standards each is mapped to, such as 2.1 and 4.1." loading="lazy"><figcaption>Each document shows its compliance status, next review date, reviewer and the standards it’s mapped to.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Compliance Dashboard</h2>' +
      '<p>The Compliance Dashboard shows how well your documents cover each framework, using the standards you mapped them to. As you upload and map more documents, it fills in. At a glance you can see:</p>' +
      '<ul>' +
        '<li><b>Standards coverage</b>: how many standards have at least one mapped document, and which are still missing one.</li>' +
        '<li><b>Policy Compliance Health</b>: a score out of 100 that combines standards coverage, review timeliness and document freshness.</li>' +
        '<li><b>Upcoming reviews</b>: documents that are overdue, or due for review in the next 30 or 90 days.</li>' +
        '<li><b>Quality area coverage</b>: how well each quality area of the framework is documented.</li>' +
      '</ul>' +
      '<figure class="shot"><img src="assets/img/gs-compliance-dashboard.png" alt="The Compliance Dashboard for the Standards for RTOs 2025. It shows 23 total standards, 9 covered and 14 missing; a standards coverage chart at 39 percent; a Policy Compliance Health score of 52, rated Fair; an upcoming reviews timeline with 1 overdue, 1 due in 30 days and 1 due in 90 days; a list of missing standards; and a quality area coverage bar chart." loading="lazy"><figcaption>The Compliance Dashboard for the Standards for RTOs 2025.</figcaption></figure>',
    'gs-programs':
      '<p>Program Management is where your courses and units live. It’s connected to training.gov.au, so you can search for nationally recognised courses and units and add them in a few clicks, and each course gets a risk assessment that recommends how often it’s validated.</p>' +
      '<h2>Add a Course</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Program Management</b> › <b>Add Course</b>.</li>' +
        '<li>Choose <b>TGA Accredited Courses</b>, or enter a custom program.' +
          '<div class="callout note"><b>Note</b><span>Custom programs aren’t TGA-accredited qualifications. You’ll need to add their units or modules yourself and make sure they meet the relevant industry standards.</span></div></li>' +
        '<li>Under TGA Accredited Courses, search by course code, title or keyword, then select <b>Search TGA</b>.</li>' +
        '<li>Find your course in the search results and select <b>Add Course</b>.</li>' +
        '<li>Complete the <b>Course Risk Assessment</b> by choosing the course-specific risk factors and any additional risk factors.</li>' +
        '<li>Review the course risk assessment result and the recommended validation frequency.' +
          '<div class="callout note"><b>Note</b><span>You can change validation frequencies in Settings.</span></div></li>' +
        '<li>Find your course in <b>Program Management</b>.' +
          '<figure class="shot"><img src="assets/img/gs-courses-list.png" alt="The Courses list in Program Management, showing three courses with their program code, title, team, number of units, a Manage button for units, risk status from Low to High, and when each was created." loading="lazy"><figcaption>Each course shows its team, number of units and risk status.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Manage Course Units</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Courses</b> › <b>Manage Units</b> › <b>Add Unit</b>.</li>' +
        '<li>Search TGA units, or create a custom unit.</li>' +
        '<li>Filter and select from core or elective units, or from unit groups.</li>' +
        '<li>When you’re happy with your units, select <b>Add Selected</b>. The button shows how many units you’ve chosen.</li>' +
        '<li>Scroll down to find your units under <b>Course Units</b>.</li>' +
        '<li>Configure each unit: any physical risks or sensitive content involved, and its completion rate. These give the unit its own validation frequency.' +
          '<figure class="shot"><img src="assets/img/gs-course-units.png" alt="The Course Units list for a course with 10 units. Each unit shows its code and title, its recommended validation frequency, such as every 36 or 24 months, whether a validation is scheduled, Validate Now and Schedule buttons, and settings for unit type, physical risk, sensitive content and completion rate." loading="lazy"><figcaption>Each unit’s settings give it its own recommended validation frequency.</figcaption></figure></li>' +
        '<li>Select <b>Save Changes</b> at the top of the page.</li>' +
      '</ol>',
    'gs-workforce':
      '<p>Each staff member gets their own RTO Radar account, and their role decides what they can see and do. Start with a trainer to see how it works.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>User Management</b> › <b>Staff</b> › <b>Add New User</b>.</li>' +
        '<li>Choose a trainer who will deliver the course you added in the previous step. You’ll assign that course to them below.</li>' +
        '<li>Enter their name and email, select the <b>Trainer/Assessor</b> role, leave the team as <b>System Default</b>, and leave <b>Silent User</b> off.' +
          '<div class="callout note"><b>Note</b><span>Silent User stops RTO Radar from emailing an invitation straight away.</span></div>' +
          '<div class="callout tip"><b>Tip</b><span>For more on roles, permissions and teams, see <a href="feature.html?m=users">Users, Roles &amp; Teams</a> in Features.</span></div></li>' +
        '<li>Select <b>Send Invitation</b>. They’ll get an email to set up their account.</li>' +
      '</ol>',
    'gs-dashboard':
      '<p>Your dashboard is a live snapshot of your whole RTO. Risk, improvement items, workforce readiness, documents and upcoming events each have their own widget, and each one brings forward only the items that need your immediate attention. No digging through every module: what’s overdue, due soon or at risk is right in front of you.</p>' +
      '<ol class="steps-list">' +
        '<li>Select <b>Dashboard</b> in the navigation bar.</li>' +
        '<li>Look over your widgets. Everything you set up in this series, from your organisational risks to your trainer, now shows up here.</li>' +
        '<li>Make it yours: select the gear icon at the top right, then turn widgets on or off to show only what matters to you.</li>' +
        '<li>Use the filter on any widget to narrow down the items it shows.</li>' +
      '</ol>' +
      '<p>That’s the foundations in place. As your team adds documents, risks and evidence, your dashboard keeps watch, surfacing whatever needs action next.</p>',
    'gs-training':
      '<p>Give your new trainer the courses and units they’ll deliver, set out the documents trainers need to provide, and see how it all comes together on their profile.</p>' +
      '<h2 class="ghost">Assign Courses and Units</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Workforce Management</b>.</li>' +
        '<li>On the <b>Workforce</b> tab, select the trainer you just added to open their profile.</li>' +
        '<li>Select <b>Assign Training</b> at the top right of the page.</li>' +
        '<li>Under <b>Course Assignment</b>, select their courses, then select <b>Assign Courses</b>. The button shows how many you’ve chosen.</li>' +
        '<li>Under <b>Unit Assignments</b>, select the units they’ll deliver from each course, then select <b>Assign Units</b>.</li>' +
        '<li>Open the <b>Units</b> tab on their profile to check the units assigned to them.' +
          '<figure class="shot"><img src="assets/img/gs-staff-units.png" alt="The Units tab of a staff profile, headed Units Delivered: 11. Each row shows the unit code and title, its course, team, unit status of Assigned, an evidence map icon, the assigned date, and the completed date, which reads No map provided." loading="lazy"><figcaption>The Units tab lists every unit assigned to the trainer, with its course, status and evidence map.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Create a Document Checklist</h2>' +
      '<ol class="steps-list">' +
        '<li>In <b>Workforce Management</b>, go to the <b>Document Checklist</b> tab.</li>' +
        '<li>Select the <b>Trainer/Assessor</b> role.</li>' +
        '<li>Select <b>Add Document Type</b> and add each document trainers need, such as a Working With Children Check or White Card.</li>' +
      '</ol>' +
      '<h2>Staff Documents</h2>' +
      '<p>Once the trainer accepts the invitation and signs in, they can upload the documents on their checklist and send them for review, see the courses and units assigned to them, and use AI to map their evidence against those units.</p>' +
      '<p>You can also upload documents for them from their profile: <b>Documents</b> › <b>Upload Document</b>.</p>' +
      '<figure class="shot"><img src="assets/img/gs-staff-profile.png" alt="A trainer’s staff profile. It shows their role, last login, team and manager; a delivery competency chart with 6 units assigned, 3 approved, 2 draft and 1 pending; their most recently issued credentials, including an expired Working With Children Check; their most recent evidence map; their document checklist with 1 of 2 documents provided; and upcoming staff document expiry." loading="lazy"><figcaption>A trainer’s profile brings together their units, credentials, evidence map, checklist and document expiry.</figcaption></figure>'
  };

  // Getting Started steps that share a written guide with their module
  BODIES['gs-connect-axcelerate'] = BODIES['connect-axcelerate'] +
    '<h2>Import Courses</h2>' +
    '<ol class="steps-list">' +
      '<li>Under <b>aXcelerate Integration</b>, go to <b>Import Courses</b> › <b>Fetch from aXcelerate</b>.</li>' +
      '<li>Filter your programs, or select them one by one by ticking the box before each program code.</li>' +
      '<li>Choose which units to import from each course.</li>' +
      '<li>In the <b>Import Summary</b>, select <b>Import Selected Courses</b>.</li>' +
      '<li>Find your imported programs in <b>Program Management</b>.</li>' +
    '</ol>' +
    '<h2>Import Trainers</h2>' +
    '<ol class="steps-list">' +
      '<li>Go to <b>Import Trainers</b>.</li>' +
      '<li>Filter your trainers, or select them one by one by ticking the box before each contact ID.</li>' +
      '<li>In the <b>Import Summary</b>, select <b>Import &amp; Invite</b>.</li>' +
      '<li>Find your imported trainers in <b>Workforce Management</b>.</li>' +
    '</ol>';

  var ARTICLES = {}, ORDER = [];
  LIST.forEach(function (r) {
    ARTICLES[r[1]] = { id: r[1], module: r[0], type: r[2], t: r[3], roles: r[4], mins: r[5], body: BODIES[r[1]] || null, fixes: FIXES[r[1]] || null };
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
  var WORKFLOWS = [
    { id: 'prepare-for-an-audit', group: 'Compliance & Quality', t: 'Prepare for an audit', time: '2–4 hrs', role: 'admin',
      req: ['Your frameworks are set up', 'Core policies are uploaded', 'The risk register has been saved at least once'],
      steps: [['qms-compliance-dashboard', 'Check coverage and missing standards on the Compliance Dashboard'], ['upload-and-map-a-document', 'Upload or update documents for missing standards'], ['risk-versions', 'Review the risk register and its version history'], ['cir-export', 'Export improvement records as evidence'], ['wf-delivery-readiness', 'Confirm trainer delivery readiness'], ['users-roles', 'Give your auditor the Quality Auditor role']] },
    { id: 'manage-organisational-risk', group: 'Compliance & Quality', t: 'Manage organisational risk', time: '1–2 hrs', role: 'admin',
      req: ['You have the Admin role'],
      steps: [['risk-rto-profile', 'Complete your RTO profile'], ['risk-add-score', 'Add and score risks by category'], ['risk-treatment', 'Write treatment plans with a responsible person'], ['cir-assign-track', 'Track treatments as improvement items'], ['dash-widgets', 'Monitor risk and treatment status on the dashboard']] },
    { id: 'manage-organisational-compliance', group: 'Compliance & Quality', t: 'Manage organisational compliance', time: '1 hr', role: 'admin',
      req: ['You have the Admin role'],
      steps: [['qms-frameworks', 'Choose or build your frameworks'], ['upload-and-map-a-document', 'Map documents to standards'], ['cust-compliance-health', 'Set compliance health weighting'], ['qms-health', 'Watch policy compliance health']] },
    { id: 'manage-the-document-lifecycle', group: 'Compliance & Quality', t: 'Manage the document lifecycle', time: '30 min', role: 'coord',
      req: ['Your document types are set up'],
      steps: [['cust-document-types', 'Add your document types'], ['upload-and-map-a-document', 'Upload and map a draft'], ['qms-overview', 'Move it through review to approved'], ['qms-new-version', 'Upload a new version when it changes'], ['dash-open-record', 'Act on review-due alerts']] },
    { id: 'add-a-qualification', group: 'Training & Assessment', t: 'Add a qualification and set its validation frequency', time: '20 min', role: 'coord',
      req: ['Your RTO profile is complete'],
      steps: [['prog-add-course', 'Add the course from training.gov.au'], ['prog-course-risk', 'Add course-specific risk factors'], ['risk-provider-factors', 'Check the organisational risk that sets the baseline frequency'], ['prog-course-risk', 'Read the recommended validation frequency'], ['ev-validation', 'Schedule the first validation']] },
    { id: 'validate-a-unit', group: 'Training & Assessment', t: 'Validate a unit', time: '1–3 hrs', role: 'trainer',
      req: ['The unit is added to a course', 'Supporting documents are uploaded'],
      steps: [['ev-validation', 'Schedule the validation'], ['upload-and-map-a-document', 'Make sure supporting documents are uploaded'], ['prog-validate-unit', 'Upload validation documents'], ['prog-validation-phases', 'Work through the four phases'], ['cir-add-item', 'Add improvement items from the findings']] },
    { id: 'build-a-tas', group: 'Training & Assessment', t: 'Build a Training and Assessment Strategy', time: '2–3 hrs', role: 'coord',
      req: ['The qualification and its units are added'],
      steps: [['cust-tas-templates', 'Check your TAS template'], ['prog-master-tas', 'Build the Master TAS section by section'], ['wf-assign-units', 'Confirm trainers for each unit'], ['prog-cohort-tas', 'Create a Cohort TAS for each intake']] },
    { id: 'onboard-a-staff-member', group: 'Workforce', t: 'Onboard a new staff member', time: '20 min', role: 'admin',
      req: ['You have the Admin role', 'Teams are set up'],
      steps: [['users-invite', 'Invite them and assign a role'], ['users-teams', 'Add them to a team'], ['wf-profile', 'Complete their profile'], ['wf-documents', 'Collect documents from the role checklist'], ['mfa-user-status', 'Make sure MFA is set up']] },
    { id: 'prepare-a-trainer-for-delivery', group: 'Workforce', t: 'Prepare a trainer for delivery', time: '45 min', role: 'coord',
      req: ['The trainer has an RTO Radar user account', 'A document checklist is set up for their role', 'The course and its units are added'],
      steps: [['wf-profile', 'Complete the workforce profile'], ['wf-documents', 'Upload and verify staff documents'], ['wf-assign-units', 'Assign courses and units'], ['wf-evidence-map', 'Generate the evidence map'], ['pd-assign', 'Assign PD to close currency gaps'], ['wf-delivery-readiness', 'Confirm delivery readiness']] },
    { id: 'keep-credentials-current', group: 'Workforce', t: 'Keep staff credentials current', time: '15 min a month', role: 'coord',
      req: ['Document checklists are set up'],
      steps: [['wf-checklist', 'Set review frequency on document types'], ['wf-delivery-readiness', 'Check document expiry health'], ['wf-admin-actions', 'Verify renewals in admin actions']] },
    { id: 'collect-feedback', group: 'Feedback & Improvement', t: 'Collect feedback from your website', time: '15 min', role: 'admin',
      req: ['You can edit your RTO’s website'],
      steps: [['fb-create-form', 'Create the form'], ['fb-embed', 'Embed it on your website'], ['fb-overview', 'Review incoming submissions']] },
    { id: 'complaint-to-improvement', group: 'Feedback & Improvement', t: 'Turn a complaint into an improvement', time: '10 min', role: 'coord',
      req: ['A feedback form is live'],
      steps: [['fb-to-cir', 'Open the submission and create an improvement item'], ['cir-assign-track', 'Assign, prioritise and set a due date'], ['cir-statuses', 'Close it out with evidence']] },
    { id: 'report-on-improvement', group: 'Feedback & Improvement', t: 'Report on improvement for governance', time: '30 min', role: 'admin',
      req: ['Items are in the register'],
      steps: [['cir-sources', 'Filter items by source and status'], ['wf-teams', 'Check team analytics'], ['cir-export', 'Export records']] }
  ];

  // Workflow group cards on the Workflows page
  var WF_GROUPS = {
    'Compliance & Quality': { icon: 'shield', desc: 'Prepare for audits, manage organisational risk and keep your documents mapped to the standards.' },
    'Training & Assessment': { icon: 'cap', desc: 'Add qualifications, validate units and build your Training and Assessment Strategy.' },
    'Workforce': { icon: 'users', desc: 'Onboard staff, prepare trainers for delivery and keep credentials current.' },
    'Feedback & Improvement': { icon: 'chat', desc: 'Collect feedback, turn complaints into improvements and report to governance.' }
  };

  var ROLE_HUBS = {
    admin:   { workflows: ['onboard-a-staff-member', 'manage-organisational-risk', 'manage-organisational-compliance', 'prepare-for-an-audit'], start: ['gs-organisation','users-invite', 'mfa-set-organisation', 'cust-dashboard-widgets'] },
    auditor: { workflows: ['prepare-for-an-audit', 'manage-organisational-compliance', 'report-on-improvement'], start: ['qms-compliance-dashboard', 'risk-versions', 'cir-export', 'wf-delivery-readiness'] },
    trainer: { workflows: ['validate-a-unit', 'keep-credentials-current'], start: ['wf-documents', 'wf-delivery-readiness', 'pd-enrol', 'prog-assessment-judgement'] },
    coord:   { workflows: ['prepare-a-trainer-for-delivery', 'add-a-qualification', 'build-a-tas', 'keep-credentials-current'], start: ['wf-assign-units', 'wf-evidence-map', 'wf-admin-actions', 'prog-master-tas'] }
  };

  var FAQS = [
    ['How is my Policy Compliance Health score calculated?', 'qms-health'],
    ['Why did a course’s recommended validation frequency change?', 'ts-frequency-changed'],
    ['What does “delivery ready” mean for a trainer?', 'wf-delivery-readiness'],
    ['Which roles can see the risk register?', 'users-roles'],
    ['What imports from aXcelerate?', 'ax-what-imports']
  ];

  window.RH = { ROLES: ROLES, MODULES: MODULES, ARTICLES: ARTICLES, ORDER: ORDER, LINKS: LINKS, WORKFLOWS: WORKFLOWS, WF_GROUPS: WF_GROUPS, ROLE_HUBS: ROLE_HUBS, FAQS: FAQS };
})();

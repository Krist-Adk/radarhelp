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
          '<p>Risk is worked out in three tiers. Each tier builds on the one above it, and each score sets the recommended validation frequency at its level.</p>' +
          '<ul class="formulas">' +
            '<li><b>Organisational risk</b><code>(Basic profile × Comprehensive risks) ÷ 10</code><span>Your basic profile is your RTO profile and basic provider risk factors. Your comprehensive risks come from your comprehensive risk assessment.</span></li>' +
            '<li><b>Course risk</b><code>(Course-specific risks × Organisational risk) ÷ 24</code><span>Course-specific risks come from each course’s risk assessment.</span></li>' +
            '<li><b>Unit risk</b><code>(Course risk × Unit risks) ÷ 10</code><span>Unit risks come from each unit’s settings, such as physical risk, sensitive content and completion rate.</span></li>' +
          '</ul>' +
          '<p>So a change to your organisational risk flows down to every course and unit, and a riskier course or unit is validated more often.</p>'],
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
    'risk-heatmap':
      '<p>The heatmap places every risk on a five-by-five grid using the ratings you gave it: likelihood runs across, from Rare to Almost Certain, and consequence runs down, from Insignificant to Catastrophic. Each square shows how many risks share that rating.</p>' +
      '<p>A risk’s score is its likelihood multiplied by its consequence, and the colour shows its level: <b>Low</b> (1–4) in green, <b>Medium</b> (5–9) in yellow, <b>High</b> (10–16) in orange and <b>Extreme</b> (17–25) in red. Risks gather towards the top right as they get more serious, so you can see at a glance where to act first.</p>',
    'gs-welcome':
      '<p class="lead">This guide follows your RTO Radar onboarding session. Nine short steps take you from a new account to a dashboard filling up with your RTO’s work. Each step builds on the one before, so work through them in order.</p>' +

      '<h2>Moving through the guide</h2>' +
      '<p>Each step of this guide has its own page. There are two ways to move between them.</p>' +
      '<h4 class="point">Previous and Next</h4>' +
      '<p>At the bottom of every page there are two buttons like these. <b>Next</b> takes you to the following step, and <b>Previous</b> takes you back one. The button tells you which step you’ll go to.</p>' +
      '<div class="demo" aria-hidden="true"><span class="demo-label">Example</span>' +
        '<div class="pager"><a><small>← Previous</small><b>How to Use This Guide</b></a><a class="next"><small>Next →</small><b>Set Up Your Organisation</b></a></div>' +
      '</div>' +
      '<h4 class="point">The step list</h4>' +
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
      '</div>' +
      '<h4 class="point">Notes, tips and warnings</h4>' +
      '<p>Read these as you go. Each has its own colour and icon:</p>' +
      '<div class="callout note"><b>Note</b><span>Explains how something works.</span></div>' +
      '<div class="callout tip"><b>Tip</b><span>Points you to a shortcut or more detail.</span></div>' +
      '<div class="callout warn"><b>Warning</b><span>Flags something to take care with, such as a setting only Admins can change.</span></div>' +
      '<h4 class="point">Frequently asked questions</h4>' +
      '<p>The last page answers common questions, such as how risk scores are worked out and when to use a silent user. Select a question to open its answer, like this one:</p>' +
      '<section class="gs-faq demo-faq"><details><summary>Where can I find the answers to common questions?</summary><div class="prose"><p>On the last page of this guide, <b>Frequently asked questions</b>. Select it in the step list, or keep selecting <b>Next</b> until you reach it.</p></div></details></section>' +

      '<h2>The RTO Radar screen</h2>' +
      '<p>Every screen in RTO Radar has two parts:</p>' +
      '<ul>' +
        '<li><b>The navigation bar (1)</b> on the left lists every part of RTO Radar, from Dashboard and Document Management through to Risk Assessment, Events and Settings. Select one to open it. The navigation bar stays in place wherever you go.</li>' +
        '<li><b>The content area (2)</b> on the right shows whatever you’ve opened, and changes as you move around.</li>' +
      '</ul>' +
      '<figure class="shot" data-marks="0.3,9,15.5,90.5,zone,#1; 17.2,6.4,81.6,93.2,zone,#2"><img src="assets/img/gs-welcome-dashboard.png" alt="RTO Radar after signing in. Marker 1 points to the navigation bar on the left, listing Dashboard, Document Management, Program Management, Continuous Improvement, Workforce Management, Risk Assessment, Complaints and Suggestions, Events and Settings. Marker 2 points to the content area on the right, showing the Admin Dashboard: a Risk Register Overview with 1 missing treatment, 1 responsibility gap and 12 overdue or missing dates, a Risk Level Breakdown bar chart and a Treatment Status Overview pie chart." loading="lazy"><figcaption>The navigation bar (1) and the content area (2), showing your dashboard.</figcaption></figure>' +
      '<p>When you sign in, the content area opens on your <b>dashboard</b>. It brings forward everything across RTO Radar that needs your immediate attention, from risks and improvement items to documents, staff and upcoming events.</p>' +
      '<p>If you’re new to RTO Radar, your dashboard will be mostly empty. That’s expected: it fills up as you work through this guide. Your organisational risks, improvement items, documents, courses and trainer each appear on it as you add them, and the last step shows you how to tailor it.</p>',
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
        '<li>In RTO Radar, open <b>Settings</b> › <b>Integrations</b>.' +
          '<figure class="shot" data-marks="0.2,45.4,6.6,4.8,oval,right,#1; 33.4,14.4,8.8,4.8,oval,#2; 25.7,91.3,arrow-down,tiny"><img src="assets/img/gs-ax-settings.png" alt="Organisation Settings, showing the aXcelerate Integration settings with fields for API Endpoint, API Token and WS Token, and Save Settings and Test Connection buttons. Marker 1 circles Settings in the navigation bar, marker 2 circles the Integrations tab, and an arrow points down at Save Settings." loading="lazy"><figcaption>Select Settings (1), then the Integrations tab (2). Once your details are in, select Save Settings.</figcaption></figure></li>' +
        '<li>Enter your API endpoint, paste both tokens, and connect.</li>' +
      '</ol>' +
      '<div class="callout warn"><b>Permission</b><span>Only Admins can connect integrations. Treat both tokens like passwords.</span></div>',
    'gs-organisation':
      '<h2 class="ghost">Update RTO Profile</h2>' +
      '<p>Your RTO profile is the baseline for your risk score, so start here: confirm your details, choose your risk factors and add your logo.</p>' +
      '<ol class="steps-list">' +
        '<li>On your navigation bar, go to <b>Risk Assessment</b>.' +
          '<figure class="shot" data-marks="0.2,32.3,11.4,6.9,oval,#"><img src="assets/img/gs-welcome-dashboard.png" alt="The RTO Radar dashboard, with Risk Assessment circled in the navigation bar on the left." loading="lazy"><figcaption>Select Risk Assessment in the navigation bar.</figcaption></figure>' +
          '<p>Your RTO profile lives under Risk Assessment because it’s where your risk score starts: your enrolments and basic provider risk factors set the baseline for your organisational risk, and for how often every course is validated.</p></li>' +
        '<li>Under <b>Actions</b>, select <b>Update RTO Profile</b>.' +
          '<figure class="shot" data-marks="63.6,57.2,36,10.4,oval,#"><img src="assets/img/gs-org-step1.png" alt="The Risk Assessment page, with the Update RTO Profile button circled, the first button in the Actions panel." loading="lazy"><figcaption>Select Update RTO Profile under Actions.</figcaption></figure></li>' +
        '<li>Check your RTO name and code, enter your RTO’s <b>Approximate Annual Enrolments</b>, and choose your <b>Basic Provider Risk Factors</b>. Together, your enrolments and risk factors feed into your organisational risk score.' +
          '<figure class="shot"><img src="assets/img/gs-org-details.png" alt="The top of the Update RTO Profile form. RTO Information shows the RTO name and code and Approximate Annual Enrolments of 200. Basic Provider Risk Factors lists checkboxes such as CRICOS registered, government funding received, compliance issues identified within the past 3 years and high assessor turnover." loading="lazy"><figcaption>Your RTO information and basic provider risk factors.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Not sure which risk factors apply? Choose what you know now. You can change them later from Update RTO Profile.</span></div></li>' +
        '<li>Nominate an <b>Escalation Manager</b>, then select <b>Save &amp; Exit</b>.' +
          '<div class="callout note"><b>Note</b><span>Your Escalation Manager keeps watch over your organisational risks. RTO Radar notifies them whenever a risk is added to or removed from your register, at any risk level, so nothing changes without them knowing. Choose a senior manager or board member.</span></div>' +
          '<figure class="shot" data-marks="78.55,69.2,arrow-down"><img src="assets/img/gs-org-escalation.png" alt="The Escalation Manager section of the Update RTO Profile form, with Name and Email fields filled in as Admin Demo and admindemo@rtoradar.com.au, and a note that the Escalation Manager also serves as the default manager for the System Default team. Below it, the save bar shows Save Status: Not saved, with Edit Comprehensive Assessment and Save and Exit buttons. An arrow points down at the Save and Exit button." loading="lazy"><figcaption>Enter your Escalation Manager’s name and email, then select Save &amp; Exit.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Risk Register Overview</h2>' +
      '<p>Your risk score, validation frequency, risks identified, Escalation Manager and basic risk factors.</p>' +
      '<figure class="shot"><img src="assets/img/gs-risk-overview.png" alt="The Risk Assessment overview for an RTO, showing a risk score of 6.0 out of 10, a validation frequency of 6 months, 27 risks identified, the Escalation Manager, an Actions panel and five active basic provider risk factors." loading="lazy"><figcaption>The Risk Register overview after saving your RTO profile.</figcaption></figure>' +
      '<h2>Branding</h2>' +
      '<p>Make RTO Radar your own. Your export logo appears on PDF and Word exports in place of the RTO Radar logo, and your sidebar icon replaces the default icon in the navigation for everyone in your RTO.</p>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Settings</b> › <b>Customisation</b> › <b>Branding</b>.' +
          '<figure class="shot" data-marks="0.2,52.6,11,8,oval,right,#1; 77.6,0.2,13.4,6,oval,right,#2; 85,22.2,13.6,6.6,oval,right,#3; 91.9,22,arrow-down; 65.6,60.6,arrow-left,#4"><img src="assets/img/gs-org-branding.png" alt="The Branding page in Settings. Marker 1 circles Settings in the navigation, marker 2 the Customisation tab along the top, and marker 3 the Branding tab under Customisation, with an arrow pointing down at it. Marker 4 is an arrow pointing left at Click to upload under Export Logo. The page shows two upload areas, Export Logo and Sidebar Icon, each with Click to upload." loading="lazy"><figcaption>Select Settings (1), then the Customisation tab (2), then Branding (3), then Click to upload (4).</figcaption></figure></li>' +
        '<li>Import your organisation’s logo by selecting <b>Click to upload</b>.</li>' +
      '</ol>',
    'gs-risks':
      '<p>Your organisational risk score combines your basic profile from the previous step with your comprehensive risk factors. It sets the baseline validation frequency for all your courses, and a course’s own risk factors can shorten it further.</p>' +
      '<h2 class="ghost">Begin Comprehensive Assessment</h2>' +
      '<ol class="steps-list">' +
        '<li>Go to <b>Risk Assessment</b> › <b>Actions</b> › <b>Begin Comprehensive Assessment</b>.' +
          '<figure class="shot" data-marks="0.4,47.3,15.6,7.8,oval,#1; 63.6,65.6,36,10.4,oval,#2"><img src="assets/img/gs-org-step1.png" alt="RTO Radar with Risk Assessment selected in the navigation, showing the Actions panel. Marker 1 circles Risk Assessment in the navigation, and marker 2 the second button in Actions, which reads Edit Comprehensive Assessment here and Begin Comprehensive Assessment before an assessment has been started." loading="lazy"><figcaption>Select Risk Assessment (1), then Begin Comprehensive Assessment (2). Once you’ve started an assessment, this button reads Edit Comprehensive Assessment.</figcaption></figure></li>' +
        '<li>You’ll be greeted by the <b>Risk Heatmap</b>.' +
          '<figure class="shot"><img src="assets/img/gs-risk-heatmap-grid.png" alt="The Risk Heatmap: a five by five grid with likelihood across the top, from Rare to Almost Certain, and consequence down the side, from Insignificant to Catastrophic. Each square is coloured Low, Medium, High or Extreme and shows how many risks fall in it." loading="lazy"><figcaption>The Risk Heatmap.</figcaption></figure>' +
          '<p>The Risk Heatmap shows all your organisational risks at a glance, placed by how likely each one is and how serious it would be. The further towards the top right a risk sits, the more urgently it needs attention.</p></li>' +
        '<li>Scroll down to <b>Risk Assessment by Category</b>.</li>' +
        '<li>Choose the category where you want to enter your first risk, then select <b>Add Additional Risk</b>.' +
          '<figure class="shot" data-marks="12.2,19.9,10.9,7.9,oval,#1; 53.8,28.2,14.4,6.1,oval,#2"><img src="assets/img/gs-risk-categories.png" alt="Risk Assessment by Category in the comprehensive assessment. On the left is the list of 12 risk categories with how many risks each has; Financial Risk is selected and shows 0 risks identified, an example, and an Add Additional Risk button. Marker 1 circles the Financial Risk category, and marker 2 the Add Additional Risk button. A bar along the bottom shows the save status and a Complete Risk Assessment button." loading="lazy"><figcaption>Choose a category such as Financial Risk (1), then select Add Additional Risk (2).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Want risk categories that fit your RTO? See how to set them up in <a href="feature.html?m=custom">Customisation</a>.</span></div></li>' +
        '<li>Enter the risk title, description, likelihood and consequence, then select <b>Add Risk Factor</b>.' +
          '<figure class="shot" data-marks="27.2,68.8,15.4,10.2,oval,#"><img src="assets/img/gs-risk-add-factor.png" alt="The Add New Risk Factor form, filled in with an example: the risk title Cash-flow pressure from delayed student payments, a description, likelihood 3 - Possible and consequence 3 - Moderate. The Add Risk Factor button is circled." loading="lazy"><figcaption>Enter the risk details, then select Add Risk Factor.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Add Treatment Plan</h2>' +
      '<p>For risks rated medium or higher, we recommend adding Existing Controls and a Treatment Plan.</p>' +
      '<ol class="steps-list" start="6" style="counter-reset: s 5">' +
        '<li>Add your <b>Existing Controls</b>: what you already do to manage this risk.' +
          '<div class="callout note"><b>Note</b><span>Existing Controls and the treatment plan only appear after you select Add Risk Factor.</span></div></li>' +
        '<li>Select <b>Treatment Plan Strongly Recommended</b>.' +
          '<figure class="shot" data-marks="25.4,79.4,30.6,10.6,oval,#; 30,81,arrow-down,tiny"><img src="assets/img/gs-risk-controls.png" alt="A saved risk, Cash-flow pressure from delayed student payments, rated Medium Risk with a score of 9 and marked Escalation Required, with its Existing Controls filled in. A small arrow leads from the last existing control, management review of outstanding debts, down to the Treatment Plan Strongly Recommended button, which is circled." loading="lazy"><figcaption>Select Treatment Plan Strongly Recommended.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>This button’s wording depends on the risk’s score. For medium, high and extreme risks it reads Treatment Plan Strongly Recommended. For low risks a treatment plan is optional, so it reads Add Optional Treatment Plan instead.</span></div></li>' +
        '<li>Enter a title, description and proposed treatment, nominate the person responsible, and set a due date and status.' +
          '<div class="callout note"><b>Note</b><span>The responsible person gets an improvement item in the <a href="feature.html?m=cir">Continuous Improvement Register (CIR)</a> with the proposed treatment.</span></div>' +
          '<figure class="shot"><img src="assets/img/gs-risk-treatment.png" alt="A treatment plan being added to a risk: title Monthly Cash-Flow Monitoring, a description, a proposed treatment, responsible person Compliance Manager, due date 30/10/2026 and status Not started. A bar along the bottom shows the save status, 1 item queued for CI Register and a Complete Risk Assessment button." loading="lazy"><figcaption>Fill in the treatment plan. Use the calendar icon to pick a due date.</figcaption></figure></li>' +
        '<li>Repeat steps 4 to 8 to add more risks, then select <b>Complete Risk Assessment</b>.' +
          '<figure class="shot" data-marks="8.4,54.2,17.6,10,oval,#1; 49,16.4,arrow-down,#2; 88.1,92.6,arrow-down,#3"><img src="assets/img/gs-risk-repeat.png" alt="Risk Assessment by Category with a second category selected. Marker 1 circles ICT and Cyber-Security Risk in the category list, and marker 2 is an arrow pointing down at its content on the right: its description, an example, and a risk being entered, Staff Awareness of Cyber Risks, rated Medium Risk with a score of 9. Marker 3 is an arrow pointing down at the Complete Risk Assessment button in the save bar along the bottom, which shows 2 items queued for CI Register." loading="lazy"><figcaption>Choose another category (1), add its risks the same way (2), then select Complete Risk Assessment (3).</figcaption></figure></li>' +
        '<li>Review your changes, then select <b>Complete Risk Assessment</b>.' +
          '<figure class="shot" data-marks="54.4,69.8,17.6,11.4,oval,#"><img src="assets/img/gs-risk-review.png" alt="The review shown before completing the assessment, headed New Risks Added (2). It lists both new risks with their category, likelihood and consequence, and treatment plan: Cash-flow pressure from delayed student payments, rated Medium with a score of 9, and Staff Awareness of Cyber Risks, rated Low with a score of 4. The Complete Risk Assessment button, between Discard and Exit and Cancel, is circled." loading="lazy"><figcaption>Review the new risks and their treatment plans, then select Complete Risk Assessment.</figcaption></figure>' +
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
          '<figure class="shot"><img src="assets/img/gs-cir-item.png" alt="An improvement item opened in full. It shows the title, source, person responsible, dates, tags and the original risk score, notes carried over from the risk (category, description, level, existing controls, likelihood and consequence), and the proposed treatment. Buttons along the bottom are Delete Item, Complete Item, Verify, More info and Edit Item." loading="lazy"><figcaption>An improvement item created from a risk treatment plan.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The person responsible gets this exact item too.</span></div></li>' +
      '</ol>',
    'gs-documents':
      '<p>RTO Radar is also your quality management system (QMS). Your policies, procedures and other compliance documents live in one repository, each with an owner, a reviewer and review reminders, and each mapped to the standards it evidences. The Compliance Dashboard then shows how well your documents cover your frameworks.</p>' +
      '<h2>Upload Document</h2>' +
      '<ol class="steps-list">' +
        '<li>From your navigation bar, go to <b>Document Management</b>, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="0.2,15.1,12.8,5,oval,#1; 78.2,10.7,10.6,5.6,oval,right,#2"><img src="assets/img/gs-doc-upload.png" alt="Document Management (QMS), showing totals for documents, approved, review due and drafts, and the Document Repository. Marker 1 circles Document Management in the navigation bar, and marker 2 circles the Upload Document button at the top right." loading="lazy"><figcaption>Select Document Management (1), then Upload Document (2).</figcaption></figure></li>' +
        '<li>Choose <b>File upload</b>, then select <b>Choose File</b> and pick a file from your computer.' +
          '<figure class="shot" data-marks="50,66.4,arrow-down"><img src="assets/img/gs-doc-file.png" alt="The Upload Document form, with Source set to File upload and a Link option beside it. An arrow points down at the Choose File button under Document File." loading="lazy"><figcaption>Select Choose File to add a document from your computer.</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Is the document stored online? Choose <b>Link</b> instead and paste its web address.</span></div></li>' +
        '<li>Fill in the document details.' +
          '<figure class="shot"><img src="assets/img/gs-doc-details.png" alt="The document details section of the Upload Document form, filled in for an enrolment and admissions policy: document number (left blank to auto-generate), initial version 1.0, document title, document type Policy, category, description, tags, a review frequency of 12 months, a review due date, and the document owner." loading="lazy"><figcaption>Document details, including the review frequency and document owner.</figcaption></figure></li>' +
        '<li>Nominate a document reviewer and set up email reminders for reviews.' +
          '<figure class="shot"><img src="assets/img/gs-doc-reviewer.png" alt="The Document Reviewer and Email Reminders section of the form. Claire Smith, an Administrator, is chosen as reviewer, and reminders can be sent 1 day, 3 days, 5 days, 7 days, 14 days or 1 month before the review due date, with 14 days ticked." loading="lazy"><figcaption>Choose a reviewer and when they’re reminded before the review is due.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>The reviewer is emailed as the document’s review due date approaches, at each reminder you tick. The reviewer can be different from the document’s owner.</span></div></li>' +
        '<li>Map the document to the compliance frameworks set for your RTO.' +
          '<figure class="shot"><img src="assets/img/gs-doc-mapping.png" alt="Compliance Framework Mapping for Demo RTO, with 5 standards selected. Under the Standards for RTOs 2025, standards such as 1.6, 1.7, 2.1 and 2.2 are ticked, each with its description, and there is a search box for finding standards." loading="lazy"><figcaption>Tick each standard the document provides evidence for.</figcaption></figure></li>' +
        '<li>Set the document’s status and compliance status, add any notes, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="75.2,72,arrow-down"><img src="assets/img/gs-doc-status.png" alt="The Document Status section, with Status set to Approved, Compliance Status set to Compliant, and an empty notes box. An arrow points down at the Upload Document button." loading="lazy"><figcaption>Set the statuses, then select Upload Document.</figcaption></figure>' +
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
          '<figure class="shot" data-marks="0.2,21,10.8,4.2,oval,right,#1; 83,5.3,9.4,6.4,oval,right,#2"><img src="assets/img/gs-prog-add.png" alt="Program Management, showing totals for programs, accredited programs, units managed and risk assessments, and the Courses list. Marker 1 circles Program Management in the navigation bar, and marker 2 circles the Add Course button at the top right." loading="lazy"><figcaption>Select Program Management (1), then Add Course (2).</figcaption></figure></li>' +
        '<li>Choose <b>TGA Accredited Courses</b>, or enter a custom program.' +
          '<div class="callout note"><b>Note</b><span>Custom programs aren’t TGA-accredited qualifications. You’ll need to add their units or modules yourself and make sure they meet the relevant industry standards.</span></div></li>' +
        '<li>Under TGA Accredited Courses, search by course code, title or keyword, then select <b>Search TGA</b>.' +
          '<figure class="shot" data-marks="26.4,33.6,14.5,3,underline,#1; 18.6,58.2,arrow-down,tiny,#2; 76.2,55.2,11,7.6,oval,right,#3"><img src="assets/img/gs-prog-search.png" alt="Add Courses and Programs, on the TGA Accredited Courses tab. Marker 1 underlines TGA Accredited Courses, marker 2 is an arrow pointing at the course code BSB50120 entered in the search box, and marker 3 circles the Search TGA button. Hints below say you can search by national code, course title or keywords, and that results come directly from training.gov.au." loading="lazy"><figcaption>On TGA Accredited Courses (1), enter a course code (2), then select Search TGA (3).</figcaption></figure></li>' +
        '<li>Find your course in the search results and select <b>Add Course</b>.' +
          '<figure class="shot" data-marks="61.2,69,12,8.4,oval,#"><img src="assets/img/gs-prog-results.png" alt="Search results for BSB50120, showing 1 of 1 results: BSB50120 Diploma of Business, marked Qualification and Current. Its Add Course button is circled." loading="lazy"><figcaption>Select Add Course beside your course.</figcaption></figure></li>' +
        '<li>Complete the <b>Course Risk Assessment</b> by choosing the course-specific risk factors and any additional risk factors.' +
          '<figure class="shot"><img src="assets/img/gs-prog-risk.png" alt="Course-Specific Risk Factors for the course: primary delivery mode, use of recognition of prior learning, use of unsupervised assessments, student enrolment volume and course completion rate for the past 12 months, each with the points it adds. Below is a checklist of additional risk factors, such as structured work placement and delivery to international CRICOS students, each worth one or two points." loading="lazy"><figcaption>Each answer adds points to the course’s risk score.</figcaption></figure></li>' +
        '<li>Review the course risk assessment result and the recommended validation frequency, then select <b>Complete Course Assessment</b>.' +
          '<figure class="shot" data-marks="57,69.4,24.6,9.8,oval,#"><img src="assets/img/gs-prog-result.png" alt="The Course Risk Assessment Result: provider risk 3.6 out of 6, course risk 7 out of 24, and a total risk score of 5.2 out of 10, rated Medium Risk. The recommended validation frequency is every 18 months, based on combined provider and course-specific risk factors. The Complete Course Assessment button is circled." loading="lazy"><figcaption>Your course’s risk score and recommended validation frequency.</figcaption></figure>' +
          '<div class="callout note"><b>Note</b><span>You can change how risk scores map to validation frequencies in <a href="feature.html?m=custom">Customisation</a>.</span></div></li>' +
        '<li>Find your course in <b>Program Management</b>.' +
          '<figure class="shot"><img src="assets/img/gs-courses-list.png" alt="The Courses list in Program Management, showing three courses with their program code, title, team, number of units, a Manage button for units, risk status from Low to High, and when each was created." loading="lazy"><figcaption>Each course shows its team, number of units and risk status.</figcaption></figure></li>' +
      '</ol>' +
      '<h2>Manage Course Units</h2>' +
      '<ol class="steps-list">' +
        '<li>In <b>Program Management</b>, on the <b>Courses</b> tab, select <b>Manage</b> next to your course.' +
          '<figure class="shot" data-marks="2.8,36.2,16.4,4.8,oval,right,#1; 22.2,17,5.6,4.6,oval,#2; 64.4,47.6,7.6,5.8,oval,above,#3"><img src="assets/img/gs-prog-manage.png" alt="Program Management on the Courses tab, listing BSB50120 Diploma of Business with 0 units and a Medium risk status, and CHC50121 Diploma of Early Childhood Education and Care with 26 units. Marker 1 circles Program Management in the navigation bar, marker 2 the Courses tab, and marker 3 the Manage button for the Diploma of Business." loading="lazy"><figcaption>Select Program Management (1), the Courses tab (2), then Manage next to your course (3).</figcaption></figure></li>' +
        '<li>Select <b>Add Unit</b>. Under <b>Search TGA units</b>, select <b>Search [course code]’s Units</b> to load all the units in your course, or enter a unit code to find one.' +
          '<figure class="shot" data-marks="82.4,13.4,9.8,8.2,oval,above,#1; 12.6,41.4,14.4,1.6,underline,#2; 64,43.4,26.4,9.6,oval,above,#3"><img src="assets/img/gs-prog-add-unit.png" alt="The Add Unit panel for BSB50120. Marker 1 circles the Add Unit button at the top right, marker 2 underlines Search TGA units, and marker 3 circles the Search BSB50120’s Units button beside the search box. A Create custom unit option sits above, and a hint says to enter a unit code or select the button to load all BSB50120 units." loading="lazy"><figcaption>Select Add Unit (1), then under Search TGA units (2), select Search [course code]’s Units (3).</figcaption></figure>' +
          '<div class="callout tip"><b>Tip</b><span>Unit not on training.gov.au? Choose <b>Create custom unit</b> instead.</span></div></li>' +
        '<li>Filter and select from core or elective units, or from unit groups.</li>' +
        '<li>When you’re happy with your units, select <b>Add Selected</b>. The button shows how many units you’ve chosen.' +
          '<figure class="shot" data-marks="8.7,25.8,3.4,6.6,oval,#1; 18.6,9,15.6,7.4,oval,right,#2"><img src="assets/img/gs-prog-select-units.png" alt="The unit list for the course, showing 12 of 12 units selected: 5 core and 7 elective. Units are grouped under Core Units and Group A, Business Operations, each with a ticked box, its code, Core or Elective, and Current. Filters for status, type and group sit at the top. Marker 1 circles the ticked box beside the first core unit, and marker 2 circles the Add Selected (12) button." loading="lazy"><figcaption>Tick the units you want (1), then select Add Selected (2).</figcaption></figure></li>' +
        '<li>Scroll down to find your units under <b>Course Units</b>.</li>' +
        '<li>Configure each unit: any physical risks or sensitive content involved, and its completion rate. These give the unit its own validation frequency.' +
          '<figure class="shot"><img src="assets/img/gs-course-units.png" alt="The Course Units list for a course with 10 units. Each unit shows its code and title, its recommended validation frequency, such as every 36 or 24 months, whether a validation is scheduled, Validate Now and Schedule buttons, and settings for unit type, physical risk, sensitive content and completion rate." loading="lazy"><figcaption>Each unit’s settings give it its own recommended validation frequency.</figcaption></figure></li>' +
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
          '<figure class="shot" data-marks="57.7,69.6,4.4,5.8,oval,#; 51.6,93.6,9.8,6.6,oval,#"><img src="assets/img/gs-trainer-silent.png" alt="The Create New User form, filled in with a first and last name, an email address, the Trainer/Assessor role and the team left as System Default (no team). The Silent user (no login access) switch is turned on and circled, and a note says the user will be created for compliance tracking only and won’t receive an invitation email or be able to log in. The Create Profile button is circled." loading="lazy"><figcaption>Turn on Silent user, then select Create Profile.</figcaption></figure>' +
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
          '<figure class="shot" data-marks="66.2,22,10.1,5.4,oval,#; 3.2,40.9,7.2,2.85,underline,#; 3.2,49.5,7.2,2.85,underline,#"><img src="assets/img/gs-dashboard-filter.png" alt="The Matrix Risks Identified widget, filtered by Category to Financial Risk, which is circled. The two remaining risks, Reliance on State Funding rated High and a cash-flow risk rated Medium, both have their Financial Risk category underlined." loading="lazy"><figcaption>Filtering by Financial Risk shows only the risks in that category.</figcaption></figure></li>' +
      '</ol>' +
      '<p>That’s the foundations in place. As your team adds documents, risks and evidence, your dashboard keeps watch, surfacing whatever needs action next.</p>',
    'gs-training':
      '<p>Give your new trainer the courses and units they’ll deliver, set out the documents trainers need to provide, and see how it all comes together on their profile.</p>' +
      '<h2 class="ghost">Assign Courses and Units</h2>' +
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
          '<figure class="shot" data-marks="4.5,24.9,6.7,4.6,oval,#1; 86.9,34.4,12.4,6.2,oval,above,#2"><img src="assets/img/gs-staff-docs.png" alt="The Documents tab of the Staff Demo profile, listing 11 documents with their category, document checklist item, status and expiry, such as a Working With Children Check marked Approved. Marker 1 circles the Documents tab, and marker 2 circles the Upload Document button." loading="lazy"><figcaption>Open the Documents tab (1), then select Upload Document (2).</figcaption></figure></li>' +
        '<li>Select the file box and choose the document from your computer.' +
          '<figure class="shot" data-marks="51,72,arrow-down,small"><img src="assets/img/gs-staff-file.png" alt="The Upload Qualifications window, for uploading certificates, diplomas, degrees and other formal qualifications. An arrow points down at the Select File box, which shows a chosen file, Diploma of Community Services.docx." loading="lazy"><figcaption>Select the file box to choose a document.</figcaption></figure></li>' +
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
        '<li>Fill in the remaining details, then select <b>Upload Document</b>.' +
          '<figure class="shot" data-marks="45.5,45.8,arrow-down,small; 82.4,93.3,15.4,6.6,oval,#"><img src="assets/img/gs-staff-upload.png" alt="The document details form for a qualification: category Qualifications, the document name, course code CHC52025, course name Diploma of Community Services, a description listing the units completed, a completion date of 14/06/2026, and This document does not expire ticked. An arrow points down at the Description field, and the Upload Document button at the bottom right is circled." loading="lazy"><figcaption>Fill in the details, then select Upload Document.</figcaption></figure></li>' +
        '<li>Find the document you uploaded on the <b>Documents</b> tab.</li>' +
        '<li>Open the <b>Profile</b> tab to see how it all comes together: their role and team, delivery competency, most recent credentials and evidence map, document checklist and upcoming document expiry.' +
          '<figure class="shot" data-marks="3.4,12.3,4.7,4.2,oval,#"><img src="assets/img/gs-staff-profile.png" alt="The Profile tab of the Staff Demo profile, circled. It shows their role, last login, team and manager; a delivery competency chart of 16 units assigned; their most recently issued credentials, including the Diploma of Community Services and an expired Working With Children Check; their most recent evidence map; their document checklist with 1 of 2 provided; and upcoming staff document expiry." loading="lazy"><figcaption>A trainer’s profile brings together their units, credentials, evidence map, checklist and document expiry.</figcaption></figure></li>' +
      '</ol>'
  };

  // Getting Started steps that share a written guide with their module
  BODIES['gs-connect-axcelerate'] = BODIES['connect-axcelerate'] +
    '<h2>Import Courses</h2>' +
    '<ol class="steps-list">' +
      '<li>Under <b>aXcelerate Integration</b>, go to <b>Import Courses</b> › <b>Fetch from aXcelerate</b>.' +
        '<figure class="shot" data-marks="44.6,39.3,10.6,5.4,oval,#1; 17.6,57.2,15.4,6.6,oval,right,#2"><img src="assets/img/gs-ax-import-courses.png" alt="The aXcelerate Integration panel on the Import Courses tab. Connection Status shows a green tick and says the integration is configured and ready to use. Marker 1 circles the Import Courses tab, and marker 2 circles the Fetch from aXcelerate button." loading="lazy"><figcaption>Select Import Courses (1), then Fetch from aXcelerate (2).</figcaption></figure></li>' +
      '<li>Filter your programs, or select them one by one by ticking the box before each program code.' +
        '<figure class="shot" data-marks="9.4,37.4,5.2,27,oval,#"><img src="assets/img/gs-ax-select-courses.png" alt="Three courses fetched from aXcelerate, each with a ticked box before its program code: BSB30120 Certificate III in Business, CHC30121 Certificate III in Early Childhood Education and Care, and CHC33021 Certificate III in Individual Support. Each shows how many of its units are selected and is marked New. The ticked boxes are circled." loading="lazy"><figcaption>Tick the box before each course you want to import.</figcaption></figure></li>' +
      '<li>Choose which units to import from each course. Select the arrow before a course’s program code to show its units.' +
        '<figure class="shot" data-marks="20.7,1,3.4,6.6,oval,#; 25.4,18.6,arrow-down,small"><img src="assets/img/gs-ax-select-units.png" alt="CHC30121 Certificate III in Early Childhood Education and Care, expanded to show its units. The arrow before the program code is circled, and an arrow points down from it to the list of 17 units, each with a ticked box, its unit code and title, and an Active status. A Deselect All option sits at the top right." loading="lazy"><figcaption>Expand a course to see its units, then untick any you don’t want to import.</figcaption></figure></li>' +
      '<li>Scroll up to find your <b>Import Summary</b>, then select <b>Import Selected Courses</b>.' +
        '<figure class="shot" data-marks="71.2,70.4,21.6,9,oval,#"><img src="assets/img/gs-ax-import-summary.png" alt="The Import Summary, listing three courses by code with an editable program title for each and its default title underneath. It shows 3 courses selected and 77 units, and the Import Selected Courses button at the bottom right is circled." loading="lazy"><figcaption>Check or rename the program titles, then select Import Selected Courses.</figcaption></figure></li>' +
      '<li>Find your imported programs in <b>Program Management</b> in your navigation bar.</li>' +
    '</ol>' +
    '<h2>Import Trainers</h2>' +
    '<ol class="steps-list">' +
      '<li>Under <b>aXcelerate Integration</b>, go to <b>Import Trainers</b> › <b>Fetch Trainers from aXcelerate</b>.' +
        '<figure class="shot" data-marks="66,38.2,11,5.6,oval,#1; 18.4,58.6,21.6,7.8,oval,right,#2"><img src="assets/img/gs-ax-import-trainers.png" alt="The aXcelerate Integration panel on the Import Trainers tab. Connection Status shows a green tick and says the integration is ready to sync trainers. Marker 1 circles the Import Trainers tab, and marker 2 circles the Fetch Trainers from aXcelerate button." loading="lazy"><figcaption>Select Import Trainers (1), then Fetch Trainers from aXcelerate (2).</figcaption></figure></li>' +
      '<li>Filter your trainers, or select them one by one by ticking the box before each contact ID.' +
        '<figure class="shot" data-marks="7.4,27,4.2,35.4,oval,#"><img src="assets/img/gs-ax-select-trainers.png" alt="Three trainers fetched from aXcelerate, each with a ticked box and marked Contact Active. Their contact IDs, names and email addresses are blurred. The ticked boxes are circled." loading="lazy"><figcaption>Tick the box before each trainer you want to import.</figcaption></figure></li>' +
      '<li>Scroll up to find your <b>Import Summary</b>, then select <b>Import &amp; Invite</b>.' +
        '<figure class="shot" data-marks="77.8,39,20,31.6,oval,#"><img src="assets/img/gs-ax-trainer-summary.png" alt="The Import Summary for 3 selected trainers, with Import Silently and Import and Invite buttons. The Import and Invite button is circled. A note says silent import creates profiles without sending sign-in invitations, and that they can be invited later from Staff Management." loading="lazy"><figcaption>Select Import &amp; Invite to send each trainer a sign-in invitation.</figcaption></figure>' +
        '<div class="callout tip"><b>Tip</b><span>Not ready to invite them yet? Choose <b>Import Silently</b> to create their profiles without sending invitations. You can invite them later from Staff Management.</span></div></li>' +
      '<li>Find your imported trainers in <b>Workforce Management</b> in your navigation bar.</li>' +
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

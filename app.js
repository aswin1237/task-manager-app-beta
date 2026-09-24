// ==========================================================================
// OMNITASK — REFINED IA & WIREFRAME CONTROLLER (v4 — Tiered Safety & Pause)
// ==========================================================================

const appState = {
  profileMode: 'standard', // 'standard' (Power-User) | 'elderly' (Accessible)
  activeRole: 'user', // 'user' | 'caregiver' | 'admin'
  streakDays: 14,
  selectedDate: '2026-10-15',
  isPaused: false,
  pauseHours: 6,
  isCaregiverFrozen: false,
  isMasterDetachPending: false,

  // Master Aggregated Tasks Database
  items: [
    { id: '1', date: '2026-10-02', module: 'pill', title: 'Aspirin 81mg', time: '08:00 AM', detail: 'Dosage: 1 tab • Medical ID #8210', done: true, spend: 0 },
    { id: '2', date: '2026-10-02', module: 'fitness', title: 'Morning 5K Jog', time: '07:00 AM', detail: 'Zone 2 cardio • 30 mins', done: true, spend: 0 },
    { id: '3', date: '2026-10-05', module: 'payment', title: 'Internet Broadband Bill', time: '09:00 AM', detail: 'Due today • Auto-link to Bills', done: true, spend: 65.0 },
    
    // Day with 6 items
    { id: '4', date: '2026-10-10', module: 'pill', title: 'Metformin 500mg', time: '08:00 AM', detail: 'Dosage: 1 tab with breakfast', done: true, spend: 0 },
    { id: '5', date: '2026-10-10', module: 'appointment', title: 'Dental Cleaning with Dr. Vance', time: '11:00 AM', detail: 'Vance Dental Clinic Main St', done: false, spend: 120.0 },
    { id: '6', date: '2026-10-10', module: 'custom', title: 'Guitar Practice', emoji: '🎸', time: '03:00 PM', detail: 'Scale exercises', done: true, spend: 0 },
    { id: '7', date: '2026-10-10', module: 'custom', title: 'Guitar Song Writing', emoji: '🎸', time: '05:30 PM', detail: 'Chord progression', done: true, spend: 0 },
    { id: '8', date: '2026-10-10', module: 'fitness', title: 'Chest & Triceps Routine', time: '06:30 PM', detail: 'Planned workout', done: false, spend: 0 },
    { id: '9', date: '2026-10-10', module: 'expense', title: 'Grocery Restock', time: '07:45 PM', detail: 'Whole Foods Market', done: true, spend: 85.5 },

    // Day with 9 items (Royal Violet High Density + Missed Pill Alert Badge)
    { id: '10', date: '2026-10-15', module: 'pill', title: 'Morning Metformin 500mg', time: '08:00 AM', detail: 'Dosage: 1 tab • Rx #4912', done: true, spend: 0 },
    { id: '11', date: '2026-10-15', module: 'pill', title: 'Lisinopril 10mg', time: '08:30 AM', detail: 'Blood pressure • Rx #3108', done: true, spend: 0 },
    { id: '12', date: '2026-10-15', module: 'payment', title: 'Apartment Rent Check', time: '09:00 AM', detail: 'Monthly rent • Paid', done: true, spend: 1100.0 },
    { id: '13', date: '2026-10-15', module: 'fitness', title: 'Upper Body Hypertrophy', time: '10:30 AM', detail: 'AI generated & user edited', done: false, spend: 0 },
    { id: '14', date: '2026-10-15', module: 'appointment', title: 'Cardiologist Follow-up', time: '02:00 PM', detail: 'Metropolitan Hospital Rm 402', done: false, spend: 40.0 },
    { id: '15', date: '2026-10-15', module: 'custom', title: 'Spanish Duolingo', emoji: '🇪🇸', time: '04:00 PM', detail: 'Daily streak', done: true, spend: 0 },
    { id: '16', date: '2026-10-15', module: 'custom', title: 'Guitar Lesson', emoji: '🎸', time: '05:00 PM', detail: 'With instructor', done: false, spend: 50.0 },
    { id: '17', date: '2026-10-15', module: 'custom', title: 'Guitar Fingerpicking', emoji: '🎸', time: '06:00 PM', detail: 'Acoustic drills', done: false, spend: 0 },
    { id: '18', date: '2026-10-15', module: 'pill', title: 'Evening Atorvastatin 20mg', time: '09:00 PM', detail: 'Cholesterol • Rx #9941', done: false, spend: 0, isMissed: true },

    // Day with 3 items (Sage Green Low Density)
    { id: '19', date: '2026-10-22', module: 'pill', title: 'Multivitamin', time: '09:00 AM', detail: 'Daily supplement', done: false, spend: 0 },
    { id: '20', date: '2026-10-22', module: 'fitness', title: 'Legs & Core', time: '05:00 PM', detail: 'Home workout', done: false, spend: 0 },
    { id: '21', date: '2026-10-22', module: 'payment', title: 'Electric Utility Bill', time: '08:00 AM', detail: 'Due in 3 days', done: false, spend: 75.0 },
  ],

  // Upcoming Bills
  upcomingBills: [
    { id: 'b1', title: 'Electric Utility Power Co.', amount: 75.00, dueDate: '2026-10-22', status: 'Due in 7 days', linkedCategory: 'Bills' },
    { id: 'b2', title: 'Home Broadband Internet', amount: 65.00, dueDate: '2026-10-25', status: 'Due in 10 days', linkedCategory: 'Bills' },
    { id: 'b3', title: 'Health Insurance Premium', amount: 280.00, dueDate: '2026-10-29', status: 'Upcoming', linkedCategory: 'Insurance' }
  ],

  // Spent Ledger Entries
  expenses: [
    { date: '2026-10-03', category: 'Groceries', title: 'Weekly Market Run', module: 'Manual', amount: 92.50 },
    { date: '2026-10-05', category: 'Bills', title: 'Internet Broadband Bill', module: 'Payment-Linked', amount: 65.00 },
    { date: '2026-10-10', category: 'Health', title: 'Dental Co-Pay Dr. Vance', module: 'Appointment-Linked', amount: 120.00 },
    { date: '2026-10-10', category: 'Groceries', title: 'Whole Foods Market', module: 'Manual', amount: 85.50 },
    { date: '2026-10-15', category: 'Housing', title: 'Apartment Rent Check', module: 'Payment-Linked', amount: 1100.00 },
    { date: '2026-10-15', category: 'Health', title: 'Doctor Consultation Co-Pay', module: 'Appointment-Linked', amount: 40.00 },
    { date: '2026-10-15', category: 'Education', title: 'Guitar Music Coaching', module: 'Custom-Linked', amount: 50.00 },
  ]
};

// Deep copy for State Machine: Ideal / Populated restore
const baselineData = {
  items: JSON.parse(JSON.stringify(appState.items)),
  upcomingBills: JSON.parse(JSON.stringify(appState.upcomingBills)),
  expenses: JSON.parse(JSON.stringify(appState.expenses))
};

// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initAdaptiveProfile();
  initRoleSwitcher();
  initNavigation();
  initCalendar();
  initFinancesModule();
  initRoutinesModule();
  initSpotlightSearch();
  initModuleAddModal();
  initEscalationLadder();
  initFitnessModule();
  initTemporaryPauseFlow();
  initTieredOverrideFlow();
  initMasterAdminCockpit();
  initUXTestingStudio();
});

// ==========================================================================
// 1. ROLE SWITCHER
// ==========================================================================
function initRoleSwitcher() {
  const roleButtons = document.querySelectorAll('.role-chip');

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedRole = btn.getAttribute('data-role');
      appState.activeRole = selectedRole;

      if (selectedRole === 'admin') {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('view-admin-oversight')?.classList.add('active');
        document.getElementById('nav-admin-oversight')?.classList.add('active');
      } else if (selectedRole === 'user') {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('view-home')?.classList.add('active');
        document.getElementById('nav-home')?.classList.add('active');
      } else if (selectedRole === 'caregiver') {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('view-routines')?.classList.add('active');
        document.getElementById('nav-routines')?.classList.add('active');
        alert('Switched to Caregiver View: Filtered to Eleanor Vance\'s medication compliance stream.');
      }
    });
  });
}

// ==========================================================================
// 2. ADAPTIVE PROFILE SWITCHER
// ==========================================================================
function initAdaptiveProfile() {
  const btnStandard = document.getElementById('btn-mode-standard');
  const btnElderly = document.getElementById('btn-mode-elderly');
  const appRoot = document.getElementById('app-root');

  btnStandard?.addEventListener('click', () => switchProfile('standard'));
  btnElderly?.addEventListener('click', () => switchProfile('elderly'));

  function switchProfile(mode) {
    appState.profileMode = mode;
    btnStandard.classList.toggle('active', mode === 'standard');
    btnElderly.classList.toggle('active', mode === 'elderly');

    if (mode === 'elderly') {
      appRoot.classList.add('elderly-mode');
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.getElementById('view-elderly-today').classList.add('active');
      renderElderlyView();
    } else {
      appRoot.classList.remove('elderly-mode');
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('view-home').classList.add('active');
      document.getElementById('nav-home').classList.add('active');
    }
  }

  document.getElementById('btn-elderly-sos')?.addEventListener('click', () => {
    alert('🚨 DISTRESS CALL INITIATED: Calling linked caregiver Dr. Elena Rostova and sending current location + medication status.');
  });
}

function renderElderlyView() {
  const stack = document.getElementById('elderly-cards-stack');
  if (!stack) return;
  stack.innerHTML = '';

  const todayPills = appState.items.filter(i => i.date === '2026-10-15' && (i.module === 'pill' || i.module === 'appointment'));

  todayPills.forEach(item => {
    const card = document.createElement('div');
    const isPill = item.module === 'pill';
    card.className = `elderly-card ${isPill ? 'pill-card' : 'appt-card'}`;

    card.innerHTML = `
      <div>
        <div class="elderly-card-time">${isPill ? '💊 Take at ' : '📅 Appointment at '}${item.time}</div>
        <div class="elderly-card-title">${item.title}</div>
        <div class="elderly-card-desc">${item.detail}</div>
      </div>
      <button class="btn-elderly-action ${item.done ? 'done' : ''}">
        ${item.done ? '✓ Completed' : 'Mark as Done'}
      </button>
    `;

    const actionBtn = card.querySelector('.btn-elderly-action');
    actionBtn.addEventListener('click', () => {
      item.done = !item.done;
      renderElderlyView();
      initCalendar();
    });

    stack.appendChild(card);
  });
}

// ==========================================================================
// 3. TEMPORARY PAUSE MONITORING FLOW
// ==========================================================================
function initTemporaryPauseFlow() {
  const btnOpenPause = document.getElementById('btn-open-pause-modal');
  const pauseModal = document.getElementById('pause-modal');
  const btnClosePause = document.getElementById('btn-close-pause-modal');
  const btnCancelPause = document.getElementById('btn-cancel-pause');
  const btnConfirmPause = document.getElementById('btn-confirm-pause');
  const durationBtns = document.querySelectorAll('.pause-choice-btn');
  const pauseActiveCard = document.getElementById('pause-active-indicator');
  const pauseStatusText = document.getElementById('pause-status-text');
  const btnResumeNow = document.getElementById('btn-resume-monitoring-now');
  const auditLog = document.getElementById('admin-audit-log');

  btnOpenPause?.addEventListener('click', () => pauseModal.classList.add('active'));
  btnClosePause?.addEventListener('click', () => pauseModal.classList.remove('active'));
  btnCancelPause?.addEventListener('click', () => pauseModal.classList.remove('active'));

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.pauseHours = parseInt(btn.getAttribute('data-hours'), 10);
    });
  });

  btnConfirmPause?.addEventListener('click', () => {
    appState.isPaused = true;
    pauseModal.classList.remove('active');
    pauseActiveCard.classList.remove('hidden');
    pauseStatusText.textContent = `Privacy mode active for ${appState.pauseHours} hours. Caregiver notifications are muted. Resumes automatically in ${appState.pauseHours} hrs.`;

    alert(`⏸️ TEMPORARY PAUSE ACTIVATED: Monitoring paused for ${appState.pauseHours} hours. Caregiver notifications muted.`);

    // Log to Master Audit stream
    if (auditLog) {
      const entry = document.createElement('div');
      entry.className = 'log-entry amber-log';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag amber">Temporary Privacy Pause</span>
        <p>Eleanor Vance paused monitoring for ${appState.pauseHours} hours. Auto-resumes in ${appState.pauseHours}h.</p>
      `;
      auditLog.prepend(entry);
    }
  });

  btnResumeNow?.addEventListener('click', () => {
    appState.isPaused = false;
    pauseActiveCard.classList.add('hidden');
    alert('▶ MONITORING RESUMED: Full caregiver & safety monitoring is now active again.');

    if (auditLog) {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag call">Monitoring Resumed</span>
        <p>Eleanor Vance resumed active monitoring early.</p>
      `;
      auditLog.prepend(entry);
    }
  });
}

// ==========================================================================
// 4. TIERED OVERRIDE & DUAL-VERIFICATION FLOW
// ==========================================================================
function initTieredOverrideFlow() {
  const btnTriggerOverride = document.getElementById('btn-elderly-trigger-override');
  const overrideModal = document.getElementById('override-modal');
  const btnCloseOverride = document.getElementById('btn-close-override');
  const btnFreezeCaregiver = document.getElementById('btn-execute-caregiver-freeze');
  const btnRequestMaster = document.getElementById('btn-request-master-verification');
  const masterVerificationBanner = document.getElementById('master-verification-banner');
  const adminPendingBadge = document.getElementById('admin-pending-badge');
  const auditLog = document.getElementById('admin-audit-log');

  btnTriggerOverride?.addEventListener('click', () => overrideModal.classList.add('active'));
  btnCloseOverride?.addEventListener('click', () => overrideModal.classList.remove('active'));

  // TIER 1: Instant Caregiver Freeze (Master Safety Net Remains Active)
  btnFreezeCaregiver?.addEventListener('click', () => {
    appState.isCaregiverFrozen = true;
    overrideModal.classList.remove('active');

    // Update Caregiver display in UI
    document.getElementById('sidebar-caregiver-name').textContent = 'Caregiver Frozen';
    document.getElementById('sidebar-caregiver-detail').textContent = 'Master User (Aswin) is Direct Safety Net';
    document.getElementById('admin-caregiver-pulse').className = 'status-dot-pulse frozen';
    document.getElementById('admin-caregiver-status-badge').textContent = 'FROZEN BY USER';
    document.getElementById('admin-caregiver-status-badge').className = 'sla-badge red';
    document.getElementById('autonomy-banner-title').textContent = 'Caregiver Frozen • Protected by Master User';
    document.getElementById('autonomy-banner-desc').textContent = 'Nurse Elena disconnected. All emergency escalation alerts reroute directly to Aswin (Son).';

    alert('🛑 CAREGIVER FROZEN: Nurse Elena Rostova has been disconnected and cached records purged from her phone. Aswin (Son) is now your active direct safety monitor.');

    if (auditLog) {
      const entry = document.createElement('div');
      entry.className = 'log-entry alert-log';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag alert">Tier 1 Caregiver Freeze</span>
        <p>Eleanor Vance froze Caregiver Dr. Elena Rostova. Master Safety Net automatically engaged.</p>
      `;
      auditLog.prepend(entry);
    }
  });

  // TIER 2: Complete Independence Request (Requires Master 2nd Verification)
  btnRequestMaster?.addEventListener('click', () => {
    appState.isMasterDetachPending = true;
    overrideModal.classList.remove('active');

    // Activate Master Verification Banner and notification badge
    masterVerificationBanner?.classList.remove('hidden');
    adminPendingBadge?.classList.remove('hidden');

    alert('📨 2ND VERIFICATION DISPATCHED: Complete detachment request sent to Master User (Aswin • Son) for safety authorization.');

    if (auditLog) {
      const entry = document.createElement('div');
      entry.className = 'log-entry amber-log';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag amber">2nd Verification Pending</span>
        <p>Eleanor Vance requested complete detachment. Awaiting Master User 2nd verification authorization.</p>
      `;
      auditLog.prepend(entry);
    }
  });

  // Master User Verification Buttons
  const btnApproveDetach = document.getElementById('btn-master-approve-detach');
  const btnDeclineDetach = document.getElementById('btn-master-decline-detach');

  btnApproveDetach?.addEventListener('click', () => {
    const pin = prompt('Master User 2nd Verification: Enter Master PIN (default: 9412) to authorize complete detachment:');
    if (pin === '9412' || pin) {
      appState.isMasterDetachPending = false;
      masterVerificationBanner?.classList.add('hidden');
      adminPendingBadge?.classList.add('hidden');

      document.getElementById('admin-user-safety-net').textContent = 'Detached';
      document.getElementById('caregiver-status-card').style.display = 'none';

      alert('⚖️ COMPLETE INDEPENDENCE AUTHORIZED: Master User approved total detachment. Eleanor Vance is now fully self-managing with all external monitoring severed.');

      if (auditLog) {
        const entry = document.createElement('div');
        entry.className = 'log-entry alert-log';
        entry.innerHTML = `
          <span class="log-time">Just Now</span>
          <span class="log-tag alert">Master 2FA Approved</span>
          <p>Master User verified PIN. Complete autonomy detachment executed.</p>
        `;
        auditLog.prepend(entry);
      }
    }
  });

  btnDeclineDetach?.addEventListener('click', () => {
    appState.isMasterDetachPending = false;
    masterVerificationBanner?.classList.add('hidden');
    adminPendingBadge?.classList.add('hidden');
    alert('Declined: A notification was sent to Eleanor to request a direct phone discussion before altering medical safety protocols.');
  });
}

// ==========================================================================
// 5. MASTER ADMIN COCKPIT CONTROLS
// ==========================================================================
function initMasterAdminCockpit() {
  const btnReplaceCaregiver = document.getElementById('btn-admin-replace-caregiver');
  const btnInstantScrub = document.getElementById('btn-admin-instant-scrub');
  const auditLog = document.getElementById('admin-audit-log');

  btnReplaceCaregiver?.addEventListener('click', () => {
    const newName = prompt('Enter new registered Caregiver / Nurse name:', 'Nurse Marcus Chen');
    if (newName) {
      document.getElementById('admin-caregiver-title').textContent = `Assigned Caregiver: ${newName}`;
      document.getElementById('sidebar-caregiver-name').textContent = 'Caregiver Active';
      document.getElementById('sidebar-caregiver-detail').textContent = `${newName} (Linked)`;
      alert(`Master Override: Caregiver replaced with ${newName}. Previous session revoked and rotated.`);

      const entry = document.createElement('div');
      entry.className = 'log-entry alert-log';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag alert">Master Reassignment</span>
        <p>Master User re-assigned Caregiver to ${newName}. Prior session revoked.</p>
      `;
      auditLog.prepend(entry);
    }
  });

  btnInstantScrub?.addEventListener('click', () => {
    if (confirm('Execute instant remote wipe? This will purge all cached medical records, prescriptions, and dose logs from the Caregiver device immediately.')) {
      alert('⚡ REMOTE DATA SCRUB EXECUTED: All patient data wiped from Caregiver device.');
      const entry = document.createElement('div');
      entry.className = 'log-entry alert-log';
      entry.innerHTML = `
        <span class="log-time">Just Now</span>
        <span class="log-tag alert">Remote Data Scrub</span>
        <p>Master User executed immediate remote wipe on Caregiver device.</p>
      `;
      auditLog.prepend(entry);
    }
  });
}

// ==========================================================================
// 6. NAVIGATION & TABS
// ==========================================================================
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      navButtons.forEach(b => b.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`view-${targetView}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

// ==========================================================================
// 7. CALENDAR
// ==========================================================================
function initCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  if (!calendarGrid) return;
  calendarGrid.innerHTML = '';

  const totalDays = 31;
  const startDayOffset = 3;

  let currentWeekSpend = 0;
  let dayCounter = 1;

  for (let row = 0; row < 5; row++) {
    currentWeekSpend = 0;

    for (let col = 0; col < 7; col++) {
      const slotIndex = row * 7 + col;
      const cell = document.createElement('div');
      cell.className = 'cal-cell';

      if (slotIndex < startDayOffset || dayCounter > totalDays) {
        cell.classList.add('density-zero');
        cell.style.opacity = '0.2';
        calendarGrid.appendChild(cell);
      } else {
        const thisDay = dayCounter;
        const dateStr = `2026-10-${thisDay < 10 ? '0' + thisDay : thisDay}`;

        const dayItems = appState.items.filter(item => item.date === dateStr);
        const dayExpenses = appState.expenses.filter(item => item.date === dateStr);
        const daySpendTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
        currentWeekSpend += daySpendTotal;

        const count = dayItems.length;
        const hasMissed = dayItems.some(item => item.isMissed);

        let densityClass = 'density-zero';
        let countText = '';

        if (count >= 1 && count <= 3) {
          densityClass = 'density-low';
          countText = `${count} task${count > 1 ? 's' : ''}`;
        } else if (count >= 4 && count <= 7) {
          densityClass = 'density-medium';
          countText = `${count} tasks`;
        } else if (count >= 8) {
          densityClass = 'density-high';
          countText = `${count} tasks`;
        }

        cell.classList.add(densityClass);
        if (hasMissed) cell.classList.add('has-alert');

        cell.innerHTML = `
          <div class="cal-date-number">
            <span>${thisDay}</span>
            ${hasMissed ? '<span class="missed-badge">! Missed</span>' : ''}
          </div>
          <div class="cal-task-meta">
            <span class="cal-task-count">${countText}</span>
          </div>
        `;

        cell.addEventListener('click', () => {
          openDayDetail(dateStr, thisDay, dayItems, daySpendTotal);
        });

        calendarGrid.appendChild(cell);
        dayCounter++;
      }
    }

    const weeklySpendCell = document.createElement('div');
    weeklySpendCell.className = 'weekly-spend-card';
    weeklySpendCell.innerHTML = `
      <span class="weekly-spend-label">Week ${row + 1}</span>
      <span class="weekly-spend-val">$${currentWeekSpend.toFixed(2)}</span>
    `;
    calendarGrid.appendChild(weeklySpendCell);
  }

  const totalMonthly = appState.expenses.reduce((sum, item) => sum + item.amount, 0);
  const monthTotalEl = document.getElementById('month-total-spend');
  if (monthTotalEl) monthTotalEl.textContent = `$${totalMonthly.toFixed(2)}`;

  const totalUpcomingBills = appState.upcomingBills.reduce((sum, b) => sum + b.amount, 0);
  const billsTotalEl = document.getElementById('month-bills-due');
  if (billsTotalEl) billsTotalEl.textContent = `$${totalUpcomingBills.toFixed(2)}`;
}

function openDayDetail(dateStr, dayNum, items, daySpend) {
  appState.selectedDate = dateStr;
  const modal = document.getElementById('day-detail-modal');
  const heading = document.getElementById('modal-date-heading');
  const spendEl = document.getElementById('modal-date-spend');
  const listEl = document.getElementById('drilldown-items-list');

  heading.textContent = `Thursday, October ${dayNum}, 2026`;
  spendEl.textContent = `Daily Expenditure: $${daySpend.toFixed(2)}`;
  listEl.innerHTML = '';

  if (items.length === 0) {
    listEl.innerHTML = `<div style="color:var(--text-muted); padding:20px; text-align:center;">No scheduled tasks or pills on this date. Clean day!</div>`;
  } else {
    const customEmojiMap = {};
    const standardItems = [];

    items.forEach(item => {
      if (item.module === 'custom' && item.emoji) {
        if (!customEmojiMap[item.emoji]) customEmojiMap[item.emoji] = [];
        customEmojiMap[item.emoji].push(item);
      } else {
        standardItems.push(item);
      }
    });

    standardItems.forEach(item => {
      const row = document.createElement('div');
      row.className = 'drilldown-row';
      const icon = item.module === 'pill' ? '💊' : item.module === 'payment' ? '💳' : item.module === 'fitness' ? '🏋️' : '📅';
      row.innerHTML = `
        <div class="drilldown-left">
          <span>${icon}</span>
          <div>
            <div class="drilldown-title">${item.title}</div>
            <div class="drilldown-time">${item.time} • ${item.detail}</div>
          </div>
        </div>
        <button class="btn-done ${item.done ? 'done' : ''}">${item.done ? '✓ Done' : 'Mark Done'}</button>
      `;
      listEl.appendChild(row);
    });

    for (const emoji in customEmojiMap) {
      const groupedList = customEmojiMap[emoji];
      groupedList.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'drilldown-row';
        row.innerHTML = `
          <div class="drilldown-left">
            <span>${emoji}</span>
            <div>
              <div class="drilldown-title">${item.title} <span class="badge-tag emoji-count">${emoji} ×${groupedList.length} Grouped</span></div>
              <div class="drilldown-time">${item.time} • ${item.detail}</div>
            </div>
          </div>
          <button class="btn-done ${item.done ? 'done' : ''}">${item.done ? '✓ Done' : 'Mark Done'}</button>
        `;
        listEl.appendChild(row);
      });
    }
  }

  modal.classList.add('active');
}

document.getElementById('btn-close-day-modal')?.addEventListener('click', () => {
  document.getElementById('day-detail-modal')?.classList.remove('active');
});
document.getElementById('btn-close-day-modal-alt')?.addEventListener('click', () => {
  document.getElementById('day-detail-modal')?.classList.remove('active');
});
document.getElementById('btn-add-to-this-date')?.addEventListener('click', () => {
  document.getElementById('day-detail-modal')?.classList.remove('active');
  openAddModal();
});

// ==========================================================================
// 8. UNIFIED FINANCES
// ==========================================================================
function initFinancesModule() {
  const btnBills = document.getElementById('btn-finance-bills');
  const btnLedger = document.getElementById('btn-finance-ledger');
  const subviewBills = document.getElementById('subview-bills');
  const subviewLedger = document.getElementById('subview-ledger');

  btnBills?.addEventListener('click', () => {
    btnBills.classList.add('active');
    btnLedger.classList.remove('active');
    subviewBills.classList.remove('hidden');
    subviewLedger.classList.add('hidden');
  });

  btnLedger?.addEventListener('click', () => {
    btnLedger.classList.add('active');
    btnBills.classList.remove('active');
    subviewLedger.classList.remove('hidden');
    subviewBills.classList.add('hidden');
    renderExpenseTable();
  });

  renderBillsGrid();
  renderExpenseTable();
}

function renderBillsGrid() {
  const billsGrid = document.getElementById('bills-grid');
  if (!billsGrid) return;
  billsGrid.innerHTML = '';

  if (appState.upcomingBills.length === 0) {
    billsGrid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <span class="empty-icon">💳</span>
        <div class="empty-title">All Bills Paid & Cleared</div>
        <p class="empty-desc">Zero upcoming bills due. Great job maintaining financial adherence!</p>
      </div>
    `;
    return;
  }

  appState.upcomingBills.forEach(bill => {
    const card = document.createElement('div');
    card.className = 'bill-card';
    card.innerHTML = `
      <div class="bill-head">
        <span class="bill-title">${bill.title}</span>
        <span class="bill-due-badge">${bill.status}</span>
      </div>
      <div class="bill-amount-row">
        <span class="bill-amount">$${bill.amount.toFixed(2)}</span>
        <span class="bill-link-info">🔗 Auto-links to Expenses</span>
      </div>
      <button class="btn-mark-bill-paid" data-id="${bill.id}">
        ✓ Mark Paid & Auto-Link to Ledger
      </button>
    `;

    const payBtn = card.querySelector('.btn-mark-bill-paid');
    payBtn.addEventListener('click', () => {
      appState.upcomingBills = appState.upcomingBills.filter(b => b.id !== bill.id);
      appState.expenses.unshift({
        date: '2026-10-15',
        category: bill.linkedCategory,
        title: bill.title,
        module: 'Payment-Linked',
        amount: bill.amount
      });
      alert(`Payment recorded! $${bill.amount.toFixed(2)} was automatically logged into your Spent Ledger under '${bill.linkedCategory}'.`);
      renderBillsGrid();
      renderExpenseTable();
      initCalendar();
    });

    billsGrid.appendChild(card);
  });
}

function renderExpenseTable() {
  const tbody = document.getElementById('expense-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (appState.expenses.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:32px; color:var(--text-muted);">
          No ledger transactions recorded yet. Mark a bill as paid or add an expense to populate.
        </td>
      </tr>
    `;
    return;
  }

  appState.expenses.forEach(exp => {
    const tr = document.createElement('tr');
    const isLinked = exp.module.includes('Linked');
    tr.innerHTML = `
      <td>${exp.date}</td>
      <td><strong>${exp.category}</strong></td>
      <td>${exp.title}</td>
      <td>
        <span class="source-badge ${isLinked ? 'payment-linked' : 'manual'}">
          ${isLinked ? '🔗 ' + exp.module : 'Manual Entry'}
        </span>
      </td>
      <td><strong>$${exp.amount.toFixed(2)}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================================================
// 9. HEALTH & ROUTINES
// ==========================================================================
function initRoutinesModule() {
  const stream = document.getElementById('reminders-stream');
  const tabs = document.querySelectorAll('.filter-tab');
  if (!stream) return;

  function renderStream(subdomain = 'all') {
    stream.innerHTML = '';
    const filtered = subdomain === 'all' 
      ? appState.items.filter(i => ['pill', 'appointment', 'custom'].includes(i.module))
      : appState.items.filter(i => i.module === subdomain);

    if (filtered.length === 0) {
      stream.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-icon">💊</span>
          <div class="empty-title">No Active Prescriptions or Habits</div>
          <p class="empty-desc">Your daily medication stream is clean. Tap '+ New Entry' or switch state in the UX Lab.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `reminder-card ${item.module}`;
      
      let icon = '⏰';
      let badgeHtml = '';
      if (item.module === 'pill') {
        icon = '💊';
        badgeHtml = '<span class="badge-tag med-id">Medical ID</span>';
      } else if (item.module === 'appointment') {
        icon = '📅';
      } else if (item.module === 'custom') {
        icon = item.emoji || '✨';
        badgeHtml = '<span class="badge-tag emoji-count">Habit Streak</span>';
      }

      card.innerHTML = `
        <div class="reminder-icon-box">${icon}</div>
        <div class="reminder-main">
          <div class="reminder-title-row">
            <span class="reminder-title">${item.title}</span>
            ${badgeHtml}
          </div>
          <div class="reminder-sub">${item.date} • ${item.time} • ${item.detail}</div>
        </div>
        <div class="reminder-actions">
          <button class="btn-done ${item.done ? 'done' : ''}">${item.done ? '✓ Done' : 'Mark Completed'}</button>
        </div>
      `;
      stream.appendChild(card);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStream(tab.getAttribute('data-subdomain'));
    });
  });

  renderStream('all');
}

// ==========================================================================
// 10. UNIVERSAL SPOTLIGHT SEARCH (Ctrl + K)
// ==========================================================================
function initSpotlightSearch() {
  const modal = document.getElementById('search-modal');
  const trigger = document.getElementById('btn-trigger-search');
  const input = document.getElementById('spotlight-input');
  const results = document.getElementById('spotlight-results');
  const btnClose = document.getElementById('btn-close-search');

  function openSearch() {
    modal.classList.add('active');
    input.value = '';
    renderSearchResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('active');
  }

  trigger?.addEventListener('click', openSearch);
  btnClose?.addEventListener('click', closeSearch);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });

  input?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });

  function renderSearchResults(query) {
    results.innerHTML = '';
    
    const taskMatches = appState.items.filter(item => 
      !query || item.title.toLowerCase().includes(query) || item.detail.toLowerCase().includes(query)
    );

    const expenseMatches = appState.expenses.filter(exp =>
      !query || exp.title.toLowerCase().includes(query) || exp.category.toLowerCase().includes(query)
    );

    if (taskMatches.length === 0 && expenseMatches.length === 0) {
      results.innerHTML = `<div style="padding:24px; text-align:center; color:var(--text-muted);">No matching pills, appointments, or bills found.</div>`;
      return;
    }

    taskMatches.slice(0, 5).forEach(item => {
      const div = document.createElement('div');
      div.className = 'spotlight-result-item';
      const icon = item.module === 'pill' ? '💊' : item.module === 'appointment' ? '📅' : item.module === 'payment' ? '💳' : '🏋️';
      div.innerHTML = `
        <div class="result-main">
          <span>${icon}</span>
          <div>
            <strong>${item.title}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.date} • ${item.time}</div>
          </div>
        </div>
        <span class="result-tag" style="background:rgba(99,102,241,0.15); color:#a5b4fc;">${item.module.toUpperCase()}</span>
      `;
      div.addEventListener('click', () => {
        closeSearch();
        alert(`Navigated to: ${item.title} (${item.module})`);
      });
      results.appendChild(div);
    });

    expenseMatches.slice(0, 3).forEach(exp => {
      const div = document.createElement('div');
      div.className = 'spotlight-result-item';
      div.innerHTML = `
        <div class="result-main">
          <span>💰</span>
          <div>
            <strong>${exp.title} ($${exp.amount.toFixed(2)})</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${exp.date} • ${exp.category}</div>
          </div>
        </div>
        <span class="result-tag" style="background:rgba(34,197,94,0.15); color:#4ade80;">FINANCE</span>
      `;
      div.addEventListener('click', () => {
        closeSearch();
        alert(`Navigated to Expense: ${exp.title}`);
      });
      results.appendChild(div);
    });
  }
}

// ==========================================================================
// 11. MODULE-FIRST "+" INGESTION MODAL
// ==========================================================================
function initModuleAddModal() {
  const addModal = document.getElementById('add-entry-modal');
  const btnOpen = document.getElementById('btn-open-add-modal');
  const btnClose = document.getElementById('btn-close-add-modal');
  const btnCancel = document.getElementById('btn-cancel-add');
  const step1 = document.getElementById('add-step-1');
  const step2 = document.getElementById('add-step-2');
  const btnBack = document.getElementById('btn-back-to-modules');
  const btnSubmit = document.getElementById('btn-submit-entry');
  const dynamicForm = document.getElementById('dynamic-entry-form');
  const moduleBadge = document.getElementById('selected-module-name');

  btnOpen?.addEventListener('click', openAddModal);
  btnClose?.addEventListener('click', closeAddModal);
  btnCancel?.addEventListener('click', closeAddModal);

  function openAddModal() {
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    btnSubmit.classList.add('hidden');
    addModal.classList.add('active');
  }

  function closeAddModal() {
    addModal.classList.remove('active');
  }

  btnBack?.addEventListener('click', () => {
    step2.classList.add('hidden');
    btnSubmit.classList.add('hidden');
    step1.classList.remove('hidden');
  });

  const choiceCards = document.querySelectorAll('.module-choice-card');
  choiceCards.forEach(card => {
    card.addEventListener('click', () => {
      const moduleType = card.getAttribute('data-module');
      renderDynamicForm(moduleType);
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      btnSubmit.classList.remove('hidden');
    });
  });

  function renderDynamicForm(type) {
    if (type === 'pill') {
      moduleBadge.textContent = '💊 Pill Reminder (Medical ID)';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Drug / Medication Name</label>
          <input type="text" id="form-pill-name" placeholder="e.g. Metformin, Lisinopril..." required />
        </div>
        <div class="form-group">
          <label>Dosage & Strength</label>
          <input type="text" id="form-pill-dosage" placeholder="e.g. 500mg, 1 tablet" />
        </div>
        <div class="form-group">
          <label>Schedule / Frequency</label>
          <select id="form-pill-freq">
            <option>Once daily (Morning - 8:00 AM)</option>
            <option>Twice daily (8:00 AM, 8:00 PM)</option>
            <option>Three times daily (Meals)</option>
            <option>As needed (PRN)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Expiry Date</label>
          <input type="date" value="2027-04-30" />
        </div>
      `;
    } else if (type === 'payment') {
      moduleBadge.textContent = '💳 Bill / Payment (Finances Hub)';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Bill Title</label>
          <input type="text" placeholder="e.g. Electric Utility, Health Insurance..." required />
        </div>
        <div class="form-group">
          <label>Amount ($ USD)</label>
          <input type="number" placeholder="0.00" step="0.01" />
        </div>
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" value="${appState.selectedDate}" />
        </div>
        <div class="toggle-row">
          <input type="checkbox" id="auto-link-expense" checked />
          <label for="auto-link-expense"><strong>Auto-link to Spent Ledger</strong> when marked paid</label>
        </div>
      `;
    } else if (type === 'appointment') {
      moduleBadge.textContent = '📅 Calendar Appointment';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Appointment Title</label>
          <input type="text" placeholder="e.g. Dr. Vance Consultation, Dentist" required />
        </div>
        <div class="form-group">
          <label>Location / Room</label>
          <input type="text" placeholder="Clinic Address or Room Number" />
        </div>
        <div class="form-group">
          <label>Date & Time Slot</label>
          <div style="display:flex; gap:10px;">
            <input type="date" value="${appState.selectedDate}" style="flex:1;" />
            <input type="time" value="10:00" style="flex:1;" />
          </div>
        </div>
      `;
    } else if (type === 'fitness') {
      moduleBadge.textContent = '🏋️ Fitness Routine Entry';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Routine Title</label>
          <input type="text" placeholder="e.g. Upper Body Strength, 5K Run..." />
        </div>
        <div class="form-group">
          <label>Target Date</label>
          <input type="date" value="${appState.selectedDate}" />
        </div>
      `;
    } else if (type === 'custom') {
      moduleBadge.textContent = '✨ Custom Habit';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Habit Name</label>
          <input type="text" placeholder="e.g. Daily Guitar Lesson, Meditation..." />
        </div>
        <div class="form-group">
          <label>Emoji (Enforces same-day grouping rule: 🎸 ×2)</label>
          <input type="text" value="🎸" style="font-size:1.4rem; width:80px;" />
        </div>
      `;
    }
  }

  btnSubmit?.addEventListener('click', () => {
    alert('Entry created! It has been automatically routed to its module and aggregated onto the Master Calendar.');
    closeAddModal();
    initCalendar();
  });
}

// ==========================================================================
// 12. ESCALATION & FITNESS
// ==========================================================================
function initEscalationLadder() {
  const btnOpen = document.getElementById('btn-escalation-demo');
  const modal = document.getElementById('escalation-modal');
  const btnClose = document.getElementById('btn-close-escalation');
  const btnRun = document.getElementById('btn-run-escalation');
  const btnReset = document.getElementById('btn-reset-escalation');

  const s1 = document.getElementById('ladder-step-1');
  const s2 = document.getElementById('ladder-step-2');
  const s3 = document.getElementById('ladder-step-3');

  btnOpen?.addEventListener('click', () => modal.classList.add('active'));
  btnClose?.addEventListener('click', () => modal.classList.remove('active'));

  function resetSteps() {
    [s1, s2, s3].forEach(s => s.classList.remove('active'));
    s1.querySelector('.step-status').textContent = 'Pending trigger...';
    s2.querySelector('.step-status').textContent = 'Waiting...';
    s3.querySelector('.step-status').textContent = 'Waiting...';
  }

  btnReset?.addEventListener('click', resetSteps);

  btnRun?.addEventListener('click', () => {
    resetSteps();
    s1.classList.add('active');
    s1.querySelector('.step-status').textContent = '🔔 TRIGGERED: Gentle chime on User device.';

    setTimeout(() => {
      s2.classList.add('active');
      s2.querySelector('.step-status').textContent = '⚠️ ESCALATED (T+5m): High vibration & urgent alert on User device.';
    }, 1200);

    setTimeout(() => {
      s3.classList.add('active');
      s3.querySelector('.step-status').textContent = '🚨 DISTRESS PUSH (T+12m): Dispatched to Caregiver phone with Full Medical ID & Rx details.';
    }, 2400);
  });
}

function initFitnessModule() {
  const streakCountEl = document.getElementById('fitness-streak-count');
  const btnSimulateMiss = document.getElementById('btn-simulate-miss');
  const chatInput = document.getElementById('ai-chat-input');
  const btnSendChat = document.getElementById('btn-send-ai-chat');
  const chatBox = document.getElementById('ai-chat-box');

  btnSimulateMiss?.addEventListener('click', () => {
    if (appState.streakDays > 0) {
      appState.streakDays -= 1;
      streakCountEl.textContent = `${appState.streakDays} Days`;
      alert(`Smart Streak Penalty: Deducted -1 day (Current: ${appState.streakDays} days). Did not reset to 0!`);
    }
  });

  btnSendChat?.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);
    chatInput.value = '';

    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-bubble ai';
      aiMsg.innerHTML = `
        <strong>AI Plan Generated:</strong><br>
        • Day 1: Dumbbell Bench Press + Rows (3x10)<br>
        • Day 2: Goblet Squats + Romanian Deadlifts (3x12)<br>
        <em>Saved to calendar. Edits you make become your ground truth!</em>
      `;
      chatBox.appendChild(aiMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
  });
}

// ==========================================================================
// 13. UX DESIGN LAB & TESTING SUITE (NIFT & INDUSTRY STANDARDS)
// ==========================================================================
function initUXTestingStudio() {
  const launcher = document.getElementById('btn-toggle-ux-dock');
  const dock = document.getElementById('ux-dock-panel');
  const btnMinimize = document.getElementById('btn-minimize-ux-dock');
  const tabBtns = document.querySelectorAll('.ux-tab-btn');
  const tabContents = document.querySelectorAll('.ux-tab-content');

  // Toggle dock open/close
  launcher?.addEventListener('click', () => {
    dock?.classList.toggle('active');
  });
  btnMinimize?.addEventListener('click', () => {
    dock?.classList.remove('active');
  });

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-uxtab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`uxtab-${targetTab}`)?.classList.add('active');
    });
  });

  // ------------------------------------------------------------------------
  // A. STATE MACHINE SIMULATOR (Ideal, Empty, Loading, Offline)
  // ------------------------------------------------------------------------
  const stateCards = document.querySelectorAll('.ux-state-card');
  const offlineBanner = document.getElementById('offline-status-banner');
  const btnRestoreOnline = document.getElementById('btn-restore-online');

  stateCards.forEach(card => {
    card.addEventListener('click', () => {
      stateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const chosenState = card.getAttribute('data-state');
      applyInterfaceState(chosenState);
    });
  });

  function applyInterfaceState(state) {
    if (state === 'ideal') {
      // Restore populated baseline data
      appState.items = JSON.parse(JSON.stringify(baselineData.items));
      appState.upcomingBills = JSON.parse(JSON.stringify(baselineData.upcomingBills));
      appState.expenses = JSON.parse(JSON.stringify(baselineData.expenses));
      offlineBanner?.classList.add('hidden');

      initCalendar();
      initRoutinesModule();
      renderBillsGrid();
      renderExpenseTable();
      alert('🌟 IDEAL / POPULATED STATE LOADED: October 2026 active day restored with Royal Violet high density, bills, and ledger records.');
    } else if (state === 'empty') {
      // Simulate Day 1 onboarding with 0 items
      appState.items = [];
      appState.upcomingBills = [];
      appState.expenses = [];
      offlineBanner?.classList.add('hidden');

      initCalendar();
      initRoutinesModule();
      renderBillsGrid();
      renderExpenseTable();
      alert('📭 EMPTY STATE LOADED: Simulating new user onboarding on Day 1. Notice clean calendar cells, zero spend, and friendly module prompts.');
    } else if (state === 'loading') {
      // Simulate Skeleton Loading
      const cells = document.querySelectorAll('.cal-cell');
      cells.forEach(c => c.classList.add('is-skeleton'));

      const stream = document.getElementById('reminders-stream');
      if (stream) {
        stream.innerHTML = `
          <div class="skeleton-box" style="height:70px; margin-bottom:12px;"></div>
          <div class="skeleton-box" style="height:70px; margin-bottom:12px;"></div>
          <div class="skeleton-box" style="height:70px;"></div>
        `;
      }

      const billsGrid = document.getElementById('bills-grid');
      if (billsGrid) {
        billsGrid.innerHTML = `
          <div class="skeleton-box" style="height:120px; border-radius:14px;"></div>
          <div class="skeleton-box" style="height:120px; border-radius:14px;"></div>
        `;
      }

      setTimeout(() => {
        // Re-render data after 1.8s
        appState.items = JSON.parse(JSON.stringify(baselineData.items));
        appState.upcomingBills = JSON.parse(JSON.stringify(baselineData.upcomingBills));
        appState.expenses = JSON.parse(JSON.stringify(baselineData.expenses));
        initCalendar();
        initRoutinesModule();
        renderBillsGrid();
        renderExpenseTable();
        document.getElementById('ux-state-ideal')?.classList.add('active');
        document.getElementById('ux-state-loading')?.classList.remove('active');
        alert('⏳ SKELETON LOADING SIMULATION COMPLETE: Data payload received and rendered.');
      }, 1800);
    } else if (state === 'offline') {
      // Simulate Offline Connection Drop
      offlineBanner?.classList.remove('hidden');
      alert('⚡ OFFLINE STATE ACTIVE: Network connection dropped. Local-First architecture engaged. Pill alarms & Medical ID records are cached locally.');
    }
  }

  btnRestoreOnline?.addEventListener('click', () => {
    offlineBanner?.classList.add('hidden');
    document.querySelectorAll('.ux-state-card').forEach(c => c.classList.remove('active'));
    document.getElementById('ux-state-ideal')?.classList.add('active');
    alert('🌐 NETWORK RESTORED: App is back online and synchronized with remote cloud storage.');
  });

  // ------------------------------------------------------------------------
  // B. INTERACTIVE USER JOURNEYS RUNNER
  // ------------------------------------------------------------------------
  // Flow A: Senior Pill Adherence
  document.getElementById('btn-run-journey-senior')?.addEventListener('click', () => {
    dock?.classList.remove('active');
    // Switch to elderly profile
    const btnElderly = document.getElementById('btn-mode-elderly');
    btnElderly?.click();

    setTimeout(() => {
      const cards = document.querySelectorAll('.elderly-card');
      if (cards.length > 0) {
        const firstCard = cards[0];
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstCard.style.boxShadow = '0 0 30px #6366f1';
        firstCard.style.border = '2px solid #a5b4fc';

        const actionBtn = firstCard.querySelector('.btn-elderly-action');
        setTimeout(() => {
          actionBtn?.click();
          firstCard.style.boxShadow = '';
          firstCard.style.border = '';
          alert('✓ USER JOURNEY A PASSED: 76yo Senior Eleanor Vance marked Morning Metformin taken. Auto-sync pushed to Dr. Elena Rostova and Master Oversight Cockpit!');
        }, 1200);
      }
    }, 400);
  });

  // Flow B: Missed Medication Escalation
  document.getElementById('btn-run-journey-escalation')?.addEventListener('click', () => {
    dock?.classList.remove('active');
    const escBtn = document.getElementById('btn-escalation-demo');
    escBtn?.click();

    setTimeout(() => {
      const runLadderBtn = document.getElementById('btn-run-escalation');
      runLadderBtn?.click();
    }, 500);
  });

  // Flow C: Bill Payment -> Spent Ledger Auto-Link
  document.getElementById('btn-run-journey-bill')?.addEventListener('click', () => {
    dock?.classList.remove('active');
    // Switch to finances
    document.getElementById('nav-finance')?.click();
    document.getElementById('btn-finance-bills')?.click();

    setTimeout(() => {
      const firstPayBtn = document.querySelector('.btn-mark-bill-paid');
      if (firstPayBtn) {
        firstPayBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstPayBtn.style.boxShadow = '0 0 24px #22c55e';

        setTimeout(() => {
          firstPayBtn.click();
          firstPayBtn.style.boxShadow = '';
          // Switch to Spent Ledger tab to view updated ledger
          setTimeout(() => {
            document.getElementById('btn-finance-ledger')?.click();
          }, 800);
        }, 1200);
      }
    }, 400);
  });

  // Flow D: Senior Autonomy & Master 2FA Sign-off
  document.getElementById('btn-run-journey-autonomy')?.addEventListener('click', () => {
    dock?.classList.remove('active');
    document.getElementById('btn-mode-elderly')?.click();

    setTimeout(() => {
      document.getElementById('btn-elderly-trigger-override')?.click();
      setTimeout(() => {
        document.getElementById('btn-request-master-verification')?.click();
        setTimeout(() => {
          document.getElementById('role-admin-btn')?.click();
          const banner = document.getElementById('master-verification-banner');
          banner?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
      }, 800);
    }, 400);
  });

  // ------------------------------------------------------------------------
  // C. FITTS'S LAW TOUCH TARGET INSPECTOR
  // ------------------------------------------------------------------------
  const btnToggleFitts = document.getElementById('btn-toggle-fitts');
  const fittsStatusPill = document.getElementById('fitts-status-pill');
  let isFittsActive = false;

  btnToggleFitts?.addEventListener('click', () => {
    isFittsActive = !isFittsActive;
    document.body.classList.toggle('fitts-overlay-active', isFittsActive);
    fittsStatusPill.textContent = isFittsActive ? 'ACTIVE' : 'OFF';
    fittsStatusPill.classList.toggle('on', isFittsActive);

    // Remove existing badges
    document.querySelectorAll('.fitts-dimension-badge').forEach(b => b.remove());

    if (isFittsActive) {
      const targets = document.querySelectorAll(
        'button, .cal-cell, .nav-item, .filter-tab, .universal-search-trigger'
      );

      targets.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const badge = document.createElement('span');
          badge.className = 'fitts-dimension-badge';
          const w = Math.round(rect.width);
          const h = Math.round(rect.height);
          const isSeniorPass = w >= 56 && h >= 56;
          const isMobilePass = w >= 44 && h >= 44;

          badge.textContent = `${w}×${h}px ${isSeniorPass ? '★ 56dp' : isMobilePass ? '✓ HIG' : ''}`;
          if (isSeniorPass) {
            badge.style.background = '#a855f7';
            badge.style.color = '#fff';
          } else if (!isMobilePass) {
            badge.style.background = '#f59e0b';
            badge.style.color = '#000';
          }
          el.appendChild(badge);
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // D. UX LAWS & DESIGN TOKENS MODALS
  // ------------------------------------------------------------------------
  const btnOpenLaws = document.getElementById('btn-open-laws-guide');
  const lawsModal = document.getElementById('ux-laws-modal');
  const btnCloseLaws = document.getElementById('btn-close-laws-modal');

  btnOpenLaws?.addEventListener('click', () => lawsModal?.classList.add('active'));
  btnCloseLaws?.addEventListener('click', () => lawsModal?.classList.remove('active'));

  const btnOpenTokens = document.getElementById('btn-open-tokens-modal');
  const tokensModal = document.getElementById('ux-tokens-modal');
  const btnCloseTokens = document.getElementById('btn-close-tokens-modal');

  btnOpenTokens?.addEventListener('click', () => tokensModal?.classList.add('active'));
  btnCloseTokens?.addEventListener('click', () => tokensModal?.classList.remove('active'));

  // ------------------------------------------------------------------------
  // E. LIVE USABILITY TASK-COMPLETION TEST RUNNER (PHASE 5)
  // ------------------------------------------------------------------------
  const btnStartTest = document.getElementById('btn-start-usability-test');
  const testHud = document.getElementById('usability-test-hud');
  const hudTimer = document.getElementById('hud-timer');
  const hudClicks = document.getElementById('hud-clicks');
  const btnFinishTest = document.getElementById('btn-finish-usability-test');
  const btnCancelTest = document.getElementById('btn-cancel-usability-test');
  const scorecardModal = document.getElementById('usability-scorecard-modal');
  const btnCloseScorecard = document.getElementById('btn-close-scorecard');
  const btnCloseScorecardAlt = document.getElementById('btn-close-scorecard-alt');

  let testActive = false;
  let testSeconds = 0;
  let testClicks = 0;
  let timerInterval = null;

  btnStartTest?.addEventListener('click', () => {
    dock?.classList.remove('active');
    testActive = true;
    testSeconds = 0;
    testClicks = 0;
    hudTimer.textContent = '00:00';
    hudClicks.textContent = '0 clicks';
    testHud?.classList.remove('hidden');

    // Switch to home view to ensure clean start
    document.getElementById('nav-home')?.click();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      testSeconds++;
      const mins = Math.floor(testSeconds / 60);
      const secs = testSeconds % 60;
      hudTimer.textContent = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    }, 1000);

    alert('⏱️ USABILITY TEST STARTED!\n\nYour Objectives:\n1. Click + New Entry and schedule an entry for Oct 18.\n2. Go to Finances and mark the Electric Utility Bill as paid.\n\nInteract naturally. The HUD is tracking your time and interaction count.');
  });

  window.addEventListener('click', (e) => {
    if (testActive && !testHud.contains(e.target)) {
      testClicks++;
      hudClicks.textContent = `${testClicks} clicks`;
    }
  });

  btnFinishTest?.addEventListener('click', () => {
    testActive = false;
    clearInterval(timerInterval);
    testHud?.classList.add('hidden');

    const mins = Math.floor(testSeconds / 60);
    const secs = testSeconds % 60;
    const timeFormatted = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;

    document.getElementById('scorecard-time').textContent = timeFormatted;
    document.getElementById('scorecard-clicks').textContent = `${testClicks}`;

    // Calculate SUS rating (higher if under 45s and < 15 clicks)
    let susScore = 95;
    if (testSeconds > 40) susScore -= 5;
    if (testClicks > 12) susScore -= 5;
    document.getElementById('scorecard-sus-val').textContent = `${susScore}`;

    scorecardModal?.classList.add('active');
  });

  btnCancelTest?.addEventListener('click', () => {
    testActive = false;
    clearInterval(timerInterval);
    testHud?.classList.add('hidden');
    alert('Usability test canceled.');
  });

  btnCloseScorecard?.addEventListener('click', () => scorecardModal?.classList.remove('active'));
  btnCloseScorecardAlt?.addEventListener('click', () => scorecardModal?.classList.remove('active'));
}

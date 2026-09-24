// ==========================================================================
// OMNITASK — INTERACTIVE IA & WIREFRAME CONTROLLER
// ==========================================================================

// Global state modeled on the IA spec
const appState = {
  activeRole: 'user', // 'user' | 'caregiver' | 'admin'
  streakDays: 14,
  selectedDate: '2026-10-15',
  
  // Tasks aggregated across modules
  items: [
    { id: '1', date: '2026-10-02', module: 'pill', title: 'Aspirin 81mg', time: '08:00 AM', detail: 'Dosage: 1 tab • Medical ID #8210', done: true, spend: 0 },
    { id: '2', date: '2026-10-02', module: 'fitness', title: 'Morning 5K Jog', time: '07:00 AM', detail: 'Zone 2 cardio • 30 mins', done: true, spend: 0 },
    { id: '3', date: '2026-10-05', module: 'payment', title: 'Internet Broadband Bill', time: '09:00 AM', detail: 'Due today • Auto-link to Bills', done: true, spend: 65.0 },
    
    // Day with 6 items (Orange medium density)
    { id: '4', date: '2026-10-10', module: 'pill', title: 'Metformin 500mg', time: '08:00 AM', detail: 'Dosage: 1 tab with breakfast', done: true, spend: 0 },
    { id: '5', date: '2026-10-10', module: 'appointment', title: 'Dental Cleaning', time: '11:00 AM', detail: 'Dr. Vance Clinic', done: false, spend: 120.0 },
    { id: '6', date: '2026-10-10', module: 'custom', title: 'Guitar Practice', emoji: '🎸', time: '03:00 PM', detail: 'Scale practice', done: true, spend: 0 },
    { id: '7', date: '2026-10-10', module: 'custom', title: 'Guitar Song Writing', emoji: '🎸', time: '05:30 PM', detail: 'Chord progression', done: true, spend: 0 },
    { id: '8', date: '2026-10-10', module: 'fitness', title: 'Chest & Triceps Routine', time: '06:30 PM', detail: 'Planned workout', done: false, spend: 0 },
    { id: '9', date: '2026-10-10', module: 'expense', title: 'Grocery Restock', time: '07:45 PM', detail: 'Whole Foods Market', done: true, spend: 85.5 },

    // Day with 9 items (Red sharp high density)
    { id: '10', date: '2026-10-15', module: 'pill', title: 'Morning Metformin 500mg', time: '08:00 AM', detail: 'Dosage: 1 tab • Rx #4912', done: true, spend: 0 },
    { id: '11', date: '2026-10-15', module: 'pill', title: 'Lisinopril 10mg', time: '08:30 AM', detail: 'Blood pressure • Rx #3108', done: true, spend: 0 },
    { id: '12', date: '2026-10-15', module: 'payment', title: 'Apartment Rent Check', time: '09:00 AM', detail: 'Monthly rent • Paid', done: true, spend: 1100.0 },
    { id: '13', date: '2026-10-15', module: 'fitness', title: 'Upper Body Hypertrophy', time: '10:30 AM', detail: 'AI generated & user edited', done: false, spend: 0 },
    { id: '14', date: '2026-10-15', module: 'appointment', title: 'Cardiologist Follow-up', time: '02:00 PM', detail: 'Metropolitan Hospital', done: false, spend: 40.0 },
    { id: '15', date: '2026-10-15', module: 'custom', title: 'Spanish Duolingo', emoji: '🇪🇸', time: '04:00 PM', detail: 'Daily streak', done: true, spend: 0 },
    { id: '16', date: '2026-10-15', module: 'custom', title: 'Guitar Lesson', emoji: '🎸', time: '05:00 PM', detail: 'With instructor', done: false, spend: 50.0 },
    { id: '17', date: '2026-10-15', module: 'custom', title: 'Guitar Fingerpicking', emoji: '🎸', time: '06:00 PM', detail: 'Acoustic drills', done: false, spend: 0 },
    { id: '18', date: '2026-10-15', module: 'pill', title: 'Evening Atorvastatin 20mg', time: '09:00 PM', detail: 'Cholesterol • Rx #9941', done: false, spend: 0 },

    // Day with 3 items (Green soft low density)
    { id: '19', date: '2026-10-22', module: 'pill', title: 'Multivitamin', time: '09:00 AM', detail: 'Daily supplement', done: false, spend: 0 },
    { id: '20', date: '2026-10-22', module: 'fitness', title: 'Legs & Core', time: '05:00 PM', detail: 'Home workout', done: false, spend: 0 },
    { id: '21', date: '2026-10-22', module: 'payment', title: 'Electric Utility Bill', time: '08:00 AM', detail: 'Due in 3 days', done: false, spend: 75.0 },
  ],

  // Expenses ledger entries (both manual and auto-linked from payments)
  expenses: [
    { date: '2026-10-03', category: 'Groceries', title: 'Weekly Market Run', module: 'Manual', amount: 92.50 },
    { date: '2026-10-05', category: 'Bills', title: 'Internet Broadband Bill', module: 'Payment-Linked', amount: 65.00 },
    { date: '2026-10-10', category: 'Health', title: 'Dental Co-Pay', module: 'Appointment-Linked', amount: 120.00 },
    { date: '2026-10-10', category: 'Groceries', title: 'Whole Foods Market', module: 'Manual', amount: 85.50 },
    { date: '2026-10-15', category: 'Housing', title: 'Apartment Rent Check', module: 'Payment-Linked', amount: 1100.00 },
    { date: '2026-10-15', category: 'Health', title: 'Doctor Consultation', module: 'Appointment-Linked', amount: 40.00 },
    { date: '2026-10-15', category: 'Education', title: 'Guitar Music Coaching', module: 'Custom-Linked', amount: 50.00 },
  ]
};

// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCalendar();
  initRemindersHub();
  initExpenseTable();
  initModuleAddModal();
  initEscalationLadder();
  initFitnessModule();
  initRevocationAndOnboarding();
  initRoleSwitcher();
});

// ==========================================================================
// 1. NAVIGATION & TABS
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
// 2. CALENDAR RENDERING & IA DENSITY SYSTEM
// ==========================================================================
function initCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  if (!calendarGrid) return;
  calendarGrid.innerHTML = '';

  // October 2026 starts on Thursday (1st)
  // Total 31 days in October 2026
  const totalDays = 31;
  const startDayOffset = 3; // Monday = 0, Thu = 3

  let currentWeekSpend = 0;
  let currentWeekDays = 0;
  let dayCounter = 1;

  // Render 5 weeks (35 day slots + 5 weekly spend cells = 40 cells)
  for (let row = 0; row < 5; row++) {
    currentWeekSpend = 0;

    for (let col = 0; col < 7; col++) {
      const slotIndex = row * 7 + col;
      const cell = document.createElement('div');
      cell.className = 'cal-cell';

      if (slotIndex < startDayOffset || dayCounter > totalDays) {
        // Empty / padding day
        cell.classList.add('density-zero');
        cell.style.opacity = '0.2';
        calendarGrid.appendChild(cell);
      } else {
        const thisDay = dayCounter;
        const dateStr = `2026-10-${thisDay < 10 ? '0' + thisDay : thisDay}`;

        // Find items for this date
        const dayItems = appState.items.filter(item => item.date === dateStr);
        const dayExpenses = appState.expenses.filter(item => item.date === dateStr);
        const daySpendTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
        currentWeekSpend += daySpendTotal;

        const count = dayItems.length;

        // Apply IA density rules
        let densityClass = 'density-zero';
        let countText = 'No items';

        if (count >= 1 && count <= 4) {
          densityClass = 'density-low'; // Soft rounded green
          countText = `${count} task${count > 1 ? 's' : ''}`;
        } else if (count >= 5 && count <= 7) {
          densityClass = 'density-medium'; // Orange
          countText = `${count} tasks`;
        } else if (count >= 8) {
          densityClass = 'density-high'; // Sharp crimson
          countText = `${count} tasks (High)`;
        }

        cell.classList.add(densityClass);
        cell.innerHTML = `
          <div class="cal-date-number">${thisDay}</div>
          <div class="cal-task-meta">
            <span class="cal-task-count">${count > 0 ? countText : ''}</span>
          </div>
        `;

        cell.addEventListener('click', () => {
          openDayDetail(dateStr, thisDay, dayItems, daySpendTotal);
        });

        calendarGrid.appendChild(cell);
        dayCounter++;
      }
    }

    // 8th column: Weekly spend breakdown card
    const weeklySpendCell = document.createElement('div');
    weeklySpendCell.className = 'weekly-spend-card';
    weeklySpendCell.innerHTML = `
      <span class="weekly-spend-label">Week ${row + 1}</span>
      <span class="weekly-spend-val">$${currentWeekSpend.toFixed(2)}</span>
    `;
    calendarGrid.appendChild(weeklySpendCell);
  }

  // Update total monthly spend
  const totalMonthly = appState.expenses.reduce((sum, item) => sum + item.amount, 0);
  const monthTotalEl = document.getElementById('month-total-spend');
  if (monthTotalEl) monthTotalEl.textContent = `$${totalMonthly.toFixed(2)}`;
}

// Day Drilldown Modal
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
    // Group custom items by emoji per IA rule (e.g. 🎸 ×2)
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

    // Render standard items
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

    // Render grouped custom emoji items
    for (const emoji in customEmojiMap) {
      const groupedList = customEmojiMap[emoji];
      const countBadge = groupedList.length > 1 ? ` (${emoji} ×${groupedList.length})` : '';
      groupedList.forEach((item, idx) => {
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

// Close day modal listeners
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
// 3. MODULE-FIRST "+" INGESTION MODAL
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

  // Step 1: Picking a module
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

  // Step 2: Ingest module-specific fields based on IA spec
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
            <option>Three times daily (Breakfast, Lunch, Dinner)</option>
            <option>As needed (PRN)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Expiry Date</label>
          <input type="date" value="2027-04-30" />
        </div>
        <div class="form-group">
          <label>Pill / Box Photo (Medical ID verification)</label>
          <input type="file" accept="image/*" />
        </div>
      `;
    } else if (type === 'payment') {
      moduleBadge.textContent = '💳 Payment Reminder (Auto-Expense Link)';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Bill / Payment Title</label>
          <input type="text" id="form-pay-title" placeholder="e.g. Electric Utility, Health Insurance..." required />
        </div>
        <div class="form-group">
          <label>Amount ($ USD)</label>
          <input type="number" id="form-pay-amount" placeholder="0.00" step="0.01" />
        </div>
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" value="${appState.selectedDate}" />
        </div>
        <div class="form-group">
          <label>Pre-Alert Notification</label>
          <select>
            <option>3 days before</option>
            <option>5 days before</option>
            <option>Same day at 9:00 AM</option>
          </select>
        </div>
        <div class="toggle-row">
          <input type="checkbox" id="auto-link-expense" checked />
          <label for="auto-link-expense"><strong>Auto-link to Expense Ledger</strong> when marked paid (Bills category)</label>
        </div>
      `;
    } else if (type === 'fitness') {
      moduleBadge.textContent = '🏋️ Fitness Routine Entry';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Routine Title</label>
          <input type="text" placeholder="e.g. Upper Body Strength, Zone 2 Cardio..." />
        </div>
        <div class="form-group">
          <label>Target Date</label>
          <input type="date" value="${appState.selectedDate}" />
        </div>
        <div class="form-group">
          <label>Duration & Equipment</label>
          <input type="text" placeholder="45 min • Dumbbells & Yoga Mat" />
        </div>
      `;
    } else if (type === 'appointment') {
      moduleBadge.textContent = '📅 Lightweight Appointment';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Appointment Title</label>
          <input type="text" placeholder="e.g. Dr. Vance Consultation, Dentist" />
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" placeholder="Clinic Address or Room Number" />
        </div>
        <div class="form-group">
          <label>Time & Date</label>
          <input type="time" value="10:00" />
        </div>
      `;
    } else if (type === 'custom') {
      moduleBadge.textContent = '✨ Custom Category Habit';
      dynamicForm.innerHTML = `
        <div class="form-group">
          <label>Task / Habit Name</label>
          <input type="text" placeholder="e.g. Daily Guitar Lesson, Read 10 Pages..." />
        </div>
        <div class="form-group">
          <label>Choose Emoji (Enforces same-day grouping rule: 🎸 ×2)</label>
          <input type="text" value="🎸" style="font-size:1.4rem; width:80px;" />
        </div>
        <div class="form-group">
          <label>Tracking Mechanism</label>
          <select>
            <option>Checklist Streak (Did I do it today?)</option>
            <option>Numerical Target (Minutes / Quantity)</option>
          </select>
        </div>
      `;
    }
  }

  btnSubmit?.addEventListener('click', () => {
    alert('Entry saved successfully into its specific module and aggregated into the Master Calendar!');
    closeAddModal();
    initCalendar();
  });
}

// ==========================================================================
// 4. REMINDERS HUB
// ==========================================================================
function initRemindersHub() {
  const stream = document.getElementById('reminders-stream');
  const tabs = document.querySelectorAll('.filter-tab');
  if (!stream) return;

  function renderStream(subdomain = 'all') {
    stream.innerHTML = '';
    const filtered = subdomain === 'all' 
      ? appState.items.filter(i => ['pill', 'payment', 'appointment', 'custom'].includes(i.module))
      : appState.items.filter(i => i.module === subdomain);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `reminder-card ${item.module}`;
      
      let icon = '⏰';
      let badgeHtml = '';
      if (item.module === 'pill') {
        icon = '💊';
        badgeHtml = '<span class="badge-tag med-id">Medical ID Verified</span>';
      } else if (item.module === 'payment') {
        icon = '💳';
        badgeHtml = '<span class="badge-tag auto-linked">Auto-Links to Expenses</span>';
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
// 5. EXPENSE LEDGER
// ==========================================================================
function initExpenseTable() {
  const tbody = document.getElementById('expense-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

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
// 6. ESCALATION LADDER SIMULATOR (Pill Safety Protocol)
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
    
    // T = 0
    s1.classList.add('active');
    s1.querySelector('.step-status').textContent = '🔔 TRIGGERED: Gentle chime on User device.';

    // T + 5m
    setTimeout(() => {
      s2.classList.add('active');
      s2.querySelector('.step-status').textContent = '⚠️ ESCALATED (T+5m): High vibration & urgent alert on User device.';
    }, 1400);

    // T + 12m
    setTimeout(() => {
      s3.classList.add('active');
      s3.querySelector('.step-status').textContent = '🚨 DISTRESS PUSH (T+12m): Notification dispatched to Caregiver phone with Full Medical ID & Metformin details.';
    }, 2800);
  });
}

// ==========================================================================
// 7. FITNESS MODULE & SMART STREAK
// ==========================================================================
function initFitnessModule() {
  const streakCountEl = document.getElementById('fitness-streak-count');
  const btnSimulateMiss = document.getElementById('btn-simulate-miss');
  const chatInput = document.getElementById('ai-chat-input');
  const btnSendChat = document.getElementById('btn-send-ai-chat');
  const chatBox = document.getElementById('ai-chat-box');

  btnSimulateMiss?.addEventListener('click', () => {
    if (appState.streakDays > 0) {
      // IA Rule: Missed day reduces streak by 1 unit penalty, not complete zero reset
      appState.streakDays -= 1;
      streakCountEl.textContent = `${appState.streakDays} Days`;
      alert(`Smart Streak Rule Applied: Missed workout penalized by -1 day (Current: ${appState.streakDays} days). It did NOT reset to 0!`);
    }
  });

  btnSendChat?.addEventListener('click', sendAiPrompt);
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAiPrompt();
  });

  function sendAiPrompt() {
    const text = chatInput.value.trim();
    if (!text) return;

    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);
    chatInput.value = '';

    // Simulated AI response generating routine
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-bubble ai';
      aiMsg.innerHTML = `
        <strong>Draft Routine Created:</strong><br>
        • Day 1: Dumbbell Bench Press + Bent-Over Rows (3x10)<br>
        • Day 2: Dumbbell Goblet Squats + Romanian Deadlifts (3x12)<br>
        • Day 3: Pushups + Plank holds (15 mins)<br>
        <em>Saved as planned days. You can edit any exercise to make it your official goal!</em>
      `;
      chatBox.appendChild(aiMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
  }
}

// ==========================================================================
// 8. REVOCATION & ONBOARDING FLOWS
// ==========================================================================
function initRevocationAndOnboarding() {
  const btnOpenRevoke = document.getElementById('btn-open-revoke');
  const revokeModal = document.getElementById('revocation-modal');
  const btnCloseRevoke = document.getElementById('btn-close-revocation');
  const btnConfirmCode = document.getElementById('btn-confirm-code-revoke');
  const btnUnilateral = document.getElementById('btn-unilateral-revoke');
  const caregiverCard = document.getElementById('caregiver-status-card');

  btnOpenRevoke?.addEventListener('click', () => revokeModal.classList.add('active'));
  btnCloseRevoke?.addEventListener('click', () => revokeModal.classList.remove('active'));

  function tearDownCaregiver() {
    caregiverCard.style.display = 'none';
    revokeModal.classList.remove('active');
    alert('Caregiver access revoked immediately. All sensitive medical information wiped from former caregiver device.');
  }

  btnConfirmCode?.addEventListener('click', tearDownCaregiver);
  btnUnilateral?.addEventListener('click', tearDownCaregiver);

  // Onboarding Demo
  const btnOnboardingDemo = document.getElementById('btn-onboarding-demo');
  const onboardingModal = document.getElementById('onboarding-modal');
  const btnCloseOnboarding = document.getElementById('btn-close-onboarding');
  const btnCloseOnboardingAlt = document.getElementById('btn-close-onboarding-alt');

  btnOnboardingDemo?.addEventListener('click', () => onboardingModal.classList.add('active'));
  btnCloseOnboarding?.addEventListener('click', () => onboardingModal.classList.remove('active'));
  btnCloseOnboardingAlt?.addEventListener('click', () => onboardingModal.classList.remove('active'));
}

// ==========================================================================
// 9. ROLE SWITCHER
// ==========================================================================
function initRoleSwitcher() {
  const roleButtons = document.querySelectorAll('.role-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.activeRole = btn.getAttribute('data-role');
      alert(`Role switched to: ${appState.activeRole.toUpperCase()}. Permissions and view adapt accordingly.`);
    });
  });
}

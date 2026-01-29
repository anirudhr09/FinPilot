// ===== GOALS MANAGER =====
class GoalsManager {
  constructor() {
    this.goals = StorageManager.get('goals', []);
  }

  addGoal(name, targetAmount, deadline, priority) {
    const goal = {
      id: Date.now(),
      name,
      targetAmount: Number(targetAmount),
      currentAmount: 0,
      deadline,
      priority,
      created: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    this.goals.push(goal);
    StorageManager.set('goals', this.goals);
    return goal;
  }

  updateGoal(id, updates) {
    const goal = this.goals.find(g => g.id === id);
    if (goal) {
      Object.assign(goal, updates);
      StorageManager.set('goals', this.goals);
    }
  }

  removeGoal(id) {
    this.goals = this.goals.filter(g => g.id !== id);
    StorageManager.set('goals', this.goals);
  }

  addToGoal(id, amount) {
    const goal = this.goals.find(g => g.id === id);
    if (goal) {
      goal.currentAmount += Number(amount);
      goal.currentAmount = Math.min(goal.currentAmount, goal.targetAmount);
      StorageManager.set('goals', this.goals);
    }
  }

  getProgress(goal) {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  }

  getDaysRemaining(deadline) {
    const today = new Date();
    const target = new Date(deadline);
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

const goalsManager = new GoalsManager();

document.addEventListener("DOMContentLoaded", () => {
  renderGoals();
  attachEventListeners();
});

function renderGoals() {
  const container = document.querySelector(".goals-grid");
  if (!container) return;

  if (goalsManager.goals.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #64748b;">No goals yet. Click "Add Goal" to create one!</div>';
    return;
  }

  container.innerHTML = goalsManager.goals.map(goal => {
    const progress = goalsManager.getProgress(goal);
    const daysLeft = goalsManager.getDaysRemaining(goal.deadline);
    const priorityColors = {
      'high': '#ef4444',
      'medium': '#f59e0b',
      'low': '#10b981'
    };

    return `
      <div class="card goal-card" style="animation: fadeIn 0.3s ease-in;">
        <div class="goal-header">
          <h3>${goal.name}</h3>
          <span class="badge ${goal.priority}" style="background: ${priorityColors[goal.priority]};">
            ${goal.priority.toUpperCase()}
          </span>
        </div>
        <div class="goal-meta">
          Target: ₹${goal.targetAmount.toLocaleString()} • ${daysLeft > 0 ? daysLeft + ' days left' : 'Overdue'}
        </div>
        <div class="progress-bar">
          <div class="progress" style="width: ${progress}%"></div>
        </div>
        <div class="goal-progress">
          ₹${goal.currentAmount.toLocaleString()} / ₹${goal.targetAmount.toLocaleString()} (${Math.round(progress)}%)
        </div>
        <div style="margin-top: 14px; display: flex; gap: 8px;">
          <input type="number" placeholder="Add amount" id="amount-${goal.id}" style="flex: 1; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px;">
          <button onclick="addToGoal(${goal.id})" style="padding: 8px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">Add</button>
          <button onclick="deleteGoal(${goal.id})" style="padding: 8px 12px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function attachEventListeners() {
  const addBtn = document.querySelector(".page-header .btn-primary");
  if (addBtn) {
    addBtn.addEventListener("click", showAddGoalModal);
  }
}

function showAddGoalModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const form = document.createElement('div');
  form.style.cssText = `
    background: white;
    padding: 32px;
    border-radius: 14px;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  `;

  form.innerHTML = `
    <h3 style="margin-bottom: 24px; font-size: 20px; font-weight: 700;">Create New Goal</h3>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Goal Name</label>
      <input type="text" id="goalName" placeholder="e.g., Vacation Fund" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Target Amount (₹)</label>
      <input type="number" id="targetAmount" placeholder="50000" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Deadline</label>
      <input type="date" id="deadline" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Priority</label>
      <select id="priority" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div style="display: flex; gap: 12px;">
      <button id="cancelBtn" style="flex: 1; padding: 12px; border: 2px solid #e2e8f0; background: white; border-radius: 10px; cursor: pointer; font-weight: 600;">Cancel</button>
      <button id="submitBtn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Create Goal</button>
    </div>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  document.getElementById('cancelBtn').onclick = () => modal.remove();
  document.getElementById('submitBtn').onclick = () => {
    const name = document.getElementById('goalName').value.trim();
    const targetAmount = document.getElementById('targetAmount').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;

    if (!name || !targetAmount || !deadline) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    goalsManager.addGoal(name, targetAmount, deadline, priority);
    modal.remove();
    renderGoals();
    showNotification('Goal created successfully!', 'success');
  };

  document.getElementById('goalName').focus();
}

function addToGoal(id) {
  const input = document.getElementById(`amount-${id}`);
  const amount = input.value.trim();

  if (!amount || Number(amount) <= 0) {
    showNotification('Please enter a valid amount', 'error');
    return;
  }

  goalsManager.addToGoal(id, amount);
  input.value = '';
  renderGoals();
  showNotification('Amount added to goal!', 'success');
}

function deleteGoal(id) {
  if (confirm('Are you sure you want to delete this goal?')) {
    goalsManager.removeGoal(id);
    renderGoals();
    showNotification('Goal deleted', 'success');
  }
}

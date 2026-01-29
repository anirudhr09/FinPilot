// ===== EXPENSE TRACKER =====
class ExpenseTracker {
  constructor() {
    this.expenses = StorageManager.get('expenses', []);
    this.income = 50000;
  }

  addExpense(description, amount, category) {
    const expense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    this.expenses.push(expense);
    StorageManager.set('expenses', this.expenses);
    return expense;
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    StorageManager.set('expenses', this.expenses);
  }

  getTotalExpenses() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getExpensesByCategory() {
    const categories = {};
    this.expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });
    return categories;
  }

  getSavings() {
    return this.income - this.getTotalExpenses();
  }

  getRecentExpenses(limit = 10) {
    return this.expenses
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
}

const tracker = new ExpenseTracker();

document.addEventListener("DOMContentLoaded", () => {
  updateSummary();
  renderTransactions();
  attachEventListeners();
});

function updateSummary() {
  const totalExpenses = tracker.getTotalExpenses();
  const savings = tracker.getSavings();

  const expenseEl = document.querySelector(".summary-card.expense .amount");
  const savingsEl = document.querySelector(".summary-card.savings .amount");

  if (expenseEl) expenseEl.innerText = `₹${totalExpenses.toLocaleString()}`;
  if (savingsEl) savingsEl.innerText = `₹${savings.toLocaleString()}`;
}

function renderTransactions() {
  const list = document.querySelector(".transaction-list");
  if (!list) return;

  const transactions = tracker.getRecentExpenses();

  if (transactions.length === 0) {
    list.innerHTML = '<li style="padding: 20px; text-align: center; color: #64748b;">No expenses yet</li>';
    return;
  }

  list.innerHTML = transactions.map(t => `
    <li>
      <span>${getEmojiForCategory(t.category)} ${t.description}</span>
      <span class="negative">-₹${t.amount.toLocaleString()}</span>
      <button onclick="deleteExpense(${t.id})" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0 8px;">✕</button>
    </li>
  `).join('');
}

function attachEventListeners() {
  const addBtn = document.querySelector(".btn-primary.small");
  if (addBtn) {
    addBtn.addEventListener("click", showAddExpenseModal);
  }
}

function showAddExpenseModal() {
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
    max-width: 400px;
    width: 90%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  `;

  form.innerHTML = `
    <h3 style="margin-bottom: 20px; font-size: 20px; font-weight: 700;">Add Expense</h3>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b;">Description</label>
      <input type="text" id="description" placeholder="e.g., Groceries" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b;">Amount (₹)</label>
      <input type="number" id="amount" placeholder="0.00" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b;">Category</label>
      <select id="category" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
        <option>Food</option>
        <option>Rent</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Utilities</option>
        <option>Other</option>
      </select>
    </div>
    <div style="display: flex; gap: 12px;">
      <button id="cancelBtn" style="flex: 1; padding: 12px; border: 2px solid #e2e8f0; background: white; border-radius: 10px; cursor: pointer; font-weight: 600;">Cancel</button>
      <button id="submitBtn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Add Expense</button>
    </div>
  `;

  form.appendChild(form.innerHTML);
  modal.appendChild(form);
  document.body.appendChild(modal);

  document.getElementById('cancelBtn').onclick = () => modal.remove();
  document.getElementById('submitBtn').onclick = () => {
    const description = document.getElementById('description').value.trim();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if (!description || !amount) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    tracker.addExpense(description, amount, category);
    modal.remove();
    updateSummary();
    renderTransactions();
    showNotification('Expense added successfully!', 'success');
  };

  document.getElementById('description').focus();
}

function deleteExpense(id) {
  if (confirm('Are you sure you want to delete this expense?')) {
    tracker.removeExpense(id);
    updateSummary();
    renderTransactions();
    showNotification('Expense deleted', 'success');
  }
}

function getEmojiForCategory(category) {
  const emojis = {
    'Food': '🍔',
    'Rent': '🏠',
    'Transport': '🚗',
    'Entertainment': '🎬',
    'Utilities': '💡',
    'Other': '📦'
  };
  return emojis[category] || '📝';
}
  
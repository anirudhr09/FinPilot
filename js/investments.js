// ===== INVESTMENT PORTFOLIO MANAGER =====
class InvestmentPortfolio {
  constructor() {
    this.investments = StorageManager.get('investments', []);
    this.strategies = ['Conservative', 'Moderate', 'Aggressive'];
    this.selectedStrategy = StorageManager.get('investmentStrategy', 'Moderate');
  }

  addInvestment(name, amount, type, returnRate) {
    const investment = {
      id: Date.now(),
      name,
      amount: Number(amount),
      type,
      returnRate: Number(returnRate),
      created: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    this.investments.push(investment);
    StorageManager.set('investments', this.investments);
    return investment;
  }

  removeInvestment(id) {
    this.investments = this.investments.filter(i => i.id !== id);
    StorageManager.set('investments', this.investments);
  }

  getTotalInvested() {
    return this.investments.reduce((sum, i) => sum + i.amount, 0);
  }

  getExpectedReturns() {
    return this.investments.reduce((sum, i) => sum + (i.amount * i.returnRate / 100), 0);
  }

  getByType() {
    const types = {};
    this.investments.forEach(i => {
      types[i.type] = (types[i.type] || 0) + i.amount;
    });
    return types;
  }

  setStrategy(strategy) {
    this.selectedStrategy = strategy;
    StorageManager.set('investmentStrategy', strategy);
  }

  getRiskScore(profile = {}) {
    const age = Number(profile.Age) || 35;
    const dependents = Number(profile['Number of Dependents']) || 0;
    
    let score = 50;
    if (age < 30) score += 15;
    if (age > 50) score -= 20;
    if (dependents > 1) score -= 10;
    
    return Math.max(20, Math.min(80, score));
  }
}

const portfolio = new InvestmentPortfolio();

document.addEventListener("DOMContentLoaded", () => {
  const profile = StorageManager.get('profile', {});
  const riskScore = portfolio.getRiskScore(profile);

  updateRiskMeter(riskScore);
  renderAllocationTable();
  attachStrategyListeners();
});

function updateRiskMeter(score) {
  const riskFill = document.querySelector(".risk-fill");
  const riskLabel = document.querySelector(".risk-label");

  if (riskFill) riskFill.style.width = `${score}%`;
  
  let riskLevel = 'Low';
  if (score > 60) riskLevel = 'High';
  else if (score > 35) riskLevel = 'Moderate';

  if (riskLabel) riskLabel.innerText = `${riskLevel} Risk (Score: ${score})`;
}

function renderAllocationTable() {
  const table = document.querySelector(".allocation-table tbody");
  if (!table) return;

  const types = portfolio.getByType();
  const total = portfolio.getTotalInvested();

  if (Object.keys(types).length === 0) {
    table.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #64748b;">No investments yet</td></tr>';
    return;
  }

  table.innerHTML = Object.entries(types).map(([type, amount]) => {
    const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
    return `
      <tr>
        <td>${type}</td>
        <td>₹${amount.toLocaleString()}</td>
        <td>${percentage}%</td>
        <td><div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
        </div></td>
      </tr>
    `;
  }).join('');
}

function attachStrategyListeners() {
  const strategies = document.querySelectorAll(".strategy");
  strategies.forEach(s => {
    s.addEventListener("click", () => {
      const strategy = s.querySelector("h4").textContent;
      strategies.forEach(x => x.classList.remove("active"));
      s.classList.add("active");
      portfolio.setStrategy(strategy);
      showNotification(`Strategy changed to ${strategy}`, 'success');
    });
  });
}

function showAddInvestmentModal() {
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
    <h3 style="margin-bottom: 24px; font-size: 20px; font-weight: 700;">Add Investment</h3>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">Investment Name</label>
      <input type="text" id="invName" placeholder="e.g., HDFC Mutual Fund" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">Amount (₹)</label>
      <input type="number" id="invAmount" placeholder="10000" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">Type</label>
      <select id="invType" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
        <option>Stocks</option>
        <option>Mutual Funds</option>
        <option>Bonds</option>
        <option>Fixed Deposits</option>
        <option>Gold</option>
      </select>
    </div>
    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase;">Expected Return Rate (%)</label>
      <input type="number" id="invReturn" placeholder="8" step="0.1" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;">
    </div>
    <div style="display: flex; gap: 12px;">
      <button id="cancelBtn" style="flex: 1; padding: 12px; border: 2px solid #e2e8f0; background: white; border-radius: 10px; cursor: pointer; font-weight: 600;">Cancel</button>
      <button id="submitBtn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600;">Add Investment</button>
    </div>
  `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  document.getElementById('cancelBtn').onclick = () => modal.remove();
  document.getElementById('submitBtn').onclick = () => {
    const name = document.getElementById('invName').value.trim();
    const amount = document.getElementById('invAmount').value;
    const type = document.getElementById('invType').value;
    const returnRate = document.getElementById('invReturn').value;

    if (!name || !amount || !returnRate) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    portfolio.addInvestment(name, amount, type, returnRate);
    modal.remove();
    renderAllocationTable();
    showNotification('Investment added successfully!', 'success');
  };

  document.getElementById('invName').focus();
}

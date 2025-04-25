document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const balanceElement = document.getElementById('balance');
  const transactionsElement = document.getElementById('transactions');
  const form = document.getElementById('transactionForm');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeInput = document.getElementById('type');

  // Initialize transactions from localStorage
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  // Update UI and localStorage
  function updateTransactions() {
    transactionsElement.innerHTML = '';
    let balance = 0;

    transactions.forEach(transaction => {
      balance += transaction.amount;
      const transactionEl = document.createElement('div');
      transactionEl.className = 'transaction';
      transactionEl.innerHTML = `
        <span>${transaction.description}</span>
        <span class="${transaction.amount > 0 ? 'income' : 'expense'}">
          ${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)} $
        </span>
      `;
      transactionsElement.appendChild(transactionEl);
    });

    balanceElement.textContent = `$${balance.toFixed(2)}`;
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount)) {
      alert('Please enter valid description and amount!');
      return;
    }

    transactions.push({
      description,
      amount: type === 'income' ? amount : -amount,
      type
    });

    updateTransactions();
    form.reset();
  });

  // Initial load
  updateTransactions();
});
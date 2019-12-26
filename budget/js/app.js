class UI {
    //counstructor PATTERN
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    //budget form
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmountInput = document.getElementById("budget-amount-input");
    this.budgetDateInput = document.getElementById("budget-date-input");
    //central main totals
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    //exoense form
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.expenseAmountInput = document.getElementById("expense-amount-input");
    this.expenseDateInput = document.getElementById("expense-date-input");
    //lists and
    this.expenseList = document.getElementById("expense-list");
    this.budgetList = document.getElementById("expense-list");
    this.itemList = [];
    this.budgetitemList = [];
    this.itemID = 0;
    this.budgetitemID = 0;

    this.sortByPriceBtn = document.getElementById('sortByBudget');
  }

  sortingByPrice(){
    var items = document.querySelectorAll('.budget-amount mb-0 list-item')
    console.log(items);
    Array.from(items).sort(function(a, b) {
      // using ~~ to cast the value to a number instead of a string
      a = ~~a.querySelector('.budget-amount mb-0 list-item').innerText
      b = ~~b.querySelector('.budget-amount mb-0 list-item').innerText
      return a - b
    }).forEach(function(n, i) {
      n.style.order = i
    })
  }


  //show balance
  showBalance(){
    const expense = this.totalExpense();
    const budget = this.totalBudget();
    const total = budget - expense;
    this.balanceAmount.textContent = total;
    if(total < 0){
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if(total > 0){
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    } else if(total === 0){
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  //submit budget form
  submitBudgetForm(){
    const budgetValue = this.budgetInput.value;
    const amountValue = this.budgetAmountInput.value;
    const budgetDateValue = this.budgetDateInput.value;
    if(budgetValue === '' || amountValue === '' || amountValue < 0){
      this.budgetFeedback.classList.add('showItem');
      console.log("error");
      this.budgetFeedback.innerHTML = `<p>значення не можуть бути пустими або від'ємними</p>`;
      const self = this;
      setTimeout(function(){
        self.budgetFeedback.classList.remove('showItem');
      }, 3000)
    } else {
      let amount = parseInt(amountValue);
      this.budgetInput.value = '';
      this.budgetAmountInput.value = '';
      this.budgetDateInput.value = '';
      let budget = {
        id: this.budgetitemID,
        title: budgetValue,
        amount: amount,
        date: budgetDateValue
      }
      this.budgetitemID++;
      this.budgetitemList.push(budget);
      this.addBudget(budget);
      this.showBalance();
    }
  }
  //add expense
  addBudget(budget){
    const div = document.createElement('div');
    div.classList.add('budget');
    div.innerHTML = `<div class="budget-item d-flex justify-content-between align-items-baseline">
    <h6 class="budget-title mb-0 text-uppercase list-item">+ ${budget.title}</h6>
    <h5 class="budget-amount mb-0 list-item">${budget.amount} грн</h5>
    <h5 class="budget-date mb-0 list-item">${budget.date}</h5>
   </div>`;
   this.budgetList.appendChild(div);
  }

  //total expense
  totalBudget(){
    let total = 0;
    if(this.budgetitemList.length > 0){
      total = this.budgetitemList.reduce(function(acc, curr){
        acc += curr.amount;
        return acc;
      }, 0)
    }
    this.budgetAmount.textContent = total;
    return total;
  }


  //submit expense form
  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.expenseAmountInput.value;
    const expenseDateValue = this.expenseDateInput.value;
    if(expenseValue === '' || amountValue === '' || amountValue < 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>значення не можуть бути пустими або від'ємними</p>`;
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem');
      }, 3000)
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.expenseAmountInput.value = '';
      this.expenseDateInput.value = '';
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
        date: expenseDateValue
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  //add expense
  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount} грн</h5>
    <h5 class="expense-date mb-0 list-item">${expense.date}</h5>
   </div>`;
   this.expenseList.appendChild(div);
  }

  //total expense
  totalExpense(){
    let total = 0;
    if(this.itemList.length > 0){
      total = this.itemList.reduce(function(acc, curr){
        acc += curr.amount;
        return acc;
      }, 0)
    }
    this.expenseAmount.textContent = total;
    return total;
  }
}

function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const sortBtn = document.getElementById('sort');
  //new instance of UI Class
  const ui = new UI();

  sortBtn.addEventListener('submit', function(event){
      event.preventDefault();
      ui.sortingByPrice();
  })

  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  })

  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  })

}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
})

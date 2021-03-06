class SORT {
    constructor(arr, type){
        this.arr = arr;
        this.type = type;
    }
    sortingByAmount() {
        var byAmount = this.arr.slice(0);
        byAmount.sort(function(a,b) {
            return a.amount - b.amount;
        });
        if (this.type == "1") console.log('sorted by budget:');
        if (this.type == "2") console.log('sorted by expense:');
        console.log(byAmount);
        alert("check console");
    }
}

class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    //budget form
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmountInput = document.getElementById("budget-amount-input");
	this.budgetPlan = document.getElementById("plan-budget-amount-input");
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
/* 	this.expensePlan = document.getElementById("plan-expense-amount-input"); */
    this.expenseDateInput = document.getElementById("expense-date-input");
    //lists and
    this.expenseList = document.getElementById("expense-list");
    this.budgetList = document.getElementById("expense-list");
    this.itemList = [];
    this.budgetitemList = [];
    this.itemID = 0;
    this.budgetitemID = 0;
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
	const planBudgetValue = this.budgetPlan.value;
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
	  let plan = parseInt(planBudgetValue);
      this.budgetInput.value = '';
      this.budgetAmountInput.value = '';
	  this.budgetPlan.value = '';
      this.budgetDateInput.value = '';
      let budget = {
        id: this.budgetitemID,
        title: budgetValue,
        amount: amount,
		plan: plan,
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
/* 	const planExpenseValue = this.expensePlan.value; */
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
/* 	  this.expensePlan.value = ''; */
      this.expenseDateInput.value = '';
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
/* 		plan: plan, */
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
  
unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

addRow(tableID){
	//clear past table
 	var table = document.getElementById(tableID);
	for(var i = table.rows.length - 1; i > 0; i--)
	{
		table.deleteRow(i);
	}
	
	
	let categories = [];
	
	let categorie = {
		categ: "Cattest",
		plan: "plantest",
		fact: "amounttest",
/* 		period: "error" */
	}
	

/*   for (var i = 0; i < this.budgetitemList.length; i++) {
		name = this.budgetitemList[i].title;
		console.log(name);
		
	  if (categories.includes(this.budgetitemList[i].title)) {
	  console.log("exist");
	  Object.assign(this.budgetitemList[i].title, { plan: 3, fact: this.budgetitemList[i].amount, period: "success"});
	  }
	  
	  else {
		 console.log("not exist");
		 
		 name = Object.assign({}, categorie);
		 Object.assign(name, { categ: this.budgetitemList[i].title, plan: 3, fact: this.budgetitemList[i].amount, period: "success"});
		 
	  }
	  
  }   */
  
	//print
   for (var i = 0; i < this.budgetitemList.length; i++) { 
  		var table = document.getElementById(tableID);
		var row = table.insertRow(-1);
		var categoryCell = row.insertCell(0);
		var planCell = row.insertCell(1);
		var factCell = row.insertCell(2);
		var minusCell = row.insertCell(3);
/* 		var periodCell = row.insertCell(4);  */

		categoryCell.innerHTML = this.budgetitemList[i].title;
		planCell.innerHTML = this.budgetitemList[i].plan;
		factCell.innerHTML = this.budgetitemList[i].amount;
 		minusCell.innerHTML = this.budgetitemList[i].plan - this.budgetitemList[i].amount; 
/* 		periodCell.innerHTML = "yes"; */
		categories.push(this.budgetitemList[i].title)
  }
}
}
function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const categoryForm = document.getElementById('category-form');
  const sortBudget = document.getElementById('sort-form1');
  const sortExpense = document.getElementById('sort-form2');

  //new instance of UI Class
  const ui = new UI();

  sortBudget.addEventListener('submit', function(event){
      event.preventDefault();
      console.clear();
      //CONSTRUCTOR PATTERN ALLOWS CREATE NEW OBJECTS IN CERTAIN TYPE
      const sort = new SORT(ui.budgetitemList, "1");
      console.log(sort.sortingByAmount());
      //CONSTRUCTOR PATTERN ALLOWS CREATE NEW OBJECTS IN CERTAIN TYPE
  })

  sortExpense.addEventListener('submit', function(event){
      event.preventDefault();
      console.clear();
      //CONSTRUCTOR PATTERN ALLOWS CREATE NEW OBJECTS IN CERTAIN TYPE
      const sort = new SORT(ui.itemList, "2");
      console.log(sort.sortingByAmount());
      //CONSTRUCTOR PATTERN ALLOWS CREATE NEW OBJECTS IN CERTAIN TYPE
  })
  
  categoryForm.addEventListener('submit', function(event){
    event.preventDefault();
	ui.addRow('tabled');
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

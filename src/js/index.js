import { elements } from './views/base'
import { formatNumber } from './views/base'
import Budget from './models/Budget'
import { renderBudget } from './views/budgetView'
import { deleteItem } from './views/budgetView'
import { clearInput } from './views/budgetView'
import { getInputs } from './UIController'
import { changedType } from './UIController'

//create Budget class instance
const budget = new Budget()

const init = () => {
  elements.incomeValue.textContent = formatNumber(
    budget.calculateTotalIncomes(),
    'inc'
  )
  elements.expenseValue.textContent = formatNumber(
    budget.calculateTotalExpenses(),
    'exp'
  )
  elements.percentageValue.textContent = '---'
  elements.budgetValue.textContent = budget.displayTotalBudget()
  elements.dateLabel.textContent = budget.displayDate()
}

document.addEventListener('keypress', (event) => {
  if (event.keyCode === 13 || event.which === 13) {
    const inputs = getInputs()

    if (inputs) {
      // add data to budget array
      budget.addBudget(inputs)
      //clears input data
      clearInput()
      //Render budget inputs to the UI
      renderBudget(inputs, inputs.type)
      console.log(budget.getBudgets())
      //add income and expenses to Total budget
      const totalInc = (elements.incomeValue.textContent = formatNumber(
        budget.calculateTotalIncomes(),
        'inc'
      ))
      elements.expenseValue.textContent = formatNumber(
        budget.calculateTotalExpenses(),
        'exp'
      )
      elements.budgetValue.textContent = budget.displayTotalBudget()

      elements.percentageValue.textContent = budget.calculatePercentage()
    } else {
      alert('please enter valid data')
    }
  }
})
elements.BudgetContainer.addEventListener('click', (e) => {
  const id = e.target.closest('.item').dataset.itemid
  //handle the delete button
  if (e.target.matches('.item__delete, .item__delete *')) {
    // delte item from the state
    budget.deleteBudget(id)
    console.log(budget.getBudgets())
    //delete item from the UI
    deleteItem(id)
    // handle the update count
    elements.incomeValue.textContent = budget.calculateTotalIncomes()
    elements.expenseValue.textContent = budget.calculateTotalExpenses()
    elements.budgetValue.textContent = budget.displayTotalBudget()
  }
})

// elements.inputButton.addEventListener('click', e => {
//   e.preventDefault()
//   const inputs = getInputs()

//   if (inputs) {
//     // add data to it
//     budget.addBudget(inputs)
//     console.log(budget.getBudgets())
//     clearInput()
//     renderBudget(inputs, inputs.type)
//   } else {
//     alert('please enter valid data')
//   }
// })
init()
elements.inputType.addEventListener('change', changedType)

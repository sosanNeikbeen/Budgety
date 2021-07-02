export const elements = {
  inputType: document.querySelector('.add__type'),
  inputDesc: document.querySelector('.add__description'),
  inputValue: document.querySelector('.add__value'),
  inputButton: document.querySelector('.add__btn'),
  incomeContainer: document.querySelector('.income__list'),
  expenseContainer: document.querySelector('.expenses__list'),
  budgetValue: document.querySelector('.budget__value'),
  incomeValue: document.querySelector('.budget__income--value'),
  expenseValue: document.querySelector('.budget__expenses--value'),
  percentageValue: document.querySelector('.budget__expenses--percentage'),
  container: document.querySelector('.container'),
  expensesPercentage: document.querySelector('.item__percentage'),
  dateLabel: document.querySelector('.budget__title--month'),
  BudgetContainer: document.querySelector('.container'),
}
export const formatNumber = (num, type) => {
  let numSplit, int, dec
  num = Math.abs(num)
  num = num.toFixed(2)

  numSplit = num.split('.')

  int = numSplit[0]
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
  }
  dec = numSplit[1]
  return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
}

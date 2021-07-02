import { formatNumber } from '../views/base'
export default class Budget {
  constructor() {
    this.items = []
  }

  addBudget(item) {
    this.items.push(item)
  }

  getBudgets() {
    return this.items
  }
  deleteBudget(id) {
    const index = this.items.findIndex((el) => el.id === id)
    // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
    // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
    this.items.splice(index, 1)
  }
  calculateTotalIncomes() {
    let total = 0
    this.items.forEach((item) => {
      if (item.type === 'inc') {
        total = total + item.value
      }
    })

    return total
  }
  calculateTotalExpenses() {
    let total = 0
    this.items.forEach((item) => {
      if (item.type === 'exp') {
        total = total + item.value
      }
    })
    return total
    // `${formatNumber(total)}`
  }

  displayTotalBudget(type) {
    let totalBudget =
      this.calculateTotalIncomes() - this.calculateTotalExpenses()
    totalBudget > 0 ? (type = 'inc') : (type = 'exp')
    return `${formatNumber(totalBudget, type)}`
  }

  calculatePercentage() {
    const percentage = Math.round(
      (this.calculateTotalExpenses() / this.calculateTotalIncomes()) * 100
    )
    if (percentage > 0) {
      return `${percentage}%`
    } else {
      return `---`
    }
  }

  displayDate() {
    let today = new Date()
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let month = today.getMonth() //January is 0!
    let year = today.getFullYear()

    today = months[month] + ' ' + year
    return today
  }
}

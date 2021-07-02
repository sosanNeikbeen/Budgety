var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
    this.percentage = -1
  }

  Expense.prototype.calcPercenatge = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100)
    } else {
      this.percentage = -1
    }
  }
  Expense.prototype.getPercentage = function () {
    return this.percentage
  }

  var Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var calculateTotal = function (type) {
    let sum = 0
    data.allItems[type].forEach(function (cur) {
      sum += cur.value
    })

    data.total[type] = sum
  }

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },

    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  }

  return {
    addItem: function (type, desc, val) {
      var newItem

      //create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1
      } else {
        ID = 0
      }

      //create new item based on 'exp' and 'inc'
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val)
      }

      //push it into the data structure
      data.allItems[type].push(newItem)

      //return the new element
      return newItem
    },

    deleteItem: function (type, id) {
      var ids, index
      ids = data.allItems[type].map(function (current) {
        return current.id
      })
      index = ids.indexOf(id)
      if (index !== -1) {
        data.allItems[type].splice(index, 1)
      }
    },

    calculateBudget: function () {
      // calculate total exp and inc
      calculateTotal('exp')
      calculateTotal('inc')
      //total budget income - expence
      data.budget = data.total.inc - data.total.exp
      //calculate the percentage of income that we spend
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100)
      } else {
        data.percentage = -1
      }
    },

    calculatePercentage: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercenatge(data.total.inc)
      })
    },

    getPercentages: function () {
      var allPer = data.allItems.exp.map(function (cur) {
        return cur.getPercentage()
      })

      return allPer
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage,
      }
    },
  }
})()

var UIController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDesc: '.add__description',
    inputvalue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetValue: '.budget__value',
    incomeValue: '.budget__income--value',
    expenseValue: '.budget__expenses--value',
    percentageValue: '.budget__expenses--percentage',
    container: '.container',
    expensesPercentage: '.item__percentage',
    dateLabel: '.budget__title--month',
  }

  var formatNumber = function (num, type) {
    var numSplit, int, dec, type
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

  var NodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i)
    }
  }

  return {
    getinput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        desc: document.querySelector(DOMstrings.inputDesc).value,
        value: parseFloat(document.querySelector(DOMstrings.inputvalue).value),
      }
    },

    addListItem: function (obj, type) {
      var html, newHtml, element
      if (type === 'inc') {
        element = DOMstrings.incomeContainer
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))

      //insert the html to DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    },

    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID)
      el.parentNode.removeChild(el)
    },

    clearFields: function () {
      let fields, filedsArray
      fields = document.querySelectorAll(
        DOMstrings.inputDesc + ',' + DOMstrings.inputvalue
      )
      filedsArray = Array.prototype.slice.call(fields)
      filedsArray.forEach(function (cur, index, Array) {
        cur.value = ''
      })

      filedsArray[0].focus()
    },

    displayBudget: function (obj) {
      var type
      obj.budget > 0 ? (type = 'inc') : (type = 'exp')
      document.querySelector(DOMstrings.budgetValue).textContent = formatNumber(
        obj.budget,
        type
      )
      document.querySelector(DOMstrings.incomeValue).textContent = formatNumber(
        obj.totalInc,
        'inc'
      )
      document.querySelector(
        DOMstrings.expenseValue
      ).textContent = formatNumber(obj.totalExp, 'exp')

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageValue).textContent =
          obj.percentage + '%'
      } else {
        document.querySelector(DOMstrings.percentageValue).textContent = '---'
      }
    },

    displayPercentage: function (percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercentage)

      NodeListForEach(fields, function (cur, index) {
        if (percentages[index] > 0) {
          cur.textContent = percentages[index] + '%'
        } else {
          cur.textContent = '---'
        }
      })
    },

    displayDate: function () {
      var now, year, month, months

      now = new Date()
      months = [
        'January',
        'Feberuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Septemeber',
        'October',
        'November',
        'December',
      ]
      month = now.getMonth()
      year = now.getFullYear()
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + ' ' + year
    },

    changedType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ',' +
          DOMstrings.inputDesc +
          ',' +
          DOMstrings.inputvalue
      )

      NodeListForEach(fields, function (cur) {
        cur.classList.toggle('red-focus')
      })
      document.querySelector(DOMstrings.inputButton).classList.toggle('red')
    },

    getDOMstrings: function () {
      return DOMstrings
    },
  }
})()

var controller = (function (budgetctrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings()
    document
      .querySelector(DOM.inputButton)
      .addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem()
      }
    })
    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem)
    document
      .querySelector(DOM.inputType)
      .addEventListener('change', UICtrl.changedType)
  }

  var updateBudget = function () {
    //calculate the budget
    budgetctrl.calculateBudget()
    //return the budget
    let budget = budgetctrl.getBudget()
    //display budget to the UI
    UICtrl.displayBudget(budget)
  }

  var updatePercentage = function () {
    //calculate percentages
    budgetctrl.calculatePercentage()
    //get percentages
    let percentage = budgetctrl.getPercentages()
    //add percentages to the UI
    UICtrl.displayPercentage(percentage)
  }

  var ctrlAddItem = function () {
    var input, newItem
    //get the input data
    input = UICtrl.getinput()

    if (input.desc !== '' && !isNaN(input.value) && input.value > 0) {
      //add item to budget controller
      newItem = budgetctrl.addItem(input.type, input.desc, input.value)

      //add item to the UI
      newElement = UICtrl.addListItem(newItem, input.type)

      //clear fields
      UICtrl.clearFields()

      //calculate and update budget
      updateBudget()

      //calculate and update percentage
      updatePercentage()
    }
  }

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
    if (itemID) {
      //inc-0
      splitID = itemID.split('-')
      type = splitID[0]
      ID = parseInt(splitID[1])
    }
    //delete item from the data structure
    budgetctrl.deleteItem(type, ID)
    //delete item from the UI
    UICtrl.deleteListItem(itemID)
    //update the budget
    updateBudget()
    //calculate and update percentage
    updatePercentage()
  }

  return {
    init: function () {
      console.log('app started')
      UICtrl.displayDate()
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      })
      setupEventListeners()
    },
  }
})(budgetController, UIController)

controller.init()

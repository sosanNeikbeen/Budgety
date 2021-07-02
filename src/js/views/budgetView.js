import { elements } from './base'
import { formatNumber } from './base'

const clearInput = () => {
  elements.inputDesc.value = ''
  elements.inputValue.value = ''
  elements.inputDesc.focus()
}

const renderBudget = (item, type) => {
  const markup = `
<div class="item clearfix" data-itemid="${item.id}">
    <div class="item__description">${item.desc}</div>
        <div class="right clearfix">
            <div class="item__value">${formatNumber(item.value, type)}</div>
        <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
     </div>
</div>
    `
  if (type === 'inc') {
    elements.incomeContainer.insertAdjacentHTML('afterbegin', markup)
  } else {
    elements.expenseContainer.insertAdjacentHTML('afterbegin', markup)
  }
}
const deleteItem = id => {
  const item = document.querySelector(`[data-itemid = "${id}"]`)
  item.parentElement.removeChild(item)
}

export { renderBudget, clearInput, deleteItem }

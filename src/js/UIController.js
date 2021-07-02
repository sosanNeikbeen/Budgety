import { elements } from './views/base'
import uniqid from 'uniqid'
const getInputs = () => {
  const input = {
    id: uniqid(),
    type: elements.inputType.value,
    desc: elements.inputDesc.value,
    value: parseFloat(elements.inputValue.value),
  }
  if (input.desc !== '' && !isNaN(input.value) && input.value > 0) {
    return input
  } else {
    return null
  }
}

const changedType = () => {
  //   let fields = []
  //   let items =
  //     elements.inputType + ',' + elements.inputDesc + ',' + elements.inputValue
  //   fields.push(items)
  var fields = document.querySelectorAll(
    '.add__type' + ',' + '.add__description' + ',' + '.add__value'
  )
  Array.from(fields).forEach(cur => {
    cur.classList.toggle('red-focus')
  })
  elements.inputButton.classList.toggle('red')
}

export { getInputs, changedType }

import { elements } from './base'

const renderTotalBudget = () => {
  const markup = `
    <div class="budget__income clearfix">
          <div class="budget__income--text">Income</div>
          <div class="right">
            <div class="budget__income--value">+ 4,300.00</div>
            <div class="budget__income--percentage">&nbsp;</div>
          </div>
        </div>

        <div class="budget__expenses clearfix">
          <div class="budget__expenses--text">Expenses</div>
          <div class="right clearfix">
            <div class="budget__expenses--value">- 1,954.36</div>
            <div class="budget__expenses--percentage">45%</div>
          </div>
        </div>
    
    `
}

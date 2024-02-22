function getInputValue(inputId, errorMsg){
    const incomeInputText = document.getElementById(inputId)
    const incomeInputValue = incomeInputText.value
    const getIncomeValue = incomeInputValue
    if (isNaN(getIncomeValue) || getIncomeValue < 0 ) {
        document.getElementById(errorMsg).style.display = 'block'
        document.getElementById(inputId).style.borderColor = 'red'
        document.getElementById(inputId).style.boxShadow = '0 0 5px #ff0000'
    }
    else if (incomeInputText.value == '') {
        document.getElementById(errorMsg).style.display = 'block'
        document.getElementById(inputId).style.borderColor = 'red'
        document.getElementById(inputId).style.boxShadow = '0 0 5px #ff0000'
    } 
    else {
        document.getElementById(errorMsg).style.display = 'none'
        document.getElementById(inputId).style.borderColor = ''
        document.getElementById(inputId).style.boxShadow = 'none'
        return getIncomeValue
    }
    incomeInputText.value = '';
    
}
function calcTotalCostValue(){
    const foodInputValueText = getInputValue('food-input','error-msg-food')
    const rentInputValueText = getInputValue('rent-input','error-msg-rent')
    const clothInputValueText = getInputValue('cloth-input','error-msg-cloth')
    var calcTotalCost = parseFloat(foodInputValueText) + parseFloat(rentInputValueText) + parseFloat(clothInputValueText)
    if (foodInputValueText === undefined) {
        calcTotalCost = parseFloat(rentInputValueText) + parseFloat(clothInputValueText)
    }
    else if (rentInputValueText === undefined) {
        calcTotalCost = parseFloat(foodInputValueText) + parseFloat(clothInputValueText)
    }
    else if (clothInputValueText === undefined) {
        calcTotalCost = parseFloat(rentInputValueText) + parseFloat(foodInputValueText)
    }
    if (foodInputValueText === undefined && rentInputValueText === undefined ) {
        calcTotalCost = parseFloat(clothInputValueText)
    }
    else if (rentInputValueText === undefined && clothInputValueText === undefined) {
        calcTotalCost = parseFloat(foodInputValueText)
    }
    else if (clothInputValueText === undefined && foodInputValueText === undefined) {
        calcTotalCost = parseFloat(rentInputValueText)
    }
    return calcTotalCost
    
    // const calcTotalCostValue = food + rent + cloth
    // return calcTotalCost;
}
function getTotalExpenses (totalExpenseValue){
    const incomeInputText = document.getElementById('income-input')
    const incomeInputValueText = getInputValue('income-input', 'error-msg-income')
    if (incomeInputText.value == undefined) {
        document.getElementById('error-msg-income').style.display = 'block'
        document.getElementById('income-input').style.borderColor = 'red'
        document.getElementById('income-input').style.boxShadow = '0 0 5px #ff0000'
    }
    if (isNaN(totalExpenseValue)) {
        console.log('dass')        
    }
    else if (totalExpenseValue > parseFloat(incomeInputValueText) || incomeInputValueText == undefined) {
        document.getElementById('error-msg-balance').style.display = 'block'
        const expenseAmountText = document.getElementById('expense-amount')
        expenseAmountText.innerText = '$0';


        const incomeInputText = document.getElementById('income-input')
        const incomeInputValue = incomeInputText.value
        const getIncomeValue = incomeInputValue
        document.getElementById('error-msg-income').style.display = 'block'
        document.getElementById('income-input').style.borderColor = 'red'
        document.getElementById('income-input').style.boxShadow = '0 0 5px #ff0000'
        incomeInputText.value = '';
    }
    else if (totalExpenseValue < parseFloat(incomeInputValueText)) 
     {
        const expenseAmountText = document.getElementById('expense-amount')
        const expenseAmount = expenseAmountText.innerText
        expenseAmountText.innerText = totalExpenseValue
    }
}
function getTotalAmount(totalExpenseValue) {
    const incomeInputValueText = getInputValue('income-input', 'error-msg-income')
    const remainingAmount = parseFloat(incomeInputValueText) - totalExpenseValue
    const totalBalanceInputText = document.getElementById('total-balance-input')
    const totalBalanceInput = totalBalanceInputText.innerText
    if (totalExpenseValue > parseFloat(incomeInputValueText)) {
        document.getElementById('error-msg-balance').style.display = 'block'
        totalBalanceInputText.innerText = '$0'
        return getTotalAmount
    }
    else if (isNaN(remainingAmount)) {
        totalBalanceInputText.innerText = '$0'
        return getTotalAmount       
    }
    else {
        document.getElementById('error-msg-balance').style.display = 'none'
        totalBalanceInputText.innerText = remainingAmount
    }
    return remainingAmount;

}
function getSaveAmount() {
    const totalExpenseValue = calcTotalCostValue()
    const saveInputText = document.getElementById('save-input')
    const saveInput = saveInputText.value
    const totalAmount = getTotalAmount(totalExpenseValue);
    const saveAmount = (totalAmount * saveInput) / 100 ;
    const remainingAmount = totalAmount - saveAmount ;
    const remainingBalanceText = document.getElementById('remaining-balance')
    const saveAmountText = document.getElementById('saving-amount')
    if (parseFloat(saveInput) > 100 || parseFloat(saveInput) < 0 || isNaN(parseFloat(saveInput))) {
        saveInputText.value = '';
        document.getElementById('error-msg-save').style.display = 'block'
        document.getElementById('error-msg-save-text').style.display = 'block'
        document.getElementById('error-msg-save-text-modify').style.display = 'none'
        saveAmountText.innerText = '$0'
        remainingBalanceText.innerText = '$0' ;
        return getSaveAmount
    }
    else if (isNaN(saveAmount)){
        document.getElementById('error-msg-save-text-modify').style.display = 'block'
        document.getElementById('error-msg-save-text').style.display = 'none'
        console.log('hoga mara');
    }
    else {
        document.getElementById('error-msg-save').style.display = 'none'
        document.getElementById('error-msg-save-text').style.display = 'none'
        document.getElementById('error-msg-save-text-modify').style.display = 'none'
        const amountSaved = saveAmountText.innerText
        saveAmountText.innerText = saveAmount
        remainingBalanceText.innerText = remainingAmount ;
    }
    
}
document.getElementById('btn-calc').addEventListener('click', function(){
    const incomeInputValueText = getInputValue('income-input', 'error-msg-income')
    const foodInputValueText = getInputValue('food-input','error-msg-food')
    const rentInputValueText = getInputValue('rent-input','error-msg-rent')
    const clothInputValueText = getInputValue('cloth-input','error-msg-cloth')
    const totalExpenseValue = calcTotalCostValue()
    // console.log(calcTotalCostValue());
    getTotalExpenses(totalExpenseValue)
    getTotalAmount(totalExpenseValue)

    // const calcTotalValue = parseFloat(incomeInputValue) - calcTotalCostValue ;
    // console.log(calcTotalValue);

})
document.getElementById('save-btn').addEventListener('click', function(){
    getSaveAmount()
})

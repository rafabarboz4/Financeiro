const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20},
    { id: 2, name: 'Salario', amount: 500},
    { id: 3, name: 'Torta', amount: -5},
]

const addTransactionsintoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'

    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span> <button class="delete-btn">x</button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () =>{
    const transactionAmounts = dummyTransactions
            .map(transaction => transaction.amount)
    const total = transactionAmounts
            .reduce((accumulator, transaction) => accumulator + transaction, 0)
            .toFixed(2)
    const income = transactionAmounts
            .filter(value => value > 0)
            .reduce((accumulator, value) => accumulator + value, 0)
            .toFixed(2)
    const expense = Math.abs(transactionAmounts
            .filter(value => value < 0)
            .reduce((accumulator, value) => accumulator + value, 0))
            .toFixed(2)
            incomeDisplay.textContent = `R$ ${income}`
            expenseDisplay.textContent = `R$ ${expense}`
            balanceDisplay.textContent = `R$ ${total}`
}

const init = () =>{ 
    dummyTransactions.forEach(addTransactionsintoDOM)
    updateBalanceValues()
}
init()
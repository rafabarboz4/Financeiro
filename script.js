const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localstorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage = localStorage.getItem('transactions') !== null ? localstorageTransactions : []

const removeTransaction = ID =>{
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionsintoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'

    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}
        </span> <button class="delete-btn" onClick= "removeTransaction(${transaction.id})">x</button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () =>{
    const transactionAmounts = transactions
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
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsintoDOM)
    updateBalanceValues()
}
init()

updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 10000)

form.addEventListener('submit', event =>{
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim() 

    if(transactionName == '' || transactionAmount == ''){
        alert('[Erro] um dos campos estão vazios.')
        return
    }
    const transaction = { id: generateID(),
                          name: transactionName,
                          amount: Number(transactionAmount)}

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})
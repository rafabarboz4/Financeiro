const transactionsUl = document.querySelector('#transactions')

const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20},
    { id: 2, name: 'Salario', amount: 500},
    { id: 3, name: 'Torta', amount: -5}
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

addTransactionsintoDOM(dummyTransactions[2])
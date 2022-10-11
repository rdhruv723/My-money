import { Progress } from 'antd';
import React from 'react'
import '../resources/analatics.css'

function Analatics({transactions}) {

    const totalTransaction = transactions.length;
    const totalIncomeTransaction = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransaction = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionPercentage = (totalIncomeTransaction.length/totalTransaction)*100;
    const totalExpenseTransactionPercentage = (totalExpenseTransaction.length/totalTransaction)*100;

    const totalTurnover = transactions.reduce((acc,transaction)=>acc+transaction.amount, 0)
    
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce(
        (acc,transaction)=> acc+transaction.amount,0)

    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce(
        (acc,transaction)=> acc+transaction.amount ,0)

    const totalIncomeTurnoverPercentage = (totalIncomeTurnover/totalTurnover)*100
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover/totalTurnover)*100

    const categories = ['salary','tax','freelance','entertainment','food','travel','medical','education','investment']

  return (
    <div className='analytics' >
        <div className="row">
            <div className="col-md-4 mt-3">
                <div className="transaction-count">
                    <h4>Total Transactions : {totalTransaction}</h4>
                    <hr />
                    <h5>Income : {totalIncomeTransaction.length} </h5>
                    <h5>Expense : {totalExpenseTransaction.length} </h5>

                    <div className="progress-bars">
                      <Progress className='mx-4' strokeColor='#5dd64f' type='circle' percent={totalIncomeTransactionPercentage.toFixed(0)}/>

                      <Progress strokeColor='#e5572f' type='circle' percent={totalExpenseTransactionPercentage.toFixed(0)}/>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mt-3">
                <div className="transaction-count">
                    <h4>Total Transactions : {totalTurnover}</h4>
                    <hr />
                    <h5>Income : {totalIncomeTurnover} </h5>
                    <h5>Expense : {totalExpenseTurnover} </h5>

                    <div className="progress-bars">
                      <Progress className='mx-4' strokeColor='#5dd64f' type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)}/>

                      <Progress strokeColor='#e5572f' type='circle' percent={totalExpenseTurnoverPercentage.toFixed(0)}/>
                    </div>
                </div>
            </div>

        </div>
        <hr />
        <div className="row">
            <div className="col-md-6">
                <div className="income-category-analyics">
                    <h4>Income - Category Wise</h4>
                    {categories.map((category)=>{
                        const amount = transactions
                        .filter(t => t.type==='income' && t.category ===category)
                        .reduce((acc,t)=> acc+t.amount ,0)

                        return amount>0 && <div className='category-card'>
                            <h5>{category}</h5>
                            <Progress strokeColor='#0b5ad9' percent={((amount/totalIncomeTurnover)*100).toFixed(0)} />
                        </div>
                    })}
                </div>
            </div>

            <div className="col-md-6">
                <div className="expense-category-analyics">
                    <h4>Expense - Category Wise</h4>
                    {categories.map((category)=>{
                        const amount = transactions
                        .filter(t => t.type==='expense' && t.category ===category)
                        .reduce((acc,t)=> acc+t.amount ,0)

                        return amount>0 && <div className='category-card'>
                            <h5>{category}</h5>
                            <Progress strokeColor='#0b5ad9'  percent={((amount/totalExpenseTurnover)*100).toFixed(0)} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Analatics
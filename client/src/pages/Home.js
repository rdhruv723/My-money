import { Form, Input, Select, message, Table, DatePicker } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState, useEffect } from 'react'
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.css'
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment'
import { UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import Analatics from '../components/Analatics';
const { RangePicker } = DatePicker;

function Home() {

  const [showAddEditTransactionModel, setShowAddEditTransactionModel] = useState(false);

  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequrncy] = useState('7');
  const [type, setType] = useState('all');
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState('table')
  const [selectedItemForEdit,setSelectedItemForEdit] = useState(null);

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('mymoney-user'))
      setLoading(true)
      const response = await axios.post('http://localhost:8000/api/transactions/get-all-transactions',
        {
          userid: user._id,
          frequency, ...(frequency === 'custom' && { selectedRange }),
          type
        }
      );
      setTransactionsData(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  const deleteTransactions = async (record) => {
    try {
      setLoading(true)
      await axios.post('http://localhost:8000/api/transactions/delete-transaction',
        {
          transactionId : record._id
        }
      );
      message.success('Transaction Deleted Successfully')
      getTransactions()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type])

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title : "Actions",
      dataIndex : "actions",
      render : (text, record)=>{
        return <div>
          <EditOutlined onClick={()=>{
            setSelectedItemForEdit(record);
            setShowAddEditTransactionModel(true);
          }} />
          <DeleteOutlined className='mx-3' onClick={()=>deleteTransactions(record)} />
        </div>
      }
    }

  ]

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center">

        <div className="d-flex ">
          <div className="d-flex flex-column">

            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequrncy(value)} >
              <Select.Option value='7'>Last 1 week</Select.Option>
              <Select.Option value='30'>Last 1 month</Select.Option>
              <Select.Option value='365'>Last 1 year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>

            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}

          </div>

          <div className="d-flex flex-column mx-5">

            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)} >
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>

          </div>

        </div>

        <div className='d-flex'>
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined 
              className = {`mx-3 ${viewType === 'table' ? 'active-icon': 'inactive-icon' }`}
              onClick = {()=>setViewType('table')}
              />
              <AreaChartOutlined 
              className = {`${viewType === 'analytics' ? 'active-icon': 'inactive-icon' }`} 
              onClick = {()=>setViewType('analytics')}
              />
            </div>
          </div>
          <button className="primary" onClick={() => setShowAddEditTransactionModel(true)}>ADD NEW</button>
        </div>

      </div>

      <div className="table-analtics">

      {viewType==='table' ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div> : <Analatics transactions = {transactionsData} />}
      </div>

      {showAddEditTransactionModel && (
        <AddEditTransaction
          showAddEditTransactionModel={showAddEditTransactionModel}
          setShowAddEditTransactionModel={setShowAddEditTransactionModel}
          selectedItemForEdit = {selectedItemForEdit}
          setSelectedItemForEdit = {setSelectedItemForEdit}
          getTransactions={getTransactions}
        />
      )}

    </DefaultLayout>
  )
}

export default Home
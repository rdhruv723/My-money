import React, { useState } from 'react'
import { Form, Input, Select, Modal, message } from 'antd';
import axios from 'axios'
import Spinner from '../components/Spinner';

function AddEditTransaction({
    showAddEditTransactionModel,
    setShowAddEditTransactionModel,
    getTransactions,
    setSelectedItemForEdit,
    selectedItemForEdit }) {

    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('mymoney-user'))
            setLoading(true);
            if (selectedItemForEdit) {
                await axios.post('http://localhost:8000/api/transactions/edit-transaction',
                    { 
                        payload : {
                            ...values, 
                            userid: user._id,
                        },
                        transactionId : selectedItemForEdit._id
                     })
                getTransactions()
                message.success('Transaction Updated Successfully')
            }
            else {
                await axios.post('http://localhost:8000/api/transactions/add-transaction',
                    { ...values, userid: user._id, })
                getTransactions()
                message.success('Transaction Added Successfully')
            }
            setShowAddEditTransactionModel(false);
            setSelectedItemForEdit(null)
            setLoading(false);
        } catch (error) {
            message.error("Something went wrong")
            setLoading(false);
        }
    }
    return (
        <div>
            <Modal
                title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
                visible={showAddEditTransactionModel}
                onCancel={() => setShowAddEditTransactionModel(false)}
                footer={false}
            >
                {loading && <Spinner />}
                <Form layout='vertical' className='transaction-form' onFinish={onFinish}
                    initialValues={selectedItemForEdit} >
                    <Form.Item label='Amount' name='amount'>
                        < Input type='text' />
                    </Form.Item>

                    <Form.Item label='Type' name='type'>
                        <Select>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>
                        </Select>

                    </Form.Item>

                    <Form.Item label='Category' name='category'>
                        <Select>
                            <Select.Option value='salary'>Salary</Select.Option>
                            <Select.Option value='freelance'>Freelance</Select.Option>
                            <Select.Option value='food'>Food</Select.Option>
                            <Select.Option value='travel'>Travel</Select.Option>
                            <Select.Option value='entertainment'>Entertainment</Select.Option>
                            <Select.Option value='investment'>Investment</Select.Option>
                            <Select.Option value='education'>Education</Select.Option>
                            <Select.Option value='medical'>Medical</Select.Option>
                            <Select.Option value='tax'>Tax</Select.Option>
                        </Select>

                    </Form.Item>

                    <Form.Item label='Date' name='date'>
                        < Input type='date' />
                    </Form.Item>

                    <Form.Item label='Reference' name='reference'>
                        < Input type='text' />
                    </Form.Item>

                    <Form.Item label='Description' name='description'>
                        < Input type='text' />
                    </Form.Item>

                    <div className="d-flex justify-content-end">
                        <button className="primary" type='submit'>Save</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AddEditTransaction

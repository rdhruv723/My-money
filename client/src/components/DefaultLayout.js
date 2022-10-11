import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd';
import '../resources/default-layout.css'
import { Link, useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('mymoney-user'));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('mymoney-user')
              navigate('/login')
            }}>Logout</li>
          ),
        },
      ]}
    />
  );

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center ">
        <h1 className="logo">MY MONEY</h1>

        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>

      </div>

      <div className="content">
        {props.children}
      </div>

    </div>
  )
}

export default DefaultLayout
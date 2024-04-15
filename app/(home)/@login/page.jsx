'use client'
import { useHomeStore } from '@/app/stores/homeStore'
import {
  CloseOutlined,
  LeftOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'

export default function page() {
  const showLogin = useHomeStore((state) => state.showLogin)
  const setShowLogin = useHomeStore(state=>state.setShowLogin)
  const [isRegister,setIsRegister] = useState(false)
  const handleRegisterClick = ()=>{
    setIsRegister(true)
  }
  const handleBack = ()=>{
    setIsRegister(false)
  }
  const handleClose=()=>{
    setShowLogin(false)
  }
  return (
    <>
      {showLogin && (
        <>
          <div className="h-screen w-screen bg-gray-600 absolute z-50 bg-opacity-50">
            <div className="w-[480px] h-[500px] bg-white rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-5">
              <div className=" w-full h-[40px]">
               {isRegister &&  <Button
                  icon={<LeftOutlined />}
                  className=" float-left"
                  onClick={handleBack}
                ></Button>}
                <Button
                  icon={<CloseOutlined />}
                  className=" float-right"
                  onClick={handleClose}
                ></Button>
              </div>
              <h1 className="font-bold text-center text-black text-3xl mb-5">
                {isRegister?'注册':'登录'}TakTak
              </h1>
              <Form
                name="normal_login"
                className=" !px-8"
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="!w-full">
                    {isRegister?'注册':'登录'}
                  </Button>
                  {!isRegister && <span 
                  onClick={handleRegisterClick}
                  className="float-right cursor-pointer hover:underline mt-3">
                    注册
                  </span>}
                </Form.Item>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

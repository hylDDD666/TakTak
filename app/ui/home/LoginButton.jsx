'use client'
import { useHomeStore } from '@/app/stores/homeStore'
import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export default function LoginButton() {
  const isLogin = useHomeStore((state) => state.isLogin)
  const setShowLogin = useHomeStore(state=>state.setShowLogin)
  const showLogin = useHomeStore(state=>state.showLogin)
  const handleLoginClick = ()=>{
    setShowLogin(true)
    console.log(showLogin);
  }
  return (
    <>
      {!isLogin && (
        <Button
          style={{ fontWeight: 'bold', marginRight: '10px' }}
          size="large"
          className="!text-white !bg-rose-500 hover:!bg-rose-600 !px-6 !ml-5"
          onClick={handleLoginClick}
        >
          登录
        </Button>
      )}
      {isLogin && (
        <>
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<SendOutlined />}
            size="large"
          ></Button>
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<MessageOutlined />}
            size="large"
          ></Button>
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<UserOutlined />}
            size="large"
          ></Button>
        </>
      )}
    </>
  )
}

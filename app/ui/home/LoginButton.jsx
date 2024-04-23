'use client'
import { useHomeStore } from '@/app/stores/homeStore'
import {
  LogoutOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Popover, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

export default function LoginButton(props) {
  const setShowLogin = useHomeStore((state) => state.setShowLogin)
  const router = useRouter()
  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const handleProfileClick = () => {
    router.push(`/${props.session.user.name}`)
  }
  const handleLogoutClick = () => {
    signOut()
    router.refresh()
  }
  return (
    <>
      {!props.session && (
        <Button
          style={{ fontWeight: 'bold', marginRight: '10px' }}
          size="large"
          className="!text-white !bg-rose-500 hover:!bg-rose-600 !px-6 !ml-5"
          onClick={handleLoginClick}
        >
          登录
        </Button>
      )}
      {props.session && (
        <>
          <Tooltip title={'消息'}>
            <Button
              style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
              icon={<SendOutlined className=" !text-xl" />}
              size="large"
            ></Button>
          </Tooltip>
          <Tooltip title={'收件箱'}>
            <Button
              style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
              icon={<MessageOutlined className=" !text-xl" />}
              size="large"
            ></Button>
          </Tooltip>

          <Popover
            content={
              <div className="flex flex-col">
                <Button
                  icon={<UserOutlined />}
                  style={{ fontWeight: 'bold', border: 0 }}
                  size="large"
                  onClick={handleProfileClick}
                >
                  查看个人主页
                </Button>{' '}
                <Button
                  icon={<LogoutOutlined />}
                  style={{ fontWeight: 'bold', border: 0 }}
                  size="large"
                  onClick={handleLogoutClick}
                >
                  退出登录
                </Button>
              </div>
            }
          >
            <Avatar
              src={props.session.user.image}
              size={26}
              className=" !mb-[6px] !ml-1 hover:cursor-pointer"
            ></Avatar>
          </Popover>
        </>
      )}
    </>
  )
}

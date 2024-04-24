'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
  CompassOutlined,
  HomeOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'
import { useHomeStore } from '@/app/stores/homeStore'
import { useSession } from 'next-auth/react'

const items1 = [
  [HomeOutlined, '推荐', ''],
  [StarOutlined, '已关注', 'followed'],
  [TeamOutlined, '好友', 'friends'],
  [CompassOutlined, '探索', 'explore'],
  [UserOutlined, '个人资料', 'profile']
]
const items2 = items1.map((icon, index) => {
  const key = String(index)
  return {
    key: key,
    icon: React.createElement(icon[0], { className: '!text-2xl' }),
    label: icon[1],
    style: { marginTop: '8px', paddingLeft: '15px' }
  }
})
export default function PriSider() {
  const { data: session } = useSession()
  const setShowLogin = useHomeStore((state) => state.setShowLogin)
  const router = useRouter()
  const pathName = usePathname()
  const defaultSelectedKey =
    session && '/' + session.user.name === pathName
      ? '4'
      : items1.findIndex((item) => {
          return '/' + item[2] === pathName
        }) + ''
  const [current, setCurrent] = useState([defaultSelectedKey])
  useEffect(() => {
    setCurrent(
      session && '/' + session.user.name === pathName
        ? '4'
        : items1.findIndex((item) => {
            return '/' + item[2] === pathName
          }) + ''
    )
  }, [session, pathName])

  const handleSelect = ({ key }) => {
    if (key !== current) {
      if ((key === '2' || key === '4') && session === null) {
        setShowLogin(true)
      } else {
        const path = items1[key * 1][2]
        setCurrent([key])
        if (key !== '4') {
          router.push(`/${path}`)
        } else {
          router.push(`/${session.user.name}`)
        }
      }
    }
  }
  return (
    <>
      <Sider
        style={{
          position: 'fixed',
          height: '100%',
          background: 'white',
          borderRight: '1px solid rgb(224,224,224)',
          boxShadow: '2px 1px 10px rgb(249,249,249)'
        }}
        breakpoint="lg"
        className={'lg:!border-r-0 lg:!shadow-none z-40'}
        collapsedWidth="60px"
        defaultCollapsed
      >
        <Menu
          mode="inline"
          className={'!h-full !text-xl !font-bold !border-r-0 '}
          items={items2}
          style={{ minWidth: 0, flex: 'auto' }}
          onSelect={handleSelect}
          selectedKeys={current}
        />
      </Sider>
    </>
  )
}

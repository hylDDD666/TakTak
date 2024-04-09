'use client'
import React, { useEffect } from 'react'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
  CompassOutlined,
  HomeOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const NavLink = dynamic(() => import('../nav-link'))

const items1 = [
  [HomeOutlined, '推荐', ''],
  [StarOutlined, '已关注', 'followed'],
  [TeamOutlined, '好友', 'friends'],
  [CompassOutlined, '探索', 'explore'],
  [UserOutlined, '个人资料', 'profile'],
]
const items2 = items1.map((icon, index) => {
  const key = String(index)
  return {
    key: key,
    icon: React.createElement(icon[0], { className: '!text-2xl' }),
    label: <NavLink path={`/${icon[2]}`}>{icon[1]}</NavLink>,
    style: { marginTop: '8px', paddingLeft: '15px' },
  }
})
export default function PriSider() {
  const pathName = usePathname()
  const defaultSelectedKey =
    items1.findIndex((item) => {
      return '/' + item[2] === pathName
    }) + ''
  return (
    <>
      <Sider
        style={{
          position: 'fixed',
          height: '100%',
          background: 'white',
          borderRight: '1px solid rgb(224,224,224)',
          boxShadow: '2px 1px 10px rgb(249,249,249)',
        }}
        breakpoint="lg"
        className={'lg:!border-r-0 lg:!shadow-none z-40'}
        collapsedWidth="60px"
        defaultCollapsed
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
          className={'!h-full !text-xl !font-bold !border-r-0 '}
          items={items2}
          style={{ minWidth: 0, flex: 'auto' }}
        />
      </Sider>
    </>
  )
}

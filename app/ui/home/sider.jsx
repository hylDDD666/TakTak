import React from 'react'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
  CompassOutlined,
  HomeOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
const items2 = [
  [HomeOutlined, '推荐'],
  [StarOutlined, '已关注'],
  [TeamOutlined, '好友'],
  [CompassOutlined, '探索'],
  [VideoCameraOutlined, '直播'],
  [UserOutlined, '个人资料'],
].map((icon, index) => {
  const key = String(index + 1)
  return {
    key: `${key}`,
    icon: React.createElement(icon[0], { className: '!text-xl' }),
    label: icon[1],
    title: icon[1],
  }
})
export default function PriSider() {
  return (
    <>
      <Sider
        style={{
          background: 'white',
          borderRight: '1px solid rgb(224,224,224)',
          boxShadow: '2px 1px 10px rgb(249,249,249)',
        }}
        breakpoint="lg"
        className={'lg:!border-0'}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className={'!h-full !text-xl !font-bold !border-r-0 '}
          items={items2}
        />
      </Sider>
    </>
  )
}

import Image from 'next/image'
import React from 'react'
import {
  CompassOutlined,
  HomeOutlined,
  LaptopOutlined,
  MessageOutlined,
  NotificationOutlined,
  PlusOutlined,
  SendOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Search from 'antd/es/input/Search'
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))
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

export default function Home() {
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 0,
          justifyContent: 'space-between',
          fontWeight: 'bold',
        }}
      >
        <div className={'h-full py-1 '}>
          <img
            src="/8bc522dd45f65212ca69dfcd81fc665.jpg"
            alt="LOGO"
            style={{ height: '100%' }}
          />
        </div>
        <Search
          className={'ml-40 mr-5 !hidden md:!inline-block'}
          placeholder="搜索"
          allowClear
          size="large"
          // onSearch={onSearch}
          style={{ flex: 1 }}
        />
        <div className={'h-full'}>
          <Button
            style={{ fontWeight: 'bold', marginRight: '10px' }}
            icon={<PlusOutlined></PlusOutlined>}
            size="large"
          >
            上传
          </Button>
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<SendOutlined />}
            size="large"
          ></Button>{' '}
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<MessageOutlined />}
            size="large"
          ></Button>{' '}
          <Button
            style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
            icon={<UserOutlined />}
            size="large"
          ></Button>
        </div>
      </Header>
      <Layout className={'h-full'}>
        <Sider
          style={{
            background: 'white',
          }}
          breakpoint='md'
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className={'!h-full !text-xl !font-bold !border-r-0 '}
            items={items2}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
            }}
          >
            123123
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

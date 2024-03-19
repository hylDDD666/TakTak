import React from 'react'
import {
  MessageOutlined,
  PlusOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Search from 'antd/es/input/Search'

export default function PriHeader() {
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 0,
          justifyContent: 'space-between',
          fontWeight: 'bold',
          borderBottom: '1px solid rgb(224,224,224)',
        }}
      >
        <div className={'h-full py-1'}>
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
    </>
  )
}

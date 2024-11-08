import React from 'react'
import { MessageOutlined, PlusOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Search from 'antd/es/input/Search'
import LoginButton from './LoginButton'

export default function PriHeader(props) {
  return (
    <>
      <Header
        style={{
          position: 'absolute',
          top: 0,
          right:0,
          left:0,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 0,
          justifyContent: 'space-between',
          fontWeight: 'bold',
          borderBottom: '1px solid rgb(224,224,224)',
          zIndex: 10
        }}
      >
        <div className={'h-full py-1'}>
          <img src="/8bc522dd45f65212ca69dfcd81fc665.jpg" alt="LOGO" style={{ height: '100%' }} />
        </div>
        <div className="flex-auto flex justify-center">
          <Search
            className={'ml-40 mr-5 !hidden md:!inline-block'}
            placeholder="搜索"
            allowClear
            size="large"
            // onSearch={onSearch}
            style={{ maxWidth:'500px',flex:1 }}
          />
        </div>

        <div className={'h-full basis-64 min-w-64'}>
          <Button
            style={{ fontWeight: 'bold', marginRight: '10px' }}
            icon={<PlusOutlined></PlusOutlined>}
            size="large"
          >
            上传
          </Button>
          <LoginButton session={props.session}></LoginButton>
        </div>
      </Header>
    </>
  )
}

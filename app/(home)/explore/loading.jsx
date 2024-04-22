import { Spin } from 'antd'
import React from 'react'

export default function loading() {
  return (
    <div
      style={{
        height: 'calc(100vh - 63px)',
        padding: '40px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'auto'
      }}
      className=" min-[992px]:!pl-[210px] text-center"
    >
      <Spin size="large"></Spin>
    </div>
  )
}

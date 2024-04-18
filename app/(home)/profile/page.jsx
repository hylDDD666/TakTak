'use client'
import { useHomeStore } from '@/app/stores/homeStore'
import { Avatar, Col, Row } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
  const params = useParams()
  const session = useHomeStore(state=>state.session)
  console.log(params);
  return (
    <div
      style={{
        height: 'calc(100vh - 63px)',
        padding: '10px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'auto',
      }}
      className=" min-[992px]:!pl-[210px]"
    >
      <Row wrap={false}>
        <Col flex={110}>
          <Avatar ></Avatar>
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}

'use client'

import { DownOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Comment() {
  let isReplyExsist = true
  const [isLike, setIsLike] = useState(false)
  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }
  const handleReply=()=>{

  }
  return (
    <Row>
      <Col span={2}>
        <Avatar
          size={42}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          className="!mr-2"
        ></Avatar>
      </Col>
      <Col span={19} style={{ padding: '0 5px' }}>
        <Link
          href="/username"
          className="font-medium text-black hover:underline hover:text-black "
        >
          <span>usreName</span>
        </Link>
        <p className="text-lg leading-5">
          I've been a kdrama fan since i was 12 and now I'm 23 I'm telling y'all
          from all of the kdramas I've watched..queen of tears is one of the
          good ones that'll remain in my heart ... it's so damn good
        </p>
        <div className="text-gray-500">
          <span>time</span>
          <span
            className='ml-8 hover:cursor-pointer'
            onClick={handleReply}
          >
            Reply
          </span>
        </div>
      {
        isReplyExsist && <span>View {6} replies <DownOutlined /></span>
      }
      </Col>
      <Col span={2} style={{ paddingTop: '15px' }}>
        <Button
          type="round"
          style={{
            height: 20,
            fontWeight: 'bold',
            backgroundColor: 'white',
            color: 'rgb(138,139,145)',
            padding: '0 10px',
          }}
          className={`active:!bg-gray-200 ${isLike ? '!text-rose-500' : ''}`}
          size="large"
          icon={
            !isLike ? (
              <HeartOutlined className={`!text-l`} />
            ) : (
              <HeartFilled className={`!text-l`} />
            )
          }
          onClick={handleLikeClick}
        ></Button>
        <p className="w-full text-center text-gray-500 ">{1231}</p>
      </Col>
    </Row>
  )
}

'use client'
import { CloseOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import Reply from './Reply'

export default function SubComment() {
  const handleReply = () => {
    setShowReplyInput(true)
  }
  const [isLike, setIsLike] = useState(false)
  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }
  const [showReplyInput, setShowReplyInput] = useState(false)
  const hideReplyInput = () => {
    setShowReplyInput(false)
  }
  return (
    <div>
      <Row wrap={false}>
        <Col span={2}></Col>
        <Col span={2}>
          <Avatar
            size={30}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            className="!mr-2"
          ></Avatar>
        </Col>
        <Col span={17}>
          <Link
            href="/username"
            className="font-medium text-black hover:underline hover:text-black "
          >
            <span className="text-sm">usreName</span>
          </Link>
          <p className=" text-base leading-[18px]">
            I've been a kdrama fan since i was 12 and now I'm 23 I'm telling y'all from all of the
            kdramas I've watched..queen of tears is one of the good ones that'll remain in my heart
            ... it's so damn good
          </p>
          <div className="text-gray-500 my-0.5">
            <span>time</span>
            <span className="ml-8 hover:cursor-pointer" onClick={handleReply}>
              Reply
            </span>
          </div>
        </Col>
        <Col span={2}>
          <Button
            type="round"
            style={{
              height: 20,
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: 'rgb(138,139,145)',
              padding: '0 10px'
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
      {showReplyInput && (
        <Row style={{ marginTop: '8px' }}>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={17}>
            <Reply
              placeholder="回复..."
            ></Reply>
          </Col>
          <Col span={2}>
            <Button
              onClick={hideReplyInput}
              icon={<CloseOutlined />}
              className=" !h-[42px] !w-full !border-0 !text-black hover:!bg-white  !font-semibold !bg-white"
            ></Button>
          </Col>
        </Row>
      )}
    </div>
  )
}

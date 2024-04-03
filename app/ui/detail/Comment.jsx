'use client'

import {
  CloseOutlined,
  DownOutlined,
  HeartFilled,
  HeartOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import SubComment from './SubComment'
import Reply from './Reply'

export default function Comment() {
  let isReplyExsist = true
  let isMoreReplyExist = true

  const [isLike, setIsLike] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [commentInput, setCommentInput] = useState('')
  const inputChange = (e) => {
    setCommentInput(e.target.value)
  }
  const addEmoji = (emojiData, e) => {
    // console.log(emojiData,e);
    setCommentInput((pre) => pre + emojiData.emoji)
  }

  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }

  const handleReply = () => {}
  const handleReplyShow = () => {
    console.log('fetchSubCommentData')
    setShowReply(true)
  }
  const handleShowMore = () => {
    console.log('fecthMoreComments')
  }
  const handleHideMore = () => {
    setShowReply(false)
  }
  return (
    <>
      <Row className="mt-3">
        <Col span={2}>
          <Avatar
            size={42}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            className="!mr-2"
          ></Avatar>
        </Col>
        <Col span={18} style={{ padding: '0 5px' }}>
          <Link
            href="/username"
            className="font-medium text-black hover:underline hover:text-black "
          >
            <span className="text-sm">usreName</span>
          </Link>
          <p className=" text-base leading-[18px]">
            I've been a kdrama fan since i was 12 and now I'm 23 I'm telling
            y'all from all of the kdramas I've watched..queen of tears is one of
            the good ones that'll remain in my heart ... it's so damn good
          </p>
          <div className="text-gray-500 my-0.5">
            <span>time</span>
            <span className="ml-8 hover:cursor-pointer" onClick={handleReply}>
              Reply
            </span>
          </div>
          {isReplyExsist && !showReply && (
            <p
              onClick={handleReplyShow}
              className=" text-base text-gray-500 font-medium leading-[18px] hover:cursor-pointer hover:underline "
            >
              View {6} replies
              <DownOutlined className="!text-sm ml-1 font-semibold" />
            </p>
          )}
        </Col>
        <Col span={1}></Col>
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
      {showReply && isMoreReplyExist && (
        <>
          <SubComment></SubComment>
          <Row>
            <Col span={2}></Col>
            <Col span={2}>
              <div className="w-3/4  absolute top-1/2 border-b border-gray-300 border-solid"></div>
            </Col>
            <Col span={16}>
              <p
                onClick={handleShowMore}
                className=" text-base text-gray-500 font-medium leading-[18px] hover:cursor-pointer hover:underline "
              >
                View {6} more
                <DownOutlined className="!text-sm ml-1 font-semibold" />
              </p>
            </Col>
            <Col span={4}>
              <p
                onClick={handleHideMore}
                className=" text-base text-gray-500 font-medium leading-[18px] hover:cursor-pointer hover:underline "
              >
                Hide
                <UpOutlined className="!text-sm ml-1 font-semibold" />
              </p>
            </Col>
          </Row>
        </>
      )}
      <Row style={{marginTop:'8px'}}>
        <Col span={2}></Col>
        <Col span={19}>
          <Reply
            placeholder="回复..."
            inputChange={inputChange}
            commentInput={commentInput}
            addEmoji={addEmoji}
          ></Reply>
        </Col>
        <Col span={2}>
          <Button
            icon={<CloseOutlined />}
            className=" !h-[42px] !w-full !border-0 !text-black hover:!bg-white  !font-semibold !bg-white"
          ></Button>
        </Col>
      </Row>
    </>
  )
}

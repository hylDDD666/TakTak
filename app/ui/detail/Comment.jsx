'use client'

import {
  CloseOutlined,
  DownOutlined,
  HeartFilled,
  HeartOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Col, Row, Spin } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SubComment from './SubComment'
import Reply from './Reply'
import { useHomeStore } from '@/app/stores/homeStore'
import { fetchSubCommentById } from '@/app/action/action'

export default function Comment(props) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const { content, author, createdAt, likedNum, _count, id } = props
  const lastReplyShow = useHomeStore((state) => state.lastReplyShow)
  const curReplyShow = useHomeStore((state) => state.curReplyShow)
  const setLastReplyShow = useHomeStore((state) => state.setLastReplyShow)
  const setCurReplyShow = useHomeStore((state) => state.setCurReplyShow)
  const [subCommentPage, setSubCommentPage] = useState(0)
  const [subCommentList, setSubCommentList] = useState([])
  const [showSpin,setShowSpin] =useState(false)
  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }
  const hideReplyInput = () => {
    setShowReplyInput(false)
  }
  const handleReply = () => {
    setShowReplyInput(true)
    setLastReplyShow(curReplyShow)
    setCurReplyShow(id)
  }
  useEffect(() => {
    if (id === lastReplyShow) {
      setShowReplyInput(false)
    }
  }, [lastReplyShow])
  const handleReplyShow = async () => {
    console.log('fetchSubCommentData')
    const res = await fetchSubCommentById(id)

    setShowSpin(true)
    setShowReply(true)
  }
  useEffect(()=>{
    setShowSpin(false)
  },[subCommentList])
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
          <Avatar size={42} src={author.avatar} className="!mr-2"></Avatar>
        </Col>
        <Col span={18} style={{ padding: '0 5px' }}>
          <Link
            href="/username"
            className="font-medium text-black hover:underline hover:text-black "
          >
            <span className="text-sm">{author.userName}</span>
          </Link>
          <p className=" text-base leading-[18px] text-black">{content}</p>
          <div className="text-gray-500 my-0.5">
            <span>{createdAt.toLocaleString()}</span>
            <span className="ml-8 hover:cursor-pointer" onClick={handleReply}>
              Reply
            </span>
          </div>
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
          <p className="w-full text-center text-gray-500 ">{likedNum}</p>
        </Col>
      </Row>
      {showReplyInput && (
        <Row style={{ marginTop: '8px' }}>
          <Col span={2}></Col>
          <Col span={19}>
            <Reply placeholder="回复..."></Reply>
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
      {showReply && (
        <>
          <SubComment></SubComment>
          <Row>
            <Col span={2}></Col>
            <Col span={2}>
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
      <Row>
        <Col span={2}></Col>
        <Col span={18}>
          {_count.commentBy !== 0 && !showReply && (
            <p
              onClick={handleReplyShow}
              className=" text-base text-gray-500 font-medium leading-[18px] hover:cursor-pointer hover:underline "
            >
              View {_count.commentBy} replies
              <DownOutlined className="!text-sm ml-1 font-semibold" />
            </p>
          )}
          {_count.commentBy !== 0 && !showReply && showSpin && (
            <div className="text-center">
              <Spin size="large" className="!my-3 " />
            </div>
          )}
        </Col>
      </Row>
    </>
  )
}

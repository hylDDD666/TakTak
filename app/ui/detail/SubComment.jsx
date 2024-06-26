'use client'
import { CloseOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Reply from './Reply'
import { useHomeStore } from '@/app/stores/homeStore'
import useAuth from '@/app/hooks/useAuth'
import { addLikeToComment, subLikeToComment } from '@/app/action/action'

export default function SubComment(props) {
  const { content, author, createdAt, _count, id } = props
  const [showReplyInput, setShowReplyInput] = useState(false)
  const lastReplyShow = useHomeStore((state) => state.lastReplyShow)
  const curReplyShow = useHomeStore((state) => state.curReplyShow)
  const setLastReplyShow = useHomeStore((state) => state.setLastReplyShow)
  const setCurReplyShow = useHomeStore((state) => state.setCurReplyShow)
  const [likeNum, setLikeNum] = useState(_count ? _count.likedBy : 0)
  const [isLike, setIsLike] = useState(props.isLike)

  useEffect(() => {
    if (id === lastReplyShow) {
      setShowReplyInput(false)
    }
  }, [lastReplyShow])
  const handleReply = useAuth(() => {
    setShowReplyInput(true)
    setLastReplyShow(curReplyShow)
    setCurReplyShow(id)
  })
  const handleLikeClick = useAuth(async () => {
    setIsLike((pre) => !pre)
    if (isLike) {
      setLikeNum((pre) => pre - 1)
      await subLikeToComment(props.id)
    } else {
      setLikeNum((pre) => (pre = 1))
      await addLikeToComment(props.id)
    }
  })
  const hideReplyInput = () => {
    setShowReplyInput(false)
  }
  const addComment = (content) => {
    setShowReplyInput(false)
    props.addSubComment(content)
  }
  return (
    <div>
      <Row wrap={false} className="mt-3">
        <Col span={2}></Col>
        <Col span={2}>
          <Avatar size={30} src={author.avatar} className="!mr-2"></Avatar>
        </Col>
        <Col span={17}>
          <Link
            href={`/${author.userName}`}
            className="font-medium text-black hover:underline hover:text-black "
          >
            <span className="text-sm">{author.userName}</span>
          </Link>
          <p className=" text-base leading-[18px]">{content}</p>
          <div className="text-gray-500 my-0.5">
            <span>{createdAt.toLocaleString()}</span>
            <span className="ml-8 hover:cursor-pointer" onClick={handleReply}>
              回复
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
          <p className="w-full text-center text-gray-500 ">{likeNum}</p>
        </Col>
      </Row>
      {showReplyInput && (
        <Row style={{ marginTop: '8px' }}>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={17}>
            <Reply placeholder="回复..." addComment={addComment}></Reply>
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

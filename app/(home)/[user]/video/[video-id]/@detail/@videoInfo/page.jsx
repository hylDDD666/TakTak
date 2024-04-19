'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Spin } from 'antd'
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Menu,
  Row,
  Tooltip,
  message,
} from 'antd'
import Meta from 'antd/es/card/Meta'
import Link from 'next/link'
import {
  HeartFilled,
  MessageFilled,
  SendOutlined,
  StarFilled,
} from '@ant-design/icons'
import { useParams, usePathname } from 'next/navigation'
import CopyToClipboard from 'react-copy-to-clipboard'
import Comment from '@/app/ui/detail/Comment'
import Reply from '@/app/ui/detail/Reply'
import BackTop from 'antd/es/float-button/BackTop'
import PlayerCard from '@/app/ui/PlayerCard'
import { useHomeStore } from '@/app/stores/homeStore'
import { fetchCommentByVideoId } from '@/app/action/action'
import useAuth from '@/app/hooks/useAuth'

export default function page() {
  const [messageApi, contextHolder] = message.useMessage()
  const params = useParams()
  const [isCollipse, setIsCollipse] = useState(true)
  const [isLike, setIsLike] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const textRef = useRef()
  const path = usePathname()
  const [showCollopse, setshowCollopse] = useState(false)
  const isCreatorVideosOn = useHomeStore((state) => state.isCreatorVideosOn)
  const isUserVideoDetailOn = useHomeStore((state) => state.isUserVideoDetailOn)
  const [isComments, setIsComments] = useState(!isCreatorVideosOn)
  const [commentList, setCommentList] = useState([])
  const spinRef = useRef()
  const [commentpage, setCommentPage] = useState(0)
  const [commentNum, setCommentNum] = useState(-1)
  const videoId = params['video-id']

  const user = useHomeStore((state) => {
    let item
    if (isCreatorVideosOn) {
      item = state.creatorVideos.find((item) => item.id == videoId)
    } else {
      if (isUserVideoDetailOn) {
        item = state.userItemList.find((item) => item.id == videoId)
      } else {
        item = state.itemList.find((item) => item.id == videoId)
      }
    }
    if (item) {
      return item.author
    }
  })
  const curVideo = useHomeStore((state) => {
    let video
    if (isCreatorVideosOn) {
      video = state.creatorVideos.find((item) => item.id == videoId)
    } else {
      if (isUserVideoDetailOn) {
        video = state.userItemList.find((item) => item.id == videoId)
      } else {
        video = state.itemList.find((item) => item.id == videoId)
      }
    }
    return video
  })
  const items = [
    {
      label: (
        <div className="font-bold w-[231px] text-center">{`Comments(${curVideo._count.comment})`}</div>
      ),
      key: 'comments',
    },
    {
      label: (
        <div className="font-bold w-[231px] text-center">Creator videos</div>
      ),
      key: 'Creator videos',
    },
  ]
  const { userName, id: userId, avatar } = user
  const getCreatorVideos = useHomeStore((state) => state.getCreatorVideos)
  const creatorVideos = useHomeStore((state) => state.creatorVideos)
  const [isFollow, setIsFollw] = useState(false)
  const commentRef = useRef()
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }
  const handleLikeClick = useAuth(() => {
    setIsLike((pre) => !pre)
  })
  const handleFavorites = useAuth(() => {
    setIsFavorite((pre) => !pre)
  })
  const handleFollow = useAuth(() => {
    setIsFollw((pre) => !pre)
  })
  const copyHandler = () => {
    messageApi.open({
      content: <div>已复制</div>,
      className: 'bg-zinc-600 w-2/5 !mx-auto opacity-60',
    })
  }
  useEffect(() => {
    if (textRef.current.scrollHeight > textRef.current.clientHeight) {
      setshowCollopse(true)
    } else {
      setshowCollopse(false)
    }
  }, [])
  useEffect(() => {
    const options = {
      rootMargin: '0px 0px 0px -90px',
      threshold: [0],
    }
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        const res = await fetchCommentByVideoId(videoId, commentpage)
        setCommentNum(res.commentNum)
        setCommentList((pre) => [...pre, ...res.comments])
        setCommentPage((pre) => pre + 1)
      }
    }, options)
    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [commentpage])
  const handleMenuClick = ({ key }) => {
    if (key === 'comments') {
      setIsComments(true)
    } else {
      if (!isCreatorVideosOn) {
        getCreatorVideos(userId)
      }
      setIsComments(false)
    }
  }

  return (
    <div
      className={`h-screen ${
        isComments ? 'overflow-y-auto' : 'overflow-hidden'
      } w-full overflow-x-hidden flex flex-col`}
      ref={commentRef}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'rgb(247,247,248)',
            colorTextPlaceholder: 'rgb(77,79,87)',
            colorBgSpotlight: 'rgb(97,97,97)',
            colorText: 'black',
          },
          components: {
            Message: {
              contentBg: 'transparent',
            },
            Menu: {
              itemColor: 'rgb(116,117,124)',
              itemHoverColor: 'rgb(116,117,124)',
            },
            Input: {
              activeBorderColor: 'rgb(197,197,201)',
            },
          },
        }}
      >
        <Card
          style={{
            width: 496,
            margin: 16,
          }}
        >
          <Meta
            title={
              <Row>
                <Col span={18}>
                  <Avatar size={42} src={avatar} className="!mr-2" />
                  <Link
                    href="/username"
                    className="text-lg font-bold text-black hover:underline hover:text-black "
                  >
                    <span>{userName}</span>
                  </Link>
                </Col>
                <Col span={6}>
                  <Button
                    size="large"
                    style={{
                      width: '100px',
                    }}
                    className={
                      isFollow
                        ? 'hover:!bg-gray-600 !bg-gray-400 !text-black'
                        : 'hover:!bg-rose-700 !bg-rose-500 !text-white'
                    }
                    onClick={handleFollow}
                  >
                    {isFollow ? '已关注' : '关注'}
                  </Button>
                </Col>
              </Row>
            }
            description={
              <div className={`text-base mb-3 flex text-black`}>
                <div
                  ref={textRef}
                  className={`mr-1 ${
                    isCollipse ? 'overflow-hidden line-clamp-2' : ''
                  } before:float-right before:w-0 before:h-full before:-mb-[28px]`}
                >
                  {showCollopse && (
                    <label
                      className="cursor-pointer font-bold  float-right clear-both"
                      onClick={toggleCollopse}
                    >
                      {isCollipse ? '展开' : '收起'}
                    </label>
                  )}
                  {curVideo.desc}
                </div>
              </div>
            }
          />
        </Card>
        <Row
          style={{
            padding: '0px 15px',
          }}
          justify={'space-between'}
        >
          <Col span={20}>
            <Button
              type="round"
              style={{
                fontWeight: 'bold',
                margin: '10px',
                padding: 5,
                height: '32px',
                width: '32px',
                backgroundColor: 'rgb(241,241,242)',
                color: 'rgb(22,24,35)',
              }}
              className={`active:!bg-gray-200 ${
                isLike ? '!text-rose-500' : ''
              }`}
              size="large"
              icon={<HeartFilled className={'!text-l'} />}
              onClick={handleLikeClick}
            ></Button>
            <strong className="w-full text-center text-xs mr-2">
              {curVideo._count.liker}
            </strong>
            <Button
              type="round"
              style={{
                fontWeight: 'bold',
                margin: '10px',
                padding: 5,
                height: '32px',
                width: '32px',
                border: 0,
                backgroundColor: 'rgb(241,241,242)',
                color: 'rgb(22,24,35)',
              }}
              icon={<MessageFilled className="!text-l" />}
              className={`active:!bg-gray-200`}
            ></Button>
            <strong className="w-full text-center text-xs mr-2">
              {curVideo._count.comment}
            </strong>
            <Button
              type="round"
              style={{
                fontWeight: 'bold',
                margin: '10px',
                padding: 5,
                height: '32px',
                width: '32px',
                border: 0,
                backgroundColor: 'rgb(241,241,242)',
                color: 'rgb(22,24,35)',
              }}
              icon={<StarFilled className="!text-l" />}
              className={`active:!bg-gray-200 ${
                isFavorite ? '!text-yellow-400' : ''
              }`}
              onClick={handleFavorites}
            ></Button>
            <strong className="w-full text-center text-xs mr-2">
              {curVideo._count.collector}
            </strong>
          </Col>
          <Col span={3}>
            <Tooltip placement="top" title="发送给朋友">
              <Button
                type="round"
                style={{
                  fontWeight: 'bold',
                  margin: '10px',
                  padding: 6,
                  height: '32px',
                  width: '32px',
                  border: 0,
                  backgroundColor: 'rgb(254,44,85)',
                  color: 'white',
                }}
                icon={<SendOutlined className="!text-l" />}
                // onClick={handleFavorites}
              ></Button>
            </Tooltip>
          </Col>
        </Row>
        <Row
          style={{
            margin: '0px 15px',
            width: '494px',
            backgroundColor: 'rgb(241,241,242)',
            borderRadius: '5px',
          }}
        >
          <Col span={19}>
            <div
              className={
                'h-full w-full leading-8 pl-4 text-ellipsis overflow-hidden'
              }
            >
              {`current/host/current/current/${path}`}
            </div>
          </Col>
          <Col span={5}>
            {contextHolder}
            <CopyToClipboard text={`current/host/current/current/${path}`}>
              <Button
                style={{
                  fontWeight: 'bold',
                  border: 0,
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: 'black',
                }}
                className="hover:!bg-gray-200"
                onClick={copyHandler}
              >
                复制链接
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
        <Menu
          onClick={handleMenuClick}
          defaultSelectedKeys={
            isCreatorVideosOn ? 'Creator videos' : 'comments'
          }
          mode="horizontal"
          items={items}
          style={{
            position: 'sticky',
            top: 0,
            color: 'black',
            backgroundColor: 'white',
            zIndex: 99,
          }}
        />

        {isComments ? (
          <div className="px-[20px] pt-[10px] w-full pb-[90px] ">
            {commentList.map((item) => {
              const { content, author, createdAt, likedNum, _count } = item
              return (
                <Comment
                  key={item.id}
                  id={item.id}
                  content={content}
                  author={author}
                  createdAt={createdAt}
                  likedNum={likedNum}
                  _count={_count}
                ></Comment>
              )
            })}
            {commentNum !== commentList.length && (
              <div ref={spinRef} className="text-center">
                <Spin size="large" className="!my-3 " />
              </div>
            )}
            <div className=" border-t border-gray-300 border-solid h-[85px]  absolute bottom-0 py-[20px] pl-[15px] bg-white left-0 right-0">
              <Reply placeholder="添加评论..."></Reply>
            </div>
          </div>
        ) : (
          <Row
            style={{
              padding: '15px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {creatorVideos.map((item) => {
              return (
                <Col
                  span={8}
                  style={{
                    height: 240,
                    paddingLeft: 10,
                    paddingBottom: 10,
                  }}
                  key={item.id}
                >
                  <PlayerCard videoUrl={item.url} id={item.id}></PlayerCard>
                </Col>
              )
            })}
          </Row>
        )}
        <BackTop
          target={() => commentRef.current}
          tooltip="回到顶部"
          style={{ position: 'absolute', bottom: '90px', right: '20px' }}
        ></BackTop>
      </ConfigProvider>
    </div>
  )
}

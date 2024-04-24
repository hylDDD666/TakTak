'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  MessageFilled,
  SendOutlined,
} from '@ant-design/icons'
import { useParams, usePathname } from 'next/navigation'
import CopyToClipboard from 'react-copy-to-clipboard'
import Comment from '@/app/ui/detail/Comment'
import Reply from '@/app/ui/detail/Reply'
import BackTop from 'antd/es/float-button/BackTop'
import PlayerCard from '@/app/ui/PlayerCard'
import { useHomeStore } from '@/app/stores/homeStore'
import FollowingButton from '@/app/ui/FollowingButton'
import LikeButton from '@/app/ui/user/LikeButton'
import CollectButton from '@/app/ui/user/CollectButton'
import { useDetailStore } from '@/app/stores/detailStore'

export default function page() {
  const [messageApi, contextHolder] = message.useMessage()
  const addCommentList = useDetailStore((state) => state.addCommentList)
  const commentList = useDetailStore((state) => state.commentList)
  const initCommentList = useDetailStore((state) => state.initCommentList)
  // const commentPage = useDetailStore((state) => state.commentPage)
  const syncCollectState = useHomeStore((state) => state.syncCollectState)
  const commentNum = useDetailStore((state) => state.commentNum)
  const setCommentNum = useDetailStore((state) => state.setCommentNum)
  const params = useParams()
  const [isCollipse, setIsCollipse] = useState(true)
  const textRef = useRef()
  const path = usePathname()
  const [showCollopse, setshowCollopse] = useState(false)
  const showSpin = useDetailStore((state) => state.showSpin)
  const isCreatorVideosOn = useHomeStore((state) => state.isCreatorVideosOn)
  const isUserVideoDetailOn = useHomeStore((state) => state.isUserVideoDetailOn)
  const syncLikeState = useHomeStore((state) => state.syncLikeState)
  const [isComments, setIsComments] = useState(!isCreatorVideosOn)
  const spinRef = useRef()
  const videoId = params['video-id']
  const user = useHomeStore((state) => {
    let item
    if (isCreatorVideosOn) {
      item = state.creatorVideos.find((item) => item.id == videoId)
    } else {
      if (isUserVideoDetailOn) {
        item = state.userItemList.find((item) => item.id == videoId)
      } else {
        item = state.itemList.find((item) => item.id == state.currentPlayId)
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
        video = state.itemList.find((item) => item.id == state.currentPlayId)
      }
    }
    return video
  })
  const { isLike, isCollect, _count } = curVideo
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
  const { userName, id: userId, avatar, isFollow } = user
  const getCreatorVideos = useHomeStore((state) => state.getCreatorVideos)
  const creatorVideos = useHomeStore((state) => state.creatorVideos)
  const syncFollowState = useHomeStore((state) => state.syncFollowState)

  const commentRef = useRef()
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }

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
    return () => {
      initCommentList()
    }
  }, [])
  useEffect(() => {
    setCommentNum(curVideo._count.comment)
    const options = {
      rootMargin: '-290px 0px 0px -90px',
      threshold: [0],
    }
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.intersectionRatio || entry.isIntersecting) {
        await addCommentList(videoId)
      }
    }, options)

    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [commentList])

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
                    href={`/${userName}`}
                    className="text-lg font-bold text-black hover:underline hover:text-black "
                  >
                    <span>{userName}</span>
                  </Link>
                </Col>
                <Col span={6}>
                  <FollowingButton
                    name={userName}
                    isFollowed={isFollow}
                    syncFollowState={syncFollowState}
                  ></FollowingButton>
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
            <LikeButton
              likeNum={_count.liker}
              id={videoId}
              isLike={isLike}
              syncLikeState={syncLikeState}
            ></LikeButton>
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
              {commentNum}
            </strong>
            <CollectButton
              collectNum={_count.collector}
              id={videoId}
              isCollect={isCollect}
              syncCollectState={syncCollectState}
            ></CollectButton>
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
              const { content, author, createdAt, _count } = item
              return (
                <Comment
                  key={item.id}
                  id={item.id}
                  content={content}
                  author={author}
                  createdAt={createdAt}
                  _count={_count}
                ></Comment>
              )
            })}
            {showSpin && (
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

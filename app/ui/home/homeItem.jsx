'use client'
import { Avatar, Button, Card, Col, Row } from 'antd'
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { HeartFilled, MergeFilled, MessageFilled, StarFilled } from '@ant-design/icons'
import VideoPlayer from '../video-player'
import { Transition } from 'react-transition-group'
import { useHomeStore } from '@/app/stores/homeStore'

const defaultStyle = {
  transition: 'all 300ms linear',
  display: 'block',
  maxHeight: '1000px'
}
const transitionStyles = {
  entering: { opacity: 1, maxHeight: '1000px' },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { maxHeight: 0, opacity: 0, padding: 0 }
}

export default function HomeItem(props) {
  const { user, desc, videoInfo, disLike, id, isPlaying } = props
  const deleteItem = useHomeStore((state) => state.deleteItem)
  const pauseItem = useHomeStore((state) => state.pauseAllItems)
  const playItem = useHomeStore((state) => state.playItemById)
  const [isCollipse, setIsCollipse] = useState(true)
  const [isLike, setIsLike] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const nodeRef = useRef()
  const textRef = useRef()
  const [showCollopse, setshowCollopse] = useState(false)
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }
  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }
  const handleFavorites = () => {
    setIsFavorite((pre) => !pre)
  }
  const scrollNext = () => {
    console.log(nodeRef.current.getBoundingClientRect().bottom);
    window.scrollTo({
      behavior: 'smooth',
      top: window.scrollY + nodeRef.current.getBoundingClientRect().bottom - 63
    })
  }
  useEffect(() => {
    if (textRef.current.scrollHeight > textRef.current.clientHeight) {
      setshowCollopse(true)
    } else {
      setshowCollopse(false)
    }
    const options = {
      rootMargin: '-63px 0px 0px 0px',
      threshold: [0, 0.2, 0.6, 0.8, 1]
    }
    const observer = new IntersectionObserver((entrys) => {
      for (let entry of entrys) {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.95) {
            playItem(id)
          }
        }
      }
    }, options)
    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Transition
      nodeRef={nodeRef}
      timeout={100}
      in={!disLike}
      onExited={() => {
        setTimeout(() => {
          deleteItem(id)
        }, 300)
      }}
    >
      {(state) => {
        return (
          <div
            className="border-b border-slate-200 border-solid pt-6"
            ref={nodeRef}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <Row justify={'center'} wrap={false}>
              <Col flex={'60px'}>
                <Avatar size={56} src={user.avatar} />
              </Col>
              <Col flex={'auto'} style={{ maxWidth: '510px' }}>
                <a
                  href="#javascript"
                  className="text-lg font-bold text-black hover:underline hover:text-black "
                >
                  <h3>{user.userName}</h3>
                </a>
                <div className={`text-lg mb-3 flex `}>
                  <div
                    ref={textRef}
                    className={`mr-1 ${
                      isCollipse ? 'overflow-hidden line-clamp-3' : ''
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
                    {desc}
                  </div>
                </div>
              </Col>
              <Col flex={'100px'}>
                <Button
                  size="large"
                  style={{
                    width: '100px',
                    color: 'rgb(254,44,85)',
                    borderColor: 'rgb(254,44,85)'
                  }}
                  className="hover:!bg-rose-100"
                >
                  关注
                </Button>
              </Col>
            </Row>
            <Row justify={'center'} wrap={false}>
              <Col flex={'60px'}></Col>
              <Col flex={'auto'} style={{ maxWidth: '610px', display: 'flex' }} className="pb-10">
                <VideoPlayer
                  videoInfo={videoInfo.videoInfo}
                  id={videoInfo.id}
                  isPlay={isPlaying}
                  scrollNext={scrollNext}
                ></VideoPlayer>
                <div className="w-[48px] min-w-12 ml-3 flex flex-col flex-wrap justify-end">
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      height: '48px',
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    className={`active:!bg-gray-200 ${isLike ? '!text-rose-500' : ''}`}
                    size="large"
                    icon={<HeartFilled className={'!text-xl'} />}
                    onClick={handleLikeClick}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">{videoInfo.likeNum}</strong>
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      height: '48px',
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    size="large"
                    icon={<MessageFilled className="!text-xl" />}
                    className={`active:!bg-gray-200`}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">
                    {videoInfo.commentsNum}
                  </strong>
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      height: '48px',
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    size="large"
                    icon={<StarFilled className="!text-xl" />}
                    className={`active:!bg-gray-200 ${isFavorite ? '!text-yellow-400' : ''}`}
                    onClick={handleFavorites}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">
                    {videoInfo.collectNum}
                  </strong>
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      height: '48px',
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    size="large"
                    icon={<MergeFilled className="!text-xl" />}
                    className={`active:!bg-gray-200 `}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">{videoInfo.shareNum}</strong>
                </div>
              </Col>
            </Row>
          </div>
        )
      }}
    </Transition>
  )
}

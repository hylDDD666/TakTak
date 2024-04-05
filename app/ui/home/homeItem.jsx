'use client'
import { Avatar, Button, Col, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import {
  HeartFilled,
  MergeFilled,
  MessageFilled,
  StarFilled,
} from '@ant-design/icons'
import VideoPlayer from '../video-player'
import { Transition } from 'react-transition-group'
import { useHomeStore } from '@/app/stores/homeStore'

const defaultStyle = {
  transition: 'all 300ms linear',
  display: 'block',
  maxHeight: '1000px',
}
const transitionStyles = {
  exiting: { maxHeight: 0, opacity: 0, transition: 'all 500ms' },
}

export default React.memo(function HomeItem(props) {
  const { user, desc, videoInfo, disLike, id, isPlaying } = props
  const curId = useHomeStore((state) => state.currentPlayId)
  const playItem = useHomeStore((state) => state.playItemById)
  const isDetailOn = useHomeStore((state) => state.isDetailOn)
  const pauseAllItems = useHomeStore((state) => state.pauseAllItems)
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
    nodeRef.current.parentNode.scrollTo({
      behavior: 'smooth',
      top:
        nodeRef.current.parentNode.scrollTop +
        nodeRef.current.getBoundingClientRect().bottom -
        63,
    })
  }
  useEffect(() => {
    if (isDetailOn) {
      pauseAllItems()
    }
    // const options = {
    //   rootMargin: '-10% 0px 0px -30%',
    //   threshold: [0, 0.5, 1]
    // }
    // const observer = new IntersectionObserver((entrys) => {
    //   for (let entry of entrys) {
    //     if (entry.isIntersecting) {
    //       if (entry.intersectionRatio >= 0.4) {
    //         if (!isDetailOn) {
    //           playItem(id)
    //         }
    //       }
    //     }
    //   }
    // }, options)
    // if (nodeRef.current) {
    //   observer.observe(nodeRef.current)
    // }
    // return () => {
    //   observer.disconnect()
    // }
  }, [isDetailOn])
  useEffect(() => {
    if (textRef.current.scrollHeight > textRef.current.clientHeight) {
      setshowCollopse(true)
    } else {
      setshowCollopse(false)
    }
  }, [])
  useEffect(() => {
    if (curId === id) {
      nodeRef.current.parentNode.scrollTo(0, nodeRef.current.offsetTop - 65)
    }
  }, [curId])
  useEffect(() => {
    if (
      props.scrollHeight >= nodeRef.current.offsetTop-150 &&
      props.scrollHeight <=
        nodeRef.current.offsetTop + nodeRef.current.clientHeight*0.6
    ) {
      if (!isDetailOn) {
        playItem(id)
      }
      console.log(nodeRef.current.offsetTop)
    }
  }, [props.scrollHeight])
  return (
    <Transition
      nodeRef={nodeRef}
      timeout={500}
      in={!disLike}
      unmountOnExit={true}
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
                    borderColor: 'rgb(254,44,85)',
                  }}
                  className="hover:!bg-rose-100"
                >
                  关注
                </Button>
              </Col>
            </Row>
            <Row justify={'center'} wrap={false}>
              <Col flex={'60px'}></Col>
              <Col
                flex={'auto'}
                style={{ maxWidth: '610px', display: 'flex' }}
                className="pb-10"
              >
                <VideoPlayer
                  videoInfo={videoInfo.videoInfo}
                  id={id}
                  user={user}
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
                      backgroundColor: 'rgb(241,241,242)',
                    }}
                    className={`active:!bg-gray-200 ${
                      isLike ? '!text-rose-500' : ''
                    }`}
                    size="large"
                    icon={<HeartFilled className={'!text-xl'} />}
                    onClick={handleLikeClick}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">
                    {videoInfo.likeNum}
                  </strong>
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      height: '48px',
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)',
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
                      backgroundColor: 'rgb(241,241,242)',
                    }}
                    size="large"
                    icon={<StarFilled className="!text-xl" />}
                    className={`active:!bg-gray-200 ${
                      isFavorite ? '!text-yellow-400' : ''
                    }`}
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
                      backgroundColor: 'rgb(241,241,242)',
                    }}
                    size="large"
                    icon={<MergeFilled className="!text-xl" />}
                    className={`active:!bg-gray-200 `}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">
                    {videoInfo.shareNum}
                  </strong>
                </div>
              </Col>
            </Row>
          </div>
        )
      }}
    </Transition>
  )
})

'use client'
import { Avatar, Button, Col, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { HeartFilled, MergeFilled, MessageFilled, StarFilled } from '@ant-design/icons'
import VideoPlayer from '../video-player'
import { Transition } from 'react-transition-group'
import { useHomeStore } from '@/app/stores/homeStore'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import Link from 'next/link'
import FollowingButton from '../FollowingButton'
import LikeButton from './LikeButton'
import CollectButton from './CollectButton'
import { addShareNum, getShareNUm } from '@/app/action/action'

const defaultStyle = {
  transition: 'all 300ms linear',
  display: 'block',
  maxHeight: '1000px'
}
const transitionStyles = {
  exiting: { maxHeight: 0, opacity: 0, transition: 'all 500ms' }
}

export default function HomeItem(props) {
  const { user, desc, videoInfo, disLike, id, isPlaying, isLike, isCollect } = props
  const curId = useHomeStore((state) => state.currentPlayId)
  const playItem = useHomeStore((state) => state.playItemById)
  const isDetailOn = useHomeStore((state) => state.isDetailOn)
  const pauseAllItems = useHomeStore((state) => state.pauseAllItems)
  const syncFollowState = useHomeStore((state) => state.syncFollowState)
  const setIsDetailOn = useHomeStore((state) => state.setIsDetailOn)
  const setCurId = useHomeStore((state) => state.setCurId)
  const syncLikeState = useHomeStore((state) => state.syncLikeState)
  const syncCollectState = useHomeStore((state) => state.syncCollectState)
  const router = useRouter()
  const pauseItemById = useHomeStore((state) => state.pauseItemById)
  const [isCollipse, setIsCollipse] = useState(true)
  const [isLoad, setIsLoad] = useState(false)
  const nodeRef = useRef()
  const textRef = useRef()
  const [showCollopse, setshowCollopse] = useState(false)
  const [shareNum, setShareNum] = useState(videoInfo.shareNum)
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }

  const handleShare = useAuth(async () => {
    await addShareNum(id)
  })
  const scrollNext = () => {
    nodeRef.current.parentNode.scrollTo({
      behavior: 'smooth',
      top:
        nodeRef.current.parentNode.scrollTop + nodeRef.current.getBoundingClientRect().bottom - 63
    })
  }
  const videoClickHandler = () => {
    setIsDetailOn(true)
    setCurId(id)
    pauseItemById(id)
    router.push(`/${user.userName}/video/${id}`, { scroll: false })
  }
  const handleCommentClick = useAuth(videoClickHandler)

  useEffect(() => {
    if (isDetailOn) {
      pauseAllItems()
    }
  }, [isDetailOn])
  const getShare = async () => {
    const res = await getShareNUm(id)
    setShareNum(res)
  }
  useEffect(() => {
    if (textRef.current.scrollHeight > textRef.current.clientHeight) {
      setshowCollopse(true)
    } else {
      setshowCollopse(false)
    }
    getShare()
  }, [])
  useEffect(() => {
    if (!isLoad) {
    const options = {
      rootMargin: '-10% 0px 100% 0px',
      threshold: [0, 0.5, 1]
    }
    const observer = new IntersectionObserver((entrys) => {
      for (let entry of entrys) {
        if (entry.isIntersecting) {
          setIsLoad(true)
          playItem(id)
        }
      }
    }, options)
    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      observer.unobserve(nodeRef.current)
    }
    }
  }, [isLoad])
  useEffect(() => {
    if (curId === id) {
      nodeRef.current.parentNode.scrollTo(0, nodeRef.current.offsetTop - 65)
    }
  }, [curId])
  useEffect(() => {
    if (
      nodeRef.current &&
      props.scrollHeight >= nodeRef.current.offsetTop - 300 &&
      props.scrollHeight <= nodeRef.current.offsetTop + nodeRef.current.clientHeight * 0.3
    ) {
      if (!isDetailOn) {
        playItem(id)
      }
    }
  }, [props.scrollHeight])
  return (
    <Transition nodeRef={nodeRef} timeout={500} in={!disLike} unmountOnExit={true}>
      {(state) => {
        return (
          <div
            className="border-b border-slate-200 border-solid pt-6 "
            ref={nodeRef}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <Row justify={'center'} wrap={false}>
              <Col flex={'60px'}>
                <Avatar size={56} src={isLoad ? user.avatar : ''} />
              </Col>
              <Col flex={'auto'} style={{ maxWidth: '510px' }}>
                <Link href={`/${user.userName}`}>
                  <h3 className="text-lg font-bold text-black hover:underline hover:text-black ">
                    {user.userName}
                  </h3>
                </Link>
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
                <FollowingButton
                  name={user.userName}
                  isFollowed={user.isFollow}
                  syncFollowState={syncFollowState}
                ></FollowingButton>
              </Col>
            </Row>
            <Row justify={'center'} wrap={false}>
              <Col flex={'60px'}></Col>
              <Col flex={'auto'} style={{ maxWidth: '610px', display: 'flex' }} className="pb-10">
                <VideoPlayer
                  videoInfo={videoInfo.videoInfo}
                  id={id}
                  user={user}
                  isPlay={isPlaying}
                  scrollNext={scrollNext}
                  isLoad={isLoad}
                ></VideoPlayer>

                <div className="w-[20px] min-w-5 ml-3 flex flex-col flex-wrap justify-end md:w-[40px] md:min-w-10">
                  <LikeButton
                    likeNum={videoInfo.likeNum}
                    id={id}
                    isLike={isLike}
                    syncLikeState={syncLikeState}
                  ></LikeButton>

                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    size="large"
                    icon={<MessageFilled className="!text-sm md:!text-lg" />}
                    className={`active:!bg-gray-200 !h-5  md:!h-10`}
                    onClick={handleCommentClick}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">
                    {videoInfo.commentsNum}
                  </strong>
                  <CollectButton
                    collectNum={videoInfo.collectNum}
                    id={id}
                    isCollect={isCollect}
                    syncCollectState={syncCollectState}
                  ></CollectButton>
                  <Button
                    type="round"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      padding: 0,
                      border: 0,
                      backgroundColor: 'rgb(241,241,242)'
                    }}
                    size="large"
                    icon={<MergeFilled className="!text-sm md:!text-lg" />}
                    className={`active:!bg-gray-200 !h-5 md:!h-10`}
                    onClick={handleShare}
                  ></Button>
                  <strong className="w-full text-center text-xs mb-2">{shareNum}</strong>
                </div>
              </Col>
            </Row>
          </div>
        )
      }}
    </Transition>
  )
}

'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DislikeOutlined,
  DownOutlined,
  EllipsisOutlined,
  FlagOutlined,
  MutedOutlined,
  PauseOutlined,
  PlayCircleFilled,
  SearchOutlined,
  SoundOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Popover, Row, Slider, Tooltip } from 'antd'
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useHomeStore } from '../../stores/homeStore'
import ReactPlayer from 'react-player'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VideoDetail() {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlay, setIsPlay] = useState(true)
  const [volume, setVolume] = useState(20)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [show, setShow] = useState(true)
  const params = useParams()
  const id = params['video-id'] * 1
  const playerRef = useRef()
  const router = useRouter()
  const disLikeItem = useHomeStore((state) => state.disLikeItem)
  // const [isAutoRoll, setIsAutoRoll] = useState(false)
  const playItemById = useHomeStore((state) => state.playItemById)
  const fetchItemData = useHomeStore((state) => state.fetchItemData)
  const item = useHomeStore((state) => {
    return state.itemList.find((item) => item.id == id)
  })
  const index = useHomeStore((state) => {
    return state.itemList.findIndex((item) => item.id == id)
  })
  const listLength = useHomeStore((state) => {
    return state.itemList.length
  })
  const setCurId = useHomeStore((state) => state.setCurId)
  const nextItem = useHomeStore((state) => {
    if (index < state.itemList.length) {
      return state.itemList[index + 1]
    }
  })
  const preItem = useHomeStore((state) => {
    if (index > 0) {
      return state.itemList[index - 1]
    } else {
      return null
    }
  })
  const setIsDetailOn = useHomeStore((state) => state.setIsDetailOn)
  const { url } = item.video.videoInfo
  useEffect(() => {
    setIsDetailOn(true)
    console.log(1111);
    return () => {
      console.log(11111);
      setIsDetailOn(false)
    }
  }, [])

  useEffect(() => {
    setDomLoaded(true)
    setCurId(id)
  }, [id])
  useEffect(() => {
    setIsPlay(true)
    if (index === listLength - 2) {
      fetchItemData()
    }
  }, [id])
  const onChange = (newValue) => {
    setSliderValue(newValue)
    playerRef.current.seekTo(newValue / 100)
  }

  const isAutoRoll = useHomeStore((state) => state.isAutoRoll)
  const toggleAutoRoll = useHomeStore((state) => state.toggleAutoRoll)
  // const playItemById = useHomeStore((state) => state.playItemById)
  // const pauseItemById = useHomeStore((state) => state.pauseItemById)
  // const { id, isPlay,user } = props

  const handleDuration = (value) => {
    setDuration(value)
  }
  const volumeChange = (newValue) => {
    if (newValue > 0) setIsMuted(false)
    setVolume(newValue)
  }
  const togglePlaying = (e) => {
    e.stopPropagation()
    setIsPlay((pre) => !pre)
  }
  const toggleRoll = (e) => {
    e.stopPropagation()
    toggleAutoRoll()
  }
  const handllePlay = (played) => {
    setSliderValue((played.playedSeconds / duration) * 100)
  }
  const handleMute = (e) => {
    e.stopPropagation()
    setIsMuted((pre) => !pre)
  }
  const handleMouseEnter = () => {
    setShow(true)
  }
  const handleMouseLeave = () => {
    setShow(false)
  }

  const handleClose = () => {
    playItemById(id)
    router.back()
  }
  const handleToNext = () => {
    router.replace(`/${nextItem.user.userName}/video/${nextItem.id}`)
  }
  const handleToPre = () => {
    if (index !== 0) {
      router.replace(`/${preItem.user.userName}/video/${preItem.id}`)
    }
  }
  const handleAutoPlay = () => {
    if (isAutoRoll) {
      handleToNext()
    }
  }
  const handleDislike = (e) => {
    e.stopPropagation()
    handleToNext()
    disLikeItem(id)
  }
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      handleToNext()
    } else {
      handleToPre()
    }
  }

  return (
    <>
      {domLoaded && (
        <div
          className={`h-full w-full  relative   overflow-hidden bg-black z-0`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlaying}
          onWheel={handleWheel}
        >
          <div className={`w-full h-full absolute bg-transparent z-10 `}>
            <div
              className={'absolute top-5 text-white w-full'}
              onClick={(e) => e.stopPropagation()}
            >
              <Row wrap={false}>
                <Col flex={'80px'} className="text-center">
                  <Button
                    size="large"
                    icon={<CloseOutlined className={'!text-2xl'} />}
                    style={{
                      fontWeight: 'bold',
                      border: 0,
                      backgroundColor: 'rgba(255,255,255,.3)',
                      color: 'white',
                    }}
                    className="hover:!opacity-50"
                    onClick={handleClose}
                  ></Button>
                </Col>
                <Col flex={'auto'}>
                  <Input
                    placeholder="input search text"
                    allowClear
                    size="large"
                    style={{
                      width: '100%',
                      color: 'white',
                    }}
                    addonAfter={
                      <Button
                        size="large"
                        icon={<SearchOutlined className={'!text-2xl'} />}
                        style={{
                          fontWeight: 'bold',
                          border: 0,
                          backgroundColor: 'transparent',
                          color: 'white',
                          height: '38px',
                          width: '24px',
                        }}
                        className="hover:!opacity-50"
                      ></Button>
                    }
                  />
                </Col>
                <Col flex={'80px'} className="text-center">
                  <Popover
                    color="rgba(27,27,27,0.2)"
                    content={
                      <div>
                        <div>
                          <Button
                            style={{
                              fontWeight: 'bold',
                              border: 0,
                              backgroundColor: 'rgb(27,27,27,0)',
                              color: 'white',
                            }}
                            icon={<DislikeOutlined />}
                            onClick={handleDislike}
                            className="hover:!opacity-50"
                          >
                            不感兴趣
                          </Button>
                        </div>
                        <div>
                          <Button
                            style={{
                              fontWeight: 'bold',
                              border: 0,
                              backgroundColor: 'rgb(27,27,27,0)',
                              color: 'white',
                            }}
                            icon={<FlagOutlined />}
                            className="hover:!opacity-50"
                          >
                            举报
                          </Button>
                        </div>
                      </div>
                    }
                    placement="bottomRight"
                    arrow={false}
                    className="rounded"
                  >
                    <Button
                      size="large"
                      icon={<EllipsisOutlined className={'!text-2xl'} />}
                      style={{
                        fontWeight: 'bold',
                        border: 0,
                        backgroundColor: 'rgba(255,255,255,.3)',
                        color: 'white',
                      }}
                      className="hover:!opacity-50"
                    ></Button>
                  </Popover>
                </Col>
              </Row>
            </div>
            <div
              className="w-[40px] absolute right-4 bottom-2/4 translate-y-2/4"
              onClick={(e) => e.stopPropagation()}
            >
              {index != 0 && (
                <Link
                  replace={true}
                  href={`/${preItem.user.userName}/video/${preItem.id}`}
                >
                  <Button
                    size="large"
                    icon={<UpOutlined className={'!text-2xl'} />}
                    style={{
                      fontWeight: 'bold',
                      border: 0,
                      backgroundColor: 'rgba(255,255,255,.3)',
                      color: 'white',
                      marginBottom: '20px',
                    }}
                    className="hover:!opacity-50"
                  ></Button>
                </Link>
              )}
              {index < listLength - 1 && (
                <Link
                  replace={true}
                  href={`/${nextItem.user.userName}/video/${nextItem.id}`}
                >
                  <Button
                    size="large"
                    icon={<DownOutlined className={'!text-2xl'} />}
                    style={{
                      fontWeight: 'bold',
                      border: 0,
                      backgroundColor: 'rgba(255,255,255,.3)',
                      color: 'white',
                    }}
                    className="hover:!opacity-50"
                  ></Button>
                </Link>
              )}
            </div>
            <div
              className={
                'absolute bottom-0 w-full h-[80px] text-white px-[10px] bg-gradient-to-t from-slate-800 '
              }
              onClick={(e) => e.stopPropagation()}
            >
              <Row justify={'space-between'}>
                <Col span={'auto'}>
                  <Button
                    size="large"
                    icon={
                      isPlay ? (
                        <PauseOutlined className={'!text-2xl'} />
                      ) : (
                        <PlayCircleFilled className={'!text-2xl'} />
                      )
                    }
                    style={{
                      border: 0,
                      padding: 0,
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                    onClick={togglePlaying}
                  ></Button>
                </Col>
                <Col span={'80px'}>
                  <Tooltip
                    placement="top"
                    arrow={false}
                    title={isAutoRoll ? '自动滚动已开启' : '自动滚动已关闭'}
                    color="rgb(54,54,54)"
                    overlayStyle={{ fontSize: 'small', color: 'white' }}
                  >
                    <Button
                      size="large"
                      icon={
                        isAutoRoll ? (
                          <ArrowUpOutlined className={'!text-2xl'} />
                        ) : (
                          <CloseCircleOutlined className={'!text-2xl'} />
                        )
                      }
                      onClick={toggleRoll}
                      style={{
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: 'white',
                        width: '36px',
                      }}
                    ></Button>
                  </Tooltip>
                  <Popover
                    placement="top"
                    arrow={false}
                    color="transparent"
                    content={
                      <div className="h-[60px]">
                        <Slider
                          vertical
                          defaultValue={30}
                          style={{ margin: 0 }}
                          value={isMuted ? 0 : volume}
                          onChange={volumeChange}
                        />
                      </div>
                    }
                  >
                    <Button
                      size="large"
                      icon={
                        volume === 0 || isMuted ? (
                          <MutedOutlined className={'!text-2xl'} />
                        ) : (
                          <SoundOutlined className={'!text-2xl'} />
                        )
                      }
                      style={{
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: 'white',
                        width: '36px',
                      }}
                      onClick={handleMute}
                    ></Button>
                  </Popover>
                </Col>
              </Row>
              <Row
                className={`!opacity-0 ${
                  show ? '!opacity-100' : ''
                } !transition-opacity`}
              >
                <Col flex={'auto'}>
                  <Slider
                    min={0}
                    max={100}
                    onChange={onChange}
                    value={sliderValue}
                    style={{ margin: 0, marginTop: '3px' }}
                    tooltip={{
                      open: false,
                    }}
                  />
                </Col>
                <Col flex={'70px'} className="leading-3">
                  <span className="text-xs ml-3">
                    {' '}
                    {Math.floor((sliderValue * duration) / 6000) < 10
                      ? '0' + Math.floor((sliderValue * duration) / 6000)
                      : Math.floor((sliderValue * duration) / 6000)}
                    :
                    {Math.floor(((sliderValue * duration) / 100) % 60) < 10
                      ? '0' + Math.floor(((sliderValue * duration) / 100) % 60)
                      : Math.floor(((sliderValue * duration) / 100) % 60)}
                  </span>
                  /
                  <span className="text-xs ">
                    {Math.floor(duration / 60) < 10
                      ? '0' + Math.floor(duration / 60)
                      : Math.floor(duration / 60)}
                    :
                    {Math.floor(duration % 60) < 10
                      ? '0' + Math.floor(duration % 60)
                      : Math.floor(duration % 60)}
                  </span>
                </Col>
              </Row>
            </div>
          </div>
          <div className="z-0 h-full">
            <ReactPlayer
              ref={playerRef}
              playing={isPlay}
              loop={!isAutoRoll}
              volume={isMuted ? 0 : volume / 100}
              width={'100%'}
              height={'100%'}
              url={url}
              onDuration={handleDuration}
              onProgress={handllePlay}
              onEnded={handleAutoPlay}
              // style={type === 'row' ? { position: 'absolute' } : {}}
            ></ReactPlayer>
          </div>
        </div>
      )}
    </>
  )
}

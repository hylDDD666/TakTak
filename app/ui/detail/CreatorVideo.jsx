'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  MutedOutlined,
  PauseOutlined,
  PlayCircleFilled,
  SearchOutlined,
  SoundOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Col, Image, Input, Popover, Row, Slider, Tooltip } from 'antd'
import React, {  useEffect, useRef, useState } from 'react'
import { useHomeStore } from '../../stores/homeStore'
import ReactPlayer from 'react-player'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getVideoPreviewImg } from '@/app/lib/getVideoPreview'

const debounce = (func, delay) => {
  let timeout
  return (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(e)
    }, delay)
  }
}

export default function CreatorVideo() {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlay, setIsPlay] = useState(true)
  const [volume, setVolume] = useState(20)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [previewShow, setPreviewShow] = useState(false)
  const [previewImg, setPreviewImg] = useState('')
  const [show, setShow] = useState(true)
  const [url, setUrl] = useState('')
  const params = useParams()
  const id = params['video-id'] * 1
  const playerRef = useRef()
  const previewRef = useRef()
  const router = useRouter()
  const item = useHomeStore((state) => {
    return state.creatorVideos.find((item) => item.id == id)
  })
  const index = useHomeStore((state) => {
    return state.creatorVideos.findIndex((item) => item.id == id)
  })
  const listLength = useHomeStore((state) => {
    return state.creatorVideos.length
  })
  const setCurId = useHomeStore((state) => state.setCurId)
  const nextItem = useHomeStore((state) => {
    if (index < state.creatorVideos.length) {
      return state.creatorVideos[index + 1]
    }
  })
  const preItem = useHomeStore((state) => {
    if (index > 0) {
      return state.creatorVideos[index - 1]
    } else {
      return null
    }
  })

  // useEffect(() => {
  //   setIsDetailOn(true)
  //   getCreatorVideos()
  //   return () => {
  //     setIsDetailOn(false)
  //   }
  // }, [])

  useEffect(() => {
    setDomLoaded(true)
    setCurId(id)
    setIsPlay(true)
    if (item) {
      setUrl(item.video.videoInfo)
    }
  }, [id])
  const onChange = (newValue) => {
    setSliderValue(newValue)
    playerRef.current.seekTo(newValue / 100)
  }

  const isAutoRoll = useHomeStore((state) => state.isAutoRoll)
  const toggleAutoRoll = useHomeStore((state) => state.toggleAutoRoll)

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
    router.back()
  }
  const handleToNext = () => {
    router.replace(`/${nextItem.author.userName}/video/${nextItem.id}`)
  }
  const handleToPre = () => {
    if (index !== 0) {
      router.replace(`/${preItem.author.userName}/video/${preItem.id}`)
    }
  }
  const handleAutoPlay = () => {
    if (isAutoRoll) {
      handleToNext()
    }
  }
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      handleToNext()
    } else {
      handleToPre()
    }
  }

  const getPreviewDebonced = debounce(async (e) => {
    const mouseX = e.clientX
    const width = e.target.clientWidth
    const time = (mouseX / width) * duration
    const res = await getVideoPreviewImg(url, time)
    setPreviewImg(res)
  }, 300)
  const showVideoPreview = (e) => {
    const mouseX = e.clientX
    previewRef.current.style.left =
      mouseX - previewRef.current.clientWidth / 2 + 'px'
    getPreviewDebonced(e)
    setPreviewShow(true)
  }

  const hideVideoPreview = () => {
    setPreviewShow(false)
  }
  return (
    <>
      {domLoaded && (
        <div
          className={`h-full w-full  relative overflow-hidden bg-black z-0`}
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
                <Col flex={'80px'} className="text-center"></Col>
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
                    >
                      退出创作者视频
                    </Button>
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
              <Row>
                <Col flex={'10vw'}></Col>
              </Row>
              <Row
                className={`!opacity-0 ${
                  show ? '!opacity-100' : ''
                } !transition-opacity`}
              >
                <Col
                  flex={'auto'}
                  onMouseMove={showVideoPreview}
                  onMouseLeave={hideVideoPreview}
                >
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

          <div
            ref={previewRef}
            className={`max-w-1/5 max-h-1/4 absolute bottom-[50px] text-white z-40 ${
              previewShow ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={previewImg}
              placeholder={true}
              width={'120px'}
              preview={false}
            />
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

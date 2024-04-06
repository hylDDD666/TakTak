'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  FlagOutlined,
  MutedOutlined,
  PauseOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  SendOutlined,
  SoundOutlined
} from '@ant-design/icons'
import { Button, Col, Popover, Row, Slider, Tooltip } from 'antd'
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useHomeStore } from '../stores/homeStore'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/navigation'

export default React.memo(function VideoPlayer(props) {
  const { url, type, cover } = props.videoInfo
  const { id, isPlay, user, isLoad } = props
  const [domLoaded, setDomLoaded] = useState(false)
  // const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(20)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [show, setShow] = useState(false)
  const router = useRouter()
  const playerRef = useRef()

  useEffect(() => {
    setDomLoaded(true)
  }, [])
  const onChange = (newValue) => {
    setSliderValue(newValue)
    playerRef.current.seekTo(newValue / 100)
  }
  const setCurId = useHomeStore((state) => state.setCurId)
  const disLikeItem = useHomeStore((state) => state.disLikeItem)
  const isAutoRoll = useHomeStore((state) => state.isAutoRoll)
  const toggleAutoRoll = useHomeStore((state) => state.toggleAutoRoll)
  const playItemById = useHomeStore((state) => state.playItemById)
  const pauseItemById = useHomeStore((state) => state.pauseItemById)
  const handleDuration = (value) => {
    setDuration(value)
  }
  const volumeChange = (newValue) => {
    if (newValue > 0) setIsMuted(false)
    setVolume(newValue)
  }
  const togglePlaying = (e) => {
    e.stopPropagation()
    if (isPlay) {
      pauseItemById(id)
    } else {
      playItemById(id)
    }
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
  const handleDislike = (e) => {
    e.stopPropagation()
    disLikeItem(id)
  }
  const handleAutoPlay = () => {
    if (isAutoRoll) {
      props.scrollNext()
    }
  }
  const videoClickHandler = () => {
    setCurId(id)
    pauseItemById(id)
    router.push(`/${user.userName}/video/${id}`, { scroll: false })
  }
  return (
    <>
      {domLoaded && (
        <div
          className={`${
            type === 'col' ? 'w-3/5 max-w-96 min-w-52' : 'w-full '
          } rounded-lg relative   overflow-hidden bg-gray-300 z-0`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={videoClickHandler}
        >
          {isLoad && <img src={cover} className="w-full h-full z-0" />}
          {isLoad && (
            <>
              <div
                className={`w-full h-full top-0 absolute bg-transparent z-20 opacity-0 ${
                  show ? 'opacity-100' : ''
                } transition-opacity`}
              >
                <div
                  className={'absolute top-5 right-5 text-white '}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Popover
                    content={
                      <>
                        <Button
                          style={{
                            fontWeight: 'bold',
                            border: 0,
                            marginRight: '10px'
                          }}
                          icon={<DislikeOutlined />}
                          onClick={handleDislike}
                        >
                          不感兴趣
                        </Button>
                        <Button
                          style={{
                            fontWeight: 'bold',
                            border: 0,
                            marginRight: '10px'
                          }}
                          icon={<FlagOutlined />}
                        >
                          举报
                        </Button>
                      </>
                    }
                    placement="right"
                    arrow={false}
                    align={{
                      offset: [25, 0]
                    }}
                    className="rounded"
                  >
                    <EllipsisOutlined className="text-3xl !font-bold hover:cursor-pointer " />
                  </Popover>
                </div>
                <div
                  className={
                    'absolute bottom-0 w-full h-[60px] text-white px-[10px] bg-gradient-to-t from-slate-800 '
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <Row justify={'space-between'}>
                    <Col span={'auto'}>
                      <Button
                        icon={
                          isPlay ? (
                            <PauseOutlined className={'!text-xl'} />
                          ) : (
                            <PlayCircleFilled className={'!text-xl'} />
                          )
                        }
                        style={{
                          border: 0,
                          padding: 0,
                          backgroundColor: 'transparent',
                          color: 'white'
                        }}
                        onClick={togglePlaying}
                      ></Button>
                    </Col>
                    <Col span={'60px'}>
                      <Tooltip
                        placement="top"
                        arrow={false}
                        title={isAutoRoll ? '自动滚动已开启' : '自动滚动已关闭'}
                        color="rgb(54,54,54)"
                        overlayStyle={{ fontSize: 'small', color: 'white' }}
                      >
                        <Button
                          icon={
                            isAutoRoll ? (
                              <ArrowUpOutlined className={'!text-xl'} />
                            ) : (
                              <CloseCircleOutlined className={'!text-xl'} />
                            )
                          }
                          onClick={toggleRoll}
                          style={{
                            border: 0,
                            padding: 0,
                            backgroundColor: 'transparent',
                            color: 'white',
                            width: '28px'
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
                          icon={
                            volume === 0 || isMuted ? (
                              <MutedOutlined className={'!text-xl'} />
                            ) : (
                              <SoundOutlined className={'!text-xl'} />
                            )
                          }
                          style={{
                            border: 0,
                            padding: 0,
                            backgroundColor: 'transparent',
                            color: 'white',
                            width: '28px'
                          }}
                          onClick={handleMute}
                        ></Button>
                      </Popover>
                    </Col>
                  </Row>
                  <Row>
                    <Col flex={'auto'}>
                      <Slider
                        min={0}
                        max={100}
                        onChange={onChange}
                        value={sliderValue}
                        style={{ margin: 0, marginTop: '3px' }}
                        tooltip={{
                          open: false
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
              <div className="z-10 absolute h-full w-full top-0">
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
                  style={type === 'row' ? { position: 'absolute' } : {}}
                ></ReactPlayer>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
})

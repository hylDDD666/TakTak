'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  FlagOutlined,
  MutedOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  SendOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Flex,
  InputNumber,
  Popover,
  Progress,
  Row,
  Slider,
  Tooltip,
} from 'antd'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer(props) {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRoll, setIsRoll] = useState(false)
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const playerRef = useRef()
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  const onChange = (newValue) => {
    setSliderValue(newValue)
    playerRef.current.seekTo(newValue / 100)
  }
  const handleDuration = (value) => {
    setDuration(value)
  }
  const volumeChange = (newValue) => {
    if (newValue > 0) setIsMuted(false)
    setVolume(newValue)
  }
  const togglePlaying = () => {
    setIsPlaying((pre) => !pre)
  }
  const toggleRoll = () => {
    setIsRoll((pre) => !pre)
  }
  const handllePlay = (played) => {
    setSliderValue((played.playedSeconds / duration) * 100)
  }
  const handleMute = () => {
    setIsMuted((pre) => !pre)
  }
  return (
    <>
      {domLoaded && (
        <div className={'w-3/4 max-w-80 rounded-lg relative truncate'}>
          <div className="w-full h-full absolute bg-inherit z-10 opacity-0 hover:opacity-100 transition-opacity">
            <div className={'absolute top-5 right-5 text-white '}>
              <Popover
                content={
                  <>
                    <Button
                      style={{
                        fontWeight: 'bold',
                        border: 0,
                        marginRight: '10px',
                      }}
                      icon={<DislikeOutlined />}
                    >
                      不感兴趣
                    </Button>
                    <Button
                      style={{
                        fontWeight: 'bold',
                        border: 0,
                        marginRight: '10px',
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
                  offset: [25, 0],
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
            >
              <Row>
                <Col span={18}>
                  <Button
                    icon={
                      isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />
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
                <Col span={6}>
                  <Tooltip
                    placement="top"
                    arrow={false}
                    title={isRoll ? '自动滚动已开启' : '自动滚动已关闭'}
                    color="rgb(54,54,54)"
                    overlayStyle={{ fontSize: 'small', color: 'white' }}
                  >
                    <Button
                      icon={
                        isRoll ? <ArrowUpOutlined /> : <CloseCircleOutlined />
                      }
                      onClick={toggleRoll}
                      style={{
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: 'white',
                        width: '28px',
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
                          <MutedOutlined />
                        ) : (
                          <SoundOutlined />
                        )
                      }
                      style={{
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: 'white',
                        width: '28px',
                      }}
                      onClick={handleMute}
                    ></Button>
                  </Popover>
                </Col>
              </Row>
              <Row>
                <Col span={17}>
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
                <Col span={7} className="leading-3">
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
          <div className="z-0">
            <ReactPlayer
              ref={playerRef}
              playing={isPlaying}
              loop
              volume={volume / 100}
              width={'100%'}
              height={'100%'}
              url={'/video/pexels-alexander-jensen-20496059 (Original).mp4'}
              onDuration={handleDuration}
              onProgress={handllePlay}
            ></ReactPlayer>
          </div>
        </div>
      )}
    </>
  )
}

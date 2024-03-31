'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  EllipsisOutlined,
  MutedOutlined,
  PauseOutlined,
  PlayCircleFilled,
  SearchOutlined,
  SoundOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHomeStore } from '../../stores/homeStore'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function VideoSkeleton() {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlay, setIsPlay] = useState(true)
  const [volume, setVolume] = useState(20)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [show, setShow] = useState(true)
  const params = useParams()
  const id = params['video-id'] * 1

  let isAutoRoll = false
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
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  useEffect(() => {
    if (index === listLength - 1) {
      fetchItemData()
    }
  }, [index])

  const handleMouseEnter = () => {
    setShow(true)
  }
  const handleMouseLeave = () => {
    setShow(false)
  }

  return (
    <>
      {domLoaded && (
        <div
          className={`h-full w-full  relative   overflow-hidden bg-black z-0`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`w-full h-full absolute bg-transparent z-10 opacity-0 ${
              show ? 'opacity-100' : ''
            } transition-opacity`}
          >
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
              {index < listLength && (
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
                    // onClick={handleToNext}
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
                  ></Button>
                </Col>
                <Col span={'80px'}>
                  <Button
                    size="large"
                    icon={
                      isAutoRoll ? (
                        <ArrowUpOutlined className={'!text-2xl'} />
                      ) : (
                        <CloseCircleOutlined className={'!text-2xl'} />
                      )
                    }
                    style={{
                      border: 0,
                      padding: 0,
                      backgroundColor: 'transparent',
                      color: 'white',
                      width: '36px',
                    }}
                  ></Button>

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
                  ></Button>
                </Col>
              </Row>
              <Row>
                <Col flex={'auto'}>
                  <Slider
                    min={0}
                    max={100}
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
        </div>
      )}
    </>
  )
}
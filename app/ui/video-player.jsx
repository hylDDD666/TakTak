'use client'
import {
  ArrowUpOutlined,
  CloseCircleOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  FlagOutlined,
  MutedOutlined,
  PlayCircleOutlined,
  SendOutlined,
  SoundOutlined
} from '@ant-design/icons'
import { Button, Col, Flex, InputNumber, Popover, Progress, Row, Slider, Tooltip } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer(props) {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  const [inputValue, setInputValue] = useState(1)
  const onChange = (newValue) => {
    setInputValue(newValue)
  }
  return (
    <>
      {domLoaded && (
        <div className={'w-[270px] h-[483px] rounded-lg relative truncate '}>
          <div className="w-full h-full absolute bg-inherit z-10">
            <div className={'absolute top-5 right-5 text-white '}>
              <Popover
                content={
                  <>
                    <Button
                      style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
                      icon={<DislikeOutlined />}
                    >
                      不感兴趣
                    </Button>
                    <Button
                      style={{ fontWeight: 'bold', border: 0, marginRight: '10px' }}
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
            <div className={'absolute bottom-0 w-full h-[60px] text-white px-[10px]'}>
              <Row>
                <Col span={17}>
                  <Button
                    icon={<PlayCircleOutlined />}
                    style={{
                      border: 0,
                      padding: 0,
                      backgroundColor: 'transparent',
                      color: 'white'
                    }}
                  ></Button>
                </Col>
                <Col span={7}>
                  <Tooltip
                    placement="top"
                    arrow={false}
                    title={'自动滚动已开启'}
                    color="rgb(54,54,54)"
                    overlayStyle={{ fontSize: 'small', color: 'white' }}
                  >
                    <Button
                      icon={
                        <>
                          <ArrowUpOutlined />
                          <CloseCircleOutlined />
                        </>
                      }
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
                      <div className="h-[100px]">
                        <Slider vertical defaultValue={30} style={{ margin: 0 }} />
                      </div>
                    }
                  >
                    <Button
                      icon={
                        <>
                          <SoundOutlined />
                          <MutedOutlined />
                        </>
                      }
                      style={{
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: 'white',
                        width: '28px'
                      }}
                    ></Button>
                  </Popover>
                </Col>
              </Row>
              <Row>
                <Col span={18}>
                  <Slider
                    min={0}
                    max={20}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    style={{ margin: 0, marginTop: '3px' }}
                  />
                </Col>
                <Col span={6} className="leading-3">
                  <span className="text-xs ml-3">{inputValue}</span>
                </Col>
              </Row>
            </div>
          </div>
          <div className='z-0'>
            <ReactPlayer
              playing
              loop
              width={'100%'}
              height={'100%'}
              url={'/video/pexels-alexander-jensen-20496059 (Original).mp4'}
            ></ReactPlayer>
          </div>
        </div>
      )}
    </>
  )
}

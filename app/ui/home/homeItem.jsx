'use client'
import { Avatar, Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import VideoPlayer from '../video-player'

export default function HomeItem() {
  const [isCollipse, setIsCollipse] = useState(true)
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }
  return (
    <div>
      <Row justify={'center'} wrap={false}>
        <Col flex={'60px'}>
          <Avatar
            size={56}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          />
        </Col>
        <Col flex={'auto'} style={{ maxWidth: '510px' }}>
          <a
            href="#javascript"
            className="text-lg font-bold text-black hover:underline hover:text-black "
          >
            <h3>用户名</h3>
          </a>
          <div className={`text-lg mb-3`}>
            <label
              className="cursor-pointer font-bold  float-right clear-both mr-4 mt-7"
              onClick={toggleCollopse}
            >
              {isCollipse ? '展开' : '收起'}
            </label>
            <span
              className={`pr-5 ${
                isCollipse ? 'overflow-hidden line-clamp-2' : ''
              }`}
            >
              Respuesta a @anacristinamunaresmejia Nuevas imágenes de la
              tribuMante #mante #tribumante #tribe #tribu #misterio
              #mantetribe#losttribe
            </span>
          </div>
          <VideoPlayer></VideoPlayer>
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
    </div>
  )
}

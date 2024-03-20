'use client'
import { Avatar, Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import VideoPlayer from '../video-player'
import {
  HeartFilled,
  MergeFilled,
  MessageFilled,
  StarFilled,
} from '@ant-design/icons'

export default function HomeItem(props) {
  const [isCollipse, setIsCollipse] = useState(true)
  const [isLike, setIsLike] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }
  const handleLikeClick = () => {
    setIsLike((pre) => !pre)
  }
  const handleFavorites = () => {
    setIsFavorite((pre) => !pre)
  }
  return (
    <div className='border-b border-slate-200 border-solid pt-6'>
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
          <div className="flex">
            <div
              className={`text-lg mb-3 before:float-right before:w-0 before:h-full before:-mb-[32px] `}
            >
              <label
                className="cursor-pointer font-bold  float-right clear-both"
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
          style={{ maxWidth: '610px', display: 'flex'}}
          className="pb-10"
        >
          <VideoPlayer></VideoPlayer>
          <div className="w-[48px] ml-5 flex flex-col flex-wrap justify-end">
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
            <strong className="w-full text-center text-xs mb-2">12312</strong>
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
            <strong className="w-full text-center text-xs mb-2">12312</strong>
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
            <strong className="w-full text-center text-xs mb-2">12312</strong>
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
            <strong className="w-full text-center text-xs mb-2">12312</strong>
          </div>
        </Col>
      </Row>
    </div>
  )
}

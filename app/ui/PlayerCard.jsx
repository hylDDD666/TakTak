'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { getVideoPreviewImg } from '../lib/getVideoPreview'
import { Col, Row } from 'antd'
import { PlayCircleOutlined, SmallDashOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { useHomeStore } from '../stores/homeStore'

export default function PlayerCard(props) {
  const [imgUrl, setImgUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const { id, user } = useParams()
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false)
  const setIsCreatorVideosOn = useHomeStore(
    (state) => state.setIsCreatorVideosOn
  )
  const router = useRouter()
  const playerRef = useRef()
  const playCard = () => {
    if (!isCurrentPlaying) {
      setIsPlaying(true)
    }
  }
  const pauseCard = () => {
    playerRef.current.seekTo(0)
    setIsPlaying(false)
  }
  const jumpToCreatorVideo = () => {
    setIsCreatorVideosOn(true)
    router.push(`/@${user}/video/${props.id}`)
  }
  useEffect(() => {
    if (id === props.id) {
      setIsCurrentPlaying(true)
    }
  }, [id])
  useEffect(() => {
    const getVideoPreview = async () => {
      const res = await getVideoPreviewImg(props.videoUrl, 0.8)
      setImgUrl(res)
    }
    getVideoPreview()
  }, [])
  return (
    <Col
      span={8}
      style={{
        height: 240,
        paddingLeft: 10,
        paddingBottom: 10,
      }}
      onMouseEnter={playCard}
      onMouseLeave={pauseCard}
      onClick={jumpToCreatorVideo}
    >
      <div className="h-full w-full bg-black  rounded overflow-hidden relative">
        {isCurrentPlaying && (
          <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 text-center z-20 w-[60px] h-[40px]  text-white font-bold">
            <SmallDashOutlined className="block text-3xl " />
            <p>正在播放</p>
          </div>
        )}
        <div className="absolute bottom-2 left-3 z-20  text-white text-base">
          <PlayCircleOutlined className="mr-1" />
          {'1231'}
        </div>
        <div className={`z-0 h-full w-full ${isCurrentPlaying ? 'blur' : ''}`}>
          <ReactPlayer
            ref={playerRef}
            width={'100%'}
            height={'100%'}
            url={props.videoUrl}
            playing={isPlaying}
            fallback={<img src={imgUrl}></img>}
          ></ReactPlayer>
        </div>
      </div>
    </Col>
  )
}

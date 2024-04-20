'use client'
import React, {useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { PlayCircleOutlined, SmallDashOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { useHomeStore } from '../stores/homeStore'

export default function PlayerCard(props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const params = useParams()
  const item = useHomeStore((state) => {
    return state.creatorVideos.find((item) => item.id == props.id)
  })
  const setCurId = useHomeStore((state) => state.setCurId)
  const setDetailId = useHomeStore((state) => state.setDetailId)
  const { cover } = item
  const containerRef = useRef()
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false)
  const videoRef = useRef()
  const isCreatorVideosOn = useHomeStore((state) => state.isCreatorVideosOn)
  const setIsCreatorVideosOn = useHomeStore((state) => state.setIsCreatorVideosOn)

  const router = useRouter()
  const playerRef = useRef()
  const playCard = () => {
    if (!isCurrentPlaying) {
      setIsPlaying(true)
    }
  }
  const pauseCard = () => {
    // playerRef.current.seekTo(0)
    setIsPlaying(false)
  }
  const jumpToCreatorVideo = () => {
    setCurId(props.id)
    if (!isCreatorVideosOn) {
      setIsCreatorVideosOn(true)
      setDetailId(params['video-id'])
      router.push(`/${params.user}/video/${props.id}`)
    } else {
      router.replace(`/${params.user}/video/${props.id}`)
    }
  }
  useLayoutEffect(() => {
    const { videoWidth, videoHeight } = item
    const containerHeight = 230
    const containerWidth = 155.66
    let scale
    if (videoHeight > videoWidth) {
      scale = videoHeight / containerHeight / (videoWidth / containerWidth)
    } else {
      scale = videoWidth / containerWidth / (videoHeight / containerHeight)
    }
    videoRef.current.style.transform = `scale(${scale})`
  })
  useEffect(() => {
    if (params['video-id'] == props.id) {
      setIsCurrentPlaying(true)
    }
  }, [params['video-id']])

  return (
    <div
      className="h-full w-full bg-white  rounded overflow-hidden relative"
      ref={containerRef}
      onMouseEnter={playCard}
      onMouseLeave={pauseCard}
      onClick={jumpToCreatorVideo}
    >
      {isCurrentPlaying && (
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 text-center z-30 w-[60px] h-[40px]  text-white font-bold">
          <SmallDashOutlined className="block text-3xl " />
          <p>正在播放</p>
        </div>
      )}
      <div className="absolute bottom-2 left-3 z-20  text-white text-base">
        <PlayCircleOutlined className="mr-1" />
        {'1231'}
      </div>
      <div
        className={`z-0 h-full w-full ${isCurrentPlaying ? 'blur' : ''}  
          overflow-clip`}
      >
        <div ref={videoRef} className="h-full w-full">
          <img src={cover} alt="cover" className="absolute z-10 top-1/2 -translate-y-1/2" />
          {isPlaying && (
            <ReactPlayer
              volume={0}
              ref={playerRef}
              width={'100%'}
              height={'100%'}
              url={props.videoUrl}
              playing={isPlaying}
              className="z-20 absolute"
            ></ReactPlayer>
          )}
        </div>
      </div>
    </div>
  )
}

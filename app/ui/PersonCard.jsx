'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Avatar, Button } from 'antd'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/navigation'
import { useHomeStore } from '../stores/homeStore'
import { addFollow, subFollow } from '../action/action'
import useAuth from '../hooks/useAuth'

export default function PersonCard(props) {
  const { video, name, avatar } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)
  const { cover, url, videoWidth, videoHeight } = video
  const containerRef = useRef()
  const router = useRouter()
  const videoRef = useRef()
  const playerRef = useRef()
  const playCard = () => {
    setIsPlaying(true)
  }
  const pauseCard = () => {
    setIsPlaying(false)
  }
  const toggleFollow = useAuth(async () => {
    setIsFollowed((pre) => !pre)
    if (isFollowed) {
      await subFollow(name)
    } else {
      await addFollow(name)
    }
  })
  useLayoutEffect(() => {
    const containerHeight = 300
    const containerWidth = 220
    let scale
    if (videoHeight > videoWidth) {
      scale = videoHeight / containerHeight / (videoWidth / containerWidth)
    } else {
      scale = videoWidth / containerWidth / (videoHeight / containerHeight)
    }
    videoRef.current.style.transform = `scale(${scale})`
  })
  const handleClick = () => {
    router.push(`/${name}`)
  }
  return (
    <div
      className="h-full w-full bg-white  rounded overflow-hidden relative hover:cursor-pointer"
      ref={containerRef}
      onMouseEnter={playCard}
      onMouseLeave={pauseCard}
    >
      <div
        className={`z-0 h-full w-full
          overflow-clip`}
      >
        <div className="absolute bottom-0 w-full h-3/5 z-30 text-center">
          <div onClick={handleClick}>
            <Avatar size={56} src={avatar}></Avatar>
            <h2 className="text-white text-xl font-bold mt-3 mb-3 hover:cursor-pointer">
              {name}
            </h2>
          </div>

          <Button
            size="large"
            style={{
              width: '160px',
              borderRadius: '5px',
              border: 0,
            }}
            onClick={toggleFollow}
            className={`${
              isFollowed
                ? 'hover:!bg-slate-200 !bg-slate-100 text-black'
                : 'hover:!bg-rose-600 !bg-rose-500 !text-white'
            } !font-bold`}
          >
            {isFollowed ? '已关注' : '关注'}
          </Button>
        </div>
        <div ref={videoRef} className="h-full w-full">
          <img
            src={cover}
            alt="cover"
            className="absolute top-1/2 -translate-y-1/2"
          />
          {isPlaying && (
            <ReactPlayer
              volume={0}
              ref={playerRef}
              width={'100%'}
              height={'100%'}
              url={url}
              playing={isPlaying}
              className="z-20 absolute"
            ></ReactPlayer>
          )}
        </div>
      </div>
    </div>
  )
}

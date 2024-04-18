'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { usePathname, useRouter } from 'next/navigation'

export default function VideoCard(props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter()
  const cover = props.video.cover
  const containerRef = useRef()
  const videoRef = useRef()
  const playerRef = useRef()
  const playCard = () => {
    setIsPlaying(true)
  }
  const pauseCard = () => {
    setIsPlaying(false)
  }
  const path = usePathname()
  const handleVideoClick =()=>{
    router.push(`${path}/video/${props.video.id}`)
  }

  useEffect(() => {
    const { videoWidth, videoHeight } = props.video
    const containerHeight = 300
    const containerWidth = 210
    let scale
    if (videoHeight > videoWidth) {
      scale = videoHeight / containerHeight / (videoWidth / containerWidth)
    } else {
      scale = videoWidth / containerWidth / (videoHeight / containerHeight)
    }
    videoRef.current.style.transform = `scale(${scale})`
  })
  return (
    <div
      className="h-full w-full bg-white  rounded overflow-hidden relative hover:cursor-pointer"
      ref={containerRef}
      onMouseEnter={playCard}
      onMouseLeave={pauseCard}
      onClick={handleVideoClick}
    >
      <div
        className={`z-0 h-full w-full
          overflow-clip`}
      >
        <div ref={videoRef} className="h-full w-full">
          <img src={cover} alt="cover" className="absolute top-1/2 -translate-y-1/2" />
          {isPlaying && (
            <ReactPlayer
              volume={0}
              ref={playerRef}
              width={'100%'}
              height={'100%'}
              url={props.video.url}
              playing={isPlaying}
              className="z-20 absolute"
            ></ReactPlayer>
          )}
        </div>
      </div>
    </div>
  )
}

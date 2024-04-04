'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { getVideoPreviewImg } from '../lib/getVideoPreview'
import { Col, Row } from 'antd'

export default function PlayerCard() {
  const [imgUrl, setImgUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const playCard = () => {
    setIsPlaying(true)
  }
  const pauseCard = () => {
    setIsPlaying(false)
  }
  useEffect(() => {
    const getVideoPreview = async () => {
      const res = await getVideoPreviewImg(
        'https://player.vimeo.com/progressive_redirect/playback/914356391/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=41679e8e0d9ca5cd689658f1e928443b0b8367173cc1c37d240a7df8b6d7d064',
        0.8
      )
      setImgUrl(res)
    }
    getVideoPreview()
  }, [])
  return (
    <Col
      span={8}
      style={{
        height: 240,
        marginRight: 10,
        overflow: 'hidden',
        borderRadius: '5px',
      }}
      onMouseEnter={playCard}
      onMouseLeave={pauseCard}
    >
      <div className="h-full w-full bg-black">
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          url={
            'https://player.vimeo.com/progressive_redirect/playback/914356391/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=41679e8e0d9ca5cd689658f1e928443b0b8367173cc1c37d240a7df8b6d7d064'
          }
          playing={isPlaying}
          fallback={<img src={imgUrl}></img>}
        ></ReactPlayer>
      </div>
    </Col>
  )
}

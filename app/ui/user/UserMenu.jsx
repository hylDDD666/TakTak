'use client'
import { Col, Flex, Menu, Row } from 'antd'
import React, { useState } from 'react'
import VideoCard from '../VideoCard'
import videoPlayer from '../video-player'

const items = [
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">视频</div>,
    key: 'video'
  },
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">收藏</div>,
    key: 'collect'
  },
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">已赞</div>,
    key: 'like'
  }
]

export default function UserMenu(props) {
  const [current, setCurrent] = useState('video')
  const handleSelect = ({ key }) => {
    setCurrent(key)
  }
  return (
    <div>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className=" !mt-2"
        onSelect={handleSelect}
      />
      {current === 'video' && (
        <Flex className="mt-2" gap={'small'} wrap="wrap">
          {props.videos.map((video) => {
            return (
              <div key={video.id} className="!w-[14vw] !min-w-[175px] !h-[20vw] !min-h-[250px] max-h-[360px] max-w-[252px]">
                {/* <img src={video.cover} width={200} height={300} alt="" /> */}
                <VideoCard video={video}> </VideoCard>
              </div>
            )
          })}
        </Flex>
      )}
    </div>
  )
}

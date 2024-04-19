'use client'
import { Flex, Menu, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoCard'
import { useHomeStore } from '@/app/stores/homeStore'
import { getCollectVideos } from '@/app/action/action'
import { useParams } from 'next/navigation'
import { HeartOutlined, TagOutlined } from '@ant-design/icons'

const items = [
  {
    label: (
      <div className="font-bold w-[121px] text-center text-lg py-2">视频</div>
    ),
    key: 'video',
  },
  {
    label: (
      <div className="font-bold w-[121px] text-center text-lg py-2">收藏</div>
    ),
    key: 'collect',
  },
  {
    label: (
      <div className="font-bold w-[121px] text-center text-lg py-2">已赞</div>
    ),
    key: 'like',
  },
]

export default function UserMenu(props) {
  const [current, setCurrent] = useState('video')
  const setUserItemList = useHomeStore((state) => state.setUserItemList)
  const [collectedVideos, setCollectedVideos] = useState([])
  const [likedVideos, setLikedVideos] = useState([])
  const [showSpin, setShowSpin] = useState(true)
  const params = useParams()
  const handleSelect = async ({ key }) => {
    setCurrent(key)
    if (key === 'collect') {
      setShowSpin(true)
      const res = await getCollectVideos(params.user)
      setUserItemList(res)
      setCollectedVideos(res)
    }
    if (key === 'like') {
      setShowSpin(true)
      const res = await getCollectVideos(params.user)
      setUserItemList(res)
      setLikedVideos(res)
    }
  }
  useEffect(() => {
    return () => {
      setShowSpin(false)
    }
  }, [collectedVideos, likedVideos])
  useEffect(() => {
    setUserItemList(props.videos)
  }, [])
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
              <div
                key={video.id}
                className="!w-[14vw] !min-w-[175px] !h-[20vw] !min-h-[250px] max-h-[360px] max-w-[252px]"
              >
                <VideoCard video={video}> </VideoCard>
              </div>
            )
          })}
        </Flex>
      )}
      {showSpin && (
        <div className="w-full h-full text-center my-3">
          <Spin size="large" className="!my-3"></Spin>
        </div>
      )}
      {current === 'collect' &&
        !showSpin &&
        (collectedVideos.length === 0 ? (
          <div className=' text-center text-3xl font-bold mt-12 pr-56'>
            <TagOutlined />
            <p>暂无收藏视频</p></div>
        ) : (
          <Flex className="mt-2" gap={'small'} wrap="wrap">
            {collectedVideos.map((video) => {
              return (
                <div
                  key={video.id}
                  className="!w-[14vw] !min-w-[175px] !h-[20vw] !min-h-[250px] max-h-[360px] max-w-[252px]"
                >
                  <VideoCard video={video}> </VideoCard>
                </div>
              )
            })}
          </Flex>
        ))}
      {current === 'like' &&
        !showSpin &&
        (likedVideos.length === 0 ? (
          <div className=' text-center text-3xl font-bold mt-12 pr-56'>
            <HeartOutlined />
            <p>暂无已赞视频</p></div>
        ) : (
          <Flex className="mt-2" gap={'small'} wrap="wrap">
            {likedVideos.map((video) => {
              return (
                <div
                  key={video.id}
                  className="!w-[14vw] !min-w-[175px] !h-[20vw] !min-h-[250px] max-h-[360px] max-w-[252px]"
                >
                  <VideoCard video={video}> </VideoCard>
                </div>
              )
            })}
          </Flex>
        ))}
    </div>
  )
}

'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useHomeStore } from '@/app/stores/homeStore'
import { Spin } from 'antd'
import BackTop from 'antd/es/float-button/BackTop'
import debounce from '@/app/lib/debounce'
import HomeItem from '@/app/ui/home/homeItem'
import { getFollowingVideosCount } from '@/app/action/action'

export default function Page() {
  const [followingCount, setFollowingCount] = useState(Infinity)
  const { itemList, fetchItemData, addPage } = useHomeStore((state) => state)
  const spinRef = useRef()
  const contentRef = useRef()
  const [showSpin, setShowSpin] = useState(true)
  const [scrollHeight, setScrollHeight] = useState(0)
  const setIsDetailOn = useHomeStore((state) => state.setIsDetailOn)
  const setIsUserVideoDetailOn = useHomeStore((state) => state.setIsUserVideoDetailOn)
  const isFollowedPage = useHomeStore((state) => state.isFollowedPage)
  const setIsFollowedPage = useHomeStore((state) => state.setIsFollowedPage)
  const initItemList = useHomeStore((state) => state.initItemList)
  const page = useHomeStore((state) => state.page)

  useLayoutEffect(() => {
    if (!isFollowedPage) {
      setIsFollowedPage(true)
      initItemList()
    }
  }, [])
  const getFollowingCount = async () => {
    const res = await getFollowingVideosCount()
    setFollowingCount(res)
  }
  useEffect(() => {
    setIsDetailOn(false)
    setIsUserVideoDetailOn(false)
    setIsFollowedPage(true)
    getFollowingCount()
    const options = {
      rootMargin: '-64px 0px 0px 0px',
      threshold: [0]
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (page * 5 >= followingCount) {
          setShowSpin(false)
        } else {
          fetchItemData('followed')
          addPage()
        }
      }
    }, options)
    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [page])

  const handleScroll =throttle(pauseAllItems,500)
  const handleScrollEnd = (e) => {
    console.log('handleScrollEnd',e)
    // const debounceScroll = debounce((e) => {
      setScrollHeight(e.target.scrollTop)
    // }, 500)
    // debounceScroll(e)
  }
  return (
    <div
      ref={contentRef}
      style={{
        height: 'calc(100vh - 63px)',
        padding: '10px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'scroll'
      }}
      onScroll={handleScroll}
      onScrollEnd={handleScrollEnd}
    >
      {itemList.map((item, index) => {
        const video = {
          videoInfo: {
            url: item.url,
            isPlaying: item.isPlaying,
            cover: item.cover,
            videoHeight: item.videoHeight,
            videoWidth: item.videoWidth,
            type: item.type
          },
          likeNum: item._count.liker,
          commentsNum: item._count.comment,
          collectNum: item._count.collector,
          shareNum: item.shareNum
        }
        return (
          <HomeItem
            isLike={item.isLike}
            isCollect={item.isCollect}
            key={item.id + index + ''}
            user={item.author}
            desc={item.desc}
            videoInfo={video}
            disLike={item.disLike}
            id={item.id}
            isPlaying={item.isPlaying}
            scrollHeight={scrollHeight}
          ></HomeItem>
        )
      })}
      {showSpin && (
        <div ref={spinRef} className="text-center">
          <Spin size="large" className="!my-3 " />
        </div>
      )}
      <BackTop target={() => contentRef.current} tooltip="返回到顶部"></BackTop>
    </div>
  )
}

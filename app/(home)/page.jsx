'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useHomeStore } from '../stores/homeStore'
import { Spin } from 'antd'
import BackTop from 'antd/es/float-button/BackTop'
import throttle from '../lib/throttle'
const HomeItem = dynamic(() => import('../ui/home/homeItem'), { ssr: false })

export default React.memo(function Home() {
  const { itemList, fetchItemData, addPage } = useHomeStore(state => state)
  const spinRef = useRef()
  const contentRef = useRef()
  const [scrollHeight, setScrollHeight] = useState(0)
  const pauseAllItems = useHomeStore(state => state.pauseAllItems)
  const setIsDetailOn = useHomeStore(state => state.setIsDetailOn)
  const setIsUserVideoDetailOn = useHomeStore(state => state.setIsUserVideoDetailOn)
  const isFollowedPage = useHomeStore(state => state.isFollowedPage)
  const setIsFollowedPage = useHomeStore(state => state.setIsFollowedPage)
  const initItemList = useHomeStore(state => state.initItemList)
  useLayoutEffect(() => {
    if (isFollowedPage) {
      setIsFollowedPage(false)
      initItemList()
    }
  }, [])
  useEffect(() => {
    setIsDetailOn(false)
    setIsUserVideoDetailOn(false)
    const options = {
      rootMargin: '-64px 0px 0px 0px',
      threshold: [0]
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchItemData('home')
        addPage()
      }
    }, options)
    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [])

  const throttleScroll=throttle(pauseAllItems,500)
  const handleScroll =()=>{
    console.log('handleScroll', Date.now)
    throttleScroll()
  }
  
  const handleScrollEnd = e => {
    console.log('handleScrollEnd', e)

    // const debounceScroll = debounce((e) => {
    setTimeout(() => {
      setScrollHeight(e.target.scrollTop)
    }, 0)
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
        return <HomeItem isLike={item.isLike} isCollect={item.isCollect} key={item.id + index + ''} user={item.author} desc={item.desc} videoInfo={video} disLike={item.disLike} id={item.id} isPlaying={item.isPlaying} scrollHeight={scrollHeight}></HomeItem>
      })}
      <div ref={spinRef} className="text-center">
        <Spin size="large" className="!my-3 " />
      </div>
      <BackTop target={() => contentRef.current} tooltip="返回到顶部"></BackTop>
    </div>
  )
})

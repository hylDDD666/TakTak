'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useHomeStore } from '../stores/homeStore'
import { Spin } from 'antd'
import { usePathname } from 'next/navigation'
import { Content } from 'antd/es/layout/layout'
import BackTop from 'antd/es/float-button/BackTop'
import debounce from '../lib/debounce'
import { getVideoPreviewImg } from '../lib/getVideoPreview'
const HomeItem = dynamic(() => import('../ui/home/homeItem'), { ssr: false })

export default React.memo(function Home() {
  const { itemList, fetchItemData } = useHomeStore((state) => state)
  const spinRef = useRef()
  const contentRef = useRef()
  const [scrollHeight, setScrollHeight] = useState(0)
  useEffect(() => {
    const options = {
      rootMargin: '-64px 0px 0px 0px',
      threshold: [0],
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchItemData()
      }
    }, options)
    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [])
  const handleScroll = (e) => {
    const debounceScroll = debounce((e) => {
      setScrollHeight(e.target.scrollTop)
    }, 500)
    debounceScroll(e)
  }
  return (
    <Content
      ref={contentRef}
      style={{
        height: '100vh',
        padding: '10px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'scroll',
      }}
      onScroll={handleScroll}
    >
      {itemList.map((item) => {
        return (
          <HomeItem
            key={item.id}
            user={item.user}
            desc={item.desc}
            videoInfo={item.video}
            disLike={item.disLike}
            id={item.id}
            isPlaying={item.isPlaying}
            scrollHeight={scrollHeight}
          ></HomeItem>
        )
      })}
      <div ref={spinRef} className="text-center">
        <Spin size="large" className="!my-3 " />
      </div>
      <BackTop target={() => contentRef.current} tooltip="返回到顶部"></BackTop>
    </Content>
  )
})

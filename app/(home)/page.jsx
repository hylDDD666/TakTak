'use client'
import React, { Suspense, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useHomeStore } from '../stores/homeStore'
import { Spin } from 'antd'
import { usePathname } from 'next/navigation'
const HomeItem = dynamic(() => import('../ui/home/homeItem'), { ssr: false })

export default React.memo(function Home() {
  const { itemList, fetchItemData } = useHomeStore((state) => state)
  const spinRef = useRef()
  const pathName = usePathname()
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
  return (
    <>
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
          ></HomeItem>
        )
      })}
      <div ref={spinRef} className="text-center">
        <Spin size="large" className="!my-3 " />
      </div>
    </>
  )
})

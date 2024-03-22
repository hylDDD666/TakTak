'use client'
import React, { Suspense, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useHomeStore } from './stores/homeStore'
const HomeItem = dynamic(() => import('./ui/home/homeItem'), { ssr: false })

export default function Home() {
  const itemList = useHomeStore((state) => state.itemList)
  const pageRef = useRef()
  const autoScroll = (bottomDis) => {
    console.log(pageRef.current.clientHeight, bottomDis)
    pageRef.current.scrollTop = pageRef.current.scrollTop + bottomDis
    console.log(pageRef.current.scrollTop, bottomDis)
  }
  return (
    <div ref={pageRef}>
      {itemList.map((item) => {
        return (
          <HomeItem
            autoScroll={autoScroll}
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
    </div>
  )
}

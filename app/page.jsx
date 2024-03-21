'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
// import HomeItem from './ui/home/homeItem'
import { useHomeStore } from './stores/homeStore'
const HomeItem = dynamic(() => import('./ui/home/homeItem'), { ssr: false })



export default function Home() {
  const itemList = useHomeStore((state) => state.itemList)
  return (
    <>
      {itemList.map((item) => {
        return (
            <HomeItem
              key={item.id}
              user={item.user}
              desc={item.desc}
              videoInfo={item.video}
            ></HomeItem>
        )
      })}
    </>
  )
}

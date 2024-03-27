'use client'
import VideoDetail from '@/app/ui/detail/video-detail'
import { Col, Row } from 'antd'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="fixed w-screen h-screen left-0 top-0 z-50">
        <div className="flex flex-nowrap h-full overflow-hidden">
          <div className="h-full bg-white  grow basis-[500px] shrink-0">
            <VideoDetail></VideoDetail>
          </div>
            <div className="h-full basis-[544px] bg-slate-300">detail</div>
        </div>
      </div>
    </>
  )
}

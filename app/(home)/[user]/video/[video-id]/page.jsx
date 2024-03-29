'use client'
import VideoDetail from '@/app/ui/detail/video-detail'
import { Col, ConfigProvider, Row } from 'antd'
import React from 'react'

export default function page() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'rgba(127,127,127,.3)',
            colorText: 'white',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.7)',
          },
          components: {
            Input: {
              addonBg: 'rgba(127,127,127,.3)',
            },
          },
        }}
      >
        <div className="fixed w-screen h-screen left-0 top-0 z-50">
          <div className="flex flex-nowrap h-full overflow-hidden">
            <div className="h-full bg-white  grow basis-[500px] shrink-0">
              <VideoDetail></VideoDetail>
            </div>
            <div className="h-full basis-[544px] bg-slate-300">detail</div>
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

'use client'
import VideoSkeleton from '@/app/ui/detail/VideoSkeleton'
import VideoDetail from '@/app/ui/detail/video-detail'
import {  ConfigProvider} from 'antd'
import React, { Suspense } from 'react'

export default function layout({ creatorVideos, videoInfo }) {
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
        <div className="fixed  h-screen left-0 top-0 right-0 z-50">
          <div className="flex flex-nowrap h-full overflow-hidden">
            <div className="h-full bg-black  grow basis-[500px] shrink-0">
              <Suspense fallback={<VideoSkeleton></VideoSkeleton>}>
                <VideoDetail/>
              </Suspense>
            </div>
            <div className="h-screen basis-[544px] bg-white relative">
              {videoInfo}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

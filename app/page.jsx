import React, { Suspense } from 'react'
import VideoPlayer from './ui/video-player'

export default function Home() {
  return (
    <Suspense fallback={'jiazaizhong'}>
      <VideoPlayer />
    </Suspense>
  )
}

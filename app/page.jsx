import React, { Suspense } from 'react'
import HomeItem from './ui/home/homeItem'


export default function Home() {
  return (
    <Suspense fallback={'jiazaizhong'}>
      <HomeItem></HomeItem>
    </Suspense>
  )
}

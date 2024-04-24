import { getFollowingVideosCount } from '@/app/action/action'
import React from 'react'

export default async function layout({ children, followedPage }) {
  const res = await getFollowingVideosCount()
  return <>{res!==0 ? followedPage : children}</>

  // const followingVideos = await getFollowingVideos(0)
  // console.log(followingVideos);
}

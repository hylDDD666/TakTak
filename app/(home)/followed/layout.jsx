import { getFollowingVideos } from '@/app/action/action'
import React from 'react'

export default async function layout({ children }) {
  const followingVideos = await getFollowingVideos(0)
  console.log(followingVideos);
  return <>{children}</>
}

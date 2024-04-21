'use client'
import React, { useState } from 'react'
import { addFollow, subFollow } from '../action/action'
import { Button } from 'antd'
import useAuth from '../hooks/useAuth'

export default function FollowingButton(props) {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed)
  const handleFollowClick = useAuth(async () => {
    props.stateSync(isFollowed, props.name)
    setIsFollowed((pre) => !pre)
    if (isFollowed) {
      await subFollow(props.name)
    } else {
      await addFollow(props.name)
    }
  })
  return (
    <>
      <Button
        size="large"
        className={
          isFollowed
            ? ' !font-bold !bg-gray-100 hover:!bg-gray-200 !text-black w-28 !rounded-md'
            : ' !font-bold !bg-rose-500 hover:!bg-rose-700 !text-white w-28 !rounded-md'
        }
        onClick={handleFollowClick}
      >
        {isFollowed ? '取消关注' : '关注'}
      </Button>
    </>
  )
}

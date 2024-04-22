'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { addFollow, subFollow, validateIsFollow } from '../action/action'
import { Button } from 'antd'
import useAuth from '../hooks/useAuth'

export default function FollowingButton(props) {
  const [isFollowed, setIsFollowed] = useState(false)
  const handleFollowClick = useAuth(async () => {
    setIsFollowed((pre) => !pre)
    if (isFollowed) {
      await subFollow(props.name)
    } else {
      await addFollow(props.name)
    }
  })
  const getIsFollow = async () => {
    const res =  await validateIsFollow(props.name)
    setIsFollowed(res)
  }
  useLayoutEffect(() => {
    getIsFollow()
  }, [])
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

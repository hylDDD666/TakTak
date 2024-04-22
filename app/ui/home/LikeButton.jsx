'use client'
import { HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { addLike, getLikeNum, subLike, validateIsLike } from '@/app/action/action'

export default function LikeButton(props) {
  const [isLike, setIsLike] = useState(false)
  const [likeNum, setLikeNum] = useState(props.likeNum)
  const handleLikeClick = useAuth(async () => {
    setIsLike((pre) => !pre)
    if (isLike) {
      setLikeNum((pre) => pre - 1)
      await subLike(props.id)
    } else {
      setLikeNum((pre) => pre + 1)
      await addLike(props.id)
    }
  })
  const getIsLike = async () => {
    const res = await validateIsLike(props.id)
    setIsLike(res)
    const num = await getLikeNum(props.id)
    setLikeNum(num)
  }
  useEffect(() => {
    getIsLike()
  }, [])
  return (
    <>
      <Button
        type="round"
        style={{
          fontWeight: 'bold',
          marginBottom: '5px',
          padding: 0,
          backgroundColor: 'rgb(241,241,242)'
        }}
        className={`active:!bg-gray-200 ${isLike ? '!text-rose-500' : ''} !h-5 md:!h-10`}
        size="large"
        icon={<HeartFilled className={'!text-sm md:!text-lg'} />}
        onClick={handleLikeClick}
      ></Button>
      <strong className="w-full text-center text-xs mb-2">{likeNum}</strong>
    </>
  )
}

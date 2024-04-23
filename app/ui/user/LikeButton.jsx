'use client'
import { HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import {
  addLike,
  getLikeNum,
  subLike,
  validateIsLike,
} from '@/app/action/action'

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
    const num = await getLikeNum(props.id)
    setIsLike(res)
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
                margin: '10px',
                padding: 5,
                height: '32px',
                width: '32px',
                backgroundColor: 'rgb(241,241,242)',
                color: 'rgb(22,24,35)',
              }}
              className={`active:!bg-gray-200 ${
                isLike ? '!text-rose-500' : ''
              }`}
              size="large"
              icon={<HeartFilled className={'!text-l'} />}
              onClick={handleLikeClick}
            ></Button>
            <strong className="w-full text-center text-xs mr-2">
              {likeNum}
            </strong>
    </>
  )
}

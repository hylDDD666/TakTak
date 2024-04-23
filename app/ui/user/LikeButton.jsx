'use client'
import { HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { addLike, subLike } from '@/app/action/action'

export default function LikeButton(props) {
  const handleLikeClick = useAuth(async () => {
    props.syncLikeState(props.id, !props.isLike)
    if (props.isLike) {
      await subLike(props.id)
    } else {
      await addLike(props.id)
    }
  })

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
          color: 'rgb(22,24,35)'
        }}
        className={`active:!bg-gray-200 ${props.isLike ? '!text-rose-500' : ''}`}
        size="large"
        icon={<HeartFilled className={'!text-l'} />}
        onClick={handleLikeClick}
      ></Button>
      <strong className="w-full text-center text-xs mr-2">{props.likeNum}</strong>
    </>
  )
}

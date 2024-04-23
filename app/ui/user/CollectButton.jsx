'use client'
import { StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { addCollect, getCollectNum, subCollect, validateIsCollect } from '@/app/action/action'

export default function CollectButton(props) {
  const handleFavorites = useAuth(async () => {
    props.syncCollectState(props.id, !props.isCollect)
    if (props.isCollect) {
      await subCollect(props.id)
    } else {
      await addCollect(props.id)
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
          border: 0,
          backgroundColor: 'rgb(241,241,242)',
          color: 'rgb(22,24,35)'
        }}
        icon={<StarFilled className="!text-l" />}
        className={`active:!bg-gray-200 ${props.isCollect ? '!text-yellow-400' : ''}`}
        onClick={handleFavorites}
      ></Button>
      <strong className="w-full text-center text-xs mr-2">{props.collectNum}</strong>
    </>
  )
}

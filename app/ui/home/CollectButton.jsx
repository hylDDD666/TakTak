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
          marginBottom: '5px',
          padding: 0,
          border: 0,
          backgroundColor: 'rgb(241,241,242)'
        }}
        size="large"
        icon={<StarFilled className="!text-sm md:!text-lg" />}
        className={`active:!bg-gray-200 ${props.isCollect ? '!text-yellow-400' : ''} !h-5 md:!h-10`}
        onClick={handleFavorites}
      ></Button>
      <strong className="w-full text-center text-xs mb-2">{props.collectNum}</strong>
    </>
  )
}

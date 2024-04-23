'use client'
import { StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import {
  addCollect,
  getCollectNum,
  subCollect,
  validateIsCollect,
} from '@/app/action/action'

export default function CollectButton(props) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [collectNum, setCollectNum] = useState(props.collectNum)
  const handleFavorites = useAuth(async () => {
    setIsFavorite((pre) => !pre)
    if (isFavorite) {
      setCollectNum((pre) => pre - 1)
      await subCollect(props.id)
    } else {
      setCollectNum((pre) => pre + 1)
      await addCollect(props.id)
    }
  })
  const getCollect = async () => {
    const res = await getCollectNum(props.id)
    const isCollect = await validateIsCollect(props.id)
    setCollectNum(res)
    setIsFavorite(isCollect)
  }
  useEffect(() => {
    getCollect()
  }, [])
  return (
    <>
      <Button
        type="round"
        style={{
          fontWeight: 'bold',
          marginBottom: '5px',
          padding: 0,
          border: 0,
          backgroundColor: 'rgb(241,241,242)',
        }}
        size="large"
        icon={<StarFilled className="!text-sm md:!text-lg" />}
        className={`active:!bg-gray-200 ${
          isFavorite ? '!text-yellow-400' : ''
        } !h-5 md:!h-10`}
        onClick={handleFavorites}
      ></Button>
      <strong className="w-full text-center text-xs mb-2">{collectNum}</strong>
    </>
  )
}

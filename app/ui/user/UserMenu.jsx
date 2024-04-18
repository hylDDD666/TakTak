'use client'
import { Menu } from 'antd'
import React, { useState } from 'react'

const items = [
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">视频</div>,
    key: 'video',
  },
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">收藏</div>,
    key: 'collect',
  },
  {
    label: <div className="font-bold w-[121px] text-center text-lg py-2">已赞</div>,
    key: 'like',
  },
]

export default function UserMenu() {
  const [current, setCurrent] = useState('video')
  const handleSelect=({key})=>{
    setCurrent(key)
  }
  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal" items={items} className=' !mt-2' onSelect={handleSelect}/>
    </div>
  )
}

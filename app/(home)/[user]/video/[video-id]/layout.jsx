'use client'
import { useHomeStore } from '@/app/stores/homeStore'
import React from 'react'

export default function layout({ children, detail }) {
  const isDetailOn = useHomeStore((state) => state.isDetailOn)
  return (
    <>
      <div className="absolute left-0 top-0 bottom-0 -right-[17px] overflow-x-hiden overflow-y-auto">
        {isDetailOn && detail}
      </div>
      <div>{!isDetailOn && children}</div>
    </>
  )
}

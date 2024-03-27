'use client'
import { Col, Row } from 'antd'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="fixed w-screen h-screen left-1 top-1 z-50">
        <div className="flex flex-nowrap h-full overflow-hidden">
          <div className="min-w-128 h-full bg-white flex-auto">video</div>
          <div className="h-full w-[544px] bg-slate-300">detail</div>
        </div>
      </div>
    </>
  )
}

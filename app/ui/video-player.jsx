'use client'
import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer(props) {
  const [domLoaded, setDomLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  return (
    <>
      {domLoaded && (
        <div className={'w-[270px] h-[483px] rounded-lg relative truncate'}>
          <div className="w-full h-full absolute bg-black">
            <div className={'absolute top-5 right-5 text-white '}>
              <Popover
                content={'123123'}
                placement="right"
                arrow={false}
                align={{
                  offset: [0, 40],
                }}
              >
                <EllipsisOutlined className="text-3xl !font-bold hover:cursor-pointer " />
              </Popover>
            </div>
            <div className={'absolute bottom-0 w-full h-[60px] text-white'}>
              12312
            </div>
          </div>

          {/* <ReactPlayer
            playing
            loop
            width={'100%'}
            height={'100%'}
            url={'/video/pexels-alexander-jensen-20496059 (Original).mp4'}
          ></ReactPlayer> */}
        </div>
      )}
    </>
  )
}

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Card, Col, ConfigProvider, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import Link from 'next/link'

export default function layout() {
  const [isCollipse, setIsCollipse] = useState(true)

  const textRef = useRef()
  const [showCollopse, setshowCollopse] = useState(false)
  const toggleCollopse = () => {
    setIsCollipse((pre) => !pre)
  }
  useEffect(() => {
    if (textRef.current.scrollHeight > textRef.current.clientHeight) {
      setshowCollopse(true)
    } else {
      setshowCollopse(false)
    }
  }, [])
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'rgb(247,247,248)',
          },
        }}
      >
        <Card
          style={{
            width: 496,
            margin: 16,
          }}
        >
          <Meta
            title={
              <Row>
                <Col span={18}>
                  <Avatar
                    size={42}
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    className="!mr-2"
                  />
                  <Link
                    href="/username"
                    className="text-lg font-bold text-black hover:underline hover:text-black "
                  >
                    <span>usreName</span>
                  </Link>
                </Col>
                <Col span={6}>
                  <Button
                    size="large"
                    style={{
                      width: '100px',
                      color: 'white',
                      backgroundColor: 'rgb(254,44,85)',
                    }}
                    className="hover:!bg-rose-500"
                  >
                    关注
                  </Button>
                </Col>
              </Row>
            }
            description={
              <div className={`text-lg mb-3 flex text-black`}>
                <div
                  ref={textRef}
                  className={`mr-1 ${
                    isCollipse ? 'overflow-hidden line-clamp-2' : ''
                  } before:float-right before:w-0 before:h-full before:-mb-[28px]`}
                >
                  {showCollopse && (
                    <label
                      className="cursor-pointer font-bold  float-right clear-both"
                      onClick={toggleCollopse}
                    >
                      {isCollipse ? '展开' : '收起'}
                    </label>
                  )}
                  {/* {desc} */}
                  '这部视频带你领略了世界著名的巴黎艾菲尔铁塔的壮丽景色，从日出到日落，每一刻都美得令人窒息。这部视频带你领略了世界著名的巴黎艾菲尔铁塔的壮丽景色，从日出到日落，每一刻都美得令人窒息。',
                </div>
              </div>
            }
          />
        </Card>
      </ConfigProvider>
    </>
  )
}

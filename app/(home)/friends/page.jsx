'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import BackTop from 'antd/es/float-button/BackTop'
import PersonCard from '@/app/ui/PersonCard'
import { getPersonList } from '@/app/action/action'

export default function page() {
  const contentRef = useRef()
  const spinRef = useRef()
  const [personList, setPersonList] = useState([])
  const [page, setPage] = useState(0)
  const [showSpin, setShowSpin] = useState(true)

  useEffect(() => {
    const options = {
      rootMargin: '-64px 0px 0px 0px',
      threshold: [0]
    }
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        const res = await getPersonList(page)
        setPersonList((pre) => [...pre, ...res])
        setPage((pre) => pre + 1)
      }
    }, options)
    if (spinRef.current) {
      observer.observe(spinRef.current)
    }
    return () => {
      observer.disconnect(spinRef.current)
    }
  }, [page])
  useEffect(() => {
    if (personList.length === 36) {
      setShowSpin(false)
    }
  }, [personList])
  return (
    <div ref={contentRef} className="h-full w-full overflow-auto">
      <div
        style={{
          padding: '10px 10px 200px 100px',
          width: '800px',
          margin: '0 auto'
        }}
      >
        <Row wrap={true}>
          {personList.map((item) => {
            return (
              <Col
                key={item.name}
                span={8}
                style={{
                  paddingRight: '10px',
                  height: '300px',
                  borderRadius: '5px',
                  marginBottom: 10
                }}
              >
                <PersonCard
                  video={item.creatorVideos[0]}
                  name={item.name}
                  avatar={item.image}
                ></PersonCard>
              </Col>
            )
          })}
        </Row>
        {showSpin && (
          <div ref={spinRef} className="text-center">
            <Spin size="large" className="!my-3 " />
          </div>
        )}
        <BackTop target={() => contentRef.current} tooltip="返回到顶部"></BackTop>
      </div>
    </div>
  )
}

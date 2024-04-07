import React from 'react'
import { Row, Col } from 'antd'
import PersonCard from '@/app/ui/PersonCard'

export default function page() {
  return (
    <div className='h-full w-full overflow-auto'>
      <div
        style={{
          padding: '10px 10px 200px 100px',
          width: '800px',
          margin: '0 auto',
        }}
      >
        <Row wrap={true}>
          <Col
            span={8}
            style={{
              paddingRight: '10px',
              height: '300px',
              borderRadius: '5px',
              marginBottom: 10,
            }}
          >
            <PersonCard></PersonCard>
          </Col>{' '}
          <Col
            span={8}
            style={{
              paddingRight: '10px',
              height: '300px',
              borderRadius: '5px',
            }}
          >
            <PersonCard></PersonCard>
          </Col>{' '}
          <Col
            span={8}
            style={{
              paddingRight: '10px',
              height: '300px',
              borderRadius: '5px',
            }}
          >
            <PersonCard></PersonCard>
          </Col>{' '}
          <Col
            span={8}
            style={{
              paddingRight: '10px',
              height: '300px',
              borderRadius: '5px',
            }}
          >
            <PersonCard></PersonCard>
          </Col>{' '}
          <Col
            span={8}
            style={{
              paddingRight: '10px',
              height: '300px',
              borderRadius: '5px',
            }}
          >
            <PersonCard></PersonCard>
          </Col>
        </Row>
      </div>
    </div>
  )
}

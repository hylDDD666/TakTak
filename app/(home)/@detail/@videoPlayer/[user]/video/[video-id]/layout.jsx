import { Card } from 'antd'
import React from 'react'

export default function layout() {
  return (
    <>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={loading}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </>
  )
}

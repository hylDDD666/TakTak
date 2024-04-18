import { getUserInfo } from '@/app/action/action'
import UserMenu from '@/app/ui/user/UserMenu'
import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Menu, Row } from 'antd'
import React from 'react'


export default async function page({ params }) {
  const userInfo = await getUserInfo(params.user)
  console.log(userInfo)
  return (
    <div
      style={{
        height: 'calc(100vh - 63px)',
        padding: '10px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'auto',
      }}
      className=" min-[992px]:!pl-[210px]"
    >
      <Row wrap={false} className=" mt-2">
        <Col flex={'130px'}>
          <Avatar size={110} src={userInfo.image}></Avatar>
        </Col>
        <Col flex={1}>
          <h1 className=" text-3xl font-bold my-2">{userInfo.name}</h1>
          <h2 className=" text-lg font-bold mb-2">{userInfo.nickName}</h2>
          <Button icon={<EditOutlined />} size="large" className=" !font-bold">
            编辑主页
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col flex={'200px'}>
          <span className=" text-base pr-4">
            {
              <span className="font-bold pr-2 text-lg">
                {userInfo._count.following}
              </span>
            }
            已关注
          </span>
          <span className=" text-base pr-4">
            {
              <span className="font-bold pr-2 text-lg">
                {userInfo._count.followedBy}
              </span>
            }
            粉丝
          </span>
        </Col>
      </Row>
      <Row className="mt-2 font-medium">
        <Col>
          <span className=" text-base">
            {userInfo.desc ? userInfo.desc : '尚无个人简介'}
          </span>
        </Col>
      </Row>
     <UserMenu videos={userInfo.creatorVideos}></UserMenu>
    </div>
  )
}

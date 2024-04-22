import { getFollowedAndFans, getUserInfo } from '@/app/action/action'
import FollowButton from '@/app/ui/user/FollowButton'
import FollowedInfo from '@/app/ui/user/FollowedInfo'
import UserMenu from '@/app/ui/user/UserMenu'
import { auth } from '@/auth'
import { Avatar, Col,  Row } from 'antd'
import React from 'react'

export default async function page({ params }) {
  const session = await auth()
  const userInfo = await getUserInfo(params.user)
  const followedAndFans = await getFollowedAndFans(params.user)
  const { following, followedBy } = followedAndFans
  const isFollowed = followedBy.find((item) => session && item.name === session.user.name)
  return (
    <div
      style={{
        height: 'calc(100vh - 63px)',
        padding: '10px 10px 10px 100px',
        backgroundColor: 'white',
        overflowY: 'auto'
      }}
      className=" min-[992px]:!pl-[210px]"
    >
      <Row wrap={false} className=" mt-2">
        <Col flex={'130px'}>
          <Avatar size={110} src={userInfo.image}></Avatar>
        </Col>
        <Col flex={1}>
          <h1 className=" text-3xl font-bold my-2">{userInfo.name}</h1>
          <h2 className=" text-lg font-bold mb-2">
            {userInfo.nickName ? userInfo.nickName : userInfo.name}
          </h2>
          <FollowButton
            session={session}
            isFollowed={isFollowed}
            userInfo={userInfo}
          ></FollowButton>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col flex={'200px'}>
          <FollowedInfo
            userInfo={userInfo}
            following={following}
            followedBy={followedBy}
          ></FollowedInfo>
        </Col>
      </Row>
      <Row className="mt-2 font-medium">
        <Col>
          <span className=" text-base">{userInfo.desc ? userInfo.desc : '尚无个人简介'}</span>
        </Col>
      </Row>
      <UserMenu videos={userInfo.creatorVideos}></UserMenu>
    </div>
  )
}

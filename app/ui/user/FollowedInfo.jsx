'use client'
import { getFollow, getFollowBy, getUserInfo } from '@/app/action/action'
import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Button, List, Menu, Modal } from 'antd'
import Link from 'next/link'
import React, {  useLayoutEffect, useState } from 'react'
import FollowingButton from '../FollowingButton'

export default function FollowedInfo(props) {
  const [userInfo, setUserInfo] = useState(props.userInfo)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [current, setCurrent] = useState()
  const [followedPage, setFollowedPage] = useState(0)
  const [followedByPage, setFollowedByPage] = useState(0)
  const [followedList, setFollowedList] = useState([])
  const [followedByList, setFollowedByList] = useState([])
  const [currentData, setCurrentData] = useState([])
  const showFollowed = async () => {
    setCurrent('followed')
    setShowModal(true)
    if (userInfo._count.following != 0 && followedList.length === 0) {
      setIsLoading(true)
      const res = await getFollow(userInfo.name, followedPage)
      setFollowedList(res)
      setFollowedPage((pre) => pre + 1)
      setIsLoading(false)
    }
  }
  const showFollowedBy = async () => {
    setCurrent('followedBy')
    setShowModal(true)
    if (userInfo._count.followedBy != 0 && followedByList.length === 0) {
      setIsLoading(true)
      const res = await getFollowBy(userInfo.name, followedByPage)
      setFollowedByList(res)
      setFollowedByPage((pre) => pre + 1)
      setIsLoading(false)
    }
  }
  const syncFollowState = (name, isFollowed) => {
    setFollowedList((pre) => {
      const newList = pre.map((item) => {
        if (item.name === name) {
          item.isFollow = isFollowed
        }
        return item
      })
      return newList
    })
    setFollowedByList((pre) => {
      const newList = pre.map((item) => {
        if (item.name === name) {
          item.isFollow = isFollowed
        }
        return item
      })
      return newList
    })
  }
  const updateUserInfo = async () => {
    const res = await getUserInfo(userInfo.name)
    setUserInfo(res)
  }
  const handleSelect = async ({ key }) => {
    if (key === 'followed') {
      await showFollowed()
    }
    if (key === 'followedBy') {
      await showFollowedBy()
    }
  }
  const hideModal = async () => {
    setShowModal(false)
    await updateUserInfo()
  }
  useLayoutEffect(() => {
    if (current === 'followed') {
      setCurrentData(followedList)
    }
    if (current === 'followedBy') {
      setCurrentData(followedByList)
    }
  }, [followedList, followedByList, current])
  const items = [
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          已关注
          {<span className="font-bold text-lg"> {userInfo._count.following}</span>}
        </div>
      ),
      key: 'followed'
    },
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          粉丝
          {<span className="font-bold text-lg"> {userInfo._count.followedBy}</span>}
        </div>
      ),
      key: 'followedBy'
    },
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          好友
          {<span className="font-bold text-lg"> {userInfo._count.followedBy}</span>}
        </div>
      ),
      key: 'friend'
    }
  ]
  return (
    <>
      <span className=" text-base pr-4 hover:cursor-pointer" onClick={showFollowed}>
        {<span className="font-bold pr-2 text-lg">{userInfo._count.following}</span>}
        已关注
      </span>
      <span className=" text-base pr-4 hover:cursor-pointer" onClick={showFollowedBy}>
        {<span className="font-bold pr-2 text-lg">{userInfo._count.followedBy}</span>}
        粉丝
      </span>
      <Modal
        title={
          <div className=" flex">
            <div className=" text-2xl text-center flex-auto">{userInfo.name}</div>
            <Button
              size="large"
              className=" !border-0"
              onClick={hideModal}
              icon={<CloseOutlined className=" !text-xl" />}
            ></Button>
          </div>
        }
        open={showModal}
        closable={false}
        footer={null}
      >
        <Menu
          items={items}
          selectedKeys={[current]}
          mode="horizontal"
          onSelect={handleSelect}
        ></Menu>
        <div className=" h-128 w-full px-3 overflow-y-auto scrollbar-w-0 scrollbar ">
          <List
            itemLayout="horizontal"
            dataSource={currentData}
            loading={isLoading}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <FollowingButton
                    name={item.name}
                    isFollowed={item.isFollow}
                    syncFollowState={syncFollowState}
                  ></FollowingButton>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} size={50} />}
                  title={
                    <Link href={`/${item.name}`} className=" text-lg font-semibold">
                      {item.name}
                    </Link>
                  }
                  description={item.nickName ? item.nickName : item.name}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  )
}

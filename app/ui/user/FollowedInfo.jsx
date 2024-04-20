'use client'
import { getFollow, validateIsFollow } from '@/app/action/action'
import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Button, List, Menu, Modal } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FollowedInfo(props) {
  const [showModal, setShowModal] = useState(false)
  const [current, setCurrent] = useState('followed')
  const [followedPage, setFollowedPage] = useState(0)
  const [followedByPage, setFollowedByPage] = useState(0)
  const [followedList, setFollowedList] = useState([])
  const [followedByList, setFollowedByList] = useState([])
  const showFollowed = async () => {
    const res = await getFollow(props.userInfo.name, followedPage)
    setFollowedList(res.following)
    setFollowedPage((pre) => pre + 1)
    setShowModal(true)
  }
  const showFollowedBy = async () => {
    const res = await getFollow(props.userInfo.name, followedByPage)
    setFollowedByList(res.followedBy)
    setFollowedByPage((pre) => pre + 1)

    setShowModal(true)
  }
  const handleSelect = ({ key }) => {
    setCurrent(key)
  }
  const hideModal = () => {
    setShowModal(false)
  }
  const items = [
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          已关注
          {<span className="font-bold text-lg"> {props.userInfo._count.following}</span>}
        </div>
      ),
      key: 'followed'
    },
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          粉丝
          {<span className="font-bold text-lg"> {props.userInfo._count.followedBy}</span>}
        </div>
      ),
      key: 'followedBy'
    },
    {
      label: (
        <div className=" text-base hover:cursor-pointer text-center w-[120px] mb-2">
          好友
          {<span className="font-bold text-lg"> {props.userInfo._count.followedBy}</span>}
        </div>
      ),
      key: 'friend'
    }
  ]
  return (
    <>
      <span className=" text-base pr-4 hover:cursor-pointer" onClick={showFollowed}>
        {<span className="font-bold pr-2 text-lg">{props.userInfo._count.following}</span>}
        已关注
      </span>
      <span className=" text-base pr-4 hover:cursor-pointer" onClick={showFollowedBy}>
        {<span className="font-bold pr-2 text-lg">{props.userInfo._count.followedBy}</span>}
        粉丝
      </span>
      <Modal
        title={
          <div className=" flex">
            <div className=" text-2xl text-center flex-auto">{props.userInfo.name}</div>
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
            dataSource={followedList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    size="large"
                    className=" !font-bold !bg-rose-500 hover:!bg-rose-700 !text-white w-28 !rounded-md"
                    // onClick={handleFollowClick}
                  >
                    关注
                  </Button>
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

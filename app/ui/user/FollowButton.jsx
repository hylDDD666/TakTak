'use client'
import {
  addFollow,
  subFollow,
  updateUserInfo,
  validateName,
} from '@/app/action/action'
import useAuth from '@/app/hooks/useAuth'
import { useHomeStore } from '@/app/stores/homeStore'
import {
  CloseOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Modal, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function FollowButton(props) {
  const { data: session, update } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const params = useParams()
  const router = useRouter()
  const [isFollowed, setIsFollowed] = useState(props.isFollowed)
  const [form] = Form.useForm()
  const handleFollowClick = useAuth(() => {
    setIsFollowed(true)
    addFollow(params.user)
  })
  const handleUnfollowClick = () => {
    setIsFollowed(false)
    subFollow(params.user)
  }
  const showEdit = () => {
    setShowModal(true)
  }
  const handleCancel = () => {
    setShowModal(false)
  }
  const handleValuesChange = (changedValues, allValues) => {
    if (
      allValues.name === props.userInfo.name &&
      allValues.nickName === props.userInfo.nickName &&
      allValues.desc === props.userInfo.desc
    ) {
      setSaveDisabled(true)
    } else {
      setSaveDisabled(false)
    }
  }
  const handleOK = async () => {
    const values = form.getFieldsValue()
    await updateUserInfo(values)
    await update({ ...values })
    setShowModal(false)
    router.replace(`/${values.name}`)
  }
  return (
    <>
      {props.session && props.session.user.name === params.user ? (
        <>
          <Button
            icon={<EditOutlined />}
            size="large"
            className=" !font-bold w-52 !rounded-md"
            onClick={showEdit}
          >
            编辑主页
          </Button>
          <Modal
            title={<span className=" text-2xl">编辑主页</span>}
            open={showModal}
            onCancel={handleCancel}
            onOk={handleOK}
            cancelText={'取消'}
            okText={'保存'}
            styles={{
              header: {
                height: '50px',
                borderBottom: '0.5px solid rgba(22, 24, 35, 0.2) ',
              },
              footer: {
                height: '60px',
                paddingTop: 15,
                borderTop: '0.5px solid rgba(22, 24, 35, 0.2) ',
              },
            }}
            okButtonProps={{
              size: 'large',
              className: 'w-24',
              disabled: saveDisabled,
            }}
            className=" w-"
            cancelButtonProps={{ size: 'large', className: 'w-24' }}
            width={720}
            closeIcon={<CloseOutlined className=" text-2xl" />}
          >
            <Form
              form={form}
              colon={false}
              labelCol={{ span: 5 }}
              labelAlign="left"
              onValuesChange={handleValuesChange}
              wrapperCol={{ span: 14 }}
              initialValues={props.userInfo}
            >
              <Form.Item
                label={<span className=" text-base font-semibold">用户名</span>}
                name={'name'}
                extra="用户名只能包含字母、数字、下划线和句点。更改你的用户名也将更改你的主页链接。"
                style={{
                  borderBottom: '0.5px solid rgba(22, 24, 35, 0.2) ',
                  paddingTop: 10,
                  paddingBottom: 30,
                }}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                  {
                    pattern: /\S\w/,
                    message: '用户名不合法',
                  },
                  {
                    async validator(_, value) {
                      await validateName(value)
                    },
                  },
                ]}
              >
                <Input
                  placeholder="用户名"
                  className=" !bg-gray-100 text-base"
                ></Input>
              </Form.Item>
              <Form.Item
                label={<span className=" text-base font-semibold">昵称</span>}
                name={'nickName'}
                style={{
                  borderBottom: '0.5px solid rgba(22, 24, 35, 0.2) ',
                  paddingBottom: 30,
                }}
              >
                <Input
                  placeholder="昵称"
                  className=" !bg-gray-100 text-base"
                ></Input>
              </Form.Item>
              <Form.Item
                label={
                  <span className=" text-base font-semibold">个人简介</span>
                }
                name={'desc'}
                style={{ paddingBottom: 10 }}
              >
                <Input.TextArea
                  placeholder="个人简介"
                  className=" !bg-gray-100 text-base"
                ></Input.TextArea>
              </Form.Item>
            </Form>
          </Modal>
        </>
      ) : (
        <>
          {isFollowed ? (
            <div>
              <Button
                size="large"
                className=" w-40 !rounded-md !text-rose-500 !border-rose-500 !bg-white mr-2 !font-bold hover:!bg-rose-100"
              >
                消息
              </Button>
              <Tooltip title={'取消关注'}>
                <Button
                  icon={<UserDeleteOutlined />}
                  size="large"
                  className=" !font-bold w-10 !rounded-md"
                  onClick={handleUnfollowClick}
                ></Button>
              </Tooltip>
            </div>
          ) : (
            <Button
              size="large"
              className=" !font-bold !bg-rose-500 hover:!bg-rose-700 !text-white w-52 !rounded-md"
              onClick={handleFollowClick}
            >
              关注
            </Button>
          )}
        </>
      )}
    </>
  )
}

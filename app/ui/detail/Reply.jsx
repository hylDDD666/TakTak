'use client'
import useAuth from '@/app/hooks/useAuth'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Input, Popover, Tooltip } from 'antd'
import Compact from 'antd/es/space/Compact'
import EmojiPicker from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function Reply(props) {
  const { data: session } = useSession()
  const { placeholder } = props
  const [commentInput, setCommentInput] = useState('')
  const inputChange = (e) => {
    setCommentInput(e.target.value)
  }
  const addEmoji = (emojiData, e) => {
    setCommentInput((pre) => pre + emojiData.emoji)
  }
  const handleFocus = useAuth()
  const handleClick = () => {
    props.addComment(commentInput)
    setCommentInput('')
  }
  const handleEnter = (e) => {
    if (commentInput.trim() !== '' && e.key === 'Enter') {
      handleClick()
    }
  }
  return (
    <Compact style={{ width: '100%', marginBottom: '10px' }}>
      <Input
        onFocus={handleFocus}
        onKeyUp={handleEnter}
        onChange={inputChange}
        value={commentInput}
        style={{
          width: '85%',
          border: '1px solid rgb(241,241,242)',
          color: 'black',
          backgroundColor: 'rgb(241,241,242)',
        }}
        placeholder={!session ? '请登录后再评论...' : placeholder}
        suffix={
          <Popover
            placement="topLeft"
            color="white"
            trigger={'click'}
            content={
              <EmojiPicker
                width={'300px'}
                height={'300px'}
                searchDisabled
                skinTonesDisabled
                onEmojiClick={addEmoji}
              ></EmojiPicker>
            }
          >
            <Tooltip title="点击添加表情">
              <Button
                style={{
                  color: 'black',
                  borderColor: 'rgb(241,241,242)',
                  backgroundColor: 'rgb(241,241,242)',
                }}
                icon={<SmileOutlined className="text-lg" />}
                className="hover:!bg-gray-300"
              ></Button>
            </Tooltip>
          </Popover>
        }
      ></Input>
      <Button
        size="large"
        disabled={commentInput === ''}
        className={`!border-0 ${
          commentInput.trim() === '' ? 'text-gray-300' : '!text-rose-500'
        } hover:!bg-white !font-semibold !bg-white !text-sm`}
        onClick={handleClick}
      >
        发送
      </Button>
    </Compact>
  )
}

'use client'
import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <button
      onClick={() =>
        signIn('credentials', {
          userName: 'item',
          password: '123456'
        })
      }
    >
      登录
    </button>
  )
}

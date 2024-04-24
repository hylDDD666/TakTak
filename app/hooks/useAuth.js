import React from 'react'
import { useHomeStore } from '../stores/homeStore'
import { useSession } from 'next-auth/react'

export default function useAuth(func1, func2) {
  const { data: session } = useSession()
  const setShowLogin = useHomeStore((state) => state.setShowLogin)
  const clickHandler = () => {
    if (session) {
      if (func1) {
        func1()
      }
    } else {
      setShowLogin(true)
      if (func2) {
        func2()
      }
    }
  }
  return clickHandler
}

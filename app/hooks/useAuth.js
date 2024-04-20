import React from 'react'
import { useHomeStore } from '../stores/homeStore'

export default function useAuth(func1,func2) {
  const session = useHomeStore(state=>state.session)
  const setShowLogin = useHomeStore((state) => state.setShowLogin)
  const clickHandler = ()=>{
    if(session){
      func1()
    }else{
      setShowLogin(true)
      if(func2){
        func2()
      }
    }
  }
  return clickHandler
}

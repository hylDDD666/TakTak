'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLink(props) {
  const { path, children } = props
  const pathName = usePathname()
  return (
    <Link href={path} 
    className={pathName === path ? '!rgb(254,44,85)' : ''}
    >
      {children}
    </Link>
  )
}

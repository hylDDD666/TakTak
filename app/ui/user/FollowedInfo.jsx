import React from 'react'

export default function FollowedInfo() {
  return (
    <>
      <span className=" text-base pr-4">
        {<span className="font-bold pr-2 text-lg">{userInfo._count.following}</span>}
        已关注
      </span>
      <span className=" text-base pr-4">
        {<span className="font-bold pr-2 text-lg">{userInfo._count.followedBy}</span>}
        粉丝
      </span>
    </>
  )
}

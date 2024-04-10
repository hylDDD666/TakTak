'use server'

import prisma from '@/lib/prisma'

export const fetchHomeVideos = async (page) => {
  const res = await prisma.video.findMany({
    skip: (page * 5) % 130,
    take: 5,
    select: {
      id: true,
      desc: true,
      url: true,
      type: true,
      cover: true,
      videoHeight: true,
      videoWidth: true,
      likeNum: true,
      commentsNum: true,
      collectNum: true,
      shareNum: true,
      author: {
        select: {
          id: true,
          userName: true,
          avatar: true
        }
      }
    }
  })
  return res
}
export const fetchCreatorVideos = async (userId)=>{
  const res = await prisma.video.findMany({
    where:{
      authorId:userId
    },
    select:{
      id: true,
      desc: true,
      url: true,
      type: true,
      cover: true,
      videoHeight: true,
      videoWidth: true,
      likeNum: true,
      commentsNum: true,
      collectNum: true,
      shareNum: true,
      author: {
        select: {
          id: true,
          userName: true,
          avatar: true
        }
      }
    }
  })
  return res
}

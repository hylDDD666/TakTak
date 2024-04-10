'use server'

import prisma from "@/lib/prisma"

export const fetchHomeVideos = async (page) => {
  const res = await prisma.video.findMany({
    skip: page * 5,
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
          avatar: true,
        },
      },
    },
  })
  return res
}

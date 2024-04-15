'use server'

import prisma from '@/lib/prisma'

export const fetchHomeVideos = async (page) => {
  const res = await prisma.video.findMany({
    skip: (page * 5) % 380,
    take: 5,
    select: {
      id: true,
      desc: true,
      url: true,
      type: true,
      cover: true,
      videoHeight: true,
      videoWidth: true,
      shareNum: true,
      author: {
        select: {
          id: true,
          userName: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comment: true,
          liker: true,
          collector: true,
        },
      },
    },
  })
  return res
}
export const fetchCreatorVideos = async (userId) => {
  const res = await prisma.video.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      desc: true,
      url: true,
      type: true,
      cover: true,
      videoHeight: true,
      videoWidth: true,
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

export const fetchCommentByVideoId = async (videoId,page) => {
  let comments
  const commentNum = await prisma.comment.count({
    where: {
      videoId: videoId,
      commentOn: null,
    }
  })
  try {
    comments = await prisma.comment.findMany({
      skip:page*15,
      take:15,
      where: {
        videoId: videoId,
        commentOn: null,
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            avatar: true,
          },
        },
        _count:{
          select:{
            commentBy:true
          }
        }
      },
      
    })
  } catch (error) {
    console.log(error);
  }
  
  return ({
    comments,commentNum
  })
}

export const fetchSubCommentById=async (id,page)=>{

  const comments =await prisma.comment.findMany({
    skip:page*5,
    take:5,
    where:{
      commentId:id
    },
    include: {
      author: {
        select: {
          id: true,
          userName: true,
          avatar: true,
        },
      },
    },
    
  })
  return  comments
}
export const authenticate = async(username,password)=>{
  const res = await prisma.user.findUnique({
    where:{
      userName:username,
      password
    }
  })
  return  res
}
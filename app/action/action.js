'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const fetchHomeVideos = async (page) => {
  let res = await prisma.video.findMany({
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
          name: true,
          image: true
        }
      },
      _count: {
        select: {
          comment: true,
          liker: true,
          collector: true
        }
      }
    }
  })
  res = res.map((item) => {
    return {
      ...item,
      author: {
        id: item.author.id,
        userName: item.author.name,
        avatar: item.author.image
      }
    }
  })
  return res
}
export const fetchCreatorVideos = async (userId) => {
  let res = await prisma.video.findMany({
    where: {
      authorId: userId
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
          name: true,
          image: true
        }
      },
      _count: {
        select: {
          comment: true,
          liker: true,
          collector: true
        }
      }
    }
  })
  res = res.map((item) => {
    return {
      ...item,
      author: {
        id: item.author.id,
        userName: item.author.name,
        avatar: item.author.image
      }
    }
  })
  return res
}

export const fetchCommentByVideoId = async (videoId, page) => {
  let comments
  const commentNum = await prisma.comment.count({
    where: {
      videoId: videoId,
      commentOn: null
    }
  })
  try {
    comments = await prisma.comment.findMany({
      skip: page * 15,
      take: 15,
      where: {
        videoId: videoId,
        commentOn: null
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            commentBy: true
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
  comments = comments.map((item) => {
    return {
      ...item,
      author: {
        id: item.author.id,
        userName: item.author.name,
        avatar: item.author.image
      }
    }
  })
  return {
    comments,
    commentNum
  }
}

export const fetchSubCommentById = async (id, page) => {
  let comments = await prisma.comment.findMany({
    skip: page * 5,
    take: 5,
    where: {
      commentId: id
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })
  comments = comments.map((item) => {
    return {
      ...item,
      author: {
        id: item.author.id,
        userName: item.author.name,
        avatar: item.author.image
      }
    }
  })
  return comments
}
export const authenticate = async (username, password) => {
  const res = await prisma.user.findUnique({
    where: {
      name: username,
    }
  })
  if(!(await bcrypt.compare(password,res.password))){
    return null
  }
  return res
}

export const resgister = async(username, password)=>{
  const existUser = await prisma.user.findUnique({
    where:{
      name:username
    }
  })
  if(existUser){
    return {error:'用户名已存在'}
  }
  const hashPassword = await bcrypt.hash(password,10)
  const res = await prisma.user.create({
    data:{
      name:username,
      password:hashPassword
    }
  })
  return {success:'注册成功'}
}

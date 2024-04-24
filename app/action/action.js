'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

export const fetchHomeVideos = async (page) => {
  let res = await prisma.video.findMany({
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
      shareNum: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
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
  res = await Promise.all(
    res.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
          isFollow: await validateIsFollow(item.author.name),
        },
        isLike: await validateIsLike(item.id),
        isCollect: await validateIsCollect(item.id),
      }
    })
  )
  return res
}
export const fetchCreatorVideos = async (userId) => {
  let res = await prisma.video.findMany({
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
          name: true,
          image: true,
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
  res = await Promise.all(
    res.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
          isFollow: await validateIsFollow(item.author.name),
        },
        isLike: await validateIsLike(item.id),
        isCollect: await validateIsCollect(item.id),
      }
    })
  )
  return res
}

export const getCommentNumByVideoId = async (videoId) => {
  const res = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
    select: {
      _count: {
        select: {
          comment: true,
        },
      },
    },
  })
  console.log(res)
  revalidatePath('/', 'layout')
  return res._count.comment
}
export const fetchCommentByVideoId = async (videoId, page) => {
  let comments
  const commentNum = await prisma.comment.count({
    where: {
      videoId: videoId,
      commentOn: null,
    },
  })

  comments = await prisma.comment.findMany({
    skip: page * 15,
    take: 15,
    where: {
      videoId: videoId,
      commentOn: null,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          commentBy: true,
          likedBy: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  comments = await Promise.all(
    comments.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
        },
        isLike: await validateIsCommentLike(item.id),
      }
    })
  )
  revalidatePath('/', 'layout')
  return {
    comments,
    commentNum,
  }
}

export const fetchSubCommentById = async (id, page) => {
  let comments = await prisma.comment.findMany({
    skip: page * 5,
    take: 5,
    where: {
      commentId: id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likedBy: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  comments = await Promise.all(
    comments.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
        },
        isLike: await validateIsCommentLike(item.id),
      }
    })
  )
  revalidatePath('/', 'layout')

  return comments
}
export const authenticate = async (username, password) => {
  const res = await prisma.user.findUnique({
    where: {
      name: username,
    },
  })
  if (!(await bcrypt.compare(password, res.password))) {
    return null
  }
  return res
}

export const resgister = async (username, password) => {
  const existUser = await prisma.user.findUnique({
    where: {
      name: username,
    },
  })
  if (existUser) {
    return { error: '用户名已存在' }
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const res = await prisma.user.create({
    data: {
      name: username,
      password: hashPassword,
    },
  })
  return { success: '注册成功' }
}
export const getUserInfo = async (name) => {
  let res = await prisma.user.findUnique({
    where: {
      name: name,
    },
    include: {
      creatorVideos: {
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
              image: true,
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
      },
      _count: {
        select: {
          following: true,
          followedBy: true,
        },
      },
    },
  })
  res.creatorVideos = await Promise.all(
    res.creatorVideos.map(async (item, index) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
          isFollow: await validateIsFollow(item.author.name),
        },
      }
    })
  )
  revalidatePath('/', 'layout')
  return res
}

export const getCollectVideos = async (userName) => {
  let res = await prisma.user.findUnique({
    where: {
      name: userName,
    },
    select: {
      collectedVideos: {
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
              image: true,
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
      },
    },
  })
  res.collectedVideos = await Promise.all(
    res.collectedVideos.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
          isFollow: await validateIsFollow(item.author.name),
        },
        isLike: await validateIsLike(item.id),
        isCollect: true,
      }
    })
  )
  return res.collectedVideos
}

export const getLikedVideos = async (userName) => {
  let res = await prisma.user.findUnique({
    where: {
      name: userName,
    },
    select: {
      likedVideos: {
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
              image: true,
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
      },
    },
  })
  res.likedVideos = await Promise.all(
    res.likedVideos.map(async (item) => {
      return {
        ...item,
        author: {
          id: item.author.id,
          userName: item.author.name,
          avatar: item.author.image,
          isFollow: await validateIsFollow(item.author.name),
        },
        isLike: true,
        isCollect: await validateIsCollect(item.id),
      }
    })
  )
  return res.likedVideos
}

export const getFollowedAndFans = async (name) => {
  const res = await prisma.user.findUnique({
    where: {
      name: name,
    },
    select: {
      following: true,
      followedBy: true,
    },
  })
  res.following = await Promise.all(
    res.following.map(async (item) => {
      return {
        ...item,
        isFollow: await validateIsFollow(item.name),
      }
    })
  )
  res.followedBy = await Promise.all(
    res.followedBy.map(async (item) => {
      return {
        ...item,
        isFollow: await validateIsFollow(item.name),
      }
    })
  )
  revalidatePath('/', 'layout')
  return res
}

export const addFollow = async (followed) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      following: {
        connect: {
          name: followed,
        },
      },
    },
  })
}
export const subFollow = async (followed) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      following: {
        disconnect: {
          name: followed,
        },
      },
    },
  })
}

export const validateName = async (name) => {
  const session = await auth()
  if (name === session.user.name) {
    return true
  } else {
    const res = await prisma.user.findUnique({
      where: {
        name: name,
      },
    })
    if (res) {
      throw new Error('用户名已存在')
    } else {
      return true
    }
  }
}

export const updateUserInfo = async (values) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...values,
    },
  })
}
export const getUserInfoById = async (id) => {
  const res = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return res
}
export const validateIsFollow = async (name) => {
  const session = await auth()
  if (!session) return false
  const user = session.user
  if (!user) return false
  const res = await prisma.user.findMany({
    where: {
      name: user.name,
      following: {
        some: {
          name: name,
        },
      },
    },
  })
  if (res.length !== 0) return true
  revalidatePath('/', 'layout')
  return false
}
export const validateIsLike = async (videoId) => {
  const session = await auth()
  if (!session) return false
  const user = session.user

  const res = await prisma.user.findUnique({
    where: {
      name: user.name,
      likedVideos: {
        some: {
          id: videoId,
        },
      },
    },
  })
  if (res) return true
  revalidatePath('/', 'layout')
  return false
}
export const validateIsCollect = async (videoId) => {
  const session = await auth()
  if (!session) return false
  const user = session.user
  const res = await prisma.user.findUnique({
    where: {
      name: user.name,
      collectedVideos: {
        some: {
          id: videoId,
        },
      },
    },
  })
  if (res) return true
  revalidatePath('/', 'layout')
  return false
}
export const getFollow = async (name, page) => {
  const res = await prisma.user.findUnique({
    where: {
      name: name,
    },
    select: {
      following: {
        skip: page * 10,
        take: 10,
        select: {
          id: true,
          name: true,
          nickName: true,
          image: true,
        },
      },
    },
  })
  res.following = await Promise.all(
    res.following.map(async (item) => {
      return {
        ...item,
        isFollow: await validateIsFollow(item.name),
      }
    })
  )
  revalidatePath('/', 'layout')
  return res.following
}
export const getFollowBy = async (name, page) => {
  let res = await prisma.user.findUnique({
    where: {
      name: name,
    },
    select: {
      followedBy: {
        skip: page * 10,
        take: 10,
        select: {
          id: true,
          name: true,
          nickName: true,
          image: true,
        },
      },
    },
  })
  res.followedBy = await Promise.all(
    res.followedBy.map(async (item) => {
      return {
        ...item,
        isFollow: await validateIsFollow(item.name),
      }
    })
  )
  revalidatePath('/', 'layout')
  return res.followedBy
}
export const addLike = async (id) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      likedVideos: {
        connect: {
          id: id,
        },
      },
    },
  })
}
export const subLike = async (id) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      likedVideos: {
        disconnect: {
          id: id,
        },
      },
    },
  })
}
export const getLikeNum = async (id) => {
  const res = await prisma.video.findUnique({
    where: {
      id: id,
    },
    select: {
      _count: {
        select: {
          liker: true,
        },
      },
    },
  })
  return res._count.liker
}
export const addCollect = async (id) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      collectedVideos: {
        connect: {
          id: id,
        },
      },
    },
  })
}
export const subCollect = async (id) => {
  const session = await auth()
  const res = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      collectedVideos: {
        disconnect: {
          id: id,
        },
      },
    },
  })
}
export const getCollectNum = async (id) => {
  const res = await prisma.video.findUnique({
    where: {
      id: id,
    },
    select: {
      _count: {
        select: {
          collector: true,
        },
      },
    },
  })
  return res._count.collector
}

export const addShareNum = async (id) => {
  await prisma.video.update({
    where: {
      id: id,
    },
    data: {
      shareNum: {
        increment: 1,
      },
    },
  })
}
export const getShareNUm = async (id) => {
  const res = await prisma.video.findUnique({
    where: {
      id: id,
    },
    select: {
      shareNum: true,
    },
  })
  return res.shareNum
}

export const getCommentsNum = async (id) => {
  const res = await prisma.video.findUnique({
    where: {
      id: id,
    },
    select: {
      _count: {
        select: {
          comment: true,
        },
      },
    },
  })
  return res._count.comment
}

export const addLikeToComment = async (id) => {
  const session = await auth()
  const res = await prisma.comment.update({
    where: {
      id: id,
    },
    data: {
      likedBy: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })
}
export const subLikeToComment = async (id) => {
  const session = await auth()
  const res = await prisma.comment.update({
    where: {
      id: id,
    },
    data: {
      likedBy: {
        disconnect: {
          id: session.user.id,
        },
      },
    },
  })
}
export const validateIsCommentLike = async (commentId) => {
  const session = await auth()
  if (!session) return false
  const user = session.user

  const res = await prisma.user.findUnique({
    where: {
      name: user.name,
      likedComments: {
        some: {
          id: commentId,
        },
      },
    },
  })
  if (res) return true
  revalidatePath('/', 'layout')
  return false
}
export const getCommentByCommentId = async (id) => {
  let comment = await prisma.comment.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          commentBy: true,
          likedBy: true,
        },
      },
    },
  })

  comment = {
    ...comment,
    author: {
      id: comment.author.id,
      userName: comment.author.name,
      avatar: comment.author.image,
    },
    isLike: await validateIsCommentLike(comment.id),
  }
  return comment
}
export const addComment = async (desc, videoId) => {
  const { user } = await auth()
  const res = await prisma.comment.create({
    data: {
      content: desc,
      authorId: user.id,
      videoId: videoId,
    },
  })
  const comment = await getCommentByCommentId(res.id)
  return comment
}
export const addSubComment = async (desc, videoId, commentId) => {
  const { user } = await auth()
  const res = await prisma.comment.create({
    data: {
      content: desc,
      authorId: user.id,
      videoId: videoId,
      commentId: commentId,
    },
  })
  const comment = await getCommentByCommentId(res.id)
  return comment
}

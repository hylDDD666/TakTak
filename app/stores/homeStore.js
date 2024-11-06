import { create } from 'zustand'
import { fetchHomeVideos, fetchCreatorVideos, getFollowingVideos } from '../action/action'
import { produce } from 'immer'

const getItemList = async (page) => {
  const itemList = await fetchHomeVideos(page)
  for (let i = 0; i < 5; i++) {
    itemList[i] = {
      ...itemList[i],
      author: {
        ...itemList[i].author
      },
      disLike: false,
      isPlaying: false
    }
  }
  return itemList
}

const getCreatorVideos = async (userId) => {
  const itemList = await fetchCreatorVideos(userId)
  for (let i = 0; i < itemList.length; i++) {
    itemList[i] = {
      ...itemList[i],
      author: {
        ...itemList[i].author
      },
      disLike: false,
      isPlaying: false
    }
  }
  return itemList
}
export const useHomeStore = create((set, get) => ({
  session: null,
  user: null,
  showLogin: false,
  isAutoRoll: false,
  itemList: [],
  creatorVideos: [],
  userItemList: [],
  isFollowedPage: false,
  isUserVideoDetailOn: false,
  page: 0,
  currentPlayId: 0,
  curDetailId: 0,
  scrollHeight: 10,
  isDetailOn: false,
  isCreatorVideosOn: false,
  lastReplyShow: -1,
  curReplyShow: -1,
  setIsFollowedPage: (boolean) => {
    set(() => {
      return { isFollowedPage: boolean }
    })
  },
  initItemList: () => {
    set(() => {
      return { itemList: [], page: 0, scrollHeight: 10 }
    })
  },
  setIsUserVideoDetailOn: (boolean) => {
    set(() => {
      return { isUserVideoDetailOn: boolean }
    })
  },
  setUserItemList: (list) => {
    set(() => {
      return { userItemList: list }
    })
  },
  syncFollowState: (name, isFollow) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          if (item.author.userName === name) {
            item.author.isFollow = isFollow
          }
        })
        state.creatorVideos.forEach((item) => {
          if (item.author.userName === name) {
            item.author.isFollow = isFollow
          }
        })
        state.userItemList.forEach((item) => {
          if (item.author.userName === name) {
            item.author.isFollow = isFollow
          }
        })
      })
    )
  },
  syncLikeState: (videoId, isLike) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          if (item.id === videoId) {
            item.isLike = isLike
            if (isLike) {
              item._count.liker += 1
            } else {
              item._count.liker -= 1
            }
          }
        })
        state.creatorVideos.forEach((item) => {
          if (item.id === videoId) {
            item.isLike = isLike
            if (isLike) {
              item._count.liker += 1
            } else {
              item._count.liker -= 1
            }
          }
        })
        state.userItemList.forEach((item) => {
          if (item.id === videoId) {
            item.isLike = isLike
            if (isLike) {
              item._count.liker += 1
            } else {
              item._count.liker -= 1
            }
          }
        })
      })
    )
  },
  syncCollectState: (videoId, isCollect) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          if (item.id === videoId) {
            item.isCollect = isCollect
            if (isCollect) {
              item._count.collector += 1
            } else {
              item._count.collector -= 1
            }
          }
        })
        state.creatorVideos.forEach((item) => {
          if (item.id === videoId) {
            item.isCollect = isCollect
            if (isCollect) {
              item._count.collector += 1
            } else {
              item._count.collector -= 1
            }
          }
        })
        state.userItemList.forEach((item) => {
          if (item.id === videoId) {
            item.isCollect = isCollect
            if (isCollect) {
              item._count.collector += 1
            } else {
              item._count.collector -= 1
            }
          }
        })
      })
    )
  },
  setSession: (session) => {
    set(() => {
      return { session }
    })
  },
  setUser: (token) => {
    set(() => {
      return { user: token }
    })
  },
  setShowLogin: (boolean) => {
    set(() => {
      return { showLogin: boolean }
    })
  },
  setCurReplyShow: (id) => {
    set(() => {
      return { curReplyShow: id }
    })
  },
  setLastReplyShow: (id) => {
    set(() => {
      return { lastReplyShow: id }
    })
  },
  setIsDetailOn: (boolean) => {
    set(() => {
      return { isDetailOn: boolean }
    })
  },
  setIsCreatorVideosOn: (boolean) => {
    set(() => {
      return { isCreatorVideosOn: boolean }
    })
  },
  getCreatorVideos: async (userId) => {
    const res = await getCreatorVideos(userId)
    set(() => {
      const newList = [...res]
      return { creatorVideos: newList }
    })
  },
  fetchItemData: async (type) => {
    let res
    if ((type === 'followed')) {
      res = await getFollowingVideos(get().page)
    } else {
      res = await getItemList(get().page)
    }
    set((state) => {
      const newList = [...state.itemList, ...res]
      return { itemList: newList }
    })
  },
  addPage: () => {
    set((state) => {
      return { page: state.page + 1 }
    })
  },
  setCurId: (id) => {
    set(() => {
      return { currentPlayId: id }
    })
  },
  setDetailId: (id) => {
    set(() => {
      return { curDetailId: id }
    })
  },
  deleteItem: (id) => {
    set((state) => {
      const newList = [...state.itemList].filter((item) => item.id !== id)
      return { itemList: newList }
    })
  },
  disLikeItem: (id) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          if (item.id == id) {
            item.disLike = true
          }
        })
      })
    )
  },
  pauseAllItems: () => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          item.isPlaying = false
        })
      })
    )
  },
  pauseItemById: (id) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          if (item.id == id) item.isPlaying = false
        })
      })
    )
  },
  playItemById: (id) => {
    set(
      produce((state) => {
        state.itemList.forEach((item) => {
          item.isPlaying = false
          if (item.id == id) {
            item.isPlaying = true
          }
        })
      })
    )
  },
  toggleAutoRoll: () => {
    set((state) => ({
      isAutoRoll: !state.isAutoRoll
    }))
  }
}))

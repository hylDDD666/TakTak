import { create } from 'zustand'
import { fetchHomeVideos, fetchCreatorVideos } from '../action/action'

const getItemList = async (page) => {
  const itemList = await fetchHomeVideos(page)
  for (let i = 0; i < 5; i++) {
    itemList[i] = {
      ...itemList[i],
      author: {
        ...itemList[i].author,
        isFollowed: false,
      },
      disLike: false,
      isPlaying: false,
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
        ...itemList[i].author,
        isFollowed: false,
      },
      disLike: false,
      isPlaying: false,
    }
  }
  return itemList
}
const getCommentList = (id) => {
  const commentList = []
}
export const useHomeStore = create((set, get) => ({
  session:null,
  user:null,
  isLogin: false,
  showLogin: false,
  isAutoRoll: false,
  itemList: [],
  creatorVideos: [],
  page: 0,
  currentPlayId: 0,
  curDetailId: 0,
  scrollHeight: 1000,
  isDetailOn: false,
  isCreatorVideosOn: false,
  lastReplyShow: -1,
  curReplyShow: -1,
  setSession:(session)=>{
    set(()=>{
      return {session}
    })
  },
  setUser:(token)=>{
    set(()=>{
      return {user:token}
    })
  },
  setShowLogin: (boolen) => {
    set(() => {
      return { showLogin: boolen }
    })
  },
  setIsLogin: (boolen) => {
    set(() => {
      return { isLogin: boolen }
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
    set((state) => {
      const newList = [...res]
      return { creatorVideos: newList }
    })
  },
  fetchItemData: async () => {
    const res = await getItemList(get().page)
    set((state) => {
      const newList = [...state.itemList, ...res]
      return { itemList: newList, page: state.page + 1 }
    })
  },
  setCurId: (id) => {
    set((state) => {
      return { currentPlayId: id }
    })
  },
  setDetailId: (id) => {
    set((state) => {
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
    set((state) => {
      const newList = [...state.itemList]
      const index = state.itemList.findIndex((item) => item.id === id)
      newList[index].disLike = true
      return { itemList: newList }
    })
  },
  pauseAllItems: () => {
    set((state) => {
      const newList = [...state.itemList]
      newList.map((item) => {
        item.isPlaying = false
      })
      return { itemList: newList }
    })
  },
  pauseItemById: (id) => {
    set((state) => {
      const newList = [...state.itemList]
      const index = newList.findIndex((item) => item.id == id)
      newList[index].isPlaying = false
      return { itemList: newList }
    })
  },
  playItemById: (id) => {
    set((state) => {
      const newList = [...state.itemList]
      newList.forEach((item) => {
        item.isPlaying = false
      })
      const index = newList.findIndex((item) => item.id == id)
      newList[index].isPlaying = true
      return { itemList: newList }
    })
  },
  toggleAutoRoll: () => {
    set((state) => ({
      isAutoRoll: !state.isAutoRoll,
    }))
  },
}))

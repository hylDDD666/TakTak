import { create } from 'zustand'
import {
  fetchHomeVideos,
  fetchCreatorVideos,
  validateIsFollow,
} from '../action/action'
import { persist, createJSONStorage } from 'zustand/middleware'
import { produce } from 'immer'

const getItemList = async (page) => {
  const itemList = await fetchHomeVideos(page)
  for (let i = 0; i < 5; i++) {
    // console.log(itemList[i].author.userName,await validateIsFollow(itemList[i].author.userName));
    itemList[i] = {
      ...itemList[i],
      author: {
        ...itemList[i].author,
        isFollowed: await validateIsFollow(itemList[i].author.userName),
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
export const useHomeStore = create(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      showLogin: false,
      isAutoRoll: false,
      itemList: [],
      creatorVideos: [],
      userItemList: [],
      isUserVideoDetailOn: false,
      page: 0,
      currentPlayId: 0,
      curDetailId: 0,
      scrollHeight: 1000,
      isDetailOn: false,
      isCreatorVideosOn: false,
      lastReplyShow: -1,
      curReplyShow: -1,
      setItemListIsFollowed: (name, isFollowed) => {
        const index = get().itemList.findIndex(
          (item) => item.author.userName === name
        )
        set((state) => {
          const newList = [...state.itemList]
          newList[index].author.isFollowed = isFollowed
          return { itemList: newList }
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
      initItemList: () => {
        set(() => {
          return { itemList: [], page: 0 }
        })
      },
      setItemList: (list) => {
        set(() => {
          return { itemList: list }
        })
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
      setShowLogin: (boolen) => {
        set(() => {
          return { showLogin: boolen }
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
        // console.log(get().itemList);
        const res = await getItemList(get().page)
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
    }),
    { name: 'home-storage', storage: createJSONStorage(() => sessionStorage) }
  )
)

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
    itemList[i] = {
      ...itemList[i],
      author: {
        ...itemList[i].author,
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
      scrollHeight: 10,
      isDetailOn: false,
      isCreatorVideosOn: false,
      lastReplyShow: -1,
      curReplyShow: -1,
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
          isAutoRoll: !state.isAutoRoll,
        }))
      },
    }),
    { name: 'home-storage', storage: createJSONStorage(() => sessionStorage) }
  )
)

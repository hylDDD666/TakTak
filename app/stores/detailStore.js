import { create } from 'zustand'
import { addComment, fetchCommentByVideoId } from '../action/action'

export const useDetailStore = create((set, get) => ({
  commentNum: -1,
  commentList: [],
  commentPage: 0,
  subCommentList: [],
  setCommentNum: (num) => {
    set(() => {
      return { commentNum: num }
    })
  },
  addCommentNum: () => {
    set((state) => {
      return { commentNum: state.commentNum + 1 }
    })
  },
  addCommentPage: () => {
    set((state) => {
      return { commentPage: state.commentPage + 1 }
    })
  },
  addComments: async (content, videoId) => {
    const res = await addComment(content, videoId)
    set((state) => {
      return { commentList: [res, ...state.commentList] }
    })
  },
  addCommentList: async (videoId) => {
    const res = await fetchCommentByVideoId(videoId, get().commentPage)
    set((state) => {
      return {
        commentList: [...state.commentList, ...res.comments],
        page: state.commentPage + 1,
        commentNum: res.commentNum,
      }
    })
  },
  initCommentList: () => {
    set(() => {
      return { commentList: [], commentPage: 0, commentNum: -1 }
    })
  },
}))

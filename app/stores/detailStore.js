import { create } from 'zustand'
import {
  addComment,
  fetchCommentByVideoId,
  getCommentNumByVideoId,
} from '../action/action'

export const useDetailStore = create((set, get) => ({
  commentNum: -1,
  commentList: [],
  commentPage: 0,
  subCommentList: [],
  showSpin: true,
  getCommentNum: async (videoId) => {
    const res = await getCommentNumByVideoId(videoId)
    set(() => {
      return { commentNum: res }
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
      return {
        commentList: [res, ...state.commentList],
        commentNum: state.commentNum + 1,
      }
    })
  },
  addCommentList: async (videoId) => {
    const res = await fetchCommentByVideoId(videoId, get().commentPage)
    set((state) => {
      if ([...state.commentList, ...res.comments].length === res.commentNum) {
        return {
          commentList: [...state.commentList, ...res.comments],
          commentPage: state.commentPage + 1,
          showSpin: false,
        }
      }
      return {
        commentList: [...state.commentList, ...res.comments],
        commentPage: state.commentPage + 1,
      }
    })
  },
  initCommentList: () => {
    set(() => {
      return { commentList: [], commentPage: 0, commentNum: -1, showSpin: true }
    })
  },
}))

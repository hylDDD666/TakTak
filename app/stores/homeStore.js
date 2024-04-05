import { create } from 'zustand'

const userNames = [
  'BananaWarrior',
  'PixelNinja',
  'StarGazer42',
  'CoffeeAddict',
  'MoonlightDreamer',
  'SushiMaster',
  'JazzPanda',
  'MountainHiker',
  'CaptainQuokka',
  'RainbowScribe',
  'CosmicExplorer',
  'GuitarStrummer',
  'PixelatedUnicorn',
  'TeaLeafReader',
  'MidnightOwl',
  'PizzaEnthusiast',
  'GalacticTraveler',
  'DragonflyDancer',
  'SunnySideUp',
  'VelvetVoyager',
  'PineappleWizard',
  'InfiniteQuest',
  'ChaiLatteLover',
  'StardustSeeker',
  'JungleJester',
  'MoonstoneMystic',
  'CrimsonComet',
  'WhimsicalWombat',
  'NeonNebula',
  'CocoaConnoisseur',
  'SapphireSailor',
  'LunarLullaby',
  'GalaxyGazer',
  'EnchantedEagle',
  'PixelPainter',
  'MangoMaestro',
  'StarrySkies',
  'CosmicCrafter',
  'JellybeanJester',
  'AuroraAdventurer',
  'TofuTinkerer',
  'SolarFlare',
  'NoodleNinja',
  'CinnamonScribe',
  'PineapplePioneer',
  'MoonlitMermaid',
  'GalacticGourmet',
  'PixelPirate',
  'SunnySideUp',
  'StardustSculptor',
  'ChaiChampion',
  'JazzedJellyfish',
  'CocoaComposer',
  'WhimsicalWanderer',
  'LunarLyricist',
  'DragonfruitDynamo',
  'StarrySculptor',
  'CosmicComposer',
  'MangoMuse',
  'SapphireSculptor',
  'EnchantedExplorer',
  'PixelPilgrim',
  'TofuTrekker',
  'SolarSerenade',
  'NoodleNavigator',
  'CinnamonCreator',
  'PineapplePioneer',
  'MoonlitMelody',
  'GalacticGourmet',
  'PixelPathfinder',
  'SunnySculptor',
  'StardustScribe',
  'ChaiChampion',
  'JazzedJester',
  'CocoaConnoisseur',
]
const videos = [
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/873846353/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=8d9f9377df2b7900eafa325cec9f5d8c18345d1c4df80e72fa26d537f797e2a7',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/911357105/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=cc3f8b775bcbb2304970e19e367d80e518cc4e371c7a8ea774edc8ed45773194',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/528277320/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=5bdeef61210b83eb6c642a772fa17fa2fea0a83617931f05a265b59ef58a5ac9',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/523077693/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e5dccaf0045d276093f0b09ceb41cfbdb233c674d94edb5075e8ec366cac474a',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/918954314/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c072a8a87bf3a4490635538de73619efde3556aa2ff52aab4561944a98f5b257',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/914356391/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=41679e8e0d9ca5cd689658f1e928443b0b8367173cc1c37d240a7df8b6d7d064',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/578367086/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=f84fd19cfec5df676a24312f9aee12855a6a4bc0ba0059c4ada29142b9677d0e',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/914418129/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=210e26f3d4c404542b9745f4b2e21f4dcac22205f70e9c1e67d563d2daa7099d',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/821576356/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=4a3b58835b0a7e3230f5a0b9c38be4b3da7485064b88e6860b32d5f43f370baa',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/917485262/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=bc021f21549b97299df9a8a3325e41939225fefe780309311704fa3caa3c71f7',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/892030237/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=9df4230fce0fb93631169d3409546612e1310549c843f5a3ab50d133c50d72ea',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/763783713/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=83338c53fe80a6258e04684db16b49498d8a0cc050f9acd959dcae1f1eb62d90',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/914404763/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=eafe2339c717a7d2e3c1d4d0f95919ab6e09b808ffe169e4940840ced2b37f5f',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/914161338/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c0ecd6dc733277d2d983c3ffac1fca6d507859d14e4ecc11bb60db58b0a143ca',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/912744522/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=401dfb1d0904a44a102c867366c6d7fdda12ef09c6e549f2a3d4c9f999d91b56',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/920084318/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c34448ec293aadefcbf93392951bb5e92ac25ea2b3ca95bc02b55ae96f6eaeca',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/916180041/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=741accca004b0716af6e13b6338f402ed5ce9826fe73305d89fa5a75cdd83bc2',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/918778244/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=dbaa3310b7e766a5d7e9e188b312586a3fcfc87211b74f4cbc58b0609b5e5684',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/858450163/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=fc1875f13629af0f13e66c0547d9e96fdfe60b993099f6747c61d33aa74cf484',
    type: 'col',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/883503739/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=1729c25cefeda6baa281c362db435769788c5d4df0f068ce526df7c53ed24edd',
    type: 'row',
  },
  {
    url: 'https://player.vimeo.com/progressive_redirect/playback/872428289/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=80153a9a27be53272fa1821f698d48f4eb051729c400a03d7ede2fc9ef2ba4da',
    type: 'row',
  },
]
const desces = [
  '这部视频带你领略了世界著名的巴黎艾菲尔铁塔的壮丽景色，从日出到日落，每一刻都美得令人窒息。这部视频带你领略了世界著名的巴黎艾菲尔铁塔的壮丽景色，从日出到日落，每一刻都美得令人窒息。',
  '在这段视频中，你将看到一场激动人心的篮球比赛，球员们身手敏捷，每一个进球都让人热血沸腾。在这段视频中，你将看到一场激动人心的篮球比赛，球员们身手敏捷，每一个进球都让人热血沸腾。',
  '本视频展示了如何制作一道经典的意大利披萨，从和面到烤制，每一步都详细讲解，让你在家也能享受美食。',
  '跟随这部视频，你将走进神秘的亚马逊雨林，探索这片原始丛林的生物多样性，感受大自然的鬼斧神工。',
  '本视频带你走进艺术的世界，欣赏各种流派的名画，从古典到现代，每一幅画都诉说着不同的故事。',
  '这段视频记录了一次难忘的徒步旅行，穿越崇山峻岭，领略大自然的壮美风光，让人心旷神怡。',
  '在这部视频中，你将学习如何制作一款流行的手机游戏，从设计到编程，一步步教你打造属于自己的游戏世界。',
  '跟随这部美食视频，你将学会制作一道地道的四川麻辣火锅，香辣可口，让人回味无穷。',
  '本视频带你探索宇宙的奥秘，从地球到遥远的星系，揭开宇宙的神秘面纱，让人叹为观止。',
  '这段视频展示了一次精彩的瑜伽课程，通过简单的动作和呼吸练习，帮助你舒缓压力，提升身心健康。',
]
const comments = [
  '这部视频真的太赞了，从头到尾都很精彩！',
  '喜欢这种风格的视频，很有创意！',
  '视频剪辑得很流畅，看得人心情愉悦。',
  '感觉这个视频很适合和朋友一起分享。',
  '配乐很棒，让整个视频更加生动了。',
  '看到这么精彩的视频，真的是一种享受！',
  '这个视频真的让人感受到了生活的美好。',
  '作者辛苦了，视频制作得这么用心。',
  '看完这个视频，感觉心情都变好了。',
  '视频中的笑点真的很到位，笑得我肚子疼。',
  '喜欢这种简单而有趣的视频风格。',
  '这个视频让我对某个话题有了更深入的了解。',
  '视频画质很棒，看得人眼睛很舒服。',
  '作者真是才华横溢，每个视频都这么有创意。',
  '这个视频让我感受到了作者的用心和热情。',
  '视频内容很有深度，看完后收获颇丰。',
  '很喜欢这种带有教育意义的视频。',
  '作者加油，期待你更多的精彩作品！',
  '视频中的故事情节很吸引人，看得我津津有味。',
  '这个视频让我感受到了生活的无限可能。',
  '看完这个视频，感觉对生活充满了希望。',
  '视频中的特效真的很棒，看得人眼花缭乱。',
  '作者真是个天才，每个视频都这么有创意和想象力。',
  '视频真的很治愈，看完后心情变得很愉快。',
  '喜欢这种带有正能量的视频，给人带来温暖。',
  '视频中的配乐和画面很搭配，给人带来一种美妙的体验。',
  '作者真是用心良苦，视频中的每个细节都处理得这么好。',
  '这个视频真的很适合放松身心，看完后感觉很轻松。',
  '视频中的演员表现得很出色，让人印象深刻。',
  '这个视频真的让我对某个领域有了更深刻的认识。',
  '视频制作得很用心，每个镜头都很有感觉。',
  '作者真是个创意鬼才，每次都能带来惊喜。',
  '视频中的笑点真的很高级，不是那种俗套的搞笑。',
  '这个视频真的很适合和家人一起观看。',
  '看完这个视频，感觉自己的审美水平都提高了。',
  '视频中的情节发展很自然，没有突兀的感觉。',
  '作者真是个剪辑大师，每个镜头都恰到好处。',
  '这个视频真的很适合在闲暇时观看，放松心情。',
  '视频中的配乐真的很符合主题，让人沉浸其中。',
  '作者加油，期待你未来能带来更多优秀作品。',
  '这个视频真的很有启发性，让我对生活有了新的思考。',
  '视频中的演员演技很棒，让人感同身受。',
  '看完这个视频，感觉自己的心情都变好了很多。',
  '作者真是个天才导演，每个视频都让人眼前一亮。',
  '视频中的画面真的很美，让人陶醉其中。',
  '这个视频真的让我对某个领域产生了浓厚的兴趣。',
  '作者真是个用心做视频的人，每个细节都处理得这么好。',
  '视频中的配乐和画面真的很搭配，给人带来一种完美的体验。',
  '看完这个视频，感觉自己的眼界都开阔了很多。',
  '作者真是个有创意的人，每次都能给人带来新鲜感。',
  '视频中的情节发展真的很扣人心弦，让人欲罢不能。',
  '这个视频真的很适合和朋友一起分享和讨论。',
  '作者加油，你的作品真的很值得更多人看到。',
  '视频中的特效真的很震撼，看得人目瞪口呆。',
  '这个视频真的让我感受到了作者的用心和才华。',
  '作者真是个用心做内容的人，每个视频都这么有看点。',
  '视频中的演员真的很有魅力，让人忍不住多看几眼。',
  '看完这个视频，感觉自己的生活都变得更加充实了。',
  '作者真是个创意无限的人，每次都能给人带来惊喜和感动。',
  '视频中的画面真的很精致，每个细节都处理得这么好。',
  '这个视频真的很适合放松心情，缓解压力。',
  '作者真是个有才华的人，期待你未来能带来更多精彩作品。',
]
const getItemList = () => {
  const itemList = []
  for (let i = 0; i < 5; i++) {
    const id = (Date.now() + i) * 1
    itemList.push({
      id: id,
      user: {
        id: id,
        userName: userNames[i],
        avatar: 'https://api.btstu.cn/sjbz/api.php',
        isFollowed: false,
      },
      desc: desces[Math.floor(Math.random() * 10)],
      video: {
        id: id,
        videoInfo: {
          ...videos[Math.floor(Math.random() * videos.length)],
          isPlaying: false,
        },
        likeNum: Math.floor(Math.random() * 1000),
        commentsNum: Math.floor(Math.random() * 1000),
        collectNum: Math.floor(Math.random() * 1000),
        shareNum: Math.floor(Math.random() * 1000),
      },
      disLike: false,
      isPlaying: false,
    })
  }
  return itemList
}
// for (let i = 0; i < 5; i++) {
//   itemList.push({
//     id: i,
//     user: {
//       id: i,
//       userName: userNames[i],
//       avatar: 'https://api.btstu.cn/sjbz/api.php',
//       isFollowed: false,
//     },
//     desc: desces[Math.floor(Math.random() * 10)],
//     video: {
//       id: i,
//       videoInfo: {
//         ...videos[Math.floor(Math.random() * videos.length)],
//         isPlaying: false,
//       },
//       likeNum: Math.floor(Math.random() * 1000),
//       commentsNum: Math.floor(Math.random() * 1000),
//       collectNum: Math.floor(Math.random() * 1000),
//       shareNum: Math.floor(Math.random() * 1000),
//     },
//     disLike: false,
//     isPlaying: false,
//   })
// }
const getCreatorVideos = (userName) => {
  const itemList = []
  for (let i = 0; i < 10; i++) {
    const id = (Date.now() + i) * 1
    itemList.push({
      id: id,
      user: {
        id: id,
        userName: userNames[i],
        avatar: 'https://api.btstu.cn/sjbz/api.php',
        isFollowed: false,
      },
      desc: desces[Math.floor(Math.random() * 10)],
      video: {
        id: id,
        videoInfo: {
          ...videos[Math.floor(Math.random() * videos.length)],
          isPlaying: false,
        },
        likeNum: Math.floor(Math.random() * 1000),
        commentsNum: Math.floor(Math.random() * 1000),
        collectNum: Math.floor(Math.random() * 1000),
        shareNum: Math.floor(Math.random() * 1000),
      },
      disLike: false,
      isPlaying: false,
    })
  }
  return itemList
}
const getCommentList = (id) => {
  const commentList = []
}
export const useHomeStore = create((set) => ({
  isAutoRoll: false,
  itemList: getItemList(),
  creatorVideos: [],
  page: 0,
  currentPlayId: 0,
  scrollHeight: 1000,
  isDetailOn: false,
  isCreatorVideosOn: false,
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
  getCreatorVideos: () => {
    set((state) => {
      const newList = [...getCreatorVideos()]
      return { creatorVideos: newList }
    })
  },
  fetchItemData: () => {
    set((state) => {
      const newList = [...state.itemList, ...getItemList()]
      return { itemList: newList, page: state.page + 1 }
    })
  },
  setCurId: (id) => {
    set((state) => {
      return { currentPlayId: id }
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
      const index = newList.findIndex((item) => item.id === id)
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
      const index = newList.findIndex((item) => item.id === id)
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

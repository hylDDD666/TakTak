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
  '这部视频带你领略了世界著名的巴黎艾菲尔铁塔的壮丽景色，从日出到日落，每一刻都美得令人窒息。',
  '在这段视频中，你将看到一场激动人心的篮球比赛，球员们身手敏捷，每一个进球都让人热血沸腾。',
  '本视频展示了如何制作一道经典的意大利披萨，从和面到烤制，每一步都详细讲解，让你在家也能享受美食。',
  '跟随这部视频，你将走进神秘的亚马逊雨林，探索这片原始丛林的生物多样性，感受大自然的鬼斧神工。',
  '本视频带你走进艺术的世界，欣赏各种流派的名画，从古典到现代，每一幅画都诉说着不同的故事。',
  '这段视频记录了一次难忘的徒步旅行，穿越崇山峻岭，领略大自然的壮美风光，让人心旷神怡。',
  '在这部视频中，你将学习如何制作一款流行的手机游戏，从设计到编程，一步步教你打造属于自己的游戏世界。',
  '跟随这部美食视频，你将学会制作一道地道的四川麻辣火锅，香辣可口，让人回味无穷。',
  '本视频带你探索宇宙的奥秘，从地球到遥远的星系，揭开宇宙的神秘面纱，让人叹为观止。',
  '这段视频展示了一次精彩的瑜伽课程，通过简单的动作和呼吸练习，帮助你舒缓压力，提升身心健康。',
]
const itemList = []
for (let i = 0; i < 5; i++) {
  itemList.push({
    id: i,
    user: {
      id: i,
      userName: userNames[i],
      avatar: 'https://api.btstu.cn/sjbz/api.php',
      isFollowed: false,
    },
    desc: desces[Math.floor(Math.random() * 10)],
    video: {
      id: i,
      videoInfo: {
        ...videos[Math.floor(Math.random() * videos.length)],
        isPlaying: false,
      },
      likeNum: Math.floor(Math.random() * 1000),
      commentsNum: Math.floor(Math.random() * 1000),
      collectNum: Math.floor(Math.random() * 1000),
      shareNum: Math.floor(Math.random() * 1000),
    },
    disLike:false
  })
}

export const useHomeStore = create((set) => ({
  itemList: itemList,
  deleteItem: (id) => {
    set((state) => {
      const newList = [...state.itemList].filter((item) => item.id !== id)
      return { itemList: newList }
    })
  },
  disLikeItem:(id)=>{
    set((state)=>{
      const newList = [...state.itemList]
      const index = state.itemList.findIndex((item)=>item.id===id)
      newList[index].disLike=true
      return {itemList:newList}
    })
  }
}))

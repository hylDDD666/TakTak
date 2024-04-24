export const getVideoPreviewImg = (url, currentTime) => {
  currentTime = currentTime.toFixed(2) || 2
  /* 创建视频dom节点 */
  let node = document.createElement('video')

  node.src = url
  node.currentTime = currentTime
  node.setAttribute('crossOrigin', 'anonymous')
  /* 创建canvas节点 */
  let canvasNode = document.createElement('canvas')

  const canvasFill = canvasNode.getContext('2d')
  /* 把视频变成canvas */
  return new Promise((resolve) => {
    node.oncanplay = () => {
      node.style.width = `${node.videoWidth}px`
      node.style.height = `${node.videoHeight}px`
      canvasNode.width = node.videoWidth
      canvasNode.height = node.videoHeight
      canvasFill.drawImage(node, 0, 0, canvasNode.width, canvasNode.height)
      /* 把canvas变成图片 */
      const imgSrc = canvasNode.toDataURL('image/jpeg')
      resolve({
        imgSrc,
        videoHeight: node.videoHeight,
        videoWidth: node.videoWidth,
      })
    }
  })
}

// const videos = [
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/873846353/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=8d9f9377df2b7900eafa325cec9f5d8c18345d1c4df80e72fa26d537f797e2a7',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/911357105/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=cc3f8b775bcbb2304970e19e367d80e518cc4e371c7a8ea774edc8ed45773194',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/528277320/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=5bdeef61210b83eb6c642a772fa17fa2fea0a83617931f05a265b59ef58a5ac9',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/523077693/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e5dccaf0045d276093f0b09ceb41cfbdb233c674d94edb5075e8ec366cac474a',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/918954314/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c072a8a87bf3a4490635538de73619efde3556aa2ff52aab4561944a98f5b257',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/914356391/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=41679e8e0d9ca5cd689658f1e928443b0b8367173cc1c37d240a7df8b6d7d064',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/578367086/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=f84fd19cfec5df676a24312f9aee12855a6a4bc0ba0059c4ada29142b9677d0e',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/914418129/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=210e26f3d4c404542b9745f4b2e21f4dcac22205f70e9c1e67d563d2daa7099d',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/821576356/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=4a3b58835b0a7e3230f5a0b9c38be4b3da7485064b88e6860b32d5f43f370baa',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/917485262/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=bc021f21549b97299df9a8a3325e41939225fefe780309311704fa3caa3c71f7',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/892030237/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=9df4230fce0fb93631169d3409546612e1310549c843f5a3ab50d133c50d72ea',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/763783713/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=83338c53fe80a6258e04684db16b49498d8a0cc050f9acd959dcae1f1eb62d90',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/914404763/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=eafe2339c717a7d2e3c1d4d0f95919ab6e09b808ffe169e4940840ced2b37f5f',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/914161338/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c0ecd6dc733277d2d983c3ffac1fca6d507859d14e4ecc11bb60db58b0a143ca',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/912744522/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=401dfb1d0904a44a102c867366c6d7fdda12ef09c6e549f2a3d4c9f999d91b56',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/920084318/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=c34448ec293aadefcbf93392951bb5e92ac25ea2b3ca95bc02b55ae96f6eaeca',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/916180041/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=741accca004b0716af6e13b6338f402ed5ce9826fe73305d89fa5a75cdd83bc2',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/918778244/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=dbaa3310b7e766a5d7e9e188b312586a3fcfc87211b74f4cbc58b0609b5e5684',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/858450163/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=fc1875f13629af0f13e66c0547d9e96fdfe60b993099f6747c61d33aa74cf484',
//     type: 'col',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/883503739/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=1729c25cefeda6baa281c362db435769788c5d4df0f068ce526df7c53ed24edd',
//     type: 'row',
//   },
//   {
//     url: 'https://player.vimeo.com/progressive_redirect/playback/872428289/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=80153a9a27be53272fa1821f698d48f4eb051729c400a03d7ede2fc9ef2ba4da',
//     type: 'row',
//   },
// ]
// const getNewVideos = () => {
//   const newVideos = videos.map(async (item) => {
//     const res = await getVideoPreviewImg(item.url, 0.8)
//     const { imgSrc, videoWidth, videoHeight } = res
//     return { ...item, cover: imgSrc, videoHeight, videoWidth }
//   })
//   const handlenewVideos = new Promise((resolve) => {
//     newVideos.forEach((item, index) => {
//       item.then((value) => {
//         newVideos[index] = value
//       })
//     })
//     resolve(newVideos)
//   })

//   handlenewVideos.then((value) => {
//     console.log(value)
//   })
// }

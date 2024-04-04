export const getVideoPreviewImg = (url,  currentTime) => {

  currentTime = currentTime || 2
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
      resolve(imgSrc)
    }
  })
}

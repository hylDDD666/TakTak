const debounce = (func, delay) => {
  let timer
  return (e) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(e)
    }, delay)
  }
}
export default debounce